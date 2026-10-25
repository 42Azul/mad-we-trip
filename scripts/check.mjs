import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
// Keep reveal coverage independent of the day CI happens to run.
class TestDate extends Date {
  constructor(...args) { super(...(args.length ? args : ['2026-10-23T08:00:00Z'])); }
  static now() { return Date.parse('2026-10-23T08:00:00Z'); }
}
const noop=()=>{};
const element={addEventListener:noop,classList:{add:noop,remove:noop},close:noop};
const sandbox={URLSearchParams,Intl,Date:TestDate,console,setTimeout,clearTimeout,localStorage:{getItem:()=>null,setItem:noop},location:{hash:''},document:{querySelector:()=>element,addEventListener:noop},window:{addEventListener:noop}};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync('dist/data.js','utf8'),sandbox);
vm.runInContext(fs.readFileSync('dist/app.js','utf8').replace('render();tick();setInterval(tick,30000);',''),sandbox);
const run=s=>vm.runInContext(s,sandbox);
assert.equal(run("unlocked(DAYS[0].stops[3],Date.parse('2026-10-23T19:59:59Z'))"),false);
assert.equal(run("unlocked(DAYS[0].stops[3],Date.parse('2026-10-23T20:00:00Z'))"),true);
assert.equal(run("unlocked(DAYS[2].stops.find(s=>s.id==='trash'),Date.parse('2026-10-25T09:44:59Z'))"),false);
assert.equal(run("unlocked(DAYS[2].stops.find(s=>s.id==='trash'),Date.parse('2026-10-25T09:45:00Z'))"),true);
assert.match(run("timeLabel('2026-10-25T09:30:00+01:00')"),/09:30/);
run("state.revealed=['equis']");
assert.equal(run("unlocked(DAYS[0].stops[3],0)"),true);
run("state.revealed=[];state.surprise=false");
assert.equal(run("unlocked(DAYS[2].stops.find(s=>s.id==='trash'),0)"),true);
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
assert(!run('renderMap()').includes('Gran Vía: Metrópolis'));
for(const name of ['Gran Vía: Metrópolis','Pez Tortilla','Archaeological Museum']){assert(!run('renderMap()').includes(name));assert(!run('renderPlan()').includes(name));}
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
assert.equal(data.days[1].stops[0].id,'sol');
assert(!data.days[1].stops.some(s=>s.place==='fer'));
assert.match(data.places.fer.story,/Bastien stays with Fer/);
assert.match(data.places.jose.story,/Sam stays with José/);
assert.equal(data.days[2].stops[0].place,'tirso');
assert.equal(data.days[2].stops.find(s=>s.id==='churros').place,'santaana');
assert.equal(data.days[2].stops[2].id,'trash');
assert(Date.parse(data.days[2].stops.find(s=>s.id==='churros').at)<Date.parse(data.days[2].stops.find(s=>s.id==='trash').at));
run('state.surprise=true');
assert.equal(run("unlocked(DAYS[2].stops.find(s=>s.id==='churros'),Date.parse('2026-10-25T07:29:59Z'))"),false);
assert.equal(run("unlocked(DAYS[2].stops.find(s=>s.id==='churros'),Date.parse('2026-10-25T07:30:00Z'))"),true);
run('state.day=1');
assert.match(run('startMarkup()'),/Breakfast near home/);
assert.match(run('startMarkup()'),/origin=Quintana/);
assert.match(run('startMarkup()'),/origin=Pac/);
// Sunday logistics must not leak a future breakfast address or direction link.
const guarded=run("stopMarkup({...DAYS[2].stops.find(s=>s.id==='churros'),at:'2099-01-01T00:00:00Z'},0)");
assert(!guarded.includes('Churrería Santa Ana'));
assert(!guarded.includes('maps/dir'));
console.log('PASS: two-base logistics, Sunday churros,  Madrid/DST reveals, spoiler protection, explicit route origins, mobile waypoint limits, Gran Vía itinerary, references and photo attribution.');
