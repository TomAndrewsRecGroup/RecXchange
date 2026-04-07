import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "International Hiring | Global Recruitment | RecXchange",
  description: "International hiring from one platform. 15,000+ specialist recruiters across the UK, USA, UAE, Australia and Europe. GDPR-compliant. Pay only on placement.",
  keywords: [
    "international recruitment platform",
    "global hiring solution",
    "cross-border recruitment",
    "hire internationally UK",
    "global talent acquisition platform",
    "international recruiter marketplace",
    "overseas recruitment UK",
    "global split fee recruitment"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/international-hiring" },
  openGraph: {
    title: "International Hiring | RecXchange",
    description: "Recruit globally from one platform. UK, USA, UAE, Australia, Europe. 15,000+ global specialists. GDPR-compliant. Pay only on placement.",
    url: "https://recxchange.io/use-cases/international-hiring",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange International Hiring" }]
  },
  twitter: { card: "summary_large_image", title: "International Hiring | RecXchange", description: "Recruit globally from one platform. 15,000+ global specialists. GDPR-compliant. Pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function InternationalHiringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/international-hiring#webpage",
    "url": "https://recxchange.io/use-cases/international-hiring",
    "name": "International Hiring | RecXchange",
    "description": "How RecXchange enables global and cross-border hiring from a single platform.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "International Hiring", "item": "https://recxchange.io/use-cases/international-hiring" }
      ]
    },
    "inLanguage": "en-GB"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can RecXchange help me hire candidates from overseas?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. RecXchange's global recruiter network spans the UK, USA, UAE, Australia, Europe, South Africa and beyond. When you post a role, the Xchange Engine can match it to recruiters in the candidate's source market, for example, a UK role can be matched to South African or Irish recruiters with strong cross-border placement track records. All data sharing is GDPR-compliant and governed in-platform." }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange GDPR-compliant for international candidate data?",
        "acceptedAnswer": { "@type": "Answer", "text": "Yes. RecXchange is fully compliant with UK GDPR and EU GDPR for all cross-border candidate data transfers. All candidate data shared between recruiters and hiring managers on the platform is governed by RecXchange's Data Processing Agreement, which meets the requirements of both UK and EU data protection law." }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Use Case</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">International Hiring</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            International hiring is complex: different employment laws, different candidate markets, different agency relationships to manage in each geography. RecXchange simplifies global recruitment into a single platform, 15,000+ specialist recruiters across the UK, USA, UAE, Australia, Europe and South Africa, all governed by a consistent, GDPR-compliant framework, with all cross-border split fee agreements generated and enforced in-platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cross-Border Talent Sourcing</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Many of the world’s best candidates for UK, US, and UAE roles are based overseas, in South Africa, Ireland, Australia, India, and the Philippines. Reaching them requires specialist recruiters with in-market networks and cross-border placement experience. RecXchange's Xchange Engine can match a UK role to overseas recruiters with strong track records placing candidates into your target market, opening talent pools that domestic agencies simply cannot access.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Hiring Across Multiple Countries Simultaneously</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            For organisations expanding into new markets, a US business opening a UK office, a UAE firm building a European team, or a global organisation hiring simultaneously across three continents, RecXchange provides a single hiring platform that activates local specialist recruiters in each geography. No need to identify, vet, and sign Terms of Business with a different agency in every country.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">GDPR &amp; International Data Compliance</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Cross-border candidate data transfers are governed by RecXchange's Data Processing Agreement, which meets UK GDPR, EU GDPR, and international data transfer requirements. Candidate consent is captured at the point of submission. Data retention policies are enforced automatically. All recruiter access to candidate data is role-based and time-limited, with a full audit trail maintained in-platform for compliance purposes.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Right-to-Work &amp; Visa Support</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange's platform captures right-to-work status for all candidate submissions, with recruiter-confirmed visa eligibility documented before any candidate is presented to a hiring manager. For roles requiring UK Skilled Worker visa sponsorship, US H-1B, or UAE work permit processing, RecXchange's Account Managers can connect hiring managers with immigration and relocation specialists within the platform network.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Hire globally. Manage locally.</p>
            <p className="text-gray-300 text-sm">One platform. 15,000+ global specialists. GDPR-compliant cross-border workflows. Right-to-work verified. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
