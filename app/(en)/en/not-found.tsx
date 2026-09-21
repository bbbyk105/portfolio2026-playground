import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { pageSeo } from "@/lib/pageSeo";

/**
 * For a notFound() raised inside the English tree. The 404.html the host
 * serves for an address that matches no route at all is the Japanese one at
 * app/(ja)/404 — the same page x-default points at.
 */
export const metadata: Metadata = {
  title: pageSeo.notFound.title.en,
  description: pageSeo.notFound.description.en,
  alternates: {},
};

export default function NotFound() {
  return <NotFoundPage lang="en" />;
}
