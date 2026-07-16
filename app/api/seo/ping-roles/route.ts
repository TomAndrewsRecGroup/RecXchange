import { NextRequest, NextResponse } from 'next/server';
import { getRoles } from '@/lib/roles/fetch';
import {
  isGoogleIndexingConfigured,
  notifyGoogleIndexing,
} from '@/lib/seo/google-indexing';
import { submitUrlsToIndexNow } from '@/lib/indexnow';

/**
 * Pings search engines about the current live roles:
 * - Google Indexing API (JobPosting fast-lane into Google Jobs)
 * - IndexNow (Bing / Copilot / Yandex)
 *
 * Invoked daily by Vercel Cron (see vercel.json). Can also be triggered
 * manually with the same bearer secret.
 */

export const maxDuration = 60;

const BASE_URL = 'https://recxchange.io';

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return request.headers.get('authorization') === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { roles, demo } = await getRoles();
  const urls = [
    `${BASE_URL}/roles`,
    ...roles.map((role) => `${BASE_URL}/roles/${role.id}`),
  ];

  const indexNow = await submitUrlsToIndexNow(urls);

  let google: { attempted: boolean; succeeded?: number; failed?: number } = {
    attempted: false,
  };
  if (isGoogleIndexingConfigured()) {
    const results = await notifyGoogleIndexing(urls);
    google = {
      attempted: true,
      succeeded: results.filter((r) => r.ok).length,
      failed: results.filter((r) => !r.ok).length,
    };
  }

  return NextResponse.json({
    urls: urls.length,
    liveData: !demo,
    indexNow: indexNow.success,
    google,
  });
}
