'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    // Start shrinking animation after 1.5 seconds
    const shrinkTimer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1500);

    // Show content 1 second after shrink starts
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 2500);

    // Hide chat widget on root page
    const chatWidget = document.querySelector('[data-chat-widget]');
    if (chatWidget) {
      (chatWidget as HTMLElement).style.display = 'none';
    }

    return () => {
      clearTimeout(shrinkTimer);
      clearTimeout(contentTimer);
      // Restore chat widget when leaving
      if (chatWidget) {
        (chatWidget as HTMLElement).style.display = '';
      }
    };
  }, []);

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/home');
    }, 600);
  };

  const handlePlatformClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      window.open('https://app.recxchange.io', '_blank', 'noopener,noreferrer');
      setIsNavigating(false);
    }, 600);
  };

  return (
    <>
      {/* Fade Overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-[200] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <main className="relative min-h-screen bg-black flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 overflow-x-hidden">
        <div className="w-full max-w-[1200px] mx-auto">
          {/* Logo Animation - REDUCED to 1.15x scale for 320px screens */}
          <motion.div
            initial={{ 
              scale: 1.15,
              opacity: 1,
              y: '25vh'
            }}
            animate={animationComplete ? { 
              scale: 1, 
              opacity: 1,
              y: 0
            } : { 
              scale: 1.15, 
              opacity: 1,
              y: '25vh'
            }}
            transition={{ 
              duration: 1.5, 
              ease: [0.43, 0.13, 0.23, 0.96]
            }}
            className="relative z-10 mb-6 sm:mb-8 md:mb-12 mx-auto w-full lg:w-fit px-4 sm:px-6 lg:px-0"
          >
            <Image
              src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png"
              alt="RecXchange"
              width={600}
              height={150}
              className="w-full lg:max-w-3xl h-auto"
              style={{ filter: 'drop-shadow(0px 0px 12px rgba(59, 130, 246, 0.6))' }}
              priority
              unoptimized
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-light tracking-wide text-center mb-8 sm:mb-12 md:mb-16 max-w-5xl mx-auto px-2 sm:px-4"
          >
            The Recruiters Xchange: Live Roles from Live Clients and Live Candidates. One Login
          </motion.p>

          {/* Two Large CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="relative z-10 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              
              {/* Website CTA - Neon Blue */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleWebsiteClick}
                className="group relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 cursor-pointer min-h-[240px] sm:min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
                style={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  borderColor: 'rgba(59, 130, 246, 0.5)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.5 }}
                  style={{ background: 'rgba(59, 130, 246, 0.3)' }}
                />
                
                {/* Neon glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500 opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-4 sm:mb-6"
                    style={{
                      background: 'rgba(59, 130, 246, 0.15)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Website
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors mb-3 sm:mb-4"
                    style={{ textShadow: '0 0 30px rgba(59, 130, 246, 0.5)' }}
                  >
                    Access RecXchange Website
                  </h2>
                  
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    Explore features, pricing, and how the Xchange Engine works.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 text-blue-400 font-bold text-xs sm:text-sm uppercase tracking-wider mt-4 sm:mt-6 group-hover:gap-3 transition-all">
                  Continue to Website
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>

              {/* Platform CTA - Neon Purple */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlatformClick}
                className="group relative overflow-hidden p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl border-2 cursor-pointer min-h-[240px] sm:min-h-[280px] md:min-h-[320px] flex flex-col justify-between"
                style={{
                  background: 'rgba(10, 10, 15, 0.6)',
                  borderColor: 'rgba(168, 85, 247, 0.5)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl sm:rounded-2xl lg:rounded-3xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 2, opacity: [0, 0.3, 0] }}
                  transition={{ duration: 0.5 }}
                  style={{ background: 'rgba(168, 85, 247, 0.3)' }}
                />
                
                {/* Neon glow */}
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500 opacity-20 blur-[100px] rounded-full group-hover:opacity-30 transition-opacity" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-4 sm:mb-6"
                    style={{
                      background: 'rgba(168, 85, 247, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      boxShadow: '0 0 20px rgba(168, 85, 247, 0.3)'
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    Live Platform
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white group-hover:text-purple-400 transition-colors mb-3 sm:mb-4"
                    style={{ textShadow: '0 0 30px rgba(168, 85, 247, 0.5)' }}
                  >
                    Access RecXchange Platform
                  </h2>
                  
                  <p className="text-gray-300 text-xs sm:text-sm md:text-base leading-relaxed">
                    Go straight to the live recruiter OS to work on roles and candidates.
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-2 text-purple-400 font-bold text-xs sm:text-sm uppercase tracking-wider mt-4 sm:mt-6 group-hover:gap-3 transition-all">
                  Open Platform
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Combined What & Why Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 30 }}
            transition={{ duration: 1.5, delay: 0.7 }}
            className="relative z-10 space-y-8 sm:space-y-12 md:space-y-16"
          >
            
            {/* Combined Box */}
            <section className="p-6 sm:p-8 md:p-10 lg:p-12 rounded-xl sm:rounded-2xl lg:rounded-3xl"
              style={{
                background: 'rgba(10, 10, 15, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)'
              }}
            >
              {/* What is RecXchange */}
              <div className="mb-8 sm:mb-10 md:mb-12">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 text-left leading-tight">
                  What is <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">RecXchange</span>?
                </h1>
                
                <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 text-left">
                  RecXchange is a global recruiter collaboration platform where recruitment professionals partner to fill roles and place candidates faster than working alone. When you post a role or upload a candidate, our AI-powered Xchange Engine instantly connects you with the right partners who have what you need.
                </p>

                <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-left">
                  <ul className="space-y-2.5 sm:space-y-3">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5 sm:mt-2"
                        style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                      />
                      <span><strong className="text-white">A global network of 15,000+ vetted recruiters</strong> working together across every industry and location.</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 sm:mt-2"
                        style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                      />
                      <span><strong className="text-white">Access to 270 million candidate profiles</strong> you can search and submit instantly.</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5 sm:mt-2"
                        style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                      />
                      <span><strong className="text-white">$750,000+ in live placement fees</strong> available right now across 100+ active roles in Technology, Finance, Healthcare, Engineering, and Sales.</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 sm:mt-2"
                        style={{ boxShadow: '0 0 10px rgba(168, 85, 247, 0.8)' }}
                      />
                      <span><strong className="text-white">Automated fee splits and contracts</strong> that handle payments transparently—50/50, 60/40, or up to 70% on premium RecX Direct roles.</span>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5 sm:mt-2"
                        style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
                      />
                      <span><strong className="text-white">AI-powered matching technology</strong> that connects your roles and candidates to relevant partners in seconds.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8 sm:mb-10 md:mb-12" />

              {/* Why RecXchange */}
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 text-left leading-tight">
                  Why Recruiters & Hiring Managers Choose <span 
                    className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                  >RecXchange</span>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  
                  {/* Benefit 1 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5 sm:mt-2"
                      style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }}
                    />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Fill Roles in 48 Hours, Not Weeks</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        When you post a role, thousands of partners compete to help you fill it. Roles that were stuck for months get filled in days.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 2 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 sm:mt-2"
                      style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
                    />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Make Money While You Sleep</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        Your candidates automatically get matched to hundreds of roles. Earn placements on opportunities you never personally touched.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 3 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0 mt-1.5 sm:mt-2"
                      style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.8)' }}
                    />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Access Thousands of Recruiters Instantly</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        Hiring managers post roles once and get immediate access to a global network competing to deliver the best candidates.
                      </p>
                    </div>
                  </div>

                  {/* Benefit 4 */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-1.5 sm:mt-2"
                      style={{ boxShadow: '0 0 15px rgba(168, 85, 247, 0.8)' }}
                    />
                    <div className="text-left">
                      <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Zero Risk, Instant ROI</h3>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        Start for $1/month with no upfront fees. Members make $15,000+ in their first month. The average placement fee is $7,000.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Bottom Links */}
            <footer className="text-center pb-6 sm:pb-8">
              <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm px-4">
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
        </div>
      </main>
    </>
  );
}
