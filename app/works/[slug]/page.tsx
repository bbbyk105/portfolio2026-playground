import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { works, getWork } from "@/lib/works";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: `${work.name} — Works — Byakko Kondo`,
    description: work.statement,
    openGraph: { title: `${work.name} — Byakko Kondo`, description: work.statement },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const next = works[(works.indexOf(work) + 1) % works.length];
  const host = new URL(work.url).host;

  return (
    <main>
      <SiteNav />

      <section className="pageHead">
        <div className="gridbg" />
        <div className="orb o1" />
        <p className="eyebrow">
          <i /> <Link href="/works">WORKS</Link> / {work.index} — {work.sector.toUpperCase()} / {work.year}
        </p>
        <h1>
          {work.title.map((line, i) => (
            <span key={line}>
              {i > 0 ? <br /> : null}
              {i === work.title.length - 1 && work.title.length > 1 ? <em>{line}</em> : line}
            </span>
          ))}
        </h1>
        <div className="pageLede">
          <p>{work.statement}</p>
          <span className="pageLedeMeta">
            {work.year}
            <br />
            {work.place ?? work.sector}
          </span>
        </div>

        <dl className="spec">
          <div>
            <dt>CLIENT</dt>
            <dd>{work.client}</dd>
          </div>
          <div>
            <dt>SECTOR</dt>
            <dd>{work.sector}</dd>
          </div>
          <div>
            <dt>ROLE</dt>
            <dd>{work.role}</dd>
          </div>
          <div>
            <dt>YEAR</dt>
            <dd>{work.year}</dd>
          </div>
          <div>
            <dt>LIVE</dt>
            <dd>
              <a href={work.url} target="_blank" rel="noreferrer">
                {host} ↗
              </a>
            </dd>
          </div>
        </dl>
      </section>

      <section className="plates">
        <Reveal className="platesGrid">
          <a className="screen" href={work.url} target="_blank" rel="noreferrer">
            <img src={work.screens.desktop} alt={`${work.name} — desktop screen`} width={1600} height={1000} />
            <span>DESKTOP</span>
          </a>
          <a className="screen screenMobile" href={work.url} target="_blank" rel="noreferrer">
            <img src={work.screens.mobile} alt={`${work.name} — mobile screen`} width={780} height={1688} />
            <span>MOBILE</span>
          </a>
        </Reveal>
      </section>

      <section className="detail">
        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>01 / PROJECT</p>
            <h2>
              WHAT THE
              <br />
              <em>PROJECT IS.</em>
            </h2>
          </header>
          <div className="detailBody">
            {work.brief.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>02 / DELIVERED</p>
            <h2>
              WHAT WAS
              <br />
              <em>BUILT.</em>
            </h2>
          </header>
          <ol className="built">
            {work.built.map((item, i) => (
              <li key={item}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal className="detailBlock">
          <header className="detailHead">
            <p>03 / TECHNOLOGY</p>
            <h2>
              THE STACK
              <br />
              <em>BEHIND IT.</em>
            </h2>
          </header>
          <div className="chips chipsLarge">
            {work.stack.map((term) => (
              <span key={term}>{term}</span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="nextWork">
        <Link className="nextLink" href={`/works/${next.slug}`}>
          <span className="nextLabel">NEXT — {next.index}</span>
          <span className="nextName">{next.name}</span>
          <span className="nextArrow">→</span>
        </Link>
        <Link className="allLink" href="/works">
          ALL WORKS ↗
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
