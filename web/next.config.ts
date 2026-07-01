import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Repo root is one level up from web/. Setting the Turbopack root to the repo
// root lets app/globals.css @import the shared design tokens + fonts that live
// in ../design/ (the single source of truth) without leaving the resolver root.
const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

const nextConfig: NextConfig = {
  turbopack: {
    root: repoRoot,
  },
  images: {
    // Serve modern formats — next/image negotiates AVIF (smallest), then WebP,
    // then the original JPG. Cuts the transformation/gallery/avatar payloads
    // (the bulk of the page weight) well below the source JPGs for a better LCP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
