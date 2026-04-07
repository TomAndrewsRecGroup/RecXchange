import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Recruiters With Candidates | RecXchange",
  description: "Browse recruiters with pre-sourced candidates ready to place. Have a role but no candidates? Partner with one who does, agree a split, earn together.",
  keywords: [
    "recruiters with candidates",
    "find recruiter with candidates",
    "partner recruiter has candidate",
    "pre-sourced candidates recruiters",
    "recruiter talent pool",
    "split fee candidate partner",
    "recruiter has candidate for role",
    "candidate sharing recruiters"
  ],
  alternates: {
    canonical: "https://recxchange.io/recruiters-with-candidates"
  },
  openGraph: {
    title: "Find Recruiters With Candidates | RecXchange",
    description: "Have a role but no candidates? Partner with a recruiter who does. Agree a split, place together, earn together.",
    url: "https://recxchange.io/recruiters-with-candidates",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange, Find Recruiters With Candidates"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Recruiters With Candidates | RecXchange",
    description: "Have a role but no candidates? Partner with a recruiter who does. Split fees, earn together.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RecruitersWithCandidatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/recruiters-with-candidates#webpage",
    "url": "https://recxchange.io/recruiters-with-candidates",
    "name": "Find Recruiters With Candidates | Partner & Place | RecXchange",
    "description": "Browse recruiters who have pre-sourced candidates ready to place. Partner, agree a split, earn together.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/recruiters-with-candidates#breadcrumb" },
    "inLanguage": "en-GB"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/recruiters-with-candidates#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "For Recruiters", "item": "https://recxchange.io/recruiter" },
      { "@type": "ListItem", "position": 3, "name": "Recruiters With Candidates", "item": "https://recxchange.io/recruiters-with-candidates" }
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
