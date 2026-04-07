import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Volume Hiring | Bulk Recruitment | RecXchange",
  description: "Volume hiring without the overhead. Recruit at scale across multiple roles. No retainers, no multi-agency hassle. 15,000+ recruiters. Pay on placement.",
  keywords: [
    "volume recruitment platform",
    "bulk hiring solution UK",
    "volume hiring without agency",
    "scale hiring platform",
    "multiple role recruitment",
    "volume talent acquisition",
    "high volume recruitment solution",
    "bulk recruitment no retainer"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/volume-hiring" },
  openGraph: {
    title: "Volume Hiring | RecXchange",
    description: "Recruit at scale across multiple roles. No multiple agency management. Parallel recruiter networks. Pay only on placement.",
    url: "https://recxchange.io/use-cases/volume-hiring",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Volume Hiring" }]
  },
  twitter: { card: "summary_large_image", title: "Volume Hiring | RecXchange", description: "Recruit at scale. Parallel recruiter networks. No multi-agency management. Pay only on placement.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function VolumeHiringPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/volume-hiring#webpage",
    "url": "https://recxchange.io/use-cases/volume-hiring",
    "name": "Volume Hiring | RecXchange",
    "description": "How RecXchange supports volume and bulk hiring across multiple roles simultaneously.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "Volume Hiring", "item": "https://recxchange.io/use-cases/volume-hiring" }
      ]
    },
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Use Case</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Volume Hiring</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            When you need to hire across 10, 20, or 50 roles simultaneously, traditional recruitment models buckle under their own complexity. Managing multiple agencies, each with their own contacts, Terms of Business, and fee structures, is a full-time job in itself. RecXchange centralises all of it, one platform, one Account Manager, parallel specialist recruiter networks activated across every open role at once.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Volume Hiring Problem</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Volume hiring creates compounding management overhead. Each agency relationship requires briefing, feedback cycles, dispute management, and invoice reconciliation. As role count increases, internal HR teams spend more time managing agencies than assessing candidates. Quality degrades as speed pressure increases. RecXchange eliminates this overhead by making your dedicated Account Manager the single point of contact for all recruiter activity across all open roles.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Parallel Activation Across All Roles</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When you post multiple roles on RecXchange, the Xchange Engine runs parallel matching across each position simultaneously, activating different specialist recruiter subsets for each role based on sector, seniority, and location. A Technology role activates tech specialist recruiters. An Engineering role activates engineering networks. A Finance role activates finance specialists. All in parallel, all managed through a single platform dashboard.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Cost Control at Volume</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            At hiring volume, small differences in fee percentage compound significantly. RecXchange's 12 to 20% success fee structure is transparent and consistent across all roles. For organisations hiring at volume, RecXchange Account Managers work with hiring managers to establish volume pricing arrangements that further reduce per-hire cost as placement numbers increase. No hidden fees, no agency margin inflation, no invoice disputes.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Reporting &amp; Analytics for Volume Hiring</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange's platform dashboard gives hiring teams full visibility across all active roles: submissions received, interviews scheduled, offers made, and placements confirmed, all in real time. For HR Directors and Heads of Talent managing board-level reporting on hiring velocity and cost-per-hire, RecXchange provides the data infrastructure that replaces manual tracking across multiple agency relationships.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">10 roles or 50, one platform handles all of them.</p>
            <p className="text-gray-300 text-sm">Post all your open roles on RecXchange. Parallel specialist networks. Single Account Manager. Full dashboard visibility. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
