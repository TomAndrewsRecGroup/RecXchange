"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecruiterFinalCTA() {
  return (
    // Reduced section vertical padding: py-16 → py-10
    <section className="mt-20 py-10 border-t border-cyan-400/10 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        // Reduced card padding: p-10 md:p-16 → p-6 md:p-10
        className="glass-card p-6 md:p-10 rounded-[3rem] border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/5 text-center relative overflow-hidden"
      >
        {/* Cyan Glow */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/10 blur-[120px] pointer-events-none" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-fuchsia-500/5 blur-[120px] pointer-events-none" />

        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
          Ready to plug into the network?
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto mb-8 text-lg leading-relaxed relative z-10">
          Join 15,000+ verified recruiters sharing roles, candidates, and split fees under one protected framework. Secure your seat in The Recruiters Xchange.
        </p>

        {/* Reduced button padding: px-10 py-5 → px-7 py-3 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <motion.a
            href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
          >
            Join RecXchange Now
          </motion.a>

          <Link href="/pricing">
            <motion.button
              whileHover={{ backgroundColor: "rgba(0,255,255,0.05)", borderColor: "rgba(0,255,255,0.3)" }}
              className="px-7 py-3 rounded-full border border-white/10 text-white font-bold text-sm transition-all"
            >
              Review Membership Tiers
            </motion.button>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-4 text-[10px] text-gray-500 uppercase tracking-[0.4em] font-bold"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
          Live Network Active
          <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
