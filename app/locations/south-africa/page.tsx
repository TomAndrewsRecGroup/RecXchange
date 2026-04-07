import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment South Africa | RecXchange",
  description: "Split fee recruitment for South African recruiters. Global specialists across Johannesburg, Cape Town and Durban. Engineering, Mining and Healthcare roles.",
  keywords: [
    "split fee recruitment South Africa",
    "South African recruiter marketplace",
    "Johannesburg recruitment collaboration",
    "Cape Town split fee recruitment",
    "South Africa recruiter network",
    "SA international recruitment",
    "South African contingency recruiter",
    "Africa recruiter platform"
  ],
  alternates: { canonical: "https://recxchange.io/locations/south-africa" },
  openGraph: {
    title: "Split Fee Recruitment South Africa | RecXchange",
    description: "South African split fee recruitment marketplace. Johannesburg, Cape Town, Durban. Earn on international placements globally.",
    url: "https://recxchange.io/locations/south-africa",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange South Africa" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment South Africa | RecXchange", description: "South African split fee recruiter marketplace. Johannesburg, Cape Town & Durban. Earn on global placements.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function SouthAfricaLocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/south-africa#webpage",
    "url": "https://recxchange.io/locations/south-africa",
    "name": "Split Fee Recruitment South Africa | RecXchange",
    "description": "Split fee recruitment marketplace for South African recruiters operating locally and internationally.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Country", "name": "South Africa" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "South Africa", "item": "https://recxchange.io/locations/south-africa" }
      ]
    },
    "inLanguage": "en-ZA"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">South Africa</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment South Africa</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange connects South African recruiters with a global marketplace of live roles and collaboration partners. With a highly skilled recruiter base across Johannesburg, Cape Town, and Durban, and strong candidate pipelines into the UK, UAE, and Australia, South African recruiters are ideally positioned to earn on international split fee placements via the RecXchange platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why South African Recruiters Thrive on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            South Africa produces world-class talent across Engineering, Mining, Healthcare, Finance, and Technology, sectors that are in acute shortage across the UK, Australia, UAE, and Canada. South African recruiters on RecXchange are uniquely positioned as candidate-holders: they bring global-quality talent to role-holders across high-fee markets, earning 50 to 70% of placement fees that routinely exceed $7,000 per placement.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Key South African Sectors &amp; Candidate Pipelines</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            South African recruiters on RecXchange specialise in: Mining &amp; Resources (skilled engineers, geologists, metallurgists sought globally), Healthcare (nurses, doctors and allied health for UK NHS, Australian health systems, UAE hospitals), Engineering (civil, mechanical, electrical candidates for UK and Australian infrastructure), Financial Services (accountants, actuaries, risk professionals for UK and European markets), and Technology (software engineers, data scientists for global tech firms).
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">International Placements &amp; Earnings</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            South African recruiters using RecXchange as candidate-holders on international roles earn in USD or GBP, at split rates of 50%, 60%, or 70% on RecX Direct roles. With average placement fees of $7,000+ across UK, US, and UAE roles, a single RecXchange placement can represent multiple months of equivalent domestic South African recruitment earnings.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">South African Domestic Hiring Managers</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            South African hiring managers and HR teams also use RecXchange to access specialist recruiters for hard-to-fill domestic roles. Post a role on RecXchange and the Xchange Engine matches it to relevant recruiters across South Africa and globally, with a single success fee payable only on placement. No retainers, no exclusivity, no recruiter spam.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">South African Recruiters, Go Global on RecXchange</p>
            <p className="text-gray-300 text-sm">Your candidates are world-class. The fees are waiting globally. Join RecXchange and start earning on international split fee placements today.</p>
          </div>
        </div>
      </main>
    </>
  );
}
