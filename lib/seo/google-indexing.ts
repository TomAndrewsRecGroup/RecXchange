import crypto from 'crypto';

/**
 * Google Indexing API client (zero dependencies).
 *
 * The Indexing API is Google's sanctioned fast-lane for JobPosting pages:
 * job boards use it to get postings into Google Jobs within minutes instead
 * of waiting days for a crawl. It requires a service account that has been
 * added as an Owner in Search Console.
 *
 * Env vars:
 * - GOOGLE_INDEXING_CLIENT_EMAIL: service account email
 * - GOOGLE_INDEXING_PRIVATE_KEY:  service account private key (PEM; \n-escaped)
 *
 * Setup is documented in docs/SEO-OPERATIONS.md.
 */

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const PUBLISH_URL =
  'https://indexing.googleapis.com/v3/urlNotifications:publish';
const SCOPE = 'https://www.googleapis.com/auth/indexing';

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function getCredentials(): { email: string; key: string } | null {
  const email = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const key = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, '\n');
  if (!email || !key) return null;
  return { email, key };
}

export function isGoogleIndexingConfigured(): boolean {
  return getCredentials() !== null;
}

async function getAccessToken(): Promise<string | null> {
  const creds = getCredentials();
  if (!creds) return null;

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: creds.email,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );

  const signature = crypto
    .createSign('RSA-SHA256')
    .update(`${header}.${claims}`)
    .sign(creds.key);
  const jwt = `${header}.${claims}.${base64url(signature)}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    console.error(
      '[google-indexing] Token exchange failed:',
      res.status,
      await res.text()
    );
    return null;
  }

  const data = (await res.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export interface IndexingResult {
  url: string;
  ok: boolean;
  status?: number;
}

/**
 * Notify Google that the given URLs were updated (or deleted).
 * Returns per-URL results; never throws.
 */
export async function notifyGoogleIndexing(
  urls: string[],
  type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'
): Promise<IndexingResult[]> {
  if (urls.length === 0) return [];

  const token = await getAccessToken();
  if (!token) {
    return urls.map((url) => ({ url, ok: false }));
  }

  const results: IndexingResult[] = [];
  for (const url of urls) {
    try {
      const res = await fetch(PUBLISH_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, type }),
      });
      results.push({ url, ok: res.ok, status: res.status });
      if (!res.ok) {
        console.error(
          `[google-indexing] ${res.status} for ${url}:`,
          await res.text()
        );
      }
    } catch (error) {
      console.error(`[google-indexing] Request failed for ${url}:`, error);
      results.push({ url, ok: false });
    }
  }
  return results;
}
