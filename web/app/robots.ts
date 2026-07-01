import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/*
 * robots.txt — served at /robots.txt by Next's file convention.
 * Fully crawlable marketing site; points crawlers at the sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
