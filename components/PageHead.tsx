import type { CSSProperties, ReactNode } from "react";
import Breadcrumbs from "./Breadcrumbs";
import HeroMotion, { type HeroVariant } from "./HeroMotion";
import PageHeadEntrance from "./PageHeadEntrance";
import type { Lang } from "@/lib/i18n";
import type { Crumb } from "@/lib/seo";

export type BgVariant = HeroVariant;

type Line = { text: ReactNode; faint?: boolean };

type Props = {
  lang: Lang;
  /** Picks the background figure and the motion scene, so each route reads as a different place. */
  variant: BgVariant;
  /** Shifts the figure and the scene's phase per case study, so one work does not look like the next. */
  seed?: number;
  /** The trail above the eyebrow, and the BreadcrumbList that goes with it. */
  crumbs?: Crumb[];
  eyebrow: ReactNode;
  lines: Line[];
  lede: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
};

/**
 * The masthead every subpage opens with: type down the left, a motion canvas
 * in the right three columns.
 *
 * The markup is rendered on the server — it is the same handful of elements on
 * every route, and none of it depends on the browser. The two things that do
 * are siblings that render nothing: PageHeadEntrance plays the arrival, and
 * HeroMotion drives the canvas.
 */
export default function PageHead({ lang, variant, seed = 0, crumbs, eyebrow, lines, lede, meta, children }: Props) {
  return (
    <section className={`pageHead pageHead--${variant}`}>
      <PageHeadEntrance />

      <div className={`pageBg pageBg--${variant}`} style={{ "--seed": seed } as CSSProperties} aria-hidden="true">
        <span className="bgPattern" />
      </div>

      {crumbs ? <Breadcrumbs trail={crumbs} lang={lang} /> : null}

      <p className="eyebrow pageHeadEyebrow">{eyebrow}</p>

      <h1>
        {lines.map((line, i) => (
          <span className="lineMask" key={i}>
            <span>{line.faint ? <span className="faint">{line.text}</span> : line.text}</span>
          </span>
        ))}
      </h1>

      <div className="pageLede pageHeadLede">
        <p>{lede}</p>
        {meta ? <span className="pageLedeMeta">{meta}</span> : null}
      </div>

      <HeroMotion variant={variant} seed={seed} />

      {children ? <div className="pageHeadExtra">{children}</div> : null}
    </section>
  );
}
