import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import LottieMark from "@/components/LottieMark";
import HeroReveal from "@/components/HeroReveal";
import HeroEntrance from "@/components/HeroEntrance";
import { C } from "@/components/Lang";
import { capabilities, home, site, tech, ui } from "@/lib/site";

/**
 * The homepage, rendered on the server. What crosses to the client is only
 * what has to: the nav's menu, the two headline reveals, the hero's entrance
 * and the Lottie marks — each of them a component that brings its own
 * behaviour and, in three cases, no markup at all.
 */
export default function Page() {
  return (
    <main>
      <SiteNav />
      <HeroReveal />
      <HeroEntrance />

      <section className="hero">
        <div className="gridbg" />
        <div className="heroTop reveal">
          <p className="eyebrow">
            <C value={home.eyebrow} />
          </p>
          <p className="heroMeta">
            <C value={site.place} />
            <br />
            <C value={ui.available} />
          </p>
        </div>
        <h1>
          BUILDING
          <br />
          <em>DIGITAL SYSTEMS</em>
          <br />
          THAT SHIP<span className="heroAccent">.</span>
        </h1>
        <div className="heroFoot">
          <div className="heroBottom reveal">
            <p>
              <C value={home.intro} />
            </p>
            <a href="#can-do">
              <C value={home.exploreWork} /> <b>↘</b>
            </a>
          </div>
          <div className="terminal reveal">
            <div className="termbar">
              <span>~/byakko/portfolio</span>
            </div>
            <pre>
              <span className="cyan">$</span> whoami{"\n"}Byakko Kondo{"\n"}
              <span className="muted">engineer / creative developer / tokyo</span>
              {"\n\n"}
              <span className="cyan">$</span> status{"\n"}shipping products <span className="green">✓</span>
              {"\n"}building systems <span className="green">✓</span>
              {"\n"}open to projects <span className="green">✓</span>
              <span className="cursor">▋</span>
            </pre>
          </div>
        </div>
      </section>

      <Ticker />

      <section id="can-do" className="canDo">
        <header className="sectionHead">
          <p>01 / WHAT I CAN DO</p>
          <h2>
            WHAT I CAN
            <br />
            <em>BUILD FOR YOU.</em>
          </h2>
          <p className="side">
            <C value={home.canDoSide} />
          </p>
        </header>
        <Reveal className="canDoGrid" stagger={0.09}>
          {capabilities.map((c) => (
            <article className="canDoCard" key={c.index}>
              <div className="canDoMark">
                <LottieMark src={c.mark} />
              </div>
              <div className="canDoBody">
                <span className="canDoIndex">{c.index}</span>
                <h3>
                  <C value={c.title} />
                </h3>
                <p>
                  <C value={c.body} />
                </p>
                <div className="chips">
                  {c.items.map((i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </Reveal>
        <Link className="canDoWorks" href="/works">
          <span>
            <C value={home.canDoWorks} />
          </span>
          <b>
            <C value={ui.allWorks} /> ↗
          </b>
        </Link>
      </section>

      <section id="about" className="about">
        <div className="sectionHead">
          <p>02 / ABOUT</p>
          <h2>
            IDEA TO
            <br />
            <em>IMPLEMENTATION.</em>
          </h2>
        </div>
        <div className="aboutGrid">
          <p className="bigcopy">
            <C value={home.aboutLede} />
          </p>
          <div className="bio">
            {home.aboutBio.map((p) => (
              <p key={p.en}>
                <C value={p} />
              </p>
            ))}
          </div>
        </div>
        <div className="timeline">
          {home.timeline.map((t) => (
            <div key={t.span}>
              <span>{t.span}</span>
              <b>
                <C value={t.title} />
              </b>
              <p>
                <C value={t.note} />
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="stack">
        <p>03 / CAPABILITIES</p>
        <h2>
          THE STACK IS A TOOL.
          <br />
          <em>THE OUTCOME IS THE PRODUCT.</em>
        </h2>
        <div className="techgrid">
          {tech.map((t, i) => (
            <div key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {t}
              <b>↗</b>
            </div>
          ))}
        </div>
      </section>

      <section className="contact">
        <p>04 / START A PROJECT</p>
        <h2>
          HAVE AN IDEA?
          <br />
          <em>LET&apos;S BUILD IT.</em>
        </h2>
        <a href="mailto:byakkokondo@gmail.com">
          BYAKKOKONDO@GMAIL.COM <span>↗</span>
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
