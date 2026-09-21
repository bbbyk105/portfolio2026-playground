export type Lang = "en" | "ja";

/** A string that exists in both languages. */
export type Copy = { en: string; ja: string };

/** Where a language choice made with the toggle is remembered. */
export const STORAGE_KEY = "bk-lang";

/**
 * The two language trees.
 *
 * Japanese sits at the root and English under /en — the work is sold in
 * Japan, so the strongest URLs carry the Japanese pages, and the eleven URLs
 * that were already public keep their addresses.
 *
 * `path` throughout is the shared part of a route: "" for the home page,
 * "/works/caroot" for a case study. No trailing slash, matching
 * `trailingSlash: false` in the Next config.
 */
export function localePath(lang: Lang, path: string) {
  return lang === "ja" ? path : `/en${path}`;
}

/** The same thing as an href, where the home page needs its slash back. */
export function localeHref(lang: Lang, path: string) {
  return localePath(lang, path) || "/";
}

/** Splits a pathname into the language it is in and the path underneath. */
export function readPath(pathname: string): { lang: Lang; path: string } {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  if (clean === "/en" || clean.startsWith("/en/")) {
    return { lang: "en", path: clean.slice(3) };
  }
  return { lang: "ja", path: clean === "/" ? "" : clean };
}

