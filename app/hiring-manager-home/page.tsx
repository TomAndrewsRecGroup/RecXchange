'use client';
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

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

  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">

      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center">

        {/* Intro Context */}
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[10px] uppercase tracking-[0.4em] text-fuchsia-400/60 mb-6 font-bold">
              RecX Direct
            </span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
              Post your role for free.
            </h1>
            <div className="pulse-underline mb-8 mx-auto" />
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              15,000+ recruiters compete to fill it. You pay one fee when hired.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">15,000+ Recruiters</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">270M candidates</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">Engineering · Healthcare · Tech · HR · Sales · Finance</span>
            </div>
          </motion.div>
        </header>

        {/* Quick Actions */}
        <div className="w-full mb-16 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setHowItWorksFormOpen(true)}
            className="px-6 py-3 rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/5 text-fuchsia-400 text-xs font-bold uppercase tracking-widest hover:bg-fuchsia-400/10 transition-all"
          >
            How Does It Work?
          </button>
        </div>

        {/* Diagnostic Card */}
        <section className="glass-card w-full rounded-[3rem] p-10 md:p-14 border-fuchsia-400/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/5 blur-[100px] pointer-events-none" />

          <div className="inline-block px-4 py-1.5 rounded-full border border-fuchsia-400/20 bg-fuchsia-400/5 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400 mb-8">
            Select your priority
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 tracking-tight">
            Choose the path that matches your current timeline:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* URGENT SUPPORT */}
            <Link href="/hiring-manager-live" className="group block">
              <motion.div
                variants={panelVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                className="h-full border border-cyan-400/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center mb-6 text-cyan-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">Fill Role Now</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    You need someone hired this month. Post your role. Get shortlisted candidates in 48 hours. Pay one fee when you hire.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "Post once, 15,000+ recruiters see it",
                      "Set your fee upfront (12-20% standard)",
                      "First candidates submitted in 48 hours"
                    ].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Homepage-style button */}
                <div className="relative w-full mt-12 py-5 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all">
                  <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
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
                className="h-full border border-fuchsia-400/10 rounded-[2rem] p-8 flex flex-col justify-between bg-white/[0.01] transition-all"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-400/20 flex items-center justify-center mb-6 text-fuchsia-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-fuchsia-400 transition-colors">Build Pipeline</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    You're hiring in 3-6 months. Test the market now. See who's available. Build a pipeline before you officially recruit.
                  </p>
                  <ul className="space-y-4 mb-10">
                    {[
                      "See candidate availability before you post publicly",
                      "Engage candidates before your role goes live",
                      "Build talent pipeline for future hiring"
                    ].map((item, i) => (
                      <li key={i} className="text-[10px] text-gray-400 flex items-center gap-3 font-bold uppercase tracking-widest">
                        <span className="w-1 h-1 bg-fuchsia-400 rounded-full" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Homepage-style button */}
                <div className="relative w-full mt-12 py-5 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all">
                  <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">Start Market Mapping</span>
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="mt-14 pt-10 border-t border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-gray-500">
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
              Switch between models at any time.
            </p>
            <Link href="/account-management" className="text-fuchsia-400 hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center gap-2">
              Learn about Managed Services <span className="text-lg">→</span>
            </Link>
          </div>
        </section>

        <footer className="mt-16 w-full max-w-[1200px] px-4">
          <div className="glass-card py-4 px-10 rounded-full border-cyan-400/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-500 font-bold uppercase tracking-[0.2em]">
            <span className="opacity-60">Global Talent Infrastructure</span>
            <div className="flex gap-8">
              <Link href="/hiring-manager-live" className="hover:text-cyan-400 transition-colors">Fill Role Now</Link>
              <Link href="/hiring-manager-strategic" className="hover:text-fuchsia-400 transition-colors">Build Pipeline</Link>
              <Link href="/account-management" className="hover:text-white transition-colors">Enterprise</Link>
            </div>
          </div>
        </footer>
      </div>

      {/* How Does It Work Modal */}
      {howItWorksFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setHowItWorksFormOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-lg p-10 rounded-[2.5rem] border-fuchsia-400/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setHowItWorksFormOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold gradient-text mb-4">How Does It Work?</h2>
            <p className="text-gray-400 text-sm mb-8">
              We'll send you a short video explainer showing exactly how RecX Direct works and how it helps you hire faster with one simple fee.
            </p>

            {howItWorksSuccess ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all"
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
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={howItWorksPhone}
                    onChange={(e) => setHowItWorksPhone(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="+44 20 1234 5678"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Company</label>
                  <input
                    type="text"
                    value={howItWorksCompany}
                    onChange={(e) => setHowItWorksCompany(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all"
                    placeholder="Acme Corp"
                  />
                </div>

                <button
                  type="submit"
                  disabled={howItWorksSubmitting}
                  className="relative w-full py-4 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
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
