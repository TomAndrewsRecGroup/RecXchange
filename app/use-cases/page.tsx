import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Recruitment Use Cases | How Hiring Managers Use RecXchange | RecXchange",
  description: "How hiring managers and talent leaders use RecXchange across every recruitment scenario: scale-up hiring, hard-to-fill roles, senior executive search, contract recruitment, volume hiring, and international hiring.",
  alternates: { canonical: "https://recxchange.io/use-cases" },
  openGraph: {
    title: "Recruitment Use Cases | RecXchange",
    description: "How hiring managers use RecXchange for scale-up, hard-to-fill, executive, contract, volume, and international hiring.",
    url: "https://recxchange.io/use-cases",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Use Cases" }]
  },
};

const useCases = [
  { href: "/use-cases/scale-up-hiring", title: "Scale-Up Hiring", desc: "Series A/B companies hiring fast without blowing cash runway on retained search fees." },
  { href: "/use-cases/hard-to-fill-roles", title: "Hard-to-Fill Roles", desc: "Specialist, niche, and passive-only roles that job boards and generalist agencies can't crack." },
  { href: "/use-cases/senior-executive-search", title: "Senior & Executive Search", desc: "C-suite and VP-level search without retainers, exclusivity requirements, or 30%+ fees." },
  { href: "/use-cases/contract-recruitment", title: "Contract & Interim Recruitment", desc: "Specialist contractors and interim professionals. IR35-compliant. First profiles in 24–48 hours." },
  { href: "/use-cases/volume-hiring", title: "Volume Hiring", desc: "10 to 50 roles simultaneously. Parallel specialist networks. Single Account Manager. Full dashboard." },
  { href: "/use-cases/international-hiring", title: "International Hiring", desc: "UK, USA, UAE, Australia, Europe, South Africa — from one platform. GDPR-compliant. Right-to-work verified." },
];

export default function UseCasesHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/use-cases#collectionpage",
    "url": "https://recxchange.io/use-cases",
    "name": "Recruitment Use Cases | RecXchange",
    "description": "How hiring managers use RecXchange across every recruitment scenario.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Use Cases", "item": "https://recxchange.io/use-cases" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Use Cases</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">How Hiring Managers Use RecXchange</h1>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl">Every hiring scenario is different. Here’s how RecXchange solves each one.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((uc) => (
              <Link key={uc.href} href={uc.href} className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200">
                <h2 className="text-white font-bold text-lg mb-3 group-hover:text-cyan-400 transition-colors">{uc.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
