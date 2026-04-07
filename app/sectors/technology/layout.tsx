import type { Metadata } from 'next';
import React from 'react';
export const metadata: Metadata = {
  title: "Technology Recruitment | Split Fee Roles | RecXchange",
  description: "Live technology split fee roles on RecXchange. Software engineers, DevOps, data science, cybersecurity and product roles. UK, USA, Europe, Asia Pacific.",
  keywords: ["technology recruitment","software engineer recruiter","tech recruiter split fee","DevOps recruiter","data science recruitment","cybersecurity recruiter","product manager recruitment","IT recruiter marketplace"],
  alternates: { canonical: "https://recxchange.io/sectors/technology" },
  openGraph: { title: "Technology Recruitment | Split Fee Roles | RecXchange", description: "Live tech split fee roles. Software, DevOps, data, cyber, product. UK, USA, Europe, APAC.", url: "https://recxchange.io/sectors/technology", type: "website", images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Technology Recruitment on RecXchange" }] },
  twitter: { card: "summary_large_image", title: "Technology Recruitment | RecXchange", description: "Live tech split fee roles. Software, DevOps, data, cyber, product.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const schema = { "@context": "https://schema.org", "@type": "WebPage", "@id": "https://recxchange.io/sectors/technology#webpage", "url": "https://recxchange.io/sectors/technology", "name": "Technology Recruitment | Split Fee Roles | RecXchange", "isPartOf": { "@id": "https://recxchange.io/#website" }, "about": { "@type": "Thing", "name": "Technology Recruitment" }, "breadcrumb": { "@type": "BreadcrumbList", "itemListElement": [ { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" }, { "@type": "ListItem", "position": 2, "name": "Sectors", "item": "https://recxchange.io/sectors" }, { "@type": "ListItem", "position": 3, "name": "Technology", "item": "https://recxchange.io/sectors/technology" } ] } };
  return ( <> <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /> {children} </> );
}
