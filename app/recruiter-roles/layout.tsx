import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Browse Live Roles to Fill | RecXchange",
  description: "Live roles posted by recruiters who need candidate partners. Filter by sector, location and salary. Submit candidates, agree a split, earn on placement.",
  keywords: [
    "live recruiter roles",
    "roles to fill as recruiter",
    "split fee roles",
    "recruiter marketplace roles",
    "recruitment collaboration roles",
    "find roles to work on",
    "partner recruiter roles",
    "UK recruiter roles",
    "split placement opportunities"
  ],
  alternates: {
    canonical: "https://recxchange.io/recruiter-roles"
  },
  openGraph: {
    title: "Browse Live Roles to Fill | Recruiter Marketplace | RecXchange",
    description: "Hundreds of live roles from recruiters who need candidate partners. Filter by sector and location. Submit, agree a split, earn on placement.",
    url: "https://recxchange.io/recruiter-roles",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Browse Live Roles to Fill"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse Live Roles to Fill | RecXchange",
    description: "Hundreds of live roles. Submit candidates, agree a split, earn on placement. 15,000+ recruiters already in.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RecruiterRolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/recruiter-roles#webpage",
    "url": "https://recxchange.io/recruiter-roles",
    "name": "Browse Live Roles to Fill | Recruiter Marketplace | RecXchange",
    "description": "Browse hundreds of live roles posted by recruiters who need candidate partners. Filter by sector, location, and salary.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/recruiter-roles#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruiter-roles#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Recruiters", "item": "https://recxchange.io/recruiter" },
      { "@type": "ListItem", "position": 3, "name": "Browse Roles", "item": "https://recxchange.io/recruiter-roles" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
