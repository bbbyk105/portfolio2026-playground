import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { C } from "@/components/Lang";
import JsonLd from "@/components/JsonLd";
import { localeHref, type Lang } from "@/lib/i18n";
import { contactPageGraph } from "@/lib/seo";
import { contact, site, ui } from "@/lib/site";

export default function ContactPage({ lang }: { lang: Lang }) {
  const to = (path: string) => localeHref(lang, path);
  return (
    <main>
      <SiteNav lang={lang} />

      <JsonLd graph={contactPageGraph(lang)} />

      <PageHead
        lang={lang}
        variant="contact"
        crumbs={[
          { name: "HOME", path: "" },
          { name: "CONTACT", path: "/contact" },
        ]}
        eyebrow="01 / CONTACT — PROJECTS / COLLABORATION / ENQUIRIES"
        lines={[{ text: "LET’S BUILD" }, { text: "SOMETHING.", faint: true }]}
        lede={<C lang={lang} value={contact.lede} />}
        meta={
          <>
            <C lang={lang} value={site.place} />
            <br />
            <C lang={lang} value={ui.available} />
          </>
        }
      />

      <section className="enquiry">
        <header className="sectionHead">
          <p>02 / ENQUIRY</p>
          <h2>
            TELL ME WHAT
            <br />
            <span className="faint">YOU NEED.</span>
          </h2>
          <p className="side">
            <C lang={lang} value={contact.note} />
          </p>
        </header>
        <Reveal>
          <ContactForm lang={lang} />
        </Reveal>
      </section>

      <section className="direct">
        <header className="sectionHead">
          <p>03 / DIRECT</p>
          <h2>
            OR REACH ME
            <br />
            <span className="faint">STRAIGHT AWAY.</span>
          </h2>
        </header>
        <Reveal className="directList" stagger={0.08}>
          {contact.links.map((link) => (
            <a
              className="directRow"
              key={link.value}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span>
                <C lang={lang} value={link.label} />
              </span>
              <b>{link.value}</b>
              <i>↗</i>
            </a>
          ))}
        </Reveal>
      </section>

      <section className="contact">
        <p>04 / SELECTED WORK</p>
        <h2>
          WANT THE
          <br />
          <span className="faint">RECEIPTS?</span>
        </h2>
        <Link href={to("/works")}>
          <C lang={lang} value={ui.allWorks} /> <span>↗</span>
        </Link>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
