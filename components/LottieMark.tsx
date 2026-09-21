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
export default function LottieMark({ src, className }: { src: string; className?: string }) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    let animation: AnimationItem | null = null;
    let loading = false;
    let visible = false;
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
        // The import and the fetch take long enough to scroll past: play only
        // if the mark is still where it can be seen.
        else if (visible) animation.play();
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // A delivery can carry more than one entry for the same target — a
        // fast programmatic scroll, such as the way back to the top, is
        // exactly when it does. The last one is where the mark ended up;
        // acting on the first would leave it paused for good.
        const entry = entries[entries.length - 1];
        visible = entry.isIntersecting;

        if (!visible) {
          animation?.pause();
          return;
        }
        // `loading` rather than `animation`: the player is a dynamic import,
        // so there is a gap where the load is under way and there is still
        // nothing to hold on to. Without the flag a second crossing in that
        // gap starts a second player into the same container.
        if (!loading) {
          loading = true;
          load(el);
        } else if (animation && !reduced) {
          animation.play();
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

  return <div className={className ? `lottieMark ${className}` : "lottieMark"} ref={host} aria-hidden="true" />;
}
