import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "HR Recruitment | Split Fee Roles | RecXchange",
  description: "Live HR split fee roles on RecXchange. HR directors, HR business partners, talent acquisition, L&D, HR managers and people operations. UK, USA, Europe.",
  keywords: ["HR recruitment","HR recruiter split fee","HRBP recruiter","talent acquisition recruitment","HR director jobs","L&D recruiter","people operations recruitment","HR recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/hr-recruitment" },
  openGraph: { title: "HR Recruitment | Split Fee Roles | RecXchange", description: "Live HR split fee roles. HRDs, HRBPs, talent acquisition, L&D.", url: "https://recxchange.io/sectors/hr-recruitment", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "HR Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "HR Recruitment | RecXchange", description: "Live HR split fee roles. HRDs, HRBPs, talent acquisition, L&D.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/hr-recruitment#webpage", "url": "https://recxchange.io/sectors/hr-recruitment", "name": "HR Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "HR Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "HR", "item": "https://recxchange.io/sectors/hr-recruitment" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
