import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment UAE | RecXchange",
  description: "Split fee recruitment for UAE and Middle East recruiters. Specialists across Dubai, Abu Dhabi and the GCC. Engineering, Healthcare and Finance roles.",
  keywords: [
    "split fee recruitment UAE",
    "UAE recruiter marketplace",
    "Dubai recruitment collaboration",
    "split placement Middle East",
    "GCC recruiter network",
    "MENA recruitment platform",
    "Abu Dhabi recruiter",
    "Middle East split fee"
  ],
  alternates: { canonical: "https://recxchange.io/locations/united-arab-emirates" },
  openGraph: {
    title: "Split Fee Recruitment UAE | RecXchange",
    description: "Split fee recruitment marketplace for UAE & Middle East. Dubai, Abu Dhabi, GCC. 15,000+ global recruiters.",
    url: "https://recxchange.io/locations/united-arab-emirates",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange UAE" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment UAE | RecXchange", description: "UAE & Middle East split fee recruitment. Dubai, Abu Dhabi, GCC. 15,000+ global recruiters.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function UAELocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/united-arab-emirates#webpage",
    "url": "https://recxchange.io/locations/united-arab-emirates",
    "name": "Split Fee Recruitment UAE | RecXchange",
    "description": "Split fee recruitment marketplace for UAE and Middle East recruiters.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "United Arab Emirates", "item": "https://recxchange.io/locations/united-arab-emirates" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">United Arab Emirates</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment UAE &amp; Middle East</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange is the global recruiter collaboration platform used by specialist recruitment firms across Dubai, Abu Dhabi, and the wider GCC region. UAE-based recruiters use RecXchange to access live roles from UK, US and global hiring managers, and to partner with international candidate-holders who have talent that the Middle East market demands.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">UAE Recruitment Market &amp; Split Fee Dynamics</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The UAE recruitment market is unique: roles are highly specialised, candidate pools are international, and hiring timelines are often urgent. Split fee recruitment is a natural fit, UAE-based recruiters frequently have strong candidate networks in their home markets (UK, India, South Africa, Philippines) that map directly onto UAE employer demand. RecXchange lets UAE recruiters monetise these international networks by partnering with role-holders across the GCC.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Key Sectors for UAE Split Fee Recruitment</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange UAE roles span Engineering &amp; Construction (major infrastructure projects across Abu Dhabi and Dubai), Healthcare (hospitals, clinics, and government health authorities), Financial Services (DIFC firms, Islamic finance, wealth management), Technology (fintech, AI, SaaS companies), and Oil &amp; Gas (upstream, downstream, and petrochemicals across the GCC).
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Working Across Borders From the UAE</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Many UAE-based recruiters specialise in international candidate sourcing. RecXchange&apos;s global marketplace means a Dubai recruiter with strong South Asian or European candidate pipelines can instantly partner with a role-holder in London, New York, or Sydney. Split fee agreements, contracts, and payments all happen in-platform, no cross-border payment complexity.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">UAE & GCC Recruiters, Join RecXchange</p>
            <p className="text-gray-300 text-sm">Access live roles from global hiring managers. Partner with international candidate-holders. Split fees automatically. No upfront costs.</p>
          </div>
        </div>
      </main>
    </>
  );
}
