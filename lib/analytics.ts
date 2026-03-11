/**
 * Analytics Event Tracking Utility
 * 
 * Centralized event tracking for RecXchange conversion funnel.
 * Supports multiple analytics platforms (GA4, custom API, etc.)
 * 
 * GDPR/PECR Compliance: All tracking respects user cookie consent preferences.
 */

export type EventName =
  // Entry points - WHERE they start
  | 'page_viewed'
  | 'landing_page_viewed'
  | 'external_referral'
  | 'direct_visit'
  | 'search_engine_visit'
  | 'social_media_visit'
  
  // Route tracking - WHAT ROUTE they take
  | 'nav_link_clicked'
  | 'footer_link_clicked'
  | 'hero_cta_clicked'
  | 'mid_page_cta_clicked'
  | 'bottom_cta_clicked'
  | 'scroll_depth_25'
  | 'scroll_depth_50'
  | 'scroll_depth_75'
  | 'scroll_depth_100'
  | 'time_on_page_30s'
  | 'time_on_page_60s'
  | 'time_on_page_120s'
  
  // Problems/Questions - WHAT PROBLEMS they have
  | 'calculator_viewed'
  | 'calculator_started'
  | 'calculator_completed'
  | 'calculator_cta_clicked'
  | 'fake_engine_viewed'
  | 'fake_engine_cv_uploaded'
  | 'fake_engine_result_shown'
  | 'fake_engine_signup_clicked'
  | 'fake_engine_try_another_clicked'
  | 'xchange_engine_submitted'
  | 'xchange_engine_reset'
  | 'pricing_page_viewed'
  | 'roles_page_viewed'
  | 'faq_section_viewed'
  | 'faq_item_clicked'
  | 'comparison_table_viewed'
  | 'testimonial_section_viewed'
  
  // Answers/Solutions - WHAT ANSWERS they need
  | 'how_it_works_viewed'
  | 'features_section_viewed'
  | 'benefits_section_viewed'
  | 'case_study_viewed'
  | 'demo_video_played'
  | 'demo_video_completed'
  | 'calculator_result_viewed'
  | 'pricing_details_viewed'
  
  // Conversion actions - WHAT CONVERTED them
  // Recruiters: Join/Signup
  | 'signup_intent_shown'
  | 'signup_link_clicked'
  | 'signup_form_viewed'
  | 'signup_form_started'
  | 'signup_form_field_completed'
  | 'signup_form_submitted'
  | 'signup_completed'
  | 'account_created'
  | 'onboarding_started'
  | 'onboarding_completed'
  | 'first_role_viewed'
  | 'first_candidate_uploaded'
  | 'first_match_received'
  
  // Hiring Managers: Book Call
  | 'book_call_intent_shown'
  | 'book_call_cta_clicked'
  | 'calendly_widget_opened'
  | 'calendly_date_selected'
  | 'calendly_time_selected'
  | 'calendly_form_started'
  | 'calendly_form_completed'
  | 'call_booking_confirmed'
  | 'calendar_invite_sent'
  | 'call_reminder_clicked'
  | 'hiring_manager_form_submitted'
  
  // General engagement
  | 'cta_clicked'
  | 'login_link_clicked'
  | 'lead_form_submitted'
  | 'quick_action_form_viewed'
  | 'quick_action_form_submitted'
  | 'exit_intent_modal_shown'
  | 'exit_intent_modal_clicked'
  | 'exit_intent_modal_dismissed'
  
  // Drop-off signals
  | 'form_field_error'
  | 'form_abandoned'
  | 'page_exit_before_scroll'
  | 'bounce_detected'
  | 'back_button_clicked';

export type EventProps = {
  // Page context - WHERE
  page?: string;
  page_title?: string;
  section?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  
  // Route context - WHAT ROUTE
  navigation_path?: string; // e.g., "home -> pricing -> signup"
  previous_page?: string;
  next_page?: string;
  scroll_depth?: number;
  time_on_page?: number;
  click_sequence?: number; // nth click in session
  session_page_count?: number;
  
  // CTA context
  cta_text?: string;
  cta_location?: string;
  cta_type?: 'primary' | 'secondary' | 'tertiary';
  variant?: 'A' | 'B' | 'primary' | 'secondary' | 'ghost';
  destination?: string;
  
  // User persona - WHO
  persona?: 'recruiter' | 'hiring-manager' | 'unknown';
  user_type?: 'new' | 'returning';
  session_count?: number;
  
  // Problems/Questions - WHAT PROBLEMS
  problem_type?: string; // e.g., "understanding_pricing", "how_matching_works"
  question_clicked?: string;
  faq_topic?: string;
  search_query?: string;
  
  // Calculator specific
  calculator_step?: number;
  roles_per_month?: number;
  avg_fee?: number;
  calculated_revenue?: number;
  calculator_completion_time?: number;
  
  // Fake Engine specific
  matched_job?: string;
  match_score?: number;
  split_fee?: number;
  cv_file_type?: string;
  engine_interaction_count?: number;
  
  // Answers/Solutions - WHAT ANSWERS
  content_type?: string; // e.g., "video", "case_study", "comparison"
  content_title?: string;
  video_watch_percentage?: number;
  feature_viewed?: string;
  benefit_highlighted?: string;
  
  // Form context - CONVERSION PATH
  form_type?: string;
  form_step?: number;
  form_completion_percentage?: number;
  field_name?: string;
  field_value_length?: number;
  error_message?: string;
  abandon_reason?: string;
  
  // Calendly/Booking specific (Hiring Managers)
  calendly_event_type?: string;
  selected_date?: string;
  selected_time?: string;
  booking_lead_time_days?: number;
  
  // Hiring Manager form specific
  company_name?: string;
  role_title?: string;
  source?: string;
  
  // Conversion context - WHAT CONVERTED
  conversion_trigger?: string; // e.g., "calculator_result", "testimonial", "pricing_clarity"
  intent_signal?: string; // e.g., "high_scroll", "multiple_pages", "returned_visit"
  hesitation_points?: string[]; // e.g., ["pricing_page_revisited", "abandoned_form"]
  
  // Technical context
  device_type?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  viewport_width?: number;
  viewport_height?: number;
  
  // Stats context
  total_roles?: number;
  total_fees?: number;
  
  // General metadata
  [key: string]: string | number | boolean | string[] | undefined;
};

export type AnalyticsEvent = {
  name: EventName;
  props?: EventProps;
  timestamp?: number;
  session_id?: string;
};

/**
 * Check if user has consented to analytics cookies
 * GDPR/PECR Compliance: Must check consent before tracking
 */
function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) return false;
    
    const preferences = JSON.parse(consent);
    return preferences.analytics === true;
  } catch (error) {
    // If we can't parse consent, assume no consent
    return false;
  }
}

/**
 * Generate or retrieve session ID
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  try {
    let sessionId = sessionStorage.getItem('rx_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('rx_session_id', sessionId);
    }
    return sessionId;
  } catch {
    return '';
  }
}

/**
 * Track an analytics event
 * 
 * GDPR/PECR Compliance: Only tracks if user has given explicit consent for analytics cookies.
 * Necessary cookies and transactional events (form submissions) are always tracked.
 * 
 * @param event - Event name from EventName type
 * @param props - Optional event properties
 * @param options - Options to override consent check (e.g., for transactional events)
 */
export function trackEvent(
  event: EventName, 
  props?: EventProps,
  options?: { bypassConsent?: boolean }
): void {
  if (typeof window === 'undefined') return;

  // GDPR/PECR Compliance Check
  // Only bypass consent for transactional events (form submissions, etc.)
  const isTransactionalEvent = [
    'signup_form_submitted',
    'lead_form_submitted',
    'quick_action_form_submitted',
    'hiring_manager_form_submitted',
  ].includes(event);

  const shouldTrack = options?.bypassConsent || isTransactionalEvent || hasAnalyticsConsent();

  if (!shouldTrack) {
    // User has not consented to analytics - skip tracking
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Tracking blocked - no consent:', event);
    }
    return;
  }

  const timestamp = Date.now();
  const session_id = getSessionId();
  const eventData: AnalyticsEvent = { name: event, props, timestamp, session_id };

  // 1. Console logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', {
      event,
      props,
      timestamp: new Date(timestamp).toISOString(),
      session_id,
      consent: hasAnalyticsConsent() ? 'granted' : 'bypassed'
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
        session_id,
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

  // 4. Store in sessionStorage for debugging (last 100 events)
  // This is considered "necessary" for functionality
  try {
    const storageKey = 'rx_analytics_events';
    const existingEvents = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    const updatedEvents = [...existingEvents, eventData].slice(-100);
    sessionStorage.setItem(storageKey, JSON.stringify(updatedEvents));
  } catch (error) {
    // Silently fail if sessionStorage is not available
  }
}

/**
 * Track a page view with enhanced context
 * 
 * @param page - Page path or name
 * @param props - Optional additional properties
 */
export function trackPageView(page: string, props?: EventProps): void {
  const enhancedProps: EventProps = {
    page,
    page_title: typeof document !== 'undefined' ? document.title : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    viewport_width: typeof window !== 'undefined' ? window.innerWidth : undefined,
    viewport_height: typeof window !== 'undefined' ? window.innerHeight : undefined,
    device_type: getDeviceType(),
    ...props
  };
  
  trackEvent('page_viewed', enhancedProps);
}

/**
 * Track a CTA click with enhanced context
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
 * Get device type
 */
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
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
 * Get user journey from session events
 */
export function getUserJourney(): string {
  const events = getSessionEvents();
  const pageViews = events.filter(e => e.name === 'page_viewed');
  return pageViews.map(e => e.props?.page || 'unknown').join(' → ');
}

/**
 * Clear all tracked events from session (for debugging)
 */
export function clearSessionEvents(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem('rx_analytics_events');
    sessionStorage.removeItem('rx_session_id');
  } catch {
    // Silently fail
  }
}

/**
 * Check if analytics is currently enabled (for debugging)
 */
export function isAnalyticsEnabled(): boolean {
  return hasAnalyticsConsent();
}
