import { appleSize, renderAppleIcon } from "@/lib/og";

/** iOS home-screen icon. Apple will not take the SVG favicon, so this is a PNG. */
export const dynamic = "force-static";
export const size = appleSize;
export const contentType = "image/png";

export default function AppleIcon() {
  return renderAppleIcon();
}
