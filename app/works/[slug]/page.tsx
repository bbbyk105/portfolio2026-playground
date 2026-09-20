import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C } from "@/components/Lang";
import { works, getWork } from "@/lib/works";
import { ui } from "@/lib/site";

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
    description: work.statement.en,
    openGraph: { title: `${work.name} — Byakko Kondo`, description: work.statement.en },
  };
}

export default async function WorkDetailPage({ params }: Params) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const at = works.indexOf(work);
  const next = works[(at + 1) % works.length];
  const host = new URL(work.url).host;

  return (
    <main>
      <SiteNav />

      <PageHead
        variant="detail"
        seed={at}
        eyebrow={
          <>
            <Link href="/works">WORKS</Link> / {work.index} — <span className="upper"><C value={work.sector} /></span> / {work.year}
          </>
        }
        lines={work.title.map((line, i) => ({
          text: line,
          faint: work.title.length > 1 && i === work.title.length - 1,
        }))}
        lede={<C value={work.statement} />}
        meta={
          <>
            {work.year}
            <br />
            <C value={work.place ?? work.sector} />
          </>
        }
      >
        <dl className="spec">
          <div>
            <dt>
              <C value={ui.client} />
            </dt>
            <dd>
              <C value={work.client} />
            </dd>
          </div>
          <div>
            <dt>
              <C value={ui.sector} />
            </dt>
            <dd>
              <C value={work.sector} />
            </dd>
          </div>
          <div>
            <dt>
              <C value={ui.role} />
            </dt>
            <dd>
              <C value={work.role} />
            </dd>
          </div>
          <div>
            <dt>
              <C value={ui.year} />
            </dt>
            <dd>{work.year}</dd>
          </div>
          <div>
            <dt>
              <C value={ui.live} />
            </dt>
            <dd>
              <a href={work.url} target="_blank" rel="noreferrer">
                {host} ↗
              </a>
            </dd>
          </div>
        </dl>
      </PageHead>

      <section className="plates">
        <Reveal className="platesGrid">
          <a className="screen" href={work.url} target="_blank" rel="noreferrer">
            <img src={work.screens.desktop} alt={work.name} width={1600} height={1000} />
            <span>
              <C value={ui.desktop} />
            </span>
          </a>
          <a className="screen screenMobile" href={work.url} target="_blank" rel="noreferrer">
            <img src={work.screens.mobile} alt={work.name} width={780} height={1688} />
            <span>
              <C value={ui.mobile} />
            </span>
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
              <p key={p.en}>
                <C value={p} />
              </p>
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
