import type { ReactNode } from "react";
import BackToTop from "./BackToTop";
import DisplayReveal from "./DisplayReveal";
import JsonLd from "./JsonLd";
import LangPreference from "./LangPreference";
import type { Lang } from "@/lib/i18n";
import { siteGraph } from "@/lib/seo";

/**
 * The html/body shell, shared by the two root layouts.
 *
 * `lang` is written straight into the markup now rather than patched in by a
 * script before first paint: each language has its own URL, so the server
 * knows which one it is serving. That is also what the stylesheet reads for
 * the Japanese typography.
 */
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={lang} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* A flag that scripting is on, set before first paint. It lets the
            stylesheet hold the hero headline back until HeroReveal has cut it
            into characters — without it, a visitor with no JavaScript would
            be left with an invisible headline. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("js");` }} />
      </head>
      <body>
        {children}
        <JsonLd graph={siteGraph(lang)} />
        <LangPreference lang={lang} />
        <DisplayReveal />
        <BackToTop lang={lang} />
      </body>
    </html>
  );
}
