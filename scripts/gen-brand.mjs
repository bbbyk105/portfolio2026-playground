import * as si from "simple-icons";
import fs from "node:fs";
import path from "node:path";

/**
 * Generates lib/brand.ts: the brand marks drawn in the technology ticker.
 *
 * Two sources, both permissively licensed:
 *   - simple-icons (CC0) for the established marks.
 *   - @lobehub/icons-static-svg (MIT) for Claude Code and Codex, which
 *     simple-icons does not carry.
 *
 * The marks sit directly on the ticker's band with no plate behind them, so
 * every colour has to hold up against that one background. Brands whose mark
 * is officially reversed to white on dark grounds are listed in ON_DARK;
 * everything else keeps its published colour and is checked below, so a new
 * entry can never quietly ship as an unreadable smudge.
 */

// The ticker band. Keep in step with .ticker in app/globals.css.
const BAND = "#0b0f10";
const MIN_CONTRAST = 2.2;

// label -> simple-icons export name
const FROM_SIMPLE_ICONS = {
  "TYPESCRIPT": "siTypescript",
  "PYTHON": "siPython",
  "GO": "siGo",
  "NEXT.JS": "siNextdotjs",
  "REACT": "siReact",
  "EXPO": "siExpo",
  "FASTAPI": "siFastapi",
  "SUPABASE": "siSupabase",
  "POSTGRESQL": "siPostgresql",
  "DOCKER": "siDocker",
  "STRIPE": "siStripe",
  "N8N": "siN8n",
  "GSAP": "siGsap",
};

// label -> [lobehub svg file, title, colour]. The mono files are single-path;
// the -color variants of these two wrap the glyph in a filled square, which is
// exactly the pasted-on look the band is trying to avoid.
const FROM_LOBEHUB = {
  "CLAUDE CODE": ["claudecode.svg", "Claude Code", "D97757"],
  "CODEX": ["codex.svg", "Codex", "FFFFFF"],
};

// Marks whose official treatment on a dark ground is a white reversal.
const ON_DARK = {
  "NEXT.JS": "FFFFFF",
  "EXPO": "FFFFFF",
};

const LOBEHUB = "node_modules/@lobehub/icons-static-svg/icons";

const srgb = (hex) => {
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
};
const luminance = (hex) => {
  const [r, g, b] = srgb(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const marks = [];

for (const [label, key] of Object.entries(FROM_SIMPLE_ICONS)) {
  const icon = si[key];
  if (!icon) throw new Error(`simple-icons has no ${key} (for ${label})`);
  marks.push([label, { title: icon.title, hex: ON_DARK[label] ?? icon.hex, path: icon.path }]);
}

for (const [label, [file, title, hex]] of Object.entries(FROM_LOBEHUB)) {
  const svg = fs.readFileSync(path.join(LOBEHUB, file), "utf8");
  const paths = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  if (paths.length !== 1) throw new Error(`${file} has ${paths.length} paths, expected 1`);
  marks.push([label, { title, hex: ON_DARK[label] ?? hex, path: paths[0] }]);
}

const faint = marks.filter(([, m]) => contrast(m.hex, BAND.slice(1)) < MIN_CONTRAST);
if (faint.length) {
  const detail = faint
    .map(([label, m]) => `${label} (#${m.hex}, ${contrast(m.hex, BAND.slice(1)).toFixed(2)}:1)`)
    .join(", ");
  throw new Error(`below ${MIN_CONTRAST}:1 against ${BAND}: ${detail}. Add an ON_DARK reversal.`);
}

const body = marks
  .map(
    ([label, m]) =>
      `  ${JSON.stringify(label)}: {\n    title: ${JSON.stringify(m.title)},\n` +
      `    hex: ${JSON.stringify(m.hex)},\n    path: ${JSON.stringify(m.path)},\n  },`
  )
  .join("\n");

fs.writeFileSync(
  "lib/brand.ts",
  `/**
 * Brand marks for the technology ticker. GENERATED — run scripts/gen-brand.mjs.
 *
 * Paths and colours are inlined at generation time from simple-icons (CC0) and
 * @lobehub/icons-static-svg (MIT), so nothing is fetched at runtime and both
 * packages stay dev dependencies. Every colour here clears ${MIN_CONTRAST}:1 against the
 * ticker band (${BAND}); Next.js and Expo use their official white reversal.
 */
export type Brand = { title: string; hex: string; path: string };

export const brands: Record<string, Brand | undefined> = {
${body}
};
`
);
console.log(`wrote lib/brand.ts with ${marks.length} marks`);
for (const [label, m] of marks) {
  console.log(`  ${label.padEnd(12)} #${m.hex}  ${contrast(m.hex, BAND.slice(1)).toFixed(2)}:1`);
}
