import { NextResponse } from 'next/server';

// Accepts web vitals metrics posted by the WebVitals component.
// Returns 200 silently - metrics are not stored.
export async function POST() {
  return NextResponse.json({ ok: true });
}
