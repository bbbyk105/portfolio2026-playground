import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import SectionIndex from "@/components/SectionIndex";
import Reveal from "@/components/Reveal";
import CodeBlock from "@/components/CodeBlock";
import { C, T } from "@/components/Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { research, getResearch } from "@/lib/research";
import JsonLd from "@/components/JsonLd";
import { creativeWorkGraph } from "@/lib/seo";
import { ui } from "@/lib/site";

export default function ResearchDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const to = (path: string) => localeHref(lang, path);
  const entry = getResearch(slug);
  if (!entry) notFound();

  const at = research.indexOf(entry);
  const next = research[(at + 1) % research.length];

  return (
    <main>
      <SiteNav lang={lang} />

      <JsonLd
        graph={creativeWorkGraph(
          {
            path: `/works/research/${entry.slug}`,
            name: entry.name,
            description: entry.statement[lang],
            year: entry.year,
            subjectOf: entry.repo,
            keywords: entry.stack,
          },
          lang
        )}
      />

      <PageHead
        lang={lang}
        variant="detail"
        seed={at + 2}
        crumbs={[
          { name: "HOME", path: "" },
          { name: "WORKS", path: "/works" },
          { name: entry.name.toUpperCase(), path: `/works/research/${entry.slug}` },
        ]}
        eyebrow={
          <>
            {entry.index} —{" "}
            <span className="upper">
              <C lang={lang} value={entry.kind} />
            </span>{" "}
            / {entry.year}
          </>
        }
        lines={entry.title.map((line, i) => ({
          text: line,
          faint: entry.title.length > 1 && i === entry.title.length - 1,
        }))}
        lede={<C lang={lang} value={entry.statement} />}
        meta={
          <>
            {entry.year}
            <br />
            <C lang={lang} value={entry.place ?? entry.sector} />
          </>
        }
      >
        <dl className="spec">
          <div>
            <dt>
              <C lang={lang} value={ui.sector} />
            </dt>
            <dd>
              <C lang={lang} value={entry.sector} />
            </dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.role} />
            </dt>
            <dd>
              <C lang={lang} value={entry.role} />
            </dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.year} />
            </dt>
            <dd>{entry.year}</dd>
          </div>
          {entry.place ? (
            <div>
              <dt>
                <T lang={lang} en="CONTEXT" ja="場" />
              </dt>
              <dd>
                <C lang={lang} value={entry.place} />
              </dd>
            </div>
          ) : null}
          <div>
            <dt>
              <T lang={lang} en="SOURCE" ja="ソース" />
            </dt>
            <dd>
              {entry.repo ? (
                <a href={entry.repo} target="_blank" rel="noreferrer">
                  {entry.repo.replace("https://", "")} ↗
                </a>
              ) : (
                <T lang={lang} en="Not public" ja="非公開" />
              )}
            </dd>
          </div>
        </dl>
      </PageHead>

      <SectionIndex
        lang={lang}
        items={[
          { id: "problem", label: "01 / PROJECT" },
          { id: "how-it-works", label: "02 / HOW IT WORKS" },
          ...(entry.layers ? [{ id: "architecture", label: "03 / ARCHITECTURE" }] : []),
          ...(entry.code ? [{ id: "core", label: `${entry.layers ? "04" : "03"} / THE CORE` }] : []),
          { id: "output", label: `${entry.layers ? "05" : "04"} / OUTPUT` },
          { id: "technology", label: `${entry.layers ? "06" : "05"} / TECHNOLOGY` },
        ]}
      />

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead" id="problem">
            <p>01 / PROJECT</p>
            <h2>
              WHAT THE
              <br />
              <span className="faint">PROBLEM IS.</span>
            </h2>
          </header>
          <div className="detailBody">
            {entry.brief.map((p) => (
              <p key={p.en}>
                <C lang={lang} value={p} />
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mechanism">
        <header className="sectionHead" id="how-it-works">
          <p>02 / HOW IT WORKS</p>
          <h2>
            STEP BY STEP,
            <br />
            <span className="faint">END TO END.</span>
          </h2>
          <p className="side">
            <T lang={lang} en="INPUT → OUTPUT PER STAGE" ja="各段階の 入力 → 出力" />
          </p>
        </header>
        <Reveal className="pipeline" stagger={0.05}>
          {entry.pipeline.map((step) => (
            <article className="pipeStep" key={step.n}>
              <span className="pipeN">{step.n}</span>
              <div className="pipeBody">
                <b>
                  <C lang={lang} value={step.title} />
                </b>
                <p>
                  <C lang={lang} value={step.body} />
                </p>
              </div>
              {step.out ? <span className="pipeOut">{step.out}</span> : null}
            </article>
          ))}
        </Reveal>
      </section>

      {entry.layers ? (
        <section className="layers">
          <header className="sectionHead" id="architecture">
            <p>03 / ARCHITECTURE</p>
            <h2>
              THREE TIERS,
              <br />
              <span className="faint">ONE PIPELINE.</span>
            </h2>
          </header>
          <Reveal className="layerList" stagger={0.08}>
            {entry.layers.map((layer, i) => (
              <article className="layerRow" key={layer.name}>
                <span className="layerIndex">{String(i + 1).padStart(2, "0")}</span>
                <div className="layerBody">
                  <b>{layer.name}</b>
                  <p>
                    <C lang={lang} value={layer.role} />
                  </p>
                  <ul className="chips">
                    {layer.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </Reveal>
        </section>
      ) : null}

      {entry.code ? (
        <section className="codeScene">
          <header className="sectionHead" id="core">
            <p>{entry.layers ? "04" : "03"} / THE CORE</p>
            <h2>
              THE WHOLE IDEA,
              <br />
              <span className="faint">IN ONE DIVISION.</span>
            </h2>
          </header>
          <Reveal>
            <CodeBlock filename={entry.code.filename} label={entry.code.label} lines={entry.code.lines} />
          </Reveal>
        </section>
      ) : null}

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead" id="output">
            <p>{entry.layers ? "05" : "04"} / OUTPUT</p>
            <h2>
              WHAT IT
              <br />
              <span className="faint">PRODUCES.</span>
            </h2>
          </header>
          <ol className="built">
            {entry.outputs.map((item, i) => (
              <li key={item.en}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <C lang={lang} value={item} />
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="detailBlock">
          <header className="detailHead" id="technology">
            <p>{entry.layers ? "06" : "05"} / TECHNOLOGY</p>
            <h2>
              THE STACK
              <br />
              <span className="faint">BEHIND IT.</span>
            </h2>
          </header>
          <ul className="chips chipsLarge">
            {entry.stack.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="nextWork">
        {next && next.slug !== entry.slug ? (
          <Link className="nextLink" href={to(`/works/research/${next.slug}`)}>
            <span className="nextLabel">
              <C lang={lang} value={ui.next} /> — {next.index}
            </span>
            <span className="nextName">{next.name}</span>
            <span className="nextArrow">→</span>
          </Link>
        ) : (
          <Link className="nextLink" href={to("/works")}>
            <span className="nextLabel">
              <C lang={lang} value={ui.allWorks} />
            </span>
            <span className="nextName">WORKS</span>
            <span className="nextArrow">→</span>
          </Link>
        )}
        <Link className="allLink" href={to("/contact")}>
          <C lang={lang} value={ui.getInTouch} /> ↗
        </Link>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
