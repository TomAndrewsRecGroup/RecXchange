'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RootPage() {
  const [showContent, setShowContent] = useState(false);
  const [logoPhase, setLogoPhase] = useState<'x' | 'full'>('x');

  useEffect(() => {
    // Phase 1: Show X for 600ms
    const xTimer = setTimeout(() => {
      setLogoPhase('full');
    }, 600);

    // Phase 2: After full logo shows (600ms + 500ms transition), reveal content
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 1200);

    return () => {
      clearTimeout(xTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-x-hidden">
      {/* Logo Animation Section */}
      <div className="relative z-10 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center">
          <div className="relative inline-block">
            <AnimatePresence mode="wait">
              {logoPhase === 'x' ? (
                <motion.img
                  key="x-logo"
                  src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/reccxchange%20x.png"
                  alt="RecXchange X"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto"
                />
              ) : (
                <motion.img
                  key="full-logo"
                  src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/recxchange%20-home.png"
                  alt="RecXchange"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-64 sm:w-80 md:w-96 lg:w-[500px] h-auto mx-auto"
                />
              )}
            </AnimatePresence>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-400 text-sm sm:text-base md:text-lg font-medium tracking-wide mt-4"
          >
            The Recruiter Xchange — global recruiter OS and collaboration network.
          </motion.p>
        </div>
      </div>

      {/* Two Large CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 w-full max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Website CTA */}
          <Link href="/home">
            <div className="glass-card p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-500 cursor-pointer group relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-500/10 blur-[60px] rounded-full group-hover:bg-cyan-500/20 transition-colors" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 text-[10px] font-bold uppercase tracking-widest text-cyan-400 mb-6">
                  <Sparkles className="w-3 h-3" />
                  Marketing Site
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-4">
                  Access RecXchange Website
                </h2>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Explore features, pricing, and how the Xchange Engine works.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center gap-2 text-cyan-400 font-bold text-sm uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
                Continue to Website
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Platform CTA */}
          <Link href="https://app.recxchange.io" target="_blank" rel="noopener noreferrer">
            <div className="glass-card p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-fuchsia-400/30 hover:border-fuchsia-400/60 transition-all duration-500 cursor-pointer group relative overflow-hidden min-h-[280px] sm:min-h-[320px] flex flex-col justify-between">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-fuchsia-500/10 blur-[60px] rounded-full group-hover:bg-fuchsia-500/20 transition-colors" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 text-[10px] font-bold uppercase tracking-widest text-fuchsia-400 mb-6">
                  <Sparkles className="w-3 h-3" />
                  Live Platform
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-fuchsia-400 transition-colors mb-4">
                  Access RecXchange Platform
                </h2>
                
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  Go straight to the live recruiter OS to work on roles and candidates.
                </p>
              </div>
              
              <div className="relative z-10 flex items-center gap-2 text-fuchsia-400 font-bold text-sm uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
                Open Platform
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Content Sections Below */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full max-w-4xl mx-auto space-y-12 sm:space-y-16"
      >
        
        {/* What is RecXchange? */}
        <section className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            What is <span className="gradient-text">RecXchange</span>?
          </h2>
          <div className="space-y-4 text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            <p>
              RecXchange is a <strong className="text-white">global recruiter operating system and collaboration network</strong> that connects 15,000+ recruiters worldwide.
            </p>
            <p>
              Powered by the <strong className="text-cyan-400">AI-driven Xchange Engine</strong>, RecXchange enables recruiters to share roles, candidates, and fees seamlessly. With access to <strong className="text-white">270M+ candidate profiles</strong>, recruiters can fill hard-to-reach positions while scaling their businesses through trusted deal-flow collaboration.
            </p>
            <p>
              Whether you're posting a role or sharing a candidate, RecXchange ensures <strong className="text-white">transparent fee-sharing</strong> and contract protection across every transaction.
            </p>
          </div>
        </section>

        {/* Why RecXchange? */}
        <section className="glass-card p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Why <span className="gradient-text">RecXchange</span>?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] flex-shrink-0 mt-2" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Global Collaboration</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Work with vetted recruiters worldwide, share roles, candidates, and fees.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(255,0,255,0.8)] flex-shrink-0 mt-2" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">All-in-One OS</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  ATS, CRM, sourcing, and Xchange Engine in one place — no more duct-taped tools.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.8)] flex-shrink-0 mt-2" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">AI-Powered Routing</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The Xchange Engine directs opportunities to the right recruiters in real time.
                </p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(255,0,255,0.8)] flex-shrink-0 mt-2" />
              <div>
                <h3 className="text-white font-bold text-lg mb-2">Built for Serious Recruiters</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Solo, boutique, or teams wanting scale without losing control.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Links */}
        <footer className="text-center pb-8">
          <p className="text-gray-500 text-xs sm:text-sm">
            <Link href="/pricing" className="text-cyan-400 hover:underline">View Pricing</Link>
            {' • '}
            <Link href="/features" className="text-cyan-400 hover:underline">Explore Features</Link>
            {' • '}
            <Link href="/faq" className="text-cyan-400 hover:underline">FAQ</Link>
            {' • '}
            <Link href="/contact" className="text-cyan-400 hover:underline">Contact Us</Link>
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
