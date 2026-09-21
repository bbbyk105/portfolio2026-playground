import type { Metadata } from "next";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { pageSeo } from "@/lib/pageSeo";

/**
 * The 404 the host serves for any address that matches no route.
 *
 * It is a real route rather than a not-found.tsx because only an app/ root
 * not-found is exported as 404.html, and one there makes Next synthesise a
 * root layout that nests both language layouts inside it. As a page in the
 * Japanese tree it gets the right layout and still lands on out/404.html.
 * noindex, because it is reachable at /404 as well.
 */
export const metadata: Metadata = {
  title: pageSeo.notFound.title.ja,
  description: pageSeo.notFound.description.ja,
  robots: { index: false, follow: true },
  alternates: {},
};

export default function Page() {
  return <NotFoundPage lang="ja" />;
}
