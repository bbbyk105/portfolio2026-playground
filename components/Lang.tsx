import type { ReactNode } from "react";
import type { Copy, Lang } from "@/lib/i18n";

/**
 * Bilingual copy.
 *
 * Each page now exists at its own URL in one language, so these render that
 * language and nothing else. They used to emit both and let the stylesheet
 * hide one — which kept the wrong language in the markup of every page, and
 * left Google reading text no visitor ever saw.
 *
 * No "use client" on purpose: both are pure render, so they stay on the
 * server and the copy they carry is in the HTML rather than in a bundle.
 */
export function T({ en, ja, lang }: { en: ReactNode; ja: ReactNode; lang: Lang }) {
  return <>{lang === "ja" ? ja : en}</>;
}

/** The same thing for a `Copy` pair. */
export function C({ value, lang }: { value: Copy; lang: Lang }) {
  return <>{value[lang]}</>;
}
