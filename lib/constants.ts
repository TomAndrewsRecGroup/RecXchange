/**
 * Application Constants
 * 
 * Centralized location for all hardcoded values used throughout the application.
 * This improves maintainability and makes it easier to update values across the codebase.
 */

/**
 * Business metrics and pricing
 */
export const BUSINESS = {
  // Placement metrics
  AVERAGE_PLACEMENT_FEE: 7000,
  TOTAL_FEE_POOL: 750000,
  ACTIVE_ROLES_COUNT: 100,
  
  // Network size
  RECRUITER_COUNT: 15000,
  CANDIDATE_DB_SIZE: 270000000, // 270M
  
  // Fee splits
  STANDARD_SPLIT: 50, // 50%
  RECX_DIRECT_MIN_SPLIT: 60, // 60%
  RECX_DIRECT_MAX_SPLIT: 70, // 70%
} as const;

/**
 * Pricing tiers
 */
export const PRICING = {
  ENTRY: {
    PRICE_USD: 1,
    PRICE_GBP: 1,
    TOKENS: 5,
    RECX_DIRECT_DELAY_DAYS: 30,
  },
  LITE: {
    PRICE_USD: 99,
    PRICE_GBP: 79,
    TOKENS: 150,
    RECX_DIRECT_DELAY_DAYS: 7,
  },
  PRO: {
    PRICE_USD: 249,
    PRICE_GBP: 199,
    TOKENS: 400,
    RECX_DIRECT_DELAY_DAYS: 0, // Instant access
  },
} as const;

/**
 * Token packs (top-up purchases)
 * Recruiters only — hiring managers post roles for free
 */
export const TOKEN_PACKS = {
  SMALL: { TOKENS: 10, PRICE_USD: 10 },
  MEDIUM: { TOKENS: 50, PRICE_USD: 40 },
  LARGE: { TOKENS: 100, PRICE_USD: 70 },
  XLARGE: { TOKENS: 500, PRICE_USD: 300 },
} as const;

/**
 * Token usage rules
 * - Recruiters: 1 token = post 1 role OR submit 1 candidate OR unlock 1 contact
 * - Hiring managers / clients: posting roles to RecX Direct is FREE
 */
export const TOKEN_COSTS = {
  POST_ROLE: 1,        // Recruiter posting a role to the Xchange
  SUBMIT_CANDIDATE: 1, // Recruiter submitting a candidate to a role
  UNLOCK_CONTACT: 1,   // Recruiter unlocking candidate contact details
} as const;

/**
 * API endpoints and URLs
 */
export const API = {
  GHL: {
    BASE_URL: 'https://rest.gohighlevel.com/v1',
    CONTACTS: 'https://rest.gohighlevel.com/v1/contacts/',
    CALENDARS: 'https://services.leadconnectorhq.com/calendars/events',
  },
  SENDGRID: {
    SEND_EMAIL: 'https://api.sendgrid.com/v3/mail/send',
  },
} as const;

/**
 * Brand assets and styling
 */
export const BRANDING = {
  LOGO_URL: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png',
  ICON_URL: 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png',
  
  COLORS: {
    PRIMARY: '#00ffff', // Cyan
    SECONDARY: '#c71df1', // Fuchsia
    BACKGROUND: '#050508',
    SUCCESS: '#22c55e',
    ERROR: '#ff4444',
    WARNING: '#fbbf24',
  },
} as const;

/**
 * Email configuration
 */
export const EMAIL = {
  DEFAULT_FROM: 'analytics@recxchange.com',
  DEFAULT_FROM_NAME: 'RecXchange Analytics',
  SUPPORT: 'support@recxchange.io',
} as const;

/**
 * Geographic coverage
 */
export const REGIONS = {
  UK: 'United Kingdom',
  US: 'United States',
  EU: 'Europe',
  AU: 'Australia',
  AE: 'United Arab Emirates',
  ZA: 'South Africa',
} as const;

/**
 * Industry sectors
 */
export const INDUSTRIES = {
  ENGINEERING: { name: 'Engineering', avgFee: 8500 },
  HEALTHCARE: { name: 'Healthcare', avgFee: 7800 },
  TECH: { name: 'Tech/Software', avgFee: 9200 },
  FINANCE: { name: 'Finance', avgFee: 7500 },
  SALES: { name: 'Sales Leadership', avgFee: 8000 },
  HR: { name: 'HR', avgFee: 7000 },
} as const;

/**
 * Analytics event names
 */
export const ANALYTICS_EVENTS = {
  PAGE_VIEWED: 'page_viewed',
  QUICK_ACTION_SUBMITTED: 'quick_action_submitted',
  SIGNUP_STARTED: 'signup_started',
  SIGNUP_COMPLETED: 'signup_completed',
  ROLE_POSTED: 'role_posted',
  CANDIDATE_SUBMITTED: 'candidate_submitted',
} as const;

/**
 * Rate limiting configuration
 */
export const RATE_LIMITS = {
  QUICK_ACTION: { requests: 5, windowMs: 60000 },
  ANALYTICS: { requests: 30, windowMs: 60000 },
  BLOG: { requests: 20, windowMs: 60000 },
  DEFAULT: { requests: 15, windowMs: 60000 },
} as const;

/**
 * Social media links
 */
export const SOCIAL = {
  LINKEDIN: 'https://www.linkedin.com/company/recxchange',
  TWITTER: 'https://twitter.com/RecXchange',
  YOUTUBE: 'https://youtube.com/@recxchange',
} as const;

/**
 * Contact information
 */
export const CONTACT = {
  SUPPORT_EMAIL: 'support@recxchange.io',
  SALES_EMAIL: 'sales@recxchange.io',
  FOUNDER_LINKEDIN: 'https://www.linkedin.com/in/tomandrews',
} as const;

/**
 * Platform limits
 */
export const LIMITS = {
  ENTRY: {
    CANDIDATES: 20,
    CLIENTS: 20,
    PRIVATE_ROLES: 20,
    DAILY_SEARCHES: 1,
  },
  LITE: {
    CANDIDATES: 500,
    CLIENTS: 500,
    PRIVATE_ROLES: 500,
    DAILY_SEARCHES: 10,
  },
  PRO: {
    CANDIDATES: 10000,
    CLIENTS: 10000,
    PRIVATE_ROLES: 10000,
    DAILY_SEARCHES: 25,
  },
} as const;

/**
 * Helper function to format currency
 */
export function formatCurrency(amount: number, currency: 'USD' | 'GBP' = 'USD'): string {
  const symbol = currency === 'USD' ? '$' : '£';
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Helper function to format large numbers
 */
export function formatLargeNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k`;
  }
  return num.toString();
}
