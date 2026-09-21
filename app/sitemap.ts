import type { MetadataRoute } from "next";
import { localePath, type Lang } from "@/lib/i18n";
import { research } from "@/lib/research";
import { CONTENT_UPDATED } from "@/lib/seo";
import { site } from "@/lib/site";
import { works } from "@/lib/works";

export const dynamic = "force-static";

/** Every page, once per language, with the pair declared on both entries. */
export default function sitemap(): MetadataRoute.Sitemap {
  // A fixed date, not `new Date()`: a build timestamp would tell crawlers that
  // every page changed on every deploy, which is how lastmod stops being read.
  const lastModified = CONTENT_UPDATED;

  const routes: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/works", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    ...works.map((w) => ({ path: `/works/${w.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    ...research.map((r) => ({ path: `/works/research/${r.slug}`, priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  const url = (lang: Lang, path: string) => `${site.url}${localePath(lang, path)}`;

  return routes.flatMap(({ path, priority, changeFrequency }) =>
    (["ja", "en"] as const).map((lang) => ({
      url: url(lang, path),
      lastModified,
      changeFrequency,
      // Japanese carries a little more weight: it is the version the work is
      // sold in, and the one x-default points at.
      priority: lang === "ja" ? priority : Math.round((priority - 0.1) * 10) / 10,
      alternates: {
        languages: { ja: url("ja", path), en: url("en", path), "x-default": url("ja", path) },
      },
    }))
  );
}
