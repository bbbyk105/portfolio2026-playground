"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

/**
 * There is no backend on this site, so the form composes a mail draft in the
 * visitor's own client. Building the mailto URL on submit (rather than using
 * `action="mailto:"`) keeps the subject and body encoded correctly.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);

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
      get("subject") || "Project enquiry"
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <div className="formGrid">
        <label className="field">
          <span>NAME</span>
          <input required name="name" autoComplete="name" placeholder="Your name" />
        </label>
        <label className="field">
          <span>EMAIL</span>
          <input required type="email" name="email" autoComplete="email" placeholder="you@example.com" />
        </label>
        <label className="field">
          <span>COMPANY / ORGANISATION</span>
          <input name="company" autoComplete="organization" placeholder="Optional" />
        </label>
        <label className="field">
          <span>SUBJECT</span>
          <input required name="subject" placeholder="What would you like to discuss?" />
        </label>
      </div>

      <label className="field fieldWide">
        <span>MESSAGE</span>
        <textarea
          required
          name="message"
          rows={7}
          placeholder="Project, scope, timeline, or anything else that would help me understand the enquiry."
        />
      </label>

      <button type="submit" className="formSubmit">
        <span className="formSubmitKicker">SEND TO {site.name}</span>
        <span className="formSubmitTitle">SEND MESSAGE</span>
        <span className="formSubmitArrow">→</span>
      </button>

      <p className="formNote" role="status">
        {sent
          ? "MAIL DRAFT OPENED IN YOUR CLIENT — SEND IT TO REACH ME."
          : "THIS OPENS A PRE-FILLED DRAFT IN YOUR MAIL CLIENT."}
      </p>
    </form>
  );
}
