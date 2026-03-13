import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Engineering Recruitment | Split Fee Roles | RecXchange",
  description: "Browse live engineering split fee roles on RecXchange. Mechanical, electrical, civil, structural, M&E, and industrial engineering vacancies across the UK, USA, Europe, Middle East, and Australia. Submit candidates. Split fees 50/50, 60/40 or earn 70% on RecX Direct.",
  keywords: ["engineering recruitment","engineering split fee roles","mechanical engineering recruiter","electrical engineering jobs","civil engineering recruitment","M&E recruiter","engineering recruiter marketplace","industrial engineering split fee"],
  alternates: { canonical: "https://recxchange.io/sectors/engineering" },
  openGraph: { title: "Engineering Recruitment | Split Fee Roles | RecXchange", description: "Live engineering split fee roles. Mechanical, electrical, civil, M&E. UK, USA, Europe, Middle East, Australia.", url: "https://recxchange.io/sectors/engineering", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Engineering Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Engineering Recruitment | RecXchange", description: "Live engineering split fee roles across UK, USA, Europe, MEA, Australia.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/engineering#webpage", "url": "https://recxchange.io/sectors/engineering", "name": "Engineering Recruitment | Split Fee Roles | RecXchange", "description": "Live engineering split fee recruitment roles on RecXchange.", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Engineering Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Engineering", "item": "https://recxchange.io/sectors/engineering" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
