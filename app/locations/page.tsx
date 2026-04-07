import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Recruitment by Location | RecXchange",
  description: "Specialist recruiter networks across London, Manchester, Birmingham, UK-wide, USA, UAE, Australia and international. Cross-border hiring. Pay on placement.",
  alternates: { canonical: "https://recxchange.io/locations" },
  openGraph: {
    title: "Recruitment by Location | RecXchange",
    description: "Specialist recruiter networks: London, Manchester, Birmingham, USA, UAE, Australia, international.",
    url: "https://recxchange.io/locations",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "RecXchange Locations" }]
  },
};

const locations = [
  { href: "/locations/recruitment-london", title: "London", desc: "The UK's largest specialist recruitment market. Finance, Technology, Legal, Healthcare, and more." },
  { href: "/locations/recruitment-manchester", title: "Manchester", desc: "Northern England's leading talent hub. Technology, Engineering, Healthcare, Finance." },
  { href: "/locations/recruitment-birmingham", title: "Birmingham", desc: "Midlands specialist hiring. Engineering, Construction, Manufacturing, Finance." },
  { href: "/locations/recruitment-usa", title: "United States", desc: "Coast-to-coast US specialist hiring. Technology, Finance, Healthcare, Engineering." },
  { href: "/locations/recruitment-uae", title: "UAE & Middle East", desc: "Dubai, Abu Dhabi, and wider Gulf. Engineering, Finance, Technology, Construction." },
  { href: "/locations/recruitment-australia", title: "Australia", desc: "Sydney, Melbourne, Brisbane, and nationwide. Engineering, Mining, Healthcare, Technology." },
];

export default function LocationsHubPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/locations#collectionpage",
    "url": "https://recxchange.io/locations",
    "name": "Recruitment by Location | RecXchange",
    "description": "RecXchange specialist recruiter networks by geography.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
        { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://recxchange.io/locations" }
      ]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main className="relative bg-[#0a0a0f] min-h-screen">
        <div className="max-w-5xl mx-auto px-6 py-24">
          <p className="text-cyan-400 text-sm font-bold uppercase tracking-widest mb-4">Locations</p>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Recruitment Across the Globe</h1>
          <p className="text-gray-300 text-lg mb-16 max-w-2xl">Local specialist networks in the UK’s major markets, plus USA, UAE, Australia, and international cross-border hiring.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {locations.map((l) => (
              <Link key={l.href} href={l.href} className="group block p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all duration-200">
                <h2 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{l.title}</h2>
                <p className="text-gray-400 text-sm leading-relaxed">{l.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
