import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment Australia | RecXchange",
  description: "Split fee recruitment for Australian recruiters. 15,000+ specialists across Sydney, Melbourne and Brisbane. Engineering, Healthcare, Tech and Mining roles.",
  keywords: [
    "split fee recruitment Australia",
    "Australian recruiter marketplace",
    "split placement Australia",
    "recruitment collaboration Australia",
    "find recruitment partner Australia",
    "Sydney recruiter network",
    "Melbourne split fee recruitment",
    "Australian contingency recruitment"
  ],
  alternates: { canonical: "https://recxchange.io/locations/australia" },
  openGraph: {
    title: "Split Fee Recruitment Australia | RecXchange",
    description: "Australia's split fee recruitment marketplace. Sydney, Melbourne, Brisbane. 15,000+ recruiters globally. Average $7k per placement.",
    url: "https://recxchange.io/locations/australia",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Australia" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment Australia | RecXchange", description: "Australia's split fee recruiter marketplace. Sydney, Melbourne, Brisbane. 15,000+ global recruiters.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function AustraliaLocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/australia#webpage",
    "url": "https://recxchange.io/locations/australia",
    "name": "Split Fee Recruitment Australia | RecXchange",
    "description": "Split fee recruitment marketplace for Australian recruiters connecting with 15,000+ specialists globally.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Country", "name": "Australia" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "Australia", "item": "https://recxchange.io/locations/australia" }
      ]
    },
    "inLanguage": "en-AU"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Australia</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment Australia</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange is the global split fee recruitment platform used by specialist recruiters across Sydney, Melbourne, Brisbane, Perth and Adelaide. Australian recruiters use RecXchange to access live roles from global hiring managers, partner with international candidate-holders, and earn on every placement, without cold outreach, retainers, or exclusivity arrangements.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Australian Split Fee Recruitment Market</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Australia’s recruitment market is dominated by contingency-based agencies, making it highly suited to the RecXchange model. Skills shortages across Engineering, Healthcare, Technology and Mining mean hiring managers are actively open to paying placement fees for the right candidate, creating strong commercial opportunity for recruiters who can source internationally and collaborate across borders.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Key Sectors for Australian Split Fee Roles</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange Australia covers Mining &amp; Resources (FIFO roles, WA-based operations), Engineering (civil, structural, mechanical across major infrastructure projects), Healthcare &amp; Aged Care (nurses, allied health, GPs in high-demand rural and metro roles), Technology (SaaS, cybersecurity, data engineering), Financial Services, and Construction. Both permanent and contract split fee roles are posted regularly.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cross-Border Recruitment from Australia</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Many Australian recruiters source candidates from the UK, Ireland, South Africa, and the Philippines, markets with strong talent pipelines that map directly onto Australian employer demand. RecXchange’s global marketplace lets Australian recruiters partner with role-holders in the UK or US and earn on international placements, with all split agreements, contracts, and payouts handled in-platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Earnings for Australian Recruiters</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Australian recruiters on RecXchange earn an average of $7,000 (USD) per split placement. On RecX Direct roles, the candidate-side recruiter takes 70% of the total placement fee. With roles posted across the UK, USA, UAE and Australia simultaneously, active RecXchange members in Australia can build a diversified placement pipeline across multiple markets from a single platform.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Australian Recruiters, Join RecXchange</p>
            <p className="text-gray-300 text-sm">Access live roles from global hiring managers. Partner with international candidate-holders. Split fees automatically. No upfront costs, no retainers.</p>
          </div>
        </div>
      </main>
    </>
  );
}
