import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Hard-to-Fill Roles | Specialist Recruitment | RecXchange",
  description: "Hard-to-fill roles that job boards can't crack. 15,000+ specialist recruiters with passive candidate networks. Engineering, Healthcare, Tech and Finance.",
  keywords: [
    "hard to fill roles recruitment",
    "specialist recruitment hard roles",
    "niche recruitment platform",
    "passive candidate sourcing",
    "difficult vacancy recruitment UK",
    "specialist recruiter network",
    "hard to hire positions",
    "niche talent acquisition"
  ],
  alternates: { canonical: "https://recxchange.io/use-cases/hard-to-fill-roles" },
  openGraph: {
    title: "Hard-to-Fill Roles | Specialist Recruitment | RecXchange",
    description: "15,000+ niche specialist recruiters with deep passive candidate networks. The Xchange Engine finds the recruiter who has your candidate.",
    url: "https://recxchange.io/use-cases/hard-to-fill-roles",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Hard-to-Fill Roles" }]
  },
  twitter: { card: "summary_large_image", title: "Hard-to-Fill Roles | RecXchange", description: "15,000+ niche specialists. Deep passive networks. The Xchange Engine finds the recruiter who has your candidate.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"], creator: "@RecXchange" }
};

export default function HardToFillRolesPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/use-cases/hard-to-fill-roles#webpage",
    "url": "https://recxchange.io/use-cases/hard-to-fill-roles",
    "name": "Hard-to-Fill Roles | Specialist Recruitment | RecXchange",
    "description": "How RecXchange fills specialist, niche and hard-to-fill roles using 15,000+ sector-expert recruiter networks.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" },
        { "@type": "ListItem", "position": 3, "name": "Hard-to-Fill Roles", "item": "https://recxchange.io/use-cases/hard-to-fill-roles" }
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
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Hard-to-Fill Roles</h1>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Some roles sit open for months. Job boards generate noise, generalist agencies come back empty-handed, and the business case for the hire gets harder to justify with every passing week. RecXchange was built precisely for these situations: the Xchange Engine identifies which of 15,000+ specialist recruiters has the passive candidate pipeline your role needs, and connects you in minutes.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Why Hard Roles Stay Unfilled</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Hard-to-fill roles share a common trait: the right candidate isn't actively looking. They're not on job boards, they don't respond to InMails, and they haven't registered with a generalist agency. They're known to specialist recruiters who have spent years in their niche, recruiters who have placed them before, stayed in contact, and know exactly what it would take to move them. The challenge is finding which recruiter that is. The Xchange Engine does exactly that.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">How the Xchange Engine Solves Niche Hiring</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            When you post a hard-to-fill role on RecXchange, the Xchange Engine analyses the role's sector, location, seniority, and technical requirements, then matches it to the specific subset of RecXchange's 15,000+ recruiters whose placed candidate history most closely aligns. These aren't cold approaches to generic recruiters. They're warm activations of specialists who already have relationships with the exact candidate profile you need.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">Common Hard-to-Fill Role Types on RecXchange</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            RecXchange regularly fills: Principal and Staff Engineers (software, mechanical, electrical), Regulatory Affairs Specialists (pharma, medtech, financial services), Consultant Psychiatrists and Clinical Psychologists, Niche Finance roles (treasury, actuarial, structured finance), Senior Commercial roles (VP Sales, Enterprise Account Directors), Legal Counsel (in-house, specialist sectors), and Operations leaders in complex supply chain or manufacturing environments.
          </p>

          <h2 className="text-2xl font-bold text-white mb-4">The Role of Passive Candidates</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            For hard-to-fill roles, passive candidates, those not actively job-seeking, represent the majority of viable talent. Research consistently shows that the best performers in any specialism are typically employed, engaged, and not browsing job boards. Reaching them requires a warm introduction from a trusted recruiter. RecXchange's specialist network has these relationships at scale. Your role gets in front of passive talent that no job board or generalist agency can access.
          </p>

          <div className="mt-12 p-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/5">
            <p className="text-cyan-400 font-bold mb-2">The role that's been open for months? Post it on RecXchange.</p>
            <p className="text-gray-300 text-sm">The Xchange Engine finds the specialist recruiter who has your candidate. First submissions typically within 48 to 72 hours. Pay only on placement.</p>
          </div>
        </div>
      </main>
    </>
  );
}
