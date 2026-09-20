import type { MetadataRoute } from "next";
import { works } from "@/lib/works";
import { research } from "@/lib/research";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const at = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly") => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });

  return [
    at("", 1, "monthly"),
    at("/works", 0.9, "monthly"),
    at("/about", 0.8, "monthly"),
    at("/contact", 0.6, "yearly"),
    ...works.map((w) => at(`/works/${w.slug}`, 0.8, "monthly")),
    ...research.map((r) => at(`/works/research/${r.slug}`, 0.7, "monthly")),
  ];
}
