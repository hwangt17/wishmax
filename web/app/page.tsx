/*
 * Landing page (marketing site).
 *
 * The global chrome (SiteHeader / SiteFooter) is rendered by the root layout;
 * this file composes the marketing sections. US-003 adds the Hero (hook +
 * before/after proof); the remaining sections (how-it-works, gallery, benefits,
 * social proof, FAQ, waitlist) land in the later PRD-02 user stories.
 */
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
    </main>
  );
}
