import { NextResponse } from 'next/server';

// IndexNow API route — POST to this endpoint to notify Bing/Yandex/IndexNow
// network of new or updated URLs instantly.
// Internal use only — secured by INDEXNOW_KEY env var.
//
// Usage (from post-build script or on-demand):
//   POST /api/indexnow
//   Body: { urls: string[] }  — optional, defaults to full sitemap URL list
//   Header: x-api-key: <INDEXNOW_KEY>

const BASE_URL = 'https://recxchange.io';

const ALL_URLS = [
  `${BASE_URL}/`,
  `${BASE_URL}/recruiter`,
  `${BASE_URL}/hiring-manager-home`,
  `${BASE_URL}/collaboration`,
  `${BASE_URL}/recruiter-roles`,
  `${BASE_URL}/recruiters-with-candidates`,
  `${BASE_URL}/how-recruiter-collaboration-works`,
  `${BASE_URL}/how-to-find-recruitment-partners`,
  `${BASE_URL}/what-is-split-fee-recruitment`,
  `${BASE_URL}/what-is-recx-direct`,
  `${BASE_URL}/recruitment-fee-structures`,
  `${BASE_URL}/hiring-manager-live`,
  `${BASE_URL}/hiring-manager-strategic`,
  `${BASE_URL}/account-management`,
  `${BASE_URL}/pricing`,
  `${BASE_URL}/why-recxchange`,
  `${BASE_URL}/split-fees`,
  `${BASE_URL}/deal-protection`,
  `${BASE_URL}/faq`,
  `${BASE_URL}/roles`,
  `${BASE_URL}/affiliate`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/research`,
  `${BASE_URL}/split-fee-recruitment`,
  `${BASE_URL}/recruiter-collaboration-platform`,
  `${BASE_URL}/hire-specialist-recruiters`,
  `${BASE_URL}/recruitment-marketplace`,
  `${BASE_URL}/passive-candidate-sourcing`,
  `${BASE_URL}/sectors/technology-recruitment`,
  `${BASE_URL}/sectors/engineering-recruitment`,
  `${BASE_URL}/sectors/healthcare-recruitment`,
  `${BASE_URL}/sectors/finance-recruitment`,
  `${BASE_URL}/sectors/sales-recruitment`,
  `${BASE_URL}/sectors/hr-recruitment`,
  `${BASE_URL}/sectors/legal-recruitment`,
  `${BASE_URL}/sectors/construction-recruitment`,
  `${BASE_URL}/locations/recruitment-london`,
  `${BASE_URL}/locations/recruitment-manchester`,
  `${BASE_URL}/locations/recruitment-birmingham`,
  `${BASE_URL}/locations/recruitment-usa`,
  `${BASE_URL}/locations/recruitment-uae`,
  `${BASE_URL}/locations/recruitment-australia`,
  `${BASE_URL}/vs/recxchange-vs-linkedin-recruiter`,
  `${BASE_URL}/vs/recxchange-vs-indeed`,
  `${BASE_URL}/vs/recxchange-vs-traditional-agency`,
  `${BASE_URL}/vs/recxchange-vs-retained-search`,
  `${BASE_URL}/vs/recxchange-vs-rpo`,
  `${BASE_URL}/vs/recxchange-vs-job-boards`,
  `${BASE_URL}/vs/recxchange-vs-in-house-recruiter`,
  `${BASE_URL}/vs/recxchange-vs-headhunter`,
  `${BASE_URL}/use-cases`,
  `${BASE_URL}/use-cases/scale-up-hiring`,
  `${BASE_URL}/use-cases/hard-to-fill-roles`,
  `${BASE_URL}/use-cases/senior-executive-search`,
  `${BASE_URL}/use-cases/contract-recruitment`,
  `${BASE_URL}/use-cases/volume-hiring`,
  `${BASE_URL}/use-cases/international-hiring`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/what-is-split-fee-recruitment`,
  `${BASE_URL}/blog/how-to-fill-hard-to-fill-roles`,
  `${BASE_URL}/blog/split-fee-vs-contingency-recruitment`,
  `${BASE_URL}/blog/how-split-fee-recruitment-works-for-hiring-managers`,
  `${BASE_URL}/blog/recruiter-collaboration-guide`,
  `${BASE_URL}/blog/reduce-cost-per-hire`,
  `${BASE_URL}/blog/xchange-engine-explained`,
  `${BASE_URL}/blog/recruitment-trends-2026`,
  `${BASE_URL}/blog/how-to-choose-a-recruitment-partner`,
];

export async function POST(request: Request) {
  const apiKey = process.env.INDEXNOW_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'INDEXNOW_KEY environment variable not set' },
      { status: 500 }
    );
  }

  // Validate internal caller
  const callerKey = request.headers.get('x-api-key');
  if (callerKey !== apiKey) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  let urlsToSubmit: string[] = ALL_URLS;

  try {
    const body = await request.json();
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urlsToSubmit = body.urls;
    }
  } catch {
    // No body or invalid JSON — use full list
  }

  const payload = {
    host: 'recxchange.io',
    key: apiKey,
    keyLocation: `${BASE_URL}/${apiKey}.txt`,
    urlList: urlsToSubmit,
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    });

    return NextResponse.json(
      {
        success: res.ok,
        status: res.status,
        urlsSubmitted: urlsToSubmit.length,
        message: res.ok
          ? `Successfully pinged IndexNow with ${urlsToSubmit.length} URLs`
          : `IndexNow returned ${res.status}`,
      },
      { status: res.ok ? 200 : 502 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to reach IndexNow API', detail: String(err) },
      { status: 500 }
    );
  }
}
