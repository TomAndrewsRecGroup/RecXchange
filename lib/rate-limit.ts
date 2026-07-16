/**
 * Rate limiting for the middleware (edge runtime compatible).
 *
 * Primary: Upstash Redis over REST - shared across all serverless instances,
 * survives cold starts, works from edge middleware. Configure with:
 *   UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN
 *
 * Fallback: per-instance in-memory window when Upstash is not configured.
 * The fallback is best-effort only (each serverless instance counts
 * separately and resets on cold start) - configure Upstash in production.
 */

export interface RateLimitResult {
  limited: boolean;
  /** True when the decision came from shared Redis state. */
  distributed: boolean;
}

/* ── In-memory fallback ─────────────────────────────────── */

interface WindowEntry {
  count: number;
  resetTime: number;
}

const memoryMap = new Map<string, WindowEntry>();
let lastCleanup = 0;

function memoryLimit(
  key: string,
  limit: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  // Opportunistic cleanup to bound memory
  if (now - lastCleanup > 5 * 60 * 1000) {
    lastCleanup = now;
    for (const [k, entry] of memoryMap.entries()) {
      if (now > entry.resetTime) memoryMap.delete(k);
    }
  }

  const entry = memoryMap.get(key);
  if (!entry || now > entry.resetTime) {
    memoryMap.set(key, { count: 1, resetTime: now + windowMs });
    return { limited: false, distributed: false };
  }
  entry.count++;
  return { limited: entry.count > limit, distributed: false };
}

/* ── Upstash Redis (REST) ───────────────────────────────── */

function upstashConfig(): { url: string; token: string } | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url, token };
}

async function redisLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult | null> {
  const config = upstashConfig();
  if (!config) return null;

  try {
    // Fixed-window counter: INCR the key, set the expiry on first hit.
    const res = await fetch(`${config.url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['PEXPIRE', key, windowMs.toString(), 'NX'],
      ]),
      // Never let a slow Redis stall every API request.
      signal: AbortSignal.timeout(1000),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as Array<{ result?: number }>;
    const count = data?.[0]?.result;
    if (typeof count !== 'number') return null;

    return { limited: count > limit, distributed: true };
  } catch {
    // Redis unreachable: report null so the caller falls back to memory.
    return null;
  }
}

/**
 * Check a rate limit for the given key. Uses shared Redis when configured,
 * degrading to per-instance memory otherwise. Fails open only as far as the
 * in-memory fallback - a request is never blocked by infrastructure errors.
 */
export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<RateLimitResult> {
  const redis = await redisLimit(`rl:${key}`, limit, windowMs);
  if (redis) return redis;
  return memoryLimit(key, limit, windowMs);
}
