'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { X, Zap, Users, Clock, Shield, Target, TrendingUp } from 'lucide-react';

export default function HiringManagerHome() {
  const [howItWorksFormOpen, setHowItWorksFormOpen] = useState(false);
  
  // How Does It Work form state
  const [howItWorksEmail, setHowItWorksEmail] = useState('');
  const [howItWorksName, setHowItWorksName] = useState('');
  const [howItWorksPhone, setHowItWorksPhone] = useState('');
  const [howItWorksCompany, setHowItWorksCompany] = useState('');
  const [howItWorksSubmitting, setHowItWorksSubmitting] = useState(false);
  const [howItWorksSuccess, setHowItWorksSuccess] = useState(false);

  const panelVariants: Variants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    hover: {
      scale: 1.02,
      backgroundColor: "rgba(0, 255, 255, 0.02)",
      borderColor: "rgba(0, 255, 255, 0.15)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

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

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-24 md:pt-32 pb-12 md:pb-20 px-4 sm:px-6 overflow-x-hidden">

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">

        {/* Intro Context */}
        <header className="text-center mb-8 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-fuchsia-400/60 mb-4 md:mb-6 font-bold">
              RecX Direct
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold gradient-text mb-4 md:mb-6 tracking-tight leading-tight pb-2 px-2">
              Post your role for free.
            </h1>
            <div className="pulse-underline mb-6 md:mb-8 mx-auto" />
            <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed px-4">
              15,000+ recruiters compete to fill it. You pay one fee when hired.
            </p>
            <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-gray-500 px-4">
              <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 whitespace-nowrap">15,000+ Recruiters</span>
              <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 whitespace-nowrap">270M candidates</span>
              <span className="px-2 sm:px-3 py-1 rounded-full bg-white/5 border border-white/10 text-center">Engineering · Healthcare · Tech · HR · Sales · Finance</span>
            </div>
          </motion.div>
        </header>

        {/* Quick Actions */}
        <div className="w-full mb-12 sm:mb-16 flex flex-wrap justify-center gap-3 sm:gap-4">
          <button
            onClick={() => setHowItWorksFormOpen(true)}
            className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/5 text-fuchsia-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest hover:bg-fuchsia-400/10 transition-all"
          >
            How Does It Work?
          </button>
        </div>

        {/* Diagnostic Card */}
        <section className="glass-card w-full rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-8 md:p-10 lg:p-14 border-fuchsia-400/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-[100px] pointer-events-none" />

          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-fuchsia-400 mb-6 md:mb-8">
            Select your priority
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-8 md:mb-12 tracking-tight">
            Choose the path that matches your current timeline:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* URGENT SUPPORT */}
            <Link href="/hiring-manager-live" className="group block">
              <motion.div
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-cyan-400/10 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-7 md:p-8 flex flex-col justify-between bg-white/[0.01] transition-all min-h-[420px] sm:min-h-[450px]"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-5 sm:mb-6 text-cyan-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-cyan-400 transition-colors">Fill Role Now</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 sm:mb-8">
                    You need someone hired this month. Post your role. Get shortlisted candidates in 48 hours. Pay one fee when you hire.
                  </p>
                  <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    {[
                      "Post once, 15,000+ recruiters see it",
                      "Set your fee upfront (12-20% standard)",
                      "First candidates submitted in 48 hours"
                    ].map((item, i) => (
                      <li key={i} className="text-[9px] sm:text-[10px] text-gray-400 flex items-center gap-2 sm:gap-3 font-bold uppercase tracking-wider sm:tracking-widest">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full flex-shrink-0" /> 
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Homepage-style button */}
                <div className="relative w-full mt-8 sm:mt-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[11px] sm:text-sm uppercase tracking-wider sm:tracking-widest transition-all">
                  <span className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Post Urgent Role</span>
                </div>
              </motion.div>
            </Link>

            {/* STRATEGIC PLANNING */}
            <Link href="/hiring-manager-strategic" className="group block">
              <motion.div
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-fuchsia-400/10 rounded-xl sm:rounded-2xl md:rounded-[2rem] p-6 sm:p-7 md:p-8 flex flex-col justify-between bg-white/[0.01] transition-all min-h-[420px] sm:min-h-[450px]"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-5 sm:mb-6 text-fuchsia-400">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-fuchsia-400 transition-colors">Build Pipeline</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 sm:mb-8">
                    You're hiring in 3-6 months. Test the market now. See who's available. Build a pipeline before you officially recruit.
                  </p>
                  <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                    {[
                      "See candidate availability before you post publicly",
                      "Engage candidates before your role goes live",
                      "Build talent pipeline for future hiring"
                    ].map((item, i) => (
                      <li key={i} className="text-[9px] sm:text-[10px] text-gray-400 flex items-center gap-2 sm:gap-3 font-bold uppercase tracking-wider sm:tracking-widest">
                        <span className="w-1 h-1 bg-fuchsia-400 rounded-full flex-shrink-0" /> 
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Homepage-style button */}
                <div className="relative w-full mt-8 sm:mt-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-[11px] sm:text-sm uppercase tracking-wider sm:tracking-widest transition-all">
                  <span className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Start Market Mapping</span>
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-14 pt-8 sm:pt-10 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 text-[10px] sm:text-[11px] text-gray-500">
            <p className="flex items-center gap-2 text-center md:text-left">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)] flex-shrink-0" />
              <span>Switch between models at any time.</span>
            </p>
            <Link href="/account-management" className="text-fuchsia-400 hover:text-white transition-colors font-bold uppercase tracking-wider sm:tracking-widest flex items-center gap-2 text-[10px] sm:text-[11px]">
              Learn about Managed Services <span className="text-base sm:text-lg">→</span>
            </Link>
          </div>
        </section>

        {/* HORMOZI-STYLE COMBINED CONTENT SECTION */}
        <section className="mt-12 sm:mt-16 md:mt-20 w-full">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 px-4">
            <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-purple-400/20 bg-purple-400/5 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-purple-400 mb-4 sm:mb-6">
              Here's What You Actually Get
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Both paths unlock the same platform
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
              Whether you need to fill a role now or build a pipeline for later, you're getting the full RecXchange hiring infrastructure. Here's exactly what that means.
            </p>
          </div>

          {/* Split Content: Urgent vs Strategic */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
            {/* Left: If You Need To Fill Role Now */}
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border-cyan-400/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px]" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-cyan-400">If You Need To Fill Role Now</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 sm:mb-8">
                  Post your role once. 15,000+ recruiters see it instantly. They compete to bring you the best candidates. You set the fee upfront (12-20% standard). Pay only when you hire.
                </p>
                <div className="space-y-5 sm:space-y-6">
                  {[
                    { title: "Network Effect", desc: "300+ recruiters sourcing simultaneously from 270M profiles." },
                    { title: "First Candidates in 48hrs", desc: "AI matching delivers vetted shortlists within 2 days of posting." },
                    { title: "One Fee When Hired", desc: "No retainers, no multi-agency fees. One placement = one payment." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                        <Zap size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: If You Want To Build Pipeline */}
            <div className="glass-card p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border-fuchsia-400/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 blur-[60px]" />
              <div className="relative">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-fuchsia-400">If You Want To Build Pipeline</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 sm:mb-8">
                  Pre-warm the market 3-6 months before you hire. We map competitor talent, benchmark salaries, and build your ready-to-activate pipeline before budgets are approved.
                </p>
                <div className="space-y-5 sm:space-y-6">
                  {[
                    { title: "90-Day Strategic Roadmap", desc: "Market intelligence, network warming, and vetted shortlists ready on day 1." },
                    { title: "Competitor Mapping", desc: "Org-chart visualization of rival teams and passive candidate outreach." },
                    { title: "Launch-Ready Pipelines", desc: "Nurtured talent primed to move the moment your role goes live." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 sm:gap-4 items-start">
                      <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center text-fuchsia-400">
                        <Target size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* What You Get No Matter What */}
          <div className="glass-card p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] border-purple-400/10 mb-10 sm:mb-12 md:mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-[100px]" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-center">What You Get <span className="gradient-text">No Matter What</span></h3>
              <p className="text-gray-400 text-center text-sm sm:text-base max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
                Both paths include full access to RecX Direct infrastructure. One platform, one fee structure, total control.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                {[
                  { icon: Users, title: "15,000+ Recruiters", desc: "Pre-vetted specialists competing to fill your role faster and better." },
                  { icon: Clock, title: "48-Hour Turnaround", desc: "First vetted candidates submitted within 2 days of posting your role." },
                  { icon: Shield, title: "Zero Risk Model", desc: "Pay only when you hire. No retainers, no upfront fees, no multi-agency chaos." }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center text-purple-400 mx-auto mb-3 sm:mb-4">
                      <item.icon size={20} className="sm:w-6 sm:h-6" />
                    </div>
                    <h4 className="text-white font-bold text-sm sm:text-base mb-1 sm:mb-2">{item.title}</h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* The Numbers (Hormozi-Style Proof) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
            {[
              { value: "15,000+", label: "Active Recruiters", sublabel: "Competing for your role" },
              { value: "270M", label: "Candidate Profiles", sublabel: "Global talent database" },
              { value: "12-20%", label: "Standard Fee", sublabel: "One fee when you hire" }
            ].map((stat, i) => (
              <div key={i} className="glass-card p-6 sm:p-8 rounded-xl sm:rounded-2xl border-white/5 text-center">
                <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-white font-bold text-xs sm:text-sm mb-1">{stat.label}</p>
                <p className="text-gray-500 text-[10px] sm:text-xs">{stat.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Final CTA Section */}
          <div className="glass-card p-8 sm:p-10 md:p-12 lg:p-16 rounded-2xl sm:rounded-[2.5rem] md:rounded-[3rem] border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-cyan-500/10 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5 blur-3xl" />
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Ready to <span className="gradient-text">fill your role?</span>
              </h3>
              <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-4">
                Post for free. 15,000+ recruiters compete. First candidates in 48 hours. Pay one fee only when you hire.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center max-w-xl mx-auto">
                <Link
                  href="{{trigger_link.vJPDrwl8k6nFBhkZeZJH}}"
                  className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black text-xs sm:text-sm uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                >
                  Post Role Now
                </Link>
                <button
                  onClick={scrollToTop}
                  className="px-8 sm:px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl border border-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                  Know Your Timeline?
                </button>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 mt-6 sm:mt-8">No retainer. No upfront fees. Pay only when you hire.</p>
            </div>
          </div>
        </section>

        <footer className="mt-12 sm:mt-16 w-full max-w-[1200px] px-4">
          <div className="glass-card py-3 sm:py-4 px-6 sm:px-10 rounded-full border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[8px] sm:text-[9px] text-gray-500 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
            <span className="opacity-60 text-center md:text-left">Global Talent Infrastructure</span>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
              <Link href="/hiring-manager-live" className="hover:text-cyan-400 transition-colors whitespace-nowrap">Fill Role Now</Link>
              <Link href="/hiring-manager-strategic" className="hover:text-fuchsia-400 transition-colors whitespace-nowrap">Build Pipeline</Link>
              <Link href="/account-management" className="hover:text-white transition-colors">Enterprise</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* How Does It Work Modal */}
      {howItWorksFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm" onClick={() => setHowItWorksFormOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg p-8 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border-fuchsia-400/20 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHowItWorksFormOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3 sm:mb-4">How Does It Work?</h2>
            <p className="text-gray-400 text-sm mb-6 sm:mb-8">
              We'll send you a short video explainer showing exactly how RecX Direct works and how it helps you hire faster with one simple fee.
            </p>

            {howItWorksSuccess ? (
              <div className="py-16 sm:py-20 text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Video on its way!</h3>
                <p className="text-gray-400 text-sm">Check your email for the explainer.</p>
              </div>
            ) : (
              <form onSubmit={handleHowItWorksSubmit} className="space-y-5 sm:space-y-6">
                <div>
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-gray-400 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={howItWorksName}
                    onChange={(e) => setHowItWorksName(e.target.value)}
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-white text-sm outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={howItWorksEmail}
                    onChange={(e) => setHowItWorksEmail(e.target.value)}
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-white text-sm outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={howItWorksPhone}
                    onChange={(e) => setHowItWorksPhone(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-white text-sm outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="+44 20 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-gray-400 mb-2">Company</label>
                  <input
                    type="text"
                    value={howItWorksCompany}
                    onChange={(e) => setHowItWorksCompany(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-white text-sm outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="Acme Corp"
                  />
                </div>

                <button
                  type="submit"
                  disabled={howItWorksSubmitting}
                  className="relative w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">
                    {howItWorksSubmitting ? 'Sending...' : 'Send Video Explainer'}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </main>
  );
}
