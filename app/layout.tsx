import "@/app/globals.css";
import { Sora } from "next/font/google";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "RecXchange | Share Roles. Split Fees. Fill Roles. Get Paid.",
  description: "The recruiter network where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles. Split fees 50/50.",
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
    "Andrews Recruitment Group",
    "recruitment fee split",
    "recruiter collaboration"
  ],
  authors: [{ name: "RecXchange" }],
  creator: "RecXchange",
  publisher: "RecXchange",
  metadataBase: new URL("https://recxchange.io"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://recxchange.io",
    siteName: "RecXchange",
    title: "RecXchange | Share Roles. Split Fees. Fill Roles. Get Paid.",
    description: "The recruiter network where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles.",
    images: [
      {
        url: "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
        width: 1200,
        height: 630,
        alt: "RecXchange - Recruiter Collaboration Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RecXchange | Share Roles. Split Fees. Fill Roles. Get Paid.",
    description: "The recruiter network where thousands of recruiters partner on placements and split fees automatically.",
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
  // Comprehensive JSON-LD Schema with enhanced entities
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      // Organization Schema
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#organization",
        "name": "RecXchange",
        "legalName": "Andrews Recruitment Group Ltd",
        "url": "https://recxchange.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
          "width": 512,
          "height": 512
        },
        "founder": {
          "@id": "https://recxchange.io/#person"
        },
        "foundingDate": "2024",
        "sameAs": [
          "https://www.linkedin.com/company/recxchange",
          "https://twitter.com/RecXchange",
          "https://youtube.com/@recxchange"
        ],
        "description": "RecXchange is a recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically. Average placement fee: $7,000. Access to 270M candidate profiles. $750,000 in fees available across 100+ live roles. Weekly live streams and video tutorials on YouTube.",
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
        }
      },
      // Person Schema (Founder)
      {
        "@type": "Person",
        "@id": "https://recxchange.io/#person",
        "name": "Tom Andrews",
        "jobTitle": "CEO & Co-Founder",
        "worksFor": {
          "@id": "https://recxchange.io/#organization"
        },
        "url": "https://recxchange.io",
        "sameAs": [
          "https://www.linkedin.com/in/tomandrews"
        ]
      },
      // Software Application Schema
      {
        "@type": "SoftwareApplication",
        "@id": "https://recxchange.io/#softwareapplication",
        "name": "RecXchange",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://recxchange.io",
        "description": "The recruiter network where 15,000+ recruiters partner on placements. Average placement fee: $7,000. Split fees up to 70% on RecX Direct roles. Access 270M candidate profiles. Post roles to find candidates, or share candidates to find roles. $750,000 in fees available across 100+ live roles in UK, USA, Europe, Africa, Middle East, Australia covering Engineering, Healthcare, Tech, HR, Sales, Finance.",
        "offers": [
          {
            "@type": "Offer",
            "name": "RecX Entry",
            "price": "1",
            "priceCurrency": "USD",
            "description": "5 tokens per month, access to collaborative roles and candidate database",
            "availability": "https://schema.org/InStock",
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
            "description": "150 tokens per month, access after 7 days to RecX Direct roles",
            "availability": "https://schema.org/InStock",
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
            "price": "250",
            "priceCurrency": "USD",
            "description": "400 tokens per month, instant RecX Direct access, up to 70% fee split",
            "availability": "https://schema.org/InStock",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": "250",
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
          "RecX Direct client role access with up to 70% split",
          "Average placement fee: $7,000",
          "15,000+ vetted recruiters",
          "Timestamped submission protection",
          "$750,000 in fees available across 100+ live roles",
          "Weekly live streams and video tutorials"
        ]
      },
      // Service Schema (NEW)
      {
        "@type": "Service",
        "@id": "https://recxchange.io/#service",
        "serviceType": "Recruitment Collaboration Platform",
        "provider": {
          "@id": "https://recxchange.io/#organization"
        },
        "name": "RecXchange Recruitment Collaboration",
        "description": "Split fee recruitment collaboration platform connecting 15,000+ recruiters. Post roles to find candidates, share candidates to find roles. Split fees 50/50, 60/40, or up to 70% on RecX Direct roles.",
        "areaServed": [
          {
            "@type": "Country",
            "name": "United Kingdom"
          },
          {
            "@type": "Country",
            "name": "United States"
          },
          {
            "@type": "Country",
            "name": "Europe"
          },
          {
            "@type": "Country",
            "name": "Australia"
          },
          {
            "@type": "Country",
            "name": "United Arab Emirates"
          },
          {
            "@type": "Country",
            "name": "South Africa"
          }
        ],
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "1",
          "highPrice": "250",
          "priceCurrency": "USD",
          "offerCount": "3"
        },
        "audience": {
          "@type": "ProfessionalAudience",
          "audienceType": "Recruiters"
        }
      },
      // Review Schema (NEW)
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review1",
        "itemReviewed": {
          "@id": "https://recxchange.io/#softwareapplication"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah Johnson"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Made $15,000 in my first month. The candidates submitted to my roles are higher quality than what I find alone. Partnership changed my business.",
        "datePublished": "2026-02-23"
      },
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review2",
        "itemReviewed": {
          "@id": "https://recxchange.io/#softwareapplication"
        },
        "author": {
          "@type": "Person",
          "name": "Mark Chen"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "I was skeptical about sharing fees. But I've made MORE money by partnering than working alone. The ROI is incredible.",
        "datePublished": "2026-02-20"
      },
      {
        "@type": "Review",
        "@id": "https://recxchange.io/#review3",
        "itemReviewed": {
          "@id": "https://recxchange.io/#softwareapplication"
        },
        "author": {
          "@type": "Person",
          "name": "David Williams"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Filled a role in 48 hours that I'd been stuck on for 2 months. RecX Direct roles are game-changers for earnings.",
        "datePublished": "2026-02-18"
      },
      // BreadcrumbList Schema (NEW)
      {
        "@type": "BreadcrumbList",
        "@id": "https://recxchange.io/#breadcrumb",
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
            "name": "For Recruiters",
            "item": "https://recxchange.io/recruiter"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Pricing",
            "item": "https://recxchange.io/pricing"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Why RecXchange",
            "item": "https://recxchange.io/why-recxchange"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Blog",
            "item": "https://recxchange.io/blog"
          },
          {
            "@type": "ListItem",
            "position": 6,
            "name": "FAQ",
            "item": "https://recxchange.io/faq"
          }
        ]
      },
      // WebSite Schema
      {
        "@type": "WebSite",
        "@id": "https://recxchange.io/#website",
        "url": "https://recxchange.io",
        "name": "RecXchange",
        "description": "Share Roles. Split Fees. Fill Roles. Get Paid.",
        "publisher": {
          "@id": "https://recxchange.io/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://recxchange.io/roles?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body
        className={`${sora.className} bg-[#050508] min-h-screen antialiased overflow-x-hidden`}
      >
        <ErrorBoundary>
          {/* Background Layer */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9rqg49/image/upload/v1695123456/noise_z7p5vj.png')]" />
            <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
          </div>

          {/* Navigation */}
          <Header />

          <div className="relative z-10 flex flex-col min-h-screen w-full">
            <main className="flex-grow w-full pt-24">
              {children}
            </main>
            <Footer />
          </div>

          {/* Floating Chatbot */}
          <FloatingChat />

          {/* Vercel Web Analytics */}
          <Analytics />
        </ErrorBoundary>
      </body>
    </html>
  );
}
