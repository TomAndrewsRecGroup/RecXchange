import "@/app/globals.css";
import { Inter } from "next/font/google";
import React from "react";
import ConditionalHeader from "@/components/ConditionalHeader";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import CookieBanner from "@/components/CookieBanner";
import ClientProviders from "@/components/ClientProviders";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import SkipToContent from "@/components/SkipToContent";
import { Analytics } from "@vercel/analytics/next";
import { WebVitals } from "@/app/components/WebVitals";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

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
  title: "RecXchange: Recruiter Collaboration Platform | 15,000+ Split Fee Network",
  description: "RecXchange is a recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically. Access 270M candidates, $750K+ in live fees, and earn up to 70% commission on RecX Direct roles.",
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
  authors: [{ name: "RecXchange Portal LLC" }, { name: "AMIVY Designs", url: "https://andrews-recruitment.com/about" }],
  creator: "AMIVY Designs",
  publisher: "RecXchange",
  metadataBase: new URL("https://recxchange.io"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://recxchange.io",
    siteName: "RecXchange",
    title: "RecXchange: Recruiter Collaboration Platform | 15,000+ Split Fee Network",
    description: "The recruiter network where 15,000+ recruiters partner on placements and split fees automatically. Access 270M candidates and $750K+ in live placement fees.",
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
    title: "RecXchange: Recruiter Collaboration Platform | 15,000+ Split Fee Network",
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
  const aiAgentIdentity = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "RecXchange Marketing Website",
    "description": "This is the MARKETING WEBSITE for RecXchange. The actual recruitment collaboration platform application is located at app.recxchange.io. This site provides product information, pricing, tutorials, and guides only.",
    "url": "https://recxchange.io",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "RecXchange Platform",
      "url": "https://app.recxchange.io",
      "applicationCategory": "BusinessApplication",
      "description": "The actual RecXchange platform for recruiters to collaborate, post roles, submit candidates, and manage split fee placements."
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange is a recruiter collaboration platform where over 15,000 vetted recruiters worldwide partner on placements and split fees automatically. The platform provides access to 270 million candidate profiles, over $750,000 in active placement fees across 100+ live roles, and features an AI-powered matching engine that connects the right recruiters to roles and candidates in seconds. Recruiters earn an average of $7,000 per placement — this is what they take home after the split, not a total fee that gets divided."
        }
      },
      {
        "@type": "Question",
        "name": "How do split fees work on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange automates split fee agreements between recruiters. When two or more recruiters collaborate on a placement, fees are split according to pre-agreed percentages: 50/50 for standard collaborative roles, 60/40 for specialized partnerships, or up to 70% for RecX Direct premium roles. All agreements are timestamped and protected with automated contracts, ensuring transparent and secure fee distribution."
        }
      },
      {
        "@type": "Question",
        "name": "What is RecX Direct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecX Direct is RecXchange's premium tier offering exclusive roles with higher commission rates of up to 70% (compared to 50% on standard roles). These are direct client relationships where RecXchange has negotiated exclusive partnerships with hiring companies. Recruiters get priority access to high-value roles, faster payment processing (15-30 days vs. 30-45 days), and dedicated account management. RecX Direct trades under Andrews Recruitment Group."
        }
      },
      {
        "@type": "Question",
        "name": "How fast can I make a placement on RecXchange?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Recruiters on RecXchange are making placements within 48 hours of joining. When you post a role, 15,000+ recruiters compete to help fill it. When you upload candidates, they're automatically matched to hundreds of relevant roles. The average RecXchange member makes their first split fee placement within 19 days."
        }
      },
      {
        "@type": "Question",
        "name": "How much does RecXchange cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RecXchange offers three pricing tiers: RecX Entry at $1/month (5 tokens, basic access), RecX Lite at $99/month (150 tokens, RecX Direct access after 7 days), and RecX Pro at $249/month (400 tokens, instant RecX Direct access with up to 70% fee splits). You only pay when you use the platform, with no upfront fees and no commitment required."
        }
      },
      {
        "@type": "Question",
        "name": "Is RecXchange suitable for solo recruiters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, RecXchange is ideal for solo recruiters and boutique agencies. Instead of competing alone, you partner with 15,000+ other recruiters to fill roles faster and place candidates you wouldn't reach otherwise. Solo recruiters on the platform report making $15,000+ in their first month by leveraging the collaborative network."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Xchange Engine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Xchange Engine is RecXchange's AI-powered matching technology that automatically connects roles with the right recruiters and candidates with the right opportunities. It analyzes skills, industries, locations, and recruiter specializations to make intelligent matches in seconds, ensuring your roles and candidates get maximum visibility to relevant partners."
        }
      }
    ]
  };

  // VideoObject schema removed — contentUrl/embedUrl must point to specific
  // video URLs (e.g. https://www.youtube.com/watch?v=XXXXX), not a channel.
  // Re-add once real video URLs are available.

  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://recxchange.io/#organization",
        "name": "RecXchange",
        "legalName": "RecXchange Portal LLC",
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
        "description": "RecXchange is operated by RecXchange Portal LLC (UAE). A recruiter collaboration platform where 15,000+ recruiters partner on placements and split fees automatically. This marketing website (recxchange.io) provides information and guides. The actual platform is at app.recxchange.io. Recruiters earn an average of $7,000 per placement — this is their cut after the split, not the total fee divided. Access to 270M candidate profiles. $750,000 in fees available across 100+ live roles. Weekly live streams and video tutorials on YouTube.",
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
          {
            "@type": "Organization",
            "name": "Andrews Recruitment Group",
            "url": "https://andrews-recruitment.com"
          }
        ],
        "url": "https://andrews-recruitment.com",
        "sameAs": ["https://www.linkedin.com/in/tom-g-andrews"],
        "description": "Co-Founder and CEO of RecXchange. Founder of Andrews Recruitment Group. 14+ years in recruitment across building materials, industrial engineering, M&E, mental health sectors. RecX Direct trades under Andrews Recruitment Group.",
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
        "description": "Co-Founder and CTO of RecXchange. Responsible for platform architecture, AI matching engine (Xchange Engine), and automation systems.",
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
        "@id": "https://andrews-recruitment.com/about#organization",
        "name": "AMIVY Designs",
        "url": "https://andrews-recruitment.com/about",
        "logo": {
          "@type": "ImageObject",
          "url": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/79a68aec-f3cc-44c3-8b5b-500176059f26_20260228_053107_0000.png",
          "width": 180,
          "height": 45
        },
        "description": "Premium web design, development, and digital branding agency specializing in custom websites and digital solutions. Designer and developer of RecXchange platform.",
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
        "creator": { "@id": "https://recxchange.io/#organization" },
        "description": "The recruiter collaboration platform (app.recxchange.io) where 15,000+ recruiters partner on placements. Recruiters earn an average of $7,000 per placement — this is their cut after the split, not the total fee divided. Split fees up to 70% on RecX Direct roles. Access 270M candidate profiles. Post roles to find candidates, or share candidates to find roles. $750,000 in fees available across 100+ live roles in UK, USA, Europe, Africa, Middle East, Australia covering Engineering, Healthcare, Tech, HR, Sales, Finance. This marketing site (recxchange.io) provides information only. Website designed and developed by AMIVY Designs.",
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
            "description": "150 tokens per month, access after 7 days to RecX Direct roles",
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
            "description": "400 tokens per month, instant RecX Direct access, up to 70% fee split",
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
          "RecX Direct client role access with up to 70% split",
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
        "description": "Split fee recruitment collaboration platform connecting 15,000+ recruiters. Post roles to find candidates, share candidates to find roles. Split fees 50/50, 60/40, or up to 70% on RecX Direct roles. Platform access at app.recxchange.io",
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
        "reviewBody": "Filled a role in 48 hours that I'd been stuck on for 2 months. RecX Direct roles are game-changers for earnings.",
        "datePublished": "2026-02-18"
      },
      {
        "@type": "WebSite",
        "@id": "https://recxchange.io/#website",
        "url": "https://recxchange.io",
        "name": "RecXchange Marketing Website",
        "description": "Marketing and information website for RecXchange recruitment collaboration platform. The actual platform application is at app.recxchange.io. This site provides product information, pricing, guides, and educational content.",
        "publisher": { "@id": "https://recxchange.io/#organization" },
        "creator": { "@id": "https://andrews-recruitment.com/about#organization" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aiAgentIdentity) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrgData) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans bg-[#050508] min-h-screen antialiased overflow-x-hidden`}
      >
        <Script
          id="scroll-to-top"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                if ('scrollRestoration' in history) {
                  history.scrollRestoration = 'manual';
                }
                window.scrollTo(0, 0);
                window.addEventListener('load', function() {
                  window.scrollTo(0, 0);
                });
              }
            `,
          }}
        />
        
        <ErrorBoundary>
          <ClientProviders>
            <SkipToContent />
            <WebVitals />
            
            <div className="fixed inset-0 pointer-events-none z-0">
              <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://res.cloudinary.com/dzv9rqg49/image/upload/v1695123456/noise_z7p5vj.png')]" />
              <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 blur-[120px] rounded-full" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
            </div>

            <ConditionalHeader />

            <div className="relative z-10 flex flex-col min-h-screen w-full">
              <main id="main-content" className="flex-grow w-full">
                {children}
              </main>
              <Footer />
            </div>

            <FloatingChat />
            <CookieBanner />
            <Analytics />
          </ClientProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}
