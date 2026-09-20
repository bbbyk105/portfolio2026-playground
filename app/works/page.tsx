import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { works } from "@/lib/works";
import { practice } from "@/lib/site";

export const metadata: Metadata = {
  title: "Works — Byakko Kondo",
  description:
    "Five products in production: a nutrition app, a precision-machining company, a legal office, an organic tea store and a photography studio — designed and built end to end.",
};

export default function WorksPage() {
  return (
    <main>
      <SiteNav />

      <section className="pageHead">
        <div className="gridbg" />
        <div className="orb o1" />
        <p className="eyebrow">
          <i /> 01 / WORKS — FIVE PRODUCTS IN PRODUCTION
        </p>
        <h1>
          SHIPPED,
          <br />
          <em>AND LIVE.</em>
        </h1>
        <div className="pageLede">
          <p>
            Products and sites I designed and built end to end, from the information architecture to
            the deploy — each one live, each one in use. Open a case study for what was built and how.
          </p>
          <span className="pageLedeMeta">
            2025—2026
            <br />
            DESIGN / ENGINEERING / SYSTEMS
          </span>
        </div>
      </section>

      <section className="work ledger">
        <div className="workList">
          {works.map((w) => (
            <Reveal key={w.slug}>
              <article className="project">
                <div className="projectMeta">
                  <span>{w.index}</span>
                  <span>{w.sector.toUpperCase()}</span>
                  <span>{w.year}</span>
                </div>
                <div className="projectBody">
                  <div>
                    <h3>{w.name}</h3>
                    <p>{w.statement}</p>
                    <div className="chips">
                      {w.stack.map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </div>
                    <Link href={`/works/${w.slug}`}>CASE STUDY →</Link>
                  </div>
                  <Link className="screen" href={`/works/${w.slug}`}>
                    <img src={w.screens.desktop} alt={`${w.name} — desktop screen`} width={1600} height={1000} />
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
          <p>02 / PRACTICE</p>
          <h2>
            RESEARCH AND
            <br />
            <em>AUTOMATION.</em>
          </h2>
          <p className="side">
            NOT PUBLIC URLS
            <br />
            RESEARCH / PIPELINES
          </p>
        </header>
        <Reveal className="practiceGrid">
          {practice.map((p) => (
            <article className="practiceCard" key={p.id}>
              <div className="practiceMeta">
                <span>{p.meta.join(" / ")}</span>
                <span>{p.year}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.statement}</p>
              <div className="chips">
                {p.notes.map((n) => (
                  <span key={n}>{n}</span>
                ))}
              </div>
            </article>
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
          GET IN TOUCH <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
