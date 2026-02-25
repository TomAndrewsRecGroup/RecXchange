import "@/app/globals.css";
import { Sora } from "next/font/google";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
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
  // JSON-LD Schema for Organization and SoftwareApplication
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#organization",
        "name": "RecXchange",
        "url": "https://recxchange.io",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
          "width": 512,
          "height": 512
        },
        "sameAs": [
          "https://www.linkedin.com/company/recxchange",
          "https://twitter.com/RecXchange"
        ],
        "description": "RecXchange is a recruiter collaboration platform where thousands of recruiters partner on placements and split fees automatically."
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://recxchange.io/#softwareapplication",
        "name": "RecXchange",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://recxchange.io",
        "description": "The recruiter network where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles.",
        "offers": [
          {
            "@type": "Offer",
            "name": "RecX Entry",
            "price": "1",
            "priceCurrency": "USD",
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
          "RecX Direct client role access",
          "Vetted recruiter network",
          "Timestamped submission protection"
        ]
      },
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
      </body>
    </html>
  );
}
