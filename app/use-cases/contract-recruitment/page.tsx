import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Contract Recruitment | Interim & Contractor Hiring | RecXchange",
  description: "RecXchange for contract and interim recruitment. Access specialist contractors and interim professionals across Technology, Engineering, Finance, HR and Operations. 15,000+ recruiters with active contractor pipelines. Fast turnaround. Single success fee. No markup on day rate.",
  keywords: [
    "contract recruitment platform",
    "interim recruitment UK",
    "contractor hiring marketplace",
    "specialist contract recruiter",
    "interim professional sourcing",
    "technology contractor recruitment",
    "finance interim recruiter",
    "contract staffing solution UK"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/contract-recruitment" },
  openGraph: {
    title: "Contract Recruitment | RecXchange",
    description: "Specialist contractor and interim hiring. 15,000+ recruiters with active contractor pipelines. Fast turnaround. Single success fee.",
    url: "https://recxchange.io/use-cases/contract-recruitment",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Contract Recruitment" }]
  },
  twitter: { card: "summary_large_image", title: "Contract Recruitment | RecXchange", description: "Specialist contractor and interim hiring. 15,000+ recruiter networks. Fast turnaround. Single success fee.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function ContractRecruitmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/contract-recruitment#webpage",
    "url": "https://recxchange.io/use-cases/contract-recruitment",
    "name": "Contract Recruitment | RecXchange",
    "description": "How RecXchange delivers specialist contractor and interim hiring across Technology, Engineering, Finance and Operations.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "Contract Recruitment", "item": "https://recxchange.io/use-cases/contract-recruitment" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Contract &amp; Interim Recruitment</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Contract and interim hiring demands speed above all else. A project is delayed, a key person is off sick, a transformation programme needs a specialist who can start immediately. RecXchange gives you access to 15,000+ specialist recruiters with active, available contractor pipelines — delivering pre-screened interim professionals faster than any single agency can.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why Contract Recruitment Is Different</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Permanent recruitment can afford a 4–6 week process. Contract and interim hiring often cannot. Contractors are available now or not at all — the good ones are placed within days of becoming available. Traditional contingency agencies work their own contractor bench first. By the time a generalist agency searches their database and reaches out, the best contractors have already accepted other roles. RecXchange's parallel matching means your requirement hits multiple specialist contractor networks simultaneously.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Sectors &amp; Specialist Contractor Types</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange covers contract and interim hiring across: Technology (Software Engineers, DevOps, Data Engineers, Cybersecurity, Programme Managers), Finance (Interim CFO, Financial Controllers, FP&amp;A, Treasury, Audit), Engineering (Project Engineers, Site Managers, M&amp;E Contractors, Structural), HR &amp; People (Interim HR Director, TUPE Specialists, ER Advisors), Operations (Supply Chain, Logistics, Procurement) and Healthcare (Locum Consultants, Agency Nurses, Allied Health Professionals).
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Speed: From Brief to Contractor Start</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange clients hiring contract roles typically receive first contractor profiles within 24–48 hours of posting. The Xchange Engine activates specialist contractor recruiters immediately — recruiters who know exactly which contractors in their network are available now, have the right clearances, and can mobilise quickly. Your dedicated Account Manager manages IR35 status, right-to-work checks, and contract generation in-platform.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">IR35 &amp; Compliance</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange's contract hiring workflow includes IR35 status determination support, right-to-work verification, and auto-generated contractor agreements that meet UK employment law requirements. For inside-IR35 engagements, umbrella company integrations are available in-platform. For outside-IR35 contracts, Schedule of Services agreements are auto-generated based on the agreed terms between hiring manager and recruiter.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">Need a contractor to start Monday?</p>
            <p className="text-gray-300 text-sm">Post your contract role now. First contractor profiles typically within 24–48 hours. IR35-compliant agreements in-platform. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
