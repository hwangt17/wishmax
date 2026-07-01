/*
 * Landing page shell (US-001 scaffold).
 *
 * A tokenized white-canvas page proving the design system is wired end to end:
 * Space Grotesk display headline, Inter body, black-on-white action system,
 * token-driven spacing/radius. The real marketing sections (nav, hero,
 * how-it-works, gallery, …) land in the later PRD-02 user stories. Every
 * visual value below is a design token (var(--…)) — nothing is hardcoded.
 */
export default function Home() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        maxWidth: "var(--page-max-width)",
        margin: "0 auto",
        padding: "var(--spacing-40) var(--spacing-24)",
        gap: "var(--spacing-24)",
      }}
    >
      <p
        style={{
          fontSize: "var(--text-label)",
          lineHeight: "var(--leading-label)",
          fontWeight: "var(--font-weight-bold)",
          textTransform: "uppercase",
          color: "var(--color-slate)",
          margin: 0,
        }}
      >
        Wishmax
      </p>

      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-display)",
          lineHeight: "var(--leading-display)",
          letterSpacing: "var(--tracking-display)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-midnight-ink)",
          margin: 0,
          maxWidth: "20ch",
        }}
      >
        Anything you wish for, just by changing your profile photo.
      </h1>

      <p
        style={{
          fontSize: "var(--text-heading-sm)",
          lineHeight: "var(--leading-heading-sm)",
          letterSpacing: "var(--tracking-heading-sm)",
          color: "var(--color-slate)",
          margin: 0,
          maxWidth: "48ch",
        }}
      >
        Your photos are costing you matches. Wishmax turns a few selfies into
        pro dating photos from your own face — no photoshoot required.
      </p>

      <div>
        <a
          href="#waitlist"
          style={{
            display: "inline-block",
            background: "var(--color-midnight-ink)",
            color: "var(--color-pure-canvas)",
            fontWeight: "var(--font-weight-bold)",
            letterSpacing: "var(--tracking-body)",
            borderRadius: "var(--radius-buttons)",
            padding: "var(--spacing-10) var(--spacing-24)",
            textDecoration: "none",
          }}
        >
          Get my photos
        </a>
      </div>
    </main>
  );
}
