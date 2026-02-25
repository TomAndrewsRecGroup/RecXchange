"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerLive() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <header className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
              RecX Direct — Fill Role Now
            </span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
              Need someone hired fast?
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Post your role. Get shortlisted candidates in 48 hours.
            </p>
          </motion.div>
        </header>
      </div>
    </main>
  );
}
