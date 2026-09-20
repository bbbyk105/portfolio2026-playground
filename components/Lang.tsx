"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { applyLang, currentLang, type Copy, type Lang } from "@/lib/i18n";

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

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
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** For attributes and other places that cannot hold two nodes at once. */
export function useLang() {
  return useContext(LangContext);
}

/**
 * Renders both languages and lets the stylesheet hide one. Doing it this way
 * rather than branching in JS keeps the correct copy on screen from the very
 * first paint, and leaves both languages in the markup for search engines.
 */
export function T({ en, ja }: { en: ReactNode; ja: ReactNode }) {
  return (
    <>
      <span className="tEn">{en}</span>
      <span className="tJa">{ja}</span>
    </>
  );
}

/** The same thing for a `Copy` pair. */
export function C({ value }: { value: Copy }) {
  return <T en={value.en} ja={value.ja} />;
}
