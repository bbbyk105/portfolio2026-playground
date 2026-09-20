"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { navItems, site } from "@/lib/site";

/**
 * Site navigation and the GSAP hamburger menu.
 *
 * The markup and class names are the ones the homepage already ships, so the
 * bar and the full-bleed panel keep their existing look. The motion is a
 * single paused timeline that plays forward on open and reverses on close,
 * which keeps the panel and the burger strokes in sync however fast the
 * button is tapped.
 */
export default function SiteNav() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const d = (value: number) => (reduced ? 0.001 : value);

      timeline.current = gsap
        .timeline({ paused: true })
        .set(".mobileMenu", { pointerEvents: "auto" })
        .fromTo(
          ".mobileMenu",
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: d(0.64), ease: "power4.inOut" },
          0
        )
        .fromTo(
          ".mobileMenuLink",
          { y: 34, opacity: 0 },
          { y: 0, opacity: 1, duration: d(0.62), ease: "power3.out", stagger: reduced ? 0 : 0.055 },
          reduced ? 0 : 0.16
        )
        .fromTo(
          [".mobileMenuMeta", ".mobileMenuFoot"],
          { opacity: 0 },
          { opacity: 1, duration: d(0.45), ease: "power2.out", stagger: reduced ? 0 : 0.08 },
          reduced ? 0 : 0.3
        )
        .to(".menuBtn span:first-child", { y: 3, rotate: 45, duration: d(0.4), ease: "power3.inOut" }, 0)
        .to(".menuBtn span:nth-child(2)", { y: -3, rotate: -45, duration: d(0.4), ease: "power3.inOut" }, 0);

      gsap.set(".mobileMenu", { pointerEvents: "none" });

      return () => {
        timeline.current = null;
      };
    },
    { scope: root }
  );

  // Play forward / reverse rather than rebuilding the tween on every toggle.
  useEffect(() => {
    const t = timeline.current;
    if (!t) return;
    if (open) t.play();
    else t.reverse();
  }, [open]);

  // Lock the page behind the panel and close it on Escape.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // A completed navigation always leaves the menu closed.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div ref={root}>
      <nav className="nav">
        <Link className="brand" href="/">
          BK<span>.</span>
        </Link>
        <div className="navlinks">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "isActive" : undefined}>
                {item.label}
              </Link>
            ))}
        </div>
        <button
          type="button"
          className={"menuBtn " + (open ? "isOpen" : "")}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          <span />
          <span />
          <b>{open ? "CLOSE" : "MENU"}</b>
        </button>
      </nav>

      <div className="mobileMenu" id="site-menu" aria-hidden={!open}>
        <div className="mobileMenuMeta">
          <span>NAVIGATION</span>
          <span>
            {site.name} / {site.year}
          </span>
        </div>
        <div className="mobileMenuNav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className={"mobileMenuLink " + (isActive(item.href) ? "isActive" : "")}
              href={item.href}
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
            >
              <small>{item.index}</small>
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mobileMenuFoot">
          <span>{site.place}</span>
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
            {site.email.toUpperCase()}
          </a>
        </div>
      </div>
    </div>
  );
}
