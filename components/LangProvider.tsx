"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { applyLang, currentLang, type Lang } from "@/lib/i18n";
import { scrollToTop } from "@/lib/scroll";

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

/**
 * Holds the language for the two places that cannot render both at once — the
 * nav's toggle and the form's attributes. Everything else uses <T>/<C>, which
 * render both languages and let the stylesheet choose, and so never reach the
 * client at all.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  // The server cannot know the visitor's language, so render neutral and pick
  // up what the inline script already decided once we are on the client.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    setLangState(currentLang());
  }, []);

  const setLang = useCallback((next: Lang) => {
    applyLang(next);
    setLangState(next);
    // Every string on the page just changed length, so wherever the reader
    // had got to no longer points at what they were reading.
    scrollToTop();
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** For attributes and other places that cannot hold two nodes at once. */
export function useLang() {
  return useContext(LangContext);
}
