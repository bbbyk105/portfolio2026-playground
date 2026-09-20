import type { NextConfig } from "next";

/**
 * Every route here is static — no API routes, no server actions, no
 * middleware — so the site exports to plain files and is served straight from
 * Cloudflare's edge, with no Node or Workers runtime in the request path.
 */
const nextConfig: NextConfig = {
  output: "export",
  // Cloudflare Pages resolves an extensionless path to its .html file, so the
  // URLs stay clean without a trailing slash.
  trailingSlash: false,
  images: { unoptimized: true },
};

export default nextConfig;
