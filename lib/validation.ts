import type { Copy } from "./i18n";

/**
 * Validation for the enquiry form.
 *
 * The rules and the messages live together because most of the messages quote
 * the rule they come from — a limit that moves has to move in both at once.
 * Everything here is pure, so the form component only decides when to run it.
 *
 * The site has no backend: submitting opens a pre-filled draft in the
 * visitor's own mail client. That is why the last check is about URL length
 * rather than about the content — see LIMITS.mailtoUrl below.
 */

export type EnquiryField = "name" | "email" | "company" | "subject" | "message";

export type EnquiryValues = Record<EnquiryField, string>;

export type EnquiryErrors = Partial<Record<EnquiryField, Copy>>;

export const LIMITS = {
  name: 80,
  /** The longest address RFC 5321 allows. */
  email: 254,
  company: 120,
  subject: 120,
  messageMin: 10,
  /**
   * The draft is handed to the mail client as a URL, and clients disagree on
   * how long one may be: the browsers are effectively unlimited, while the
   * older Windows ones cut it somewhere in the low thousands. This sits
   * between the two — long enough for a real enquiry, short enough that the
   * draft should still open.
   *
   * It is a URL budget, not a character count, and that distinction matters:
   * percent-encoding costs one character per Latin letter and nine per
   * Japanese one, so the same limit is about 3,800 characters of English and
   * about 430 of Japanese. Anything user-facing has to be measured, never
   * assumed.
   */
  mailtoUrl: 4000,
} as const;

/**
 * Deliberately not RFC 5322. A form that rejects an address the visitor
 * actually owns is worse than one that lets an unreachable typo through, so
 * this only asks for the shape a mail client needs: something, an @, a
 * domain with a dot in it.
 */
const EMAIL = /^[^\s@,;]+@[^\s@,;]+\.[^\s@,;.]+$/;

const tooLong = (limit: number): Copy => ({
  en: `Please keep this to ${limit} characters or fewer.`,
  ja: `${limit}文字以内でご入力ください。`,
});

const MESSAGES = {
  name: {
    en: "Please tell me your name.",
    ja: "お名前をご入力ください。",
  },
  email: {
    en: "Please add an email address — it is where the reply goes.",
    ja: "ご返信先のメールアドレスをご入力ください。",
  },
  emailShape: {
    en: "This does not look like an email address.",
    ja: "メールアドレスの形式をご確認ください。",
  },
  subject: {
    en: "Please add a subject.",
    ja: "件名をご入力ください。",
  },
  message: {
    en: "Please write your enquiry.",
    ja: "ご相談内容をご入力ください。",
  },
  messageShort: {
    en: `Please write at least ${LIMITS.messageMin} characters so I can tell what the enquiry is about.`,
    ja: `内容が分かるよう、${LIMITS.messageMin}文字以上でお書きください。`,
  },
} satisfies Record<string, Copy>;

const overflow = (chars: number): Copy => ({
  en: `This is longer than a mail draft link can carry. Please shorten it by roughly ${chars} characters, or email me directly.`,
  ja: `メールアプリで開ける長さを超えています。約${chars}文字ほど短くするか、直接メールをお送りください。`,
});

/** Shown once the draft is close to the budget, so overflow is never a surprise. */
export const remainingLabel = (chars: number): Copy => ({
  en: `≈ ${Math.max(0, chars)} characters left`,
  ja: `残り約 ${Math.max(0, chars)} 文字`,
});

export const summary = (count: number): Copy => ({
  en: count === 1 ? "1 field needs attention." : `${count} fields need attention.`,
  ja: `${count}件の入力内容をご確認ください。`,
});

export const emptyEnquiry: EnquiryValues = {
  name: "",
  email: "",
  company: "",
  subject: "",
  message: "",
};

export type MailtoOptions = { to: string; fallbackSubject: string };

/**
 * Builds the draft by hand rather than through action="mailto:", which leaves
 * the encoding to the browser and loses line breaks and Japanese text.
 */
export function buildMailto(values: EnquiryValues, { to, fallbackSubject }: MailtoOptions): string {
  const body = [
    `NAME: ${values.name.trim()}`,
    `EMAIL: ${values.email.trim()}`,
    `COMPANY: ${values.company.trim() || "—"}`,
    "",
    values.message.trim(),
  ].join("\n");

  const subject = values.subject.trim() || fallbackSubject;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * How much of the budget is left, counted in characters of the message as the
 * visitor is actually typing them. The remainder is measured on the encoded
 * URL and converted back at this message's own encoding rate, because quoting
 * a Japanese writer a limit computed at the Latin rate would be useless
 * advice. Negative means the draft is already too long by that much.
 */
export function remainingCharacters(values: EnquiryValues, options: MailtoOptions): number {
  const url = buildMailto(values, options);
  const message = values.message;
  const rate = message.length > 0 ? encodeURIComponent(message).length / message.length : 1;
  return Math.round((LIMITS.mailtoUrl - url.length) / rate);
}

export function validateEnquiry(values: EnquiryValues, options: MailtoOptions): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const value = (field: EnquiryField) => values[field].trim();

  if (!value("name")) errors.name = MESSAGES.name;
  else if (value("name").length > LIMITS.name) errors.name = tooLong(LIMITS.name);

  if (!value("email")) errors.email = MESSAGES.email;
  else if (value("email").length > LIMITS.email) errors.email = tooLong(LIMITS.email);
  else if (!EMAIL.test(value("email"))) errors.email = MESSAGES.emailShape;

  if (value("company").length > LIMITS.company) errors.company = tooLong(LIMITS.company);

  if (!value("subject")) errors.subject = MESSAGES.subject;
  else if (value("subject").length > LIMITS.subject) errors.subject = tooLong(LIMITS.subject);

  if (!value("message")) errors.message = MESSAGES.message;
  else if (value("message").length < LIMITS.messageMin) errors.message = MESSAGES.messageShort;

  // Only worth asking once the fields it is built from are known to be sane.
  if (Object.keys(errors).length === 0) {
    const remaining = remainingCharacters(values, options);
    if (remaining < 0) errors.message = overflow(Math.abs(remaining));
  }

  return errors;
}

/** The order errors are reported in, so focus lands on the first one visually. */
export const FIELD_ORDER: EnquiryField[] = ["name", "email", "company", "subject", "message"];

export function firstInvalid(errors: EnquiryErrors): EnquiryField | undefined {
  return FIELD_ORDER.find((field) => errors[field]);
}
