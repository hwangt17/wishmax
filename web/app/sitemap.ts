import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/*
 * sitemap.xml — served at /sitemap.xml by Next's file convention.
 * Single-page marketing site today; add entries here as routes are added.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
