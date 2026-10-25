'use strict';
const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const VIEWS = ['plan', 'map', 'history', 'ideas', 'home'];
function readState() {
  try { return JSON.parse(localStorage.getItem('mad-weekend-v2') || localStorage.getItem('mad-weekend-v1')) || {}; }
  catch { return {}; }
}
const stored = readState();
const madridDate = new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Madrid', year:'numeric', month:'2-digit', day:'2-digit'}).format(new Date());
let state = {
  day: Math.max(0, ['2026-10-23','2026-10-24','2026-10-25'].indexOf(madridDate)),
  view: VIEWS.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'plan',
  surprise: stored.surprise !== false,
  revealed: Array.isArray(stored.revealed) ? stored.revealed : [],
  done: Array.isArray(stored.done) ? stored.done : [],
  ideas: !!stored.ideas, history: !!stored.history, references: false,
  mapIdeas: false, mapHomes: false, mapYear: 'now', ideaFilter: 'day', ideaType: 'all'
};
let map = null, toastTimer = null, activePlace = null, previousPlace = null, historicLayer = null;
function save() {
  try { localStorage.setItem('mad-weekend-v2', JSON.stringify({surprise:state.surprise, revealed:state.revealed, done:state.done, ideas:state.ideas, history:state.history})); } catch {}
}
function unlocked(stop, now = Date.now()) {
  return !state.surprise || state.revealed.includes(stop.id) || now >= Date.parse(stop.at);
}
function timeLabel(at) {
  return new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Madrid', weekday:'short', hour:'2-digit', minute:'2-digit', hour12:false}).format(new Date(at));
}
function visibleStops() { return DAYS[state.day].stops.filter(stop => unlocked(stop)); }
function locationQuery(place) {
  return (place.mapQuery || `${place.name.split(' ·')[0]}, ${place.address.split(' ·')[0]}`) + ', Madrid';
}
function mapUrl(place, mode = 'walking', origin = '') {
  const params = new URLSearchParams({api:'1', destination:locationQuery(place), travelmode:mode});
  if (origin) params.set('origin', origin);
  return 'https://www.google.com/maps/dir/?' + params;
}
function placeMapUrl(place) {
  return 'https://www.google.com/maps/search/?' + new URLSearchParams({api:'1', query:locationQuery(place)});
}
function routeUrl(route) {
  // Google Maps mobile URLs support at most three intermediate waypoints.
  const places = route.places.map(id => PLACES[id]);
  const params = new URLSearchParams({api:'1', origin:locationQuery(places[0]), destination:locationQuery(places.at(-1)), travelmode:route.mode});
  if (places.length > 2) params.set('waypoints', places.slice(1,-1).map(locationQuery).join('|'));
  return 'https://www.google.com/maps/dir/?' + params;
}
function external(url, label, cls = '') {
  return `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(label)} <span aria-hidden="true">↗</span></a>`;
}
function routeAnchor(url, label, cls = 'btn') {
  // Same-tab links work in mobile in-app browsers and let the browser handle app links.
  return `<a class="${cls}" href="${esc(url)}">${esc(label)} <span aria-hidden="true">↗</span></a>`;
}
function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 2500);
}
function referenceLinks(ids, compact = false) {
  return ids.filter(id => REFERENCES[id]).map(id => {
    const r = REFERENCES[id];
    return compact ? external(r.url, r.publisher, 'inline-reference') : `<li>${external(r.url,r.title)}<small>${esc(r.publisher)} · ${esc(r.scope)}${r.published ? ' · Published '+esc(r.published) : ''}</small></li>`;
  }).join('');
}
function photoMarkup(photo, compact = false) {
  if (!photo) return '';
  return `<figure class="place-photo ${compact ? 'compact' : ''}"><img src="${esc(photo.url)}" alt="${esc(photo.alt || photo.caption || '')}" loading="lazy" decoding="async" referrerpolicy="strict-origin-when-cross-origin"><figcaption>${esc(photo.caption || '')}<span>${external(photo.page, photo.author || 'Image source')}${photo.licenseUrl ? ' · '+external(photo.licenseUrl, photo.license) : ' · '+esc(photo.license)}</span></figcaption></figure>`;
}
function syncControls() {
  document.querySelectorAll('[data-view]').forEach(button => {
    const selected = button.dataset.view === state.view;
    button.classList.toggle('active', selected);
    if (selected) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
  });
  $('#spoilerToggle').setAttribute('aria-checked', String(state.surprise));
  $('#spoilerToggle b').textContent = state.surprise ? 'ON' : 'OFF';
  $('#daySelector').classList.toggle('hidden', ['home','history'].includes(state.view));
  $('#daySelector').innerHTML = DAYS.map((day, i) => `<button class="day-btn ${i === state.day ? 'active' : ''}" data-day="${i}" aria-pressed="${i === state.day}"><strong>${day.date}</strong><span>${day.label}<small>OCTOBER</small></span></button>`).join('');
}
function heading(title, subtitle, index = '') {
  return `<div class="section-heading"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div>${index ? `<span class="day-index">${esc(index)}</span>` : ''}</div>`;
}
function mapMarkup(large = false) {
  return `<div class="map-box"><div class="map-head">${state.mapYear === '1656' ? 'Madrid in 1656' : 'Madrid today'}<span>Tap a numbered stop</span></div><div id="map" class="map ${large ? 'large' : ''}" tabindex="0" role="region" aria-label="Street map of visible stops"></div><div class="map-caption"><p id="mapStatus" role="status">Loading street map…</p><p>Green: stops · gold: alternatives${state.mapHomes ? ' · rust: host stations' : ''}. Pins are approximate; use Directions for the entrance.</p>${state.mapYear === '1656' ? `<p>Georeferenced historic scan © Ayuntamiento de Madrid. Alignment is approximate; the edge of the sheet is not a city boundary. ${external(HISTORY.map.source,'Map record')}</p>` : ''}<button class="text-btn" data-view="map">Map and walking routes</button></div></div>`;
}
function stopMarkup(stop, index) {
  const place = PLACES[stop.place], open = unlocked(stop), done = state.done.includes(stop.id);
  const title = stop.title || place.name;
  const hiddenDescriptions = {meeting:'Meeting point for the group.',home:'Meet at one of the hosts’ stations.',food:'A food stop. No table has been reserved.',night:'An optional drinks stop after dinner.',museum:'Allow up to two hours for this visit.',history:'A short stop on the walk.',walk:'Part of the day’s walking route.',event:'Leave time to reach the meeting area.',market:'Allow time to browse.'};
  return `<article class="stop ${open ? '' : 'locked'} ${done ? 'done' : ''}" id="stop-${stop.id}"><div class="stop-time">${esc(stop.time).replace('–','<br>– ')}</div><div class="stop-body"><div class="stop-top"><span class="tag">${esc(open ? place.kind : 'Hidden stop')}</span><span class="stop-number">${String(index+1).padStart(2,'0')}</span></div><h3>${esc(open ? title : stop.hint)}</h3><p>${esc(open ? (stop.summary || place.summary || stop.desc) : (hiddenDescriptions[place.kind] || 'Details appear at the time below.'))}</p>${open ? `<p class="leg-note">${esc(stop.desc)}</p><div class="stop-actions"><button class="text-btn" data-place="${stop.place}">Why stop here?</button><button class="text-btn" data-directions="${stop.place}">Directions</button><button class="check-btn" data-done="${stop.id}" aria-label="${done ? 'Unmark' : 'Mark'} ${esc(title)} as visited" aria-pressed="${done}">${done ? '✓' : '○'}</button></div>${place.refs?.length ? `<div class="card-reference">Reference: ${referenceLinks(place.refs.slice(0,1),true)}</div>` : ''}` : `<button class="text-btn" data-reveal="${stop.id}">Reveal this stop</button><small class="reveal-time">Visible from ${timeLabel(stop.at)} · Madrid time</small>`}</div></article>`;
}
function routeUnlocked(route) {
  return route.places.every(id => !DAYS[state.day].stops.some(stop => stop.place === id) || DAYS[state.day].stops.filter(stop => stop.place === id).some(stop => unlocked(stop)));
}
function routeCards(compact = false) {
  return `<div class="route-cards ${compact ? 'compact' : ''}">${ROUTES.filter(route => route.day === DAYS[state.day].id).map(route => {
    const open = routeUnlocked(route);
    return `<article class="route-card"><h3>${esc(open ? route.title : 'Route '+(ROUTES.filter(r=>r.day===DAYS[state.day].id).indexOf(route)+1))}</h3><p>${esc(open ? route.note : 'This section includes stops that have not yet been revealed.')}</p>${open ? `<p class="route-stops">${route.places.map(id => esc(PLACES[id].name.split(' ·')[0])).join(' → ')}</p>${routeAnchor(routeUrl(route),route.mode === 'transit' ? 'Open transit route' : 'Open walking route','text-btn')}` : `<button class="text-btn" data-reveal-route="${route.id}">Reveal stops and open route</button>`}</article>`;
  }).join('')}</div>`;
}
function pairRoutes(destination) {
  return `<div class="pair-links">${routeAnchor(mapUrl(PLACES[destination],'transit',locationQuery(PLACES.fer)),'Fer + Bastien → meeting point','text-btn')}${routeAnchor(mapUrl(PLACES[destination],'transit',locationQuery(PLACES.jose)),'José + Sam → meeting point','text-btn')}</div>`;
}
function startMarkup() {
  if (state.day === 0) {
    const dinner = DAYS[0].stops.find(s => s.id === 'paco');
    return `<section class="meeting-note" aria-label="Friday meeting"><p class="eyebrow">TWO BASES · ONE DINNER</p><h3>Meet directly for dinner at 20:30</h3><p><strong>Fer + Bastien:</strong> airport, bags in Pacífico, then a short walk if there is time.<br><strong>José + Sam:</strong> stay near Quintana or do your own afternoon; join the others at dinner.</p>${unlocked(dinner) ? `<p>Dinner is at ${esc(PLACES.paco.name)}, ${esc(PLACES.paco.address)}. Allow time for the journey to Argüelles.</p>${pairRoutes('paco')}` : '<button class="text-btn" data-reveal="paco">Show dinner address and both routes</button>'}</section>`;
  }
  if (state.day === 1) return `<section class="meeting-note" aria-label="Saturday breakfast and meeting"><p class="eyebrow">09:30 BREAKFAST · 10:45 MEET IN SOL</p><h3>Breakfast near home, then meet in the centre</h3><div class="pair-grid"><div><h4>Fer + Bastien · Pacífico</h4><p>Your neighbourhood bar at 09:30. Leave around 10:10 and take L1 straight to Sol.</p></div><div><h4>José + Sam · Quintana</h4><p>Coffee and breakfast near José’s at 09:30. Leave around 10:00: L5 to Gran Vía, then about 10 minutes on foot.</p></div></div><p><strong>10:45: west side of Sol, at the start of Calle Mayor.</strong> Departure times include a buffer; check live departures before leaving.</p>${pairRoutes('sol')}<details><summary>Prefer breakfast all four together?</summary><p><strong>Easy option:</strong> meet in Sol at 09:45, choose a nearby bar and start the walk at 10:45.</p><p><strong>Fer’s bar:</strong> also possible at 09:30. José and Sam can take L5 to Diego de León, then L6 towards Manuel Becerra and Conde de Casal to Pacífico. Allow roughly 40–50 minutes from their area, including access and waiting. Everyone then takes L1 to Sol. This adds a cross-town journey before the sightseeing.</p>${routeAnchor(mapUrl(PLACES.fer,'transit',locationQuery(PLACES.jose)),'Optional: Quintana → Pacífico','text-btn')}</details></section>`;
  const breakfast = DAYS[2].stops.find(s => s.id === 'churros');
  return `<section class="meeting-note" aria-label="Sunday breakfast and meeting"><p class="eyebrow">THREE PEOPLE · 10:45 IN TIRSO</p><h3>Churros, the flock and the Rastro</h3><p><strong>Two from Pacífico:</strong> L1 directly to Tirso de Molina.<br><strong>One from Quintana:</strong> L5 to Gran Vía, then L1 to Tirso.<br>Meet at 10:45 by the metro entrance on the square; agree the exact exit in the group chat.</p><div class="pair-links">${routeAnchor(mapUrl(PLACES.tirso,'transit',locationQuery(PLACES.fer)),'Pacífico → Tirso meeting','text-btn')}${routeAnchor(mapUrl(PLACES.tirso,'transit',locationQuery(PLACES.jose)),'Quintana → Tirso meeting','text-btn')}</div>${unlocked(breakfast) ? `<p><strong>11:00–11:15: Churrería Santa Ana, Calle de Santa Ana 5.</strong> Walk 10–15 minutes from Tirso. Nine churros and four porras to share: allow €6.50–7 total, drinks extra. Take away and reach Toledo/Cebada before 11:30.</p>${routeAnchor(mapUrl(PLACES.santaana,'walking',locationQuery(PLACES.tirso)),'Tirso → Santa Ana on foot','text-btn')}` : '<p>The churros address opens at 08:30 Sunday. Reveal it now to plan breakfast.</p><button class="text-btn" data-reveal="churros">Show the churros stop</button>'}<p class="small">Clocks go back overnight. These are Sunday’s Madrid times.</p></section>`;
}
function returnMarkup() {
  const last = DAYS[state.day].stops.at(-1);
  const homeText = ['From Sala Equis: Fer + Bastien walk to Tirso de Molina for L1; José + Sam walk to La Latina for L5.','From Malasaña: Fer + Bastien use Tribunal L1; José + Sam use Gran Vía L5.','From El Tigre: Gran Vía has L1 for the two returning to Pacífico and L5 for the person returning to Quintana.'][state.day];
  return `<section class="note"><h3>${state.day === 2 ? 'Back to both bases' : 'Home in two pairs'}</h3><p>${unlocked(last) ? homeText : (state.day === 2 ? 'Two return to Pacífico on L1; one returns to Quintana on L5. Routes appear once the final stop is revealed.' : 'Fer + Bastien return to Pacífico on L1. José + Sam return to Quintana on L5. The routes below appear once the final stop is revealed.')}</p>${unlocked(last) ? `<div class="pair-links">${routeAnchor(mapUrl(PLACES.fer,'transit',locationQuery(PLACES[last.place])),'Back to Pacífico','text-btn')}${routeAnchor(mapUrl(PLACES.jose,'transit',locationQuery(PLACES[last.place])),'Back to Quintana','text-btn')}</div>` : ''}<p class="small">Check the last train before a late night; use the live route for service changes.</p></section>`;
}
function renderPlan() {
  const day = DAYS[state.day], done = day.stops.filter(stop => state.done.includes(stop.id)).length;
  return `${heading(state.surprise ? ['Friday evening','Saturday in Madrid','Sunday in Madrid'][state.day] : day.theme,state.surprise ? 'Times are local. Reveal individual stops early, or turn Surprise mode off.' : day.subtitle,String(state.day+1).padStart(2,'0'))}<div class="day-summary"><span>${esc(day.distance)}</span><span>Food: ${esc(day.budget)} / person, estimated</span><button class="text-btn" data-view="map">Open day map</button>${state.day === 1 ? '<button class="text-btn" data-view="history">Read the city background</button>' : ''}</div><div class="layout"><div class="timeline">${startMarkup()}${day.stops.map(stopMarkup).join('')}${returnMarkup()}</div><aside class="sidebar">${mapMarkup()}<div class="note"><h3>${esc(day.pace)}</h3><p>${esc(state.surprise ? ['Flight and luggage decide whether there is time for a walk before dinner.','A long day on foot with a museum in the afternoon. Drop a walking block if lunch runs late.','The clocks go back overnight. The morning has a timed event; keep the afternoon flexible.'][state.day] : day.note)}</p><p class="small">No tables or tickets booked. Food allowances exclude transport and extra drinks.</p><div class="progress-row"><span>Visited on this browser</span><span>${done} / ${day.stops.length}</span></div><div class="progress-track"><span style="width:${done/day.stops.length*100}%"></span></div></div><div class="note"><h3>${state.day === 1 ? 'If the day runs late' : 'Useful alternatives'}</h3><p>${state.surprise ? 'Open the alternatives if you want to plan the whole day. This may reveal places scheduled for later.' : state.day === 0 ? 'Reina Sofía instead of the park means dinner nearer 21:00. If the flight is late, go directly to Casa Paco.' : state.day === 1 ? 'Keep the old town, MAN and dinner. Drop the river first. Gran Vía fits on the way to Pez, rather than requiring a separate trip.' : 'Prefer a smaller museum? San Isidro is free, open until 20:00 and close to lunch: visit 15:45–16:45 instead of the Prado, then continue to Letras. Choose before leaving La Latina to avoid backtracking.'}</p><button class="text-btn" data-view="ideas">Compare alternatives</button></div></aside></div>`;
}
function renderMap() {
  const items = visibleStops();
  return `${heading('Map and routes', 'The selected day’s visible stops. Walking routes open with a fixed starting point.')}<div class="filter-row map-controls"><button class="chip ${state.mapYear === 'now' ? 'active' : ''}" data-map-year="now">Today’s streets</button><button class="chip ${state.mapYear === '1656' ? 'active' : ''}" data-map-year="1656">1656 map</button><button class="chip ${state.mapHomes ? 'active' : ''}" id="mapHomes" aria-pressed="${state.mapHomes}">Host stations</button><button class="chip ${state.mapIdeas ? 'active' : ''}" id="mapIdeas" aria-pressed="${state.mapIdeas}">Alternatives</button><button class="chip" id="fitMap">Fit visible pins</button></div>${state.surprise ? '<p class="small">Future stops stay hidden. Showing alternatives or revealing a route is an optional preview.</p>' : ''}${mapMarkup(true)}<div class="map-list">${items.map((stop,index) => `<button data-place="${stop.place}"><small>${DAYS[state.day].stops.indexOf(stop)+1}</small>${esc(stop.title || PLACES[stop.place].name)}</button>`).join('')}</div>${!items.length ? '<p class="small">No stops for this day have unlocked yet. Reveal them in the plan, or switch Surprise mode off.</p>' : ''}<h3 class="subheading">Routes for ${esc(DAYS[state.day].label)}</h3><p class="small">Routes are split into short sections for Google Maps on phones. Google calculates the street route; the pins alone are not navigation.</p>${routeCards()}`;
}
function renderIdeas() {
  if (state.surprise && !state.ideas) return `${heading('Alternatives','Swaps for rain, tired feet, queues or a change of mood.')}<div class="empty"><h3>Show the alternatives?</h3><p>This list includes places planned for later. Opening it does not change the itinerary.</p><button class="btn" id="revealIdeas">Show alternatives</button></div>`;
  const types = {all:'All types',museum:'Museums / indoors',walk:'Walks / outdoors',food:'Food and drink',night:'Music / late bars',event:'This weekend'};
  const items = IDEAS.filter(idea => (state.ideaFilter === 'all' || idea.days.includes(DAYS[state.day].id)) && (state.ideaType === 'all' || idea.type === state.ideaType));
  return `${heading('Alternatives','Each option says when it fits, what it replaces and what to watch for.')}<div class="filter-row"><button class="chip ${state.ideaFilter === 'day' ? 'active' : ''}" data-idea-filter="day">${esc(DAYS[state.day].label)}</button><button class="chip ${state.ideaFilter === 'all' ? 'active' : ''}" data-idea-filter="all">Whole weekend</button><label class="filter-label">Type <select id="ideaType" aria-label="Alternative type">${Object.entries(types).map(([key,label]) => `<option value="${key}" ${state.ideaType === key ? 'selected' : ''}>${label}</option>`).join('')}</select></label></div><div class="idea-grid">${items.map(idea => {
    const place = PLACES[idea.place];
    return `<article class="idea-card">${photoMarkup(place.photo,true)}<span class="tag">${esc(idea.tag)}</span><h3>${esc(place.name)}</h3><p>${esc(place.why || place.summary)}</p><dl><dt>When</dt><dd>${esc(idea.when)}</dd><dt>Replaces</dt><dd>${esc(idea.replaces)}</dd></dl><p class="tradeoff">${esc(idea.tradeoff)}</p><div class="idea-meta"><span>${esc(idea.minutes)}</span><span>${esc(idea.cost)}</span></div><button class="text-btn" data-place="${idea.place}">Details, photo and sources</button></article>`;
  }).join('')}</div>${!items.length ? '<p>No alternatives in this category for this day. Try “Whole weekend”.</p>' : ''}`;
}
function renderHistory() {
  if (state.surprise && !state.history) return `${heading('Before the walk','Spain, Madrid and the places on Saturday’s route.')}<div class="empty"><h3>Read the background?</h3><p>This section names some of Saturday’s stops and museum highlights. It includes a historic map and a short reading route for the MAN.</p><button class="btn" id="revealHistory">Read the history</button></div>`;
  return `${heading('How Madrid became Madrid','A short background for the old-town walk and Saturday afternoon at the MAN.')}<p class="history-intro">${esc(HISTORY.intro)}</p><nav class="history-jumps" aria-label="History sections"><a href="#history-story">Spain and Madrid</a><a href="#historic-map">The 1656 map</a><a href="#museum-route">Inside the MAN</a></nav><div class="history-layout"><div id="history-story" class="history-timeline">${HISTORY.chapters.map(chapter => `<article class="history-chapter"><p class="eyebrow">${esc(chapter.date)}</p><h3>${esc(chapter.title)}</h3><p>${esc(chapter.body)}</p><p class="connection">${esc(chapter.connection)}</p><ul class="references">${referenceLinks(chapter.refs)}<li>${external(chapter.wiki,'Further reading · Wikipedia')}</li></ul></article>`).join('')}</div><aside class="history-aside"><h3>The order of the day</h3><p>The street walk starts in the medieval and early modern city. The MAN then takes us further back. Gran Vía and Malasaña bring the story forward again.</p><button class="text-btn" data-saturday-plan>Back to Saturday’s plan</button><p class="small">“Spain” changes meaning across these periods. Modern national borders are not a good map for every kingdom, culture or empire in this story.</p></aside></div><section id="historic-map" class="history-map-section"><p class="eyebrow">PEDRO TEXEIRA · 1656</p><h2>A much smaller court city</h2><p>Find the dense town, the old Alcázar at its western edge and the large Buen Retiro complex to the east. The present Royal Palace and Gran Vía did not yet exist. This is seventeenth-century Madrid, not the original ninth-century fortress.</p>${photoMarkup({...HISTORY.map.overview,alt:'Overview of Pedro Texeira’s 1656 map of Madrid',caption:'Overview of the complete 1656 map; use the municipal layer for detail.'})}<div class="dialog-links"><button class="btn" data-compare-history>Compare with today’s street map</button>${external(HISTORY.map.source,'Municipal map record','btn secondary')}${external(HISTORY.map.printSource,'IGN catalogue: size and scale','btn secondary')}</div><p class="small">The IGN record describes an 1881 facsimile in 20 sheets, about 1.8 × 2.85 metres, at approximately 1:1,649. The image here is reduced for a phone. The georeferenced scan includes countryside and gardens; its rectangular extent is not a city boundary.</p><details><summary>Zoom into a sheet of the original drawing</summary>${photoMarkup({...HISTORY.map.detail,alt:'Detail of sheet 15 of Texeira’s 1656 map',caption:'Detail from sheet 15 · Biblioteca Digital Hispánica via Wikimedia Commons'})}${external(HISTORY.map.detail.page,'Open image and other resolutions')}</details></section><section id="museum-route" class="museum-section"><p class="eyebrow">SATURDAY · 16:00–18:00</p><h2>A route through the MAN</h2><p>Start with Iberian sculpture, then Roman life, the Visigothic court and the medieval collections. Use the current floor plan and leave 15–20 minutes to move between sections or revisit a favourite.</p>${photoMarkup(PLACES.man.photo)}<div class="museum-grid">${HISTORY.museum.map(item => `<article class="note"><span class="tag">${esc(item.time)}</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p></article>`).join('')}</div><ul class="references">${referenceLinks(['hispania','guarrazar','man','manHours'])}</ul><button class="btn" data-place="man">Museum details and tickets</button></section>`;
}
function renderHome() {
  return `${heading('Getting there and home','Bastien stays with Fer in Pacífico. Sam stays with José in Quintana. Pins mark stations, not flats.')}<div class="home-grid">${['fer','jose'].map(id => {
    const place = PLACES[id];
    return `<article class="home-card"><p class="eyebrow">${esc(place.area)}</p><h3>${esc(place.name)}</h3><span class="line ${id === 'fer' ? 'l1' : 'l5'}">${id === 'fer' ? '1' : '5'}</span>${id === 'fer' ? '<span class="line l6">6</span>' : ''}<p><strong>${id === 'fer' ? 'Calle de Cavanilles' : 'Calle de Ezequiel Solana'}</strong><br>${id === 'fer' ? 'Pacífico' : 'Quintana'} metro</p><p>${esc(place.story)}</p><p>${esc(place.practical)}</p><button class="btn" data-directions="${id}">Get to ${esc(place.area)}</button></article>`;
  }).join('')}</div><div class="notice"><p><strong>Metro works: 24–25 October</strong>The western L6 section between Cuatro Caminos and Lucero is closed. Use L1 from Pacífico for the centre. A separate L10 closure at Cuzco does not affect Príncipe Pío → Alonso Martínez. ${external(SOURCES.metro,'CRTM service alerts')}</p></div><div class="home-grid"><div class="note"><h3>From Barajas</h3><p>Allow roughly 90–120 minutes from landing to bags dropped. The best route depends on the terminal and luggage. Use the airport signs for your actual terminal.</p>${routeAnchor('https://www.google.com/maps/dir/?api=1&origin=Adolfo+Suarez+Madrid+Barajas+Airport&destination=Pacifico+Metro+Madrid&travelmode=transit','Barajas → Pacífico','text-btn')}</div><div class="note"><h3>Useful at the bar</h3><p>“Cuatro cañas, por favor” — four small beers.<br>“Para compartir” — to share.<br>“Sin carne ni pescado” — without meat or fish.<br>“La cuenta, por favor” — the bill, please.</p></div></div><div class="note"><h3>Monday flights</h3><p>Fer and José are working. Check your terminal and airport route on Sunday evening.</p></div>`;
}
function mapEntries() {
  const entries = visibleStops().map(stop => ({id:stop.place, label:String(DAYS[state.day].stops.indexOf(stop)+1), type:PLACES[stop.place].kind === 'home' ? 'home' : 'stop'}));
  if (state.mapHomes) ['fer','jose'].forEach((id,index) => entries.push({id,label:index ? 'J' : 'F',type:'home'}));
  if (state.view === 'map' && state.mapIdeas) IDEAS.filter(idea => idea.days.includes(DAYS[state.day].id)).forEach(idea => entries.push({id:idea.place,label:'+',type:'idea'}));
  return entries.filter((entry,index,all) => all.findIndex(other => other.id === entry.id) === index);
}
function setMapStatus(message) { if ($('#mapStatus')) $('#mapStatus').textContent = message; }
function fitMap() {
  if (!map || !map.guideExtent) return;
  map.getView().fit(map.guideExtent,{padding:[45,45,45,45],maxZoom:15,duration:0});
}
let mapLibrariesPromise = null;
function loadMapLibraries() {
  if (window.ol && window.olms) return Promise.resolve();
  if (!mapLibrariesPromise) {
    const load = src => new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Map library unavailable'));
      document.head.appendChild(script);
    });
    mapLibrariesPromise = load('vendor/ol.js?v=10.6.1').then(() => load('vendor/olms.js?v=13.6.0'));
  }
  return mapLibrariesPromise;
}
function mountMap() {
  const element = $('#map');
  if (!element) return;
  if (!window.ol || !window.olms) {
    setMapStatus('Loading map… The itinerary and directions are ready.');
    loadMapLibraries().then(() => { if (element.isConnected) mountMap(); }).catch(() => {
      if (!element.isConnected) return;
      setMapStatus('The map library could not load. Use the numbered place list and route links below.');
      element.innerHTML = '<div class="map-fallback">Map unavailable on this connection. Directions and place details remain available.</div>';
    });
    return;
  }
  const basemap = new ol.layer.Group();
  const localMap = new ol.Map({target:element,layers:[basemap],view:new ol.View({center:ol.proj.fromLonLat([-3.7035,40.417]),zoom:13}),controls:[new ol.control.Zoom({zoomInTipLabel:'Zoom in',zoomOutTipLabel:'Zoom out'}),new ol.control.Attribution({collapsible:false,tipLabel:'Attributions'})]});
  map = localMap;
  const features = mapEntries().map(entry => {
    const feature = new ol.Feature({geometry:new ol.geom.Point(ol.proj.fromLonLat([PLACES[entry.id].lng,PLACES[entry.id].lat])),placeId:entry.id});
    feature.setStyle(new ol.style.Style({image:new ol.style.Circle({radius:15,fill:new ol.style.Fill({color:entry.type === 'home' ? '#ba492d' : entry.type === 'idea' ? '#806428' : '#173c36'}),stroke:new ol.style.Stroke({color:'#fffef9',width:2})}),text:new ol.style.Text({text:entry.label,font:'bold 12px Arial',fill:new ol.style.Fill({color:'#fff'}),offsetY:1})}));
    return feature;
  });
  const source = new ol.source.Vector({features});
  const pins = new ol.layer.Vector({source,zIndex:100});
  localMap.addLayer(pins);
  if (features.length) localMap.guideExtent = source.getExtent();
  fitMap();
  localMap.on('singleclick',event => {
    const feature = localMap.forEachFeatureAtPixel(event.pixel,feature => feature,{layerFilter:layer => layer === pins,hitTolerance:10});
    if (feature) openPlace(feature.get('placeId'));
  });
  localMap.on('pointermove',event => {
    if (!event.dragging) localMap.getTargetElement().style.cursor = localMap.hasFeatureAtPixel(event.pixel,{layerFilter:layer => layer === pins,hitTolerance:8}) ? 'pointer' : '';
  });
  olms.apply(basemap,'https://tiles.openfreemap.org/styles/positron').then(() => {
    if (map !== localMap) return;
    setMapStatus(state.mapYear === '1656' ? '1656 scan over today’s streets. Switch to “Today’s streets” to compare.' : 'Drag to move; use + / − or pinch to zoom.');
    basemap.getLayers().forEach(layer => {
      layer.getSource()?.on('tileloaderror',() => { if (map === localMap) setMapStatus('Some map tiles did not load. Use the place list and directions if the map is incomplete.'); });
    });
  }).catch(() => { if (map === localMap) setMapStatus('Street tiles could not load. Pins and the place list still work; use Directions for a route.'); });
  historicLayer = null;
  if (state.mapYear === '1656') {
    const params = new URLSearchParams({SERVICE:'WMS',VERSION:'1.3.0',REQUEST:'GetMap',LAYERS:HISTORY.map.layer,STYLES:'',CRS:'CRS:84',BBOX:HISTORY.map.bounds.join(','),WIDTH:'1800',HEIGHT:'1200',FORMAT:'image/png',TRANSPARENT:'TRUE'});
    const historicSource = new ol.source.ImageStatic({url:HISTORY.map.wms+'?'+params,imageExtent:HISTORY.map.bounds,projection:'EPSG:4326',crossOrigin:'anonymous',attributions:'1656 scan © Ayuntamiento de Madrid'});
    historicSource.on('imageloaderror',() => { if (map === localMap) setMapStatus('The municipal historic scan could not load. Today’s streets remain below it; the map record and image are in History.'); });
    historicLayer = new ol.layer.Image({source:historicSource,zIndex:20,opacity:0.88});
    localMap.addLayer(historicLayer);
    if (!features.length) localMap.getView().fit(ol.proj.transformExtent(HISTORY.map.bounds,'EPSG:4326','EPSG:3857'),{padding:[15,15,15,15]});
  }
  requestAnimationFrame(() => { if (map === localMap) { localMap.updateSize(); fitMap(); } });
}
function render() {
  if (map) { map.setTarget(undefined); map.dispose(); map = null; }
  syncControls();
  const views = {plan:renderPlan,map:renderMap,history:renderHistory,ideas:renderIdeas,home:renderHome};
  $('#pageContent').innerHTML = views[state.view]();
  mountMap();
}
function showDialog(html) {
  $('#dialogContent').innerHTML = html;
  if (!$('#detailDialog').open) $('#detailDialog').showModal();
  $('#detailDialog').scrollTop = 0;
}
function findPreviousPlace(id) {
  const stops = DAYS[state.day].stops, index = stops.findIndex(stop => stop.place === id);
  if (index > 0 && unlocked(stops[index-1])) return PLACES[stops[index-1].place];
  return null;
}
function openPlace(id, directions = false) {
  const place = PLACES[id];
  if (!place) return;
  activePlace = id;
  previousPlace = findPreviousPlace(id);
  const origin = place.kind === 'home' ? 'central' : previousPlace ? 'previous' : 'fer';
  const mode = origin === 'previous' && !['paco','equis','man'].includes(id) ? 'walking' : 'transit';
  showDialog(`<p class="dialog-kicker">${esc(place.area)} · ${esc(place.kind)}</p><h2 id="dialogTitle">${esc(place.name)}</h2><p class="address">${esc(place.address)}</p>${photoMarkup(place.photo)}<h3 class="detail-subheading">Why this stop</h3><p>${esc(place.why || place.summary)}</p><h3 class="detail-subheading">Background</h3><p>${esc(place.story)}</p>${place.look ? `<details><summary>What to look for</summary><p>${esc(place.look)}</p></details>` : ''}<h3 class="detail-subheading">For this weekend</h3><p class="practical">${esc(place.practical)}</p><div class="dialog-links">${external(place.wiki,place.wikiLabel || 'Wikipedia','btn secondary')}${place.tickets ? external(place.tickets,'Tickets / reservation','btn secondary') : ''}${place.phone ? `<a class="btn secondary" href="tel:${esc(place.phone)}">Call venue</a>` : ''}${routeAnchor(placeMapUrl(place),'Show this place','btn secondary')}</div><section class="directions-panel" id="directionsPanel"><h3>Directions</h3><p class="small">Choose a starting point. “My location” depends on Google Maps knowing where you are.</p><div class="route-options"><label for="routeOrigin">From</label><select id="routeOrigin">${previousPlace ? `<option value="previous">Previous stop · ${esc(previousPlace.name)}</option>` : ''}<option value="fer">Fer + Bastien · Pacífico station</option><option value="jose">José + Sam · Quintana station</option><option value="central">Centre · Gran Vía station (L1 / L5)</option><option value="current">My location in Google Maps</option></select></div><div class="route-options"><label for="routeMode">By</label><select id="routeMode"><option value="walking">Walking</option><option value="transit">Metro / public transport</option></select></div><a class="btn" id="routeLink" href="${esc(mapUrl(place,'transit',locationQuery(PLACES.fer)))}">Open route in Google Maps ↗</a><p class="small">Opens Google Maps in this tab or its app. Use Back to return. Host starting points are the stations, not the flats.</p></section><h3 class="detail-subheading">References</h3><ul class="references">${referenceLinks(place.refs || [])}<li>${external(place.wiki,place.wikiLabel || 'Wikipedia article')}<small>Background reading</small></li></ul><p class="small">Visitor information checked 23 October 2026. Prices marked as estimates are our budget allowances, not current menu quotations.</p>${photoMarkup(place.areaPhoto)}`);
  $('#routeOrigin').value = origin;
  $('#routeMode').value = mode;
  updateRouteLink();
  if (directions) { $('#directionsPanel').scrollIntoView({block:'start'}); $('#routeOrigin').focus({preventScroll:true}); }
}
function updateRouteLink() {
  const key = $('#routeOrigin').value;
  const origin = key === 'current' ? '' : key === 'central' ? 'Gran Vía metro station, Madrid' : locationQuery(key === 'previous' ? previousPlace : PLACES[key]);
  $('#routeLink').href = mapUrl(PLACES[activePlace],$('#routeMode').value,origin);
}
function openSources() {
  showDialog(`<p class="dialog-kicker">Updated 23 October 2026</p><h2 id="dialogTitle">Sources and practical notes</h2><p>This is a dated plan for 23–25 October, not a live booking or opening-status service. No tables or tickets have been reserved. Event timing and published venue hours are linked to their sources.</p><p>Food allowance: roughly <strong>€80–135 per person</strong> for the weekend, before transport and extra drinks. Meal prices are estimates. Free museum hours do not guarantee a short queue.</p><p>Surprise mode hides future names, photographs, pins and route destinations until their Madrid reveal time. You can reveal any stop early. Preferences and visited stops are saved only in this browser.</p><p>All times use <strong>Europe/Madrid</strong>. On Sunday 25 October the clocks go back from 03:00 to 02:00.</p>${state.surprise && !state.references ? '<button class="btn" id="revealReferences">Show all references (includes future places)</button>' : `<ul class="references all-references">${referenceLinks(Object.keys(REFERENCES))}</ul>`}<p class="small">References open in the original language of each source.</p><h3 class="detail-subheading">Photos and maps</h3><p class="small">Photographs link to the original file, creator and licence in their captions. Images are resized; card previews may be cropped. Neighbourhood views are labelled as such. No photographs of the hosts’ homes are included.</p><p class="small">Street map: OpenFreeMap / OpenMapTiles, © OpenStreetMap contributors. Historic scan: Ayuntamiento de Madrid’s Geoportal. The historic raster is a reference, not a surveyed reconstruction of the city boundary.</p><button class="text-btn" id="resetProgress">Reset visited stops and early reveals</button>`);
}
function showTravel() {
  showDialog(`<p class="dialog-kicker">Checked 23 October</p><h2 id="dialogTitle">Metro this weekend</h2><p><strong>24–25 October:</strong> L6 is closed on its western section between Cuatro Caminos and Lucero. Use L1 from Pacífico for Sol.</p><p>A separate L10 closure is listed between Cuzco and Nuevos Ministerios. The Saturday journey from Príncipe Pío to Alonso Martínez is south of that closure.</p><p>José: Quintana, L5. Fer: Pacífico, L1/L6.</p>${external(SOURCES.metro,'CRTM service alerts','btn')}`);
}
function changeView(view) {
  state.view = view;
  history.replaceState(null,'','#'+view);
  render();
  $(['home','history'].includes(view) ? '#pageContent' : '#daySelector').scrollIntoView({block:'start',behavior:'auto'});
}
document.addEventListener('click',event => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.view) { changeView(button.dataset.view); return; }
  if (button.dataset.day) { state.day = Number(button.dataset.day); render(); return; }
  if (button.dataset.place) { openPlace(button.dataset.place); return; }
  if (button.dataset.directions) { openPlace(button.dataset.directions,true); return; }
  if (button.dataset.reveal) { state.revealed.push(button.dataset.reveal); save(); render(); toast('Stop revealed.'); return; }
  if (button.dataset.revealRoute) {
    const route = ROUTES.find(route => route.id === button.dataset.revealRoute);
    DAYS[state.day].stops.filter(stop => route.places.includes(stop.place)).forEach(stop => state.revealed.push(stop.id));
    save(); render(); toast('Route revealed. You can now open its map.'); return;
  }
  if (button.dataset.done) { state.done = state.done.includes(button.dataset.done) ? state.done.filter(id => id !== button.dataset.done) : [...state.done,button.dataset.done]; save(); render(); return; }
  if (button.dataset.ideaFilter) { state.ideaFilter = button.dataset.ideaFilter; render(); return; }
  if (button.dataset.mapYear) { state.mapYear = button.dataset.mapYear; render(); return; }
  if (button.hasAttribute('data-saturday-plan')) { state.day = 1; changeView('plan'); return; }
  if (button.hasAttribute('data-compare-history')) { state.day = 1; state.mapYear = '1656'; changeView('map'); return; }
  if (button.id === 'spoilerToggle') { state.surprise = !state.surprise; save(); render(); toast(state.surprise ? 'Future stops hidden.' : 'Full plan visible.'); return; }
  if (button.id === 'revealIdeas') { state.ideas = true; save(); render(); return; }
  if (button.id === 'revealHistory') { state.history = true; save(); render(); return; }
  if (button.id === 'revealReferences') { state.references = true; openSources(); return; }
  if (button.id === 'mapIdeas') { state.mapIdeas = !state.mapIdeas; render(); return; }
  if (button.id === 'mapHomes') { state.mapHomes = !state.mapHomes; render(); return; }
  if (button.id === 'fitMap') { fitMap(); return; }
  if (button.id === 'infoButton') { openSources(); return; }
  if (button.id === 'travelNotice') { showTravel(); return; }
  if (button.classList.contains('close-dialog')) { $('#detailDialog').close(); return; }
  if (button.id === 'resetProgress') { state.done=[]; state.revealed=[]; state.ideas=false; state.history=false; state.mapIdeas=false; save(); $('#detailDialog').close(); render(); toast('Local progress reset.'); }
});
document.addEventListener('change',event => {
  if (['routeOrigin','routeMode'].includes(event.target.id)) updateRouteLink();
  if (event.target.id === 'ideaType') { state.ideaType = event.target.value; render(); }
});
document.addEventListener('error',event => {
  if (event.target.tagName === 'IMG') { event.target.hidden = true; event.target.closest('figure')?.classList.add('photo-unavailable'); }
},true);
$('#detailDialog').addEventListener('click',event => {
  if (event.target !== $('#detailDialog')) return;
  const rect = event.target.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.target.close();
});
window.addEventListener('hashchange',() => {
  const view = location.hash.slice(1);
  if (VIEWS.includes(view)) { state.view = view; render(); }
});
function tick() {
  $('#madridClock').textContent = new Intl.DateTimeFormat(i18nLocale(),{timeZone:'Europe/Madrid',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' '+translateText('in Madrid');
  const signature = visibleStops().map(stop => stop.id).join();
  if (tick.last !== undefined && signature !== tick.last && state.surprise && !$('#detailDialog').open) render();
  tick.last = signature;
}
render();tick();setInterval(tick,30000);
