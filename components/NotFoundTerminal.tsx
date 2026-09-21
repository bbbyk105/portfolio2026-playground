"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T } from "./Lang";
import { localeHref, type Lang } from "@/lib/i18n";

/**
 * The 404 said in the site's own voice — the same terminal the home page
 * opens with, reporting the request that missed.
 *
 * The path has to be read on the client: the export is one 404.html served
 * for every URL that does not exist, so the server never knows which one was
 * asked for. Until it hydrates the line shows the status alone, which is
 * true at any address.
 */
export default function NotFoundTerminal({ lang }: { lang: Lang }) {
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(window.location.pathname + window.location.search);
  }, []);

  const to = (p: string) => localeHref(lang, p);

  return (
    <div className="terminal terminalLeft">
      <div className="termbar">
        <span>~/byakko/portfolio</span>
        <span>404</span>
      </div>
      <pre>
        <span className="cyan">$</span> GET {path || "…"}
        {"\n"}
        <span className="red">HTTP/2 404</span> <span className="muted">— Not Found</span>
        {"\n\n"}
        <span className="cyan">$</span> ls{"\n"}
        <Link href={to("/works")}>works/</Link>
        {"   "}
        <Link href={to("/about")}>about/</Link>
        {"   "}
        <Link href={to("/contact")}>contact/</Link>
        {"\n\n"}
        <span className="cyan">$</span>{" "}
        <T lang={lang} en="cd ~" ja="cd ~" />
        <span className="cursor">▋</span>
      </pre>
    </div>
  );
}
