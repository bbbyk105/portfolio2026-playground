import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import DisplayReveal from "@/components/DisplayReveal";
import { LanguageProvider } from "@/components/LangProvider";
import { LANG_INIT_SCRIPT } from "@/lib/i18n";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Byakko Kondo — Engineer / Creative Developer",
    template: "%s",
  },
  description:
    "Digital products, web experiences, research software and automation systems. デジタルプロダクト、Web、研究用ソフトウェア、業務自動化。",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: "Byakko Kondo",
    locale: "ja_JP",
    alternateLocale: "en_US",
    title: "Byakko Kondo — Engineer / Creative Developer",
    description:
      "Digital products, web experiences, research software and automation systems.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script below rewrites lang/data-lang before React hydrates,
    // so the attributes here are only the neutral starting point.
    <html lang="en" data-lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: the language the page will be read in, and
            a flag that scripting is on. The flag lets the stylesheet hold the
            hero headline back until HeroReveal has cut it into characters —
            without it, a visitor with no JavaScript would be left with an
            invisible headline. */}
        <script dangerouslySetInnerHTML={{ __html: `${LANG_INIT_SCRIPT}document.documentElement.classList.add("js");` }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
        <DisplayReveal />
        <BackToTop />
      </body>
    </html>
  );
}
