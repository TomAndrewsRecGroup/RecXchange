import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Contingency Recruitment | A Better Way to Hire",
  description: "RecXchange vs contingency recruitment agencies: contingency means multiple agencies, conflicting candidate submissions, and no accountability. RecXchange is structured contingency — one platform, split fee agreements, deal protection, and a dedicated Account Manager managing quality.",
  keywords: [
    "RecXchange vs contingency recruitment",
    "contingency recruitment alternative",
    "structured contingency recruitment",
    "contingency vs split fee",
    "multiple agency problems",
    "contingency recruiter comparison",
    "recruitment without contingency agency",
    "RecXchange contingency"
  ],
  alternates: { canonical: "https://recxchange.io/vs/contingency-recruitment" },
  openGraph: {
    title: "RecXchange vs Contingency Recruitment",
    description: "Contingency = multiple agencies, CV spamming, no accountability. RecXchange = structured collaboration, deal protection, top 1% candidates only.",
    url: "https://recxchange.io/vs/contingency-recruitment",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Contingency Recruitment" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Contingency Recruitment", description: "Contingency = CV spam, no accountability. RecXchange = structured, deal-protected, top 1% only.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsContingencyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/contingency-recruitment#webpage",
    "url": "https://recxchange.io/vs/contingency-recruitment",
    "name": "RecXchange vs Contingency Recruitment",
    "description": "Comparison of RecXchange versus traditional contingency recruitment for hiring managers.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Contingency Recruitment", "item": "https://recxchange.io/vs/contingency-recruitment" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Comparison</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Contingency Recruitment</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Contingency recruitment — where multiple agencies work a role simultaneously with no upfront fee — sounds like a low-risk option. In practice it creates a race-to-submit dynamic that incentivises speed over quality, floods hiring managers with duplicate CVs, and generates constant recruiter spam. RecXchange is structured contingency: the commercial model is the same (pay only on placement) but the process, quality, and accountability are completely different.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Problem With Traditional Contingency</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When five agencies work the same role on contingency, each recruiter knows their chance of winning the fee is 20% at best — so they optimise for speed, not quality. CVs are submitted without proper screening. The same candidates are sent by multiple agencies simultaneously. Hiring managers waste hours managing duplicate submissions, fielding recruiter check-in calls, and providing feedback that never improves results.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Fixes the Contingency Model</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange preserves the commercial logic of contingency (pay only on placement) while eliminating its structural flaws. The Xchange Engine matches roles to specialist recruiters based on sector, location, and candidate fit — not first-come-first-served. Split fee agreements are set before any candidate data is shared, eliminating the race dynamic. Your dedicated Account Manager filters every submission to top 1% quality before it reaches you.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Deal Protection: No More Disputes</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional contingency generates placement disputes — two agencies claiming the same candidate, arguments over who sent a CV first, threats of legal action. RecXchange's Deal Protection system timestamps and governs every candidate submission in-platform. Split agreements are auto-generated and binding. There are no disputes because the rules are set before a single profile is shared.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Candidate Experience</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            In traditional contingency, the same candidate is often approached by multiple agencies about the same role — a poor experience that damages employer brand. On RecXchange, each candidate is submitted by one recruiter under a single agreed split arrangement. Candidates have a single point of contact and a consistent experience throughout the process.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Traditional Contingency</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Cost model", "Success fee on hire only", "Success fee on hire only"],
                  ["Candidate quality filter", "Top 1% — Account Manager screened", "Unfiltered — speed incentivised"],
                  ["Duplicate CVs", "Prevented by platform", "Common — multiple agencies"],
                  ["Recruiter spam", "None — Account Manager buffer", "High — multiple check-in calls"],
                  ["Placement disputes", "Prevented — Deal Protection", "Common"],
                  ["Candidate experience", "Single contact, consistent", "Multiple approaches, variable"],
                  ["Accountability", "In-platform, auditable", "Low — no consequences"],
                  ["Account Manager", "Dedicated, included", "None"],
                ].map(([factor, rx, cont]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{cont}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Contingency that actually works.</p>
            <p className="text-gray-300 text-sm">Same pay-on-placement model. Better candidates. No duplicates. No spam. No disputes. Just placements.</p>
          </div>
        </div>
      </main>
    </>
  );
}
