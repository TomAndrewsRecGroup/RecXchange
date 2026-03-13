import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Healthcare Recruitment | Split Fee Roles | RecXchange",
  description: "Browse live healthcare split fee roles on RecXchange. Nursing, allied health, mental health, clinical, medical, and NHS roles across UK, USA, Europe, Australia, and Middle East. Submit candidates. Earn an average of $7,000 per split placement.",
  keywords: ["healthcare recruitment","nursing recruitment split fee","allied health recruiter","mental health recruitment","NHS recruiter","clinical recruitment marketplace","healthcare recruiter collaboration","medical recruitment split fee"],
  alternates: { canonical: "https://recxchange.io/sectors/healthcare" },
  openGraph: { title: "Healthcare Recruitment | Split Fee Roles | RecXchange", description: "Live healthcare split fee roles. Nursing, allied health, mental health, clinical. UK, USA, Europe, Australia, Middle East.", url: "https://recxchange.io/sectors/healthcare", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Healthcare Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Healthcare Recruitment | RecXchange", description: "Live healthcare split fee roles. Nursing, allied health, mental health.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/healthcare#webpage", "url": "https://recxchange.io/sectors/healthcare", "name": "Healthcare Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Healthcare Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Healthcare", "item": "https://recxchange.io/sectors/healthcare" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
