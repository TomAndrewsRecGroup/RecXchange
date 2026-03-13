import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How Split Fee Recruitment Works | RecXchange",
  description: "Split fee recruitment explained: two recruiters collaborate on one placement and share the fee. RecXchange automates split agreements at 50/50, 60/40, or up to 70/30 on RecX Direct roles. Timestamped protection, auto-generated contracts, transparent earnings.",
  keywords: [
    "split fee recruitment",
    "how split fees work",
    "recruiter fee sharing",
    "split fee agreement",
    "collaborative recruitment",
    "50 50 recruitment split",
    "fee sharing recruiters",
    "split placement recruitment",
    "recruitment partnership model",
    "RecXchange split fees"
  ],
  alternates: {
    canonical: "https://recxchange.io/split-fees"
  },
  openGraph: {
    title: "How Split Fee Recruitment Works | RecXchange",
    description: "Two recruiters, one placement, shared fee. RecXchange automates split agreements at 50/50, 60/40, or up to 70/30. Timestamped protection on every deal.",
    url: "https://recxchange.io/split-fees",
    type: "article",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "How Split Fee Recruitment Works — RecXchange"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "How Split Fee Recruitment Works | RecXchange",
    description: "Two recruiters, one placement, shared fee. Automated at 50/50, 60/40, or up to 70/30. Timestamped protection on every deal.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function SplitFeesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://recxchange.io/split-fees#howto",
    "name": "How to Make a Split Fee Placement on RecXchange",
    "description": "A step-by-step guide to how split fee recruitment collaboration works on RecXchange. Two recruiters partner on one placement and automatically share the fee.",
    "totalTime": "PT48H",
    "tool": [
      { "@type": "HowToTool", "name": "RecXchange Platform (app.recxchange.io)" },
      { "@type": "HowToTool", "name": "Xchange Engine (AI matching)" }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Post a role or upload a candidate",
        "text": "Recruiter A either posts a live role they need to fill, or uploads a candidate they want to place. Role details or candidate profile are broadcast to the RecXchange network.",
        "url": "https://recxchange.io/split-fees#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "AI matching finds a partner",
        "text": "The Xchange Engine automatically matches the role to recruiters with relevant candidates, or matches the candidate to recruiters with relevant live roles. Recruiter B is identified as the best partner.",
        "url": "https://recxchange.io/split-fees#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Agree split terms",
        "text": "Both recruiters agree on fee split terms: 50/50, 60/40, or up to 70/30 for RecX Direct roles. Terms are set before any candidate details are exchanged.",
        "url": "https://recxchange.io/split-fees#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Submit the candidate",
        "text": "Recruiter B submits the candidate to Recruiter A's role. The submission is timestamped and locked — protecting both parties with an auto-generated split fee agreement.",
        "url": "https://recxchange.io/split-fees#step-4"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Placement made, fee split automatically",
        "text": "The candidate is placed. The client pays the full fee to RecXchange. RecXchange distributes each recruiter's agreed share automatically. Recruiter A earns their split. Recruiter B earns their split.",
        "url": "https://recxchange.io/split-fees#step-5"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/split-fees#article",
    "headline": "How Split Fee Recruitment Works on RecXchange",
    "description": "Split fee recruitment explained: two recruiters collaborate on one placement and share the fee. RecXchange automates split agreements at 50/50, 60/40, or up to 70/30 on RecX Direct roles.",
    "author": { "@id": "https://recxchange.io/#tom-andrews" },
    "publisher": { "@id": "https://recxchange.io/#organization" },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-08",
    "url": "https://recxchange.io/split-fees",
    "mainEntityOfPage": "https://recxchange.io/split-fees",
    "about": { "@id": "https://recxchange.io/#service" },
    "keywords": "split fee recruitment, recruiter collaboration, fee sharing, split placement, RecXchange"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/split-fees#webpage",
    "url": "https://recxchange.io/split-fees",
    "name": "How Split Fee Recruitment Works | RecXchange",
    "description": "How split fee collaboration works on RecXchange. Partner with 15,000+ recruiters, share opportunities, and earn fair splits on successful placements.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/split-fees#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/split-fees#breadcrumb",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://recxchange.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Split Fees",
        "item": "https://recxchange.io/split-fees"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
