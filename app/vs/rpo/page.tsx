import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs RPO | Outsourcing Alternative",
  description: "RecXchange vs RPO: get a dedicated Account Manager, managed process, and top 1% candidates without contract lock-in or fixed costs. Pay only on placement.",
  keywords: [
    "RecXchange vs RPO",
    "RPO alternative",
    "recruitment process outsourcing alternative",
    "managed recruitment without RPO",
    "RPO comparison",
    "no contract recruitment outsourcing",
    "flexible RPO alternative",
    "RecXchange RPO"
  ],
  alternates: { canonical: "https://recxchange.io/vs/rpo" },
  openGraph: {
    title: "RecXchange vs RPO | Recruitment Process Outsourcing Alternative",
    description: "RPO quality without the contract lock-in. Dedicated Account Manager, managed process, top 1% candidates. Pay only on placement.",
    url: "https://recxchange.io/vs/rpo",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs RPO" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs RPO", description: "RPO quality. No long contracts. No fixed costs. Dedicated Account Manager included. Pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsRPOPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/rpo#webpage",
    "url": "https://recxchange.io/vs/rpo",
    "name": "RecXchange vs RPO",
    "description": "Comparison of RecXchange versus Recruitment Process Outsourcing (RPO) for growing businesses.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs RPO", "item": "https://recxchange.io/vs/rpo" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs RPO</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Recruitment Process Outsourcing (RPO) promises a managed, end-to-end hiring solution, but traditional RPO comes with 12 to 24 month contracts, embedded teams, management fees, and fixed costs regardless of hiring volume. RecXchange delivers the same managed outcomes, dedicated Account Manager, end-to-end process ownership, top 1% candidate quality, with no contract, no fixed costs, and zero payment until a candidate is placed.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">What RPO Gives You (and What It Costs)</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Traditional RPO providers embed a team of recruiters into your business and manage the full hiring lifecycle. The value proposition is real, but the cost structure is rigid. Most RPO contracts require monthly management fees of £5,000 to 30,000+, minimum volume commitments, and 12 to 24 month lock-in periods. For scale-ups, growing SMEs, or businesses with variable hiring needs, this is often prohibitively expensive and inflexible.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How RecXchange Delivers RPO Outcomes Without the Contract</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange replicates the RPO value proposition, dedicated Account Manager, managed recruiter network, end-to-end process, quality control, but charges a single success fee per placement (12 to 20%) with no monthly fees and no contract lock-in. Hire one person or fifty: you pay only for successful placements. Stop and start as your business needs change.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Candidate Quality: RPO vs RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RPO teams typically source from job boards, LinkedIn, and their own ATS, the same channels every other recruiter uses. RecXchange’s 15,000+ specialist recruiters have built deep, sector-specific candidate networks over years of relationship-based recruiting. The Xchange Engine matches your role to recruiters with directly relevant candidate pipelines, giving access to passive talent that RPO generalists simply cannot reach.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Who RecXchange vs RPO Is Right For</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RPO suits large enterprises with consistent, high-volume hiring (50+ roles per year) where a fixed-cost model makes commercial sense. RecXchange suits scale-ups, SMEs, and any organisation with specialist or senior hiring needs where candidate quality, speed, and cost-per-hire matter more than volume throughput. If you’re hiring 1 to 20 specialist roles per year, RecXchange almost always delivers better outcomes at lower cost than a traditional RPO.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Traditional RPO</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Contract required", "No", "Yes, 12 to 24 months"],
                  ["Monthly fees", "None", "£5,000-£30,000+"],
                  ["Cost model", "Success fee per hire", "Fixed monthly + per hire"],
                  ["Account Manager", "Dedicated, included", "Included (embedded)"],
                  ["Candidate reach", "15,000+ specialist networks", "Job boards + LinkedIn"],
                  ["Flexibility", "Full, stop/start anytime", "Low, contract locked"],
                  ["Best for", "1 to 20 specialist hires/year", "50+ volume hires/year"],
                  ["Setup time", "Hours", "Weeks to months"],
                ].map(([factor, rx, rpo]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{rpo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">RPO outcomes. Zero contract. Zero monthly fees.</p>
            <p className="text-gray-300 text-sm">Get a dedicated Account Manager, managed recruiter network, and top 1% candidates, with no lock-in and no payment until you hire.</p>
          </div>
        </div>
      </main>
    </>
  );
}
