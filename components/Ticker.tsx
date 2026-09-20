import { brands } from "@/lib/brand";
import { tech } from "@/lib/site";

/**
 * The technology marquee. Each entry carries its official brand mark in its
 * official colour, set on a white disc — the band itself is Tiffany, and
 * several of the brand colours (React, Supabase, FastAPI, GSAP) would sink
 * straight into it otherwise.
 *
 * The row is duplicated because the CSS animation translates it by -50%.
 */
export default function Ticker() {
  return (
    <div className="ticker">
      <div>
        {[...tech, ...tech].map((name, i) => {
          const brand = brands[name];
          return (
            <span key={i}>
              {brand ? (
                <i className="brandBadge" style={{ color: `#${brand.hex}` }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" role="presentation">
                    <path d={brand.path} />
                  </svg>
                </i>
              ) : null}
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
