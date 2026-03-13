import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee vs Contingency Recruitment: What's the Difference? | RecXchange",
  description: "Split fee recruitment vs contingency recruitment: understanding the key differences, the commercial incentives, and why structured split fee models consistently outperform traditional contingency for specialist and senior hiring. A practical guide for recruiters and hiring managers.",
  keywords: [
    "split fee vs contingency recruitment",
    "contingency vs split fee",
    "difference between split fee and contingency",
    "split fee recruitment benefits",
    "contingency recruitment problems",
    "split placement vs contingency",
    "recruitment model comparison",
    "split fee recruiter guide"
  ],
  alternates: { canonical: "https://recxchange.io/blog/split-fee-vs-contingency-recruitment" },
  openGraph: {
    title: "Split Fee vs Contingency Recruitment: What's the Difference?",
    description: "Split fee vs contingency: key differences, commercial incentives, and why split fee consistently outperforms for specialist hiring.",
    url: "https://recxchange.io/blog/split-fee-vs-contingency-recruitment",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Split Fee vs Contingency Recruitment" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee vs Contingency Recruitment", description: "Key differences, commercial incentives, and why split fee outperforms for specialist hiring.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function SplitFeeVsContingencyPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/blog/split-fee-vs-contingency-recruitment#article",
    "url": "https://recxchange.io/blog/split-fee-vs-contingency-recruitment",
    "headline": "Split Fee vs Contingency Recruitment: What's the Difference?",
    "description": "A practical guide to the differences between split fee and contingency recruitment for recruiters and hiring managers.",
    "author": { "@type": "Organization", "name": "RecXchange", "url": "https://recxchange.io" },
    "publisher": { "@type": "Organization", "name": "RecXchange", "logo": { "@type": "ImageObject", "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png" } },
    "datePublished": "2025-03-01",
    "dateModified": "2026-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://recxchange.io/blog/split-fee-vs-contingency-recruitment" },
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://recxchange.io/blog" },
        { "@type": "ListItem", "position": 3, "name": "Split Fee vs Contingency Recruitment", "item": "https://recxchange.io/blog/split-fee-vs-contingency-recruitment" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-3xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Guide</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee vs Contingency Recruitment: What&apos;s the Difference?</h1>
          <p className="text-gray-400 text-sm mb-10">Last updated: March 2026 &nbsp;·&nbsp; 9 min read</p>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            Both split fee and contingency recruitment operate on a pay-on-placement basis — no hire, no fee. But the structural differences between the two models are significant, and they produce very different outcomes for hiring managers, recruiters, and candidates. Here's how they compare.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How Contingency Recruitment Works</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            In traditional contingency recruitment, a hiring manager briefs one or more agencies on a vacancy. Each agency works independently, sourcing and submitting candidates from their own database. The agency that places a candidate first earns the full fee — typically 15–25% of salary. There is no collaboration between agencies, no agreed process for sharing candidates, and no structural incentive for quality over speed. The first CV submitted wins, regardless of whether it's the best fit.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How Split Fee Recruitment Works</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            In split fee recruitment, two recruiters collaborate on a single placement. The role-holder has the vacancy; the candidate-holder has the right candidate. Both parties agree a fee split — typically 50/50 — before any candidate data is shared. The role-holder manages the hiring manager relationship and process; the candidate-holder manages the candidate. When the placement is made, the agreed split is paid automatically. Both parties are commercially incentivised to make the right placement, not just the fastest one.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Incentive Problem with Contingency</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Contingency recruitment has a structural incentive problem. When five agencies work the same role, each has a 20% theoretical chance of winning the full fee. This creates a race-to-submit dynamic: agencies optimise for speed of CV delivery rather than quality of fit. Hiring managers receive floods of marginally relevant CVs, wasting significant internal time on screening. The recruiter who wins the fee isn't necessarily the one who found the best candidate — they're the one who moved fastest.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why Split Fee Produces Better Outcomes</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Split fee recruitment aligns incentives correctly. Both the role-holder and candidate-holder earn more when the right candidate is placed and stays in the role. There's no race-to-submit because the candidate is already identified before the submission is made. The process is collaborative rather than competitive. For hiring managers, this means fewer, higher-quality submissions. For candidates, it means a single, well-managed process. For recruiters, it means higher placement rates and lower wasted effort.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Deal Protection: The Key Structural Difference</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Contingency recruitment has no built-in deal protection. If two agencies submit the same candidate, disputes arise. If a hiring manager interviews a candidate from Agency A but hires them after a referral from Agency B, the fee ownership is contested. Split fee platforms like RecXchange solve this structurally: deal protection timestamps every candidate submission, split agreements are binding before data is shared, and fee attribution is governed by platform rules rather than retrospective arguments.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Which Model Is Right for Your Role?</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            For volume, generalist, or low-seniority hiring where candidate availability is high, contingency can work adequately. For specialist, senior, or hard-to-fill roles — where the right candidate is passive and requires a trusted recruiter relationship to engage — split fee consistently produces better outcomes. The collaborative model accesses candidate pools that no single contingency agency can reach, making it the superior choice for roles where quality and fit matter more than volume.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">Split Fee</th>
                  <th className="py-3 text-gray-400 font-semibold">Contingency</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Fee model", "Pay on placement", "Pay on placement"],
                  ["Incentive structure", "Collaborative — quality wins", "Competitive — speed wins"],
                  ["CV volume", "Low — highly targeted", "High — race to submit"],
                  ["Candidate quality", "Higher — pre-agreed fit", "Variable — speed-driven"],
                  ["Deal protection", "Built in (on RecXchange)", "None"],
                  ["Duplicate submissions", "Prevented", "Common"],
                  ["Passive candidate access", "Strong — collaborative networks", "Weak — single database"],
                  ["Best for", "Specialist / senior / hard-to-fill", "Volume / generalist"],
                ].map(([factor, sf, cont]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{sf}</td>
                    <td className="py-3 text-gray-500">{cont}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Experience structured split fee recruitment on RecXchange.</p>
            <p className="text-gray-300 text-sm">Join as a recruiter to access live split fee roles. Or post a role as a hiring manager and access 15,000+ specialist recruiter networks. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
