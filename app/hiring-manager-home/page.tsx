'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { Zap, Users, Clock, Shield, Target } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import ModalWrapper from '@/components/ModalWrapper';

export default function HiringManagerHome() {
  const [howItWorksFormOpen, setHowItWorksFormOpen] = useState(false);
  const [howItWorksEmail, setHowItWorksEmail] = useState('');
  const [howItWorksName, setHowItWorksName] = useState('');
  const [howItWorksPhone, setHowItWorksPhone] = useState('');
  const [howItWorksCompany, setHowItWorksCompany] = useState('');
  const [howItWorksSubmitting, setHowItWorksSubmitting] = useState(false);
  const [howItWorksSuccess, setHowItWorksSuccess] = useState(false);

  const handleHowItWorksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!howItWorksEmail || !howItWorksName) return;
    
    setHowItWorksSubmitting(true);
    
    try {
      const response = await fetch('/api/submit-how-it-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: howItWorksEmail,
          name: howItWorksName,
          phone: howItWorksPhone,
          company: howItWorksCompany
        })
      });
      
      if (response.ok) {
        setHowItWorksSuccess(true);
        setTimeout(() => {
          setHowItWorksFormOpen(false);
          setHowItWorksSuccess(false);
          setHowItWorksEmail('');
          setHowItWorksName('');
          setHowItWorksPhone('');
          setHowItWorksCompany('');
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setHowItWorksSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    if (!howItWorksSubmitting) {
      setHowItWorksFormOpen(false);
    }
  };

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pt-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="RECX DIRECT" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Post your role for free.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2 mt-6">
              15,000+ recruiters compete to fill it. You pay one fee when hired.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-widest">15,000+ Recruiters</span>
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-fuchsia-400/5 border border-fuchsia-400/20 text-fuchsia-400 font-bold uppercase tracking-widest">270M candidates</span>
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-purple-400/5 border border-purple-400/20 text-purple-400 font-bold uppercase tracking-widest">Engineering • Healthcare • Tech</span>
            </div>
          </motion.header>

          {/* Quick Action */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <GlowButton variant="secondary" size="md" onClick={() => setHowItWorksFormOpen(true)}>
              How Does It Work?
            </GlowButton>
          </div>

          {/* Diagnostic Card */}
          <section className="mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <StatusBadge label="SELECT YOUR PRIORITY" color="fuchsia" size="sm" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 tracking-tight leading-snug mt-4">
                Choose the path that matches your current timeline:
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                {/* URGENT SUPPORT */}
                <Link href="/hiring-manager-live" className="group block">
                  <HolographicCard color="cyan" variant="feature">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4 sm:mb-6 text-cyan-400">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">Fill Role Now</h3>
                    <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-8">
                      You need someone hired this month. Post your role. Get shortlisted candidates in 48 hours. Pay one fee when you hire.
                    </p>
                    <ul className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-10">
                      {[
                        "Post once, 15,000+ recruiters see it",
                        "Set your fee upfront (12-20% standard)",
                        "First candidates submitted in 48 hours"
                      ].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-cyan-400 rounded-full flex-shrink-0" /> 
                          <span className="text-[11px] sm:text-xs leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <GlowButton variant="primary" size="md" className="w-full">Post Urgent Role</GlowButton>
                  </HolographicCard>
                </Link>

                {/* STRATEGIC PLANNING */}
                <Link href="/hiring-manager-strategic" className="group block">
                  <HolographicCard color="fuchsia" variant="feature">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-4 sm:mb-6 text-fuchsia-400">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-fuchsia-400 transition-colors">Build Pipeline</h3>
                    <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-8">
                      You're hiring in 3-6 months. Test the market now. See who's available. Build a pipeline before you officially recruit.
                    </p>
                    <ul className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-10">
                      {[
                        "See candidate availability before you post publicly",
                        "Engage candidates before your role goes live",
                        "Build talent pipeline for future hiring"
                      ].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-fuchsia-400 rounded-full flex-shrink-0" /> 
                          <span className="text-[11px] sm:text-xs leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <GlowButton variant="secondary" size="md" className="w-full">Start Market Mapping</GlowButton>
                  </HolographicCard>
                </Link>
              </div>

              <div className="mt-8 sm:mt-12 md:mt-14 pt-6 sm:pt-10 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-6 text-[10px] sm:text-[11px] text-gray-500">
                <p className="flex items-center gap-2 text-center md:text-left">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)] flex-shrink-0" />
                  <span>Switch between models at any time.</span>
                </p>
                <Link href="/account-management" className="text-fuchsia-400 hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="whitespace-nowrap">Learn about Managed Services</span> <span className="text-base">→</span>
                </Link>
              </div>
            </HolographicCard>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Content Section */}
          <section className="my-10 sm:my-12 md:my-16">
            <div className="text-center mb-10 sm:mb-12">
              <StatusBadge label="HERE'S WHAT YOU ACTUALLY GET" color="purple" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 mt-6">
                Both paths unlock the same platform
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-2">
                Whether you need to fill a role now or build a pipeline for later, you're getting the full RecXchange hiring infrastructure.
              </p>
            </div>

            {/* Split Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-12">
              {/* Urgent */}
              <HolographicCard color="cyan" variant="content">
                <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-400">If You Need To Fill Role Now</h3>
                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                  Post your role once. 15,000+ recruiters see it instantly. They compete to bring you the best candidates. You set the fee upfront (12-20% standard). Pay only when you hire.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { title: "Network Effect", desc: "300+ recruiters sourcing simultaneously from 270M profiles." },
                    { title: "First Candidates in 48hrs", desc: "AI matching delivers vetted shortlists within 2 days of posting." },
                    { title: "One Fee When Hired", desc: "No retainers, no multi-agency fees. One placement = one payment." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                        <Zap size={16} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>

              {/* Strategic */}
              <HolographicCard color="fuchsia" variant="content">
                <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-fuchsia-400">If You Want To Build Pipeline</h3>
                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                  Pre-warm the market 3-6 months before you hire. We map competitor talent, benchmark salaries, and build your ready-to-activate pipeline before budgets are approved.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { title: "90-Day Strategic Roadmap", desc: "Market intelligence, network warming, and vetted shortlists ready on day 1." },
                    { title: "Competitor Mapping", desc: "Org-chart visualization of rival teams and passive candidate outreach." },
                    { title: "Launch-Ready Pipelines", desc: "Nurtured talent primed to move the moment your role goes live." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-fuchsia-400">
                        <Target size={16} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>
            </div>

            {/* What You Get */}
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center gradient-text">What You Get No Matter What</h3>
              <p className="text-gray-400 text-center text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                Both paths include full access to RecX Direct infrastructure. One platform, one fee structure, total control.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: Users, title: "15,000+ Recruiters", desc: "Pre-vetted specialists competing to fill your role faster and better." },
                  { icon: Clock, title: "48-Hour Turnaround", desc: "First vetted candidates submitted within 2 days of posting your role." },
                  { icon: Shield, title: "Zero Risk Model", desc: "Pay only when you hire. No retainers, no upfront fees, no multi-agency chaos." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 mx-auto mb-3 sm:mb-4">
                      <item.icon size={24} />
                    </div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </HolographicCard>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
              {[
                { value: "15,000+", label: "Active Recruiters", color: "cyan" },
                { value: "270M", label: "Candidate Profiles", color: "fuchsia" },
                { value: "12-20%", label: "Standard Fee", color: "purple" }
              ].map((stat, i) => (
                <HolographicCard key={i} color={stat.color as any} variant="stat">
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                </HolographicCard>
              ))}
            </div>

            {/* Final CTA */}
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 gradient-text">
                Ready to fill your role?
              </h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                Post for free. 15,000+ recruiters compete. First candidates in 48 hours. Pay one fee only when you hire.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <GlowButton variant="primary" size="lg" href="{{trigger_link.vJPDrwl8k6nFBhkZeZJH}}">
                  Post Role Now
                </GlowButton>
                <GlowButton variant="ghost" size="lg" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Know Your Timeline?
                </GlowButton>
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>

      {/* Modal */}
      <ModalWrapper
        isOpen={howItWorksFormOpen}
        onClose={handleCloseModal}
        title="How Does It Work?"
        subtitle="We'll send you a short video explainer showing exactly how RecX Direct works and how it helps you hire faster with one simple fee."
        maxWidth="lg"
        preventClose={howItWorksSubmitting}
      >
        {howItWorksSuccess ? (
          <div className="py-12 sm:py-16 text-center">
            <div className="w-14 h-14 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Video on its way!</h3>
            <p className="text-gray-400 text-sm">Check your email for the explainer.</p>
          </div>
        ) : (
          <form onSubmit={handleHowItWorksSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name *</label>
              <input
                type="text"
                value={howItWorksName}
                onChange={(e) => setHowItWorksName(e.target.value)}
                required
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
              <input
                type="email"
                value={howItWorksEmail}
                onChange={(e) => setHowItWorksEmail(e.target.value)}
                required
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
              <input
                type="tel"
                value={howItWorksPhone}
                onChange={(e) => setHowItWorksPhone(e.target.value)}
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="+44 20 1234 5678"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Company</label>
              <input
                type="text"
                value={howItWorksCompany}
                onChange={(e) => setHowItWorksCompany(e.target.value)}
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="Acme Corp"
              />
            </div>
            <GlowButton type="submit" variant="secondary" size="lg" className="w-full" disabled={howItWorksSubmitting}>
              {howItWorksSubmitting ? 'Sending...' : 'Send Video Explainer'}
            </GlowButton>
          </form>
        )}
      </ModalWrapper>
    </main>
  );
}
