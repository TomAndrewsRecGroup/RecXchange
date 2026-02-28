'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function RootPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-x-hidden">
      {/* Logo Section - Static for now, will animate in Phase 3 */}
      <div className="relative z-10 mb-12 sm:mb-16 md:mb-20">
        <div className="text-center">
          {/* RecXchange Logo - placeholder for now */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gradient-text mb-4 tracking-tight">
            RecXchange
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg font-medium tracking-wide">
            The Recruiter Xchange — global recruiter OS and collaboration network.
          </p>
        </div>
      </div>

      {/* Two Large CTAs */}
      <div className="relative z-10 w-full max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
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
      </div>

      {/* Content Sections Below */}
      <div className="relative z-10 w-full max-w-4xl mx-auto space-y-12 sm:space-y-16">
        
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
      </div>
    </main>
  );
}
