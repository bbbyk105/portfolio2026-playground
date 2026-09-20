"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * The subpage masthead's arrival. Without one, a client-side navigation
 * between two dark pages is hard to notice at all.
 *
 * It renders nothing, so the masthead itself stays on the server. The heading
 * is left to DisplayReveal, which cuts it into characters, and the canvas in
 * the right columns runs its own clock — so none of the three waits on either
 * of the others.
 */
export default function PageHeadEntrance() {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const at = (selector: string) => gsap.utils.toArray<HTMLElement>(selector);
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(at(".pageBg"), { opacity: 0, scale: 1.08, duration: 1.3, ease: "power2.out" }, 0)
      .from(at(".pageHeadEyebrow"), { y: 14, opacity: 0, duration: 0.7 }, 0.08)
      .from(at(".pageHeadLede > *"), { y: 20, opacity: 0, duration: 0.8, stagger: 0.09 }, 0.42);

    // Only some mastheads carry anything below the lede; GSAP warns about an
    // empty target, so ask before adding the tween rather than after.
    const extra = at(".pageHeadExtra");
    if (extra.length) tl.from(extra, { y: 22, opacity: 0, duration: 0.8 }, 0.54);
  });

  return null;
}
