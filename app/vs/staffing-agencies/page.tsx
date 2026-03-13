import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "RecXchange vs Staffing Agencies | A Modern Recruitment Alternative",
  description: "RecXchange vs staffing agencies: traditional staffing agencies rely on bulk databases, generic outreach, and margin-driven shortlists. RecXchange is a specialist-first marketplace where 15,000+ niche recruiters collaborate on placements. Better candidates, lower fees, full transparency.",
  keywords: [
    "RecXchange vs staffing agencies",
    "staffing agency alternative",
    "better than staffing agency",
    "recruitment marketplace vs staffing",
    "staffing agency comparison UK",
    "modern recruitment vs staffing",
    "specialist recruitment vs staffing agency",
    "RecXchange staffing"
  ],
  alternates: { canonical: "https://recxchange.io/vs/staffing-agencies" },
  openGraph: {
    title: "RecXchange vs Staffing Agencies",
    description: "Staffing agencies: bulk databases, generic outreach, margin-driven shortlists. RecXchange: 15,000+ specialists, top 1% candidates, full transparency.",
    url: "https://recxchange.io/vs/staffing-agencies",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange vs Staffing Agencies" }]
  },
  twitter: { card: "summary_large_image", title: "RecXchange vs Staffing Agencies", description: "Staffing agencies = bulk, generic, margin-driven. RecXchange = specialist, top 1% quality, transparent.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VsStaffingAgenciesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/vs/staffing-agencies#webpage",
    "url": "https://recxchange.io/vs/staffing-agencies",
    "name": "RecXchange vs Staffing Agencies",
    "description": "Comparison of RecXchange versus traditional staffing agencies for permanent and specialist hiring.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" },
        { "@type": "ListItem", "position": 3, "name": "vs Staffing Agencies", "item": "https://recxchange.io/vs/staffing-agencies" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">RecXchange vs Staffing Agencies</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            The traditional staffing agency model was built for a world before specialist networks, before AI-powered matching, and before recruiter collaboration was possible at scale. RecXchange is built for the world as it is now — a marketplace of 15,000+ niche specialists who collaborate on placements, share candidates, and deliver top 1% quality through a fully managed, technology-driven process.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How Staffing Agencies Actually Work</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Most staffing agencies operate on a database-first model: a recruiter searches their ATS for anyone with relevant keywords, fires off a batch of speculative calls and emails, and submits whoever responds fastest. Margin pressure incentivises speed and volume over fit. Shortlists often reflect who is available and already registered — not who is the best candidate for the role.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The RecXchange Difference: Specialist Networks, Not Databases</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange's 15,000+ recruiters are sector specialists — each with deep, relationship-based candidate networks built over years in a single discipline. When your role is posted, the Xchange Engine matches it to recruiters whose actual placed candidates match your requirement profile. These recruiters bring pre-qualified, warm candidates they know personally — not database searches of people who may not even be looking.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Fees and Transparency</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Staffing agency fees vary enormously — from 10% for volume generalist roles to 25%+ for specialist or senior positions — and are rarely transparent until a Terms of Business is signed. RecXchange publishes its fee structure clearly: 12–20% success fee, payable only on placement. No hidden clauses, no rebate periods shorter than 12 weeks, no ambiguity over ownership of candidates.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Managing Multiple Agencies vs One Platform</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Hiring managers who use multiple staffing agencies spend significant time managing relationships, providing feedback, and fielding calls from multiple contacts simultaneously. RecXchange replaces this entirely: one platform, one dedicated Account Manager, full visibility of all activity in a single dashboard. The Account Manager manages all recruiter interactions so you focus only on shortlisted candidates.
          </p>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-3 pr-6 text-gray-400 font-semibold">Factor</th>
                  <th className="py-3 pr-6 text-cyan-400 font-semibold">RecXchange</th>
                  <th className="py-3 text-gray-400 font-semibold">Staffing Agencies</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ["Candidate source", "Warm specialist networks", "ATS keyword search"],
                  ["Fee transparency", "Published — 12–20%", "Variable, opaque until ToB"],
                  ["Candidate quality", "Top 1%, pre-screened", "Speed over quality"],
                  ["Recruiter contacts", "One Account Manager", "Multiple agency contacts"],
                  ["Platform visibility", "Full dashboard", "None — email/phone only"],
                  ["Deal Protection", "Built in", "None"],
                  ["Pay if no hire", "No", "No (contingency)"],
                  ["Specialist depth", "15,000+ sector experts", "Generalist databases"],
                ].map(([factor, rx, sa]) => (
                  <tr key={factor} className="border-b border-white/5">
                    <td className="py-3 pr-6 text-gray-400">{factor}</td>
                    <td className="py-3 pr-6 text-white font-medium">{rx}</td>
                    <td className="py-3 text-gray-500">{sa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">One platform. 15,000+ specialists. Zero agency noise.</p>
            <p className="text-gray-300 text-sm">Replace your PSL with RecXchange. Better candidates, published fees, one Account Manager, full visibility. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
