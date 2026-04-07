// roles/metadata.ts removed - consolidated here.
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Live Split Fee Roles | Recruiter Job Board | RecXchange",
  description: "Browse live split fee roles from 15,000+ recruiters. Engineering, Healthcare, Tech, Sales, Finance. UK, USA, Europe, Australia. Avg $7,000 per placement.",
  keywords: [
    "live split fee roles",
    "recruiter job board",
    "split fee recruitment opportunities",
    "collaborative recruitment roles",
    "RecX Direct roles",
    "fee share placement",
    "recruiter marketplace jobs",
    "engineering split fee roles",
    "healthcare recruiter roles",
    "tech split placement",
    "finance recruiter opportunities",
    "UK split fee jobs",
    "global recruiter roles"
  ],
  alternates: {
    canonical: "https://recxchange.io/roles"
  },
  openGraph: {
    title: "Live Split Fee Roles | Recruiter Job Board | RecXchange",
    description: "1,000s of live roles. Submit candidates. Split fees 50/50, 60/40, or take 70% on RecX Direct. Average $7,000 per placement. $750k fees available now.",
    url: "https://recxchange.io/roles",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange - Live Split Fee Roles and Recruiter Job Board"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Split Fee Roles | RecXchange",
    description: "1,000s of live roles. Split 50/50, 60/40 or take 70% on RecX Direct. Average $7k per placement.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dataFeedSchema = {
    "@context": "https://schema.org",
    "@type": "DataFeed",
    "@id": "https://recxchange.io/roles#datafeed",
    "name": "RecXchange Live Recruitment Roles Feed",
    "description": "Live feed of split fee recruitment roles across Engineering, Healthcare, Technology, Sales, Finance, HR and more. Posted by 15,000+ specialist recruiters globally. Updated in real time.",
    "url": "https://recxchange.io/roles",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "about": [
      { "@type": "Thing", "name": "Split Fee Recruitment" },
      { "@type": "Thing", "name": "Recruiter Collaboration" },
      { "@type": "Thing", "name": "Job Placements" }
    ],
    "inLanguage": "en-GB"
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://recxchange.io/roles#webpage",
    "url": "https://recxchange.io/roles",
    "name": "Live Split Fee Roles | Recruiter Job Board | RecXchange",
    "description": "Browse 1,000s of live split fee roles. Submit candidates. Earn an average of $7,000 per placement.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/roles#datafeed" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/roles#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/roles#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Live Roles", "item": "https://recxchange.io/roles" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do split fee recruitment roles work on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A recruiter with a live role posts it on RecXchange. Another recruiter who has a matching candidate submits them. Both agree on a split (50/50, 60/40 or 70/30) before any candidate data is shared. If the candidate is placed, the fee is automatically split via the RecXchange escrow system. Contracts are auto-generated."
        }
      },
      {
        "@type": "Question",
        "name": "How much can I earn per placement on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recruiters earn an average of $7,000 per split placement on RecXchange. On RecX Direct roles, candidate-side recruiters take 70% of the placement fee. There is currently $750,000 in total available fees across live roles on the platform."
        }
      },
      {
        "@type": "Question",
        "name": "What sectors are available on the RecXchange roles board?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange has live split fee roles across Engineering, Healthcare, Technology, Sales, Finance, HR, Legal, Construction, Energy, and more. Roles span the UK, USA, Europe, Middle East & Africa, and Australia."
        }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange a job board for candidates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. RecXchange is a recruiter-to-recruiter and recruiter-to-hiring-manager marketplace. The roles feed is exclusively for professional recruiters to find placement partnerships. Candidates are not posted publicly - they are submitted privately by registered recruiters."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataFeedSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
