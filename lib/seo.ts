import type { Metadata } from "next";
import { localePath, type Copy, type Lang } from "./i18n";
import { pageSeo } from "./pageSeo";
import { site } from "./site";

/**
 * Canonical URLs, per-page metadata and the JSON-LD graph.
 *
 * Everything here is built from one rule: a page describes itself. The root
 * layout deliberately sets no `alternates` and no `openGraph.url`, because
 * Next.js hands those down to every child — one canonical in the layout means
 * eleven pages all claiming to be the homepage.
 */

/** Absolute URL for a route path; "" is the Japanese home page. */
export const absolute = (path: string) => `${site.url}${path}`;

/**
 * The date the content last changed, for sitemap lastmod. Bump it when the
 * copy or the case studies change — a build timestamp would tell crawlers
 * every page changed every deploy, which is how lastmod stops being believed.
 */
export const CONTENT_UPDATED = "2026-09-26";

/**
 * What every page in one tree shares. Deliberately no `alternates` and no
 * `openGraph.url`: Next.js hands both down to every child, so a canonical
 * set here would have eleven pages all claiming to be the home page.
 */
export function baseMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: pageSeo.home.title[lang], template: "%s" },
    description: pageSeo.home.description[lang],
    applicationName: "Byakko Kondo",
    authors: [{ name: "Byakko Kondo", url: site.url }],
    creator: "Byakko Kondo",
    publisher: "Byakko Kondo",
    // Let Google use a full-size image and an unclipped snippet; without this
    // it may fall back to a thumbnail for the case studies' screens. Only the
    // googlebot directives, deliberately: index/follow is already the
    // default, and a site-wide `index` tag would land on the 404 too,
    // contradicting the noindex Next puts there.
    robots: { googleBot: { "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: "website",
      siteName: "Byakko Kondo",
      locale: lang === "ja" ? "ja_JP" : "en_US",
      alternateLocale: lang === "ja" ? "en_US" : "ja_JP",
    },
    twitter: { card: "summary_large_image" },
  };
}

type PageArgs = {
  lang: Lang;
  /** The shared route path: "" for the home page, "/works/caroot" for a case study. */
  path: string;
  title: Copy;
  description: Copy;
  /** A shorter title for the share card, when the <title> carries more. */
  shareTitle?: Copy;
};

/**
 * One page's metadata, in one language, pointing at its own URL and at its
 * counterpart in the other.
 *
 * hreflang is the whole reason the site has two route trees: it tells Google
 * that /works and /en/works are the same page in two languages rather than
 * two pages competing with each other. x-default goes to the Japanese one —
 * that is where an unmatched visitor is best served.
 */
export function pageMetadata({ lang, path, title, description, shareTitle }: PageArgs): Metadata {
  const url = absolute(localePath(lang, path));
  const card = (shareTitle ?? title)[lang];
  const ja = absolute(localePath("ja", path));
  return {
    title: title[lang],
    description: description[lang],
    alternates: {
      canonical: url,
      languages: { ja, en: absolute(localePath("en", path)), "x-default": ja },
    },
    openGraph: {
      url,
      title: card,
      description: description[lang],
      locale: lang === "ja" ? "ja_JP" : "en_US",
      alternateLocale: lang === "ja" ? "en_US" : "ja_JP",
    },
    twitter: { title: card, description: description[lang] },
  };
}

/* ------------------------------------------------------------------ JSON-LD */

const PERSON = `${site.url}/#person`;
const WEBSITE = `${site.url}/#website`;

/**
 * The two nodes that are true on every page, emitted once from the layout.
 * Page-level nodes point at them by @id rather than restating them.
 *
 * One Person and one WebSite across both trees — the same human, described
 * in whichever language the page is in.
 */
export const siteGraph = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": PERSON,
      name: "Byakko Kondo",
      alternateName: "近藤白虎",
      url: site.url,
      email: `mailto:${site.email}`,
      jobTitle: "Engineer / Creative Developer",
      description: {
        ja: "フリーランスエンジニア。モバイルアプリ、Webサイト・EC、研究用ソフトウェア、業務自動化を企画から運用まで一貫して開発しています。",
        en: "A freelance engineer building mobile apps, websites and commerce, research software and workflow automation, from the idea through to operation.",
      }[lang],
      address: { "@type": "PostalAddress", addressLocality: "Tokyo", addressCountry: "JP" },
      sameAs: [site.github],
      knowsAbout: [
        "TypeScript",
        "Next.js",
        "React Native",
        "Expo",
        "Python",
        "FastAPI",
        "Supabase",
        "PostgreSQL",
        "Web development",
        "Workflow automation",
      ],
      knowsLanguage: ["ja", "en"],
    },
    {
      "@type": "WebSite",
      "@id": WEBSITE,
      url: site.url,
      name: "Byakko Kondo — Engineer / Creative Developer",
      inLanguage: ["ja", "en"],
      publisher: { "@id": PERSON },
    },
  ],
});

export type Crumb = { name: string; path: string };

/** Google reads this for the breadcrumb line in the result, not the markup. */
export function breadcrumbGraph(trail: Crumb[], lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absolute(localePath(lang, crumb.path)),
    })),
  };
}

type WorkNode = {
  path: string;
  name: string;
  description: string;
  year: string;
  /** The live site or repository the case study is about. */
  subjectOf?: string;
  image?: string;
  keywords: string[];
};

/** A case study: a page about a thing I made, not the thing itself. */
export function creativeWorkGraph(work: WorkNode, lang: Lang) {
  const page = absolute(localePath(lang, work.path));
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${page}#work`,
    name: work.name,
    description: work.description,
    url: work.subjectOf ?? page,
    dateCreated: work.year,
    creator: { "@id": PERSON },
    author: { "@id": PERSON },
    keywords: work.keywords.join(", "),
    ...(work.image ? { image: absolute(work.image) } : {}),
    inLanguage: lang,
    mainEntityOfPage: { "@type": "WebPage", "@id": page },
  };
}

/** The about page is about the person the whole site belongs to. */
export const profilePageGraph = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${absolute(localePath(lang, "/about"))}#profile`,
  url: absolute(localePath(lang, "/about")),
  inLanguage: lang,
  mainEntity: { "@id": PERSON },
  isPartOf: { "@id": WEBSITE },
});

/** The works index: a collection whose members are the case studies. */
export function collectionGraph(items: { name: string; path: string }[], lang: Lang) {
  const page = absolute(localePath(lang, "/works"));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${page}#collection`,
    url: page,
    name: lang === "ja" ? "制作実績 — 近藤白虎" : "Works — Byakko Kondo",
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE },
    about: { "@id": PERSON },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        url: absolute(localePath(lang, item.path)),
      })),
    },
  };
}

/** The contact page's enquiry form, so the intent of the page is explicit. */
export const contactPageGraph = (lang: Lang) => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${absolute(localePath(lang, "/contact"))}#contact`,
  url: absolute(localePath(lang, "/contact")),
  name: lang === "ja" ? "お問い合わせ — 近藤白虎" : "Contact — Byakko Kondo",
  inLanguage: lang,
  isPartOf: { "@id": WEBSITE },
  about: { "@id": PERSON },
});
