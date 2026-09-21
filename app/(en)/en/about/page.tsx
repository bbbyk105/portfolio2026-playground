import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { pageSeo } from "@/lib/pageSeo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ lang: "en", path: "/about", ...pageSeo.about });

export default function Page() {
  return <AboutPage lang="en" />;
}
