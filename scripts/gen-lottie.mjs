import fs from "node:fs";
import path from "node:path";

/**
 * Generates public/lottie/*.json: the four marks in the "what I can do"
 * section on the homepage.
 *
 * The geometry and the keyframes are authored here rather than downloaded.
 * Lottielab's free icon templates were read for their structure — 72px square
 * comps, 2px round-capped strokes, one accent against a neutral line, motion
 * carried by trim paths and group transforms — and that vocabulary is what
 * this file reproduces. Nothing third-party ships: Lottielab's terms grant
 * personal, non-commercial use of the material on their site, and their icon
 * sets (Popicons, Central Icons) carry their own licences.
 *
 * Every animation is built to loop cleanly: whatever draws on in the first
 * second retracts in the last, so frame 240 matches frame 0.
 *
 *   node scripts/gen-lottie.mjs
 */

const SIZE = 96;
const FR = 60;
const OP = 240; // four seconds

// The site palette. Keep in step with app/globals.css.
const LINE = rgb("#f2f5f4");
const DIM = rgb("#7d8986");
const CYAN = rgb("#70f4df");

function rgb(hex) {
  return [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
    1,
  ];
}

/** A property that never moves. */
const fixed = (k) => ({ a: 0, k });

/**
 * A property with keyframes, written as [frame, value] pairs. Values are
 * numbers or arrays; the easing is the same soft in-out everywhere, which is
 * what holds four separate marks together as one set.
 */
function keys(pairs) {
  return {
    a: 1,
    k: pairs.map(([t, v], i) => {
      const frame = { t, s: Array.isArray(v) ? v : [v] };
      if (i < pairs.length - 1) {
        frame.i = { x: [0.22], y: [1] };
        frame.o = { x: [0.34], y: [0] };
      }
      return frame;
    }),
  };
}

// ── Shapes ────────────────────────────────────────────────────────────────

const rect = (p, s, r = 0) => ({ ty: "rc", d: 1, p: fixed(p), s: fixed(s), r: fixed(r) });
const ellipse = (p, s) => ({ ty: "el", d: 1, p: fixed(p), s: fixed(s) });

/** An open or closed path through plain corner points. */
const polyline = (points, closed = false) => ({
  ty: "sh",
  d: 1,
  ks: fixed({
    c: closed,
    v: points,
    i: points.map(() => [0, 0]),
    o: points.map(() => [0, 0]),
  }),
});

const stroke = (c, w) => ({ ty: "st", c: fixed(c), o: fixed(100), w: fixed(w), lc: 2, lj: 2, ml: 4 });
const fill = (c) => ({ ty: "fl", c: fixed(c), o: fixed(100), r: 1 });

/** Draw-on: the end of the path travels from 0% to 100% and back. */
const trim = (end, start = fixed(0)) => ({ ty: "tm", s: start, e: end, o: fixed(0), m: 1 });

const transform = ({ p = fixed([0, 0]), a = fixed([0, 0]), s = fixed([100, 100]), r = fixed(0), o = fixed(100) } = {}) => ({
  ty: "tr",
  p,
  a,
  s,
  r,
  o,
  sk: fixed(0),
  sa: fixed(0),
});

const group = (items, tr = transform()) => ({ ty: "gr", it: [...items, tr] });

const layer = (ind, nm, shapes) => ({
  ddd: 0,
  ind,
  ty: 4,
  nm,
  sr: 1,
  ks: {
    o: fixed(100),
    r: fixed(0),
    p: fixed([0, 0, 0]),
    a: fixed([0, 0, 0]),
    s: fixed([100, 100, 100]),
  },
  ao: 0,
  shapes,
  ip: 0,
  op: OP,
  st: 0,
  bm: 0,
});

const comp = (nm, layers) => ({
  v: "5.7.5",
  fr: FR,
  ip: 0,
  op: OP,
  w: SIZE,
  h: SIZE,
  nm,
  ddd: 0,
  assets: [],
  layers,
  markers: [],
});

// ── Recurring motion ──────────────────────────────────────────────────────

/** A frame that draws itself in, holds, and unwinds before the loop point. */
const drawIn = (from, to) => keys([[from, 0], [to, 100], [195, 100], [236, 0]]);

/**
 * A bar that grows from its left edge and collapses back. The exit is
 * staggered too, but every bar is gone by frame 238 — a bar still on screen
 * at the loop point would jump.
 */
function bar({ x, y, w, h, color, at }) {
  const out = 198 + (at - 50) * 0.4;
  return group(
    [rect([w / 2, 0], [w, h], h / 2), fill(color)],
    transform({
      p: fixed([x, y]),
      s: keys([[at, [0, 100]], [at + 26, [100, 100]], [out, [100, 100]], [238, [0, 100]]]),
    })
  );
}

/** A dot that pops in, and in the cyan case keeps a slow pulse going. */
function dot({ p, size, color, at, pulse = false }) {
  const scale = pulse
    ? keys([
        [at, [0, 0]],
        [at + 18, [118, 118]],
        [at + 30, [100, 100]],
        [130, [100, 100]],
        [152, [136, 136]],
        [174, [100, 100]],
        [206, [100, 100]],
        [228, [0, 0]],
      ])
    : keys([[at, [0, 0]], [at + 16, [112, 112]], [at + 26, [100, 100]], [206, [100, 100]], [228, [0, 0]]]);

  return group([ellipse([0, 0], [size, size]), fill(color)], transform({ p: fixed(p), s: scale }));
}

// ── The four marks ────────────────────────────────────────────────────────

/** Product development: a handset drawing itself, then filling with content. */
const product = comp("product", [
  layer(1, "screen", [
    group([rect([48, 48], [44, 70], 8), trim(drawIn(0, 58)), stroke(LINE, 2.4)]),
  ]),
  layer(2, "content", [
    bar({ x: 34, y: 36, w: 28, h: 3.6, color: DIM, at: 52 }),
    bar({ x: 34, y: 47, w: 20, h: 3.6, color: DIM, at: 62 }),
    bar({ x: 34, y: 58, w: 24, h: 3.6, color: CYAN, at: 72 }),
    dot({ p: [48, 72], size: 5, color: LINE, at: 84 }),
  ]),
]);

/** Web engineering: a browser chrome, its tabs, and a layout landing in it. */
const web = comp("web", [
  layer(1, "frame", [
    group([rect([48, 48], [72, 56], 5), trim(drawIn(0, 58)), stroke(LINE, 2.4)]),
    group([polyline([[12, 34], [84, 34]]), trim(drawIn(18, 66)), stroke(DIM, 2)]),
  ]),
  layer(2, "chrome", [
    dot({ p: [20, 27], size: 4.5, color: CYAN, at: 50 }),
    dot({ p: [28, 27], size: 4.5, color: DIM, at: 56 }),
    dot({ p: [36, 27], size: 4.5, color: DIM, at: 62 }),
  ]),
  layer(3, "layout", [
    bar({ x: 20, y: 46, w: 30, h: 4, color: DIM, at: 66 }),
    bar({ x: 20, y: 58, w: 44, h: 4, color: DIM, at: 76 }),
    bar({ x: 20, y: 70, w: 22, h: 4, color: CYAN, at: 86 }),
  ]),
]);

/** Research software: axes, then a series plotting itself point by point. */
const research = comp("research", [
  layer(1, "axes", [
    group([polyline([[18, 14], [18, 78], [82, 78]]), trim(drawIn(0, 48)), stroke(DIM, 2)]),
  ]),
  layer(2, "series", [
    group([
      polyline([[26, 66], [40, 52], [52, 58], [64, 36], [76, 26]]),
      trim(drawIn(40, 118)),
      stroke(LINE, 2.4),
    ]),
  ]),
  layer(3, "points", [
    dot({ p: [26, 66], size: 5, color: DIM, at: 52 }),
    dot({ p: [40, 52], size: 5, color: DIM, at: 70 }),
    dot({ p: [52, 58], size: 5, color: DIM, at: 86 }),
    dot({ p: [64, 36], size: 5, color: DIM, at: 102 }),
    dot({ p: [76, 26], size: 6.5, color: CYAN, at: 116, pulse: true }),
  ]),
]);

/** Automation: three steps wired together, with one job running through. */
const automation = comp("automation", [
  layer(1, "wires", [
    group([polyline([[33, 26], [63, 26]]), trim(drawIn(30, 74)), stroke(DIM, 2)]),
    group([polyline([[74, 37], [74, 70], [59, 70]]), trim(drawIn(50, 100)), stroke(DIM, 2)]),
  ]),
  layer(2, "nodes", [
    node([22, 26], 6),
    node([74, 26], 18),
    node([48, 70], 30),
  ]),
  layer(3, "job", [
    group(
      [ellipse([0, 0], [7, 7]), fill(CYAN)],
      transform({
        // Along the first wire, then down and back along the elbow.
        p: keys([
          [86, [33, 26]],
          [116, [63, 26]],
          [132, [74, 37]],
          [162, [74, 70]],
          [186, [59, 70]],
        ]),
        o: keys([[80, 0], [88, 100], [182, 100], [192, 0]]),
      })
    ),
  ]),
]);

/** A step in the pipeline: a rounded square that snaps into place. */
function node(p, at) {
  return group(
    [rect([0, 0], [20, 20], 5), stroke(LINE, 2.2)],
    transform({
      p: fixed(p),
      s: keys([
        [at, [0, 0]],
        [at + 20, [112, 112]],
        [at + 32, [100, 100]],
        [204, [100, 100]],
        [at + 204, [0, 0]],
      ]),
    })
  );
}

// ── Write ─────────────────────────────────────────────────────────────────

const out = path.join(process.cwd(), "public", "lottie");
fs.mkdirSync(out, { recursive: true });

for (const [name, animation] of Object.entries({ product, web, research, automation })) {
  const file = path.join(out, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(animation));
  console.log(`${file}  ${(fs.statSync(file).size / 1024).toFixed(1)} KB`);
}
