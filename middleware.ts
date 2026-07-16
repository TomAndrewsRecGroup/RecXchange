import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';

/**
 * API rate limiting at the edge.
 *
 * Backed by Upstash Redis (shared across all instances) when
 * UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN are set, with a
 * best-effort per-instance in-memory fallback otherwise.
 */

// Per-route budgets (requests per window)
const RATE_LIMITS: Record<string, { requests: number; windowMs: number }> = {
  '/api/contact': { requests: 5, windowMs: 60000 },
  '/api/analytics/track': { requests: 30, windowMs: 60000 },
  '/api/blog': { requests: 20, windowMs: 60000 },
  '/api/ghl': { requests: 10, windowMs: 60000 },
};

const DEFAULT_LIMIT = { requests: 15, windowMs: 60000 };

function getClientId(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || '127.0.0.1';
  return ip.trim();
}

function configFor(pathname: string) {
  for (const [path, limit] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(path)) return limit;
  }
  return DEFAULT_LIMIT;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    const clientId = getClientId(request);
    const config = configFor(pathname);

    const result = await checkRateLimit(
      `${clientId}:${pathname}`,
      config.requests,
      config.windowMs
    );

    if (result.limited) {
      console.warn(
        `[Rate Limit] Blocked ${clientId} on ${pathname} (${result.distributed ? 'redis' : 'memory'})`
      );
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: Math.ceil(config.windowMs / 1000),
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(config.windowMs / 1000)),
            'X-RateLimit-Limit': String(config.requests),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
