import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const noop=()=>{};
const elements=new Map();
const $=s=>{if(!elements.has(s))elements.set(s,{addEventListener:noop,classList:{add:noop,remove:noop},close:noop,scrollIntoView:noop,focus:noop});return elements.get(s);};
const sandbox={URLSearchParams,URL,Intl,Date,console,setTimeout,clearTimeout,localStorage:{getItem:()=>null,setItem:noop},location:{hash:'',search:''},document:{querySelector:$,addEventListener:noop},window:{addEventListener:noop}};
vm.createContext(sandbox);
for(const file of ['data.js','translations.js','i18n.js','app.js'])vm.runInContext(fs.readFileSync('dist/'+file,'utf8').replace('render();tick();setInterval(tick,30000);',''),sandbox);
const run=src=>vm.runInContext(src,sandbox);
const dictionary=run('TRANSLATIONS');
assert.deepEqual(Object.keys(dictionary.es).sort(),Object.keys(dictionary.fr).sort());
for(const lang of ['es','fr'])for(const [source,target] of Object.entries(dictionary[lang])){assert(target.trim(),lang+': '+source);assert.equal(run(`translateText(${JSON.stringify(source)},${JSON.stringify(lang)})`),target);}
const fields=new Set('name area address wikiLabel story practical summary why look kind alt caption license title publisher scope checked published label theme subtitle range pace budget note time hint desc distance tag when replaces cost minutes tradeoff intro date body connection text'.split(' '));
let count=0;
function checkData(value){if(Array.isArray(value)){value.forEach(checkData);return;}if(!value||typeof value!=='object')return;for(const [key,item] of Object.entries(value)){if(typeof item==='string'&&fields.has(key)&&/[A-Za-z]/.test(item)){for(const lang of ['es','fr'])assert(Object.hasOwn(dictionary[lang],item),lang+' missing data: '+item);count++;}else if(typeof item==='object')checkData(item);}}
checkData(run('({REFERENCES,PLACES,DAYS,IDEAS,ROUTES,HISTORY})'));
// Exercise visible and hidden variants, every day, every place panel and every reference.
const output=[fs.readFileSync('dist/index.html','utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>|<noscript>[\s\S]*?<\/noscript>/g,'')];
for(let day=0;day<3;day++)for(const surprise of [true,false])for(const revealed of [false,true]){
 run(`state.day=${day};state.surprise=${surprise};state.revealed=${revealed?'DAYS.flatMap(d=>d.stops.map(s=>s.id))':'[]'};state.ideas=${revealed};state.history=${revealed};state.references=${revealed};state.ideaFilter='all'`);
 for(const view of ['Plan','Map','Ideas','History','Home'])output.push(run('render'+view+'()'));
}
sandbox.collect=html=>output.push(html);run('showDialog=collect');
for(const id of run('Object.keys(PLACES)'))run(`openPlace(${JSON.stringify(id)})`);
for(const references of [true,false])run(`state.references=${references};openSources()`);
run('showTravel()');
const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const texts=new Set();
for(const html of output){for(const text of html.split(/<[^>]*>/))if(/[A-Za-z]/.test(text))texts.add(decode(text).replace(/\s+/g,' ').trim());for(const m of html.matchAll(/\b(?:alt|title|aria-label|placeholder)="([^"]*)"/g))texts.add(decode(m[1]));}
const sourceKeys=Object.keys(dictionary.es).sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
const known=new RegExp('(?<![\\p{L}\\p{N}])(?:'+sourceKeys.join('|')+')(?![\\p{L}\\p{N}])','gu');
const uncovered=[...texts].map(source=>({source,left:source.replace(known,'')})).filter(x=>/[A-Za-z]/.test(x.left));
if(uncovered.length){console.error('Uncovered interface text:',uncovered);process.exitCode=1;}
else console.log(`PASS: ${count} content fields, ${texts.size} rendered text/label variants, both translation dictionaries complete.`);
// Route strings are canonical in every language; switching language cannot translate destinations.
for(const lang of ['en','es','fr']){run(`guideLanguage='${lang}'`);assert.match(run("mapUrl(PLACES.sangines,'transit',locationQuery(PLACES.jose))"),/origin=Quintana/);assert.match(run("mapUrl(PLACES.sangines,'transit',locationQuery(PLACES.jose))"),/Pasadizo/);}
assert.equal(run("translateText('Mark Royal Palace & Oriente as visited','es')"),'Marcar Palacio Real y Oriente como visitado');
assert.equal(run("translateText('Food: €30–50 / person, estimated','fr')"),'Repas : €30–50 / personne, estimation');
// A shared link overrides the saved choice; an ordinary visit restores it.
function initialLanguage(search,saved){const context={URLSearchParams,location:{search},localStorage:{getItem:()=>saved},document:{addEventListener:()=>{}}};vm.createContext(context);vm.runInContext(fs.readFileSync('dist/i18n.js','utf8'),context);return vm.runInContext('guideLanguage',context);}
assert.equal(initialLanguage('',null),'en');
assert.equal(initialLanguage('','es'),'es');
assert.equal(initialLanguage('?lang=fr','es'),'fr');
assert.equal(initialLanguage('?lang=unknown','fr'),'fr');
assert.equal(initialLanguage('?lang=unknown','unknown'),'en');
const index=fs.readFileSync('dist/index.html','utf8');
assert.match(index,/translations\.js[\s\S]*i18n\.js[\s\S]*app\.js/);
assert.match(index,/id="dialogLanguageSelect" data-language-select/);
