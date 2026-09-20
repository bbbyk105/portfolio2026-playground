"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/**
 * Brings the homepage hero's blocks up on load. It renders nothing and holds
 * no markup — the same shape as HeroReveal and DisplayReveal — so the page it
 * animates can stay on the server; only this behaviour crosses to the client.
 *
 * useGSAP rather than useEffect: it reverts the tween when the effect re-runs.
 * A bare gsap.from() records whatever the element looks like at the time it is
 * called, so a second run — a client-side navigation back to the homepage, or
 * React's development double-mount — captured the mid-entrance opacity as its
 * end value and left the hero stuck near invisible.
 */
export default function HeroEntrance() {
  useGSAP(() => {
    const targets = gsap.utils.toArray<HTMLElement>(".hero .reveal");
    if (!targets.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(targets, { clearProps: "all" });
      return;
    }

    gsap.from(targets, {
      y: 32,
      opacity: 0,
      duration: 1.05,
      stagger: 0.08,
      ease: "power3.out",
      onComplete: () => gsap.set(targets, { clearProps: "opacity,transform" }),
    });
  });

  return null;
}
