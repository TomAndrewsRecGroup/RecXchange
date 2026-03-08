"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Target, Zap, Cpu } from 'lucide-react';
import SendRolesForm from '@/components/send-roles-form';
import FAQSection from '@/components/FAQSection';
import { collaborationFAQs } from '@/data/faqs/recruiter-faqs';
import { internalLinks } from '@/lib/internal-links';

export default function CollaborationPage() {
  // HowTo Schema for split fee recruitment process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Split Recruitment Fees on RecXchange",
    "description": "Step-by-step guide to collaborating with other recruiters and splitting placement fees on the RecXchange platform. Learn how to partner, create contracts, and share fees automatically.",
    "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
    "totalTime": "PT15M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "1"
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "RecXchange Platform Account"
      },
      {
        "@type": "HowToTool",
        "name": "Candidate or Role to Share"
      }
    ],
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Verified Recruiter Profile"
      },
      {
        "@type": "HowToSupply",
        "name": "Active Membership (Entry, Lite, or Pro)"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Find a Match",
        "text": "Browse roles or candidates on the RecXchange platform. Use the AI-powered matching engine to find opportunities that align with your candidate skills or role requirements. Filter by industry, location, salary range, and experience level.",
        "url": "https://recxchange.io/collaboration#step1",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Request Partnership",
        "text": "Click 'Request Partnership' on the role or candidate listing. Review the other recruiter's profile, rating (4+ stars recommended), and past placement history. Send a partnership request with your proposed split percentage (typically 50/50, 60/40, or 70/30).",
        "url": "https://recxchange.io/collaboration#step2",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Agree on Split Terms",
        "text": "Discuss and agree on the fee split percentage with your partner recruiter. Common splits are 50/50 (equal partnership), 60/40 (one recruiter has the client relationship), or up to 70% for RecX Direct roles. Both parties must agree before proceeding.",
        "url": "https://recxchange.io/collaboration#step3",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Sign Auto-Generated Contract",
        "text": "RecXchange automatically generates a legally binding split fee agreement containing both recruiter names, company names, role details, candidate details, agreed split percentage, and a permanent timestamp. Both parties digitally sign the contract. This protects both recruiters and creates a permanent record.",
        "url": "https://recxchange.io/collaboration#step4",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Share Private Details",
        "text": "Only after the contract is signed, share private information with your partner. This includes full candidate contact details, complete CVs, client company names, and hiring manager information. Your data is protected until this step.",
        "url": "https://recxchange.io/collaboration#step5",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 6,
        "name": "Submit Candidate and Interview",
        "text": "Submit the candidate to the client role. Coordinate with your partner recruiter throughout the interview process. Share feedback, schedule interviews, and manage client expectations together. The partnership requires collaboration and communication.",
        "url": "https://recxchange.io/collaboration#step6",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 7,
        "name": "Close the Placement",
        "text": "When the candidate receives and accepts the job offer, the placement is complete. Both recruiters invoice their respective clients for their agreed percentage. RecXchange charges zero platform fees - you keep 100% of your split.",
        "url": "https://recxchange.io/collaboration#step7",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 8,
        "name": "Split and Receive Fees",
        "text": "Each recruiter invoices their own client for their portion of the fee. For example, on a $10,000 placement with 50/50 split: you invoice your client for $5,000, your partner invoices theirs for $5,000. Average placement fee is $7,000. RecXchange takes no platform fees.",
        "url": "https://recxchange.io/collaboration#step8",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      }
    ],
    "about": {
      "@type": "Thing",
      "name": "Split Fee Recruitment"
    },
    "performer": {
      "@type": "Organization",
      "name": "RecXchange",
      "url": "https://recxchange.io"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <main className="relative min-h-screen flex flex-col items-center pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 overflow-x-hidden">
        <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">

          {/* Hero */}
          <header className="text-center mb-6 sm:mb-8 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
                The RecXchange Engine
              </span>
              <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
                Split Fees. Zero Friction.
              </h1>
              <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
              <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
                RecXchange isn't just a marketplace; it's a high-performance engine designed to protect your deals and automate your matchmaking. Learn about <Link href={internalLinks.pricing} className="text-cyan-400 hover:text-cyan-300 underline">our pricing tiers</Link> or see <Link href={internalLinks.whyRecXchange} className="text-fuchsia-400 hover:text-fuchsia-300 underline">why recruiters choose us</Link>.
              </p>
            </motion.div>
          </header>

          {/* The Split Logic */}
          <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-10 sm:mb-12 md:mb-16 lg:mb-20">
            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-t-2 sm:border-t-4 border-cyan-500">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">50/50 Standard</h2>
              <p className="text-gray-500 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6">The classic collaboration model. You bring the candidate, they bring the role (or vice versa). Our engine handles the legal framework so you can focus on the placement.</p>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-400/20 text-[10px] sm:text-xs">Standard Xchange</div>
            </div>

            <div className="glass-card p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-t-2 sm:border-t-4 border-fuchsia-500">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">Up to 70% Retained</h2>
              <p className="text-gray-500 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6">Work on high-priority <strong className="text-white">RecXDirect</strong> roles verified by our team. These roles offer aggressive splits for recruiters who deliver speed and quality.</p>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-400 font-bold border border-fuchsia-400/20 text-[10px] sm:text-xs">RecXDirect Access</div>
            </div>
          </section>

          {/* Xchange Engine Section */}
          <section className="w-full relative overflow-hidden glass-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 border-cyan-400/10 mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="absolute top-0 right-0 -mr-10 sm:-mr-20 -mt-10 sm:-mt-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-fuchsia-500/10 blur-[80px] sm:blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 -ml-10 sm:-ml-20 -mb-10 sm:-mb-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-cyan-500/5 blur-[80px] sm:blur-[120px] rounded-full" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center">
              <div>
                <h3 className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold text-fuchsia-400 mb-2 sm:mb-3 md:mb-4">The Heavy Lifting</h3>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 lg:mb-6">Proprietary <span className="gradient-text">Xchange Engine</span></h2>
                <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 leading-relaxed">
                  Stop digging through spreadsheets. Our AI-powered candidate-role matching system operates 24/7 in the background to surface the perfect placement.
                </p>

                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {[
                    { Icon: Target, color: "text-cyan-400", title: "Semantic Matching", desc: "We look beyond keywords to understand experience, career trajectory, and industry relevance." },
                    { Icon: Zap, color: "text-fuchsia-400", title: "Instant Notifications", desc: "Get alerted the second a high-quality match enters the engine." },
                    { Icon: Cpu, color: "text-white", title: "Continuous Scanning", desc: "The engine never sleeps, re-ranking your entire database as new roles go live." }
                  ].map((item, i) => {
                    const IconComponent = item.Icon;
                    return (
                      <div key={i} className="flex gap-2 sm:gap-3 md:gap-4 items-start">
                        <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                          <IconComponent className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${item.color}`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-white text-[13px] sm:text-sm">{item.title}</h4>
                          <p className="text-gray-500 text-[11px] sm:text-xs">{item.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-card p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl border-cyan-400/10 bg-white/[0.01]">
                <h4 className="font-mono text-[9px] sm:text-[10px] text-gray-500 uppercase mb-3 sm:mb-4">Engine Impact</h4>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                    <span className="text-[13px] sm:text-sm text-gray-400">Search Time Reduction</span>
                    <span className="text-xl sm:text-2xl font-bold text-fuchsia-400">80%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                    <span className="text-[13px] sm:text-sm text-gray-400">Database Utilization</span>
                    <span className="text-xl sm:text-2xl font-bold text-cyan-400">100%</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-cyan-400/10 pb-1.5 sm:pb-2">
                    <span className="text-[13px] sm:text-sm text-gray-400">Time-to-Fill</span>
                    <span className="text-xl sm:text-2xl font-bold text-white">Instant</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="w-full mb-8 sm:mb-10 md:mb-12 lg:mb-16">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">Collaboration FAQ</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">Common questions about how split fee recruitment works</p>
            </div>
            <FAQSection faqs={collaborationFAQs} color="fuchsia" />
          </section>

          {/* Quick Action: Send Me 3 Roles */}
          <section className="w-full glass-card rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-14 border-cyan-400/10 text-center">
            <div className="inline-block px-2.5 sm:px-3 md:px-4 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-cyan-400 mb-3 sm:mb-4 md:mb-6">
              Try the Engine
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">See the matching engine in action</h2>
            <p className="text-gray-400 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Tell us your industries and we'll show you 3 matching roles from our live database.
            </p>
            <div className="flex justify-center">
              <SendRolesForm className="" />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}