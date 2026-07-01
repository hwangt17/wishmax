"use client";

/*
 * FAQ section (US-009) — an accessible accordion that answers the objections a
 * visitor has right before converting: is it really my face, what happens to my
 * photos, how long it takes, what platforms it runs on, and cost / cancellation.
 *
 * Accessibility follows the WAI-ARIA accordion pattern: each question is an
 * <h3><button aria-expanded aria-controls> and each answer is a labelled region
 * that is `hidden` while collapsed (so it leaves the tab order and is skipped by
 * screen readers). Native <button>s make it keyboard-operable for free (Tab to
 * move, Enter/Space to toggle). Client component because the open/closed state
 * lives in React (multiple items may be open independently).
 *
 * Token-only: every color/size/space/radius/shadow comes from var(--…) via
 * ./faq.css and the ported Badge — no visual literals here. Section sits on the
 * white canvas for rhythm against the SocialProof periwinkle wash above it.
 */
import { useId, useState } from "react";
import { Badge } from "./Badge";

interface FaqItem {
  q: string;
  /** Answer paragraphs — brand-voice, confident, honest pre-launch where needed. */
  a: string[];
}

const FAQS: FaqItem[] = [
  {
    q: "Is it really my face?",
    a: [
      "Yes. Wishmax takes your actual face from the selfies you upload and places it into curated, professional-looking template shots — it isn't a random model or a generic AI stranger. The person in every result is unmistakably you, just lit, styled, and framed like you booked a real photoshoot.",
    ],
  },
  {
    q: "What happens to my photos and data?",
    a: [
      "Your selfies belong to you. They're used only to generate the photos you ask for, never sold or handed to advertisers, and you can delete them from your account whenever you want.",
      "Full privacy and data-handling terms are published before launch so you know exactly how your images are stored and processed.",
    ],
  },
  {
    q: "How long does it take?",
    a: [
      "Minutes, not days. Upload a few selfies, pick the looks you love, and your profile-ready shots come back in one short session — no scheduling, no waiting on a photographer's turnaround.",
    ],
  },
  {
    q: "What platforms is Wishmax on?",
    a: [
      "Wishmax is built for iPhone and Android. We're launching on iOS first, with Android close behind — join the waitlist and we'll let you know the moment your platform is ready.",
    ],
  },
  {
    q: "What does it cost, and can I cancel?",
    a: [
      "Pricing lands at launch and will be far less than a traditional photoshoot. There's no lock-in — you stay in control and can cancel anytime, no awkward hoops.",
      "Join the waitlist to get early-access pricing and be first in line when doors open.",
    ],
  },
];

export function Faq() {
  // Track which questions are open by index — items open independently.
  const [openSet, setOpenSet] = useState<ReadonlySet<number>>(new Set());
  const baseId = useId();

  const toggle = (index: number) =>
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

  return (
    <section id="faq" className="wm-faq" aria-labelledby="wm-faq-title">
      <div className="wm-faq__inner">
        <header className="wm-faq__head">
          <span className="wm-faq__eyebrow">
            <Badge>FAQ</Badge>
          </span>
          <h2 id="wm-faq-title" className="wm-faq__title">
            Everything you&rsquo;re wondering, answered.
          </h2>
          <p className="wm-faq__lede">
            The quick version before you sign up &mdash; what Wishmax does with
            your face, your photos, and your money.
          </p>
        </header>

        <ul className="wm-faq__list">
          {FAQS.map((item, index) => {
            const open = openSet.has(index);
            const buttonId = `${baseId}-q-${index}`;
            const panelId = `${baseId}-a-${index}`;
            return (
              <li key={item.q} className="wm-faq__item">
                <h3 className="wm-faq__q">
                  <button
                    type="button"
                    id={buttonId}
                    className="wm-faq__trigger"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                  >
                    <span className="wm-faq__q-text">{item.q}</span>
                    <ChevronIcon open={open} />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="wm-faq__panel"
                  hidden={!open}
                >
                  {item.a.map((para, i) => (
                    <p key={i} className="wm-faq__a">
                      {para}
                    </p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** Filled mono-weight ink chevron; rotates to point up when the item is open. */
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`wm-faq__chevron${open ? " wm-faq__chevron--open" : ""}`}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M12 15.5 4.5 8l1.4-1.4L12 12.7l6.1-6.1L19.5 8 12 15.5z" />
    </svg>
  );
}
