import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Legal Recruitment | Split Fee Roles | RecXchange",
  description: "Live legal split fee roles. Solicitors, barristers, paralegals, in-house counsel, compliance lawyers and legal executives. UK, USA, UAE, Europe.",
  keywords: ["legal recruitment","solicitor recruiter","legal recruiter split fee","in-house counsel recruitment","compliance lawyer jobs","paralegal recruiter","legal executive recruitment","law firm recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/legal" },
  openGraph: { title: "Legal Recruitment | Split Fee Roles | RecXchange", description: "Live legal split fee roles. Solicitors, in-house counsel, compliance. UK, USA, UAE.", url: "https://recxchange.io/sectors/legal", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Legal Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Legal Recruitment | RecXchange", description: "Live legal split fee roles. Solicitors, in-house counsel, compliance.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/legal#webpage", "url": "https://recxchange.io/sectors/legal", "name": "Legal Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Legal Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Legal", "item": "https://recxchange.io/sectors/legal" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
