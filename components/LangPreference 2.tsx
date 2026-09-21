"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { localeHref, readPath, STORAGE_KEY, type Lang } from "@/lib/i18n";

/**
 * Sends a returning visitor back to the language they chose.
 *
 * Only a choice: nothing is inferred from `navigator.language` or the
 * timezone any more. Guessing would mean Googlebot, crawling from the United
 * States, being bounced off every Japanese page it asked for — the version
 * that is meant to rank — and a crawler being shown something other than
 * what a visitor sees is the definition of cloaking.
 *
 * `replace` rather than `push`, so Back leaves the site rather than bouncing
 * between the two trees.
 */
export default function LangPreference({ lang }: { lang: Lang }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      return;
    }
    if (stored !== "ja" && stored !== "en") return;
    if (stored === lang) return;
    router.replace(localeHref(stored as Lang, readPath(pathname).path));
  }, [lang, pathname, router]);

  return null;
}
