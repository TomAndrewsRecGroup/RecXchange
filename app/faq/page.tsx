"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is RecXchange?",
    answer: "RecXchange is a recruiter collaboration platform where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles. Split fees 50/50, 60/40, or 70/30."
  },
  {
    category: "Getting Started",
    question: "How does RecXchange make me money?",
    answer: "You make money by partnering with other recruiters. If you have a role but no candidates, post it and partner with recruiters who have matching candidates. If you have a candidate but no role, post them and partner with recruiters who have matching roles. Both parties split the fee when the placement is made."
  },
  {
    category: "Getting Started",
    question: "How much does it cost?",
    answer: "Entry tier is $1/month (5 tokens). Lite is $99/month (150 tokens). Pro is $250/month (400 tokens). Teams is custom pricing for agencies with 5+ recruiters. One placement typically pays for 5-12 months of membership."
  },
  
  // For Recruiters
  {
    category: "For Recruiters",
    question: "What are tokens?",
    answer: "Tokens let you participate in RecXchange. 1 token = post 1 role to the community OR submit 1 candidate to a collaborative role. Entry gives you 5 tokens/month, Lite gives 150, Pro gives 400."
  },
  {
    category: "For Recruiters",
    question: "How do split fees work?",
    answer: "You and your partner agree on split terms before sharing any data. Common splits are 50/50, 60/40, or 70/30. Once agreed, both parties sign an auto-generated split fee agreement. When the placement is made, fees are split according to the contract."
  },
  {
    category: "For Recruiters",
    question: "Are my clients protected?",
    answer: "Yes. Your client details stay hidden until you approve the partnership. You control what information is shared and when."
  },
  {
    category: "For Recruiters",
    question: "Are my candidates protected?",
    answer: "Yes. Candidate details are hidden until you approve the match. You decide when to reveal contact information to your partner recruiter."
  },
  {
    category: "For Recruiters",
    question: "What if two recruiters submit the same candidate?",
    answer: "RecXchange timestamps every submission. If two recruiters submit the same candidate to the same role, the first timestamp wins. No arguments. The system decides."
  },
  
  // RecX Direct
  {
    category: "RecX Direct",
    question: "What is RecX Direct?",
    answer: "RecX Direct is a service where end clients post their roles for free. Thousands of recruiters can work on these roles, and clients only deal with one point of contact (Andrews Recruitment Group or Senior RecXchange Account Managers)."
  },
  {
    category: "RecX Direct",
    question: "How do I access RecX Direct roles?",
    answer: "Pro members get instant access to RecX Direct roles as soon as they're posted. Lite members get access 7 days after posting. Entry members get access 30 days after posting (if applications are still being considered)."
  },
  {
    category: "RecX Direct",
    question: "What's the split on RecX Direct placements?",
    answer: "Standard RecX Direct splits are up to 70% to the recruiter who makes the placement. The exact split depends on your tier and the specific role."
  },
  
  // Tokens & Pricing
  {
    category: "Tokens & Pricing",
    question: "Can I upgrade or downgrade my tier?",
    answer: "Yes. You can switch between tiers at any time. Your unused tokens roll over for 30 days when you upgrade."
  },
  {
    category: "Tokens & Pricing",
    question: "What happens if I run out of tokens?",
    answer: "You can upgrade to a higher tier mid-month to get more tokens, purchase additional tokens in blocks of 10, 40, 100, or 500 from the RecXchange shop inside the platform, or wait until your tokens refresh at the start of the next billing cycle."
  },
  {
    category: "Tokens & Pricing",
    question: "Do I pay anything when I make a placement?",
    answer: "No platform fees on placements. You keep 100% of your agreed split fee. RecXchange only charges the monthly membership fee."
  },
  
  // Trust & Protection
  {
    category: "Trust & Protection",
    question: "How are split fee agreements enforced?",
    answer: "RecXchange auto-generates legally binding split fee agreements when you partner with another recruiter. Both parties sign digitally. The agreement is timestamped and stored on the platform."
  },
  {
    category: "Trust & Protection",
    question: "What if my partner doesn't pay their split?",
    answer: "All split fee agreements are legally binding contracts. If there's a payment dispute, you have a signed contract with timestamps as evidence. Most disputes are resolved through the platform's built-in resolution process."
  },
  {
    category: "Trust & Protection",
    question: "Are all recruiters vetted?",
    answer: "Yes. All recruiters are rated and reviewed by other members. You can see a recruiter's placement history, rating, and reviews before partnering with them."
  },
];

const categories = Array.from(new Set(faqs.map(faq => faq.category)));

export default function FAQPage() {
  // Generate FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <main className="min-h-screen py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16">
            <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
              Frequently Asked Questions
            </span>
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
              How RecXchange Works
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              Everything you need to know about partnering with recruiters and splitting fees.
            </p>
          </motion.header>

          {/* FAQ Categories */}
          {categories.map((category, categoryIndex) => (
            <section key={category} className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                {category}
              </h2>
              
              <div className="space-y-6">
                {faqs
                  .filter(faq => faq.category === category)
                  .map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="glass-card p-8 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-colors"
                    >
                      <h3 className="text-lg font-bold text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-3xl border-cyan-400/10 text-center mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8">
              Talk to our team or start with a free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.section>
        </div>
      </main>
    </>
  );
}
