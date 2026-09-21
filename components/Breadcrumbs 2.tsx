import Link from "next/link";
import JsonLd from "./JsonLd";
import { localeHref, type Lang } from "@/lib/i18n";
import { breadcrumbGraph, type Crumb } from "@/lib/seo";

/**
 * The trail above a subpage's masthead — the visible one and the machine
 * readable one from the same array, so they cannot drift apart.
 *
 * Crumb paths are language-neutral ("/works"); both the links and the
 * BreadcrumbList resolve them into the tree the page belongs to.
 *
 * The last crumb is the page you are on: it is not a link, and carries
 * aria-current so a screen reader says so.
 */
export default function Breadcrumbs({ trail, lang }: { trail: Crumb[]; lang: Lang }) {
  return (
    <>
      <nav className="crumbs" aria-label={lang === "ja" ? "パンくずリスト" : "Breadcrumb"}>
        <ol>
          {trail.map((crumb, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={crumb.path}>
                {last ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={localeHref(lang, crumb.path)}>{crumb.name}</Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd graph={breadcrumbGraph(trail, lang)} />
    </>
  );
}
