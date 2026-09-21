import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { pageSeo } from "@/lib/pageSeo";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ lang: "ja", path: "", ...pageSeo.home });

export default function Page() {
  return <HomePage lang="ja" />;
}
