import type { Metadata } from "next";
import BackToTop from "@/components/BackToTop";
import DisplayReveal from "@/components/DisplayReveal";
import HtmlLang from "@/components/HtmlLang";
import NotFoundPage from "@/components/pages/NotFoundPage";
import { pageSeo } from "@/lib/pageSeo";
import "./globals.css";

/**
 * The 404 for every unmatched URL in both trees.
 *
 * It sits at the app root because with two root layouts there is no single
 * one for Next to wrap it in — Next supplies a bare html/body of its own
 * here, so this renders the contents and nothing more. That bare html has no
 * lang for the stylesheet's Japanese settings to key off, which is what
 * HtmlLang is for.
 *
 * Japanese, because that is the tree an unmatched URL was most likely
 * reaching for and what x-default points at.
 *
 * Next emits the `noindex` for this route itself. What it does not do is
 * stop the route inheriting a canonical, which would hand a 404's authority
 * to whichever page the layout points at — hence the empty `alternates`.
 */
export const metadata: Metadata = {
  title: pageSeo.notFound.title.ja,
  description: pageSeo.notFound.description.ja,
  alternates: {},
};

export default function NotFound() {
  return (
    <>
      <HtmlLang lang="ja" />
      <NotFoundPage lang="ja" />
      <DisplayReveal />
      <BackToTop lang="ja" />
    </>
  );
}
