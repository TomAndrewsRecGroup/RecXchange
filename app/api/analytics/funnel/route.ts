import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/lib/analytics';
import { 
  recruiterSignupFunnel, 
  hiringManagerBookingFunnel,
  calculateFunnelMetrics,
  getWeeklyFunnelMetrics 
} from '@/lib/funnel';

/**
 * GET /api/analytics/funnel
 * 
 * Returns funnel metrics for specified funnel type and date range
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'recruiter';
    const startDate = searchParams.get('start');
    const endDate = searchParams.get('end');
    const weekly = searchParams.get('weekly') === 'true';

    // Get events from storage (in production, query database)
    const eventsResponse = await fetch(
      new URL('/api/analytics/track', request.url).toString()
    );
    const { events } = await eventsResponse.json();

    // Select funnel configuration
    const funnel = type === 'hiring-manager' ? hiringManagerBookingFunnel : recruiterSignupFunnel;

    // Calculate metrics
    let metrics;
    if (weekly) {
      metrics = getWeeklyFunnelMetrics(events, funnel);
    } else {
      const start = startDate ? new Date(startDate) : undefined;
      const end = endDate ? new Date(endDate) : undefined;
      metrics = calculateFunnelMetrics(events, funnel, start, end);
    }

    return NextResponse.json(metrics);
  } catch (error) {
    console.error('[Funnel API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to calculate funnel metrics' },
      { status: 500 }
    );
  }
}
