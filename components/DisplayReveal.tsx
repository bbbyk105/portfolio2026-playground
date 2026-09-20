"use client";

import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

/**
 * The entrance on every oversized heading outside the hero.
 *
 * The homepage headline gets gsap.com's own per-letter choreography (see
 * HeroReveal); this is the same vocabulary — a clip per character, transforms
 * back to zero, `power2.out` — dealt out so no two sections arrive the same
 * way. Scrolling the page should not let you predict the next heading from
 * the last one.
 */

type Build = (split: SplitText, element: HTMLElement) => gsap.core.Timeline;

/** Every heading runs on the same trigger and clears up after itself. */
function timelineFor(element: HTMLElement) {
  return gsap.timeline({
    defaults: { ease: "power2.out", duration: 0.6 },
    scrollTrigger: { trigger: element, start: "top 88%", once: true },
    onComplete: () =>
      gsap.set(element.querySelectorAll(".splitChar, .splitChar-mask, .splitWord"), {
        clearProps: "transform,opacity,visibility,willChange",
      }),
  });
}

const CHOREOGRAPHY: Record<string, Build> = {
  /** Characters rise out from behind their own edge, left to right. */
  rise: (split, element) =>
    timelineFor(element)
      .set(split.masks, { transformOrigin: "50% 100%" })
      .from(split.chars, { yPercent: 135, stagger: 0.035 }),

  /** The line assembles sideways: each letter arrives out of the one before. */
  cascade: (split, element) =>
    timelineFor(element)
      .from(split.masks, { xPercent: -65, duration: 0.75, stagger: 0.03, ease: "power3.out" })
      .from(split.chars, { yPercent: 45, duration: 0.75, stagger: 0.03 }, 0),

  /** Letters land from above, a shade oversized, and settle. */
  drop: (split, element) =>
    timelineFor(element)
      .set(split.masks, { transformOrigin: "50% 50%" })
      .from(split.masks, {
        yPercent: -120,
        scale: 1.18,
        duration: 0.85,
        stagger: { each: 0.03, from: "end" },
        ease: "power3.out",
      }),

  /** Each letter folds up onto its own baseline. */
  flipUp: (split, element) =>
    timelineFor(element)
      .set(split.masks, { transformOrigin: "50% 100%", transformPerspective: 900 })
      .from(split.masks, { rotationX: -96, duration: 0.9, stagger: 0.04, ease: "power3.out" }),

  /** The line blooms out of its middle. */
  pop: (split, element) =>
    timelineFor(element)
      .set(split.masks, { transformOrigin: "50% 100%" })
      .from(split.masks, {
        scale: 0,
        duration: 0.7,
        stagger: { each: 0.028, from: "center" },
        ease: "back.out(1.5)",
      }),

  /** gsap.com's reel: the character rolls past twice before it stops. */
  reel: (split, element) =>
    timelineFor(element).fromTo(
      split.chars,
      { yPercent: 135 },
      {
        keyframes: { yPercent: [135, 0, 135, 0], ease: "power2.out" },
        duration: 1.5,
        stagger: 0.045,
      }
    ),

  /** Letters turn in on their own axis, from both ends of the line at once. */
  turn: (split, element) =>
    timelineFor(element)
      .set(split.masks, { transformOrigin: "50% 50%", transformPerspective: 900 })
      .from(split.masks, {
        rotationY: -104,
        duration: 0.9,
        stagger: { each: 0.03, from: "edges" },
        ease: "power3.out",
      }),

  /** Whole words rather than letters — the same move at a different grain. */
  words: (split, element) =>
    timelineFor(element).from(split.words, {
      yPercent: 55,
      rotationZ: -2.4,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.075,
      ease: "power3.out",
    }),
};

/**
 * Which heading gets which entrance. First match wins; anything unlisted
 * rises, which is the right default for one heading among four on a page.
 */
const ASSIGNMENT: [selector: string, choreography: keyof typeof CHOREOGRAPHY][] = [
  [".pageHead h1", "flipUp"],
  [".canDo .sectionHead h2", "cascade"],
  [".about .sectionHead h2", "drop"],
  [".journey .sectionHead h2", "reel"],
  [".caps .sectionHead h2", "words"],
  [".work .sectionHead h2", "words"],
  [".practice .sectionHead h2", "drop"],
  [".mechanism .sectionHead h2", "flipUp"],
  [".layers .sectionHead h2", "cascade"],
  [".stack h2", "pop"],
  [".contact h2", "turn"],
  [".nextName", "cascade"],
];

const DISPLAY = [
  ".pageHead h1",
  ".sectionHead h2",
  ".stack h2",
  ".contact h2",
  ".nextName",
  ".project h3",
  ".detailHead h2",
].join(",");

export default function DisplayReveal() {
  // Splits are tied to the elements on screen, so a client-side navigation
  // has to throw the old ones away and cut the new page's headings instead.
  const pathname = usePathname();

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const splits = gsap.utils.toArray<HTMLElement>(DISPLAY).map((element) => {
        const match = ASSIGNMENT.find(([selector]) => element.matches(selector));
        const build = CHOREOGRAPHY[match ? match[1] : "rise"];

        return SplitText.create(element, {
          // Words keep their characters together, so a heading still breaks
          // between words rather than in the middle of one.
          type: "words,chars",
          mask: "chars",
          wordsClass: "splitWord",
          charsClass: "splitChar",
          aria: "auto",
          onSplit: (self) => build(self, element),
        });
      });

      return () => splits.forEach((split) => split.revert());
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return null;
}
