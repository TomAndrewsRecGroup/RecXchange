import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs In-House Recruiter | Hiring Without a Full-Time Hire",
  description: "RecXchange vs in-house recruiter: an internal recruiter costs £50,000–£80,000/year in salary alone before tools, benefits and management overhead. RecXchange delivers the same managed hiring outcomes with zero headcount, zero fixed cost, and payment only on placement.",
  keywords: [
    "RecXchange vs in-house recruiter",
    "internal recruiter alternative",
    "hire without in-house recruiter",
    "in-house talent acquisition alternative",
    "fractional recruitment alternative",
    "no internal recruiter hiring solution",
    "outsource recruitment vs internal",
    "RecXchange vs talent acquisition team"
  ],
  alternates: { canonical: "https://recxchange.io/vs/internal-recruiter" },
  openGraph: {
    title: "RecXchange vs In-House Recruiter",
    description: "An internal recruiter costs £60k+ per year before tools and overhead. RecXchange: zero headcount, zero fixed cost, pay only on placement.",
    url: "https://recxchange.io/vs/internal-recruiter",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs In-House Recruiter" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs In-House Recruiter", description: "Internal recruiter = £60k+/year fixed. RecXchange = zero headcount, zero fixed cost, pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsInternalRecruiterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/internal-recruiter#webpage",
    "url": "https://recxchange.io/vs/internal-recruiter",
    "name": "RecXchange vs In-House Recruiter",
    "description": "Comparison of RecXchange versus building an in-house recruitment function.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs In-House Recruiter", "item": "https://recxchange.io/vs/internal-recruiter" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs In-House Recruiter</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Building an internal recruitment function is a significant fixed cost commitment — salary, tools, benefits, management time, and a 3–6 month ramp before productivity. RecXchange gives you the same managed, end-to-end hiring outcomes with zero headcount addition, zero fixed monthly cost, and payment only when a candidate is successfully placed.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The True Cost of an In-House Recruiter</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A mid-level in-house recruiter in the UK costs £45,000–£65,000 in base salary. Add employer NI contributions (13.8%), pension (3–5%), benefits, an ATS subscription (£3,000–£15,000/year), LinkedIn Recruiter licence (£7,000–£10,000/year), job board credits, and management overhead — and the true annual cost of one internal recruiter routinely exceeds £80,000–£100,000 before a single hire is made.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Specialist Depth: Generalist vs 15,000+ Specialists</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            In-house recruiters are typically generalists — capable of hiring across multiple functions but with shallow networks in any single specialism. When you need a Principal Engineer, a CFO, or a niche regulatory expert, a generalist internal recruiter is working from scratch. RecXchange immediately matches your role to specialist recruiters who have spent years building exactly the candidate network you need.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Scalability: Headcount Constraint vs On-Demand</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            One in-house recruiter can typically manage 10–15 active roles at once before quality degrades. When hiring spikes — a funding round, a new market entry, a rapid team build — you face a choice: hire more internal recruiters (more fixed cost, more lead time) or supplement with agencies. RecXchange scales instantly: post one role or fifty, the Xchange Engine activates the right recruiter network for each position simultaneously.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">When an In-House Recruiter Makes Sense</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            In-house recruitment makes strong commercial sense for organisations hiring 30+ roles per year with significant volume in repeatable, similar positions (e.g. graduate cohorts, retail staff, call centre agents). For specialist, senior or variable hiring — typically fewer than 25 roles per year — RecXchange delivers better candidate quality at a lower total cost than a dedicated internal function.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">In-House Recruiter</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Annual fixed cost", "£0", "£80,000–£100,000+"],
                  ["Pay if no hire", "No", "Yes — always"],
                  ["Headcount addition", "None", "1+ FTE"],
                  ["Specialist depth", "15,000+ sector specialists", "Generalist breadth"],
                  ["Scales with demand", "Instantly", "No — headcount constrained"],
                  ["Time to first hire", "48–72 hours", "3–6 months ramp"],
                  ["Tools included", "Yes — all in platform", "No — ATS, LinkedIn extra"],
                  ["Best for", "Specialist / variable hiring", "30+ volume / repeatable"],
                ].map(([factor, rx, ih]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{ih}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">All the outcomes. None of the headcount.</p>
            <p className="text-gray-300 text-sm">Get a dedicated Account Manager, 15,000+ specialist recruiters, and managed end-to-end hiring — with zero fixed cost and payment only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
