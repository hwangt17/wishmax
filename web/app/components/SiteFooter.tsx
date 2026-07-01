/*
 * SiteFooter — global footer shared across every page (US-002).
 *
 * Brand + tagline on the left, secondary link columns (Product / Company /
 * Social) on the right, and a legal strip below. Placeholder hrefs ("#…") are
 * intentional pre-launch — the privacy/terms/contact copy and social handles
 * are owned externally (see progress.txt Open Questions). Server component
 * (no interactivity). All styling is token-driven via ./chrome.css.
 */

type FooterLink = { href: string; label: string; external?: boolean };

const LINK_COLUMNS: { heading: string; links: FooterLink[] }[] = [
  {
    heading: "Product",
    links: [
      { href: "#how-it-works", label: "How it works" },
      { href: "#examples", label: "Examples" },
      { href: "#faq", label: "FAQ" },
      { href: "#waitlist", label: "Get my photos" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "mailto:hello@wishmax.app", label: "Contact" },
    ],
  },
  {
    heading: "Social",
    links: [
      { href: "https://instagram.com", label: "Instagram", external: true },
      { href: "https://tiktok.com", label: "TikTok", external: true },
      { href: "https://x.com", label: "X", external: true },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="wm-footer">
      <div className="wm-footer__inner">
        <div className="wm-footer__brand">
          <span className="wm-wordmark">Wishmax</span>
          <p className="wm-footer__tagline">
            Pro dating photos from your own face — no photoshoot required.
          </p>
        </div>

        <div className="wm-footer__cols">
          {LINK_COLUMNS.map((col) => (
            <nav
              key={col.heading}
              className="wm-footer__col"
              aria-label={col.heading}
            >
              <h2 className="wm-footer__heading">{col.heading}</h2>
              <ul className="wm-footer__list">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="wm-footer__link"
                      {...(link.external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="wm-footer__legal">
        © 2026 Wishmax. All rights reserved.
      </div>
    </footer>
  );
}
