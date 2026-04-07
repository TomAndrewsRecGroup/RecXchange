import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Passive Candidate Sourcing | RecXchange",
  description: "Access passive candidates through 15,000+ specialist recruiters and a 270M profile database. Better than job boards or LinkedIn Recruiter alone.",
  keywords: [
    "passive candidate sourcing",
    "passive candidates",
    "source passive talent",
    "passive recruitment",
    "passive candidate database",
    "find passive candidates",
    "headhunting passive talent",
    "passive talent pool",
    "recruiter sourcing network",
    "hidden candidate market"
  ],
  alternates: { canonical: "https://recxchange.io/passive-candidate-sourcing" },
  openGraph: {
    title: "Passive Candidate Sourcing | RecXchange",
    description: "Access passive candidates through 15,000+ specialist recruiters and a 270M profile database. Reach talent that job boards cannot.",
    url: "https://recxchange.io/passive-candidate-sourcing",
    type: "website",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "Passive Candidate Sourcing, RecXchange" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Passive Candidate Sourcing | RecXchange",
    description: "Access passive candidates through 15,000+ specialist recruiters and a 270M profile database.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function PassiveCandidateSourcingLayout({ children }: { children: React.ReactNode }) {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://recxchange.io/passive-candidate-sourcing#webpage",
    "url": "https://recxchange.io/passive-candidate-sourcing",
    "name": "Passive Candidate Sourcing | RecXchange",
    "description": "Access passive candidates through 15,000+ specialist recruiters, each with their own networks of pre-screened talent, plus a 270M profile database.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "dateModified": "2026-04-02",
    "breadcrumb": { "@id": "https://recxchange.io/passive-candidate-sourcing#breadcrumb" },
    "inLanguage": "en-GB",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "[data-speakable]"]
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/passive-candidate-sourcing#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Passive Candidate Sourcing", "item": "https://recxchange.io/passive-candidate-sourcing" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is passive candidate sourcing?", "acceptedAnswer": { "@type": "Answer", "text": "Passive candidate sourcing is the process of identifying, engaging, and recruiting professionals who are not actively looking for a new job. These candidates are typically employed and performing well in their current roles, which makes them highly desirable but difficult to reach through job boards or standard advertising. Specialist recruiters excel at passive sourcing because they have built personal relationships with these candidates over years." } },
      { "@type": "Question", "name": "How does RecXchange help with passive candidate sourcing?", "acceptedAnswer": { "@type": "Answer", "text": "RecXchange gives you access to 15,000+ specialist recruiters, each with their own network of passive candidates built through years of relationship-building. When you post a role on RecXchange, the Xchange Engine identifies which recruiters are most likely to have matching passive candidates. This gives you reach into talent pools that no single recruiter, job board, or LinkedIn search could access alone." } },
      { "@type": "Question", "name": "Is passive sourcing through RecXchange better than LinkedIn Recruiter?", "acceptedAnswer": { "@type": "Answer", "text": "LinkedIn Recruiter gives you a search tool. RecXchange gives you 15,000+ specialist recruiters who already have relationships with passive candidates. The difference is that a LinkedIn InMail from a stranger has a response rate of around 10 to 25%. A phone call from a recruiter who placed that candidate three years ago has a far higher conversion rate. RecXchange also includes a 270M profile database for direct sourcing." } }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
