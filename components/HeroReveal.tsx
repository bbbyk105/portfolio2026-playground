"use client";

import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, SplitText);

/**
 * The hero headline assembling itself, one character at a time.
 *
 * The choreography is gsap.com's, read off their homepage bundle rather than
 * guessed at (tf-assets/index-*.js, the `home-hero` block). Theirs runs on
 * `defaults: { ease: "power2.out", duration: 0.6 }` and gives every letter of
 * "Animate anything" its own entrance, each one added to the master timeline
 * at its own offset (0, .4, .8, 1, 1.1, 1.5, 1.7, 1.9, 2, 2.2, 2.4) so the
 * letters land in an uneven rhythm rather than on a flat stagger:
 *
 *   A   from(inner, {yPercent:100}), then from(clip, {rotationX:-180,
 *       ease:"back.out(1.7)", duration:1}) starting .2s into the rise
 *   n   from(inner, {yPercent:100, duration:.4})
 *   i   from(clip,  {yPercent:-100, ease:"back.out(1.4)", duration:1})
 *   m   from(clip,  {xPercent:-100})
 *   e   from(clip,  {yPercent:100, duration:.9})
 *   y   from(clip,  {rotationY:-180, scale:0, duration:1})
 *   t   from(clip,  {scale:0, ease:"back.out(1.4)"})
 *   h   from(inner, {yPercent:-100})
 *   i   from(clip,  {rotationX:-450, duration:1.3}) after a .1s fade in
 *
 * Two of their moves are left out: the letter that rolls past twice like a
 * reel, and the one that lands on `elastic.out(1, 0.4)` — both read as a
 * flourish on a word like "anything" and as a wobble on a statement.
 *
 * One number differs from theirs: a travel that hides behind the clip runs
 * 135% rather than 100%. This display type is set on a line-height of .82 and
 * the clip is padded out so it cannot shave the glyphs, so a letter has that
 * much further to go before it is out of sight. The clip's own travels, which
 * nothing hides, keep 100%.
 *
 * What moves what matters: a travel that should stay hidden until the letter
 * clears its own edge is put on the glyph inside the clip, and anything that
 * turns, scales or crosses the line is put on the clip itself, which is not
 * clipped by anything. gsap.com splits the same way.
 *
 * Nothing here positions a character: the finished line is plain HTML and
 * CSS, and every entrance is a transform back to zero, so a resize or a
 * different breakpoint cannot leave a letter in the wrong place.
 */

type Piece = { clip: Element; glyph: Element };

type Move = (timeline: gsap.core.Timeline, piece: Piece, at: number) => void;

/**
 * One entrance per letter, in gsap.com's order. Twelve of them against a
 * cadence of eleven, so a letter's move and its timing drift against each
 * other instead of falling into a visible pattern.
 */
const MOVES: Move[] = [
  // The "A": rises, then turns over on its bottom edge.
  (tl, { clip, glyph }, at) => {
    tl.from(glyph, { yPercent: 135, duration: 0.6 }, at);
    tl.from(clip, { rotationX: -180, duration: 1, ease: "back.out(1.7)" }, at + 0.2);
  },
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: 135, duration: 0.6 }, at),
  (tl, { clip }, at) => tl.from(clip, { yPercent: -100, duration: 1, ease: "back.out(1.4)" }, at),
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: 135, duration: 0.9 }, at),
  (tl, { clip }, at) => tl.from(clip, { xPercent: -100, duration: 0.6 }, at),
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: 135, duration: 0.4 }, at),
  (tl, { clip }, at) => tl.from(clip, { scale: 0, duration: 0.6, ease: "back.out(1.4)" }, at),
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: -135, duration: 0.6 }, at),
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: 135, duration: 0.6 }, at),
  (tl, { clip }, at) => tl.from(clip, { rotationY: -180, scale: 0, duration: 1 }, at),
  (tl, { glyph }, at) => tl.from(glyph, { yPercent: 135, duration: 0.6 }, at),
  (tl, { clip }, at) => {
    tl.from(clip, { autoAlpha: 0, duration: 0.1 }, at);
    tl.from(clip, { rotationX: -450, duration: 1.3 }, at + 0.14);
  },
];

/**
 * The gaps between one letter starting and the next, in seconds. These are
 * gsap.com's own offsets (.4 .4 .2 .1 .3 .1 .2 .2 .1 .2 .2) at 0.35 speed —
 * their headline is fifteen characters and this one is thirty-one, so the
 * rhythm is kept and the tempo with it.
 */
/**
 * gsap.com keeps colour in the hero as objects — an orange windmill, a green
 * bolt, a purple squiggle — rather than colouring the type. This site has one
 * accent and a black ground, so the colour rides in with the letters instead:
 * roughly a third of them arrive tinted and settle to the colour they are
 * written in, and the full stop keeps the accent for good.
 */
const ACCENTS = [null, "#70f4df", null, "#a78bfa", null, null, "#ff9d6b", null];

const CADENCE = [0.14, 0.14, 0.07, 0.035, 0.105, 0.035, 0.07, 0.07, 0.035, 0.07, 0.07];

/**
 * gsap.com's offsets do not run strictly left to right — .8 lands before 1,
 * 1.9 before 2, 2.2 before 2.4 — so a letter here and there arrives out of
 * turn. These nudges, in seconds, reproduce that: same total, same rhythm,
 * but the line does not read as a wipe.
 */
const NUDGE = [0, 0.05, -0.04, 0, 0.07, -0.05, 0.02, 0, -0.03, 0.06, -0.02, 0.03, 0];

export default function HeroReveal() {
  useGSAP(() => {
    const heading = document.querySelector<HTMLElement>(".hero h1");
    if (!heading) return;

    // Reduced motion gets the headline as it is written, immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(heading, { autoAlpha: 1 });
      return;
    }

    const split = SplitText.create(heading, {
      // Words hold their characters together, so the line still breaks
      // between words at any width.
      type: "words,chars",
      mask: "chars",
      wordsClass: "heroWord",
      charsClass: "heroChar",
      // SplitText labels the heading and hides the pieces, so a screen reader
      // still reads one sentence rather than thirty-one letters.
      aria: "auto",
    });

    const pieces: Piece[] = split.chars.map((glyph, i) => ({
      glyph,
      clip: split.masks[i],
    }));

    const timeline = gsap.timeline({
      defaults: { ease: "power2.out", force3D: true },
      onComplete: () => {
        gsap.set([split.chars, split.masks], {
          clearProps: "transform,opacity,visibility,willChange,color,webkitTextStrokeColor",
        });
      },
    });

    // The heading is held back by the stylesheet until here, so the first
    // thing anyone sees is the first character arriving, never the finished
    // line. gsap.com opens its hero timeline the same way.
    gsap.set(heading, { autoAlpha: 1 });
    gsap.set([split.chars, split.masks], { willChange: "transform" });
    // Every turn and every flip pivots on the letter's own baseline, the way
    // the A of "Animate" does.
    gsap.set(split.masks, { transformOrigin: "50% 100%", transformPerspective: 800 });

    let at = 0;
    pieces.forEach((piece, i) => {
      const start = Math.max(0, at + NUDGE[i % NUDGE.length]);
      MOVES[i % MOVES.length](timeline, piece, start);

      const accent = ACCENTS[i % ACCENTS.length];
      if (accent) {
        // The outlined line is drawn in stroke, not fill, so that is what
        // takes the tint there.
        const outlined = !!piece.glyph.closest(".faint");
        timeline.from(
          piece.glyph,
          outlined
            ? { webkitTextStrokeColor: accent, duration: 1.1 }
            : { color: accent, duration: 1.1 },
          start
        );
      }

      at += CADENCE[i % CADENCE.length];
    });

    // ── Once it has settled ──────────────────────────────────────────────
    // gsap.com never lets its hero go completely still: the windmill turns on
    // a repeat, one letter flips every few seconds, and the squiggle follows
    // the pointer. The same three ideas, in this hero's own terms.
    const settled = timeline.duration() + 0.4;

    // The grid behind the type drifts one cell, forever. The cell is 70px, so
    // the loop has no seam.
    const grid = document.querySelector<HTMLElement>(".hero .gridbg");
    if (grid) {
      gsap.to(grid, {
        backgroundPositionX: "70px",
        backgroundPositionY: "70px",
        duration: 26,
        ease: "none",
        repeat: -1,
      });
    }

    // The outlined line breathes, slowly, between two strengths of accent.
    const outline = heading.querySelector<HTMLElement>(".faint");
    if (outline) {
      gsap.to(outline, {
        webkitTextStrokeColor: "rgba(112,244,223,.68)",
        duration: 3.2,
        delay: settled,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // The accent turns on its corner every few seconds — this hero's version
    // of the letter gsap.com keeps flipping.
    const accentChar = heading.querySelector<HTMLElement>(".heroAccent .heroChar");
    if (accentChar) {
      gsap.to(accentChar, {
        rotation: 90,
        scale: 0.78,
        transformOrigin: "50% 100%",
        duration: 0.9,
        delay: settled,
        ease: "power2.inOut",
        repeat: -1,
        repeatDelay: 3.6,
        yoyo: true,
      });
    }

    // Depth on a pointer: the grid leans one way, the terminal the other.
    // Nothing here runs on a touch screen, where there is no pointer to read.
    let onMove: ((event: PointerEvent) => void) | undefined;
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const terminal = document.querySelector<HTMLElement>(".hero .terminal");
      const gridX = grid && gsap.quickTo(grid, "x", { duration: 1.1, ease: "power3" });
      const gridY = grid && gsap.quickTo(grid, "y", { duration: 1.1, ease: "power3" });
      const termX = terminal && gsap.quickTo(terminal, "x", { duration: 1.5, ease: "power3" });
      const termY = terminal && gsap.quickTo(terminal, "y", { duration: 1.5, ease: "power3" });

      onMove = (event: PointerEvent) => {
        const x = gsap.utils.mapRange(0, window.innerWidth, -1, 1, event.clientX);
        const y = gsap.utils.mapRange(0, window.innerHeight, -1, 1, event.clientY);
        gridX?.(x * 18);
        gridY?.(y * 14);
        termX?.(x * -9);
        termY?.(y * -7);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      if (onMove) window.removeEventListener("pointermove", onMove);
      timeline.kill();
      split.revert();
    };
  });

  return null;
}
