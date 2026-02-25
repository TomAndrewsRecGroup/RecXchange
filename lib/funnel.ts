/**
 * Conversion Funnel Tracking System
 * 
 * Defines detailed conversion funnels for:
 * 1. Recruiters: Full signup journey
 * 2. Hiring Managers: Book 30-minute call journey
 */

import { AnalyticsEvent } from './analytics';

export type FunnelStage = 
  | 'arrival'
  | 'discovery'
  | 'problem_identification'
  | 'solution_exploration'
  | 'intent'
  | 'conversion_attempt'
  | 'conversion_complete'
  | 'activation';

export interface FunnelConfig {
  name: string;
  description: string;
  stages: {
    stage: FunnelStage;
    events: string[];
    description: string;
    keyQuestions: string[];
  }[];
}

/**
 * RECRUITER FUNNEL: Join RecXchange Platform
 * 
 * Tracks the complete journey from landing to becoming an active recruiter
 */
export const recruiterSignupFunnel: FunnelConfig = {
  name: 'Recruiter Signup Funnel',
  description: 'Tracks recruiters from first visit to active platform usage',
  stages: [
    {
      stage: 'arrival',
      events: [
        'page_viewed',
        'landing_page_viewed',
        'external_referral',
        'direct_visit',
        'search_engine_visit',
        'social_media_visit'
      ],
      description: 'WHERE: Initial arrival on site',
      keyQuestions: [
        'What brought them here?',
        'Which page did they land on?',
        'What was their referral source?'
      ]
    },
    {
      stage: 'discovery',
      events: [
        'scroll_depth_25',
        'scroll_depth_50',
        'nav_link_clicked',
        'time_on_page_30s',
        'roles_page_viewed',
        'how_it_works_viewed',
        'features_section_viewed'
      ],
      description: 'WHAT ROUTE: Exploring the platform',
      keyQuestions: [
        'What pages did they visit?',
        'How deep did they scroll?',
        'Which features caught their attention?'
      ]
    },
    {
      stage: 'problem_identification',
      events: [
        'calculator_viewed',
        'calculator_started',
        'fake_engine_viewed',
        'pricing_page_viewed',
        'faq_section_viewed',
        'faq_item_clicked',
        'comparison_table_viewed'
      ],
      description: 'WHAT PROBLEMS: Understanding pain points',
      keyQuestions: [
        'What questions did they have?',
        'What concerns were they researching?',
        'Which FAQs did they open?'
      ]
    },
    {
      stage: 'solution_exploration',
      events: [
        'calculator_completed',
        'calculator_result_viewed',
        'fake_engine_cv_uploaded',
        'fake_engine_result_shown',
        'demo_video_played',
        'case_study_viewed',
        'benefits_section_viewed',
        'testimonial_section_viewed'
      ],
      description: 'WHAT ANSWERS: Seeing how RecXchange solves their problems',
      keyQuestions: [
        'What convinced them this works?',
        'Which proof points resonated?',
        'What value did they calculate?'
      ]
    },
    {
      stage: 'intent',
      events: [
        'calculator_cta_clicked',
        'fake_engine_signup_clicked',
        'hero_cta_clicked',
        'mid_page_cta_clicked',
        'bottom_cta_clicked',
        'signup_intent_shown',
        'cta_clicked'
      ],
      description: 'WHAT CONVERTED: Decision to sign up',
      keyQuestions: [
        'What triggered the signup intent?',
        'Which CTA did they click?',
        'What was the conversion trigger?'
      ]
    },
    {
      stage: 'conversion_attempt',
      events: [
        'signup_link_clicked',
        'signup_form_viewed',
        'signup_form_started',
        'signup_form_field_completed',
        'form_field_error',
        'form_abandoned'
      ],
      description: 'CONVERSION PATH: Completing signup form',
      keyQuestions: [
        'Did they complete the form?',
        'Where did they get stuck?',
        'What errors did they encounter?'
      ]
    },
    {
      stage: 'conversion_complete',
      events: [
        'signup_form_submitted',
        'signup_completed',
        'account_created'
      ],
      description: 'SUCCESS: Account created',
      keyQuestions: [
        'How long did signup take?',
        'Did they complete it in one session?'
      ]
    },
    {
      stage: 'activation',
      events: [
        'onboarding_started',
        'onboarding_completed',
        'first_role_viewed',
        'first_candidate_uploaded',
        'first_match_received'
      ],
      description: 'ACTIVATION: Active platform usage',
      keyQuestions: [
        'Did they complete onboarding?',
        'Did they upload a candidate?',
        'Are they actively using the platform?'
      ]
    }
  ]
};

/**
 * HIRING MANAGER FUNNEL: Book 30-Minute Call
 * 
 * Tracks the journey from landing to booking a consultation call
 */
export const hiringManagerBookingFunnel: FunnelConfig = {
  name: 'Hiring Manager Call Booking Funnel',
  description: 'Tracks hiring managers from first visit to booking a 30-minute consultation',
  stages: [
    {
      stage: 'arrival',
      events: [
        'page_viewed',
        'landing_page_viewed',
        'external_referral',
        'direct_visit',
        'search_engine_visit',
        'social_media_visit'
      ],
      description: 'WHERE: Initial arrival on site',
      keyQuestions: [
        'What brought them here?',
        'Which hiring manager page did they land on?',
        'What was their referral source?'
      ]
    },
    {
      stage: 'discovery',
      events: [
        'scroll_depth_25',
        'scroll_depth_50',
        'scroll_depth_75',
        'nav_link_clicked',
        'time_on_page_30s',
        'time_on_page_60s',
        'how_it_works_viewed',
        'features_section_viewed'
      ],
      description: 'WHAT ROUTE: Understanding the service',
      keyQuestions: [
        'What pages did they visit?',
        'How engaged were they?',
        'Which sections did they spend time on?'
      ]
    },
    {
      stage: 'problem_identification',
      events: [
        'pricing_page_viewed',
        'pricing_details_viewed',
        'faq_section_viewed',
        'faq_item_clicked',
        'comparison_table_viewed',
        'testimonial_section_viewed'
      ],
      description: 'WHAT PROBLEMS: Researching recruitment solutions',
      keyQuestions: [
        'What concerns did they research?',
        'What questions did they have about pricing?',
        'Which FAQs did they click?'
      ]
    },
    {
      stage: 'solution_exploration',
      events: [
        'demo_video_played',
        'demo_video_completed',
        'case_study_viewed',
        'benefits_section_viewed',
        'how_it_works_viewed'
      ],
      description: 'WHAT ANSWERS: Understanding how RecXchange helps',
      keyQuestions: [
        'Did they watch the demo?',
        'Which benefits resonated?',
        'What proof points convinced them?'
      ]
    },
    {
      stage: 'intent',
      events: [
        'book_call_intent_shown',
        'book_call_cta_clicked',
        'hero_cta_clicked',
        'mid_page_cta_clicked',
        'bottom_cta_clicked',
        'cta_clicked'
      ],
      description: 'WHAT CONVERTED: Decision to book a call',
      keyQuestions: [
        'What triggered the booking intent?',
        'Which CTA convinced them?',
        'What was the final push?'
      ]
    },
    {
      stage: 'conversion_attempt',
      events: [
        'calendly_widget_opened',
        'calendly_date_selected',
        'calendly_time_selected',
        'calendly_form_started',
        'form_field_error',
        'form_abandoned'
      ],
      description: 'CONVERSION PATH: Booking the call via Calendly',
      keyQuestions: [
        'Did they select a time?',
        'Where did they drop off?',
        'What prevented completion?'
      ]
    },
    {
      stage: 'conversion_complete',
      events: [
        'calendly_form_completed',
        'call_booking_confirmed',
        'calendar_invite_sent'
      ],
      description: 'SUCCESS: Call booked',
      keyQuestions: [
        'How long did booking take?',
        'What time/date did they choose?',
        'How far in advance did they book?'
      ]
    },
    {
      stage: 'activation',
      events: [
        'call_reminder_clicked',
        'account_created',
        'first_role_viewed'
      ],
      description: 'ACTIVATION: Call attended and account created',
      keyQuestions: [
        'Did they attend the call?',
        'Did they create an account after?',
        'Are they active on the platform?'
      ]
    }
  ]
};

export interface FunnelMetrics {
  funnel: string;
  description: string;
  period: {
    start: Date;
    end: Date;
  };
  stages: {
    stage: FunnelStage;
    description: string;
    keyQuestions: string[];
    count: number;
    percentage: number;
    dropOff: number;
    dropOffPercentage: number;
    topEvents: { event: string; count: number }[];
  }[];
  totalUsers: number;
  conversionRate: number;
  insights: {
    biggestDropOff: { stage: string; percentage: number };
    averageTimeToConvert?: number;
    topConversionTriggers: string[];
  };
}

/**
 * Calculate funnel metrics from analytics events
 */
export function calculateFunnelMetrics(
  events: AnalyticsEvent[],
  funnel: FunnelConfig,
  startDate?: Date,
  endDate?: Date
): FunnelMetrics {
  // Filter events by date range if provided
  let filteredEvents = events;
  if (startDate || endDate) {
    filteredEvents = events.filter(event => {
      const eventDate = event.timestamp ? new Date(event.timestamp) : new Date();
      if (startDate && eventDate < startDate) return false;
      if (endDate && eventDate > endDate) return false;
      return true;
    });
  }

  // Count unique sessions at each stage
  const stageCounts = funnel.stages.map(stage => {
    const stageEvents = filteredEvents.filter(event => 
      stage.events.includes(event.name)
    );
    
    // Count unique sessions
    const uniqueSessions = new Set(stageEvents.map(e => e.session_id)).size;
    
    // Get top events for this stage
    const eventCounts = stage.events.map(eventName => ({
      event: eventName,
      count: stageEvents.filter(e => e.name === eventName).length
    })).sort((a, b) => b.count - a.count).slice(0, 3);
    
    return {
      stage: stage.stage,
      description: stage.description,
      keyQuestions: stage.keyQuestions,
      count: uniqueSessions,
      topEvents: eventCounts
    };
  });

  const totalUsers = stageCounts[0]?.count || 0;

  // Calculate percentages and drop-offs
  const stages = stageCounts.map((current, index) => {
    const previous = index > 0 ? stageCounts[index - 1] : null;
    const percentage = totalUsers > 0 ? (current.count / totalUsers) * 100 : 0;
    const dropOff = previous ? previous.count - current.count : 0;
    const dropOffPercentage = previous && previous.count > 0 
      ? (dropOff / previous.count) * 100 
      : 0;

    return {
      ...current,
      percentage: Math.round(percentage * 10) / 10,
      dropOff,
      dropOffPercentage: Math.round(dropOffPercentage * 10) / 10
    };
  });

  const lastStage = stages[stages.length - 1];
  const conversionRate = totalUsers > 0 && lastStage
    ? (lastStage.count / totalUsers) * 100
    : 0;

  // Find biggest drop-off
  const biggestDropOff = stages.reduce((max, stage) => 
    stage.dropOffPercentage > max.percentage 
      ? { stage: stage.description, percentage: stage.dropOffPercentage }
      : max,
    { stage: '', percentage: 0 }
  );

  // Get top conversion triggers (events that happened before conversion)
  const conversionEvents = funnel.stages[funnel.stages.length - 2]?.events || [];
  const topTriggers = conversionEvents.slice(0, 3);

  return {
    funnel: funnel.name,
    description: funnel.description,
    period: {
      start: startDate || new Date(filteredEvents[0]?.timestamp || Date.now()),
      end: endDate || new Date()
    },
    stages,
    totalUsers,
    conversionRate: Math.round(conversionRate * 10) / 10,
    insights: {
      biggestDropOff,
      topConversionTriggers: topTriggers
    }
  };
}

/**
 * Get last 7 days of funnel data
 */
export function getWeeklyFunnelMetrics(
  events: AnalyticsEvent[],
  funnel: FunnelConfig
): FunnelMetrics {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 7);

  return calculateFunnelMetrics(events, funnel, startDate, endDate);
}

/**
 * Generate ASCII funnel visualization for email
 */
export function generateFunnelASCII(metrics: FunnelMetrics): string {
  const maxWidth = 50;
  let output = '';

  output += `\n${metrics.funnel}\n`;
  output += `${metrics.description}\n`;
  output += `Period: ${metrics.period.start.toLocaleDateString()} - ${metrics.period.end.toLocaleDateString()}\n`;
  output += `Total Users: ${metrics.totalUsers}\n`;
  output += `Overall Conversion: ${metrics.conversionRate}%\n`;
  output += '\n';

  metrics.stages.forEach((stage, index) => {
    const barWidth = Math.round((stage.count / metrics.totalUsers) * maxWidth);
    const bar = '█'.repeat(barWidth) + '░'.repeat(maxWidth - barWidth);
    
    output += `${index + 1}. ${stage.description}\n`;
    output += `   ${bar} ${stage.count} users (${stage.percentage}%)\n`;
    
    if (stage.topEvents.length > 0) {
      output += `   Top events: ${stage.topEvents.map(e => e.event).join(', ')}\n`;
    }
    
    if (stage.dropOffPercentage > 0) {
      output += `   ↓ Drop-off: ${stage.dropOff} users (${stage.dropOffPercentage}%)\n`;
    }
    output += '\n';
  });

  output += `\nInsights:\n`;
  output += `- Biggest drop-off: ${metrics.insights.biggestDropOff.stage} (${metrics.insights.biggestDropOff.percentage}%)\n`;
  output += `- Top conversion triggers: ${metrics.insights.topConversionTriggers.join(', ')}\n`;

  return output;
}
