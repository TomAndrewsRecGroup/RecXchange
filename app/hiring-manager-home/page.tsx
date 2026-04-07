'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Zap, Users, Clock, Shield, Target, X } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import ModalWrapper from '@/components/ModalWrapper';

function scrollToCenter(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const scrollTop = window.scrollY + rect.top - (window.innerHeight / 2) + (rect.height / 2);
  window.scrollTo({ top: scrollTop, behavior: 'smooth' });
}

export default function HiringManagerHome() {
  const [howItWorksFormOpen, setHowItWorksFormOpen] = useState(false);
  const [howItWorksName, setHowItWorksName] = useState('');
  const [howItWorksEmail, setHowItWorksEmail] = useState('');
  const [howItWorksPhone, setHowItWorksPhone] = useState('');
  const [howItWorksCompany, setHowItWorksCompany] = useState('');
  const [howItWorksSubmitting, setHowItWorksSubmitting] = useState(false);
  const [howItWorksSuccess, setHowItWorksSuccess] = useState(false);
  const [howItWorksError, setHowItWorksError] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);

  const prevOpenRef = useRef(false);
  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = howItWorksFormOpen;
    if (howItWorksFormOpen && !wasOpen) {
      setHowItWorksName('');
      setHowItWorksEmail('');
      setHowItWorksPhone('');
      setHowItWorksCompany('');
      setHowItWorksError('');
      setMarketingConsent(false);
      setHowItWorksSuccess(false);
    }
  }, [howItWorksFormOpen]);

  const handleHowItWorksSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!howItWorksName.trim()) { setHowItWorksError('Please enter your name'); return; }
    if (!howItWorksEmail || !howItWorksEmail.includes('@')) { setHowItWorksError('Please enter a valid email address'); return; }

    setHowItWorksSubmitting(true);
    setHowItWorksError('');

    try {
      const response = await fetch('/api/submit-how-it-works', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: howItWorksEmail,
          name: howItWorksName,
          phone: howItWorksPhone,
          company: howItWorksCompany,
          marketingConsent,
        }),
      });

      if (response.ok) {
        setHowItWorksSuccess(true);
        setTimeout(() => {
          setHowItWorksFormOpen(false);
          setHowItWorksSuccess(false);
        }, 3000);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setHowItWorksError(error instanceof Error ? error.message : 'Something went wrong');
    } finally {
      setHowItWorksSubmitting(false);
    }
  };

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pt-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="FOR HIRING MANAGERS" color="fuchsia" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Hire faster, without the agency headache.
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Post your role once. Thousands of specialist recruiters compete to find you the best candidates. You only pay when someone gets hired.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-widest">Trusted by 15,000+ Recruiters</span>
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-fuchsia-400/5 border border-fuchsia-400/20 text-fuchsia-400 font-bold uppercase tracking-widest">270M Candidate Profiles</span>
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-purple-400/5 border border-purple-400/20 text-purple-400 font-bold uppercase tracking-widest">Every Sector Covered</span>
            </div>
          </motion.header>

          {/* Quick Action */}
          <div className="flex justify-center mb-10 sm:mb-12">
            <GlowButton variant="secondary" size="md" onClick={() => setHowItWorksFormOpen(true)}>
              How Does It Work?
            </GlowButton>
          </div>

          {/* Diagnostic Card */}
          <section id="choose-path" className="mb-10 sm:mb-12 md:mb-16">
            <HolographicCard color="fuchsia" variant="content">
              <StatusBadge label="YOUR TIMELINE" color="fuchsia" size="sm" />
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 tracking-tight leading-snug mt-4">
                How soon do you need someone in the seat?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 md:gap-8">
                <Link href="/hiring-manager-live" className="group block">
                  <HolographicCard color="cyan" variant="feature">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-4 sm:mb-6 text-cyan-400">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">I need to hire now</h3>
                    <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-8">
                      You have an open role and need it filled fast. Post it once, recruiters start sourcing candidates within hours, not weeks.
                    </p>
                    <ul className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-10">
                      {["One post reaches thousands of specialist recruiters", "Your fee is agreed before any work begins", "Expect your first shortlist within 48 hours"].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-cyan-400 rounded-full flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <GlowButton variant="primary" size="md" className="w-full">Post My Role</GlowButton>
                  </HolographicCard>
                </Link>
                <Link href="/hiring-manager-strategic" className="group block">
                  <HolographicCard color="fuchsia" variant="feature">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-4 sm:mb-6 text-fuchsia-400">
                      <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-base sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-fuchsia-400 transition-colors">I'm planning ahead</h3>
                    <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-5 sm:mb-8">
                      Hiring in 3-6 months? Start now. Map the market, benchmark salaries, and build a pipeline of ready-to-move candidates before you officially need them.
                    </p>
                    <ul className="space-y-2.5 sm:space-y-4 mb-6 sm:mb-10">
                      {["See who's available before you go public", "Warm up candidates before your role goes live", "Have a shortlist ready on day one"].map((item, i) => (
                        <li key={i} className="text-gray-400 flex items-start gap-2 sm:gap-3">
                          <span className="w-1 h-1 mt-1.5 bg-fuchsia-400 rounded-full flex-shrink-0" />
                          <span className="text-[11px] sm:text-xs leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <GlowButton variant="secondary" size="md" className="w-full">Start Planning</GlowButton>
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
              <StatusBadge label="WHAT'S INCLUDED" color="purple" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 mt-6">The same powerful platform, either way</h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed px-2">
                Whether you're hiring this month or planning for Q3, you get the full RecXchange infrastructure working behind the scenes for you.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 mb-10 sm:mb-12">
              <HolographicCard color="cyan" variant="content">
                <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-400">When You Need Someone Now</h3>
                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                  Post your role once and thousands of specialist recruiters start competing to bring you the best candidates. You set the fee upfront (12-20% is standard). Pay only when you hire.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { title: "The Power of Numbers", desc: "Hundreds of specialist recruiters sourcing for you at once, across 270M profiles." },
                    { title: "Candidates in 48 Hours", desc: "Our matching technology delivers vetted shortlists within 2 days of your role going live." },
                    { title: "One Hire, One Fee", desc: "No retainers, no multi-agency chaos. You only pay once, when someone starts." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400"><Zap size={16} /></div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>
              <HolographicCard color="fuchsia" variant="content">
                <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-6 text-fuchsia-400">When You're Planning Ahead</h3>
                <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                  Get ahead of your hiring timeline. We'll map competitor talent, benchmark salaries, and build a ready-to-activate pipeline, so when you're ready to hire, the candidates are already waiting.
                </p>
                <div className="space-y-4 sm:space-y-6">
                  {[
                    { title: "Your 90-Day Hiring Roadmap", desc: "Market intelligence, warm introductions, and vetted shortlists ready for when you need them." },
                    { title: "Know What Competitors Are Doing", desc: "See how rival teams are structured and reach passive candidates before anyone else." },
                    { title: "Launch-Ready Talent", desc: "When your role goes live, you'll already have interested, qualified candidates lined up." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-fuchsia-400"><Target size={16} /></div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </HolographicCard>
            </div>
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="mb-10 sm:mb-12">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center gradient-text">Included with every engagement</h3>
              <p className="text-gray-400 text-center text-sm sm:text-base max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                One platform, one fee structure, and total transparency, no matter which path you choose.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: Users, title: "Thousands of Specialists", desc: "Pre-vetted recruiters across every sector, competing to find your ideal hire." },
                  { icon: Clock, title: "First Candidates in 48hrs", desc: "Your role goes live, and vetted shortlists start arriving within two days." },
                  { icon: Shield, title: "Zero Risk, Zero Upfront", desc: "No retainers. No upfront fees. You only pay when you make a hire you're happy with." }
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
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 gradient-text">Let's get your role filled.</h3>
              <p className="text-gray-400 text-sm sm:text-base max-w-3xl mx-auto mb-8 sm:mb-10 leading-relaxed">
                It's free to post. Thousands of recruiters start sourcing immediately. You'll see your first candidates in 48 hours, and only pay when you hire.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center">
                <GlowButton variant="primary" size="lg" href="https://link.gohighlevel.com/widget/booking/xp9zWAV1rz40w5WdPSTi">Post My Role Free</GlowButton>
                <GlowButton variant="secondary" size="lg" onClick={() => scrollToCenter('choose-path')}>Not Sure Yet? Compare Options</GlowButton>
              </div>
            </HolographicCard>
          </section>
        </div>
      </div>

      {/* How Does It Work Modal */}
      <ModalWrapper
        isOpen={howItWorksFormOpen}
        onClose={() => { if (!howItWorksSubmitting) setHowItWorksFormOpen(false); }}
        title="How Does It Work?"
        subtitle="We'll send you a short video explainer showing exactly how RecX Direct works and how it helps you hire faster with one simple fee."
        maxWidth="2xl"
        preventClose={howItWorksSubmitting}
      >
        {howItWorksSuccess ? (
          <div className="py-12 sm:py-16 md:py-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Video on its way!</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Check your email for the explainer.</p>
          </div>
        ) : (
          <form onSubmit={handleHowItWorksSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name *</label>
              <input type="text" value={howItWorksName} onChange={(e) => setHowItWorksName(e.target.value)}
                required disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
              <input type="email" value={howItWorksEmail} onChange={(e) => setHowItWorksEmail(e.target.value)}
                required disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
              <input type="tel" value={howItWorksPhone} onChange={(e) => setHowItWorksPhone(e.target.value)}
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="+44 20 1234 5678"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Company</label>
              <input type="text" value={howItWorksCompany} onChange={(e) => setHowItWorksCompany(e.target.value)}
                disabled={howItWorksSubmitting}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="Acme Corp"
              />
            </div>
            <div className="border-t border-white/10 pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  disabled={howItWorksSubmitting}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-fuchsia-400 focus:ring-fuchsia-400/50 focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                />
                <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Yes, I'd like to receive updates and insights from RecXchange by email. You can unsubscribe at any time.
                </span>
              </label>
            </div>
            {howItWorksError && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="text-xs sm:text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 sm:px-4"
              >
                {howItWorksError}
              </motion.p>
            )}
            <button type="submit"
              disabled={howItWorksSubmitting}
              className="relative w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center">
                {howItWorksSubmitting ? 'Sending...' : 'Send Video Explainer'}
              </span>
            </button>
          </form>
        )}
      </ModalWrapper>
    </main>
  );
}
