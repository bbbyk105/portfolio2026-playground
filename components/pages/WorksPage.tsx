import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C } from "@/components/Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { halfWidth, works } from "@/lib/works";
import { research } from "@/lib/research";
import JsonLd from "@/components/JsonLd";
import { collectionGraph } from "@/lib/seo";
import { ui, works_page } from "@/lib/site";

export default function WorksPage({ lang }: { lang: Lang }) {
  const to = (path: string) => localeHref(lang, path);
  return (
    <main>
      <SiteNav lang={lang} />

      <JsonLd
        graph={collectionGraph(
          [
            ...works.map((w) => ({ name: w.name, path: `/works/${w.slug}` })),
            ...research.map((r) => ({ name: r.name, path: `/works/research/${r.slug}` })),
          ],
          lang
        )}
      />

      <PageHead
        lang={lang}
        variant="works"
        crumbs={[
          { name: "HOME", path: "" },
          { name: "WORKS", path: "/works" },
        ]}
        eyebrow={
          <>
            01 / WORKS — <C lang={lang} value={works_page.meta} />
          </>
        }
        lines={[{ text: "SHIPPED," }, { text: "AND LIVE.", faint: true }]}
        lede={<C lang={lang} value={works_page.lede} />}
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
                    <C lang={lang} value={w.sector} />
                  </span>
                  <span>{w.year}</span>
                </div>
                <div className="projectBody">
                  <div>
                    <h3>{w.name}</h3>
                    <p>
                      <C lang={lang} value={w.statement} />
                    </p>
                    <ul className="chips">
                      {w.stack.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <Link href={to(`/works/${w.slug}`)}>
                      <C lang={lang} value={ui.caseStudy} /> →
                    </Link>
                  </div>
                  <Link className="screen" href={to(`/works/${w.slug}`)}>
                    <figure>
                      <img
                        src={w.screens.desktop}
                        srcSet={`${halfWidth(w.screens.desktop)} 800w, ${w.screens.desktop} 1600w`}
                        // Roughly 1.35 of the 2.35 columns the row splits
                        // into, and the full gutter-to-gutter width once the
                        // row stacks at 760px.
                        sizes="(max-width: 760px) 88vw, 50vw"
                        alt={
                          lang === "ja"
                            ? `${w.name} — ${w.sector.ja}のケーススタディ（デスクトップ表示）`
                            : `${w.name} — ${w.sector.en} case study, desktop view`
                        }
                        width={1600}
                        height={1000}
                        loading="lazy"
                        decoding="async"
                      />
                      <figcaption>LIVE / {w.index}</figcaption>
                    </figure>
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
            <span className="faint">A QUESTION.</span>
          </h2>
          <p className="side">
            <C lang={lang} value={works_page.practiceNote} />
          </p>
        </header>
        <Reveal className="practiceGrid">
          {research.map((r) => (
            <Link className="practiceCard" key={r.slug} href={to(`/works/research/${r.slug}`)}>
              <div className="practiceMeta">
                <span className="upper">
                  <C lang={lang} value={r.kind} />
                </span>
                <span>{r.year}</span>
              </div>
              <h3>{r.name}</h3>
              <p>
                <C lang={lang} value={r.statement} />
              </p>
              <ul className="chips">
                {r.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <span className="practiceCta">
                <C lang={lang} value={ui.caseStudy} /> →
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
          <span className="faint">LET&apos;S BUILD IT.</span>
        </h2>
        <Link href={to("/contact")}>
          <C lang={lang} value={ui.getInTouch} /> <span>↗</span>
        </Link>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
