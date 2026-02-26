import { NextRequest, NextResponse } from 'next/server';

/**
 * Simple in-memory rate limiter
 * 
 * In production, consider using:
 * - Redis for distributed rate limiting
 * - Upstash Rate Limit for serverless
 * - Vercel Edge Config for edge deployment
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Rate limit configuration
const RATE_LIMITS = {
  // API routes - stricter limits
  '/api/quick-action': { requests: 5, windowMs: 60000 }, // 5 requests per minute
  '/api/analytics/track': { requests: 30, windowMs: 60000 }, // 30 requests per minute
  '/api/blog': { requests: 20, windowMs: 60000 }, // 20 requests per minute
  '/api/ghl': { requests: 10, windowMs: 60000 }, // 10 requests per minute
  
  // Default for other API routes
  default: { requests: 15, windowMs: 60000 }, // 15 requests per minute
};

/**
 * Get client identifier (IP address or fallback)
 */
function getClientId(request: NextRequest): string {
  // Try multiple headers for IP address (Vercel/CF/etc.)
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = forwardedFor?.split(',')[0] || realIp || cfConnectingIp || '127.0.0.1';
  return ip.trim();
}

/**
 * Check if request should be rate limited
 */
function shouldRateLimit(clientId: string, pathname: string): boolean {
  const now = Date.now();
  
  // Find matching rate limit config
  let config = RATE_LIMITS.default;
  for (const [path, limit] of Object.entries(RATE_LIMITS)) {
    if (path !== 'default' && pathname.startsWith(path)) {
      config = limit;
      break;
    }
  }
  
  const key = `${clientId}:${pathname}`;
  const entry = rateLimitMap.get(key);
  
  // No existing entry or window expired - create new entry
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    });
    return false;
  }
  
  // Increment count
  entry.count++;
  
  // Check if limit exceeded
  if (entry.count > config.requests) {
    return true; // Rate limit exceeded
  }
  
  return false;
}

/**
 * Cleanup old entries periodically to prevent memory leak
 */
function cleanupOldEntries() {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Cleanup every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupOldEntries, 5 * 60 * 1000);
}

/**
 * Middleware function
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only rate limit API routes
  if (pathname.startsWith('/api/')) {
    const clientId = getClientId(request);
    
    if (shouldRateLimit(clientId, pathname)) {
      console.warn(`[Rate Limit] Blocked request from ${clientId} to ${pathname}`);
      
      return NextResponse.json(
        {
          error: 'Too many requests',
          message: 'You have exceeded the rate limit. Please try again later.',
          retryAfter: 60, // seconds
        },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMITS.default.requests),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(Date.now() + 60000),
          },
        }
      );
    }
  }
  
  return NextResponse.next();
}

/**
 * Configure which routes the middleware should run on
 */
export const config = {
  matcher: [
    '/api/:path*',
  ],
};
