/**
 * Unit tests for funnel calculation logic
 * 
 * Run with: npm test
 * 
 * These tests verify the critical funnel metrics calculations
 * used in weekly analytics reports.
 */

import {
  getWeeklyFunnelMetrics,
  recruiterSignupFunnel,
  hiringManagerBookingFunnel,
  type FunnelMetrics,
  type AnalyticsEvent,
} from '@/lib/funnel';

describe('Funnel Calculations', () => {
  describe('getWeeklyFunnelMetrics', () => {
    it('should calculate metrics for empty events', () => {
      const events: AnalyticsEvent[] = [];
      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.totalUsers).toBe(0);
      expect(metrics.conversionRate).toBe(0);
      expect(metrics.stages).toHaveLength(recruiterSignupFunnel.stages.length);
    });

    it('should count unique users across stages', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user2', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user1', timestamp: now + 1000, properties: { page: '/recruiter' } }, // duplicate
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.totalUsers).toBe(2); // Only unique sessions
      expect(metrics.stages[0].count).toBe(2);
    });

    it('should calculate conversion rate correctly', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user2', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user3', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user4', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'signup_completed', session_id: 'user1', timestamp: now + 5000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.totalUsers).toBe(4);
      expect(metrics.conversionRate).toBe(25); // 1 out of 4 = 25%
    });

    it('should handle recruiter signup funnel stages', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'quick_action_form_submitted', session_id: 'user1', timestamp: now + 1000, properties: {} },
        { name: 'signup_started', session_id: 'user1', timestamp: now + 2000, properties: {} },
        { name: 'signup_completed', session_id: 'user1', timestamp: now + 3000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.stages).toHaveLength(4);
      expect(metrics.stages[0].count).toBe(1); // page viewed
      expect(metrics.stages[1].count).toBe(1); // quick action
      expect(metrics.stages[2].count).toBe(1); // signup started
      expect(metrics.stages[3].count).toBe(1); // signup completed
      expect(metrics.conversionRate).toBe(100); // Full funnel completion
    });

    it('should calculate drop-off rates between stages', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user2', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user3', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user4', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'quick_action_form_submitted', session_id: 'user1', timestamp: now + 1000, properties: {} },
        { name: 'quick_action_form_submitted', session_id: 'user2', timestamp: now + 1000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.stages[0].count).toBe(4); // 4 page views
      expect(metrics.stages[1].count).toBe(2); // 2 quick actions
      expect(metrics.stages[0].dropOffRate).toBe(50); // 50% drop-off from stage 1 to 2
    });

    it('should handle hiring manager booking funnel', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'manager1', timestamp: now, properties: { page: '/hiring-manager' } },
        { name: 'demo_requested', session_id: 'manager1', timestamp: now + 1000, properties: {} },
        { name: 'booking_completed', session_id: 'manager1', timestamp: now + 2000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, hiringManagerBookingFunnel);

      expect(metrics.stages).toHaveLength(3);
      expect(metrics.stages[0].count).toBe(1);
      expect(metrics.stages[1].count).toBe(1);
      expect(metrics.stages[2].count).toBe(1);
      expect(metrics.conversionRate).toBe(100);
    });

    it('should only count events within the last 7 days', () => {
      const now = Date.now();
      const eightDaysAgo = now - (8 * 24 * 60 * 60 * 1000);
      const twoDaysAgo = now - (2 * 24 * 60 * 60 * 1000);

      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'old', timestamp: eightDaysAgo, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'recent', timestamp: twoDaysAgo, properties: { page: '/recruiter' } },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      // Should only count recent event
      expect(metrics.totalUsers).toBe(1);
      expect(metrics.stages[0].count).toBe(1);
    });

    it('should handle missing properties gracefully', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: {} }, // Missing page
        { name: 'quick_action_form_submitted', session_id: 'user1', timestamp: now + 1000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      // Should not crash, should handle gracefully
      expect(metrics.stages[0].count).toBeGreaterThanOrEqual(0);
      expect(metrics.stages[1].count).toBeGreaterThanOrEqual(0);
    });

    it('should calculate percentage correctly for partial conversions', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'user1', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user2', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'page_viewed', session_id: 'user3', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'signup_completed', session_id: 'user1', timestamp: now + 5000, properties: {} },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      expect(metrics.conversionRate).toBeCloseTo(33.33, 1); // ~33.33%
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large event sets', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [];
      
      // Generate 10,000 events
      for (let i = 0; i < 10000; i++) {
        events.push({
          name: 'page_viewed',
          session_id: `user${i}`,
          timestamp: now - (i * 1000),
          properties: { page: '/recruiter' },
        });
      }

      const startTime = Date.now();
      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);
      const endTime = Date.now();

      // Should complete in reasonable time (< 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
      expect(metrics.totalUsers).toBeGreaterThan(0);
    });

    it('should handle duplicate session IDs across different events', () => {
      const now = Date.now();
      const events: AnalyticsEvent[] = [
        { name: 'page_viewed', session_id: 'duplicate', timestamp: now, properties: { page: '/recruiter' } },
        { name: 'quick_action_form_submitted', session_id: 'duplicate', timestamp: now + 1000, properties: {} },
        { name: 'page_viewed', session_id: 'duplicate', timestamp: now + 2000, properties: { page: '/pricing' } },
      ];

      const metrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);

      // Should count as one unique user
      expect(metrics.totalUsers).toBe(1);
    });
  });
});
