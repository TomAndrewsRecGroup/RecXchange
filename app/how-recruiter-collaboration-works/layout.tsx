import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "How Recruiter Collaboration Works | RecXchange Guide",
  description: "Recruiter collaboration: one brings the role, one brings the candidate. The step-by-step process and how RecXchange makes it safe and automated.",
  keywords: [
    "recruiter collaboration",
    "how recruiter collaboration works",
    "recruiter partnership",
    "recruitment collaboration model",
    "recruiter to recruiter marketplace",
    "collaborative hiring",
    "recruitment partner network",
    "how to collaborate with recruiters"
  ],
  alternates: { canonical: "https://recxchange.io/how-recruiter-collaboration-works" },
  openGraph: {
    title: "How Recruiter Collaboration Works | RecXchange",
    description: "The complete step-by-step guide to recruiter collaboration, how to partner, agree splits, protect your deals, and make more placements.",
    url: "https://recxchange.io/how-recruiter-collaboration-works",
    type: "article",
    images: [{ url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png", width: 1200, height: 630, alt: "How Recruiter Collaboration Works, RecXchange" }]
  },
  twitter: { card: "summary_large_image", title: "How Recruiter Collaboration Works | RecXchange", description: "Step-by-step guide to recruiter partnerships, split fees, and safe collaboration.", images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"] }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Recruiter Collaboration Works on RecXchange",
    "description": "A step-by-step guide to collaborating with other recruiters on RecXchange to make split fee placements.",
    "totalTime": "PT10M",
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "Post Your Role or Candidate", "text": "A recruiter with a live role posts it on RecXchange. A recruiter with a matching candidate can also post their candidate profile to attract role-side partners." },
      { "@type": "HowToStep", "position": 2, "name": "Xchange Engine Matches", "text": "The RecXchange AI engine automatically matches roles to candidate profiles across 15,000+ recruiter databases and surfaces high-compatibility partnerships." },
      { "@type": "HowToStep", "position": 3, "name": "Agree the Split", "text": "Both recruiters negotiate and agree on a fee split (50/50, 60/40, or 70/30) before any private data is exchanged." },
      { "@type": "HowToStep", "position": 4, "name": "Sign the Auto-Contract", "text": "RecXchange generates a legally binding split fee agreement instantly. Both parties sign digitally. This creates a permanent timestamped record." },
      { "@type": "HowToStep", "position": 5, "name": "Share and Submit", "text": "Private candidate and client details are now safely shared. The candidate is submitted to the role." },
      { "@type": "HowToStep", "position": 6, "name": "Placement and Fee Split", "text": "When the candidate accepts the offer, both recruiters invoice their respective clients for their agreed split. RecXchange takes zero platform fee." }
    ]
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "How Recruiter Collaboration Works", "item": "https://recxchange.io/how-recruiter-collaboration-works" }
    ]
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howTo) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {children}
    </>
  );
}
