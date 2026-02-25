"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface FAQItem {
  category: string;
  question: string;
  answer: string;
  detailedAnswer?: string;
}

const faqs: FAQItem[] = [
  // Getting Started
  {
    category: "Getting Started",
    question: "What is RecXchange?",
    answer: "RecXchange is a recruiter collaboration platform where thousands of recruiters partner on placements and split fees automatically. Post roles to find candidates, or share candidates to find roles. Split fees 50/50, 60/40, or 70/30.",
    detailedAnswer: "RecXchange is a global network where recruiters work together instead of competing. If you have a role but no candidates, you can post it and find recruiters who have matching candidates. If you have a candidate but no role, you can post them and find recruiters with matching roles. When you both agree to work together, the platform creates a legal contract automatically. When the placement is made, you split the fee according to your agreement. The platform has 15,000+ recruiters, access to 270 million candidate profiles, and roles across UK, USA, Europe, Africa, Middle East, and Australia."
  },
  {
    category: "Getting Started",
    question: "How does RecXchange make me money?",
    answer: "You make money by partnering with other recruiters. If you have a role but no candidates, post it and partner with recruiters who have matching candidates. If you have a candidate but no role, post them and partner with recruiters who have matching roles. Both parties split the fee when the placement is made.",
    detailedAnswer: "RecXchange creates two main ways to earn money: (1) Post your open roles. Other recruiters see them and submit their candidates. When their candidate gets hired, you split the fee 50/50 or 60/40. (2) Post your available candidates. Other recruiters see them and match them to their open roles. When your candidate gets hired, you split the fee. The average placement fee is $7,000, meaning you typically earn $3,500 per 50/50 split. On RecX Direct roles (client roles managed by RecXchange), you can earn up to 70% - that's $4,900 on a $7,000 placement. Most active recruiters make 2-5 placements per quarter."
  },
  {
    category: "Getting Started",
    question: "How much does it cost?",
    answer: "Entry tier is $1/month (5 tokens). Lite is $99/month (150 tokens). Pro is $250/month (400 tokens). Teams is custom pricing for agencies with 5+ recruiters. One placement typically pays for 5-12 months of membership.",
    detailedAnswer: "RecXchange has four membership tiers: Entry ($1/month) gives you 5 tokens to test the platform - perfect if you want to try before committing. Lite ($99/month) gives you 150 tokens and is designed for serious recruiters - one $7,000 placement at 50/50 split ($3,500 earned) pays for 35+ months. Pro ($250/month) gives you 400 tokens plus instant access to RecX Direct roles where you earn up to 70% - one placement at 70% ($4,900 earned) pays for 19+ months. Teams (custom pricing) is for agencies with 5+ recruiters who want shared databases and token pools. There are ZERO platform fees on placements - you keep 100% of your agreed split."
  },
  
  // For Recruiters
  {
    category: "For Recruiters",
    question: "What are tokens?",
    answer: "Tokens let you participate in RecXchange. 1 token = post 1 role to the community OR submit 1 candidate to a collaborative role. Entry gives you 5 tokens/month, Lite gives 150, Pro gives 400.",
    detailedAnswer: "Tokens are how you take action on RecXchange. Think of them like credits. Each action costs 1 token: posting a role to find candidates costs 1 token, or submitting a candidate to someone else's role costs 1 token. If you're on the Lite plan ($99/month), you get 150 tokens - that means you can post 150 roles, submit 150 candidates, or any combination that adds up to 150 actions. Most recruiters use 20-50 tokens per month. If you run out, you can upgrade to a higher tier or buy additional tokens in packs of 10, 40, 100, or 500. Unused tokens roll over for 30 days when you upgrade."
  },
  {
    category: "For Recruiters",
    question: "How do split fees work?",
    answer: "You and your partner agree on split terms before sharing any data. Common splits are 50/50, 60/40, or 70/30. Once agreed, both parties sign an auto-generated split fee agreement. When the placement is made, fees are split according to the contract.",
    detailedAnswer: "Split fees follow a simple process: Step 1 - You see a role or candidate that matches what you have. Step 2 - You request to partner. The other recruiter reviews your profile and rating. Step 3 - Both of you agree on the split percentage (50/50, 60/40, or 70/30 are most common). Step 4 - RecXchange automatically creates a legal contract with both names, the agreed split, and a timestamp. Both of you sign digitally. Step 5 - You share candidate and client details only after the contract is signed. Step 6 - When the placement is made, each recruiter bills their own client or candidate for their portion. For example: Total fee is $10,000. You agreed 50/50. You invoice your client for $5,000. Your partner invoices their candidate's employer for $5,000. RecXchange takes 0% - you keep your full $5,000."
  },
  {
    category: "For Recruiters",
    question: "Are my clients protected?",
    answer: "Yes. Your client details stay hidden until you approve the partnership. You control what information is shared and when.",
    detailedAnswer: "Client protection is a core feature. Here's what stays private: Company name is hidden (shown as 'Tech Company' or 'Healthcare Firm'). Exact location is hidden (shown as 'London Area' not the full address). Contact details are never shown until you choose to share them. The hiring manager's name is hidden. You decide when to reveal any of this information. Most recruiters only share full client details after: (1) The split fee contract is signed by both parties, (2) They've reviewed the partner recruiter's rating and reviews, (3) The candidate has passed initial screening. You're always in control."
  },
  {
    category: "For Recruiters",
    question: "Are my candidates protected?",
    answer: "Yes. Candidate details are hidden until you approve the match. You decide when to reveal contact information to your partner recruiter.",
    detailedAnswer: "Candidate protection works the same as client protection. What's hidden: Full name is masked (shown as 'John M.' or 'Sarah K.'). Email and phone are completely hidden. Current employer is hidden. LinkedIn profile is hidden. Only general information is shown: job title, years of experience, key skills, location (city level only), and salary expectations. You only reveal full candidate details after: (1) You've signed the split fee contract, (2) You've verified the role is real and suitable, (3) Your candidate has given you permission to submit them. The candidate's full CV is never shared until you explicitly choose to share it."
  },
  {
    category: "For Recruiters",
    question: "What if two recruiters submit the same candidate?",
    answer: "RecXchange timestamps every submission. If two recruiters submit the same candidate to the same role, the first timestamp wins. No arguments. The system decides.",
    detailedAnswer: "Duplicate submissions are resolved automatically by timestamp. Here's how it works: Every submission gets a blockchain-style timestamp (exact date, time, and second). If Recruiter A submits 'John Smith' to 'Tech Company Role #123' at 10:00:00 AM, and Recruiter B submits the same 'John Smith' to the same role at 10:00:15 AM (15 seconds later), Recruiter A wins automatically. The system alerts Recruiter B: 'This candidate was already submitted to this role 15 seconds ago.' Recruiter B's token is refunded immediately. This eliminates arguments and protects everyone fairly. The first person to submit always has the right to represent that candidate for that specific role. This is legally binding and stored permanently on the platform."
  },
  
  // RecX Direct
  {
    category: "RecX Direct",
    question: "What is RecX Direct?",
    answer: "RecX Direct is a service where end clients post their roles for free. Thousands of recruiters can work on these roles, and clients only deal with one point of contact (Andrews Recruitment Group or Senior RecXchange Account Managers).",
    detailedAnswer: "RecX Direct is RecXchange's own recruitment service for hiring companies. Instead of hiring 10 different recruitment agencies, a company posts their role to RecX Direct for free. Then 15,000+ recruiters can see the role and submit candidates. The company only talks to ONE person - an Account Manager from RecXchange. The Account Manager handles all recruiter submissions, screens candidates, and presents only the best to the client. Recruiters earn up to 70% of the placement fee (significantly higher than the typical 50% split). The client gets access to thousands of recruiters without managing them. It's like having an RPO (Recruitment Process Outsourcing) service but with agency-style contingency terms - they only pay when someone is hired. Roles cover UK, USA, Europe, Africa, Middle East, and Australia across Engineering, Healthcare, Tech, HR, Sales, Finance, and more industries."
  },
  {
    category: "RecX Direct",
    question: "How do I access RecX Direct roles?",
    answer: "Pro members get instant access to RecX Direct roles as soon as they're posted. Lite members get access 7 days after posting. Entry members get access 30 days after posting (if applications are still being considered).",
    detailedAnswer: "RecX Direct access is tiered by membership level to reward higher-paying members with faster access: Pro Members ($250/month) - Instant access. You see RecX Direct roles the moment they're posted. You can submit candidates immediately. You have the best chance to fill the role and earn up to 70%. Lite Members ($99/month) - 7-day delay. You see RecX Direct roles 7 days after they're posted. Most roles are still open at 7 days, giving you a good chance to submit. Entry Members ($1/month) - 30-day delay. You see RecX Direct roles 30 days after posting, but only if the role is still accepting candidates. Some roles will be filled by then, but many senior or niche roles take 60+ days to fill. This tiered access ensures Pro members get the best opportunities while still allowing everyone to participate."
  },
  {
    category: "RecX Direct",
    question: "What's the split on RecX Direct placements?",
    answer: "Standard RecX Direct splits are up to 70% to the recruiter who makes the placement. The exact split depends on your tier and the specific role.",
    detailedAnswer: "RecX Direct offers significantly higher splits than typical recruiter collaboration: Up to 70% for the recruiter who makes the placement (you). 30% goes to RecXchange for managing the client relationship, screening candidates, and handling contracts. On a $7,000 placement (the platform average), you earn $4,900 instead of the typical $3,500 from a 50/50 split. That's $1,400 more per placement. The exact split can vary by role - some roles offer 60%, others offer 70%. Higher-value roles or harder-to-fill positions typically offer the full 70%. You'll see the exact split percentage before you submit any candidates. There are no hidden fees - if it says 70%, you get exactly 70% of the total fee. And remember: RecXchange takes 0% platform fees, so your 70% is truly 70%."
  },
  
  // Tokens & Pricing
  {
    category: "Tokens & Pricing",
    question: "Can I upgrade or downgrade my tier?",
    answer: "Yes. You can switch between tiers at any time. Your unused tokens roll over for 30 days when you upgrade.",
    detailedAnswer: "You have complete flexibility to change tiers: Upgrading - You can upgrade from Entry to Lite, or Lite to Pro at any time. When you upgrade, your unused tokens from the lower tier roll over for 30 days. Example: You're on Lite (150 tokens/month) and have used 50 tokens. You upgrade to Pro (400 tokens/month). You immediately get all 400 Pro tokens PLUS your remaining 100 Lite tokens - giving you 500 total for that month. Downgrading - You can downgrade at any time. If you downgrade mid-month, you keep your current tier's benefits until the end of your billing cycle, then the lower tier starts. Pausing - You can't pause, but you can downgrade to Entry ($1/month) if you need a break. Switching - Most recruiters start on Lite, see results, then upgrade to Pro for the instant RecX Direct access and higher earning potential."
  },
  {
    category: "Tokens & Pricing",
    question: "What happens if I run out of tokens?",
    answer: "You can upgrade to a higher tier mid-month to get more tokens, purchase additional tokens in blocks of 10, 40, 100, or 500 from the RecXchange shop inside the platform, or wait until your tokens refresh at the start of the next billing cycle.",
    detailedAnswer: "If you run out of tokens, you have three options: Option 1 - Upgrade your tier. If you're on Entry (5 tokens), upgrade to Lite (150 tokens) or Pro (400 tokens). You get the new tokens immediately and your unused lower-tier tokens roll over for 30 days. This is the best option if you consistently run out. Option 2 - Buy token packs. Inside your RecXchange dashboard, visit the Shop. You can buy: 10 tokens for $10, 40 tokens for $35, 100 tokens for $75, or 500 tokens for $300. Purchased tokens never expire. Option 3 - Wait for monthly reset. Your tokens refresh on your billing date. If you joined on the 15th, you get new tokens on the 15th of each month. Most recruiters on Lite (150 tokens) use about 20-50 tokens per month, so running out is uncommon unless you're very active - which means you should probably upgrade to Pro."
  },
  {
    category: "Tokens & Pricing",
    question: "Do I pay anything when I make a placement?",
    answer: "No platform fees on placements. You keep 100% of your agreed split fee. RecXchange only charges the monthly membership fee.",
    detailedAnswer: "RecXchange has ZERO platform fees on placements. Here's exactly what you pay: Monthly membership - Entry ($1), Lite ($99), or Pro ($250). That's it. When you make a placement: Total fee is $10,000. You agreed to 50/50 split. You invoice your client for $5,000. You keep the full $5,000. RecXchange takes $0 from your placement. Compare this to other platforms: Freelancer sites take 10-20% of every transaction. Some recruitment platforms take 5% of placement fees. Job boards charge per posting. RecXchange only charges the flat monthly membership. Make 1 placement, 10 placements, or 100 placements - you never pay more than your membership fee. This is why one $7,000 placement at 50% ($3,500 earned) pays for 35 months of Lite membership. The ROI is exceptional."
  },
  
  // Trust & Protection
  {
    category: "Trust & Protection",
    question: "How are split fee agreements enforced?",
    answer: "RecXchange auto-generates legally binding split fee agreements when you partner with another recruiter. Both parties sign digitally. The agreement is timestamped and stored on the platform.",
    detailedAnswer: "Split fee agreements are legally enforceable contracts created automatically by the platform: What's in the contract: Both recruiters' full names and company names. The specific role (client company, job title, location). The specific candidate (full name). The agreed split percentage (e.g., 50/50 or 60/40). The total estimated fee. The date and time the agreement was made (blockchain-style timestamp). Both parties' digital signatures. How signing works: You and your partner both agree to terms in the platform. You both click 'Sign Agreement.' Your digital signature is recorded with timestamp. The contract is stored permanently and cannot be edited. Both parties receive a PDF copy via email. Legal standing: These contracts are legally binding in UK, USA, EU, and most jurisdictions. If there's a dispute, you have a signed contract with timestamps as evidence. The contract clearly states who owes what to whom. Most disputes are resolved through the platform's built-in resolution process without needing lawyers."
  },
  {
    category: "Trust & Protection",
    question: "What if my partner doesn't pay their split?",
    answer: "All split fee agreements are legally binding contracts. If there's a payment dispute, you have a signed contract with timestamps as evidence. Most disputes are resolved through the platform's built-in resolution process.",
    detailedAnswer: "Payment disputes are rare but here's the process: Step 1 - Contact your partner directly. Most issues are simple misunderstandings (wrong invoice amount, payment processing delay, etc.). Step 2 - Open a dispute in the platform. You click 'Report Payment Issue' and describe the problem. Your partner is notified and has 7 days to respond. Step 3 - Provide evidence. You upload proof: the signed split fee agreement (already stored in platform), email communications, invoice sent to client, payment received from client (if applicable). Step 4 - Platform mediation. RecXchange team reviews both sides. If the contract clearly states the terms and you can prove the placement was made, you have strong legal standing. Step 5 - Resolution. Most cases are resolved within 14 days. If your partner is found at fault, their account is flagged and their rating drops. Repeated violations result in account suspension. Step 6 - Legal action (rare). You have a legally binding contract. You can pursue payment through small claims court or hire a lawyer. The signed contract is your evidence. This is why it's important to only partner with recruiters who have good ratings and reviews on the platform."
  },
  {
    category: "Trust & Protection",
    question: "Are all recruiters vetted?",
    answer: "Yes. All recruiters are rated and reviewed by other members. You can see a recruiter's placement history, rating, and reviews before partnering with them.",
    detailedAnswer: "RecXchange has a comprehensive vetting and rating system: Initial vetting: All new members verify their email and phone number. Business recruiters verify their company name and registration. LinkedIn profiles are encouraged but not required. Rating system: Every recruiter has a star rating (1-5 stars). Ratings are based on: successful placements made, partner reviews after collaborations, response time to messages, completion rate of agreed partnerships. You can see a recruiter's rating before agreeing to partner. Reviews: After each collaboration, both partners can leave a review. Reviews are public and cannot be deleted (similar to eBay or Airbnb). You can read what other recruiters say about someone before working with them. Look for: 'Paid on time,' 'Great communication,' 'Professional,' etc. Placement history: You can see how many placements a recruiter has made. New recruiters (0 placements) aren't necessarily bad - everyone starts somewhere. But experienced recruiters (10+ placements) have proven track records. Red flags: Low ratings (below 3 stars), negative reviews mentioning payment issues, no placements after 6+ months on platform. Best practice: Only partner with recruiters rated 4+ stars with at least 3 successful placements and positive reviews."
  },
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

  // Generate FAQPage JSON-LD schema
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

          {/* Visual Guide */}
          <section className="mb-16">
            <div className="glass-card p-10 rounded-3xl border-cyan-400/10 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">How Fee Splits Work</h2>
              <p className="text-gray-400 mb-8">Simple visual guide to understanding RecXchange fee sharing</p>
              
              {/* Fee Split Flowchart - Simple Visual */}
              <div className="bg-white/[0.02] rounded-2xl p-8 border border-white/5">
                <div className="space-y-6">
                  {/* Row 1: Total Fee */}
                  <div className="flex items-center justify-center">
                    <div className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold">
                      Total Placement Fee: $7,000
                    </div>
                  </div>
                  
                  {/* Arrow Down */}
                  <div className="flex justify-center">
                    <div className="text-4xl text-gray-600">↓</div>
                  </div>

                  {/* Row 2: Split Options */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-6 rounded-xl border border-cyan-400/20 bg-cyan-400/5">
                      <div className="text-cyan-400 font-bold text-lg mb-2">50/50 Split</div>
                      <div className="text-2xl font-bold text-white mb-1">$3,500</div>
                      <div className="text-xs text-gray-500">Each recruiter</div>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/5">
                      <div className="text-fuchsia-400 font-bold text-lg mb-2">60/40 Split</div>
                      <div className="text-2xl font-bold text-white mb-1">$4,200</div>
                      <div className="text-xs text-gray-500">Lead recruiter</div>
                    </div>
                    
                    <div className="p-6 rounded-xl border border-purple-400/20 bg-purple-400/5">
                      <div className="text-purple-400 font-bold text-lg mb-2">70% Direct</div>
                      <div className="text-2xl font-bold text-white mb-1">$4,900</div>
                      <div className="text-xs text-gray-500">RecX Direct</div>
                    </div>
                  </div>

                  {/* Arrow Down */}
                  <div className="flex justify-center">
                    <div className="text-4xl text-gray-600">↓</div>
                  </div>

                  {/* Row 3: Platform Fee */}
                  <div className="flex items-center justify-center">
                    <div className="px-6 py-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 font-bold">
                      Platform Fee: $0 (You keep 100%)
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <Link href="https://youtube.com/@recxchange" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all font-bold text-sm">
                  🎥 Watch Video Tutorials
                </Link>
                <Link href="/why-recxchange" className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 hover:bg-cyan-400/20 transition-all font-bold text-sm">
                  Why Choose RecXchange?
                </Link>
              </div>
            </div>
          </section>

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
                        className="glass-card p-8 rounded-2xl border-cyan-400/10 hover:border-cyan-400/20 transition-colors"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-white mb-3">
                              {faq.question}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {faq.detailedAnswer && isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-white/5"
                              >
                                <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                                  {faq.detailedAnswer}
                                </p>
                              </motion.div>
                            )}
                          </div>
                          
                          {faq.detailedAnswer && (
                            <button
                              onClick={() => toggleExpand(globalIndex)}
                              className="text-cyan-400 text-sm font-bold hover:text-cyan-300 transition-colors flex-shrink-0"
                            >
                              {isExpanded ? 'Show Less' : 'Show More'}
                            </button>
                          )}
                        </div>
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
            className="glass-card p-12 rounded-3xl border-cyan-400/10 text-center mt-20"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-8">
              Talk to our team, watch our tutorials, or start with a free trial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all"
              >
                Contact Us
              </Link>
              <Link
                href="https://youtube.com/@recxchange"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 font-bold transition-all"
              >
                🎥 Watch Tutorials
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
