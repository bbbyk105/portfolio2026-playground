import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C, T } from "@/components/Lang";
import { research, getResearch } from "@/lib/research";
import { ui } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) return {};
  return {
    title: `${entry.name} — Works — Byakko Kondo`,
    description: entry.statement.en,
    openGraph: { title: `${entry.name} — Byakko Kondo`, description: entry.statement.en },
  };
}

export default async function ResearchDetailPage({ params }: Params) {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) notFound();

  const at = research.indexOf(entry);
  const next = research[(at + 1) % research.length];

  return (
    <main>
      <SiteNav />

      <PageHead
        variant="detail"
        seed={at + 2}
        eyebrow={
          <>
            <Link href="/works">WORKS</Link> / {entry.index} —{" "}
            <span className="upper">
              <C value={entry.kind} />
            </span>{" "}
            / {entry.year}
          </>
        }
        lines={entry.title.map((line, i) => ({
          text: line,
          faint: entry.title.length > 1 && i === entry.title.length - 1,
        }))}
        lede={<C value={entry.statement} />}
        meta={
          <>
            {entry.year}
            <br />
            <C value={entry.place ?? entry.sector} />
          </>
        }
      >
        <dl className="spec">
          <div>
            <dt>
              <C value={ui.sector} />
            </dt>
            <dd>
              <C value={entry.sector} />
            </dd>
          </div>
          <div>
            <dt>
              <C value={ui.role} />
            </dt>
            <dd>
              <C value={entry.role} />
            </dd>
          </div>
          <div>
            <dt>
              <C value={ui.year} />
            </dt>
            <dd>{entry.year}</dd>
          </div>
          {entry.place ? (
            <div>
              <dt>
                <T en="CONTEXT" ja="場" />
              </dt>
              <dd>
                <C value={entry.place} />
              </dd>
            </div>
          ) : null}
          <div>
            <dt>
              <T en="SOURCE" ja="ソース" />
            </dt>
            <dd>
              {entry.repo ? (
                <a href={entry.repo} target="_blank" rel="noreferrer">
                  {entry.repo.replace("https://", "")} ↗
                </a>
              ) : (
                <T en="Not public" ja="非公開" />
              )}
            </dd>
          </div>
        </dl>
      </PageHead>

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>01 / PROJECT</p>
            <h2>
              WHAT THE
              <br />
              <em>PROBLEM IS.</em>
            </h2>
          </header>
          <div className="detailBody">
            {entry.brief.map((p) => (
              <p key={p.en}>
                <C value={p} />
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mechanism">
        <header className="sectionHead">
          <p>02 / HOW IT WORKS</p>
          <h2>
            STEP BY STEP,
            <br />
            <em>END TO END.</em>
          </h2>
          <p className="side">
            <T en="INPUT → OUTPUT PER STAGE" ja="各段階の 入力 → 出力" />
          </p>
        </header>
        <Reveal className="pipeline" stagger={0.05}>
          {entry.pipeline.map((step) => (
            <article className="pipeStep" key={step.n}>
              <span className="pipeN">{step.n}</span>
              <div className="pipeBody">
                <b>
                  <C value={step.title} />
                </b>
                <p>
                  <C value={step.body} />
                </p>
              </div>
              {step.out ? <span className="pipeOut">{step.out}</span> : null}
            </article>
          ))}
        </Reveal>
      </section>

      {entry.layers ? (
        <section className="layers">
          <header className="sectionHead">
            <p>03 / ARCHITECTURE</p>
            <h2>
              THREE TIERS,
              <br />
              <em>ONE PIPELINE.</em>
            </h2>
          </header>
          <Reveal className="layerList" stagger={0.08}>
            {entry.layers.map((layer, i) => (
              <article className="layerRow" key={layer.name}>
                <span className="layerIndex">{String(i + 1).padStart(2, "0")}</span>
                <div className="layerBody">
                  <b>{layer.name}</b>
                  <p>
                    <C value={layer.role} />
                  </p>
                  <div className="chips">
                    {layer.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </Reveal>
        </section>
      ) : null}

      {entry.code ? (
        <section className="codeScene">
          <header className="sectionHead">
            <p>{entry.layers ? "04" : "03"} / THE CORE</p>
            <h2>
              THE WHOLE IDEA,
              <br />
              <em>IN ONE DIVISION.</em>
            </h2>
          </header>
          <Reveal>
            <div className="terminal">
              <div className="termbar">
                <span>{entry.code.filename}</span>
                <span>{entry.code.label}</span>
              </div>
              <pre>
                {entry.code.lines.map((line, i) => (
                  <span key={i} className={line.startsWith("#") ? "muted" : undefined}>
                    {line}
                    {"\n"}
                  </span>
                ))}
              </pre>
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>{entry.layers ? "05" : "04"} / OUTPUT</p>
            <h2>
              WHAT IT
              <br />
              <em>PRODUCES.</em>
            </h2>
          </header>
          <ol className="built">
            {entry.outputs.map((item, i) => (
              <li key={item.en}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>
                  <C value={item} />
                </p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>{entry.layers ? "06" : "05"} / TECHNOLOGY</p>
            <h2>
              THE STACK
              <br />
              <em>BEHIND IT.</em>
            </h2>
          </header>
          <div className="chips chipsLarge">
            {entry.stack.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="nextWork">
        <Link className="nextLink" href={`/works/research/${next.slug}`}>
          <span className="nextLabel">
            <C value={ui.next} /> — {next.index}
          </span>
          <span className="nextName">{next.name}</span>
          <span className="nextArrow">→</span>
        </Link>
        <Link className="allLink" href="/works">
          <C value={ui.allWorks} /> ↗
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
