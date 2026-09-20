import BackToTop from "./BackToTop";
import { C } from "./Lang";
import { site } from "@/lib/site";

/** The footer the homepage already uses, shared so every page ends the same way. */
export default function SiteFooter() {
  return (
    <footer>
      <b>{site.name}</b>
      <span>
        <C value={site.role} />
      </span>
      <span>
        <C value={site.place} /> — {site.year}
      </span>
      <BackToTop inline />
    </footer>
  );
}
