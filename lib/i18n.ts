export type Lang = "en" | "ja";

/** A string that exists in both languages. */
export type Copy = { en: string; ja: string };

export const STORAGE_KEY = "bk-lang";

/**
 * Language detection, as a string so it can run as a blocking inline script in
 * <head> — before the first paint, before React hydrates. It writes the result
 * to `documentElement`, and the stylesheet hides the other language, so the
 * page never flashes the wrong copy.
 *
 * Order of precedence:
 *   1. a choice the visitor made here before (localStorage)
 *   2. an explicitly English browser with no Japanese in its list → English
 *   3. a Japanese browser, or a browser in Japan's timezone → Japanese
 *   4. everything else → English
 */
export const LANG_INIT_SCRIPT = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
var l;
if(s==="ja"||s==="en"){l=s}else{
var ls=(navigator.languages&&navigator.languages.length)?navigator.languages:[navigator.language||"en"];
var ja=false,en=false,i;
for(i=0;i<ls.length;i++){if(/^ja\\b/i.test(ls[i]))ja=true;if(/^en\\b/i.test(ls[i]))en=true}
var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||""}catch(e){}
l=(en&&!ja)?"en":((ja||tz==="Asia/Tokyo")?"ja":"en")}
document.documentElement.setAttribute("data-lang",l);
document.documentElement.setAttribute("lang",l);
}catch(e){}})();`;

/** Reads what the inline script decided. Falls back to English off the client. */
export function currentLang(): Lang {
  if (typeof document === "undefined") return "en";
  return document.documentElement.getAttribute("data-lang") === "ja" ? "ja" : "en";
}

export function applyLang(lang: Lang) {
  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang);
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // Private mode or blocked storage: the choice just will not persist.
  }
}
