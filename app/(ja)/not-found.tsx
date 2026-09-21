import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { pageSeo } from "@/lib/pageSeo";

/**
 * For a notFound() raised inside the Japanese tree.
 *
 * The file the host serves for an address that matches no route at all is a
 * separate thing: app/(ja)/404, which exports to 404.html. A not-found.tsx
 * cannot do that job here — Next only exports one from app/ root, and a
 * not-found.tsx at app/ root makes Next synthesise its own root layout and
 * nest both language layouts inside it, which puts an <html> inside a <body>.
 */
export const metadata: Metadata = {
  title: pageSeo.notFound.title.ja,
  description: pageSeo.notFound.description.ja,
  alternates: {},
};

export default function NotFound() {
  return <NotFoundPage lang="ja" />;
}
