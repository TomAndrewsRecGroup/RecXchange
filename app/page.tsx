'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function RootPage() {
  const router = useRouter();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    // Start shrinking animation after 2 seconds
    const shrinkTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 2000);

    // Show content 1 second after shrink starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(contentTimer);
    };
  }, []);

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/home');
    }, 400);
  };

  const handlePlatformClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      window.open('https://app.recxchange.io', '_blank', 'noopener,noreferrer');
      setIsNavigating(false);
    }, 400);
  };

  return (
    <main className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-16 overflow-x-hidden">
      {/* Logo Animation Section - starts large and central, shrinks to H1 */}
      <div className="relative w-full flex items-center justify-center" style={{ minHeight: animationComplete ? 'auto' : '100vh' }}>
        <motion.div
          initial={{ scale: 2.5, opacity: 1, y: 0 }}
          animate={animationComplete ? { 
            scale: 1, 
            opacity: 1,
            y: 0 
          } : { 
            scale: 2.5, 
            opacity: 1,
            y: 0
          }}
          transition={{ 
            duration: 1.5, 
            ease: 'easeOut'
          }}
          className="relative z-10 mb-8 sm:mb-12"
        >
          <Image
            src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w"
            alt="RecXchange"
            width={600}
            height={150}
            className="w-full max-w-3xl h-auto"
            style={{ filter: 'drop-shadow(0px 0px 12px rgba(59, 130, 246, 0.6))' }}
            priority
            unoptimized
          />
        </motion.div>
      </div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="text-white text-sm sm:text-base md:text-xl font-light tracking-wide text-center mb-12 sm:mb-16 max-w-5xl px-4"
      >
        The Recruiters Xchange: Live Roles from Live Clients and Live Candidates. One Login
      </motion.p>

      {/* Two Large CTAs - 1200px max width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto mb-16 sm:mb-20 md:mb-24"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Website CTA - Neon Blue */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWebsiteClick}
            className="group relative overflow-hidden p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 cursor-pointer min-h-[280px] sm:min-h-[320px] flex flex-col justify-between"
            style={{
              background: 'rgba(10, 10, 15, 0.6)',
              borderColor: 'rgba(59, 130, 246, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.5 }}
              style={{ background: 'rgba(59, 130, 246, 0.3)' }}
            />
            
            {/* Neon glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500 opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-6"
                style={{
                  background: 'rgba(59, 130, 246, 0.15)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                }}
              >
                <Sparkles className="w-3 h-3" />
                Website
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors mb-4"
                style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
              >
                Access RecXchange Website
              </h2>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Explore features, pricing, and how the Xchange Engine works.
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
              Continue to Website
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Platform CTA - Neon Purple */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlatformClick}
            className="group relative overflow-hidden p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border-2 cursor-pointer min-h-[280px] sm:min-h-[320px] flex flex-col justify-between"
            style={{
              background: 'rgba(10, 10, 15, 0.6)',
              borderColor: 'rgba(168, 85, 247, 0.5)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl sm:rounded-3xl"
              initial={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.5 }}
              style={{ background: 'rgba(168, 85, 247, 0.3)' }}
            />
            
            {/* Neon glow */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-6"
                style={{
                  background: 'rgba(168, 85, 247, 0.15)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                  boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                }}
              >
                <Sparkles className="w-3 h-3" />
                Live Platform
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold text-white group-hover:text-purple-400 transition-colors mb-4"
                style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
              >
                Access RecXchange Platform
              </h2>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Go straight to the live recruiter OS to work on roles and candidates.
              </p>
            </div>
            
            <div className="relative z-10 flex items-center gap-2 text-purple-400 font-bold text-sm uppercase tracking-wider mt-6 group-hover:gap-3 transition-all">
              Open Platform
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Combined What & Why Section - 1200px max width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
        transition={{ duration: 1.5, delay: 0.7 }}
        className="relative z-10 w-full max-w-[1200px] mx-auto space-y-12 sm:space-y-16"
      >
        
        {/* Combined Box */}
        <section className="p-8 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl"
          style={{
            background: 'rgba(10, 10, 15, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)'
          }}
        >
          {/* What is RecXchange */}
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-left">
              What is <span 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >RecXchange</span>?
            </h2>
            
            <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed text-left">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                  />
                  <span><strong className="text-white">15,000+ vetted recruiters</strong> worldwide competing to fill your roles and place your candidates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                  />
                  <span><strong className="text-white">$750,000+ in placement fees</strong> available right now across 100+ active roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                  />
                  <span><strong className="text-white">270M+ candidate profiles</strong> you can search and submit instantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                  />
                  <span><strong className="text-white">AI-powered Xchange Engine</strong> matches your roles and candidates to the right recruiters in seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                  />
                  <span><strong className="text-white">Average placement fee: $7,000</strong> — recruiters are making placements within 48 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-2"
                    style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                  />
                  <span><strong className="text-white">Automated contracts & fee splits</strong> — transparent, timestamped, protected</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12" />

          {/* Why RecXchange */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 text-left">
              Why <span 
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              >RecXchange</span>?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Feature 1 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-2"
                  style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }}
                />
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Fill Roles Faster</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Roles you've been stuck on for weeks get filled in 48 hours when 15,000 recruiters compete to help.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-2"
                  style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
                />
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Earn While You Sleep</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Your candidates get submitted to hundreds of roles automatically — make placements you never touched.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-2"
                  style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }}
                />
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Stop Losing to Competition</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    While you work alone, other recruiters are partnering and splitting $750K+ in active fees.
                  </p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-2"
                  style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
                />
                <div className="text-left">
                  <h3 className="text-white font-bold text-lg mb-2">Zero Risk, All Reward</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Start for $1. No upfront fees. Only pay when you earn. Recruiters are making $15K+ in their first month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Links */}
        <footer className="text-center pb-8">
          <p className="text-gray-500 text-xs sm:text-sm">
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">View Pricing</Link>
            {' • '}
            <Link href="/features" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Explore Features</Link>
            {' • '}
            <Link href="/faq" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">FAQ</Link>
            {' • '}
            <Link href="/contact" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">Contact Us</Link>
          </p>
        </footer>
      </motion.div>
    </main>
  );
}
