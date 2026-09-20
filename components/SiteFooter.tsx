import Link from "next/link";
import { site } from "@/lib/site";

/** The footer the homepage already uses, shared so every page ends the same way. */
export default function SiteFooter() {
  return (
    <footer>
      <b>{site.name}</b>
      <span>{site.role}</span>
      <span>
        {site.place} — {site.year}
      </span>
      <Link href="#">BACK TO TOP ↑</Link>
    </footer>
  );
}
