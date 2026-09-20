import * as si from "simple-icons";
import fs from "node:fs";

// Ticker label -> Simple Icons export. React Native has no mark of its own in
// the set, so it borrows React's.
const MAP = {
  "TYPESCRIPT": "siTypescript",
  "PYTHON": "siPython",
  "NEXT.JS": "siNextdotjs",
  "REACT": "siReact",
  "REACT NATIVE": "siReact",
  "EXPO": "siExpo",
  "FASTAPI": "siFastapi",
  "SUPABASE": "siSupabase",
  "POSTGRESQL": "siPostgresql",
  "DOCKER": "siDocker",
  "N8N": "siN8n",
  "GSAP": "siGreensock",
};

const entries = Object.entries(MAP).map(([label, key]) => {
  const icon = si[key];
  if (!icon) throw new Error(`missing icon for ${label} (${key})`);
  return [label, icon];
});

const body = entries
  .map(([label, i]) =>
    `  ${JSON.stringify(label)}: {\n    title: ${JSON.stringify(i.title)},\n` +
    `    hex: ${JSON.stringify(i.hex)},\n    path: ${JSON.stringify(i.path)},\n  },`
  )
  .join("\n");

fs.writeFileSync(
  "lib/brand.ts",
  `/**
 * Brand marks for the technology ticker.
 *
 * Generated from the \`simple-icons\` package, which is CC0, so the paths and
 * the official brand colours are inlined here rather than pulled at runtime:
 * no extra requests, nothing to 404, and the package stays a dev dependency.
 * Regenerate with scripts/gen-brand.mjs when the ticker gains an entry.
 *
 * React Native borrows React's mark — Simple Icons has no separate one.
 */
export type Brand = { title: string; hex: string; path: string };

export const brands: Record<string, Brand | undefined> = {
${body}
};
`
);
console.log("wrote lib/brand.ts with", entries.length, "marks");
