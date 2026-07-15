/**
 * POST /api/indexnow
 *
 * Secured API route to trigger IndexNow URL submissions.
 * Protected by INDEXNOW_SUBMIT_SECRET to prevent abuse.
 *
 * Body options:
 *   { "urls": ["https://recxchange.io/some-page"] }  - submit specific URLs
 *   { "all": true }                                   - submit entire sitemap
 *
 * Example curl:
 *   curl -X POST https://recxchange.io/api/indexnow \
 *     -H "Content-Type: application/json" \
 *     -H "Authorization: Bearer YOUR_SUBMIT_SECRET" \
 *     -d '{"all": true}'
 */

import { NextRequest, NextResponse } from 'next/server';
import { submitAllSitemapUrls, submitUrlsToIndexNow } from '@/lib/indexnow';

export async function POST(req: NextRequest) {
  // Auth check - set INDEXNOW_SUBMIT_SECRET in Vercel env vars
  const authHeader = req.headers.get('authorization');
  const secret = process.env.INDEXNOW_SUBMIT_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: 'Server misconfiguration: INDEXNOW_SUBMIT_SECRET not set' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { urls?: string[]; all?: boolean };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Submit all sitemap URLs
  if (body.all === true) {
    const result = await submitAllSitemapUrls();
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  }

  // Submit specific URLs
  if (Array.isArray(body.urls) && body.urls.length > 0) {
    const result = await submitUrlsToIndexNow(body.urls);
    return NextResponse.json(result, { status: result.success ? 200 : 502 });
  }

  return NextResponse.json(
    { error: 'Provide either { urls: [...] } or { all: true }' },
    { status: 400 }
  );
}
