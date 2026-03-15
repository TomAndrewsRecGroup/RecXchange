/**
 * IndexNow utility for RecXchange
 *
 * IndexNow is a free protocol supported by Bing, Yandex, and other engines.
 * Submitting a URL here tells participating engines to re-crawl it immediately.
 *
 * Set INDEXNOW_API_KEY in your Vercel environment variables.
 * The key file must be hosted at: https://recxchange.io/{key}.txt
 */

const BASE_URL = 'https://recxchange.io';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

export async function submitUrlsToIndexNow(urls: string[]): Promise<{
  success: boolean;
  status?: number;
  error?: string;
}> {
  const key = process.env.INDEXNOW_API_KEY;

  if (!key) {
    console.error('[IndexNow] INDEXNOW_API_KEY env variable is not set.');
    return { success: false, error: 'Missing INDEXNOW_API_KEY' };
  }

  if (!urls.length) {
    return { success: false, error: 'No URLs provided' };
  }

  const body = {
    host: 'recxchange.io',
    key,
    keyLocation: `${BASE_URL}/${key}.txt`,
    urlList: urls,
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      console.log(`[IndexNow] Successfully submitted ${urls.length} URL(s). Status: ${res.status}`);
      return { success: true, status: res.status };
    } else {
      const text = await res.text();
      console.error(`[IndexNow] Submission failed. Status: ${res.status}`, text);
      return { success: false, status: res.status, error: text };
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[IndexNow] Network error:', message);
    return { success: false, error: message };
  }
}

/**
 * Convenience: submit a single URL
 */
export async function submitUrlToIndexNow(url: string) {
  return submitUrlsToIndexNow([url]);
}

/**
 * Submit all sitemap URLs at once (useful for initial setup or full resubmit).
 * Import the URL list from sitemap.ts to keep a single source of truth.
 */
export async function submitAllSitemapUrls(): Promise<{
  success: boolean;
  status?: number;
  error?: string;
}> {
  // All canonical URLs from app/sitemap.ts
  const baseUrl = 'https://recxchange.io';
  const allUrls = [
    baseUrl,
    `${baseUrl}/recruiter`,
    `${baseUrl}/collaboration`,
    `${baseUrl}/recruiter-roles`,
    `${baseUrl}/recruiters-with-candidates`,
    `${baseUrl}/how-recruiter-collaboration-works`,
    `${baseUrl}/how-to-find-recruitment-partners`,
    `${baseUrl}/what-is-split-fee-recruitment`,
    `${baseUrl}/what-is-recx-direct`,
    `${baseUrl}/recruitment-fee-structures`,
    `${baseUrl}/hiring-manager-home`,
    `${baseUrl}/hiring-manager-live`,
    `${baseUrl}/hiring-manager-strategic`,
    `${baseUrl}/account-management`,
    `${baseUrl}/pricing`,
    `${baseUrl}/why-recxchange`,
    `${baseUrl}/split-fees`,
    `${baseUrl}/deal-protection`,
    `${baseUrl}/faq`,
    `${baseUrl}/roles`,
    `${baseUrl}/affiliate`,
    `${baseUrl}/contact`,
    `${baseUrl}/research`,
    `${baseUrl}/split-fee-recruitment`,
    `${baseUrl}/recruiter-collaboration-platform`,
    `${baseUrl}/hire-specialist-recruiters`,
    `${baseUrl}/recruitment-marketplace`,
    `${baseUrl}/passive-candidate-sourcing`,
    `${baseUrl}/sectors/technology-recruitment`,
    `${baseUrl}/sectors/engineering-recruitment`,
    `${baseUrl}/sectors/healthcare-recruitment`,
    `${baseUrl}/sectors/finance-recruitment`,
    `${baseUrl}/sectors/sales-recruitment`,
    `${baseUrl}/sectors/hr-recruitment`,
    `${baseUrl}/sectors/legal-recruitment`,
    `${baseUrl}/sectors/construction-recruitment`,
    `${baseUrl}/locations/recruitment-london`,
    `${baseUrl}/locations/recruitment-manchester`,
    `${baseUrl}/locations/recruitment-birmingham`,
    `${baseUrl}/locations/recruitment-usa`,
    `${baseUrl}/locations/recruitment-uae`,
    `${baseUrl}/locations/recruitment-australia`,
    `${baseUrl}/vs/recxchange-vs-linkedin-recruiter`,
    `${baseUrl}/vs/recxchange-vs-indeed`,
    `${baseUrl}/vs/recxchange-vs-traditional-agency`,
    `${baseUrl}/vs/recxchange-vs-retained-search`,
    `${baseUrl}/vs/recxchange-vs-rpo`,
    `${baseUrl}/vs/recxchange-vs-job-boards`,
    `${baseUrl}/vs/recxchange-vs-in-house-recruiter`,
    `${baseUrl}/vs/recxchange-vs-headhunter`,
    `${baseUrl}/use-cases`,
    `${baseUrl}/use-cases/scale-up-hiring`,
    `${baseUrl}/use-cases/hard-to-fill-roles`,
    `${baseUrl}/use-cases/senior-executive-search`,
    `${baseUrl}/use-cases/contract-recruitment`,
    `${baseUrl}/use-cases/volume-hiring`,
    `${baseUrl}/use-cases/international-hiring`,
    `${baseUrl}/blog`,
    `${baseUrl}/blog/what-is-split-fee-recruitment`,
    `${baseUrl}/blog/how-to-fill-hard-to-fill-roles`,
    `${baseUrl}/blog/split-fee-vs-contingency-recruitment`,
    `${baseUrl}/blog/how-split-fee-recruitment-works-for-hiring-managers`,
    `${baseUrl}/blog/recruiter-collaboration-guide`,
    `${baseUrl}/blog/reduce-cost-per-hire`,
    `${baseUrl}/blog/xchange-engine-explained`,
    `${baseUrl}/blog/recruitment-trends-2026`,
    `${baseUrl}/blog/how-to-choose-a-recruitment-partner`,
  ];

  // IndexNow accepts max 10,000 URLs per request, batch to be safe
  const BATCH_SIZE = 100;
  for (let i = 0; i < allUrls.length; i += BATCH_SIZE) {
    const batch = allUrls.slice(i, i + BATCH_SIZE);
    const result = await submitUrlsToIndexNow(batch);
    if (!result.success) return result;
  }

  return { success: true };
}
