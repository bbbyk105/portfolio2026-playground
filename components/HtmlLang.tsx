"use client";

import { useEffect } from "react";
import type { Lang } from "@/lib/i18n";

/**
 * Sets `lang` on the 404's html element.
 *
 * The two language trees write it server-side, but the 404 is rendered
 * inside the bare html Next supplies for a root not-found, and that one
 * takes no attributes from here. Setting it with a script before hydration
 * would mean React finding an element it did not render — so it waits.
 * A frame of Latin line breaking on a noindex page is the cheaper trade.
 */
export default function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
