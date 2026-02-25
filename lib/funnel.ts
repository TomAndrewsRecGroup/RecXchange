/**
 * Conversion Funnel Tracking System
 * 
 * Defines the conversion funnel stages and calculates drop-off rates
 */

import { AnalyticsEvent } from './analytics';

export type FunnelStage = 
  | 'page_view'
  | 'engagement'
  | 'intent'
  | 'signup'
  | 'activation';

export interface FunnelConfig {
  name: string;
  stages: {
    stage: FunnelStage;
    events: string[];
    description: string;
  }[];
}

/**
 * Recruiter Conversion Funnel
 */
export const recruiterFunnel: FunnelConfig = {
  name: 'Recruiter Conversion Funnel',
  stages: [
    {
      stage: 'page_view',
      events: ['page_viewed'],
      description: 'Initial page visit'
    },
    {
      stage: 'engagement',
      events: [
        'calculator_viewed',
        'fake_engine_viewed',
        'calculator_completed',
        'fake_engine_cv_uploaded'
      ],
      description: 'Engaged with interactive elements'
    },
    {
      stage: 'intent',
      events: [
        'calculator_cta_clicked',
        'fake_engine_result_shown',
        'fake_engine_signup_clicked',
        'cta_clicked'
      ],
      description: 'Showed signup intent'
    },
    {
      stage: 'signup',
      events: [
        'signup_link_clicked',
        'lead_form_submitted'
      ],
      description: 'Started signup process'
    },
    {
      stage: 'activation',
      events: [
        'account_created',
        'first_role_posted',
        'first_candidate_uploaded'
      ],
      description: 'Activated account'
    }
  ]
};

/**
 * Hiring Manager Conversion Funnel
 */
export const hiringManagerFunnel: FunnelConfig = {
  name: 'Hiring Manager Conversion Funnel',
  stages: [
    {
      stage: 'page_view',
      events: ['page_viewed'],
      description: 'Initial page visit'
    },
    {
      stage: 'engagement',
      events: [
        'pricing_page_viewed',
        'roles_page_viewed'
      ],
      description: 'Explored product'
    },
    {
      stage: 'intent',
      events: [
        'cta_clicked'
      ],
      description: 'Clicked CTA'
    },
    {
      stage: 'signup',
      events: [
        'signup_link_clicked',
        'lead_form_submitted'
      ],
      description: 'Started signup'
    },
    {
      stage: 'activation',
      events: [
        'account_created',
        'first_role_posted'
      ],
      description: 'Posted first role'
    }
  ]
};

export interface FunnelMetrics {
  funnel: string;
  period: {
    start: Date;
    end: Date;
  };
  stages: {
    stage: FunnelStage;
    description: string;
    count: number;
    percentage: number;
    dropOff: number;
    dropOffPercentage: number;
  }[];
  totalUsers: number;
  conversionRate: number;
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

  // Count unique users at each stage
  const stageCounts = funnel.stages.map(stage => {
    const stageEvents = filteredEvents.filter(event => 
      stage.events.includes(event.name)
    );
    return {
      stage: stage.stage,
      description: stage.description,
      count: stageEvents.length
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

  return {
    funnel: funnel.name,
    period: {
      start: startDate || new Date(filteredEvents[0]?.timestamp || Date.now()),
      end: endDate || new Date()
    },
    stages,
    totalUsers,
    conversionRate: Math.round(conversionRate * 10) / 10
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
  output += `Period: ${metrics.period.start.toLocaleDateString()} - ${metrics.period.end.toLocaleDateString()}\n`;
  output += `Total Users: ${metrics.totalUsers}\n`;
  output += `Overall Conversion: ${metrics.conversionRate}%\n`;
  output += '\n';

  metrics.stages.forEach((stage, index) => {
    const barWidth = Math.round((stage.count / metrics.totalUsers) * maxWidth);
    const bar = '█'.repeat(barWidth) + '░'.repeat(maxWidth - barWidth);
    
    output += `${index + 1}. ${stage.description}\n`;
    output += `   ${bar} ${stage.count} (${stage.percentage}%)\n`;
    
    if (stage.dropOffPercentage > 0) {
      output += `   ↓ Drop-off: ${stage.dropOff} users (${stage.dropOffPercentage}%)\n`;
    }
    output += '\n';
  });

  return output;
}
