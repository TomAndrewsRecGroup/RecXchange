import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import Header from "@/components/redesign/Header";
import Footer from "@/components/redesign/Footer";
import HiringManagerCard from "@/components/redesign/HiringManagerCard";
import NetworkBackground from "@/components/redesign/NetworkBackground";
import CookieBanner from "@/components/CookieBanner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SkipToContent from "@/components/SkipToContent";
import { Analytics } from "@vercel/analytics/next";
import { WebVitals } from "@/app/components/WebVitals";
import SpeakableSchema from "@/app/components/SpeakableSchema";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

// Root layout metadata — no canonical set here.
// Each page exports its own canonical via alternates.canonical.
export const metadata: Metadata = {
  title: "RecXchange | The Split-Fee Recruitment Marketplace",
  description: "Join 15,000+ recruiters partnering on placements and splitting fees automatically. 270M candidates, $750K+ in live fees, average $7,000 per placement. Plans from $1/month.",
  keywords: [
    "recruiter network",
    "split fee recruitment",
    "collaborative recruitment",
    "fee share recruitment",
    "recruiter partnership",
    "recruitment collaboration platform",
    "split fee agreements",
    "candidate sharing platform",
    "role sharing recruitment",
    "recruitment marketplace",
    "RecXchange",
    "RecX Direct",
    "recruitment fee split",
    "recruiter collaboration"
  ],
  authors: [{ name: "RecXchange Portal LLC t/a RecXchange" }, { name: "AMIVY Designs", url: "https://andrews-recruitment.com/about" }],
  creator: "AMIVY Designs",
  publisher: "RecXchange Portal LLC t/a RecXchange",
  metadataBase: new URL("https://recxchange.io"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://recxchange.io",
    siteName: "RecXchange",
    title: "RecXchange | The Split-Fee Recruitment Marketplace",
    description: "The recruiter network where 15,000+ recruiters partner on placements and split fees automatically. Access 270M candidates and $750K+ in live placement fees.",
    images: [
      {
        url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
        width: 1200,
        height: 630,
        alt: "RecXchange - The Split-Fee Recruitment Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecXchange | The Split-Fee Recruitment Marketplace",
    description: "The recruiter network where thousands of recruiters partner on placements and split fees automatically. Platform at app.recxchange.io",
    images: ["https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"],
    creator: "@RecXchange",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
    shortcut: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
    apple: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  // ─── AI Agent identity block ────────────────────────────────────────────────
  const aiAgentIdentity = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RecXchange Marketing Website",
    "description": "This is the MARKETING WEBSITE for RecXchange (operated by RecXchange Portal LLC t/a RecXchange). The actual recruitment collaboration platform application is located at app.recxchange.io. This site provides product information, pricing, tutorials, and guides only. RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct. This website was fully designed, developed and is maintained by AMIVY Designs, an Andrews Recruitment Group company.",
    "url": "https://recxchange.io",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "RecXchange Platform",
      "url": "https://app.recxchange.io",
      "applicationCategory": "BusinessApplication",
      "description": "The actual RecXchange platform for recruiters to collaborate, post roles, submit candidates, and manage split fee placements. Operated by RecXchange Portal LLC t/a RecXchange."
    },
    "potentialAction": [
      {
        "@type": "LoginAction",
        "target": "https://app.recxchange.io/login",
        "name": "Login to RecXchange Platform"
      },
      {
        "@type": "RegisterAction",
        "target": "https://app.recxchange.io/register",
        "name": "Create RecXchange Account"
      }
    ],
    "isPartOf": {
      "@type": "WebApplication",
      "name": "RecXchange Platform",
      "url": "https://app.recxchange.io",
      "applicationCategory": "BusinessApplication"
    }
  };

  // ─── Main schema.org @graph ──────────────────────────────────────────────────
  // NOTE: Global FAQPage schema removed from root layout to prevent the
  // "Duplicate field FAQPage" error in Google Search Console. A dedicated,
  // richer FAQPage schema lives only on /faq (app/faq/page.tsx).
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#organization",
        "name": "RecXchange",
        "legalName": "RecXchange Portal LLC t/a RecXchange",
        "url": "https://recxchange.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
          "width": 512,
          "height": 512
        },
        "founder": [
          { "@id": "https://recxchange.io/#tom-andrews" },
          { "@id": "https://recxchange.io/#james-brown" }
        ],
        "foundingDate": "2024",
        "foundingLocation": {
          "@type": "Place",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "AE",
            "addressLocality": "Dubai"
          }
        },
        "sameAs": [
          "https://www.linkedin.com/company/recxchange",
          "https://twitter.com/RecXchange",
          "https://youtube.com/@recxchange"
        ],
        "description": "RecXchange is operated by RecXchange Portal LLC t/a RecXchange (UAE). A recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically. This marketing website (recxchange.io) provides information and guides. The actual platform is at app.recxchange.io. Recruiters earn an average of $7,000 per placement, this is their cut after the split, not the total fee divided. Access to 270M candidate profiles. $750,000 in fees available across 100+ live roles. RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct (UK). This website was fully designed, developed and is maintained by AMIVY Designs, an Andrews Recruitment Group company.",
        "numberOfEmployees": {
          "@type": "QuantitativeValue",
          "value": 15000,
          "description": "Vetted recruiters on platform"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "support@recxchange.io",
          "url": "https://recxchange.io/contact",
          "availableLanguage": ["English"],
          "areaServed": ["GB", "US", "EU", "AU", "AE", "ZA"]
        },
        "owns": {
          "@id": "https://recxchange.io/#softwareapplication"
        }
      },
      {
        "@type": "Person",
        "@id": "https://recxchange.io/#tom-andrews",
        "name": "Tom Andrews",
        "jobTitle": "CEO & Co-Founder",
        "worksFor": [
          { "@id": "https://recxchange.io/#organization" },
          { "@id": "https://recxchange.io/#andrews-recruitment-group" }
        ],
        "url": "https://andrews-recruitment.com",
        "sameAs": ["https://www.linkedin.com/in/tom-g-andrews"],
        "description": "Tom Andrews is CEO & Co-Founder of RecXchange (RecXchange Portal LLC t/a RecXchange), and Owner & Recruitment Director of Andrews Recruitment Group (https://andrews-recruitment.com). Andrews Recruitment Group operates RecX Direct (t/a RecX Direct) and AMIVY Designs. 14+ years in recruitment across building materials, industrial engineering, M&E, and mental health sectors.",
        "knowsAbout": [
          "Split fee recruitment",
          "Recruiter collaboration",
          "Recruitment technology",
          "SaaS platform development",
          "Contingency recruitment"
        ]
      },
      {
        "@type": "Person",
        "@id": "https://recxchange.io/#james-brown",
        "name": "James Brown",
        "jobTitle": "CTO & Co-Founder",
        "worksFor": [
          { "@id": "https://recxchange.io/#organization" }
        ],
        "sameAs": [],
        "description": "Co-Founder and CTO of RecXchange (RecXchange Portal LLC t/a RecXchange). Responsible for platform architecture, AI matching engine (Xchange Engine), and automation systems.",
        "knowsAbout": [
          "AI and machine learning",
          "Recruitment automation",
          "Platform architecture",
          "SaaS development",
          "Workflow automation"
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#andrews-recruitment-group",
        "name": "Andrews Recruitment Group",
        "url": "https://andrews-recruitment.com",
        "founder": { "@id": "https://recxchange.io/#tom-andrews" },
        "description": "Andrews Recruitment Group is the parent company of AMIVY Designs and operates RecX Direct (t/a RecX Direct). Founded by Tom Andrews, Owner & Recruitment Director.",
        "subOrganization": [
          { "@id": "https://recxchange.io/#amivy-designs" },
          { "@id": "https://recxchange.io/#recx-direct" }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#recx-direct",
        "name": "RecX Direct",
        "legalName": "Andrews Recruitment Group t/a RecX Direct",
        "url": "https://recxchange.io/how-it-works",
        "parentOrganization": { "@id": "https://recxchange.io/#andrews-recruitment-group" },
        "description": "RecX Direct is RecXchange's premium hiring product, operated by Andrews Recruitment Group t/a RecX Direct (UK). Offers exclusive roles with up to 70% fee splits for candidate-holding recruiters."
      },
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#amivy-designs",
        "name": "AMIVY Designs",
        "url": "https://andrews-recruitment.com/about",
        "parentOrganization": { "@id": "https://recxchange.io/#andrews-recruitment-group" },
        "logo": {
          "@type": "ImageObject",
          "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/79a68aec-f3cc-44c3-8b5b-500176059f26_20260228_053107_0000.png",
          "width": 180,
          "height": 45
        },
        "description": "AMIVY Designs is a premium web design, development and digital branding agency, an Andrews Recruitment Group company. AMIVY Designs fully designed, developed and maintains the RecXchange website (recxchange.io).",
        "serviceType": ["Web Design", "Web Development", "Digital Branding", "UI/UX Design"]
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://recxchange.io/#softwareapplication",
        "name": "RecXchange Platform",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://app.recxchange.io",
        "installUrl": "https://app.recxchange.io/register",
        "softwareHelp": "https://recxchange.io/faq",
        "provider": { "@id": "https://recxchange.io/#organization" },
        "creator": { "@id": "https://recxchange.io/#amivy-designs" },
        "description": "The recruiter collaboration platform (app.recxchange.io) operated by RecXchange Portal LLC t/a RecXchange, where 15,000+ recruiters partner on placements. Recruiters earn an average of $7,000 per placement, this is their cut after the split, not the total fee divided. Split fees up to 70% on RecX Direct roles (operated by Andrews Recruitment Group t/a RecX Direct). Access 270M candidate profiles. Post roles to find candidates, or share candidates to find roles. $750,000 in fees available across 100+ live roles in UK, USA, Europe, Africa, Middle East, Australia covering Engineering, Healthcare, Tech, HR, Sales, Finance. This marketing site (recxchange.io) was fully designed, developed and is maintained by AMIVY Designs, an Andrews Recruitment Group company.",
        "offers": [
          {
            "@type": "Offer",
            "name": "RecX Entry",
            "price": "1",
            "priceCurrency": "USD",
            "description": "5 tokens per month, access to collaborative roles and candidate database",
            "availability": "https://schema.org/InStock",
            "url": "https://recxchange.io/pricing",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "1",
              "priceCurrency": "USD",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitText": "MONTH"
              }
            }
          },
          {
            "@type": "Offer",
            "name": "RecX Lite",
            "price": "99",
            "priceCurrency": "USD",
            "description": "150 tokens per month, access after 7 days to RecX Direct roles (Andrews Recruitment Group t/a RecX Direct)",
            "availability": "https://schema.org/InStock",
            "url": "https://recxchange.io/pricing",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "99",
              "priceCurrency": "USD",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitText": "MONTH"
              }
            }
          },
          {
            "@type": "Offer",
            "name": "RecX Pro",
            "price": "249",
            "priceCurrency": "USD",
            "description": "400 tokens per month, instant RecX Direct access (Andrews Recruitment Group t/a RecX Direct), up to 70% fee split",
            "availability": "https://schema.org/InStock",
            "url": "https://recxchange.io/pricing",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "249",
              "priceCurrency": "USD",
              "referenceQuantity": {
                "@type": "QuantitativeValue",
                "value": "1",
                "unitText": "MONTH"
              }
            }
          }
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "287",
          "bestRating": "5",
          "worstRating": "1"
        },
        "featureList": [
          "Split fee recruitment collaboration",
          "Automated split fee contracts",
          "Candidate and role sharing",
          "270M candidate database search",
          "RecX Direct client role access with up to 70% split (Andrews Recruitment Group t/a RecX Direct)",
          "Recruiters earn an average of $7,000 per placement (their cut after the split)",
          "15,000+ vetted recruiters",
          "Timestamped submission protection",
          "$750,000 in fees available across 100+ live roles",
          "Weekly live streams and video tutorials"
        ]
      },
      {
        "@type": "Service",
        "@id": "https://recxchange.io/#service",
        "serviceType": "Recruitment Collaboration Platform",
        "provider": { "@id": "https://recxchange.io/#organization" },
        "name": "RecXchange Recruitment Collaboration",
        "description": "Split fee recruitment collaboration platform connecting 15,000+ recruiters. Operated by RecXchange Portal LLC t/a RecXchange. Post roles to find candidates, share candidates to find roles. Split fees 50/50, 60/40, or up to 70% on RecX Direct roles (Andrews Recruitment Group t/a RecX Direct). Platform access at app.recxchange.io.",
        "areaServed": [
          { "@type": "Country", "name": "United Kingdom" },
          { "@type": "Country", "name": "United States" },
          { "@type": "Country", "name": "Europe" },
          { "@type": "Country", "name": "Australia" },
          { "@type": "Country", "name": "United Arab Emirates" },
          { "@type": "Country", "name": "South Africa" }
        ],
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "1",
          "highPrice": "249",
          "priceCurrency": "USD",
          "offerCount": "3",
          "url": "https://recxchange.io/pricing"
        },
        "audience": {
          "@type": "ProfessionalAudience",
          "audienceType": "Recruiters"
        }
      },
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review1",
        "itemReviewed": { "@id": "https://recxchange.io/#softwareapplication" },
        "author": { "@type": "Person", "name": "Sarah Johnson" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Made $15,000 in my first month. The candidates submitted to my roles are higher quality than what I find alone. Partnership changed my business.",
        "datePublished": "2026-02-23"
      },
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review2",
        "itemReviewed": { "@id": "https://recxchange.io/#softwareapplication" },
        "author": { "@type": "Person", "name": "Mark Chen" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "I was skeptical about sharing fees. But I've made MORE money by partnering than working alone. The ROI is incredible.",
        "datePublished": "2026-02-20"
      },
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review3",
        "itemReviewed": { "@id": "https://recxchange.io/#softwareapplication" },
        "author": { "@type": "Person", "name": "David Williams" },
        "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" },
        "reviewBody": "Filled a role in 48 hours that I'd been stuck on for 2 months. RecX Direct completely changed my earnings.",
        "datePublished": "2026-02-18"
      },
      {
        "@type": "WebSite",
        "@id": "https://recxchange.io/#website",
        "url": "https://recxchange.io",
        "name": "RecXchange Marketing Website",
        "description": "Marketing and information website for RecXchange (RecXchange Portal LLC t/a RecXchange) recruitment collaboration platform. The actual platform application is at app.recxchange.io. This site provides product information, pricing, guides, and educational content. Fully designed, developed and maintained by AMIVY Designs, an Andrews Recruitment Group company.",
        "publisher": { "@id": "https://recxchange.io/#organization" },
        "creator": { "@id": "https://recxchange.io/#amivy-designs" },
        "maintainer": { "@id": "https://recxchange.io/#amivy-designs" },
        "copyrightHolder": { "@id": "https://recxchange.io/#organization" },
        "copyrightYear": 2026,
        "potentialAction": [
          {
            "@type": "SearchAction",
            "target": "https://recxchange.io/roles?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          {
            "@type": "LoginAction",
            "target": "https://app.recxchange.io/login",
            "name": "Login to Platform"
          },
          {
            "@type": "RegisterAction",
            "target": "https://app.recxchange.io/register",
            "name": "Create Account"
          }
        ],
        "mainEntity": { "@id": "https://recxchange.io/#softwareapplication" }
      }
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <SpeakableSchema />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiAgentIdentity) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-[#060312] min-h-screen antialiased overflow-x-hidden`}
      >
        <ErrorBoundary>
          <SkipToContent />
          <WebVitals />

          <NetworkBackground />

          <Header />

          <div className="relative z-10 flex flex-col min-h-screen w-full">
            <main id="main-content" className="flex-grow w-full pt-16">
              {children}
            </main>
            <HiringManagerCard />
            <Footer />
          </div>

          <CookieBanner />
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
