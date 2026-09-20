"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

/**
 * One of the generated marks in public/lottie, played in the homepage's
 * capability section.
 *
 * The player is the heaviest thing on the page, so nothing is imported until
 * a mark is near the viewport, and a mark that scrolls away is paused rather
 * than left running. Reduced motion gets the finished drawing held still.
 *
 * The marks are decorative — every one of them repeats what the heading next
 * to it already says — so they are hidden from assistive technology.
 */
export default function LottieMark({ src }: { src: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let animation: AnimationItem | null = null;
    let disposed = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    async function load(container: HTMLDivElement) {
      const lottie = (await import("lottie-web/build/player/lottie_light")).default;
      if (disposed) return;

      animation = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: !reduced,
        autoplay: false,
        path: src,
      });
      // Frame 170 is the held state: everything drawn, nothing mid-transition.
      animation.addEventListener("DOMLoaded", () => {
        if (disposed || !animation) return;
        if (reduced) animation.goToAndStop(170, true);
        else animation.play();
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!animation) load(el);
          else if (!reduced) animation.play();
        } else {
          animation?.pause();
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(el);

    return () => {
      disposed = true;
      observer.disconnect();
      animation?.destroy();
    };
  }, [src]);

  return <div className="lottieMark" ref={host} aria-hidden="true" />;
}
