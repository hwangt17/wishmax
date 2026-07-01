"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { Check, Copy, Instagram, MessageCircle, Music2 } from "lucide-react"

const DEFAULT_COLS = 12
const PLACEHOLDER_TILES = 84

function getColumnCount() {
  if (typeof window === "undefined") return DEFAULT_COLS
  if (window.innerWidth < 640) return 6
  if (window.innerWidth < 1024) return 8
  return DEFAULT_COLS
}

export function WishmaxLanding() {
  const [email, setEmail] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [waitlistPosition, setWaitlistPosition] = useState<number | null>(null)
  const [totalCount, setTotalCount] = useState<number | null>(null)
  const [isExistingUser, setIsExistingUser] = useState(false)
  const [displayCount, setDisplayCount] = useState(0)
  const [hasLoadedCount, setHasLoadedCount] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)
  const [colsCount, setColsCount] = useState(DEFAULT_COLS)
  const [layoutVersion, setLayoutVersion] = useState(0)

  const countRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const warmupRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const animateCount = useCallback((nextCount: number) => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current)
    if (warmupRef.current) clearInterval(warmupRef.current)

    const start = countRef.current
    const target = Math.max(0, nextCount)
    const startedAt = performance.now()
    const duration = 820

    setHasLoadedCount(true)

    const tick = (now: number) => {
      const t = Math.min(1, (now - startedAt) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.round(start + (target - start) * eased)
      countRef.current = value
      setDisplayCount(value)

      if (t < 1) {
        animationRef.current = requestAnimationFrame(tick)
      } else {
        countRef.current = target
        setDisplayCount(target)
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => {
    if (hasLoadedCount) return

    warmupRef.current = setInterval(() => {
      countRef.current += Math.max(3, Math.floor(Math.random() * 15))
      setDisplayCount(countRef.current)
    }, 55)

    return () => {
      if (warmupRef.current) clearInterval(warmupRef.current)
    }
  }, [hasLoadedCount])

  useEffect(() => {
    const loadCount = async () => {
      try {
        const response = await fetch("/api/waitlist")
        const json = await response.json()
        if (typeof json.count === "number") animateCount(json.count)
      } catch {
        animateCount(1847)
      }
    }

    loadCount()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (warmupRef.current) clearInterval(warmupRef.current)
    }
  }, [animateCount])

  useEffect(() => {
    const apply = () => {
      const next = getColumnCount()
      setColsCount((current) => {
        if (current !== next) setLayoutVersion((version) => version + 1)
        return next
      })
    }

    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [])

  const columns = useMemo(() => {
    const cols: number[][] = Array.from({ length: colsCount }, () => [])
    for (let index = 0; index < PLACEHOLDER_TILES; index += 1) {
      cols[index % colsCount].push(index)
    }
    return cols
  }, [colsCount])

  const referralLink = useMemo(() => {
    if (typeof window === "undefined") return "Loading..."
    return `${window.location.origin}/`
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please include a valid email address.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      })
      const json = await response.json()
      if (!response.ok) throw new Error(json?.error || "Could not join the waitlist.")

      setWaitlistPosition(typeof json.position === "number" ? json.position : null)
      setTotalCount(typeof json.totalCount === "number" ? json.totalCount : null)
      setIsExistingUser(Boolean(json.already))
      if (typeof json.totalCount === "number") animateCount(json.totalCount)
      setSubmitted(true)
      setShowSuccess(true)
      setTimeout(() => setSubmitted(false), 1000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not join the waitlist.")
    } finally {
      setSubmitting(false)
    }
  }

  const copyReferralLink = async () => {
    await navigator.clipboard.writeText(referralLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  return (
    <main className="landing-shell">
      <div className="collage-stage" aria-hidden="true">
        <div
          key={layoutVersion}
          className="collage-grid"
          style={{ gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))` }}
        >
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="collage-column">
              <div className={columnIndex % 2 === 0 ? "marquee marquee-down" : "marquee marquee-up"}>
                {[...column, ...column, ...column].map((tile, tileIndex) => (
                  <div key={`${tile}-${tileIndex}`} className="blank-photo-tile">
                    <span />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {!showSuccess && <div className="desktop-scrim" aria-hidden="true" />}
      {!showSuccess && <div className="mobile-scrim" aria-hidden="true" />}
      {showSuccess && <div className="success-scrim" aria-hidden="true" />}

      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Wishmax home">
          wishmax
        </Link>
      </header>

      <section className="hero-content" aria-label="Wishmax waitlist">
        {showSuccess ? (
          <div className="success-panel">
            <h1>
              {isExistingUser
                ? waitlistPosition
                  ? <>YOU&apos;RE ALREADY<br />#{waitlistPosition.toLocaleString()}</>
                  : "YOU'RE ALREADY"
                : waitlistPosition
                  ? <>YOU&apos;RE #{waitlistPosition.toLocaleString()}</>
                  : "YOU'RE ON"}
              <br />
              ON THE LIST
            </h1>
            <p>
              {totalCount
                ? `You are on the waitlist with ${Math.max(totalCount - 1, 0).toLocaleString()} other guys waiting for launch.`
                : "You are officially on the waitlist. Early access hits your inbox first."}
            </p>

            <div className="share-card">
              <div>
                <h2>SHARE WITH FRIENDS</h2>
                <p>More signups means faster launch and better first templates.</p>
              </div>
              <div className="copy-row">
                <span>{referralLink}</span>
                <button type="button" onClick={copyReferralLink} aria-label="Copy waitlist link">
                  {linkCopied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </button>
              </div>
              <p className="share-note">Send it to the friend whose profile photos need intervention.</p>
            </div>
          </div>
        ) : (
          <div className="copy-stack">
            <h1>
              <span className="desktop-title">
                DATING PHOTOS
                <br />
                WITHOUT THE
                <br />
                PHOTOSHOOT
              </span>
              <span className="mobile-title">
                DATING
                <br />
                PHOTOS
                <br />
                WITHOUT THE
                <br />
                PHOTOSHOOT
              </span>
            </h1>
            <p>
              Upload your face. Pick the vibe. Get profile-ready shots built to make guys look sharper.
              <span>{displayCount.toLocaleString()} people on the list.</span>
            </p>

            <form onSubmit={onSubmit} className="waitlist-form">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError(null)
                }}
                placeholder="name@email.com"
                aria-label="Email address"
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "Submitting..." : submitted ? "Joined" : "Join Waitlist"}
              </button>
            </form>
            {error && <p className="form-error">{error}</p>}
          </div>
        )}
      </section>

      <footer className="landing-footer">
        <div className="social-links" aria-label="Social links">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <Instagram aria-hidden="true" />
          </a>
          <a href="https://www.tiktok.com/" aria-label="TikTok">
            <Music2 aria-hidden="true" />
          </a>
          <a href="mailto:hello@wishmax.app" aria-label="Contact">
            <MessageCircle aria-hidden="true" />
          </a>
        </div>
        <div>© 2026 Bump Social Inc. All rights reserved.</div>
      </footer>
    </main>
  )
}
