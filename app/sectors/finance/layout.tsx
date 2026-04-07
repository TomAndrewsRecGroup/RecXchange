import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Finance Recruitment | Split Fee Roles | RecXchange",
  description: "Live finance and accounting split fee roles. CFOs, FDs, management accountants, controllers, risk, treasury, audit and fintech. UK, USA, Europe.",
  keywords: ["finance recruitment","accounting recruiter split fee","CFO recruitment","financial controller recruiter","management accountant jobs","fintech recruiter","risk recruitment","finance recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/finance" },
  openGraph: { title: "Finance Recruitment | Split Fee Roles | RecXchange", description: "Live finance split fee roles. CFOs, FDs, controllers, fintech. UK, USA, Europe, Middle East.", url: "https://recxchange.io/sectors/finance", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Finance Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Finance Recruitment | RecXchange", description: "Live finance split fee roles. CFOs, FDs, controllers, risk, audit.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/finance#webpage", "url": "https://recxchange.io/sectors/finance", "name": "Finance Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Finance Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Finance", "item": "https://recxchange.io/sectors/finance" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
