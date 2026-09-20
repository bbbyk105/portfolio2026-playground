# Portfolio 2026 — Digital Playground

A new independent portfolio direction based on the content of Portfolio2026-ver4.

Design direction: **Digital Playground** — black + Tiffany blue, oversized kinetic typography, graphic objects, editorial work register and GSAP scroll motion.

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, selected work, about, capabilities, contact |
| `/works` | Register of the five products in production, plus research / automation practice |
| `/works/[slug]` | Case study: spec table, desktop & mobile screens, project, delivered, technology |
| `/about` | Profile, journey, what I do, capability groups |
| `/contact` | Enquiry form (composes a mail draft) and direct links |

## Structure

- `app/` — routes and `globals.css` (the whole design system, no CSS framework)
- `components/SiteNav.tsx` — nav bar and the GSAP hamburger panel, shared by every page
- `components/Reveal.tsx` — ScrollTrigger entrance for subpage content
- `lib/works.ts`, `lib/site.ts` — all copy, carried over from Portfolio2026-ver4
- `public/works/` — live-site captures (desktop + mobile)

## Run

```bash
npm install
npm run dev
npm run build
npm run typecheck
```

Next.js 16 · React 19 · TypeScript · GSAP
