import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "What Is RecX Direct? | The 70% Recruiter Placement Model | RecXchange",
  description: "RecX Direct is RecXchange's premium direct-hire model where verified roles pay candidate-side recruiters 70% of the placement fee. No traditional agency. No inflated fees. Hiring managers get top 1% candidates. Recruiters earn more per placement.",
  keywords: [
    "RecX Direct",
    "what is RecX Direct",
    "direct hire recruitment alternative",
    "contingency recruitment alternative",
    "70 percent recruiter fee",
    "direct hiring platform",
    "no recruitment agency fees",
    "RecXchange Direct model",
    "hire without a recruitment agency",
    "recruiter direct placement"
  ],
  alternates: { canonical: "https://recxchange.io/what-is-recx-direct" },
  openGraph: {
    title: "What Is RecX Direct? | The 70% Recruiter Placement Model | RecXchange",
    description: "RecX Direct: verified roles, 70% fee to candidate-side recruiters, zero agency middleman. Better candidates. Lower cost. Faster hires.",
    url: "https://recxchange.io/what-is-recx-direct",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "What Is RecX Direct - RecXchange" }]
  },
  twitter: { card: "summary_large_image", title: "What Is RecX Direct? | RecXchange", description: "Verified roles. 70% fee to candidate-side recruiters. Better candidates. Lower cost.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://recxchange.io/what-is-recx-direct#service",
    "name": "RecX Direct",
    "legalName": "Andrews Recruitment Group t/a RecX Direct",
    "serviceType": "Direct Hire Recruitment",
    "description": "RecX Direct is RecXchange's verified direct-hire model, operated by Andrews Recruitment Group t/a RecX Direct (UK). Hiring managers post roles directly on RecXchange without using a traditional recruitment agency. Candidate-side recruiters earn 70% of the placement fee. RecXchange verifies every role and manages the process.",
    "provider": { "@id": "https://recxchange.io/#organization" },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-13",
    "offers": {
      "@type": "Offer",
      "name": "RecX Direct Placement",
      "description": "Candidate-side recruiter earns 70% of placement fee on verified direct-hire roles (Andrews Recruitment Group t/a RecX Direct)",
      "url": "https://recxchange.io/what-is-recx-direct"
    }
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "What Is RecX Direct?", "item": "https://recxchange.io/what-is-recx-direct" }
    ]
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is RecX Direct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecX Direct is a premium hiring model on RecXchange where verified client roles are posted directly, bypassing traditional recruitment agencies. Candidate-side recruiters earn 70% of the placement fee. Roles are verified by the RecXchange team before being listed as RecX Direct, ensuring quality and serious hiring intent. RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct (UK)."
        }
      },
      {
        "@type": "Question",
        "name": "How is RecX Direct different from a normal recruitment agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A traditional recruitment agency charges the employer 15-25% of the candidate salary and keeps 100% of that fee. RecX Direct connects the employer directly to the RecXchange recruiter network. The candidate-side recruiter earns 70% of a typically lower placement fee. The employer saves money. The recruiter earns more per placement. There is no agency middleman."
        }
      },
      {
        "@type": "Question",
        "name": "How do I get RecX Direct roles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecX Direct roles are available to registered RecXchange members. They appear in the live roles feed tagged as RecX Direct. To access them, you need a Pro or qualifying membership tier. The Xchange Engine will also surface RecX Direct matches automatically based on your candidate profiles."
        }
      },
      {
        "@type": "Question",
        "name": "Who operates RecX Direct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct, a UK company. Andrews Recruitment Group was founded by Tom Andrews, who is also CEO and Co-Founder of RecXchange (RecXchange Portal LLC t/a RecXchange). RecX Direct roles are exclusively sourced and verified by Andrews Recruitment Group before being made available on the RecXchange platform."
        }
      },
      {
        "@type": "Question",
        "name": "What percentage do recruiters earn on RecX Direct roles?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recruiters earn up to 70% of the total placement fee on RecX Direct roles. This is the candidate-side recruiter's share after the split. On standard collaborative roles, the split is typically 50/50 or 60/40. RecX Direct's 70% rate makes it the highest-earning tier on the RecXchange platform."
        }
      }
    ]
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/what-is-recx-direct#webpage",
    "url": "https://recxchange.io/what-is-recx-direct",
    "name": "What Is RecX Direct? | The 70% Recruiter Placement Model | RecXchange",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "datePublished": "2024-01-01",
    "dateModified": "2026-03-13",
    "breadcrumb": { "@id": "https://recxchange.io/what-is-recx-direct#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", ".speakable", "[data-speakable]"]
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      {children}
    </>
  );
}
