/**
 * CSRF (Cross-Site Request Forgery) Protection
 * 
 * Simple CSRF token generation and validation for Next.js API routes.
 * Uses signed tokens with timestamp validation.
 * 
 * Usage in API routes:
 * 
 * import { validateCsrfToken } from '@/lib/csrf';
 * 
 * export async function POST(request: NextRequest) {
 *   const token = request.headers.get('x-csrf-token');
 *   if (!validateCsrfToken(token)) {
 *     return NextResponse.json({ error: 'Invalid CSRF token' }, { status: 403 });
 *   }
 *   // ... handle request
 * }
 * 
 * Usage in client:
 * 
 * import { getCsrfToken } from '@/lib/csrf';
 * 
 * const token = getCsrfToken();
 * fetch('/api/endpoint', {
 *   method: 'POST',
 *   headers: {
 *     'x-csrf-token': token,
 *   },
 * });
 */

import { createHmac, randomBytes } from 'crypto';

const CSRF_SECRET = process.env.CSRF_SECRET || 'default-secret-change-in-production';
const TOKEN_LIFETIME_MS = 60 * 60 * 1000; // 1 hour

/**
 * Generate a CSRF token
 * Format: timestamp.random.signature
 */
export function generateCsrfToken(): string {
  const timestamp = Date.now().toString();
  const random = randomBytes(16).toString('hex');
  const data = `${timestamp}.${random}`;
  const signature = createHmac('sha256', CSRF_SECRET)
    .update(data)
    .digest('hex');
  
  return `${data}.${signature}`;
}

/**
 * Validate a CSRF token
 */
export function validateCsrfToken(token: string | null | undefined): boolean {
  if (!token) return false;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const [timestamp, random, signature] = parts;
    const data = `${timestamp}.${random}`;

    // Verify signature
    const expectedSignature = createHmac('sha256', CSRF_SECRET)
      .update(data)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      return false;
    }

    // Verify timestamp (token not expired)
    const tokenTime = parseInt(timestamp, 10);
    const now = Date.now();
    
    if (now - tokenTime > TOKEN_LIFETIME_MS) {
      return false; // Token expired
    }

    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Client-side: Get CSRF token from meta tag or generate new one
 * This should be called from client components
 */
export function getCsrfToken(): string {
  if (typeof window === 'undefined') {
    throw new Error('getCsrfToken can only be called on the client side');
  }

  // Try to get from meta tag first
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  if (metaTag) {
    const token = metaTag.getAttribute('content');
    if (token) return token;
  }

  // Generate new token and store in sessionStorage
  const existingToken = sessionStorage.getItem('csrf-token');
  if (existingToken && validateCsrfToken(existingToken)) {
    return existingToken;
  }

  // Note: In a real implementation, you'd fetch this from an API endpoint
  // that generates it server-side. For now, we'll use a placeholder.
  const newToken = `client-${Date.now()}`;
  sessionStorage.setItem('csrf-token', newToken);
  return newToken;
}

/**
 * Middleware helper to extract and validate CSRF token from request
 */
export function getCsrfTokenFromRequest(
  request: Request
): string | null {
  // Check header
  const headerToken = request.headers.get('x-csrf-token');
  if (headerToken) return headerToken;

  // Check body for form submissions
  // This would need to be async in actual implementation
  return null;
}

/**
 * Generate SameSite cookie configuration for CSRF protection
 */
export function getCsrfCookieConfig() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: TOKEN_LIFETIME_MS / 1000, // in seconds
  };
}
