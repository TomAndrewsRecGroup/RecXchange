import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Sales Recruitment | Split Fee Roles | RecXchange",
  description: "Live sales recruitment split fee roles on RecXchange. Account executives, BDMs, sales directors, SDRs, enterprise sales, SaaS sales, and commercial roles across UK, USA, Europe.",
  keywords: ["sales recruitment","sales recruiter split fee","BDM recruitment","account executive recruiter","sales director jobs","SaaS sales recruiter","commercial recruitment","sales recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/sales" },
  openGraph: { title: "Sales Recruitment | Split Fee Roles | RecXchange", description: "Live sales split fee roles. BDMs, AEs, sales directors, SaaS, enterprise.", url: "https://recxchange.io/sectors/sales", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Sales Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Sales Recruitment | RecXchange", description: "Live sales split fee roles. BDMs, AEs, directors, SaaS.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/sales#webpage", "url": "https://recxchange.io/sectors/sales", "name": "Sales Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Sales Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Sales", "item": "https://recxchange.io/sectors/sales" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
