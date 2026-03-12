"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import dynamic from 'next/dynamic';

const InstantRoleModal = dynamic(() => import('@/components/InstantRoleModal'), { ssr: false });

export default function ManagerFinalCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {modalOpen && <InstantRoleModal onClose={() => setModalOpen(false)} />}

      <section className="mt-20 py-16 border-t border-cyan-400/10 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-10 md:p-16 rounded-[3rem] border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10 text-center relative overflow-hidden"
        >
          {/* Decorative Glow Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-500/10 blur-[100px] pointer-events-none" />

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">
            Design your hiring roadmap.
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto mb-10 text-lg leading-relaxed relative z-10">
            Speak directly with our leadership team to see how the RecXchange network can scale your internal talent function and reduce time-to-hire. Or drop your live role in now and we&apos;ll have specialist recruiters sourcing within the hour.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            {/* Primary — Calendly */}
            <motion.a
              href="https://calendly.com/recxchange-leadership/30min"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold text-base shadow-[0_0_25px_rgba(255,0,255,0.25)]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
              </svg>
              Schedule 30-Min Strategy Call
            </motion.a>

            {/* Secondary — Instant Support Modal */}
            <motion.button
              onClick={() => setModalOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-cyan-400/40 bg-cyan-500/10 text-cyan-300 font-bold text-base hover:bg-cyan-500/20 hover:border-cyan-400/70 transition-all shadow-[0_0_20px_rgba(0,240,255,0.1)]"
            >
              <Zap size={20} className="text-cyan-400" />
              Instant Support
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[10px] text-gray-500 mt-8 uppercase tracking-[0.3em] font-bold relative z-10"
          >
            No commitment. Just data, market mapping, and scale.
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
