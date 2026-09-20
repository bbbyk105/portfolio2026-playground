import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { C } from "@/components/Lang";
import { contact, site, ui } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Byakko Kondo",
  description: "Contact Byakko Kondo about product development, web engineering and digital projects.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteNav />

      <PageHead
        variant="contact"
        eyebrow="01 / CONTACT — PROJECTS / COLLABORATION / ENQUIRIES"
        lines={[{ text: "LET’S BUILD" }, { text: "SOMETHING.", faint: true }]}
        lede={<C value={contact.lede} />}
        meta={
          <>
            <C value={site.place} />
            <br />
            <C value={ui.available} />
          </>
        }
      />

      <section className="enquiry">
        <header className="sectionHead">
          <p>02 / ENQUIRY</p>
          <h2>
            TELL ME WHAT
            <br />
            <em>YOU NEED.</em>
          </h2>
          <p className="side">
            <C value={contact.note} />
          </p>
        </header>
        <Reveal>
          <ContactForm />
        </Reveal>
      </section>

      <section className="direct">
        <header className="sectionHead">
          <p>03 / DIRECT</p>
          <h2>
            OR REACH ME
            <br />
            <em>STRAIGHT AWAY.</em>
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
                <C value={link.label} />
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
          <em>RECEIPTS?</em>
        </h2>
        <Link href="/works">
          <C value={ui.allWorks} /> <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
