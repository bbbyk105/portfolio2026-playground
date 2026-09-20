import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import Reveal from "@/components/Reveal";
import { C, T } from "@/components/Lang";
import { about, capabilityGroups, journey, site, ui } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Byakko Kondo",
  description:
    "About Byakko Kondo — engineer and creative developer working across product development, web, research software and automation.",
};

export default function AboutPage() {
  return (
    <main>
      <SiteNav />

      <PageHead
        variant="about"
        eyebrow={
          <>
            01 / ABOUT — {site.name} / <C value={site.place} />
          </>
        }
        lines={[{ text: "ENGINEER," }, { text: "DESIGNER, BUILDER.", faint: true }]}
        lede={<C value={about.lede} />}
        meta={
          <>
            <C value={site.role} />
            <br />
            <C value={site.place} />
          </>
        }
      />

      <section className="about">
        <div className="sectionHead">
          <p>02 / PROFILE</p>
          <h2>
            IDEA TO
            <br />
            <em>IMPLEMENTATION.</em>
          </h2>
        </div>
        <Reveal className="aboutGrid">
          <p className="bigcopy">
            <T
              en="I build products from idea to implementation — mobile, web, research software and automation."
              ja="アイデアから実装まで、一貫してプロダクトをつくります。モバイル、Web、研究用ソフトウェア、そして自動化。"
            />
          </p>
          <div className="bio">
            {about.profile.map((p) => (
              <p key={p.en}>
                <C value={p} />
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
            <em>CAME FROM.</em>
          </h2>
          <p className="side">
            <C value={about.journeyNote} />
          </p>
        </header>
        <Reveal className="journeyList" stagger={0.06}>
          {journey.map((item, i) => (
            <article className="journeyRow" key={item.title.en}>
              <span className="journeyIndex">{String(i + 1).padStart(2, "0")}</span>
              <span className="journeyYear">
                <C value={item.year} />
              </span>
              <div className="journeyBody">
                <b>
                  <C value={item.title} />
                </b>
                <p>
                  <C value={item.body} />
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
          <em>TO OPERATION.</em>
        </h2>
        <div className="techgrid techgridWide">
          {about.whatIDo.map((item, i) => (
            <div key={item.en}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <C value={item} />
              <b>↗</b>
            </div>
          ))}
        </div>
      </section>

      <section className="caps">
        <header className="sectionHead">
          <p>05 / CAPABILITIES</p>
          <h2>
            THE STACK
            <br />
            <em>IN GROUPS.</em>
          </h2>
        </header>
        <Reveal className="capsGrid">
          {capabilityGroups.map((group) => (
            <div className="capsGroup" key={group.label.en}>
              <span>
                <C value={group.label} />
              </span>
              <div className="chips">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="contact">
        <p>06 / START A PROJECT</p>
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
