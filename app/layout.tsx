import type { Metadata } from "next";
import { LanguageProvider } from "@/components/Lang";
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
    <html lang="en" data-lang="en">
      <head>
        {/* Runs before first paint so the page never flashes the wrong language. */}
        <script dangerouslySetInnerHTML={{ __html: LANG_INIT_SCRIPT }} />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
