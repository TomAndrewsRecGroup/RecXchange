import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "RecXchange vs Competitors | RecXchange",
  description: "How RecXchange compares to LinkedIn Recruiter, Indeed, agencies, retained search, RPO, job boards and in-house recruiters. Honest comparisons.",
  alternates: { canonical: "https://recxchange.io/vs" },
  openGraph: {
    title: "RecXchange vs Competitors | RecXchange",
    description: "How RecXchange compares to LinkedIn Recruiter, Indeed, traditional agencies, retained search, RPO, and more.",
    url: "https://recxchange.io/vs",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Comparisons" }]
  },
};

const comparisons = [
  { href: "/vs/recruitment-agency", title: "RecXchange vs Traditional Agency", desc: "Why specialist recruiter networks outperform single-agency contingency for hard-to-fill roles." },
  { href: "/vs/retained-search", title: "RecXchange vs Retained Search", desc: "Senior hiring without retainers, exclusivity, or 30%+ fees." },
  { href: "/vs/linkedin-recruiter", title: "RecXchange vs LinkedIn Recruiter", desc: "Passive candidate access through specialist networks vs. cold InMail outreach." },
  { href: "/vs/contingency-recruitment", title: "RecXchange vs Contingency Recruitment", desc: "Structured split fee collaboration vs. uncoordinated multi-agency contingency." },
  { href: "/vs/job-boards", title: "RecXchange vs Job Boards", desc: "Why job boards don't work for specialist roles, and what does." },
  { href: "/vs/rpo", title: "RecXchange vs RPO", desc: "Flexible specialist access without the RPO commitment, cost, or transition risk." },
  { href: "/vs/internal-recruiter", title: "RecXchange vs In-House Recruiter", desc: "Specialist depth on demand without the fixed headcount cost." },
  { href: "/vs/staffing-agencies", title: "RecXchange vs Staffing Agencies", desc: "Specialist-first marketplace vs. bulk database shortlists. Better candidates, lower fees." },
  { href: "/vs/top-echelon", title: "RecXchange vs Top Echelon", desc: "Zero brokerage fees, 15,000+ recruiters and AI matching vs. Top Echelon's traditional split fee network." },
  { href: "/vs/npa-worldwide", title: "RecXchange vs NPA Worldwide", desc: "AI-powered matching and instant activation vs. NPA's relationship-driven annual membership model." },
  { href: "/vs/recruit-alliance", title: "RecXchange vs RecruitAlliance", desc: "Larger network, smarter matching and 270M candidate database vs. RecruitAlliance's manual directory." },
];

export default function VsHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/vs#collectionpage",
    "url": "https://recxchange.io/vs",
    "name": "RecXchange vs Competitors | RecXchange",
    "description": "Detailed comparisons of RecXchange against all major recruitment alternatives.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Comparisons", "item": "https://recxchange.io/vs" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Comparisons</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">RecXchange vs Every Alternative</h1>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl">Honest, detailed comparisons so you can make the right call for your hiring needs.</p>
          <div className="grid md:grid-cols-2 gap-6">
            {comparisons.map((c) => (
              <Link key={c.href} href={c.href} className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200">
                <h2 className="text-white font-bold text-lg mb-3 group-hover:text-cyan-400 transition-colors">{c.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
