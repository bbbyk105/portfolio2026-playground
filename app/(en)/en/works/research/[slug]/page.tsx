import type { Metadata } from "next";
import ResearchDetailPage from "@/components/pages/ResearchDetailPage";
import { researchTitle, shareName } from "@/lib/pageSeo";
import { getResearch, research } from "@/lib/research";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return research.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResearch(slug);
  if (!entry) return {};
  return pageMetadata({
    lang: "en",
    path: `/works/research/${entry.slug}`,
    title: researchTitle(entry.name),
    shareTitle: shareName(entry.name),
    description: entry.statement,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <ResearchDetailPage lang="en" slug={slug} />;
}
