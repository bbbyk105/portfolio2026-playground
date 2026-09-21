import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";
import { pageSeo } from "@/lib/pageSeo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ lang: "en", path: "/contact", ...pageSeo.contact });

export default function Page() {
  return <ContactPage lang="en" />;
}
