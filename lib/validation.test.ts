import { describe, expect, it } from "vitest";
import {
  buildMailto,
  emptyEnquiry,
  firstInvalid,
  LIMITS,
  remainingCharacters,
  validateEnquiry,
  type EnquiryValues,
} from "./validation";

const options = { to: "byakkokondo@gmail.com", fallbackSubject: "Project enquiry" };

const enquiry = (overrides: Partial<EnquiryValues> = {}): EnquiryValues => ({
  ...emptyEnquiry,
  name: "Byakko Kondo",
  email: "hello@example.com",
  company: "",
  subject: "New site",
  message: "Five pages, launching in March. Budget is flexible.",
  ...overrides,
});

const check = (overrides: Partial<EnquiryValues> = {}) =>
  validateEnquiry(enquiry(overrides), options);

describe("required fields", () => {
  it("accepts a complete enquiry", () => {
    expect(check()).toEqual({});
  });

  it("flags every empty required field at once", () => {
    expect(Object.keys(validateEnquiry(emptyEnquiry, options)).sort()).toEqual([
      "email",
      "message",
      "name",
      "subject",
    ]);
  });

  it("treats whitespace as empty", () => {
    expect(check({ name: "   " }).name).toBeDefined();
  });

  it("leaves company optional", () => {
    expect(check({ company: "" }).company).toBeUndefined();
    expect(check({ company: "x".repeat(LIMITS.company + 1) }).company).toBeDefined();
  });
});

describe("email", () => {
  it.each([
    "hello@example.com",
    "first.last+tag@sub.example.co.jp",
    "近藤@例え.jp",
  ])("accepts %s", (email) => {
    expect(check({ email }).email).toBeUndefined();
  });

  it.each([
    "hello",
    "hello@example",
    "hello@@example.com",
    "hello @example.com",
    "a@b.c,d@e.f",
  ])("rejects %s", (email) => {
    expect(check({ email }).email).toBeDefined();
  });
});

describe("message", () => {
  it("asks for enough to act on", () => {
    expect(check({ message: "hi" }).message).toBeDefined();
    expect(check({ message: "x".repeat(LIMITS.messageMin) }).message).toBeUndefined();
  });
});

describe("the mail draft", () => {
  it("survives line breaks and Japanese text", () => {
    const url = buildMailto(enquiry({ message: "改行\nあり" }), options);
    expect(url.startsWith(`mailto:${options.to}?subject=`)).toBe(true);
    const body = decodeURIComponent(new URL(url).searchParams.get("body") ?? "");
    expect(body).toContain("改行\nあり");
    expect(body).toContain("NAME: Byakko Kondo");
  });

  it("falls back to a default subject", () => {
    const url = buildMailto(enquiry({ subject: "  " }), options);
    expect(new URL(url).searchParams.get("subject")).toBe(options.fallbackSubject);
  });

  it("stays inside the URL budget, or says by how much it does not", () => {
    const long = check({ message: "あ".repeat(900) });
    expect(long.message?.ja).toMatch(/短く/);
    expect(long.message?.en).toMatch(/shorten/);
  });

  /**
   * The point of measuring rather than counting characters: the same budget
   * holds far less Japanese than English, because each character costs nine
   * URL characters once it is percent-encoded.
   */
  it("counts the remainder in the characters being typed", () => {
    const latin = remainingCharacters(enquiry({ message: "x".repeat(100) }), options);
    const japanese = remainingCharacters(enquiry({ message: "あ".repeat(100) }), options);
    expect(latin).toBeGreaterThan(japanese * 5);
    expect(buildMailto(enquiry({ message: "x".repeat(100 + latin) }), options).length).toBeCloseTo(
      LIMITS.mailtoUrl,
      -1
    );
  });

  it("does not run the length check while a field is still wrong", () => {
    // The overflow message would otherwise mask the real problem.
    const errors = validateEnquiry(enquiry({ email: "nope", message: "あ".repeat(900) }), options);
    expect(errors.email).toBeDefined();
    expect(errors.message).toBeUndefined();
  });
});

describe("focus order", () => {
  it("reports the first invalid field in visual order", () => {
    expect(firstInvalid(validateEnquiry(emptyEnquiry, options))).toBe("name");
    expect(firstInvalid(check({ subject: "", message: "" }))).toBe("subject");
    expect(firstInvalid({})).toBeUndefined();
  });
});
