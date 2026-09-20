"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export type BgVariant = "works" | "detail" | "about" | "contact";

type Line = { text: ReactNode; faint?: boolean };

type Props = {
  /** Picks the background figure, so each route reads as a different place. */
  variant: BgVariant;
  /** Shifts the figure per case study, so one work does not look like the next. */
  seed?: number;
  eyebrow: ReactNode;
  lines: Line[];
  lede: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
};

/**
 * The masthead every subpage opens with. Beyond layout it does two jobs:
 * it carries a per-route background figure, and it plays an entrance on mount
 * — without one, a client-side navigation between two dark pages is hard to
 * notice at all.
 */
export default function PageHead({ variant, seed = 0, eyebrow, lines, lede, meta, children }: Props) {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".pageBg", { opacity: 0, scale: 1.08, duration: 1.3, ease: "power2.out" }, 0)
        .from(".pageHeadEyebrow", { y: 14, opacity: 0, duration: 0.7 }, 0.08)
        .from(".lineMask > span", { yPercent: 108, duration: 0.95, stagger: 0.08 }, 0.12)
        .from(".pageHeadLede > *", { y: 20, opacity: 0, duration: 0.8, stagger: 0.09 }, 0.42)
        .from(".pageHeadExtra", { y: 22, opacity: 0, duration: 0.8 }, 0.54);
    },
    { scope }
  );

  return (
    <section className={`pageHead pageHead--${variant}`} ref={scope}>
      <div className={`pageBg pageBg--${variant}`} style={{ "--seed": seed } as React.CSSProperties} aria-hidden="true">
        <span className="bgPattern" />
        <span className="bgShape" />
        <span className="bgShapeAlt" />
      </div>

      <p className="eyebrow pageHeadEyebrow">
        <i /> {eyebrow}
      </p>

      <h1>
        {lines.map((line, i) => (
          <span className="lineMask" key={i}>
            <span>{line.faint ? <em>{line.text}</em> : line.text}</span>
          </span>
        ))}
      </h1>

      <div className="pageLede pageHeadLede">
        <p>{lede}</p>
        {meta ? <span className="pageLedeMeta">{meta}</span> : null}
      </div>

      {children ? <div className="pageHeadExtra">{children}</div> : null}
    </section>
  );
}
