/*
 * Landing page (marketing site) — a lean, focused waitlist page.
 *
 * The global chrome (SiteHeader / SiteFooter) is rendered by the root layout;
 * this file composes the marketing sections. Deliberately short: a hero with
 * inline email capture, a proof strip of example results, and the closing
 * waitlist CTA.
 */
import { Hero } from "./components/Hero";
import { Gallery } from "./components/Gallery";
import { Waitlist } from "./components/Waitlist";

export default function Home() {
  return (
    <main>
      <Hero />
      <Gallery />
      <Waitlist />
    </main>
  );
}
