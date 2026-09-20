import type { Metadata } from "next";
import { LanguageProvider } from "@/components/Lang";
import { LANG_INIT_SCRIPT } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Byakko Kondo — Engineer / Creative Developer",
  description:
    "Digital products, web experiences, research software and automation systems. デジタルプロダクト、Web、研究用ソフトウェア、業務自動化。",
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
