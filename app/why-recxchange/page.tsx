'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function WhyRecXchangePage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Platform Comparison
          </span>
          <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
            Why Choose RecXchange?
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            See how RecXchange compares to traditional recruitment methods. Better for recruiters, better for hiring managers, better results for everyone.
          </p>
        </motion.header>

        {/* Comparison 1: RecXchange vs Traditional Recruitment Agencies */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">RecXchange vs Traditional Recruitment Agencies</h2>
            <p className="text-gray-400">How split fee collaboration beats working alone</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RecXchange */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-cyan-400/20 bg-cyan-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
                RecXchange
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Collaborative Recruitment</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">Access to 270M candidates</strong> - Never run out of talent. Search the database when your pipeline is empty.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">Partner with 15,000+ recruiters</strong> - Find candidates for your roles or roles for your candidates.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">Earn up to 70% on RecX Direct</strong> - Higher splits than traditional agencies ($4,900 on $7k placement).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">$1-$250/month flat fee</strong> - No commission splits with your agency. Keep 100% of your earnings.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">Legal protection</strong> - Auto-generated split fee contracts. Timestamped submissions. Both parties protected.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-cyan-400/10">
                  <h4 className="text-lg font-bold text-cyan-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">15,000+ recruiters working on your role</strong> - Post once, thousands see it.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">One point of contact</strong> - RecXchange Account Manager handles everything. No recruiter spam.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">12-20% fee</strong> - Lower than typical agency fees (20-30%). Only pay when you hire.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-cyan-400 mt-1">✓</span>
                      <span><strong className="text-white">Candidates in 48 hours</strong> - Fast turnaround. Multiple submissions from different recruiters.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-red-400/20 bg-red-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                Traditional Agency
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Solo Recruitment</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Limited candidate pool</strong> - Only your own database. If you don't have the candidate, you lose the placement.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">No collaboration</strong> - Work alone. Compete with everyone. No partnerships or support network.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">40-60% commission split</strong> - Agency takes 40-60% of your fee. You only keep $2,800-$4,200 on a $7k placement.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">High overhead costs</strong> - Office rent, CRM fees, job board subscriptions, marketing costs.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">No protection</strong> - Candidates can be poached. Clients can work with other agencies without notice.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-red-400/10">
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Limited recruiter pool</strong> - Only the recruiters you contact manually. Miss out on others with perfect candidates.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Multiple points of contact</strong> - Work with 5-10 agencies. Manage calls, emails, and duplicate submissions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">20-30% fee</strong> - Standard agency rates. Sometimes 35% for executive roles. Expensive.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Slow process</strong> - Wait for each agency to search separately. Inconsistent quality and timing.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison 2: RecXchange vs Job Boards */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">RecXchange vs Job Boards</h2>
            <p className="text-gray-400">Active recruitment vs passive job postings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RecXchange */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-fuchsia-400/20 bg-fuchsia-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 text-xs font-bold uppercase tracking-widest mb-6">
                RecXchange
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Active Recruitment</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-fuchsia-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Active candidate sourcing</strong> - Search 270M candidates. Find passive candidates who aren't job hunting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Earn $3,500-$4,900 per placement</strong> - Split fees with partners. Much higher earnings than job board subscriptions.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Pre-screened opportunities</strong> - Partner with vetted recruiters. Know the role is real before investing time.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Relationship-based</strong> - Build partnerships. Get repeat business from trusted recruiter network.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-fuchsia-400/10">
                  <h4 className="text-lg font-bold text-fuchsia-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Recruiters find you</strong> - 15,000+ recruiters actively search and submit candidates. No waiting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Pre-screened candidates</strong> - Recruiters vet candidates before submission. Only quality matches reach you.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Access passive candidates</strong> - Reach people not actively job hunting. Higher quality talent pool.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-fuchsia-400 mt-1">✓</span>
                      <span><strong className="text-white">Pay only when hired</strong> - No upfront costs. 12-20% fee only when you successfully hire.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Job Boards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-red-400/20 bg-red-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                Job Boards
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Passive Job Posting</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Passive candidate pool</strong> - Only see people actively looking. Miss out on 70% of talent (passive candidates).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Pay per post or subscription</strong> - $200-$500 per job post. $5,000-$20,000/year for LinkedIn Recruiter. No guarantee of results.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Low response rates</strong> - Most posted jobs get ignored. Candidates apply to 50+ jobs. Hard to stand out.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">No relationships</strong> - Transactional. Post, hope, wait. No network or partnerships built.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-red-400/10">
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Wait for applications</strong> - Passive process. Hope the right candidates see and apply to your posting.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Unscreened applications</strong> - Receive 100+ resumes. Most are unqualified. Spend hours screening manually.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Only active job seekers</strong> - Miss passive candidates (the best talent). They're not browsing job boards.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Pay upfront</strong> - $200-$500 per post. No guarantee anyone suitable will apply. Money wasted if no hire.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Comparison 3: RecXchange vs RPO Providers */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">RecXchange vs RPO Providers</h2>
            <p className="text-gray-400">Flexible collaboration vs expensive contracts</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* RecXchange */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-purple-400/20 bg-purple-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-purple-400/10 border border-purple-400/30 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
                RecXchange
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Digital RPO Alternative</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-purple-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">Work independently</strong> - Keep your own business. No employment contracts or exclusivity required.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">Choose your roles</strong> - Work on roles you want. Ignore roles that don't fit your niche or location.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">Higher earnings</strong> - Earn $3,500-$4,900 per placement. Keep 100% of your split (no RPO company taking a cut).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">Scale at your pace</strong> - Work on 1 role or 100 roles. No quotas or performance targets.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-purple-400/10">
                  <h4 className="text-lg font-bold text-purple-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">No long-term contracts</strong> - Use RecXchange for 1 role or 100 roles. Cancel anytime. Total flexibility.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">12-20% fee</strong> - Significantly cheaper than RPO (30-50% annual salary). Pay per hire, not per month.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">15,000+ recruiters</strong> - Bigger talent network than any RPO provider. More recruiters = more candidates = faster fills.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">One point of contact</strong> - Dedicated Account Manager handles everything. Same white-glove service as RPO.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-purple-400 mt-1">✓</span>
                      <span><strong className="text-white">Test before committing</strong> - Post one role for free. See results. Scale up if it works. No risk.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* RPO */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-3xl border-red-400/20 bg-red-400/[0.02]"
            >
              <div className="inline-block px-4 py-2 rounded-full bg-red-400/10 border border-red-400/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
                RPO Provider
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Traditional RPO</h3>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Recruiters:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Employment required</strong> - Must work for the RPO company. Give up independence and business ownership.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Assigned roles</strong> - Work on roles given to you. No choice. Might be roles outside your expertise.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Fixed salary or low commission</strong> - Earn $40,000-$80,000 salary regardless of performance. Or 10-20% commission (tiny).</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Performance quotas</strong> - Must hit targets. Make X placements per quarter or risk termination.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-red-400/10">
                  <h4 className="text-lg font-bold text-red-400 mb-3">For Hiring Managers:</h4>
                  <ul className="space-y-3 text-gray-400 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">12-36 month contracts</strong> - Locked in for years. Expensive exit clauses. Can't cancel easily even if results are poor.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">30-50% of annual salary</strong> - Premium pricing. Plus monthly retainer ($10,000-$50,000/month). Very expensive.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Limited recruiter pool</strong> - Only the RPO company's employed recruiters (typically 10-50 people). Small network.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">Rigid service model</strong> - One-size-fits-all process. Can't customize easily. Bureaucratic.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-red-400 mt-1">✗</span>
                      <span><strong className="text-white">High commitment required</strong> - Must commit to minimum number of hires. Can't test before signing. Big risk.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-3xl border-cyan-400/10 text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-6">
            The RecXchange Advantage
          </h2>
          <p className="text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            RecXchange combines the best of all recruitment methods: the reach of job boards, the service quality of RPO, and the flexibility of agencies - without the downsides. For recruiters, earn more while working less. For hiring managers, get better candidates faster at lower cost.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-cyan-400/5 border border-cyan-400/10">
              <div className="text-4xl font-bold gradient-text mb-2">15,000+</div>
              <div className="text-sm text-gray-400">Active recruiters partnering on placements</div>
            </div>
            <div className="p-6 rounded-2xl bg-fuchsia-400/5 border border-fuchsia-400/10">
              <div className="text-4xl font-bold gradient-text mb-2">$7,000</div>
              <div className="text-sm text-gray-400">Average placement fee across 100+ roles</div>
            </div>
            <div className="p-6 rounded-2xl bg-purple-400/5 border border-purple-400/10">
              <div className="text-4xl font-bold gradient-text mb-2">270M</div>
              <div className="text-sm text-gray-400">Candidate profiles searchable on platform</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/recruiter"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
            >
              Join as Recruiter
            </Link>
            <Link
              href="/hiring-manager-home"
              className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-cyan-400/10 hover:border-cyan-400/30 border border-white/10 font-bold transition-all"
            >
              Post Your Role
            </Link>
            <Link
              href="/pricing"
              className="px-8 py-4 rounded-xl bg-white/10 text-white hover:bg-fuchsia-400/10 hover:border-fuchsia-400/30 border border-white/10 font-bold transition-all"
            >
              View Pricing
            </Link>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
