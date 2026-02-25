"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HiringManagerStrategic() {
  return (
    <main className="relative min-h-screen flex flex-col items-center pt-32 pb-20 px-6 overflow-x-hidden">
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center">
        <header className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="block text-[10px] uppercase tracking-[0.4em] text-fuchsia-400/60 mb-6 font-bold">
              RecX Direct — Build Pipeline
            </span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight">
              Hiring in 3-6 months?
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Test the market now. Build your pipeline early.
            </p>
          </motion.div>
        </header>
      </div>
    </main>
  );
}
