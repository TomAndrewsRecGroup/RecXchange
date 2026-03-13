#!/usr/bin/env node
// scripts/ping-indexnow.mjs
// Run after every production deployment to notify IndexNow of all pages.
//
// Usage:
//   node scripts/ping-indexnow.mjs
//
// Required env vars:
//   INDEXNOW_KEY   — your IndexNow key (same as the .txt filename in /public)
//
// Add to package.json scripts:
//   "postbuild": "node scripts/ping-indexnow.mjs"
// Or run manually after a Vercel deploy hook fires.

const KEY = process.env.INDEXNOW_KEY;
const BASE_URL = 'https://recxchange.io';

if (!KEY) {
  console.error('❌  INDEXNOW_KEY env var not set. Skipping IndexNow ping.');
  process.exit(0); // Non-fatal — don't break the build
}

const urls = [
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

const payload = {
  host: 'recxchange.io',
  key: KEY,
  keyLocation: `${BASE_URL}/${KEY}.txt`,
  urlList: urls,
};

console.log(`🚀  Pinging IndexNow with ${urls.length} URLs...`);

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log(`✅  IndexNow accepted ${urls.length} URLs (HTTP ${res.status})`);
  } else {
    const text = await res.text();
    console.warn(`⚠️   IndexNow returned HTTP ${res.status}: ${text}`);
  }
} catch (err) {
  console.error('❌  IndexNow ping failed:', err);
  process.exit(0); // Non-fatal
}
