# Portfolio 2026 — Digital Playground

A new independent portfolio direction based on the content of Portfolio2026-ver4.

Design direction: **Digital Playground** — black + Tiffany blue, oversized kinetic typography, graphic objects, editorial work register and GSAP scroll motion.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, selected work, about, capabilities, contact |
| `/works` | Register of the five products in production, plus research / automation practice |
| `/works/[slug]` | Client case study: spec table, screens, project, how it works, delivered, technology |
| `/works/research/[slug]` | Research case study: the pipeline stage by stage, the architecture tiers, the core calculation, outputs |
| `/about` | Profile, journey, what I do, capability groups |
| `/contact` | Enquiry form (composes a mail draft) and direct links |

## Language

Copy ships in Japanese and English. An inline script in `<head>` picks one
before the first paint — a stored choice first, then an explicitly English
browser, then a Japanese browser or the `Asia/Tokyo` timezone, otherwise
English. Both languages are in the markup and the stylesheet hides one, so
there is no flash of the wrong copy and no layout shift. The `JA / EN` toggle
in the navigation overrides the guess and is remembered.

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
navigation between two dark pages is hard to notice.

## Structure

- `app/` — routes and `globals.css` (the whole design system, no CSS framework)
- `components/SiteNav.tsx` — nav bar and the GSAP hamburger panel, shared by every page
- `components/PageHead.tsx` — per-route background figure and arrival animation
- `components/Lang.tsx`, `lib/i18n.ts` — language detection, provider and `<T>` / `<C>`
- `components/Reveal.tsx` — ScrollTrigger entrance for subpage content
- `lib/works.ts`, `lib/site.ts` — client work and site-wide copy, carried over from Portfolio2026-ver4
- `lib/research.ts` — the research case study, written from the implementations in
  [okada_lab](https://github.com/bbbyk105/okada_lab) and
  [protein-flexibility-platform](https://github.com/bbbyk105/protein-flexibility-platform)
- `public/works/` — live-site captures (desktop + mobile)

## Run

```bash
npm install
npm run dev
npm run build
npm run typecheck
```

Next.js 16 · React 19 · TypeScript · GSAP
