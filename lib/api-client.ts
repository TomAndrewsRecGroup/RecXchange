/**
 * API Client
 * 
 * Centralized client for all RecXchange API calls.
 * Handles error handling, retries, and request/response formatting.
 * 
 * Usage:
 * import { api } from '@/lib/api-client';
 * 
 * const result = await api.quickAction({
 *   email: 'user@example.com',
 *   actionType: 'match_candidate',
 *   source: 'recruiter-page'
 * });
 */

import { logger } from '@/lib/logger';

interface QuickActionRequest {
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
}

interface QuickActionResponse {
  success: boolean;
  message: string;
}

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

interface AnalyticsTrackResponse {
  success: boolean;
  eventId?: string;
}

interface BlogPost {
  id: string;
  content: string;
  publishedAt: string;
  platform: string;
  category?: string;
  mediaUrl?: string;
  tags: string[];
}

interface BlogPostsResponse {
  posts: BlogPost[];
  total: number;
  mock: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = typeof window !== 'undefined'
      ? window.location.origin
      : process.env.NEXT_PUBLIC_BASE_URL || '';
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const duration = Date.now() - startTime;
      logger.api(options.method || 'GET', endpoint, response.status, duration);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          error: 'Unknown error',
        }));
        throw new Error(
          errorData.error || `API error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      logger.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  /**
   * Submit quick action form
   */
  async quickAction(data: QuickActionRequest): Promise<QuickActionResponse> {
    return this.fetch<QuickActionResponse>('/api/quick-action', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Track analytics event
   */
  async trackEvent(
    eventName: string,
    properties?: Record<string, any>
  ): Promise<AnalyticsTrackResponse> {
    return this.fetch<AnalyticsTrackResponse>('/api/analytics/track', {
      method: 'POST',
      body: JSON.stringify({
        name: eventName,
        properties,
      }),
    });
  }

  /**
   * Get blog posts
   */
  async getBlogPosts(
    category?: string,
    limit: number = 20
  ): Promise<BlogPostsResponse> {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('limit', String(limit));

    const queryString = params.toString();
    const endpoint = `/api/blog${queryString ? `?${queryString}` : ''}`;

    return this.fetch<BlogPostsResponse>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get analytics events (for internal use)
   */
  async getAnalyticsEvents(): Promise<{ events: any[] }> {
    return this.fetch<{ events: any[] }>('/api/analytics/track', {
      method: 'GET',
    });
  }

  /**
   * Trigger recruiter funnel email (internal/cron)
   */
  async sendRecruiterFunnelEmail(): Promise<any> {
    return this.fetch('/api/analytics/email-recruiter-funnel', {
      method: 'POST',
    });
  }

  /**
   * Trigger hiring manager funnel email (internal/cron)
   */
  async sendHiringManagerFunnelEmail(): Promise<any> {
    return this.fetch('/api/analytics/email-hiring-manager-funnel', {
      method: 'POST',
    });
  }

  /**
   * Health check endpoint
   */
  async healthCheck(): Promise<{ status: string }> {
    return this.fetch<{ status: string }>('/api/health', {
      method: 'GET',
    });
  }
}

// Export singleton instance
export const api = new ApiClient();

// Export types for external use
export type {
  QuickActionRequest,
  QuickActionResponse,
  AnalyticsEvent,
  AnalyticsTrackResponse,
  BlogPost,
  BlogPostsResponse,
};
