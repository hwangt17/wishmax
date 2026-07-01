import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Wishmax | Dating photos without a photoshoot",
  description:
    "Join the Wishmax waitlist. Turn your own face into profile-ready dating photos without booking a photographer.",
  openGraph: {
    title: "Wishmax | Dating photos without a photoshoot",
    description:
      "Turn your own face into profile-ready dating photos without booking a photographer.",
    type: "website",
    siteName: "Wishmax",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
