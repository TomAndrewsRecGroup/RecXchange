import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Split Fee Recruitment Europe | RecXchange",
  description: "Split fee recruitment for European recruiters. Specialists across Germany, Netherlands, France, Spain and Ireland. Tech, Engineering and Finance roles.",
  keywords: [
    "split fee recruitment Europe",
    "European recruiter marketplace",
    "EU recruitment collaboration",
    "split placement Europe",
    "Germany recruiter network",
    "Netherlands split fee recruitment",
    "Ireland recruitment platform",
    "European contingency recruitment"
  ],
  alternates: { canonical: "https://recxchange.io/locations/europe" },
  openGraph: {
    title: "Split Fee Recruitment Europe | RecXchange",
    description: "European split fee recruitment marketplace. Germany, Netherlands, Ireland, France and beyond. 15,000+ global recruiters.",
    url: "https://recxchange.io/locations/europe",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Europe" }]
  },
  twitter: { card: "summary_large_image", title: "Split Fee Recruitment Europe | RecXchange", description: "European split fee recruiter marketplace. Germany, Netherlands, Ireland & beyond. 15,000+ global recruiters.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function EuropeLocationPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/locations/europe#webpage",
    "url": "https://recxchange.io/locations/europe",
    "name": "Split Fee Recruitment Europe | RecXchange",
    "description": "Split fee recruitment marketplace for European recruiters and hiring managers.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "areaServed": { "@type": "Continent", "name": "Europe" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" },
        { "@type": "ListItem", "position": 3, "name": "Europe", "item": "https://recxchange.io/locations/europe" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Europe</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Split Fee Recruitment Europe</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            RecXchange serves recruiters and hiring managers across Europe, from Dublin and Amsterdam to Berlin, Paris, and Madrid. European recruiters use RecXchange to partner on cross-border placements, access global candidate pools, and split fees automatically without the complexity of multi-jurisdiction contracts or payment arrangements.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cross-Border Recruitment Across the EU</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            The EU&apos;s freedom of movement creates a naturally borderless talent market, but most recruitment platforms are country-specific. RecXchange is built for cross-border collaboration. A recruiter in Amsterdam with a Dutch-speaking candidate can partner with a role-holder in Frankfurt. A Paris-based recruiter with EMEA sales talent can submit to a London-based role. All terms, agreements and payments are in-platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Key European Markets on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Active RecXchange markets in Europe include Ireland (Technology, Financial Services, Pharma), Germany (Engineering, Automotive, Manufacturing), Netherlands (Technology, Logistics, Finance), France (Luxury, Technology, Engineering), Spain (Technology, Tourism, Renewable Energy), and the Nordics (Clean Tech, Maritime, Technology). GDPR-compliant workflows are built into every submission.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">GDPR &amp; European Data Compliance</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange is fully GDPR-compliant. All candidate data shared between recruiters on the platform is governed by RecXchange’s Data Processing Agreement, which meets EU GDPR and UK GDPR requirements. Candidate consent is captured at point of submission, data retention policies are enforced automatically, and no candidate personal data is stored beyond the agreed retention period.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">European Hiring Managers</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            European hiring managers and HR leaders use RecXchange to access a pre-vetted network of specialist recruiters without managing multiple agency relationships. Post a role once, let the Xchange Engine match it to relevant recruiters across the EU and globally, and pay a single success fee only when a candidate is placed. No retainers. No exclusivity. No recruiter spam.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">European Recruiters &amp; Hiring Managers</p>
            <p className="text-gray-300 text-sm">Join RecXchange to access live European roles, submit candidates across borders, and collaborate with a global recruiter network. GDPR-compliant from day one.</p>
          </div>
        </div>
      </main>
    </>
  );
}
