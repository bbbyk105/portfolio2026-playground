import { ImageResponse } from "next/og";

/**
 * The share card and the home-screen icon, rendered once at build time and
 * written into the export — there is no server here to make them on request.
 *
 * Latin type only: the runtime falls back to its own bundled font, which has
 * no Japanese glyphs, and a card of tofu boxes is worse than an English one.
 * Both language trees publish the same card for that reason.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "Byakko Kondo — Engineer / Creative Developer";
export const appleSize = { width: 180, height: 180 };

export function renderOgCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080b0c",
          color: "#f2f5f4",
          padding: "72px 76px",
          border: "1px solid #ffffff1e",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 2, color: "#77827f" }}>
          <span>BYAKKO KONDO</span>
          <span>TOKYO, JAPAN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>BUILDING</div>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -5, lineHeight: 1, color: "#70f4df" }}>
            DIGITAL SYSTEMS
          </div>
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>THAT SHIP.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #ffffff24",
            paddingTop: 26,
            fontSize: 24,
            letterSpacing: 1,
            color: "#aab3b1",
          }}
        >
          <span>Engineer / Creative Developer</span>
          <span style={{ color: "#70f4df" }}>byakko-engineer.com</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}

export function renderAppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#080b0c",
          color: "#f2f5f4",
          fontSize: 86,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        <span>B</span>
        <span style={{ color: "#70f4df" }}>K</span>
      </div>
    ),
    { ...appleSize }
  );
}
