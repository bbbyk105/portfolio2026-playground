import type { ReactNode } from "react";
import type { Copy } from "@/lib/i18n";

/**
 * Bilingual copy. There is no directive at the top of this file on purpose:
 * both of these are pure render, so they stay on the server and the copy they
 * carry is in the HTML rather than in a bundle — which matters, because almost
 * every string on the site goes through them.
 *
 * Rendering both languages and letting the stylesheet hide one, rather than
 * branching in JavaScript, keeps the correct copy on screen from the very
 * first paint and leaves both languages in the markup for search engines.
 * The language itself is decided by the inline script in the layout; only the
 * nav toggle and the form need to read it, and those use LangProvider.
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
