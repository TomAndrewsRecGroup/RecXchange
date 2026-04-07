// metadata.ts removed — metadata consolidated here to avoid dual-export conflict.
// FAQPage JSON-LD is output directly in page.tsx (uses detailedAnswer for richer text).
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "FAQ | RecXchange, How Split Fee Recruitment Works",
  description: "RecXchange FAQ: how split fees work, what tokens are, deal protection, pricing, RecX Direct roles, platform features and getting started.",
  keywords: [
    "RecXchange FAQ",
    "split fee recruitment questions",
    "how does RecXchange work",
    "recruitment platform FAQ",
    "split fee agreement questions",
    "recruitment tokens explained",
    "RecX Direct explained",
    "recruiter collaboration questions"
  ],
  alternates: {
    canonical: "https://recxchange.io/faq"
  },
  openGraph: {
    title: "FAQ | RecXchange, How Split Fee Recruitment Works",
    description: "How do split fees work? What are tokens? How is deal protection handled? Everything you need to know about RecXchange.",
    url: "https://recxchange.io/faq",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "RecXchange FAQ, Frequently Asked Questions"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | RecXchange, How Split Fee Recruitment Works",
    description: "How do split fees work? What are tokens? Everything you need to know about RecXchange.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/faq#webpage",
    "url": "https://recxchange.io/faq",
    "name": "FAQ | RecXchange, How Split Fee Recruitment Works",
    "description": "Common questions about RecXchange: split fees, tokens, deal protection, pricing, RecX Direct, and platform features.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#softwareapplication" },
    "dateModified": "2026-03-08",
    "breadcrumb": { "@id": "https://recxchange.io/faq#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/faq#breadcrumb",
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
        "name": "FAQ",
        "item": "https://recxchange.io/faq"
      }
    ]
  };

  return (
    <>
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
