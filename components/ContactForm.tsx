"use client";

import { useState, type FormEvent } from "react";
import { C, useLang } from "./Lang";
import { contact, site } from "@/lib/site";

/**
 * There is no backend on this site, so the form composes a mail draft in the
 * visitor's own client. Building the mailto URL on submit (rather than using
 * `action="mailto:"`) keeps the subject and body encoded correctly.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const { lang } = useLang();
  const f = contact.form;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const body = [
      `NAME: ${get("name")}`,
      `EMAIL: ${get("email")}`,
      `COMPANY: ${get("company") || "—"}`,
      "",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      get("subject") || f.defaultSubject[lang]
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="formGrid">
        <label className="field">
          <span>
            <C value={f.name} />
          </span>
          <input required name="name" autoComplete="name" placeholder={f.namePlaceholder[lang]} />
        </label>
        <label className="field">
          <span>
            <C value={f.email} />
          </span>
          <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="field">
          <span>
            <C value={f.company} />
          </span>
          <input name="company" autoComplete="organization" placeholder={f.companyPlaceholder[lang]} />
        </label>
        <label className="field">
          <span>
            <C value={f.subject} />
          </span>
          <input required name="subject" placeholder={f.subjectPlaceholder[lang]} />
        </label>
      </div>

      <label className="field fieldWide">
        <span>
          <C value={f.message} />
        </span>
        <textarea required name="message" rows={7} placeholder={f.messagePlaceholder[lang]} />
      </label>

      <button type="submit" className="formSubmit">
        <span className="formSubmitKicker">
          <C value={f.sendTo} />
        </span>
        <span className="formSubmitTitle">
          <C value={f.send} />
        </span>
        <span className="formSubmitArrow">→</span>
      </button>

      <p className="formNote" role="status">
        <C value={sent ? f.sent : f.hint} />
      </p>
    </form>
  );
}
