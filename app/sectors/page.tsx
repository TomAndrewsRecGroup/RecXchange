import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Specialist Recruitment by Sector | RecXchange",
  description: "Specialist recruiter networks across Technology, Engineering, Healthcare, Finance, Sales, HR, Legal and Construction. Pay only on placement.",
  alternates: { canonical: "https://recxchange.io/sectors" },
  openGraph: {
    title: "Specialist Recruitment by Sector | RecXchange",
    description: "Sector-specific specialist recruiter networks: Technology, Engineering, Healthcare, Finance, Sales, HR, Legal, Construction.",
    url: "https://recxchange.io/sectors",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Sectors" }]
  },
};

const sectors = [
  { href: "/sectors/technology-recruitment", title: "Technology", desc: "Software Engineers, DevOps, Data, Cybersecurity, Product, CTO, Head of Engineering." },
  { href: "/sectors/engineering-recruitment", title: "Engineering", desc: "Mechanical, Electrical, Civil, M&E, Structural, Project Engineering, Site Management." },
  { href: "/sectors/healthcare-recruitment", title: "Healthcare", desc: "Doctors, Nurses, Allied Health Professionals, Mental Health, Social Care, Locum." },
  { href: "/sectors/finance-recruitment", title: "Finance", desc: "CFO, Financial Controller, FP&A, Treasury, Audit, Private Equity, Investment Banking." },
  { href: "/sectors/sales-recruitment", title: "Sales", desc: "Sales Directors, BDMs, Account Executives, SDRs, VP Sales, Enterprise Sales." },
  { href: "/sectors/hr-recruitment", title: "HR & People", desc: "HR Directors, People Ops, Talent Acquisition, ER, TUPE, Interim HR, L&D." },
  { href: "/sectors/legal-recruitment", title: "Legal", desc: "Solicitors, Barristers, In-House Counsel, Paralegals, Legal Operations, GC." },
  { href: "/sectors/construction-recruitment", title: "Construction", desc: "Project Managers, Quantity Surveyors, Site Managers, Estimators, M&E Contractors." },
];

export default function SectorsHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/sectors#collectionpage",
    "url": "https://recxchange.io/sectors",
    "name": "Specialist Recruitment by Sector | RecXchange",
    "description": "RecXchange specialist recruiter networks by sector.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Sectors</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Specialist Recruitment by Sector</h1>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl">Deep sector expertise across every major discipline. Passive candidate pipelines. Pay only on placement.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectors.map((s) => (
              <Link key={s.href} href={s.href} className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200">
                <h2 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{s.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
