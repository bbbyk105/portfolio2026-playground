import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import { about, capabilityGroups, journey, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — Byakko Kondo",
  description:
    "About Byakko Kondo — engineer and creative developer working across product development, web, research software and automation.",
};

export default function AboutPage() {
  return (
    <main>
      <SiteNav />

      <section className="pageHead">
        <div className="gridbg" />
        <div className="orb o1" />
        <p className="eyebrow">
          <i /> 01 / ABOUT — {site.name} / {site.place}
        </p>
        <h1>
          ENGINEER,
          <br />
          <em>DESIGNER, BUILDER.</em>
        </h1>
        <div className="pageLede">
          <p>{about.lede}</p>
          <span className="pageLedeMeta">
            {site.role}
            <br />
            {site.place}
          </span>
        </div>
      </section>

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
            I build products from idea to implementation — mobile, web, research software and
            automation.
          </p>
          <div className="bio">
            {about.profile.map((p) => (
              <p key={p}>{p}</p>
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
            UNIVERSITY → FREELANCE
            <br />
            RESEARCH / PRODUCT / NPO
          </p>
        </header>
        <Reveal className="journeyList" stagger={0.06}>
          {journey.map((item, i) => (
            <article className="journeyRow" key={item.title}>
              <span className="journeyIndex">{String(i + 1).padStart(2, "0")}</span>
              <span className="journeyYear">{item.year}</span>
              <div className="journeyBody">
                <b>{item.title}</b>
                <p>{item.body}</p>
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
            <div key={item}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.toUpperCase()}
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
            <div className="capsGroup" key={group.label}>
              <span>{group.label}</span>
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
          GET IN TOUCH <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
