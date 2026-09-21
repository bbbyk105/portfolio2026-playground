import Link from "next/link";
import BackToTop from "./BackToTop";
import { C, T } from "./Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { navItems, site } from "@/lib/site";

/**
 * The footer every page ends the same way with.
 *
 * It carries the nav a second time on purpose: a reader who has got to the
 * bottom of a case study has nothing above them but 4,000 words, and a
 * crawler that arrives on a deep page needs a route back to the rest of the
 * site that does not depend on the header's JavaScript menu.
 *
 * Each link says where it goes in words — "WORKS 実績", not "WORKS" — so the
 * anchor text means something on its own.
 */
export default function SiteFooter({ lang }: { lang: Lang }) {
  return (
    <footer>
      <nav className="footerNav" aria-label={lang === "ja" ? "サイト内のページ" : "Site sections"}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={localeHref(lang, item.href)}>
                {item.label}
                <i>
                  <C lang={lang} value={item.sub} />
                </i>
              </Link>
            </li>
          ))}
          <li>
            <a href={site.github} target="_blank" rel="noreferrer">
              GITHUB
              <i>
                <T lang={lang} en="Source and side projects" ja="ソースと個人開発" />
              </i>
            </a>
          </li>
        </ul>
      </nav>

      <div className="footerMeta">
        <b>{site.name}</b>
        <span>
          <C lang={lang} value={site.role} />
        </span>
        <span>
          <C lang={lang} value={site.place} /> — {site.year}
        </span>
        <BackToTop lang={lang} inline />
      </div>
    </footer>
  );
}
