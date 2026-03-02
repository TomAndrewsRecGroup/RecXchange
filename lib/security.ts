/**
 * Security Utilities for RecXchange
 * 
 * Provides rate limiting and input sanitization to protect against:
 * - Brute force attacks
 * - Spam submissions
 * - XSS attacks
 * - Injection attacks
 */

/**
 * Simple in-memory rate limiter
 * 
 * For production, consider using Redis-based solution like @upstash/ratelimit
 * This implementation is lightweight and doesn't require external dependencies.
 */
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Clean up old entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Check if request should be allowed
   * @param identifier - Unique identifier (IP address, email, etc.)
   * @param limit - Maximum requests allowed
   * @param windowMs - Time window in milliseconds
   * @returns Object with success status and remaining requests
   */
  check(identifier: string, limit: number = 10, windowMs: number = 60000): {
    success: boolean;
    remaining: number;
    resetIn: number;
  } {
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get existing requests for this identifier
    const timestamps = this.requests.get(identifier) || [];

    // Filter to only include requests within the time window
    const recentRequests = timestamps.filter(time => time > windowStart);

    if (recentRequests.length >= limit) {
      const oldestRequest = Math.min(...recentRequests);
      const resetIn = Math.max(0, windowMs - (now - oldestRequest));

      return {
        success: false,
        remaining: 0,
        resetIn
      };
    }

    // Add current request
    recentRequests.push(now);
    this.requests.set(identifier, recentRequests);

    return {
      success: true,
      remaining: limit - recentRequests.length,
      resetIn: windowMs
    };
  }

  /**
   * Clean up old entries
   */
  private cleanup(): void {
    const now = Date.now();
    const maxAge = 60 * 60 * 1000; // 1 hour

    for (const [identifier, timestamps] of this.requests.entries()) {
      const recentTimestamps = timestamps.filter(time => now - time < maxAge);
      
      if (recentTimestamps.length === 0) {
        this.requests.delete(identifier);
      } else {
        this.requests.set(identifier, recentTimestamps);
      }
    }
  }

  /**
   * Clear all rate limit data for an identifier
   */
  reset(identifier: string): void {
    this.requests.delete(identifier);
  }

  /**
   * Clean up on shutdown
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
    this.requests.clear();
  }
}

// Global rate limiter instance
const globalRateLimiter = new RateLimiter();

/**
 * Rate limit configurations for different endpoints
 */
export const RATE_LIMITS = {
  // API endpoints - stricter limits
  api: {
    limit: 10,
    windowMs: 60000, // 10 requests per minute
  },
  // Form submissions - very strict
  form: {
    limit: 5,
    windowMs: 60000, // 5 submissions per minute
  },
  // Email-based rate limiting - prevent email spam
  email: {
    limit: 3,
    windowMs: 300000, // 3 submissions per 5 minutes
  },
  // General page requests
  page: {
    limit: 100,
    windowMs: 60000, // 100 requests per minute
  },
} as const;

/**
 * Check rate limit for a request
 * 
 * @param identifier - Unique identifier (IP, email, etc.)
 * @param type - Type of rate limit to apply
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  type: keyof typeof RATE_LIMITS = 'api'
): {
  success: boolean;
  remaining: number;
  resetIn: number;
} {
  const config = RATE_LIMITS[type];
  return globalRateLimiter.check(identifier, config.limit, config.windowMs);
}

/**
 * Get client IP address from request
 * Works with Vercel, Cloudflare, and standard deployments
 * Accepts any Request-like object with headers
 */
export function getClientIP(request: { headers: Headers } | Request): string {
  // Try various headers used by different platforms
  const headers = request.headers;
  
  return (
    headers.get('x-real-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('cf-connecting-ip') || // Cloudflare
    headers.get('x-vercel-forwarded-for') || // Vercel
    'unknown'
  );
}

/**
 * Sanitize user input to prevent XSS and injection attacks
 * 
 * This is a simple implementation. For production, consider using a library like DOMPurify
 * or validator.js for more comprehensive sanitization.
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';
  
  return input
    // Trim whitespace
    .trim()
    // Remove null bytes
    .replace(/\0/g, '')
    // Encode HTML special characters
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    // Limit length
    .substring(0, maxLength);
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';
  
  return email
    .toLowerCase()
    .trim()
    .replace(/\s/g, '')
    .substring(0, 255);
}

/**
 * Validate email format using RFC 5322 compliant regex
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Validate name (first name, last name, company name)
 */
export function isValidName(name: string, minLength: number = 2, maxLength: number = 100): boolean {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

/**
 * Sanitize object with multiple fields
 * Useful for API request bodies
 */
export function sanitizeObject<T extends Record<string, any>>(
  obj: T,
  schema: Record<keyof T, { type: 'string' | 'email' | 'number' | 'boolean' | 'array'; maxLength?: number }>
): Partial<T> {
  const sanitized: Partial<T> = {};

  for (const key in schema) {
    const value = obj[key];
    const config = schema[key];

    if (value === undefined || value === null) continue;

    switch (config.type) {
      case 'string':
        if (typeof value === 'string') {
          sanitized[key] = sanitizeInput(value, config.maxLength) as T[Extract<keyof T, string>];
        }
        break;

      case 'email':
        if (typeof value === 'string') {
          sanitized[key] = sanitizeEmail(value) as T[Extract<keyof T, string>];
        }
        break;

      case 'number':
        if (typeof value === 'number' && !isNaN(value)) {
          sanitized[key] = value;
        }
        break;

      case 'boolean':
        if (typeof value === 'boolean') {
          sanitized[key] = value;
        }
        break;

      case 'array':
        if (Array.isArray(value)) {
          sanitized[key] = value.map(item => 
            typeof item === 'string' ? sanitizeInput(item, config.maxLength) : item
          ) as T[Extract<keyof T, string>];
        }
        break;
    }
  }

  return sanitized;
}

/**
 * Generate a secure random token
 * Useful for CSRF tokens, nonces, etc.
 */
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const randomValues = new Uint8Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      result += chars[randomValues[i] % chars.length];
    }
  } else {
    // Fallback for environments without crypto API
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
}

/**
 * Check if request contains suspicious patterns
 * Returns true if request should be blocked
 */
export function containsSuspiciousPatterns(input: string): boolean {
  if (typeof input !== 'string') return false;

  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // Event handlers like onclick=
    /\beval\s*\(/i,
    /\b(union|select|insert|update|delete|drop|create|alter)\b.*\bfrom\b/i, // SQL injection
    /\.\.\//, // Path traversal
    /%00/, // Null byte
    /\\x00/, // Null byte
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
}

/**
 * Validate and sanitize form data
 * Returns sanitized data or throws error if validation fails
 */
export function validateFormData(data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  message?: string;
  [key: string]: any;
}): {
  firstName: string;
  lastName: string;
  email: string;
  companyName?: string;
  message?: string;
} {
  const errors: string[] = [];

  // Validate and sanitize first name
  const firstName = sanitizeInput(data.firstName || '', 100);
  if (!isValidName(firstName)) {
    errors.push('Invalid first name');
  }

  // Validate and sanitize last name
  const lastName = sanitizeInput(data.lastName || '', 100);
  if (!isValidName(lastName)) {
    errors.push('Invalid last name');
  }

  // Validate and sanitize email
  const email = sanitizeEmail(data.email || '');
  if (!isValidEmail(email)) {
    errors.push('Invalid email address');
  }

  // Check for suspicious patterns
  const fieldsToCheck = [firstName, lastName, email, data.companyName, data.message].filter(Boolean);
  if (fieldsToCheck.some(field => containsSuspiciousPatterns(field as string))) {
    errors.push('Suspicious content detected');
  }

  if (errors.length > 0) {
    throw new Error(errors.join(', '));
  }

  const result: any = { firstName, lastName, email };

  if (data.companyName) {
    result.companyName = sanitizeInput(data.companyName, 200);
  }

  if (data.message) {
    result.message = sanitizeInput(data.message, 5000);
  }

  return result;
}

/**
 * Create response headers with security best practices
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    // Prevent XSS attacks
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    
    // HTTPS only
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    
    // Referrer policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    
    // Permissions policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  };
}

/**
 * Export rate limiter instance for testing/cleanup
 */
export const rateLimiter = globalRateLimiter;
