import { brands } from "@/lib/brand";
import { tickerTech } from "@/lib/site";

/**
 * The technology marquee: each tool's official mark in its official colour,
 * drawn straight onto the band. The band is dark for that reason — on the
 * Tiffany fill the marks needed a plate behind them to stay legible, and the
 * plates read as stickers stuck on top of the strip.
 *
 * The row is duplicated because the CSS animation translates it by -50%.
 */
export default function Ticker() {
  return (
    <div className="ticker">
      <div>
        {[...tickerTech, ...tickerTech].map((name, i) => {
          const brand = brands[name];
          return (
            <span key={i}>
              {brand ? (
                <svg
                  className="brandMark"
                  viewBox="0 0 24 24"
                  fill={`#${brand.hex}`}
                  fillRule="evenodd"
                  aria-hidden="true"
                  role="presentation"
                >
                  <path d={brand.path} />
                </svg>
              ) : null}
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}
