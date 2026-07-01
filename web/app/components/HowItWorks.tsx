/*
 * "How it works" section (US-004) — three tight steps that prove Wishmax is
 * fast and effortless, so a visitor trusts they can get a result quickly.
 *
 * Each step is a Standard Content Card (white surface, --shadow-sm, radius) with
 * a mono-weight filled icon, a numbered Badge, an Inter-700 title and ONE tight
 * sentence. Max two type sizes of free text per card (title + body); the number
 * rides on the Badge component. Section sits on the white canvas for rhythm
 * against the hero's periwinkle wash.
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./howitworks.css and the ported Badge. Icons are filled mono shapes drawn with
 * currentColor (ink), per DESIGN.md imagery rules — no visual literals here.
 */
import type { ReactNode } from "react";
import { Badge } from "./Badge";

interface Step {
  title: string;
  copy: string;
  icon: ReactNode;
}

/* Filled mono-weight icons (currentColor = ink), 20px, per DESIGN.md. */
const UploadIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 3l4.5 4.5h-3v5h-3v-5h-3L12 3z" />
    <path d="M5 14h2v3h10v-3h2v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-4z" />
  </svg>
);

const HeartIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 20s-7-4.35-9.33-8.36C1.1 8.87 2.28 5.5 5.5 5.5c1.9 0 3.2 1.05 4.5 2.7 1.3-1.65 2.6-2.7 4.5-2.7 3.22 0 4.4 3.37 2.83 6.14C19 15.65 12 20 12 20z" />
  </svg>
);

const SparkleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2z" />
    <path d="M18.5 14l.9 2.6 2.6.9-2.6.9-.9 2.6-.9-2.6-2.6-.9 2.6-.9.9-2.6z" />
  </svg>
);

const STEPS: Step[] = [
  {
    title: "Upload a few selfies",
    copy: "Snap or pick a handful of everyday selfies from your phone — no photographer, no studio, no plans to cancel.",
    icon: UploadIcon,
  },
  {
    title: "Pick photos you love",
    copy: "Browse the feed of curated, profile-worthy looks and tap the vibes you want your face in — travel, gym, night-out, professional.",
    icon: HeartIcon,
  },
  {
    title: "Get profile-ready shots",
    copy: "Wishmax puts your own face into the looks you picked and hands back pro dating photos, ready to post and pull more matches.",
    icon: SparkleIcon,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="wm-how"
      aria-labelledby="wm-how-title"
    >
      <div className="wm-how__inner">
        <header className="wm-how__head">
          <span className="wm-how__eyebrow">
            <Badge>How it works</Badge>
          </span>
          <h2 id="wm-how-title" className="wm-how__title">
            From selfies to profile-ready in three steps.
          </h2>
          <p className="wm-how__lede">
            No photoshoot, no waiting weeks. Most of the work is picking the
            looks you like.
          </p>
        </header>

        <ol className="wm-how__grid">
          {STEPS.map((step, i) => (
            <li key={step.title} className="wm-how__card">
              <span className="wm-how__icon" aria-hidden="true">
                {step.icon}
              </span>
              <span className="wm-how__step">
                <Badge>Step {i + 1}</Badge>
              </span>
              <h3 className="wm-how__card-title">{step.title}</h3>
              <p className="wm-how__card-copy">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
