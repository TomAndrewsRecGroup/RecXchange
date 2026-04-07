import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Why Choose RecXchange? | RecXchange",
  description: "Why 15,000+ recruiters choose RecXchange over agencies, job boards and RPO. Higher earnings, lower cost-per-hire, AI matching, split fee protection.",
  keywords: [
    "why choose RecXchange",
    "RecXchange vs recruitment agencies",
    "RecXchange vs job boards",
    "RecXchange vs RPO",
    "split fee recruitment benefits",
    "recruitment platform comparison",
    "best recruiter collaboration platform",
    "recruitment alternative",
    "earn more as a recruiter"
  ],
  alternates: {
    canonical: "https://recxchange.io/why-recxchange"
  },
  openGraph: {
    title: "Why Choose RecXchange? | RecXchange vs Traditional Recruitment",
    description: "15,000+ recruiters earn more with RecXchange than working alone. AI matching, automated split fees, 270M candidates. From $1/month.",
    url: "https://recxchange.io/why-recxchange",
    type: "article",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "Why Choose RecXchange, Platform Comparison"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Why Choose RecXchange? | Compare vs Traditional Recruitment",
    description: "Earn more, fill roles faster, split fees automatically. 15,000+ recruiters already switched. From $1/month.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function WhyRecXchangeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://recxchange.io/why-recxchange#article",
    "headline": "Why Choose RecXchange Over Traditional Recruitment?",
    "description": "A comparison of RecXchange split fee recruitment vs traditional recruitment agencies, job boards, and RPO providers. Covers earnings, cost-per-hire, candidate access, and platform features.",
    "author": { "@id": "https://recxchange.io/#tom-andrews" },
    "publisher": { "@id": "https://recxchange.io/#organization" },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-08",
    "url": "https://recxchange.io/why-recxchange",
    "mainEntityOfPage": "https://recxchange.io/why-recxchange",
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "keywords": "why RecXchange, recruiter collaboration, split fee recruitment, recruitment platform comparison, earn more as recruiter"
  };

  const featureListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": "https://recxchange.io/why-recxchange#features",
    "name": "Why RecXchange: Key Platform Advantages",
    "description": "The core reasons 15,000+ recruiters and hiring managers choose RecXchange over traditional alternatives.",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Earn more per placement",
        "description": "Recruiters earn an average of $7,000 per placement, their take-home cut after the split. Working collaboratively generates more placements than working alone."
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Access 270M candidate profiles",
        "description": "AI-powered search across 270 million global candidate profiles. Find candidates you wouldn't reach with a traditional database."
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Automated split fee protection",
        "description": "Every collaboration is protected by auto-generated, timestamped split fee agreements. No disputes, no handshake deals, no lost fees."
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "AI-powered Xchange Engine matching",
        "description": "Semantic AI matching connects roles to the right recruiter partners and candidates in seconds. No manual searching or cold outreach."
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "RecX Direct, up to 70% commission",
        "description": "Premium direct client roles with up to 70% fee splits. Exclusive to RecX Lite and Pro members. Higher value, faster payment (15-30 days)."
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "Lower cost per hire for employers",
        "description": "Hiring managers access 15,000+ recruiters competing to fill their role for one success fee of 12-20%, paid only on hire. No retainers, no exclusivity."
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "From $1/month, no platform fees on placements",
        "description": "Entry tier from $1/month. No percentage taken from placement fees. RecXchange earns from subscriptions, not from your commissions."
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/why-recxchange#webpage",
    "url": "https://recxchange.io/why-recxchange",
    "name": "Why Choose RecXchange? | RecXchange vs Traditional Recruitment",
    "description": "See why 15,000+ recruiters and hiring managers choose RecXchange. Compare split fee recruitment vs traditional agencies, job boards, and RPO providers.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/why-recxchange#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/why-recxchange#breadcrumb",
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
        "name": "Why RecXchange",
        "item": "https://recxchange.io/why-recxchange"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(featureListSchema) }}
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
