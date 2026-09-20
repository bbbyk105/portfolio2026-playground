"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { C } from "./Lang";
import { useLang } from "./LangProvider";
import { navItems, site, ui } from "@/lib/site";

/**
 * JA / EN switch. The active state is driven by `data-lang` in CSS rather than
 * React state, so it is already correct on the first paint — the inline script
 * in <head> has set the attribute long before hydration.
 */
function LangToggle({ onSwitch }: { onSwitch?: () => void }) {
  const { lang, setLang } = useLang();

  return (
    <div className="langToggle" role="group" aria-label="Language">
      <button
        type="button"
        className="langJa"
        aria-pressed={lang === "ja"}
        onClick={() => {
          setLang("ja");
          onSwitch?.();
        }}
      >
        JA
      </button>
      <span aria-hidden="true">/</span>
      <button
        type="button"
        className="langEn"
        aria-pressed={lang === "en"}
        onClick={() => {
          setLang("en");
          onSwitch?.();
        }}
      >
        EN
      </button>
    </div>
  );
}

/**
 * Site navigation and the GSAP hamburger menu.
 *
 * The motion is a single paused timeline that plays forward on open and
 * reverses on close, which keeps the panel and the burger strokes in sync
 * however fast the button is tapped.
 */
export default function SiteNav() {
  const root = useRef<HTMLDivElement>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const [open, setOpen] = useState(false);
  // Whether closing the menu should put the reader back where they were, and
  // whether the effect below has seen a real navigation yet — its first run is
  // the mount, which is not one.
  const restore = useRef(true);
  const navigated = useRef(false);
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
  //
  // `overflow: hidden` on the body does not hold it: the viewport scrolls the
  // document element here, so the body's value never reaches it — and iOS
  // ignores it for touch whichever element carries it. Taking the body out of
  // flow at its current offset is the one that holds everywhere; the offset
  // has to be put back by hand afterwards, because the page has moved to the
  // top underneath the panel while it was fixed.
  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const y = window.scrollY;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      Object.assign(body.style, previous);
      window.removeEventListener("keydown", onKey);
      // Closing the menu is not a journey, and `html` scrolls smoothly — so
      // put the reader back where they were rather than gliding them there.
      // Unless the menu closed because a link in it was followed, in which
      // case the new page's own scroll position is the right one to keep.
      if (restore.current) window.scrollTo({ top: y, behavior: "instant" });
      restore.current = true;
    };
  }, [open]);

  // A completed navigation always leaves the menu closed, and starts the next
  // page wherever the router put it rather than where this one was left.
  useEffect(() => {
    if (navigated.current) restore.current = false;
    navigated.current = true;
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div ref={root}>
      <nav className="nav">
        <Link className="brand" href="/">
          BYAKKO KONDO
        </Link>
        <div className="navlinks">
          {navItems
            .filter((item) => item.href !== "/")
            .map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "isActive" : undefined}>
                {item.label}
              </Link>
            ))}
          <LangToggle />
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
          <span>
            <C value={ui.navigation} />
          </span>
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
              <span className="mobileMenuLabel">
                {item.label}
                <b>
                  <C value={item.sub} />
                </b>
              </span>
            </Link>
          ))}
        </div>
        <div className="mobileMenuFoot">
          <LangToggle onSwitch={() => setOpen(false)} />
          <a href={`mailto:${site.email}`} tabIndex={open ? 0 : -1}>
            {site.email.toUpperCase()}
          </a>
        </div>
      </div>
    </div>
  );
}
