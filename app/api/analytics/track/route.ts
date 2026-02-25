import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/lib/analytics';

/**
 * POST /api/analytics/track
 * 
 * Receives analytics events from the frontend and stores them
 * Currently stores in memory - in production, write to database
 */

// In-memory storage (replace with database in production)
let eventStore: AnalyticsEvent[] = [];
const MAX_EVENTS = 10000; // Keep last 10k events

export async function POST(request: NextRequest) {
  try {
    const event: AnalyticsEvent = await request.json();

    // Validate event structure
    if (!event.name || !event.timestamp) {
      return NextResponse.json(
        { error: 'Invalid event structure' },
        { status: 400 }
      );
    }

    // Add to event store
    eventStore.push(event);

    // Keep only last MAX_EVENTS
    if (eventStore.length > MAX_EVENTS) {
      eventStore = eventStore.slice(-MAX_EVENTS);
    }

    // In production, write to database here:
    // await db.analytics.create({
    //   data: {
    //     name: event.name,
    //     props: event.props,
    //     timestamp: new Date(event.timestamp)
    //   }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const since = searchParams.get('since');
    const eventName = searchParams.get('event');

    let events = [...eventStore];

    // Filter by date if provided
    if (since) {
      const sinceDate = new Date(since).getTime();
      events = events.filter(e => (e.timestamp || 0) >= sinceDate);
    }

    // Filter by event name if provided
    if (eventName) {
      events = events.filter(e => e.name === eventName);
    }

    return NextResponse.json({
      events,
      count: events.length,
      total: eventStore.length
    });
  } catch (error) {
    console.error('[Analytics API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve events' },
      { status: 500 }
    );
  }
}
