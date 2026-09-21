import { ogAlt, ogSize, renderOgCard } from "@/lib/og";

// output: export has no request to render on, so the card is baked at build time.
export const dynamic = "force-static";
export const alt = ogAlt;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard();
}
