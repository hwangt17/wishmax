/*
 * Benefits / pain-point section (US-006) — the value spelled out against the
 * visitor's real frustrations so they feel understood.
 *
 * Each card maps ONE concrete, named pain point (bad lighting, no good photos,
 * expensive photographers, low matches) to a confident Wishmax outcome. The
 * pain is called out as a strong ink-tint Badge; the outcome is the Inter-700
 * card title with one tight sentence of proof copy in the PRD-01 brand voice —
 * two free-text sizes per card (title + body), the pain rides on the Badge.
 *
 * Reuses the established section header pattern (eyebrow Badge + Inter-700 title
 * + slate lede) and the HowItWorks icon-chip pattern (filled mono-weight icons,
 * currentColor = ink, 20px). Section sits on the white canvas for rhythm against
 * the Gallery's periwinkle wash above it.
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./benefits.css and the ported Badge — no visual literals here.
 */
import type { ReactNode } from "react";
import { Badge } from "./Badge";

interface Benefit {
  /** The concrete frustration this benefit answers — one named pain point. */
  pain: string;
  /** The Wishmax outcome (card title). */
  title: string;
  copy: string;
  icon: ReactNode;
}

/* Filled mono-weight icons (currentColor = ink), 20px, per DESIGN.md imagery. */
const SunIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
    <path d="M12 1h0l1 3h-2l1-3zm0 19l1 3h-2l1-3zM4.2 4.2l2.6 1.5-1.4 1.4L4.2 4.2zm13 13l2.6 1.5-1.1 1.1-1.5-2.6zM1 12l3-1v2l-3-1zm19 0l3-1v2l-3-1zM4.2 19.8l1.5-2.6 1.4 1.4-2.9 1.2zm13-13l1.5-2.6 1.1 1.1-2.6 1.5z" />
  </svg>
);

const GalleryIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M4 4h13a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zm1.2 11.8h10.6l-3.3-4.3-2.6 3.1-1.6-1.8-3.1 3z" />
    <path d="M20 7h1v11a2 2 0 0 1-2 2H7v-1h12a1 1 0 0 0 1-1V7z" />
  </svg>
);

const TagIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M3 3h8l10 10-8 8L3 11V3zm4.5 2.5a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
  </svg>
);

const HeartIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
    <path d="M12 20s-7-4.35-9.33-8.36C1.1 8.87 2.28 5.5 5.5 5.5c1.9 0 3.2 1.05 4.5 2.7 1.3-1.65 2.6-2.7 4.5-2.7 3.22 0 4.4 3.37 2.83 6.14C19 15.65 12 20 12 20z" />
  </svg>
);

const BENEFITS: Benefit[] = [
  {
    pain: "Bad lighting",
    title: "Studio-grade light on every shot",
    copy: "Your bedroom ceiling light is doing you no favors. Every Wishmax photo lands with flattering, professional lighting — no window-chasing, no golden-hour scramble.",
    icon: SunIcon,
  },
  {
    pain: "No good photos",
    title: "A full lineup of scroll-stopping shots",
    copy: "Zero photos that actually look like a catch? Get a whole set of profile-ready looks in one go, so you never have to recycle the same tired selfie again.",
    icon: GalleryIcon,
  },
  {
    pain: "Expensive photographers",
    title: "Pro results without the pro price tag",
    copy: "A real photoshoot costs hundreds and a whole Saturday. Skip the photographer and the awkward posing — Wishmax delivers the same polish from selfies you already have.",
    icon: TagIcon,
  },
  {
    pain: "Low matches",
    title: "Photos that pull more right-swipes",
    copy: "Your matches have flatlined. Better photos are the highest-leverage upgrade to your profile — put your best face forward and watch the right-swipes climb.",
    icon: HeartIcon,
  },
];

export function Benefits() {
  return (
    <section id="benefits" className="wm-benefits" aria-labelledby="wm-benefits-title">
      <div className="wm-benefits__inner">
        <header className="wm-benefits__head">
          <span className="wm-benefits__eyebrow">
            <Badge>Why Wishmax</Badge>
          </span>
          <h2 id="wm-benefits-title" className="wm-benefits__title">
            The reasons your photos aren&rsquo;t working &mdash; solved.
          </h2>
          <p className="wm-benefits__lede">
            You already know what&rsquo;s holding your profile back. Here&rsquo;s
            what changes the moment your face lands in a Wishmax shot.
          </p>
        </header>

        <ul className="wm-benefits__grid">
          {BENEFITS.map((benefit) => (
            <li key={benefit.pain} className="wm-benefits__card">
              <span className="wm-benefits__icon" aria-hidden="true">
                {benefit.icon}
              </span>
              <span className="wm-benefits__pain">
                <Badge tone="strong">{benefit.pain}</Badge>
              </span>
              <h3 className="wm-benefits__card-title">{benefit.title}</h3>
              <p className="wm-benefits__card-copy">{benefit.copy}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
