"use client";

/*
 * SiteHeader — sticky top nav shared across every page (US-002).
 *
 * Wordmark on the left; on the right a desktop link row + primary CTA that
 * collapses to a hamburger-toggled menu on mobile. Client component because
 * the mobile menu toggles open/closed and closes on link/route change. All
 * styling is token-driven via ./chrome.css (.wm-header / .wm-nav / .wm-btn).
 */
import { useState } from "react";
import { CtaLink } from "./CtaLink";

/** Nav targets anchor the sections built in later PRD-02 stories. */
const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#examples", label: "Examples" },
  { href: "#faq", label: "FAQ" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="wm-header">
      <div className="wm-header__bar">
        <a href="#top" className="wm-wordmark" onClick={closeMenu}>
          Wishmax
        </a>

        {/* Desktop nav — hidden on mobile via CSS. */}
        <nav className="wm-nav" aria-label="Primary">
          <ul className="wm-nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="wm-nav__link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink location="header" />
        </nav>

        {/* Mobile hamburger — hidden on desktop via CSS. */}
        <button
          type="button"
          className="wm-nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="wm-mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon open={menuOpen} />
        </button>
      </div>

      {menuOpen && (
        <nav
          id="wm-mobile-menu"
          className="wm-mobile-menu"
          aria-label="Primary mobile"
        >
          <ul className="wm-mobile-menu__links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="wm-nav__link"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <CtaLink location="mobile-menu" onClick={closeMenu} />
        </nav>
      )}
    </header>
  );
}

/** Mono-weight ink icon (hamburger ↔ close), sized to the token grid. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      {open ? (
        <>
          <line x1="4" y1="4" x2="16" y2="16" />
          <line x1="16" y1="4" x2="4" y2="16" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="17" y2="6" />
          <line x1="3" y1="10" x2="17" y2="10" />
          <line x1="3" y1="14" x2="17" y2="14" />
        </>
      )}
    </svg>
  );
}
