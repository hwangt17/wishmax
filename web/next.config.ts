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
};

export default nextConfig;
