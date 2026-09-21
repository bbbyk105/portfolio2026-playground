import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import SectionIndex from "@/components/SectionIndex";
import Reveal from "@/components/Reveal";
import { C, T } from "@/components/Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { getWork, halfWidth, works } from "@/lib/works";
import JsonLd from "@/components/JsonLd";
import { creativeWorkGraph } from "@/lib/seo";
import { ui } from "@/lib/site";

export default function WorkDetailPage({ lang, slug }: { lang: Lang; slug: string }) {
  const to = (path: string) => localeHref(lang, path);
  const work = getWork(slug);
  if (!work) notFound();

  const at = works.indexOf(work);
  const next = works[(at + 1) % works.length];
  const host = new URL(work.url).host;

  return (
    <main>
      <SiteNav lang={lang} />

      <JsonLd
        graph={creativeWorkGraph(
          {
            path: `/works/${work.slug}`,
            name: work.name,
            description: work.statement[lang],
            year: work.year,
            subjectOf: work.url,
            image: work.screens.desktop,
            keywords: work.stack,
          },
          lang
        )}
      />

      <PageHead
        lang={lang}
        variant="detail"
        seed={at}
        crumbs={[
          { name: "HOME", path: "" },
          { name: "WORKS", path: "/works" },
          { name: work.name.toUpperCase(), path: `/works/${work.slug}` },
        ]}
        eyebrow={
          <>
            {work.index} — <span className="upper"><C lang={lang} value={work.sector} /></span> / {work.year}
          </>
        }
        lines={work.title.map((line, i) => ({
          text: line,
          faint: work.title.length > 1 && i === work.title.length - 1,
        }))}
        lede={<C lang={lang} value={work.statement} />}
        meta={
          <>
            {work.year}
            <br />
            <C lang={lang} value={work.place ?? work.sector} />
          </>
        }
      >
        <dl className="spec">
          <div>
            <dt>
              <C lang={lang} value={ui.client} />
            </dt>
            <dd>
              <C lang={lang} value={work.client} />
            </dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.sector} />
            </dt>
            <dd>
              <C lang={lang} value={work.sector} />
            </dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.role} />
            </dt>
            <dd>
              <C lang={lang} value={work.role} />
            </dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.year} />
            </dt>
            <dd>{work.year}</dd>
          </div>
          <div>
            <dt>
              <C lang={lang} value={ui.live} />
            </dt>
            <dd>
              <a href={work.url} target="_blank" rel="noreferrer">
                {host} ↗
              </a>
            </dd>
          </div>
        </dl>
      </PageHead>

      <SectionIndex
        lang={lang}
        items={[
          { id: "project", label: "01 / PROJECT" },
          { id: "how-it-works", label: "02 / HOW IT WORKS" },
          { id: "delivered", label: "03 / DELIVERED" },
          { id: "technology", label: "04 / TECHNOLOGY" },
        ]}
      />

      <section className="plates">
        <Reveal className="platesGrid">
          <a className="screen" href={work.url} target="_blank" rel="noreferrer">
            <figure>
              <img
                src={work.screens.desktop}
                srcSet={`${halfWidth(work.screens.desktop)} 800w, ${work.screens.desktop} 1600w`}
                // 1.6 of the 2.6 columns the plate row splits into, and the
                // full width once it stacks at 760px.
                sizes="(max-width: 760px) 88vw, 58vw"
                alt={lang === "ja" ? `${work.name} のデスクトップ画面` : `${work.name} on desktop`}
                width={1600}
                height={1000}
                fetchPriority="high"
                decoding="async"
              />
              <figcaption>
                <C lang={lang} value={ui.desktop} />
              </figcaption>
            </figure>
          </a>
          <a className="screen screenMobile" href={work.url} target="_blank" rel="noreferrer">
            <figure>
              <img
                src={work.screens.mobile}
                alt={lang === "ja" ? `${work.name} のモバイル画面` : `${work.name} on mobile`}
                width={780}
                height={1688}
                loading="lazy"
                decoding="async"
              />
              <figcaption>
                <C lang={lang} value={ui.mobile} />
              </figcaption>
            </figure>
          </a>
        </Reveal>
      </section>

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead" id="project">
            <p>01 / PROJECT</p>
            <h2>
              WHAT THE
              <br />
              <span className="faint">PROJECT IS.</span>
            </h2>
          </header>
          <div className="detailBody">
            {work.brief.map((p) => (
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
            THE DECISIONS
            <br />
            <span className="faint">UNDER IT.</span>
          </h2>
          <p className="side">
            <T lang={lang} en="FROM THE IMPLEMENTATION" ja="実装から" />
          </p>
        </header>
        <Reveal className="pipeline" stagger={0.06}>
          {work.mechanism.map((m, i) => (
            <article className="pipeStep" key={m.title.en}>
              <span className="pipeN">{String(i + 1).padStart(2, "0")}</span>
              <div className="pipeBody">
                <b>
                  <C lang={lang} value={m.title} />
                </b>
                <p>
                  <C lang={lang} value={m.body} />
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead" id="delivered">
            <p>03 / DELIVERED</p>
            <h2>
              WHAT WAS
              <br />
              <span className="faint">BUILT.</span>
            </h2>
          </header>
          <ol className="built">
            {work.built.map((item, i) => (
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
            <p>04 / TECHNOLOGY</p>
            <h2>
              THE STACK
              <br />
              <span className="faint">BEHIND IT.</span>
            </h2>
          </header>
          <ul className="chips chipsLarge">
            {work.stack.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </Reveal>
      </section>

      <section className="nextWork">
        <Link className="nextLink" href={to(`/works/${next.slug}`)}>
          <span className="nextLabel">
            <C lang={lang} value={ui.next} /> — {next.index}
          </span>
          <span className="nextName">{next.name}</span>
          <span className="nextArrow">→</span>
        </Link>
        <Link className="allLink" href={to("/works")}>
          <C lang={lang} value={ui.allWorks} /> ↗
        </Link>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
