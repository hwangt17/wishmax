"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Link from "next/link"
import { Heart, TrendingUp } from "lucide-react"

const DEFAULT_COLS = 10
const PLACEHOLDER_TILES = 60
const DATING_APPS = [
  { name: "HINGE", slug: "hinge" },
  { name: "TINDER", slug: "tinder" },
  { name: "BUMBLE", slug: "bumble" },
  { name: "RAYA", slug: "raya" },
  { name: "CMB", slug: "cmb" },
]
const APP_ROTATE_MS = 2600
// Point this at the App Store / Play Store listing when it's live.
const APP_STORE_URL = "#"
// Hinge profile shown inside the phone: the raw "before" is on top by default
// and cross-fades to the larped "after" when the phone is hovered.
const HINGE_BEFORE = "/placeholder-hinge-screenshots/Bad.png"
const HINGE_AFTER = "/placeholder-hinge-screenshots/Good.png"
// Hearts that stream up over the phone on hover. Delays spread across the full
// loop (so the flow is continuous, never a synced burst), each with its own
// speed, size, and horizontal sway so they drift like real floating hearts.
const HEART_BUBBLES = [
  { left: "12%", delay: "0ms", duration: "2600ms", size: "var(--spacing-16)", drift: "var(--spacing-12)" },
  { left: "20%", delay: "900ms", duration: "3000ms", size: "var(--spacing-24)", drift: "calc(-1 * var(--spacing-16))" },
  { left: "28%", delay: "1800ms", duration: "2400ms", size: "var(--spacing-20)", drift: "var(--spacing-20)" },
  { left: "36%", delay: "400ms", duration: "3200ms", size: "var(--spacing-16)", drift: "calc(-1 * var(--spacing-8))" },
  { left: "44%", delay: "1300ms", duration: "2800ms", size: "var(--spacing-24)", drift: "var(--spacing-8)" },
  { left: "52%", delay: "2200ms", duration: "2200ms", size: "var(--spacing-20)", drift: "calc(-1 * var(--spacing-20))" },
  { left: "58%", delay: "600ms", duration: "3000ms", size: "var(--spacing-16)", drift: "var(--spacing-16)" },
  { left: "66%", delay: "1600ms", duration: "2600ms", size: "var(--spacing-24)", drift: "calc(-1 * var(--spacing-12))" },
  { left: "72%", delay: "300ms", duration: "3400ms", size: "var(--spacing-20)", drift: "var(--spacing-12)" },
  { left: "80%", delay: "2000ms", duration: "2400ms", size: "var(--spacing-16)", drift: "calc(-1 * var(--spacing-16))" },
  { left: "24%", delay: "2600ms", duration: "2800ms", size: "var(--spacing-20)", drift: "var(--spacing-16)" },
  { left: "48%", delay: "3000ms", duration: "3000ms", size: "var(--spacing-24)", drift: "calc(-1 * var(--spacing-8))" },
  { left: "62%", delay: "2400ms", duration: "2600ms", size: "var(--spacing-16)", drift: "var(--spacing-20)" },
  { left: "76%", delay: "3400ms", duration: "3200ms", size: "var(--spacing-20)", drift: "calc(-1 * var(--spacing-12))" },
]
// iOS-style push banners that drop in on hover — the "likes rolling in" proof.
// Matches the native layout: app icon, bold title + time on line 1, message on
// line 2. Delays are staggered tightly so they stack like a real notification flood.
const PHONE_NOTIFICATIONS = [
  { title: "Hinge", text: "Emma liked your photo", time: "now", delay: "0ms" },
  { title: "Hinge", text: "Sofia liked your prompt", time: "now", delay: "650ms" },
  { title: "Hinge", text: "You matched with Chloe 🎉", time: "now", delay: "1300ms" },
  { title: "Hinge", text: "Maya sent you a rose", time: "now", delay: "1950ms" },
  { title: "Hinge", text: "Ava wants to chat", time: "now", delay: "2600ms" },
  { title: "Hinge", text: "Nora liked your answer", time: "now", delay: "3250ms" },
  { title: "Hinge", text: "Lily matched with you", time: "now", delay: "3900ms" },
  { title: "Hinge", text: "Zoe liked your profile", time: "now", delay: "4550ms" },
]

function getColumnCount() {
  if (typeof window === "undefined") return DEFAULT_COLS
  if (window.innerWidth < 640) return 5
  if (window.innerWidth < 1024) return 7
  return DEFAULT_COLS
}

// Deterministic per-tile "match boost" so each tile shows a different number
// while server and client render the same value (no hydration mismatch).
function matchBoost(seed: number) {
  const noise = Math.sin(seed * 12.9898) * 43758.5453
  const frac = noise - Math.floor(noise)
  return Math.round(120 + frac * 400) // 120%–520%
}

export function WishmaxLanding() {
  const [displayCount, setDisplayCount] = useState(0)
  const [hasLoadedCount, setHasLoadedCount] = useState(false)
  const [colsCount, setColsCount] = useState(DEFAULT_COLS)
  const [layoutVersion, setLayoutVersion] = useState(0)
  const [appIndex, setAppIndex] = useState(0)
  const [isMobilePhoneRevealed, setIsMobilePhoneRevealed] = useState(false)

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

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return
    }
    const id = setInterval(() => {
      setAppIndex((current) => (current + 1) % DATING_APPS.length)
    }, APP_ROTATE_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)")
    let revealTimer: ReturnType<typeof setTimeout> | null = null

    const applyMobileReveal = () => {
      if (revealTimer) clearTimeout(revealTimer)

      if (mobileQuery.matches) {
        setIsMobilePhoneRevealed(false)
        revealTimer = setTimeout(() => {
          setIsMobilePhoneRevealed(true)
          revealTimer = null
        }, 3000)
      } else {
        setIsMobilePhoneRevealed(false)
      }
    }

    applyMobileReveal()
    mobileQuery.addEventListener("change", applyMobileReveal)

    return () => {
      if (revealTimer) clearTimeout(revealTimer)
      mobileQuery.removeEventListener("change", applyMobileReveal)
    }
  }, [])

  const columns = useMemo(() => {
    const cols: number[][] = Array.from({ length: colsCount }, () => [])
    for (let index = 0; index < PLACEHOLDER_TILES; index += 1) {
      cols[index % colsCount].push(index)
    }
    return cols
  }, [colsCount])

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
                {[...column, ...column, ...column].map((tile, tileIndex) => {
                  const photoSrc = `/placeholder-background-images/source_image_${tile + 1}.webp`
                  return (
                    <div key={`${tile}-${tileIndex}`} className="blank-photo-tile">
                      <div className="tile-flip">
                        <div className="tile-face tile-face-after">
                          <img className="tile-photo" src={photoSrc} alt="" loading="lazy" decoding="async" />
                          <span className="tile-label">
                            <TrendingUp className="tile-gain-icon" aria-hidden="true" />
                            {matchBoost(tile)}% likes
                          </span>
                        </div>
                        <div className="tile-face tile-face-before">
                          <img className="tile-photo" src={photoSrc} alt="" loading="lazy" decoding="async" />
                          <span className="tile-label">original</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="desktop-scrim" aria-hidden="true" />
      <div className="mobile-scrim" aria-hidden="true" />

      <header className="topbar">
        <Link className="wordmark" href="/" aria-label="Wishmax home">
          wishmax
        </Link>
      </header>

      <section className="hero-content" aria-label="Wishmax">
        <div className="copy-stack">
          <h1>
            <span className="desktop-title">
              LARPMAXXING
              <br />
              ON{" "}
              <span className="rotating-app" aria-live="polite">
                <span key={appIndex} className="rotating-app-word">
                  <img
                    className="app-icon"
                    src={`/dating-apps/${DATING_APPS[appIndex].slug}.jpg`}
                    alt=""
                    aria-hidden="true"
                  />
                  {DATING_APPS[appIndex].name}
                </span>
              </span>
            </span>
            <span className="mobile-title">
              LARPMAXXING
              <br />
              ON{" "}
              <span className="rotating-app" aria-live="polite">
                <span key={appIndex} className="rotating-app-word">
                  <img
                    className="app-icon"
                    src={`/dating-apps/${DATING_APPS[appIndex].slug}.jpg`}
                    alt=""
                    aria-hidden="true"
                  />
                  {DATING_APPS[appIndex].name}
                </span>
              </span>
            </span>
          </h1>
          <p>
            One selfie becomes any guy hot girls swipe on.<br />Way more matches, zero photoshoot.
          </p>
          <div className="hero-stat">
            <Heart className="hero-stat-heart" fill="currentColor" aria-hidden="true" />
            <span>
              <strong>{displayCount.toLocaleString()}</strong> more likes received and counting.
            </span>
          </div>

          <a className="get-app-button" href={APP_STORE_URL}>
            Get App
          </a>
        </div>
      </section>

      <aside className="device-showcase" aria-hidden="true">
        <div className={isMobilePhoneRevealed ? "device-frame is-mobile-revealed" : "device-frame"}>
          <div className="device-screen">
            <div className="device-swap">
              <img className="device-shot device-shot-after" src={HINGE_AFTER} alt="" loading="lazy" decoding="async" />
              <img className="device-shot device-shot-before" src={HINGE_BEFORE} alt="" decoding="async" />
            </div>
            <div className="heart-bubbles" aria-hidden="true">
              {HEART_BUBBLES.map((bubble, index) => (
                <span
                  key={index}
                  className="heart-bubble"
                  style={
                    {
                      left: bubble.left,
                      "--bubble-delay": bubble.delay,
                      "--bubble-duration": bubble.duration,
                      "--bubble-size": bubble.size,
                      "--bubble-drift": bubble.drift,
                    } as CSSProperties
                  }
                >
                  <Heart fill="currentColor" aria-hidden="true" />
                </span>
              ))}
            </div>
            <div className="phone-notifications" aria-hidden="true">
              {PHONE_NOTIFICATIONS.map((notif, index) => (
                <div
                  key={index}
                  className="phone-notif"
                  style={{ "--notif-delay": notif.delay } as CSSProperties}
                >
                  <img className="phone-notif-icon" src="/dating-apps/hinge.jpg" alt="" />
                  <div className="phone-notif-body">
                    <div className="phone-notif-head">
                      <span className="phone-notif-title">{notif.title}</span>
                      <span className="phone-notif-time">{notif.time}</span>
                    </div>
                    <span className="phone-notif-text">{notif.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img
            className="device-mockup"
            src="/devices/iphone-15-pro.png"
            alt=""
          />
        </div>
      </aside>

      <footer className="landing-footer">
        <div className="social-links" aria-label="Social links">
          <a href="https://www.instagram.com/" aria-label="Instagram">
            <img src="/ig.svg" alt="" aria-hidden="true" />
          </a>
          <a href="https://www.tiktok.com/" aria-label="TikTok">
            <img src="/tiktok.svg" alt="" aria-hidden="true" />
          </a>
          <a href="https://x.com/" aria-label="X (Twitter)">
            <img src="/x.svg" alt="" aria-hidden="true" />
          </a>
        </div>
        <div>© 2026 Wishmax Inc. All rights reserved.</div>
      </footer>
    </main>
  )
}
