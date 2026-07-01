/*
 * In-memory fixed-window rate limiter — a documented v1 spam guard.
 *
 * Tracks request counts per key (per-IP) in a process-local Map. Good enough to
 * reject rapid/bot bursts in dev and single-node deploys. In a multi-instance
 * production deploy this would move to a shared store (Upstash/Redis) behind the
 * same `rateLimit` signature — callers don't change.
 *
 * `now` is passed in (not read here) so the caller controls the clock and the
 * function stays trivially testable.
 */
interface WindowState {
  count: number;
  resetAt: number;
}

const hits = new Map<string, WindowState>();

export interface RateLimitResult {
  allowed: boolean;
  /** Seconds until the window resets (0 when allowed). */
  retryAfter: number;
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now: number,
): RateLimitResult {
  const existing = hits.get(key);

  if (!existing || now >= existing.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;
  if (existing.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfter: 0 };
}
