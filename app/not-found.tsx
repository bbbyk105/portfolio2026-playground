import Link from "next/link";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import PageHead from "@/components/PageHead";
import { C, T } from "@/components/Lang";
import { ui } from "@/lib/site";

export default function NotFound() {
  return (
    <main>
      <SiteNav />

      <PageHead
        variant="works"
        eyebrow="404 / NOT FOUND"
        lines={[{ text: "NOTHING" }, { text: "AT THIS URL.", faint: true }]}
        lede={
          <T
            en="The page you asked for does not exist — it may have moved, or the link may be wrong. The work is all still here."
            ja="お探しのページはありません。移動したか、リンクが間違っている可能性があります。実績は変わらずこちらにあります。"
          />
        }
      />

      <section className="nextWork">
        <Link className="nextLink" href="/works">
          <span className="nextLabel">
            <C value={ui.allWorks} />
          </span>
          <span className="nextName">WORKS</span>
          <span className="nextArrow">→</span>
        </Link>
        <Link className="allLink" href="/">
          HOME ↗
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
