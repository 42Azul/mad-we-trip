'use strict';
// Local, authored translations. Routing data and external URLs are never rewritten.
const SUPPORTED_LANGUAGES = ['en','es','fr'];
let guideLanguage = 'en';
try {
  const requested = new URLSearchParams(location.search).get('lang');
  const saved = localStorage.getItem('mad-weekend-language');
  guideLanguage = SUPPORTED_LANGUAGES.includes(requested) ? requested : SUPPORTED_LANGUAGES.includes(saved) ? saved : 'en';
} catch {}
const translationSources = new WeakMap();
const translationPatterns = {};
function i18nLocale() { return {en:'en-GB',es:'es-ES',fr:'fr-FR'}[guideLanguage]; }
function translateText(source, language = guideLanguage) {
  if (language === 'en' || !TRANSLATIONS[language]) return source;
  const dictionary = TRANSLATIONS[language];
  // Exact entries cover prose; longest-match composition covers labels, routes and source captions.
  const trimmed = source.trim();
  if (Object.hasOwn(dictionary,trimmed)) return source.replace(trimmed,dictionary[trimmed]);
  if (!translationPatterns[language]) {
    const keys = Object.keys(dictionary).sort((a,b)=>b.length-a.length).map(key=>key.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
    translationPatterns[language] = new RegExp('(?<![\\p{L}\\p{N}])(?:'+keys.join('|')+')(?![\\p{L}\\p{N}])','gu');
  }
  return source.replace(translationPatterns[language], match=>dictionary[match]);
}
function localizeValue(node, key, current, apply) {
  let records = translationSources.get(node);
  if (!records) { records = {}; translationSources.set(node,records); }
  let record = records[key];
  if (!record || current !== record.result) record = records[key] = {source:current,result:current};
  const translated = translateText(record.source);
  record.result = translated;
  if (translated !== current) apply(translated);
}
function localizeTree(root = document.documentElement) {
  function visit(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      if (node.parentElement?.closest('script,style,code,pre,noscript,[translate="no"]')) return;
      if (node.nodeValue.trim()) localizeValue(node,'text',node.nodeValue,value=>{node.nodeValue=value;});
      return;
    }
    if (node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11) return;
    if (node.nodeType === 1) {
      if (node.matches('script,style,code,pre,noscript,[translate="no"]') || node.closest('[translate="no"]')) return;
      for (const attr of ['alt','title','aria-label','aria-description','placeholder']) {
        if (node.hasAttribute(attr)) localizeValue(node,attr,node.getAttribute(attr),value=>node.setAttribute(attr,value));
      }
      if (node.matches('meta[name="description"]')) localizeValue(node,'content',node.content,value=>{node.content=value;});
    }
    for (const child of node.childNodes) visit(child);
  }
  visit(root);
}
function setGuideLanguage(language, remember = true) {
  if (!SUPPORTED_LANGUAGES.includes(language)) return;
  guideLanguage = language;
  document.documentElement.lang = language;
  document.querySelectorAll('[data-language-select]').forEach(select=>{select.value=language;});
  if (remember) {
    try { localStorage.setItem('mad-weekend-language',language); } catch {}
    const url = new URL(location.href);
    url.searchParams.set('lang',language);
    history.replaceState(null,'',url.pathname+url.search+url.hash);
  }
  // Re-render only the local clock; preserve the open panel, map, scroll and itinerary state.
  if (typeof tick === 'function') tick();
  localizeTree();
}
document.addEventListener('DOMContentLoaded',()=>{
  setGuideLanguage(guideLanguage,false);
  document.addEventListener('change',event=>{if(event.target.matches('[data-language-select]'))setGuideLanguage(event.target.value);});
  const observer = new MutationObserver(records=>{
    for (const record of records) {
      if (record.type === 'childList') for (const node of record.addedNodes) localizeTree(node);
      else localizeTree(record.type === 'characterData' ? record.target.parentElement : record.target);
    }
  });
  observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['alt','title','aria-label','aria-description','placeholder','content']});
});
