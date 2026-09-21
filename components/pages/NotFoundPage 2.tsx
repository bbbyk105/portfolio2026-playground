import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import NotFoundTerminal from "@/components/NotFoundTerminal";
import { C, T } from "@/components/Lang";
import { localeHref, type Lang } from "@/lib/i18n";
import { ui } from "@/lib/site";

/**
 * What a visitor sees at a URL that does not exist. The route that renders
 * it, and the noindex, live in app/not-found.tsx.
 *
 * It says 404 three times over, in the three registers the site already
 * speaks: the number at display size, the status in the masthead's meta
 * column, and the failed request echoed in the terminal — which also lists
 * the directories that do exist, so the page is a way out rather than a
 * dead end.
 */
export default function NotFoundPage({ lang }: { lang: Lang }) {
  const to = (path: string) => localeHref(lang, path);
  return (
    <main>
      <SiteNav lang={lang} langPath="" />

      <PageHead
        lang={lang}
        variant="works"
        eyebrow={<T lang={lang} en="ERROR 404 / PAGE NOT FOUND" ja="ERROR 404 / ページが見つかりません" />}
        lines={[{ text: "404" }, { text: "NOT FOUND.", faint: true }]}
        lede={
          <T
            lang={lang}
            en="There is nothing at this URL. The address may have changed, or it may have been mistyped — the work is all still here."
            ja="このURLにページはありません。アドレスが変わったか、入力が違っている可能性があります。実績は変わらずこちらにあります。"
          />
        }
        meta={
          <>
            HTTP 404
            <br />
            NOT FOUND
          </>
        }
      >
        <NotFoundTerminal lang={lang} />
      </PageHead>

      <section className="nextWork">
        <Link className="nextLink" href={to("/works")}>
          <span className="nextLabel">
            <C lang={lang} value={ui.allWorks} />
          </span>
          <span className="nextName">WORKS</span>
          <span className="nextArrow">→</span>
        </Link>
        <Link className="allLink" href={to("")}>
          HOME ↗
        </Link>
      </section>

      <SiteFooter lang={lang} />
    </main>
  );
}
