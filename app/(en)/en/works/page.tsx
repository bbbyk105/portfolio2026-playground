import type { Metadata } from "next";
import WorksPage from "@/components/pages/WorksPage";
import { pageSeo } from "@/lib/pageSeo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ lang: "en", path: "/works", ...pageSeo.works });

export default function Page() {
  return <WorksPage lang="en" />;
}
