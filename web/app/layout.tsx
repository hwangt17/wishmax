import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wishmax — Pro dating photos from your own face",
  description:
    "Your photos are costing you matches. Wishmax turns a few selfies into profile-ready, professional dating photos — no photoshoot required.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
