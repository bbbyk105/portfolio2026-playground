"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * The mastheads that carry a canvas. Works and case studies used to as well —
 * a deployment and a compiling stack — and were taken out: mock interface on
 * a page whose screenshots are the real thing reads as generated filler.
 */
export type HeroVariant = "about" | "contact";

/**
 * The motion canvas that fills the right three columns of a subpage masthead.
 *
 * It is one piece of work rather than a decoration: a rail, a few modules and
 * a handful of labels that act out whatever the headline next to them claims.
 * About converges four strands of a career onto one bus. Contact sends a
 * message and waits for the receipt.
 *
 * Everything shares one grid, one easing and one clock, so the two read as
 * the same system saying different things:
 *
 *   – The canvas is nine rows of the masthead's own 44px background grid, and
 *     its left edge sits on the 62.5% grid line, so every rail, card edge and
 *     label lands on a line that is already drawn behind it.
 *   – Every loop in every scene is one CYCLE long or a multiple of it.
 *   – Cards reveal by clip, text by mask, rails by scale, dots by scale.
 *     Nothing arrives on opacity alone.
 *
 * The entrance overlaps rather than queues — the rail is still drawing when
 * the first module starts to reveal — and it settles into an idle whose
 * amplitude is a few pixels: a dot on a rail, a sheen along a rule, a card
 * breathing. With reduced motion none of it runs and the stylesheet's own
 * resting state is left on screen, which is the last frame of the entrance.
 */
export default function HeroMotion({ variant }: { variant: HeroVariant }) {
  const Scene = SCENES[variant];
  return (
    <div className={`heroMotion heroMotion--${variant}`} aria-hidden="true">
      <Scene />
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
/** One loop, in seconds: the signal runs, the far end answers, it holds there. */
const CYCLE = 6.4;
/** The entrance is still finishing when the first loop starts. */
const LOOP_IN = 1.5;

/**
 * Makes a loop last exactly as long as it claims to.
 *
 * A timeline's duration is whatever its last tween happens to end on, not the
 * beat it was written against — so a cycle whose final fade lands at 5.25s
 * repeats every 5.25s while everything around it repeats on CYCLE, and the
 * packet on the rail drifts away from the node it is supposed to reach.
 * Padding the tail keeps the scenes on one clock.
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
          // and it never plays again. That once took the progress bars out of
          // a masthead after one trip back to the top.
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

/** A module: the card shape the system uses, an index gutter and two rows. */
function Module({
  index,
  badge = "LIVE",
  bars,
  className,
  style,
}: {
  index: string;
  badge?: string;
  bars: string[];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={className ? `hmCard ${className}` : "hmCard"} style={style}>
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

const SCENES: Record<HeroVariant, () => ReactNode> = {
  about: AboutScene,
  contact: ContactScene,
};
