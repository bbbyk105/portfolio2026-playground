"use client";

import { useEffect, useState } from "react";
import { C } from "./Lang";
import { scrollToTop } from "@/lib/scroll";
import { ui } from "@/lib/site";

/**
 * The way back up.
 *
 * Two of them: the one in the footer, which is only reachable once you have
 * read to the bottom, and a floating one that appears once the masthead is
 * behind you. The floating one sits under the mobile menu's layer rather than
 * over it, so an open menu covers it instead of fighting it.
 *
 * It scrolls rather than navigating. The footer used to link to "#", which in
 * the App Router moves nothing and leaves a stray entry in the history — and
 * a history entry here is the one thing that would break going back.
 */
export default function BackToTop({ inline = false }: { inline?: boolean }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (inline) return;

    let frame = 0;
    const read = () => {
      frame = 0;
      // One screen down: far enough that the masthead is behind you.
      setShown(window.scrollY > window.innerHeight * 0.9);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [inline]);

  if (inline) {
    return (
      <button type="button" className="toTopInline" onClick={scrollToTop}>
        <C value={ui.backToTop} /> ↑
      </button>
    );
  }

  return (
    <button
      type="button"
      className={shown ? "toTop isShown" : "toTop"}
      onClick={scrollToTop}
      tabIndex={shown ? 0 : -1}
      aria-hidden={shown ? undefined : true}
    >
      <span className="toTopLabel">
        <C value={ui.backToTop} />
      </span>
      <span aria-hidden="true">↑</span>
    </button>
  );
}
