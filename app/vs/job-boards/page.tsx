import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Job Boards | Indeed, LinkedIn Jobs, Reed Comparison",
  description: "RecXchange vs job boards like Indeed, LinkedIn Jobs, Reed and Totaljobs. Job boards deliver CV volume — RecXchange delivers vetted candidates from 15,000+ specialist recruiters. No CV sifting. No wasted time. Pay only on placement.",
  keywords: [
    "RecXchange vs job boards",
    "job board alternative",
    "Indeed alternative for employers",
    "LinkedIn Jobs alternative",
    "Reed alternative",
    "better than job board",
    "recruiter marketplace vs job board",
    "no CV sifting recruitment"
  ],
  alternates: { canonical: "https://recxchange.io/vs/job-boards" },
  openGraph: {
    title: "RecXchange vs Job Boards | Indeed, LinkedIn Jobs, Reed",
    description: "Job boards give you CVs. RecXchange gives you vetted candidates from 15,000+ specialists. No sifting. Pay only on placement.",
    url: "https://recxchange.io/vs/job-boards",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Job Boards" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Job Boards", description: "Job boards = CV volume. RecXchange = vetted candidates from 15,000+ specialists. No sifting. Pay on placement only.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsJobBoardsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/job-boards#webpage",
    "url": "https://recxchange.io/vs/job-boards",
    "name": "RecXchange vs Job Boards",
    "description": "Comparison of RecXchange versus job boards like Indeed, LinkedIn Jobs and Reed for hiring managers.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Job Boards", "item": "https://recxchange.io/vs/job-boards" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Job Boards</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Job boards like Indeed, LinkedIn Jobs, Reed and Totaljobs were built to generate CV volume. RecXchange was built for something different: qualified candidate submissions from specialist recruiters who have pre-screened, assessed and matched candidates to your specific role before sending a single profile.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Core Difference: Volume vs Quality</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A typical job board posting for a mid-level role generates 80–300 applications. Of those, studies show fewer than 10% are genuinely qualified. That means your hiring team spends days sifting irrelevant CVs before finding viable candidates. RecXchange works the opposite way: only specialist recruiters with a matched candidate can submit — and every submission is reviewed by your dedicated Account Manager before it reaches you.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cost Model: Subscription vs Success Fee</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Job boards charge upfront — you pay whether you hire or not. Indeed, LinkedIn Jobs and Reed all operate on pay-per-click or subscription models that can cost £500–£3,000+ per posting with no guarantee of a hire. RecXchange charges nothing until a candidate is placed. A single success fee of 12–20% is payable only on a confirmed offer acceptance.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Hard-to-Fill Roles: Where Job Boards Fail</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            For specialist, senior or niche roles — the ones that matter most — job boards consistently underperform. Passive candidates (the best ones) don’t apply to job boards. They respond to specialist recruiters with deep sector networks who approach them directly. RecXchange’s 15,000+ specialist recruiters have built exactly these networks over years — and they bring those candidates to your role.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Time Investment: Self-Service vs Managed</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Job boards require you to write the advert, manage applications, screen CVs, chase candidates, and coordinate interviews — all while doing your actual job. RecXchange is fully managed: post your role once, and your dedicated Account Manager handles all recruiter communications, candidate screening, and submission quality control. You only engage when a genuinely qualified candidate is ready to present.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Job Boards</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Cost model", "Success fee on hire only", "Upfront subscription / PPC"],
                  ["Pay if no hire", "No", "Yes"],
                  ["Candidate quality", "Top 1%, pre-screened", "Unfiltered, variable"],
                  ["Volume of applications", "Low, highly relevant", "High, mostly irrelevant"],
                  ["CV sifting required", "No", "Yes — hours of work"],
                  ["Passive candidate access", "Yes — via specialist recruiters", "No"],
                  ["Hard-to-fill roles", "Strong", "Poor"],
                  ["Account Manager", "Dedicated, included", "None"],
                ].map(([factor, rx, jb]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{jb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Stop paying for CVs. Start paying for hires.</p>
            <p className="text-gray-300 text-sm">Post your role on RecXchange. Zero cost until a candidate is placed. No CV sifting. No wasted time.</p>
          </div>
        </div>
      </main>
    </>
  );
}
