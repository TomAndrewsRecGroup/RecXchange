import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Construction Recruitment | Split Fee Roles | RecXchange",
  description: "Live construction split fee roles. Project managers, site managers, QSs, estimators, contracts managers and directors. UK, UAE, Australia, South Africa.",
  keywords: ["construction recruitment","construction recruiter split fee","project manager recruitment","quantity surveyor recruiter","site manager jobs","estimator recruitment","contracts manager recruiter","construction recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/construction" },
  openGraph: { title: "Construction Recruitment | Split Fee Roles | RecXchange", description: "Live construction split fee roles. PMs, QSs, site managers, estimators. UK, UAE, Australia.", url: "https://recxchange.io/sectors/construction", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Construction Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Construction Recruitment | RecXchange", description: "Live construction split fee roles. PMs, QSs, site managers, estimators.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/construction#webpage", "url": "https://recxchange.io/sectors/construction", "name": "Construction Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Construction Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Construction", "item": "https://recxchange.io/sectors/construction" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
