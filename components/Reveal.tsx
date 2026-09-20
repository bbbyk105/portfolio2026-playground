"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  children: ReactNode;
  className?: string;
  /** Travel distance in pixels. */
  y?: number;
  stagger?: number;
};

/**
 * Staggers the wrapper's direct children in as it scrolls into view — the
 * same entrance the homepage hero plays on load, extended to the subpages.
 */
export default function Reveal({ children, className, y = 26, stagger = 0.07 }: Props) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(scope.current?.children ?? []);
      if (!targets.length) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(targets, { clearProps: "all" });
        return;
      }

      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        stagger,
        // Drop the inline styles once the entrance is done: after this the
        // element cannot be re-hidden by a later refresh or resize.
        onComplete: () => gsap.set(targets, { clearProps: "opacity,transform" }),
        scrollTrigger: { trigger: scope.current, start: "top 88%", once: true },
      });

      // Screens carry intrinsic dimensions, but fonts and late layout still
      // move the trigger points. Re-measure once the page has fully loaded.
      if (document.readyState !== "complete") {
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh, { once: true });
        return () => window.removeEventListener("load", refresh);
      }
    },
    { scope }
  );

  return (
    <div ref={scope} className={className}>
      {children}
    </div>
  );
}
