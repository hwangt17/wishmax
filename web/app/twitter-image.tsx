/*
 * Twitter/X share card. Re-exports the Open Graph renderer so the OG and Twitter
 * cards render identically from one source (summary_large_image sizing, 1200×630).
 */
export { default, alt, size, contentType } from "./opengraph-image";
