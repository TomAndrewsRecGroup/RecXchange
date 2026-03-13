// metadata.ts removed — metadata consolidated here to avoid dual-export conflict.
// layout.tsx export takes precedence in Next.js; metadata.ts was being silently ignored.
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Deal Protection & Split Fee Agreements | RecXchange",
  description: "Timestamped candidate submissions. Auto-generated split fee contracts. Legal protection for both recruiters. See how RecXchange protects your placements and revenue with immutable submission tracking.",
  keywords: [
    "deal protection recruitment",
    "split fee agreements",
    "recruitment contract protection",
    "candidate submission tracking",
    "recruiter legal protection",
    "timestamped submissions",
    "recruitment IP protection",
    "split fee contract automation",
    "RecXchange deal protection"
  ],
  alternates: {
    canonical: "https://recxchange.io/deal-protection"
  },
  openGraph: {
    title: "Deal Protection & Split Fee Agreements | RecXchange",
    description: "Timestamped submissions. Auto-generated split fee contracts. Legal protection for both parties on every placement.",
    url: "https://recxchange.io/deal-protection",
    type: "article",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange Deal Protection — Split Fee Agreements"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Deal Protection & Split Fee Agreements | RecXchange",
    description: "Timestamped submissions. Auto-generated contracts. Legal protection for both recruiters on every placement.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function DealProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://recxchange.io/deal-protection#howto",
    "name": "How RecXchange Deal Protection Works",
    "description": "How RecXchange automatically protects both recruiters on every split fee collaboration with timestamped submissions and auto-generated contracts.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Split terms agreed before submission",
        "text": "Before any candidate details are shared, both recruiters agree on the split percentage (50/50, 60/40, or up to 70/30 for RecX Direct). Terms are locked in writing on the platform.",
        "url": "https://recxchange.io/deal-protection#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Candidate submitted with timestamp",
        "text": "When Recruiter B submits a candidate, the submission is immediately timestamped and immutably recorded on the platform. This creates a verifiable record of who submitted whom and when.",
        "url": "https://recxchange.io/deal-protection#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Auto-generated split fee contract",
        "text": "A legally binding split fee agreement is automatically generated, referencing the agreed percentages, candidate details, and role details. Both parties receive a copy.",
        "url": "https://recxchange.io/deal-protection#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Placement confirmed, fee distributed automatically",
        "text": "On successful placement, the client pays the full fee. RecXchange distributes each recruiter's share according to the contract, automatically. No chasing, no disputes.",
        "url": "https://recxchange.io/deal-protection#step-4"
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/deal-protection#article",
    "headline": "Deal Protection & Split Fee Agreements on RecXchange",
    "description": "How RecXchange protects both recruiters on every split fee placement. Timestamped submissions, auto-generated contracts, and automated fee distribution.",
    "author": { "@id": "https://recxchange.io/#tom-andrews" },
    "publisher": { "@id": "https://recxchange.io/#organization" },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-08",
    "url": "https://recxchange.io/deal-protection",
    "mainEntityOfPage": "https://recxchange.io/deal-protection",
    "about": { "@id": "https://recxchange.io/#service" },
    "keywords": "deal protection, split fee agreement, timestamped submission, recruitment contract, RecXchange"
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/deal-protection#webpage",
    "url": "https://recxchange.io/deal-protection",
    "name": "Deal Protection & Split Fee Agreements | RecXchange",
    "description": "Timestamped candidate submissions. Auto-generated split fee contracts. Legal protection for both recruiters on every placement.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#service" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/deal-protection#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/deal-protection#breadcrumb",
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
        "name": "Deal Protection",
        "item": "https://recxchange.io/deal-protection"
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
