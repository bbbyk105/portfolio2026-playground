import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C, T } from "@/components/Lang";
import JsonLd from "@/components/JsonLd";
import { localeHref, type Lang } from "@/lib/i18n";
import { profilePageGraph } from "@/lib/seo";
import { about, capabilityGroups, journey, site, ui } from "@/lib/site";

export default function AboutPage({ lang }: { lang: Lang }) {
  const to = (path: string) => localeHref(lang, path);
  return (
    <main>
      <SiteNav lang={lang} />

      <JsonLd graph={profilePageGraph(lang)} />

      <PageHead
        lang={lang}
        variant="about"
        crumbs={[
          { name: "HOME", path: "" },
          { name: "ABOUT", path: "/about" },
        ]}
        eyebrow={
          <>
            01 / ABOUT — {site.name} / <C lang={lang} value={site.place} />
          </>
        }
        lines={[{ text: "ENGINEER," }, { text: "DESIGNER, BUILDER.", faint: true }]}
        lede={<C lang={lang} value={about.lede} />}
        meta={
          <>
            <C lang={lang} value={site.role} />
            <br />
            <C lang={lang} value={site.place} />
          </>
        }
      />

      <section className="about">
        <div className="sectionHead">
          <p>02 / PROFILE</p>
          <h2>
            IDEA TO
            <br />
            <span className="faint">IMPLEMENTATION.</span>
          </h2>
        </div>
        <Reveal className="aboutGrid">
          <p className="bigcopy">
            <T
              lang={lang}
              en="I build products from idea to implementation — mobile, web, research software and automation."
              ja="アイデアから実装まで、一貫してプロダクトをつくります。モバイル、Web、研究用ソフトウェア、そして自動化。"
            />
          </p>
          <div className="bio">
            {about.profile.map((p) => (
              <p key={p.en}>
                <C lang={lang} value={p} />
              </p>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="journey">
        <header className="sectionHead">
          <p>03 / JOURNEY</p>
          <h2>
            WHERE THE WORK
            <br />
            <span className="faint">CAME FROM.</span>
          </h2>
          <p className="side">
            <C lang={lang} value={about.journeyNote} />
          </p>
        </header>
        <Reveal className="journeyList" stagger={0.06}>
          {journey.map((item, i) => (
            <article className="journeyRow" key={item.title.en}>
              <span className="journeyIndex">{String(i + 1).padStart(2, "0")}</span>
              <span className="journeyYear">
                <C lang={lang} value={item.year} />
              </span>
              <div className="journeyBody">
                <b>
                  <C lang={lang} value={item.title} />
                </b>
                <p>
                  <C lang={lang} value={item.body} />
                </p>
              </div>
            </article>
          ))}
        </Reveal>
      </section>

      <section className="stack">
        <p>04 / WHAT I DO</p>
        <h2>
          FROM REQUIREMENTS
          <br />
          <span className="faint">TO OPERATION.</span>
        </h2>
        <ul className="techgrid techgridWide">
          {about.whatIDo.map((item, i) => (
            <li key={item.en}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <C lang={lang} value={item} />
              <b>↗</b>
            </li>
          ))}
        </ul>
      </section>

      <section className="caps">
        <header className="sectionHead">
          <p>05 / CAPABILITIES</p>
          <h2>
            THE STACK
            <br />
            <span className="faint">IN GROUPS.</span>
          </h2>
        </header>
        <Reveal className="capsGrid">
          {capabilityGroups.map((group) => (
            <div className="capsGroup" key={group.label.en}>
              <span>
                <C lang={lang} value={group.label} />
              </span>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="contact">
        <p>06 / START A PROJECT</p>
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
