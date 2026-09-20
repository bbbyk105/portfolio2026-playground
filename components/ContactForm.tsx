"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { C, useLang } from "./Lang";
import { contact, site } from "@/lib/site";
import {
  buildMailto,
  emptyEnquiry,
  firstInvalid,
  remainingCharacters,
  remainingLabel,
  summary,
  validateEnquiry,
  type EnquiryField,
  type EnquiryValues,
} from "@/lib/validation";

/**
 * There is no backend on this site, so the form composes a mail draft in the
 * visitor's own client.
 *
 * The browser's own validation is turned off: its bubbles speak the browser's
 * language rather than the one this site is currently showing, and a visitor
 * reading Japanese should not be corrected in English. The rules in
 * lib/validation.ts take over, and the fields keep `required` and
 * `type="email"` for the semantics and the mobile keyboard.
 *
 * Nothing is flagged while a field is still being filled in for the first
 * time: an error appears once the field is left, or once the form has been
 * submitted, and then stays live until it is fixed.
 */
export default function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { lang } = useLang();
  const f = contact.form;

  const options = useMemo(
    () => ({ to: site.email, fallbackSubject: f.defaultSubject[lang] }),
    [f.defaultSubject, lang]
  );
  const errors = useMemo(() => validateEnquiry(values, options), [values, options]);
  const count = Object.keys(errors).length;
  // The draft travels as a URL, so the ceiling is the encoded length of the
  // whole thing rather than a character count of this one field. Warn while
  // there is still room to edit rather than at the moment of failure.
  const remaining = remainingCharacters(values, options);

  const shown = (field: EnquiryField) =>
    attempted || touched[field] ? errors[field] : undefined;

  const change = (field: EnquiryField) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setSent(false);
  };

  const blur = (field: EnquiryField) => () =>
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAttempted(true);

    const field = firstInvalid(errors);
    if (field) {
      const input = formRef.current?.elements.namedItem(field);
      if (input instanceof HTMLElement) input.focus();
      return;
    }

    window.location.href = buildMailto(values, options);
    setSent(true);
  };

  /**
   * The label is tied to the control by id rather than by wrapping it, so the
   * error and the counter can sit in the same block without being read out as
   * part of the field's name.
   */
  const field = (
    name: EnquiryField,
    label: React.ReactNode,
    control: React.ReactNode,
    extra?: React.ReactNode
  ) => {
    const error = shown(name);
    return (
      <div className={`field${name === "message" ? " fieldWide" : ""}`}>
        <label htmlFor={name}>{label}</label>
        {control}
        {error ? (
          <strong className="fieldError" id={`${name}-error`}>
            <C value={error} />
          </strong>
        ) : null}
        {extra}
      </div>
    );
  };

  const aria = (name: EnquiryField) => ({
    id: name,
    name,
    value: values[name],
    onChange: change(name),
    onBlur: blur(name),
    "aria-invalid": shown(name) ? (true as const) : undefined,
    "aria-describedby": shown(name) ? `${name}-error` : undefined,
  });

  return (
    <form className="form" ref={formRef} onSubmit={onSubmit} noValidate>
      <div className="formGrid">
        {field(
          "name",
          <C value={f.name} />,
          <input required autoComplete="name" placeholder={f.namePlaceholder[lang]} {...aria("name")} />
        )}
        {field(
          "email",
          <C value={f.email} />,
          <input
            required
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...aria("email")}
          />
        )}
        {field(
          "company",
          <C value={f.company} />,
          <input autoComplete="organization" placeholder={f.companyPlaceholder[lang]} {...aria("company")} />
        )}
        {field(
          "subject",
          <C value={f.subject} />,
          <input required placeholder={f.subjectPlaceholder[lang]} {...aria("subject")} />
        )}
      </div>

      {field(
        "message",
        <C value={f.message} />,
        <textarea required rows={7} placeholder={f.messagePlaceholder[lang]} {...aria("message")} />,
        values.message.length > 0 && remaining < 150 ? (
          <span className="fieldCount">
            <C value={remainingLabel(remaining)} />
          </span>
        ) : null
      )}

      {/* One announcement rather than five: the field messages are reached
          through aria-describedby when focus lands on the field itself. */}
      <p className="formErrors" role="alert">
        {attempted && count > 0 ? <C value={summary(count)} /> : null}
      </p>

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
