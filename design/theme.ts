/*
 * Wishmax Design Tokens — React Native (typed mirror of design/tokens.css)
 *
 * SOURCE OF TRUTH: ../DESIGN.md. design/tokens.css is the web (CSS var) mirror;
 * this file mirrors the same values for React Native, which cannot read CSS vars.
 * Components must consume theme.* — never hardcode hex/px/font values.
 *
 * Intentional RN adaptations (documented in design/README.md):
 *  - Gradients are objects for expo-linear-gradient (CSS gradient strings can't be used).
 *  - Shadows are RN shadow props (iOS) + elevation (Android), not CSS box-shadow.
 *  - Type lineHeight is an absolute px number (CSS uses a unitless multiplier).
 *  - The 960px full-pill radius is kept as the finite number 960 (no CSS `9999px` idiom).
 */

export const theme = {
  color: {
    midnightInk: '#000000', pureCanvas: '#ffffff', graphite: '#333333',
    slate: '#666666', ash: '#999999', fog: '#b3b3b3', silver: '#cccccc',
    warmSand: '#d9c58b', partyPink: '#f8c4ff', skyPeriwinkle: '#96c4ff',
    spearmint: '#85dadc', midnightBlue: '#001666', hotPink: '#ff3d8b',
    matchGain: '#31c431',
    statusDone: '#31c431', statusProcessing: '#ffae00', statusFailed: '#ff0000',
  },
  font: { display: 'SpaceGrotesk', sans: 'Inter' },
  // Web fallback stacks live in tokens.css (--font-display / --font-sans);
  // RN uses the registered family names above with the system font as fallback.
  fontFallback: { display: 'System', sans: 'System' },
  text: {
    caption: { size: 11, lineHeight: 13, tracking: -0.22 },
    body: { size: 14, lineHeight: 20, tracking: -0.28 },
    headingSm: { size: 18, lineHeight: 25, tracking: -0.36 },
    heading: { size: 24, lineHeight: 29, tracking: -0.96 },
    headingLg: { size: 36, lineHeight: 43, tracking: -1.44 },
    display: { size: 48, lineHeight: 48, tracking: -0.96 },
    // Component text (badge / ghost button) — outside the core scale.
    label: { size: 12, lineHeight: 14, tracking: -0.24 },
    uiLg: { size: 16, lineHeight: 22, tracking: -0.32 },
  },
  weight: { regular: '400', medium: '500', w550: '550', semibold: '600', bold: '700', w825: '825' },
  spacing: { 4: 4, 6: 6, 8: 8, 10: 10, 12: 12, 16: 16, 20: 20, 24: 24, 30: 30, 40: 40, 60: 60, 80: 80, 100: 100, 120: 120, 160: 160 },
  radius: { navpills: 4, buttons: 8, inputs: 8, cards: 12, images: 12, modals: 16, badges: 960, full: 960 },
  // Gradients: surfaces/overlays only — never on interactive components.
  // RN has no CSS gradient; feed these to <LinearGradient> (expo-linear-gradient).
  gradient: {
    partyPink:     { colors: ['#f8c4ff', '#f0b6e0'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    skyPeriwinkle: { colors: ['rgba(150,196,255,0.1)', '#ffffff'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    spearmint:     { colors: ['#85dadc', '#c0e2e2'], locations: [0, 1], start: { x: 0, y: 0 }, end: { x: 1, y: 1 } }, // ~130deg
    // Photo scrim — Feed Photo Tile legibility overlay (top-down dark fade over photography).
    scrim:         { colors: ['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)'], locations: [0, 0.38], start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  },
  // Shadows: RN shadow props (iOS) + elevation (Android). Mirrors --shadow-sm / --shadow-lg.
  shadow: {
    sm: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 6,  shadowOffset: { width: 0, height: 0 }, elevation: 2 },
    lg: { shadowColor: '#000000', shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  },
  layout: { pageMaxWidth: 1200, sectionGap: 80, elementGap: 10 },
  // Surfaces: 0 canvas · 1 card (separated by shadow, not color) · 2 gradient wash · 3 overlay ink.
  // Ink tints: transparent black washes for chip containers & badge fills (not a new hue).
  surface: {
    canvas: '#ffffff', card: '#ffffff', gradientWash: '#96c4ff', overlayInk: '#000000',
    tintSoft: 'rgba(0,0,0,0.05)', tintStrong: 'rgba(0,0,0,0.2)',
  },
} as const

export type Theme = typeof theme
