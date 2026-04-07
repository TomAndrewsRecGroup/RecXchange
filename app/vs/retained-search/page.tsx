import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Retained Search | Executive Search Alternative",
  description: "RecXchange vs retained search: retained costs 30-35% with upfront fees. RecXchange delivers senior candidates, no retainer, payment only on placement.",
  keywords: [
    "RecXchange vs retained search",
    "retained search alternative",
    "executive search alternative",
    "no retainer executive hiring",
    "senior recruitment without retainer",
    "headhunter alternative",
    "executive search comparison",
    "RecXchange senior hiring"
  ],
  alternates: { canonical: "https://recxchange.io/vs/retained-search" },
  openGraph: {
    title: "RecXchange vs Retained Search | Executive Search Alternative",
    description: "Retained search costs 30 to 35% + upfront retainer. RecXchange: senior candidate quality, no retainer, pay only on placement.",
    url: "https://recxchange.io/vs/retained-search",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Retained Search" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Retained Search", description: "Retained search = 30 to 35% + upfront retainer. RecXchange = senior quality, no retainer, pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsRetainedSearchPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/retained-search#webpage",
    "url": "https://recxchange.io/vs/retained-search",
    "name": "RecXchange vs Retained Search",
    "description": "Comparison of RecXchange versus retained search and executive search firms for senior hiring.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Retained Search", "item": "https://recxchange.io/vs/retained-search" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Retained Search</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Retained search has long been the gold standard for senior and executive hiring, but it carries a premium price and significant risk. Retainers of 30 to 50% of the total fee are paid upfront, with no guarantee of a placement. RecXchange delivers access to the same quality of senior specialist recruiter networks with a pure success fee model: no retainer, no upfront cost, and payment only when a candidate accepts an offer.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What You Pay: Retained vs Success-Only</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Retained search firms typically charge 30 to 35% of first-year total compensation, structured across three payments: 30 to 50% on engagement, 30 to 35% on shortlist delivery, and the balance on placement. For a £100,000 role, that's £30,000-£35,000 total, with £9,000-£17,500 paid before a single candidate is presented. If the search fails (and searches do fail), you may recover part of the retainer, or nothing. RecXchange charges 12 to 20% payable only on a successful hire.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Senior Candidate Access on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The premise of retained search is exclusive access to a headhunter's deep senior network. RecXchange doesn't have one headhunter, it has 15,000+ specialist recruiters, many of whom are boutique executive search specialists in their sector. For CFO hires, VP Engineering searches, Chief Operating Officers, or any senior role requiring genuine sector depth, RecXchange activates multiple specialist networks simultaneously rather than relying on a single firm's database.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Exclusivity and Commitment</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Retained search requires full exclusivity, no other firms, no parallel process, complete commitment to one search firm for 8 to 16 weeks. RecXchange is non-exclusive. You can run a RecXchange search alongside any other process. And because RecXchange's Xchange Engine matches your role to multiple specialist recruiters simultaneously, the parallel processing is built in, not prohibited.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">When Retained Search Still Makes Sense</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            True C-suite and board-level searches, CEO, Chair, NED appointments, still benefit from a dedicated retained search partner where the relationship management and market mapping elements are as important as the candidate delivery. Below C-suite level, and particularly for VP, Director and Head-of roles, RecXchange consistently delivers comparable candidate quality at 40 to 60% lower cost with no upfront risk.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Retained Search</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Fee %", "12 to 20% success only", "30 to 35% total"],
                  ["Upfront cost", "None", "30 to 50% of total fee"],
                  ["Pay if no hire", "No", "Partial / full retainer lost"],
                  ["Exclusivity required", "No", "Yes, mandatory"],
                  ["Senior network depth", "15,000+ specialist recruiters", "One firm's network"],
                  ["Parallel search", "Built in", "Prohibited"],
                  ["Timeline to shortlist", "48 to 72 hours first submissions", "4 to 8 weeks"],
                  ["Best for", "VP / Director / Head-of level", "CEO / Board / NED"],
                ].map(([factor, rx, ret]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{ret}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Senior quality. Zero retainer.</p>
            <p className="text-gray-300 text-sm">Access 15,000+ specialist recruiter networks for your senior hire. No upfront cost. No exclusivity. Pay only when your candidate starts.</p>
          </div>
        </div>
      </main>
    </>
  );
}
