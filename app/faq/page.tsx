"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import GlowButton from '@/components/design-system/GlowButton';
import NeonDivider from '@/components/design-system/NeonDivider';
import StatusBadge from '@/components/design-system/StatusBadge';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  detailedAnswer?: string;
  color: 'cyan' | 'fuchsia' | 'purple' | 'emerald';
}

const faqs: FAQItem[] = [
  // Getting Started
  { category: "Getting Started", color: "cyan", question: "What is RecXchange?", answer: "RecXchange is a recruiter collaboration platform where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles. Split fees 50/50, 60/40, or 70/30.", detailedAnswer: "RecXchange is a global network where recruiters work together instead of competing.\n\nHow it works:\n\nIf you have a role but no candidates:\nYou can post your role to the platform. Other recruiters see your role. They submit their candidates to you. When their candidate gets hired, you split the fee.\n\nIf you have a candidate but no role:\nYou can post your candidate to the platform. Other recruiters see your candidate. They match your candidate to their roles. When your candidate gets hired, you split the fee.\n\nThe platform creates contracts automatically. Both recruiters sign digitally. When the placement happens, you split the fee according to your agreement.\n\nThe network size:\n15,000+ recruiters across the world. Access to 270 million candidate profiles. Roles in UK, USA, Europe, Africa, Middle East, and Australia. Industries include Engineering, Healthcare, Tech, HR, Sales, and Finance." },
  { category: "Getting Started", color: "fuchsia", question: "How does RecXchange make me money?", answer: "Recruiters earn an average of $7,000 per placement. You make money by partnering with other recruiters. If you have a role but no candidates, post it and partner with recruiters who have matching candidates. If you have a candidate but no role, post them and partner with recruiters who have matching roles. Both parties split the fee when the placement is made." },
  { category: "Getting Started", color: "purple", question: "How much does it cost?", answer: "Entry tier is $1/month (5 tokens). Lite is $99/month (150 tokens). Pro is $249/month (400 tokens). Teams is custom pricing for agencies with 5+ recruiters. One placement typically pays for 5-12 months of membership." },
  
  // For Recruiters  
  { category: "For Recruiters", color: "cyan", question: "What are tokens?", answer: "Tokens let you participate in RecXchange. 1 token = post 1 role to the community OR submit 1 candidate to a collaborative role. Entry gives you 5 tokens/month, Lite gives 150, Pro gives 400." },
  { category: "For Recruiters", color: "fuchsia", question: "How do split fees work?", answer: "You and your partner agree on split terms before sharing any data. Common splits are 50/50, 60/40, or 70/30. Once agreed, both parties sign an auto-generated split fee agreement. When the placement is made, fees are split according to the contract." },
  { category: "For Recruiters", color: "purple", question: "Are my clients protected?", answer: "Yes. Your client details stay hidden until you approve the partnership. You control what information is shared and when." },
  { category: "For Recruiters", color: "emerald", question: "Are my candidates protected?", answer: "Yes. Candidate details are hidden until you approve the match. You decide when to reveal contact information to your partner recruiter." },
  { category: "For Recruiters", color: "cyan", question: "What if two recruiters submit the same candidate?", answer: "RecXchange timestamps every submission. If two recruiters submit the same candidate to the same role, the first timestamp wins. No arguments. The system decides." },
  
  // RecX Direct
  { category: "RecX Direct", color: "fuchsia", question: "What is RecX Direct?", answer: "RecX Direct is a service where end clients post their roles for free. Thousands of recruiters can work on these roles, and clients only deal with one point of contact (Andrews Recruitment Group or Senior RecXchange Account Managers)." },
  { category: "RecX Direct", color: "purple", question: "How do I access RecX Direct roles?", answer: "Pro members get instant access to RecX Direct roles as soon as they're posted. Lite members get access 7 days after posting. Entry members get access 30 days after posting (if applications are still being considered)." },
  { category: "RecX Direct", color: "emerald", question: "What's the split on RecX Direct placements?", answer: "Standard RecX Direct splits are up to 70% to the recruiter who makes the placement. Recruiters earn an average of $7,000 per placement on RecX Direct roles." },
  
  // Tokens & Pricing
  { category: "Tokens & Pricing", color: "cyan", question: "Can I upgrade or downgrade my tier?", answer: "Yes. You can switch between tiers at any time. Your unused tokens roll over for 30 days when you upgrade." },
  { category: "Tokens & Pricing", color: "fuchsia", question: "What happens if I run out of tokens?", answer: "You can upgrade to a higher tier mid-month to get more tokens, purchase additional tokens in blocks of 10, 40, 100, or 500 from the RecXchange shop inside the platform, or wait until your tokens refresh at the start of the next billing cycle." },
  { category: "Tokens & Pricing", color: "purple", question: "Do I pay anything when I make a placement?", answer: "No platform fees on placements. You keep 100% of your agreed split fee. RecXchange only charges the monthly membership fee." },
  
  // Trust & Protection
  { category: "Trust & Protection", color: "emerald", question: "How are split fee agreements enforced?", answer: "RecXchange auto-generates legally binding split fee agreements when you partner with another recruiter. Both parties sign digitally. The agreement is timestamped and stored on the platform." },
  { category: "Trust & Protection", color: "cyan", question: "What if my partner doesn't pay their split?", answer: "All split fee agreements are legally binding contracts. If there's a payment dispute, you have a signed contract with timestamps as evidence. Most disputes are resolved through the platform's built-in resolution process." },
  { category: "Trust & Protection", color: "fuchsia", question: "Are all recruiters vetted?", answer: "Yes. All recruiters are rated and reviewed by other members. You can see a recruiter's placement history, rating, and reviews before partnering with them." },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  const [expandedItems, setExpandedItems] = React.useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.detailedAnswer || faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
        <FuturisticBackground variant="default" />
        
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-6 sm:mb-8 md:mb-12 mt-6"
            >
              <StatusBadge label="FREQUENTLY ASKED QUESTIONS" color="cyan" />
              <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
                style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
                How RecXchange Works
              </h1>
              <NeonDivider width="w-40" color="mixed" />
              <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
                Everything you need to know about partnering with recruiters and splitting fees.
              </p>
            </motion.header>

            {/* Visual Guide */}
            <section className="mb-6 sm:mb-8 md:mb-12">
              <HolographicCard color="cyan" variant="content" className="text-center">
                <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4">How Fee Splits Work</h2>
                <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-4 sm:mb-5 md:mb-6 px-2">Simple visual guide to understanding RecXchange fee sharing</p>
                
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  <HolographicCard color="purple" variant="feature" showStatusIndicator={true}>
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">Total Placement Fee: $10,000</div>
                  </HolographicCard>
                  
                  <div className="flex justify-center text-2xl sm:text-3xl text-gray-500">↓</div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <HolographicCard color="cyan" variant="stat">
                      <div className="text-cyan-300 font-bold text-sm sm:text-base mb-1">50/50 Split</div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">$5,000</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Each recruiter</div>
                    </HolographicCard>
                    
                    <HolographicCard color="fuchsia" variant="stat">
                      <div className="text-fuchsia-300 font-bold text-sm sm:text-base mb-1">60/40 Split</div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">$6,000</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">Lead recruiter</div>
                    </HolographicCard>
                    
                    <HolographicCard color="purple" variant="stat">
                      <div className="text-purple-300 font-bold text-sm sm:text-base mb-1">70% Direct</div>
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">$7,000</div>
                      <div className="text-[10px] sm:text-xs text-gray-400">RecX Direct</div>
                    </HolographicCard>
                  </div>

                  <div className="flex justify-center text-2xl sm:text-3xl text-gray-500">↓</div>

                  <HolographicCard color="emerald" variant="feature" showStatusIndicator={true}>
                    <div className="text-emerald-300 font-bold text-sm sm:text-base">Platform Fee: $0 (You keep 100%)</div>
                  </HolographicCard>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <GlowButton variant="ghost" size="sm" href="https://youtube.com/@recxchange">
                    🎥 Watch Video Tutorials
                  </GlowButton>
                  <GlowButton variant="ghost" size="sm" href="/why-recxchange">
                    Why Choose RecXchange?
                  </GlowButton>
                </div>
              </HolographicCard>
            </section>

            <NeonDivider width="w-full" color="mixed" />

            {/* FAQ Categories */}
            {categories.map((category) => (
              <section key={category} className="my-10 sm:my-12 md:my-16">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5 md:mb-6 flex items-center gap-2 sm:gap-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>{category}</span>
                </h2>
                
                <div className="space-y-4 sm:space-y-5 md:space-y-6">
                  {faqs
                    .filter(faq => faq.category === category)
                    .map((faq, index) => {
                      const globalIndex = faqs.indexOf(faq);
                      const isExpanded = expandedItems.includes(globalIndex);
                      
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <HolographicCard color={faq.color} variant="content">
                            <div className="flex justify-between items-start gap-3 sm:gap-4">
                              <div className="flex-1">
                                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-2.5 md:mb-3">
                                  {faq.question}
                                </h3>
                                <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed">
                                  {faq.answer}
                                </p>
                                
                                {faq.detailedAnswer && isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/5"
                                  >
                                    <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed whitespace-pre-line">
                                      {faq.detailedAnswer}
                                    </p>
                                  </motion.div>
                                )}
                              </div>
                              
                              {faq.detailedAnswer && (
                                <button
                                  onClick={() => toggleExpand(globalIndex)}
                                  className="text-cyan-400 text-[11px] sm:text-xs md:text-sm font-bold hover:text-cyan-300 transition-colors flex-shrink-0"
                                >
                                  {isExpanded ? 'Show Less' : 'Show More'}
                                </button>
                              )}
                            </div>
                          </HolographicCard>
                        </motion.div>
                      );
                    })}
                </div>
              </section>
            ))}

            {/* CTA Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 sm:mt-12 md:mt-16"
            >
              <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2.5 sm:mb-3 md:mb-4">
                  Still have questions?
                </h2>
                <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 px-2">
                  Talk to our team, watch our tutorials, or start with a free trial.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <GlowButton variant="secondary" size="md" href="/contact">
                    Contact Us
                  </GlowButton>
                  <GlowButton variant="ghost" size="md" href="https://youtube.com/@recxchange">
                    🎥 Watch Tutorials
                  </GlowButton>
                  <GlowButton variant="primary" size="md" href="/pricing">
                    View Pricing
                  </GlowButton>
                </div>
              </HolographicCard>
            </motion.section>
          </div>
        </div>
      </main>
    </>
  );
}
