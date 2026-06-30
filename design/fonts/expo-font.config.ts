/*
 * Wishmax brand fonts — React Native (Expo) registration config.
 *
 * DELIVERABLE FOR PRD-03 (the Expo app). PRD-01 only ships the assets + this
 * config; on-device runtime registration/rendering is verified in PRD-03.
 *
 * The font binaries live next to this file:
 *   design/fonts/inter/            InterVariable.ttf + Inter-{Regular,Medium,SemiBold,Bold,ExtraBold}.ttf
 *   design/fonts/space-grotesk/  SpaceGrotesk-Variable.ttf
 *
 * These map family names to assets for `expo-font`. The family names match the
 * tokens in ../theme.ts (`theme.font.sans === 'Inter'`,
 * `theme.font.display === 'SpaceGrotesk'`), so components keep
 * referencing tokens, never raw family strings.
 *
 * Two registration strategies are provided:
 *
 *  - VARIABLE (preferred, fewer assets): register the variable TTFs under the
 *    token family names and drive weight with `fontWeight`. iOS/New Architecture
 *    honour the weight axis well; older Android can be inconsistent.
 *  - STATIC (most portable): register one face per weight token. Use these if
 *    variable-weight rendering misbehaves on a target device. With static faces,
 *    select the weight by family name (e.g. `Inter-SemiBold`) rather than
 *    `fontWeight`.
 *
 * Licenses: ../fonts/LICENSE-Inter-OFL.txt (SIL OFL 1.1),
 *           ../fonts/LICENSE-SpaceGrotesk-OFL.txt (SIL OFL 1.1).
 */

// --- Strategy A: variable fonts (matches theme.font.* names directly) ---------
//
//   import { useFonts } from 'expo-font'
//   import { brandFontsVariable } from '@wishmax/design/fonts/expo-font.config'
//   const [loaded] = useFonts(brandFontsVariable)
//
// require() paths assume this config is bundled with the app; adjust the
// relative depth if you copy the fonts into the Expo project's assets/ dir.
export const brandFontsVariable = {
  // theme.font.sans
  Inter: require('./inter/InterVariable.ttf'),
  // theme.font.display
  SpaceGrotesk: require('./space-grotesk/SpaceGrotesk-Variable.ttf'),
} as const

// --- Strategy B: static weights (one face per weight token) -------------------
//
//   const [loaded] = useFonts(brandFontsStatic)
//
// Weight tokens (../DESIGN.md): 400 regular · 500 medium · 600 semibold ·
// 700 bold · 825 oversized numerals (mapped to ExtraBold, the nearest shipped
// static cut). Space Grotesk is registered from its OFL variable TTF under the
// display token family name.
export const brandFontsStatic = {
  'Inter-Regular': require('./inter/Inter-Regular.ttf'),
  'Inter-Medium': require('./inter/Inter-Medium.ttf'),
  'Inter-SemiBold': require('./inter/Inter-SemiBold.ttf'),
  'Inter-Bold': require('./inter/Inter-Bold.ttf'),
  'Inter-ExtraBold': require('./inter/Inter-ExtraBold.ttf'),
  SpaceGrotesk: require('./space-grotesk/SpaceGrotesk-Variable.ttf'),
} as const
