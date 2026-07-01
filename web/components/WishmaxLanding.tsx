"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
// Drop a before/after Hinge screenshot here (e.g. "/devices/hinge-before-after.png")
// to replace the placeholder shown inside the phone.
const DEVICE_SCREENSHOT: string | null = null

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
                {[...column, ...column, ...column].map((tile, tileIndex) => (
                  <div key={`${tile}-${tileIndex}`} className="blank-photo-tile">
                    <div className="tile-flip">
                      <div className="tile-face tile-face-after">
                        <span className="tile-label">
                          <TrendingUp className="tile-gain-icon" aria-hidden="true" />
                          +{matchBoost(tile)}% likes
                        </span>
                      </div>
                      <div className="tile-face tile-face-before">
                        <span className="tile-label">original</span>
                      </div>
                    </div>
                  </div>
                ))}
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
        <div className="device-frame">
          <div className="device-screen">
            {DEVICE_SCREENSHOT ? (
              <img className="device-screenshot" src={DEVICE_SCREENSHOT} alt="" />
            ) : (
              <div className="hinge-profile">
                <div className="hinge-photo hinge-photo-hero">
                  <div className="hinge-scrim" />
                  <div className="hinge-name">
                    <span className="hinge-name-main">Alex, 27</span>
                    <span className="hinge-name-sub">6 miles away · Verified</span>
                  </div>
                  <span className="hinge-like">
                    <Heart fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
                <div className="hinge-prompt">
                  <span className="hinge-prompt-label">The way to win me over is</span>
                  <p className="hinge-prompt-answer">
                    A good coffee, a better playlist, and zero small talk.
                  </p>
                  <span className="hinge-like hinge-like-inline">
                    <Heart fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
                <div className="hinge-photo hinge-photo-secondary">
                  <span className="hinge-like">
                    <Heart fill="currentColor" aria-hidden="true" />
                  </span>
                </div>
              </div>
            )}
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
