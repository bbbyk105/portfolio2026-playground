# Portfolio 2026 — Digital Playground

A new independent portfolio direction based on the content of Portfolio2026-ver4.

Design direction: **Digital Playground** — black + Tiffany blue, oversized kinetic typography, graphic objects, editorial work register and GSAP scroll motion.

## Pages

Each route exists twice: Japanese at the root, English under `/en`.

| Route | Contents |
| --- | --- |
| `/` · `/en` | Hero, what I can do, about, capabilities, contact |
| `/works` · `/en/works` | Register of the four products in production, plus research / automation practice |
| `/works/[slug]` | Client case study: spec table, screens, project, how it works, delivered, technology |
| `/works/research/[slug]` | Research case study: the pipeline stage by stage, the architecture tiers, the core calculation, outputs |
| `/about` · `/en/about` | Profile, journey, what I do, capability groups |
| `/contact` · `/en/contact` | Enquiry form (composes a mail draft) and direct links |
| `/404` | What the host serves for an address that matches no route |

## Language

Each language has its own URL: Japanese at the root, English under `/en`. The
work is sold in Japan, so the strongest addresses carry the Japanese pages,
and `x-default` points at them.

Two route groups, `app/(ja)` and `app/(en)/en`, each with its own root layout
writing its own `<html lang>`. Both render the same components from
`components/pages/`, which take `lang` and pass it down; `<T>` / `<C>` in
`components/Lang.tsx` resolve it. A page therefore arrives in one language and
carries no trace of the other.

The `JA / EN` toggle navigates to the same page in the other tree rather than
repainting in place, so the English pages are reachable without scripts.
Nothing is inferred from the browser: a crawler asking for a Japanese page is
never sent to the English one. Only a choice made with the toggle is
remembered, and `components/LangPreference.tsx` acts on it on a later visit.

Oversized display headings stay in English: the tight tracking and outlined
second line are the design, and Japanese does not sit in that treatment.

## Case studies

Each case study carries a **how it works** section written from the project's
own repository rather than from the pitch — the decision behind the
implementation, not a list of features. The research pages go further and set
out the full pipeline stage by stage.

## Backgrounds

Every page is black, so each route carries its own CSS background figure —
a ledger grid on `/works`, a section through the product on a case study
(shifted per work), a dot matrix on `/about`, diagonal hatching on `/contact`
— and `PageHead` plays an entrance on mount. Without both, a client-side
navigation between two dark pages is hard to notice. The figure is the page's
floor; what sits on top of it in the right three columns is `HeroMotion`.

## Structure

- `app/` — routes and `globals.css` (the whole design system, no CSS framework).
  Pages are Server Components; what needs the browser is pulled in as an island,
  and three of those islands — `HeroReveal`, `HeroEntrance`, `PageHeadEntrance` —
  render nothing at all and only carry behaviour
- `components/SiteNav.tsx` — nav bar and the GSAP hamburger panel, shared by every page
- `components/PageHead.tsx` — the subpage masthead: type down the left, motion
  canvas in the right three columns, and an arrival animation on mount
- `components/HeroMotion.tsx` — that canvas. One motion system, four scenes:
  works runs a deployment, a case study compiles its stack, about converges
  four strands of a practice, contact sends a message and waits for the
  receipt. Everything sits on the masthead's own 44px grid, reveals by clip /
  mask / scale rather than opacity, and settles into an idle a few pixels
  wide. Reduced motion is left with the stylesheet's resting state, which is
  the last frame of the entrance
- `components/pages/` — one component per page shape, each taking `lang`. The
  route files in `app/(ja)` and `app/(en)/en` are three to ten lines: metadata
  and the component
- `components/RootShell.tsx` — the html/body shell the two root layouts share
- `components/Lang.tsx` — `<T>` / `<C>`, which resolve a `Copy` pair against the
  page's language. Deliberately not a client component: almost every string on
  the site goes through them, so they stay in the HTML rather than in a bundle
- `lib/i18n.ts` — `localePath` / `localeHref` / `readPath`, the only place that
  knows Japanese lives at the root and English under `/en`
- `components/Reveal.tsx` — ScrollTrigger entrance for subpage content
- `components/HeroReveal.tsx` — the homepage headline, assembled a character at
  a time. The choreography is gsap.com's, read off their homepage bundle: the
  same per-letter entrances (rise behind a clip, drop, slide in from the left,
  scale from nothing, turn on `rotationX` / `rotationY`), the same
  `power2.out` / 0.6s defaults, and their uneven offsets rather than a flat
  stagger. The heading waits out of sight — `.js .hero h1` — until the
  timeline has it
- `components/DisplayReveal.tsx` — the same character reveal, in its plain
  form, on every other oversized heading, played as each one scrolls in
- `lib/works.ts`, `lib/site.ts` — client work and site-wide copy, carried over from Portfolio2026-ver4
- `lib/research.ts` — the research case study, written from the implementations in
  [okada_lab](https://github.com/bbbyk105/okada_lab) and
  [protein-flexibility-platform](https://github.com/bbbyk105/protein-flexibility-platform)
- `public/works/` — live-site captures (desktop + mobile). `scripts/gen-screens.mjs`
  writes the 800px siblings that `srcset` offers alongside the 1600px originals
- `lib/brand.ts` — brand marks for the ticker, generated by `scripts/gen-brand.mjs`
  from `simple-icons` (CC0) and inlined, so nothing is fetched at runtime
- `public/lottie/` — the four marks in the homepage's capability section,
  generated by `scripts/gen-lottie.mjs`. The geometry and keyframes are
  authored in that script; Lottielab's free icon templates were read for the
  structure only, and no third-party file ships. `components/LottieMark.tsx`
  loads the player once a mark nears the viewport and pauses it when it leaves

## Search

- `lib/seo.ts` — `pageMetadata` gives a page its own canonical and the hreflang
  pair for its counterpart. Nothing of the sort belongs in a layout: Next hands
  `alternates` down to every child, so one canonical there makes every page
  claim to be the home page
- `lib/pageSeo.ts` — title and description per page, in both languages
- JSON-LD through `components/JsonLd.tsx`: `Person` and `WebSite` site-wide,
  then `CreativeWork`, `BreadcrumbList`, `CollectionPage`, `ProfilePage` and
  `ContactPage` where each belongs. It has to be a real script element in the
  body — routed through `metadata.other` it becomes a `<meta>` tag, which
  Google does not read as structured data
- `app/sitemap.ts` — both trees with hreflang annotations, and a fixed
  `lastmod`. A build timestamp would tell crawlers every page changed on every
  deploy, which is how lastmod stops being believed
- `public/_headers` — a year of immutable caching for `/_next/static`, and an
  explicit `image/png` for the share cards, which `next/og` writes without an
  extension for Cloudflare to type them from
- `public/_redirects` — the withdrawn DMC Fuji case study, and the eight
  addresses `byakko-portfolio2025` left on this domain
- `app/(ja)/404/page.tsx` — the 404, as a route rather than a `not-found.tsx`.
  Only an app-root not-found is exported as `404.html`, and one there makes
  Next synthesise a root layout that nests both language layouts inside it.
  A `not-found.tsx` in each tree stays for `notFound()` raised within it

## Deploy — Cloudflare Pages

Every route is static (no API routes, server actions or middleware), so the
site exports to plain files and is served from the edge with no runtime in the
request path. `next build` writes the whole site to `out/`.

**The repository is connected**: every push to `main` builds and deploys. There
is no deploy script, on purpose — `wrangler pages deploy` uploads directly,
which would put a second, untracked source of deployments beside the Git one.
Run `npm run verify` before pushing instead.

| Setting | Value |
| --- | --- |
| Framework preset | None |
| Build command | `npm run build` |
| Build output directory | `out` |
| Node version | `22` (set `NODE_VERSION=22` if the default is older) |

`byakko-engineer.com` and `www` are under the project's **Custom domains**;
`www` and plain http both redirect to the apex over https.

The canonical origin lives in one place, `site.url` in `lib/site.ts`, and
feeds `metadataBase`, the Open Graph tags, `sitemap.xml` and `robots.txt`.

## Run

```bash
npm install
npm run dev
npm run verify     # build + typecheck + test, which is what CI would run
```

This project lives under `~/Desktop`, which iCloud syncs, and a save during a
sync leaves `Name 2.tsx` beside `Name.tsx`. `.gitignore` catches them; check
`git status` for filenames containing " 2" before committing anyway, and
prefer staging explicit paths over `git add -A`.

Next.js 16 · React 19 · TypeScript · GSAP
