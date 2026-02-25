/**
 * Analytics Event Tracking Utility
 * 
 * Centralized event tracking for RecXchange conversion funnel.
 * Supports multiple analytics platforms (GA4, custom API, etc.)
 */

export type EventName =
  // Calculator events (Recruiter Roles page)
  | 'calculator_viewed'
  | 'calculator_completed'
  | 'calculator_cta_clicked'
  
  // Fake Xchange Engine events (Recruiters with Candidates page)
  | 'fake_engine_viewed'
  | 'fake_engine_cv_uploaded'
  | 'fake_engine_result_shown'
  | 'fake_engine_signup_clicked'
  | 'fake_engine_try_another_clicked'
  
  // Site-wide CTA events
  | 'cta_clicked'
  | 'login_link_clicked'
  | 'signup_link_clicked'
  
  // Lead form events
  | 'lead_form_submitted'
  | 'quick_action_form_viewed'
  | 'quick_action_form_submitted'
  
  // Page view events
  | 'page_viewed'
  | 'roles_page_viewed'
  | 'pricing_page_viewed'
  
  // Navigation events
  | 'nav_link_clicked'
  | 'footer_link_clicked';

export type EventProps = {
  // Page context
  page?: string;
  section?: string;
  
  // CTA context
  cta_text?: string;
  cta_location?: string;
  variant?: 'A' | 'B';
  
  // User persona
  persona?: 'recruiter' | 'hiring-manager' | 'unknown';
  
  // Calculator specific
  roles_per_month?: number;
  avg_fee?: number;
  calculated_revenue?: number;
  
  // Fake Engine specific
  matched_job?: string;
  match_score?: number;
  split_fee?: number;
  
  // Form specific
  form_type?: string;
  intent?: string;
  
  // Stats context
  total_roles?: number;
  total_fees?: number;
  
  // General metadata
  [key: string]: string | number | boolean | undefined;
};

export type AnalyticsEvent = {
  name: EventName;
  props?: EventProps;
  timestamp?: number;
};

/**
 * Track an analytics event
 * 
 * @param event - Event name from EventName type
 * @param props - Optional event properties
 */
export function trackEvent(event: EventName, props?: EventProps): void {
  if (typeof window === 'undefined') return;

  const timestamp = Date.now();
  const eventData: AnalyticsEvent = { name: event, props, timestamp };

  // 1. Console logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', {
      event,
      props,
      timestamp: new Date(timestamp).toISOString()
    });
  }

  // 2. Google Analytics 4 (if present)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    try {
      // @ts-ignore
      window.gtag('event', event, {
        ...props,
        event_category: props?.page || 'general',
        event_label: props?.cta_text || props?.section,
        timestamp
      });
    } catch (error) {
      console.warn('[Analytics] GA4 tracking failed:', error);
    }
  }

  // 3. Send to custom API endpoint (optional - for your own database)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    try {
      fetch('/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
        // Don't block user experience
        keepalive: true
      }).catch(() => {
        // Silently fail - don't break user experience
      });
    } catch (error) {
      // Silently fail
    }
  }

  // 4. Store in sessionStorage for debugging (last 50 events)
  try {
    const storageKey = 'rx_analytics_events';
    const existingEvents = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    const updatedEvents = [...existingEvents, eventData].slice(-50);
    sessionStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  } catch (error) {
    // Silently fail if sessionStorage is not available
  }
}

/**
 * Track a page view
 * 
 * @param page - Page path or name
 * @param props - Optional additional properties
 */
export function trackPageView(page: string, props?: EventProps): void {
  trackEvent('page_viewed', {
    page,
    ...props
  });
}

/**
 * Track a CTA click
 * 
 * @param ctaText - Text of the CTA button
 * @param location - Where on the page the CTA is located
 * @param props - Optional additional properties
 */
export function trackCTA(ctaText: string, location: string, props?: EventProps): void {
  trackEvent('cta_clicked', {
    cta_text: ctaText,
    cta_location: location,
    ...props
  });
}

/**
 * Get all tracked events from current session (for debugging)
 */
export function getSessionEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const storageKey = 'rx_analytics_events';
    return JSON.parse(sessionStorage.getItem(storageKey) || '[]');
  } catch {
    return [];
  }
}

/**
 * Clear all tracked events from session (for debugging)
 */
export function clearSessionEvents(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem('rx_analytics_events');
  } catch {
    // Silently fail
  }
}
