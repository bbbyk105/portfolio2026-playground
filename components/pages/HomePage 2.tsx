import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import LottieMark from "@/components/LottieMark";
import HeroReveal from "@/components/HeroReveal";
import HeroEntrance from "@/components/HeroEntrance";
import { C } from "@/components/Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { capabilities, home, site, tech, ui } from "@/lib/site";

/**
 * The homepage, rendered on the server. What crosses to the client is only
 * what has to: the nav's menu, the two headline reveals, the hero's entrance
 * and the Lottie marks — each of them a component that brings its own
 * behaviour and, in three cases, no markup at all.
 */
export default function HomePage({ lang }: { lang: Lang }) {
  const to = (path: string) => localeHref(lang, path);
  return (
    <main>
      <SiteNav lang={lang} />
      <HeroReveal />
      <HeroEntrance />

      <section className="hero">
        <div className="gridbg" />
        <div className="heroTop reveal">
          <p className="eyebrow">
            <C lang={lang} value={home.eyebrow} />
          </p>
          <p className="heroMeta">
            <C lang={lang} value={site.place} />
            <br />
            <C lang={lang} value={ui.available} />
          </p>
        </div>
        <h1>
          BUILDING
          <br />
          <span className="faint">DIGITAL SYSTEMS</span>
          <br />
          THAT SHIP<span className="heroAccent">.</span>
        </h1>
        <div className="heroFoot">
          <div className="heroBottom reveal">
            <p>
              <C lang={lang} value={home.intro} />
            </p>
            <a href="#can-do">
              <C lang={lang} value={home.exploreWork} /> <b>↘</b>
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
            <span className="faint">BUILD FOR YOU.</span>
          </h2>
          <p className="side">
            <C lang={lang} value={home.canDoSide} />
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
                  <C lang={lang} value={c.title} />
                </h3>
                <p>
                  <C lang={lang} value={c.body} />
                </p>
                <ul className="chips">
                  {c.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </Reveal>
        <Link className="canDoWorks" href={to("/works")}>
          <span>
            <C lang={lang} value={home.canDoWorks} />
          </span>
          <b>
            <C lang={lang} value={ui.allWorks} /> ↗
          </b>
        </Link>
      </section>

      <section id="about" className="about">
        <div className="sectionHead">
          <p>02 / ABOUT</p>
          <h2>
            IDEA TO
            <br />
            <span className="faint">IMPLEMENTATION.</span>
          </h2>
        </div>
        <div className="aboutGrid">
          <p className="bigcopy">
            <C lang={lang} value={home.aboutLede} />
          </p>
          <div className="bio">
            {home.aboutBio.map((p) => (
              <p key={p.en}>
                <C lang={lang} value={p} />
              </p>
            ))}
          </div>
        </div>
        <ol className="timeline">
          {home.timeline.map((t) => (
            <li key={t.span}>
              <span>{t.span}</span>
              <b>
                <C lang={lang} value={t.title} />
              </b>
              <p>
                <C lang={lang} value={t.note} />
              </p>
            </li>
          ))}
        </ol>
        <Link className="canDoWorks" href={to("/about")}>
          <span>
            <C lang={lang} value={home.aboutMore} />
          </span>
          <b>
            <C lang={lang} value={ui.profile} /> ↗
          </b>
        </Link>
      </section>

      <section className="stack">
        <p>03 / CAPABILITIES</p>
        <h2>
          THE STACK IS A TOOL.
          <br />
          <span className="faint">THE OUTCOME IS THE PRODUCT.</span>
        </h2>
        <ul className="techgrid">
          {tech.map((t, i) => (
            <li key={t}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {t}
              <b>↗</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="contact">
        <p>04 / START A PROJECT</p>
        <h2>
          HAVE AN IDEA?
          <br />
          <span className="faint">LET&apos;S BUILD IT.</span>
        </h2>
        <a href="mailto:byakkokondo@gmail.com">
          BYAKKOKONDO@GMAIL.COM <span>↗</span>
        </a>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
