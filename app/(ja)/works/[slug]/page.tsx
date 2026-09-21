import type { Metadata } from "next";
import WorkDetailPage from "@/components/pages/WorkDetailPage";
import { shareName, workTitle } from "@/lib/pageSeo";
import { pageMetadata } from "@/lib/seo";
import { getWork, works } from "@/lib/works";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return pageMetadata({
    lang: "ja",
    path: `/works/${work.slug}`,
    title: workTitle(work.name),
    shareTitle: shareName(work.name),
    description: work.statement,
  });
}

export default async function Page({ params }: Params) {
  const { slug } = await params;
  return <WorkDetailPage lang="ja" slug={slug} />;
}
