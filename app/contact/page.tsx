import type { Metadata } from "next";
import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Byakko Kondo",
  description: "Contact Byakko Kondo about product development, web engineering and digital projects.",
};

export default function ContactPage() {
  return (
    <main>
      <SiteNav />

      <section className="pageHead">
        <div className="gridbg" />
        <div className="orb o1" />
        <p className="eyebrow">
          <i /> 01 / CONTACT — PROJECTS / COLLABORATION / ENQUIRIES
        </p>
        <h1>
          LET&apos;S BUILD
          <br />
          <em>SOMETHING.</em>
        </h1>
        <div className="pageLede">
          <p>{contact.lede}</p>
          <span className="pageLedeMeta">
            {site.place}
            <br />
            AVAILABLE FOR PROJECTS
          </span>
        </div>
      </section>

      <section className="enquiry">
        <header className="sectionHead">
          <p>02 / ENQUIRY</p>
          <h2>
            TELL ME WHAT
            <br />
            <em>YOU NEED.</em>
          </h2>
          <p className="side">
            REPLY BY EMAIL
            <br />
            JAPANESE / ENGLISH
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
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span>{link.label}</span>
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
          VIEW ALL WORKS <span>↗</span>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
