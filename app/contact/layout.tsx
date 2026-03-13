// contact/metadata.ts removed — consolidated here.
import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: "Contact RecXchange | Talk to the Team | Support & Sales",
  description: "Get in touch with RecXchange. Questions about split fee recruitment, pricing, platform setup, or partnerships? Our team responds within one business day. Email: support@recxchange.io",
  keywords: [
    "contact RecXchange",
    "RecXchange support",
    "recruitment platform help",
    "split fee recruitment enquiry",
    "RecXchange sales",
    "get in touch RecXchange",
    "recruitment marketplace contact"
  ],
  alternates: {
    canonical: "https://recxchange.io/contact"
  },
  openGraph: {
    title: "Contact RecXchange | Talk to the Team",
    description: "Questions about split fees, pricing, or platform setup? Our team responds within one business day.",
    url: "https://recxchange.io/contact",
    type: "website",
    images: [{
      url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
      width: 1200,
      height: 630,
      alt: "Contact RecXchange"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RecXchange | Talk to the Team",
    description: "Questions about split fees, pricing, or setup? Responds within one business day.",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange"
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://recxchange.io/contact#webpage",
    "url": "https://recxchange.io/contact",
    "name": "Contact RecXchange",
    "description": "Contact the RecXchange team for support, sales, or partnership enquiries.",
    "isPartOf": { "@id": "https://recxchange.io/#website" },
    "about": { "@id": "https://recxchange.io/#organization" },
    "inLanguage": "en-GB",
    "breadcrumb": { "@id": "https://recxchange.io/contact#breadcrumb" }
  };

  const organizationContactSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://recxchange.io/#organization",
    "name": "RecXchange",
    "url": "https://recxchange.io",
    "email": "support@recxchange.io",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@recxchange.io",
        "availableLanguage": "English",
        "areaServed": "Worldwide"
      },
      {
        "@type": "ContactPoint",
        "contactType": "sales",
        "email": "support@recxchange.io",
        "availableLanguage": "English",
        "areaServed": "Worldwide"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/recxchange",
      "https://twitter.com/RecXchange"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://recxchange.io/contact#breadcrumb",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://recxchange.io" },
      { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://recxchange.io/contact" }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationContactSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
