"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export type HeroVariant = "works" | "detail" | "about" | "contact";

/**
 * The motion canvas that fills the right three columns of a subpage masthead.
 *
 * It is one piece of work rather than a decoration: a rail, a few modules and
 * a handful of labels that act out whatever the headline next to them claims.
 * Works runs a deployment — a module reaches LIVE and ships, and the queue
 * behind it moves up a lane. Detail compiles a stack. About converges four
 * strands of a career onto one bus. Contact sends a message and waits for the
 * receipt.
 *
 * Everything shares one grid, one easing and one clock, so the four read as
 * the same system saying different things:
 *
 *   – The canvas is nine rows of the masthead's own 44px background grid, and
 *     its left edge sits on the 62.5% grid line, so every rail, card edge and
 *     label lands on a line that is already drawn behind it.
 *   – One CYCLE is one deployment. Every loop in every scene is that long or
 *     a multiple of it.
 *   – Cards reveal by clip, text by mask, rails by scale, dots by scale.
 *     Nothing arrives on opacity alone.
 *   – Depth is three lanes deep and no more: 1 / .58 / .3 opacity against
 *     1 / .96 / .92 scale.
 *
 * The entrance overlaps rather than queues — the rail is still drawing when
 * the first module starts to reveal — and it settles into an idle whose
 * amplitude is a few pixels: a dot on a rail, a sheen along a rule, a card
 * breathing. With reduced motion none of it runs and the stylesheet's own
 * resting state is left on screen, which is the last frame of the entrance.
 */
export default function HeroMotion({ variant, seed = 0 }: { variant: HeroVariant; seed?: number }) {
  const Scene = SCENES[variant];
  return (
    <div className={`heroMotion heroMotion--${variant}`} aria-hidden="true">
      <Scene seed={seed} />
    </div>
  );
}

// ── Shared vocabulary ─────────────────────────────────────────────────────

/** The halo a module's status dot wears while it is the live one. */
const DOT_ON = "0 0 0 3px rgba(112,244,223,0.14)";
const DOT_OFF = "0 0 0 3px rgba(112,244,223,0)";

/** Fast start, slow settle. Everything that arrives arrives on this. */
const OUT = "power3.out";
/** Anything travelling a rail leaves and lands gently. */
const TRAVEL = "power2.inOut";
/** One deployment, in seconds: run, go live, hold there, ship, move up. */
const CYCLE = 6.4;
/** The entrance is still finishing when the first loop starts. */
const LOOP_IN = 1.5;

/**
 * Makes a loop last exactly as long as it claims to.
 *
 * A timeline's duration is whatever its last tween happens to end on, not the
 * beat it was written against — so a cycle whose final fade lands at 5.25s
 * repeats every 5.25s while everything around it repeats on CYCLE, and the
 * packet on the rail drifts away from the module it is supposed to be
 * building. Padding the tail keeps the scenes on one clock.
 */
function hold(tl: gsap.core.Timeline, period: number) {
  tl.repeatDelay(Math.max(0, period - tl.duration()));
  return tl;
}

/** A y on the canvas grid, as a CSS length. */
const row = (n: number) => `calc(var(--hm-row) * ${n})`;

/** The grid row in pixels, which the stylesheet shortens on small screens. */
function rowUnit(el: Element) {
  return parseFloat(getComputedStyle(el).getPropertyValue("--hm-row")) || 44;
}

/**
 * Runs a scene's animation unless the reader asked for less. The width
 * conditions are here so the callback is rebuilt — and the row unit re-read —
 * when the canvas changes size class.
 */
function useScene(scope: React.RefObject<HTMLDivElement | null>, build: (unit: number, q: gsap.utils.SelectorFunc) => void) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia(scope);
      mm.add(
        {
          ok: "(prefers-reduced-motion: no-preference)",
          narrow: "(max-width: 1180px)",
          small: "(max-width: 760px)",
        },
        (ctx) => {
          const stage = scope.current;
          if (!ctx.conditions?.ok || !stage) return;
          build(rowUnit(stage), gsap.utils.selector(scope));

          // A masthead that has been scrolled past has nothing to say, so
          // park whatever was running until it comes back.
          //
          // Roots only. A child of a timeline is already driven by its
          // parent's playhead, so pausing the parent stops it — and pausing
          // it on its own does not survive the resume: GSAP re-seats a
          // child's start time against the parent's current time, which walks
          // a tween written for `CYCLE * 2` off the end of a four-cycle loop,
          // and it never plays again. That is what took the progress bars out
          // of the works masthead after one trip back to the top.
          let parked: gsap.core.Animation[] = [];
          const io = new IntersectionObserver(
            (entries) => {
              // A delivery can carry more than one entry for the same target —
              // a fast programmatic scroll is exactly when it does. The last
              // one is where the masthead actually ended up; acting on the
              // first would leave the scene parked for good.
              const entry = entries[entries.length - 1];
              if (entry.isIntersecting) {
                parked.forEach((a) => a.resume());
                parked = [];
              } else if (!parked.length) {
                // Already parked: re-reading now would find nothing running
                // and throw away the record of what to bring back.
                parked = (ctx.data as gsap.core.Animation[]).filter(
                  (a) =>
                    typeof a?.paused === "function" &&
                    !a.paused() &&
                    a.parent === gsap.globalTimeline
                );
                parked.forEach((a) => a.pause());
              }
            },
            { rootMargin: "120px" }
          );
          io.observe(stage);
          return () => io.disconnect();
        }
      );
      return () => mm.revert();
    },
    { scope }
  );
}

/** A technical label. The span is the mask, the italic is what moves in it. */
function Tag({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <span className={className ? `hmTag ${className}` : "hmTag"} style={style}>
      <i>{children}</i>
    </span>
  );
}

/** A horizontal rule with a sheen that can be sent along it. */
function Rule({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={className ? `hmRule ${className}` : "hmRule"} style={style}>
      <i className="hmSheen" />
    </span>
  );
}

/**
 * A module: the one card shape the whole system uses. `lane` is its depth,
 * 0 furthest back, and the stylesheet resolves it to a position, a scale and
 * an opacity so the resting composition is right before GSAP touches it.
 */
function Module({
  lane,
  index,
  badge = "LIVE",
  bars,
  className,
  style,
}: {
  lane?: 0 | 1 | 2 | 3;
  index: string;
  badge?: string;
  bars: string[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={["hmCard", lane === undefined ? "" : `hmLane${lane}`, className].filter(Boolean).join(" ")}
      style={style}
    >
      <div className="hmCardIn">
        <span className="hmCardGut" />
        <Tag className="hmCardIndex hmCardReveal">{index}</Tag>
        <div className="hmCardBody">
          <div className="hmCardRow hmCardReveal">
            {bars[0] ? <span className="hmCardBar" style={{ width: bars[0] }} /> : null}
            <span className="hmCardStatus">
              <b className="hmCardDot" />
              <Tag className="hmCardLive">{badge}</Tag>
            </span>
          </div>
          <span className="hmCardSplit" />
          <div className="hmCardRow hmCardReveal">
            {bars.slice(1).map((w, i) => (
              <span className="hmCardBar" key={i} style={{ width: w }} />
            ))}
          </div>
        </div>
        <span className="hmCardProgress" />
      </div>
    </div>
  );
}

/**
 * The opening every scene shares: the rail grows out of nothing, the rule
 * opens across it, the labels come up out of their masks. Returns the
 * timeline so a scene can keep layering onto it.
 */
function openFrame(q: gsap.utils.SelectorFunc) {
  const tl = gsap.timeline({ defaults: { ease: OUT } });

  tl.from(q(".hmRail"), { scaleY: 0, duration: 1.1 }, 0)
    .from(q(".hmRule"), { scaleX: 0, duration: 0.95 }, 0.1)
    .from(q(".hmFrameTag i"), { yPercent: 115, duration: 0.65, stagger: 0.07 }, 0.16);

  return tl;
}

/** The rule's sheen, sent across once a cycle. */
function pulseRule(q: gsap.utils.SelectorFunc, selector = ".hmRule .hmSheen") {
  gsap.fromTo(
    q(selector),
    { xPercent: -140, opacity: 0 },
    {
      xPercent: 260,
      duration: 2.4,
      ease: TRAVEL,
      repeat: -1,
      repeatDelay: CYCLE - 2.4,
      delay: LOOP_IN,
      onUpdate() {
        // Brightest in the middle of the pass, gone at both ends.
        const p = this.progress();
        gsap.set(this.targets(), { opacity: Math.sin(p * Math.PI) * 0.75 });
      },
    }
  );
}

/** A card breathing on the spot. Amplitude stays inside a few pixels. */
function drift(q: gsap.utils.SelectorFunc, selector = ".hmCardIn") {
  q(selector).forEach((el, i) => {
    gsap.to(el, {
      y: i % 2 ? -2.5 : 3,
      duration: 3.6 + i * 0.7,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
      delay: LOOP_IN + i * 0.4,
    });
  });
}

// ── WORKS — a module reaches LIVE, ships, and the queue moves up ──────────

const WORKS_STAGES = ["IDEA", "BUILD", "TEST", "SHIP", "LIVE"];
/** Which lane each module opens in: front, middle, back, and one waiting. */
const WORKS_ORDER = [2, 1, 0, 3] as const;
const WORKS_MODULES: { index: string; bars: string[] }[] = [
  { index: "01", bars: ["74%", "46%", "28%"] },
  { index: "02", bars: ["61%", "38%", "22%"] },
  { index: "03", bars: ["82%", "52%", "31%"] },
  { index: "04", bars: ["68%", "41%", "25%"] },
];

function WorksScene() {
  const scope = useRef<HTMLDivElement>(null);

  useScene(scope, (unit, q) => {
    const LANE = unit * 2;
    const cards = q(".hmCard");

    // The stylesheet parks each card in its lane so the resting state reads
    // without script. The lanes are driven by transform from here, so they
    // all start from the same row and the one journey fits every card.
    gsap.set(cards, { top: unit * 2, scale: 1, x: 0, opacity: 1 });

    const lane = (n: number) => ({
      y: n * LANE,
      x: [16, 8, 0][n] ?? 16,
      scale: [0.92, 0.96, 1][n] ?? 0.92,
      opacity: [0.3, 0.58, 1][n] ?? 0.3,
    });

    // ── entrance ──
    const intro = openFrame(q);
    intro
      .from(q(".hmNode"), { scale: 0, duration: 0.5, stagger: 0.055 }, 0.3)
      .from(q(".hmStageTag i"), { yPercent: 115, duration: 0.6, stagger: 0.055 }, 0.34)
      .from(q(".hmLead"), { scaleX: 0, duration: 0.7, stagger: 0.055 }, 0.36)
      .fromTo(
        cards,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.85, stagger: 0.11 },
        0.38
      )
      .from(q(".hmCardReveal"), { y: 9, opacity: 0, duration: 0.6, stagger: 0.035 }, 0.56)
      .from(q(".hmLink"), { scaleX: 0, duration: 0.7 }, 0.95);

    // ── the deployment, once a cycle ──
    const nodes = q(".hmNode");
    const packet = q(".hmPacket");
    const runway = (nodes.length - 1) * unit;

    const cycle = gsap.timeline({ repeat: -1, paused: true });
    cycle
      .set(packet, { y: 0, opacity: 0 })
      .to(packet, { opacity: 1, duration: 0.25 }, 0.05)
      .to(packet, { y: runway, duration: 2.15, ease: TRAVEL }, 0.05)
      .to(packet, { opacity: 0, duration: 0.3 }, 2.2);

    nodes.forEach((node, i) => {
      const at = 0.05 + (i / (nodes.length - 1)) * 2.15;
      const last = i === nodes.length - 1;
      cycle
        .to(node, { backgroundColor: "#70f4df", scale: 1.55, duration: 0.22, ease: OUT }, at)
        .to(node, { backgroundColor: "#586562", scale: 1, duration: 0.8, ease: "sine.out" }, at + (last ? 2.25 : 0.34));
    });

    cycle
      .fromTo(
        q(".hmLink"),
        { scaleX: 0.14, opacity: 0.4 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: OUT, immediateRender: false },
        2.2
      )
      .to(q(".hmLink"), { scaleX: 0.14, opacity: 0.4, duration: 0.6, ease: "sine.inOut" }, 4.35);

    // ── one module's life: three lanes, a release, and back round ──
    const journeys = cards.map((card) => {
      const inner = card.querySelector(".hmCardIn") as HTMLElement;
      const dot = card.querySelector(".hmCardDot") as HTMLElement;
      const live = card.querySelector(".hmCardLive i") as HTMLElement;
      const bar = card.querySelector(".hmCardProgress") as HTMLElement;

      const tl = gsap.timeline({ repeat: -1, paused: true });

      tl.set(card, { ...lane(0), clipPath: "inset(0 0% 0 0)" })
        .set(bar, { scaleX: 0 })
        .set(dot, { backgroundColor: "#586562", scale: 1, boxShadow: DOT_OFF })
        .set(live, { yPercent: 115 })
        // queued → building
        .to(card, { ...lane(1), duration: 1.1, ease: OUT }, CYCLE - 1.2)
        // building → front of the queue
        .to(card, { ...lane(2), duration: 1.1, ease: OUT }, CYCLE * 2 - 1.2)
        // the run itself
        .to(bar, { scaleX: 1, duration: 2.15, ease: TRAVEL }, CYCLE * 2 + 0.05)
        .to(dot, { backgroundColor: "#70f4df", boxShadow: DOT_ON, scale: 1.5, duration: 0.24, ease: OUT }, CYCLE * 2 + 2.2)
        .to(dot, { scale: 1, duration: 0.5, ease: "sine.out" }, CYCLE * 2 + 2.44)
        .to(live, { yPercent: 0, duration: 0.45, ease: OUT }, CYCLE * 2 + 2.28)
        // shipped: out to the right, wiped from the left edge
        .to(card, { x: "+=34", duration: 0.8, ease: "power2.in" }, CYCLE * 2 + 4.4)
        .to(card, { clipPath: "inset(0 0 0 100%)", opacity: 0, duration: 0.7, ease: "power2.in" }, CYCLE * 2 + 4.5)
        // off stage, reset, then back in at the tail of the queue
        .set(bar, { scaleX: 0 }, CYCLE * 2 + 5.4)
        .set(dot, { backgroundColor: "#586562", scale: 1, boxShadow: DOT_OFF }, CYCLE * 2 + 5.4)
        .set(live, { yPercent: 115 }, CYCLE * 2 + 5.4)
        .fromTo(
          card,
          { ...lane(0), y: -LANE * 0.45, opacity: 0, scale: 0.88, clipPath: "inset(0 100% 0 0)" },
          { ...lane(0), clipPath: "inset(0 0% 0 0)", duration: 1.1, ease: OUT, immediateRender: false },
          CYCLE * 4 - 1.2
        )
        .fromTo(inner, { opacity: 0.25 }, { opacity: 1, duration: 0.6, ease: OUT, immediateRender: false }, CYCLE * 4 - 1);

      return tl;
    });

    // Front, middle, back, waiting — one cycle apart, and locked there
    // because they all start on the same tick.
    journeys.forEach((tl, i) => tl.time(CYCLE * WORKS_ORDER[i]));
    hold(cycle, CYCLE);
    journeys.forEach((tl) => hold(tl, CYCLE * 4));

    gsap.delayedCall(LOOP_IN, () => {
      cycle.play();
      journeys.forEach((tl) => tl.play());
    });

    pulseRule(q);
    drift(q);
  });

  return (
    <div className="hmStage" ref={scope}>
      <span className="hmRail" />
      <Tag className="hmFrameTag" style={{ top: row(1), left: 0 }}>
        DEPLOY PIPELINE
      </Tag>
      <Tag className="hmFrameTag hmFrameEnd" style={{ top: row(1) }}>
        IDEA → LIVE
      </Tag>
      <Rule style={{ top: row(1.5) }} />

      {WORKS_STAGES.map((label, i) => (
        <span key={label}>
          <b
            className={i === WORKS_STAGES.length - 1 ? "hmNode hmNodeLive" : "hmNode"}
            style={{ top: row(2 + i) }}
          />
          <Tag className="hmStageTag" style={{ top: row(2 + i) }}>
            {label}
          </Tag>
          <span className="hmLead" style={{ top: row(2 + i) }} />
        </span>
      ))}

      <span className="hmLink" style={{ top: row(6) }} />

      <span className="hmPacket" style={{ top: row(2) }} />

      {WORKS_MODULES.map((m, i) => (
        <Module key={m.index} lane={WORKS_ORDER[i]} index={m.index} bars={m.bars} />
      ))}

      <Rule className="hmRuleFoot" style={{ top: row(8) }} />
    </div>
  );
}

// ── DETAIL — a stack compiles into the thing that shipped ────────────────
//
// Seven rows rather than nine: a case-study masthead is shorter, and its
// year/platform meta sits where the ninth row would be.

const DETAIL_LAYERS = ["INTERFACE", "LOGIC", "DATA"];

function DetailScene({ seed }: { seed: number }) {
  const scope = useRef<HTMLDivElement>(null);

  useScene(scope, (unit, q) => {
    const strips = q(".hmStrip");
    const sweep = q(".hmSweep");

    const intro = openFrame(q);
    intro
      .from(q(".hmNode"), { scale: 0, duration: 0.5, stagger: 0.06 }, 0.28)
      .from(q(".hmStageTag i"), { yPercent: 115, duration: 0.6, stagger: 0.06 }, 0.32)
      .fromTo(strips, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.8, stagger: 0.1 }, 0.4)
      .from(q(".hmStripBar"), { scaleX: 0, duration: 0.7, stagger: 0.1 }, 0.62)
      .fromTo(q(".hmCard"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.9 }, 0.82)
      .from(q(".hmCardReveal"), { y: 10, opacity: 0, duration: 0.6, stagger: 0.06 }, 1);

    // The compile pass: a line crosses the stack, each layer answers, and what
    // is left at the bottom is the product. Seeded, so two case studies are
    // never on the same beat.
    const travel = 2.05;
    const cycle = gsap.timeline({ repeat: -1, paused: true, delay: (seed % 4) * 0.3 });
    cycle
      .set(sweep, { y: 0, opacity: 0 })
      .to(sweep, { opacity: 1, duration: 0.25 }, 0.05)
      .to(sweep, { y: unit * 3, duration: travel, ease: TRAVEL }, 0.05)
      .to(sweep, { opacity: 0, duration: 0.35 }, travel);

    strips.forEach((strip, i) => {
      const at = 0.1 + (i / DETAIL_LAYERS.length) * travel;
      const bar = strip.querySelector(".hmStripBar");
      cycle
        .to(strip, { borderColor: "#70f4df4d", duration: 0.2, ease: OUT }, at)
        .to(bar, { scaleX: 1, opacity: 1, duration: 0.3, ease: OUT }, at)
        .to(strip, { borderColor: "#ffffff2b", duration: 0.9, ease: "sine.out" }, at + 0.5)
        .to(bar, { scaleX: 0.62 + i * 0.1, opacity: 0.5, duration: 0.9, ease: "sine.out" }, at + 0.5)
        .to(q(".hmNode")[i], { backgroundColor: "#70f4df", scale: 1.5, duration: 0.2, ease: OUT }, at)
        .to(q(".hmNode")[i], { backgroundColor: "#586562", scale: 1, duration: 0.8, ease: "sine.out" }, at + 0.5);
    });

    cycle
      .fromTo(q(".hmCardProgress"), { scaleX: 0 }, { scaleX: 1, duration: travel, ease: TRAVEL }, 0.05)
      .to(q(".hmCardDot"), { backgroundColor: "#70f4df", boxShadow: DOT_ON, scale: 1.5, duration: 0.24, ease: OUT }, travel + 0.05)
      .to(q(".hmCardDot"), { scale: 1, duration: 0.5, ease: "sine.out" }, travel + 0.29)
      .fromTo(q(".hmCardLive i"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, ease: OUT }, travel + 0.13)
      .to(q(".hmCardLive i"), { yPercent: 115, duration: 0.35, ease: "power2.in" }, CYCLE - 0.5)
      .to(q(".hmCardDot"), { backgroundColor: "#586562", boxShadow: DOT_OFF, duration: 0.5 }, CYCLE - 0.5);

    hold(cycle, CYCLE);
    gsap.delayedCall(LOOP_IN, () => cycle.play());

    pulseRule(q);
    drift(q);
  });

  // The stack is the same three layers everywhere; how much of each a given
  // project leans on is what the seed varies.
  const width = (i: number) => `${58 + ((seed + i * 3) % 4) * 9}%`;

  return (
    <div className="hmStage" ref={scope}>
      <span className="hmRail" />
      <Tag className="hmFrameTag" style={{ top: row(1), left: 0 }}>
        SPEC / STACK
      </Tag>
      <Tag className="hmFrameTag hmFrameEnd" style={{ top: row(1) }}>
        BUILD → LIVE
      </Tag>
      <Rule style={{ top: row(1.5) }} />

      {DETAIL_LAYERS.map((label, i) => (
        <span key={label}>
          <b className="hmNode" style={{ top: row(2 + i) }} />
          <Tag className="hmStageTag" style={{ top: row(2 + i) }}>
            {label}
          </Tag>
          <span className="hmLead" style={{ top: row(2 + i) }} />
          <span className={`hmStrip hmDepth${i}`} style={{ top: row(2 + i) }}>
            <i className="hmStripBar" style={{ width: width(i) }} />
          </span>
        </span>
      ))}

      <span className="hmSweep" style={{ top: row(2) }} />

      <Module
        className="hmCardSolo"
        index={String(seed + 1).padStart(2, "0")}
        bars={["78%", "49%", "30%"]}
        style={{ top: row(5) }}
      />
    </div>
  );
}

// ── ABOUT — four strands of a practice, the nearest one still running ─────
//
// Six rows, and nothing below the fifth: this masthead's second headline line
// runs most of the way across the page, and the type has right of way.

const ABOUT_STRANDS = [
  { label: "RESEARCH", bar: "46%" },
  { label: "PRACTICE", bar: "58%" },
  { label: "FREELANCE", bar: "71%" },
  { label: "PRODUCT", bar: "52%" },
];

function AboutScene() {
  const scope = useRef<HTMLDivElement>(null);

  useScene(scope, (unit, q) => {
    const strips = q(".hmStrip");
    const branches = q(".hmBranch");
    const nodes = q(".hmNode");
    const signal = q(".hmPacket");
    const last = strips.length - 1;

    const intro = openFrame(q);
    intro
      .from(nodes, { scale: 0, duration: 0.5, stagger: 0.07 }, 0.3)
      .from(q(".hmStageTag i"), { yPercent: 115, duration: 0.62, stagger: 0.07 }, 0.34)
      .from(branches, { scaleX: 0, duration: 0.85, stagger: 0.08 }, 0.36)
      .fromTo(strips, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.85, stagger: 0.1 }, 0.46)
      .from(q(".hmStripBar"), { scaleX: 0, duration: 0.7, stagger: 0.1 }, 0.68)
      .from(q(".hmStripStatus"), { y: 9, opacity: 0, duration: 0.6 }, 1.02);

    // A signal walks down the trunk. Each strand answers as it is passed, and
    // the one still running is the one it stops on.
    const travel = 1.95;
    const cycle = gsap.timeline({ repeat: -1, paused: true });
    cycle
      .set(signal, { y: 0, opacity: 0 })
      .to(signal, { opacity: 1, duration: 0.25 }, 0.05)
      .to(signal, { y: unit * last, duration: travel, ease: TRAVEL }, 0.05)
      .to(signal, { opacity: 0, duration: 0.3 }, travel + 0.05);

    nodes.forEach((node, i) => {
      const at = 0.1 + (i / last) * travel;
      cycle
        .to(node, { backgroundColor: "#70f4df", scale: 1.5, duration: 0.2, ease: OUT }, at)
        .to(node, { backgroundColor: "#586562", scale: 1, duration: 0.85, ease: "sine.out" }, at + 0.3)
        .fromTo(
          branches[i].querySelector(".hmSheen"),
          { xPercent: -140, opacity: 0.9 },
          { xPercent: 260, opacity: 0, duration: 1, ease: "power2.out", immediateRender: false },
          at
        )
        .to(strips[i], { borderColor: "#70f4df3d", duration: 0.2, ease: OUT }, at + 0.14)
        .to(strips[i], { borderColor: "#ffffff2b", duration: 0.9, ease: "sine.out" }, at + 0.6);
    });

    cycle
      .to(q(".hmCardDot"), { backgroundColor: "#70f4df", boxShadow: DOT_ON, scale: 1.5, duration: 0.24, ease: OUT }, travel + 0.2)
      .to(q(".hmCardDot"), { scale: 1, duration: 0.5, ease: "sine.out" }, travel + 0.44)
      .fromTo(q(".hmCardLive i"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, ease: OUT }, travel + 0.3)
      .to(q(".hmCardLive i"), { yPercent: 115, duration: 0.35, ease: "power2.in" }, CYCLE - 0.55)
      .to(q(".hmCardDot"), { backgroundColor: "#586562", boxShadow: DOT_OFF, duration: 0.5 }, CYCLE - 0.55);

    hold(cycle, CYCLE);
    gsap.delayedCall(LOOP_IN, () => cycle.play());

    pulseRule(q);
    drift(q, ".hmStrip");
  });

  return (
    <div className="hmStage" ref={scope}>
      <span className="hmRail" />
      <Tag className="hmFrameTag" style={{ top: row(1), left: 0 }}>
        PRACTICE INDEX
      </Tag>
      <Tag className="hmFrameTag hmFrameEnd" style={{ top: row(1) }}>
        ORIGIN → NOW
      </Tag>
      <Rule style={{ top: row(1.5) }} />

      {ABOUT_STRANDS.map((strand, i) => (
        <span key={strand.label}>
          <b className="hmNode" style={{ top: row(2 + i) }} />
          <Tag className="hmStageTag" style={{ top: row(2 + i) }}>
            {strand.label}
          </Tag>
          <span className="hmBranch" style={{ top: row(2 + i) }}>
            <i className="hmSheen" />
          </span>
          <span className={`hmStrip hmDepth${i}`} style={{ top: row(2 + i) }}>
            <i className="hmStripBar" style={{ width: strand.bar }} />
            {i === ABOUT_STRANDS.length - 1 ? (
              <span className="hmStripStatus">
                <b className="hmCardDot" />
                <Tag className="hmCardLive">ACTIVE</Tag>
              </span>
            ) : null}
          </span>
        </span>
      ))}

      <span className="hmPacket" style={{ top: row(2) }} />
    </div>
  );
}

// ── CONTACT — a message is written, sent, and answered for ───────────────

function ContactScene() {
  const scope = useRef<HTMLDivElement>(null);

  useScene(scope, (unit, q) => {
    const lines = q(".hmWrite i");
    const packets = q(".hmPacket");
    const drop = unit * 1.5; // the card's floor down to the first channel
    // Where the lead packet has to land: the far end of the channel, measured
    // rather than guessed, so it meets the node at any canvas width.
    const reach = () =>
      q(".hmNodeIn")[0].getBoundingClientRect().left - packets[0].getBoundingClientRect().left;

    const intro = openFrame(q);
    intro
      .from(q(".hmNode"), { scale: 0, duration: 0.5, stagger: 0.06 }, 0.3)
      .from(q(".hmStageTag i"), { yPercent: 115, duration: 0.6, stagger: 0.06 }, 0.34)
      .fromTo(q(".hmCard"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.85 }, 0.36)
      .from(q(".hmCardReveal"), { y: 10, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.54)
      .from(q(".hmChannel"), { scaleX: 0, duration: 0.9, stagger: 0.08 }, 0.6)
      .from(q(".hmDrop"), { scaleY: 0, duration: 0.6 }, 0.86);

    const cycle = gsap.timeline({ repeat: -1, paused: true });

    // Written, then sent: the lines fill, the packet drops onto the channel
    // and runs out of frame, and the far end acknowledges it.
    cycle
      .fromTo(lines, { scaleX: 0 }, { scaleX: 1, duration: 0.42, ease: OUT, stagger: 0.16 }, 0.1)
      .set(packets[0], { x: 0, y: -drop, opacity: 0 })
      .to(packets[0], { opacity: 1, duration: 0.2 }, 0.9)
      .to(packets[0], { y: 0, duration: 0.42, ease: "power2.in" }, 0.95)
      .to(q(".hmCardDot"), { backgroundColor: "#70f4df", scale: 1.5, duration: 0.22, ease: OUT }, 0.9)
      .to(q(".hmCardDot"), { scale: 1, duration: 0.5, ease: "sine.out" }, 1.12)
      .to(packets[0], { x: reach, duration: 1.5, ease: TRAVEL }, 1.42)
      .to(packets[0], { opacity: 0, duration: 0.3 }, 2.72)
      .to(q(".hmNodeIn"), { backgroundColor: "#70f4df", scale: 1.6, duration: 0.24, ease: OUT }, 2.82)
      .to(q(".hmNodeIn"), { scale: 1, duration: 0.5, ease: "sine.out" }, 3.06)
      .fromTo(q(".hmAck i"), { yPercent: 115 }, { yPercent: 0, duration: 0.5, ease: OUT }, 2.9)
      .to(q(".hmAck i"), { yPercent: 115, duration: 0.35, ease: "power2.in" }, CYCLE - 0.6)
      .to([...q(".hmNodeIn"), ...q(".hmCardDot")], { backgroundColor: "#586562", duration: 0.5 }, CYCLE - 0.6)
      .to(lines, { scaleX: 0, duration: 0.3, ease: "power2.in", stagger: 0.05 }, CYCLE - 0.55);

    // Two more, further back and slower, so the channel reads as a system
    // rather than a single wire.
    packets.slice(1).forEach((p, i) => {
      // Each starts where its own channel starts and leaves past the frame.
      const run = () => (scope.current?.clientWidth ?? 420) - p.offsetLeft + 26;
      gsap.set(p, { x: -18 });
      gsap.to(p, { x: run, duration: 7.8 + i * 3.2, ease: "none", repeat: -1, delay: LOOP_IN + i * 2.6 });
    });

    hold(cycle, CYCLE);
    gsap.delayedCall(LOOP_IN, () => cycle.play());

    pulseRule(q);
    drift(q);
  });

  return (
    <div className="hmStage" ref={scope}>
      <span className="hmRail" />
      <Tag className="hmFrameTag" style={{ top: row(1), left: 0 }}>
        TRANSMISSION
      </Tag>
      <Tag className="hmFrameTag hmFrameEnd" style={{ top: row(1) }}>
        DRAFT → SENT
      </Tag>
      <Rule style={{ top: row(1.5) }} />

      <Module className="hmCardWrite" index="MSG" badge="DRAFT" bars={["44%"]} style={{ top: row(2) }} />
      <span className="hmWrite">
        <i style={{ width: "72%" }} />
        <i style={{ width: "54%" }} />
        <i style={{ width: "38%" }} />
      </span>

      <span className="hmDrop" />

      <b className="hmNode" style={{ top: row(5) }} />
      <Tag className="hmStageTag" style={{ top: row(5) }}>
        SEND
      </Tag>
      <span className="hmChannel" style={{ top: row(5) }} />
      <span className="hmPacket hmPacketLead" style={{ top: row(5) }} />

      <span className="hmChannel hmChannelBack" style={{ top: row(6) }} />
      <b className="hmNode hmNodeBack" style={{ top: row(6) }} />
      <span className="hmPacket hmPacketBack" style={{ top: row(6) }} />

      <span className="hmChannel hmChannelDeep" style={{ top: row(7) }} />
      <b className="hmNode hmNodeDeep" style={{ top: row(7) }} />
      <span className="hmPacket hmPacketDeep" style={{ top: row(7) }} />

      <b className="hmNode hmNodeIn" style={{ top: row(5) }} />
      <Tag className="hmStageTag hmTagIn" style={{ top: row(5) }}>
        INBOX
      </Tag>
      <Tag className="hmAck" style={{ top: row(5) }}>
        RECEIVED
      </Tag>

      <Rule className="hmRuleFoot" style={{ top: row(8) }} />
    </div>
  );
}

const SCENES: Record<HeroVariant, (props: { seed: number }) => ReactNode> = {
  works: WorksScene,
  detail: DetailScene,
  about: AboutScene,
  contact: ContactScene,
};
