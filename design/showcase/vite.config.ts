import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Showcase harness for the Wishmax design system.
// Tailwind v4 consumes design/tokens.css and design/fonts.css (see src/index.css);
// the @font-face url()s resolve to design/fonts/*, which lives in the parent
// design/ directory — above the Vite project root. `fs.allow: ['..']` (resolved
// relative to the project root) lets the dev server serve the self-hosted fonts.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5181,
    fs: { allow: ['..'] },
  },
})
