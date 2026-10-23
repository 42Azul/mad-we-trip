import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const noop=()=>{};
const element={addEventListener:noop,classList:{add:noop,remove:noop},close:noop};
const sandbox={URLSearchParams,Intl,Date,console,setTimeout,clearTimeout,localStorage:{getItem:()=>null,setItem:noop},location:{hash:''},document:{querySelector:()=>element,addEventListener:noop},window:{addEventListener:noop}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('dist/data.js','utf8'),sandbox);
vm.runInContext(fs.readFileSync('dist/app.js','utf8').replace('render();tick();setInterval(tick,30000);',''),sandbox);
const run=s=>vm.runInContext(s,sandbox);
assert.equal(run("unlocked(DAYS[0].stops[3],Date.parse('2026-10-23T19:59:59Z'))"),false);
assert.equal(run("unlocked(DAYS[0].stops[3],Date.parse('2026-10-23T20:00:00Z'))"),true);
assert.equal(run("unlocked(DAYS[2].stops[0],Date.parse('2026-10-25T08:29:59Z'))"),false);
assert.equal(run("unlocked(DAYS[2].stops[0],Date.parse('2026-10-25T08:30:00Z'))"),true);
assert.match(run("timeLabel('2026-10-25T09:30:00+01:00')"),/09:30/);
run("state.revealed=['equis']");
assert.equal(run("unlocked(DAYS[0].stops[3],0)"),true);
run("state.revealed=[];state.surprise=false");
assert.equal(run("unlocked(DAYS[2].stops[0],0)"),true);
run("state.surprise=true");
const locked=run("stopMarkup({...DAYS[0].stops[3],at:'2099-01-01T00:00:00Z'},3)");
assert(!locked.includes('Sala Equis'));
assert(!locked.includes('Duque de Alba'));
assert(!locked.includes('maps/dir'));
assert(locked.includes('Reveal this stop'));
assert(!locked.includes('<img'));
assert(!locked.includes('maps/search'));
assert(!locked.includes('References'));
assert.match(run("mapUrl(PLACES.paco,'transit','Quintana metro Madrid')"),/origin=Quintana\+metro\+Madrid/);
const data=run('({places:PLACES,days:DAYS,ideas:IDEAS})');
for(const day of data.days) for(const s of day.stops){assert(data.places[s.place]);assert(Number.isFinite(Date.parse(s.at)))}
for(const p of Object.values(data.places)){assert(p.wiki.startsWith('https://'));assert(p.lat>40&&p.lat<41);assert(p.lng>-4&&p.lng<-3)}
for(const i of data.ideas)assert(data.places[i.place]);
const ids=data.days.flatMap(d=>d.stops.map(s=>s.id));assert.equal(new Set(ids).size,ids.length);
for (const route of run('ROUTES')) {
  assert(route.places.length >= 2 && route.places.length <= 5);
  const url = new URL(run(`routeUrl(ROUTES.find(r=>r.id===${JSON.stringify(route.id)}))`));
  assert(url.searchParams.get('origin'));
  assert(url.searchParams.get('destination'));
  const waypoints = url.searchParams.get('waypoints');
  assert(!waypoints || waypoints.split('|').length <= 3);
  if(route.mode === 'transit') assert(!waypoints);
}
run('state.day=1;state.surprise=true;state.revealed=[];state.history=false;state.ideas=false');
assert(!run('renderHistory()').includes('Guarrazar'));
assert(!run('renderIdeas()').includes('Beti Jai'));
assert(!run('renderMap()').includes('waypoints='));
for(const name of ['Gran Vía','Pez Tortilla','Archaeological Museum']){assert(!run('renderMap()').includes(name));assert(!run('renderPlan()').includes(name));}
run('state.surprise=false');
assert(run('renderMap()').includes('waypoints='));
assert(run('renderPlan()').includes('Gran Vía'));
assert(run('renderHistory()').includes('1656'));
for (const place of Object.values(data.places)) {
  if(place.kind === 'home') assert(!place.photo && !place.areaPhoto);
  for(const key of place.refs || []) assert(run(`!!REFERENCES[${JSON.stringify(key)}]`));
  if(place.photo) { assert(place.photo.author); assert(place.photo.license); assert(place.photo.page.startsWith('https://commons.wikimedia.org/')); }
}
assert(run("PLACES.paco.lng < -3.72"));
console.log('PASS: Madrid/DST reveals, spoiler protection, explicit route origins, mobile waypoint limits, Gran Vía itinerary, references and photo attribution.');
