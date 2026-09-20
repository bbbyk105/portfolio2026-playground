import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C } from "@/components/Lang";
import { works } from "@/lib/works";
import { research } from "@/lib/research";
import { ui, works_page } from "@/lib/site";

export const metadata: Metadata = {
  title: "Works — Byakko Kondo",
  description:
    "Five products in production: a nutrition app, a precision-machining company, a legal office, an organic tea store and a photography studio — designed and built end to end.",
};

export default function WorksPage() {
  return (
    <main>
      <SiteNav />

      <PageHead
        variant="works"
        eyebrow={
          <>
            01 / WORKS — <C value={works_page.meta} />
          </>
        }
        lines={[{ text: "SHIPPED," }, { text: "AND LIVE.", faint: true }]}
        lede={<C value={works_page.lede} />}
        meta={
          <>
            2025—2026
            <br />
            DESIGN / ENGINEERING / SYSTEMS
          </>
        }
      />

      <section className="work ledger">
        <div className="workList">
          {works.map((w) => (
            <Reveal key={w.slug}>
              <article className="project">
                <div className="projectMeta">
                  <span>{w.index}</span>
                  <span className="upper">
                    <C value={w.sector} />
                  </span>
                  <span>{w.year}</span>
                </div>
                <div className="projectBody">
                  <div>
                    <h3>{w.name}</h3>
                    <p>
                      <C value={w.statement} />
                    </p>
                    <div className="chips">
                      {w.stack.map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </div>
                    <Link href={`/works/${w.slug}`}>
                      <C value={ui.caseStudy} /> →
                    </Link>
                  </div>
                  <Link className="screen" href={`/works/${w.slug}`}>
                    <img src={w.screens.desktop} alt={`${w.name}`} width={1600} height={1000} />
                    <span>LIVE / {w.index}</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="practice">
        <header className="sectionHead">
          <p>02 / RESEARCH</p>
          <h2>
            BUILT FOR
            <br />
            <em>A QUESTION.</em>
          </h2>
          <p className="side">
            <C value={works_page.practiceNote} />
          </p>
        </header>
        <Reveal className="practiceGrid">
          {research.map((r) => (
            <Link className="practiceCard" key={r.slug} href={`/works/research/${r.slug}`}>
              <div className="practiceMeta">
                <span className="upper">
                  <C value={r.kind} />
                </span>
                <span>{r.year}</span>
              </div>
              <h3>{r.name}</h3>
              <p>
                <C value={r.statement} />
              </p>
              <div className="chips">
                {r.notes.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
              <span className="practiceCta">
                <C value={ui.caseStudy} /> →
              </span>
            </Link>
          ))}
        </Reveal>
      </section>

      <section className="contact">
        <p>03 / START A PROJECT</p>
        <h2>
          HAVE AN IDEA?
          <br />
          <em>LET&apos;S BUILD IT.</em>
        </h2>
        <Link href="/contact">
          <C value={ui.getInTouch} /> <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
