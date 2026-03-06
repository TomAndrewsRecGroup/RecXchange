/**
 * Security Helpers for Groq AI Chat
 * 
 * This module provides rate limiting, abuse prevention, and security monitoring
 * for the AI chat system.
 */

import { GROQ_CONFIG } from './config';

/**
 * In-memory rate limiting store
 * In production, consider using Redis for distributed rate limiting
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

/**
 * Clean up expired rate limit entries (run periodically)
 */
function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Rate limit result
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * Check rate limit for a contact
 */
export function checkRateLimit(contactId: string): RateLimitResult {
  const now = Date.now();
  const key = `chat:${contactId}`;
  const entry = rateLimitStore.get(key);
  
  // No existing entry - allow and create new
  if (!entry) {
    const resetAt = now + GROQ_CONFIG.rateLimitWindowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: GROQ_CONFIG.rateLimitPerMinute - 1,
      resetAt,
    };
  }
  
  // Entry expired - reset
  if (entry.resetAt < now) {
    const resetAt = now + GROQ_CONFIG.rateLimitWindowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return {
      allowed: true,
      remaining: GROQ_CONFIG.rateLimitPerMinute - 1,
      resetAt,
    };
  }
  
  // Check if limit exceeded
  if (entry.count >= GROQ_CONFIG.rateLimitPerMinute) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }
  
  // Increment counter
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    allowed: true,
    remaining: GROQ_CONFIG.rateLimitPerMinute - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Content filtering - check for prohibited topics
 */
export function containsProhibitedContent(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  const prohibitedKeywords = [
    'api key',
    'password',
    'secret',
    'credential',
    'token',
    'database',
    'admin access',
    'backdoor',
  ];
  
  for (const keyword of prohibitedKeywords) {
    if (lowerMessage.includes(keyword)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Detect potential prompt injection attempts
 */
export function detectPromptInjection(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  
  const injectionPatterns = [
    'ignore previous instructions',
    'ignore all previous',
    'disregard previous',
    'forget previous',
    'new instructions',
    'system prompt',
    'you are now',
    'act as if',
    'pretend you are',
    'roleplay as',
  ];
  
  for (const pattern of injectionPatterns) {
    if (lowerMessage.includes(pattern)) {
      return true;
    }
  }
  
  return false;
}

/**
 * Security check result
 */
export interface SecurityCheckResult {
  passed: boolean;
  reason?: string;
}

/**
 * Perform comprehensive security check on message
 */
export function performSecurityCheck(
  message: string,
  contactId: string
): SecurityCheckResult {
  // Check rate limit
  const rateLimit = checkRateLimit(contactId);
  if (!rateLimit.allowed) {
    const resetInSeconds = Math.ceil((rateLimit.resetAt - Date.now()) / 1000);
    return {
      passed: false,
      reason: `Rate limit exceeded. Please wait ${resetInSeconds} seconds.`,
    };
  }
  
  // Check for prohibited content
  if (containsProhibitedContent(message)) {
    return {
      passed: false,
      reason: 'Message contains prohibited content.',
    };
  }
  
  // Check for prompt injection
  if (detectPromptInjection(message)) {
    return {
      passed: false,
      reason: 'Message appears to be a prompt injection attempt.',
    };
  }
  
  return { passed: true };
}

/**
 * Log security events for monitoring
 */
export function logSecurityEvent(
  eventType: 'rate_limit' | 'prohibited_content' | 'prompt_injection' | 'suspicious_activity',
  contactId: string,
  details?: Record<string, unknown>
): void {
  console.warn('[Security Event]', {
    type: eventType,
    contactId,
    timestamp: new Date().toISOString(),
    ...details,
  });
  
  // In production, send to monitoring service (e.g., Sentry, DataDog)
  // Example: Sentry.captureMessage(`Security event: ${eventType}`, { level: 'warning', extra: details });
}

/**
 * Sanitize AI response before sending to user
 * Remove any accidentally leaked sensitive information
 */
export function sanitizeAIResponse(response: string): string {
  let sanitized = response;
  
  // Remove potential email addresses from AI responses (shouldn't happen, but safety check)
  sanitized = sanitized.replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[email]');
  
  // Remove potential phone numbers
  sanitized = sanitized.replace(/\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g, '[phone]');
  
  // Remove potential API keys or tokens (long alphanumeric strings)
  sanitized = sanitized.replace(/\b[A-Za-z0-9]{32,}\b/g, '[redacted]');
  
  return sanitized;
}
