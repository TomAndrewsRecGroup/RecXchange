"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DealProtection() {
  const steps = [
    { label: "Role Uploaded", status: "Agreed" },
    { label: "Candidate Submitted", status: "Linked" },
    { label: "Shortlisted", status: "Placed" }
  ];

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative">
      {/* Background Overlays */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[40%] h-[40%] bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-purple-500/5 blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <header className="mb-12">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Trust Layer — Deal Protection</span>
          <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 leading-tight">
            Every submission has a timestamp, a trail, and an agreement behind it.
          </h1>
          <div className="pulse-underline mt-6 ml-0" />
          <p className="text-gray-400 text-lg mt-6 max-w-2xl">
            We log who shared what, when they shared it, and under which terms—so placements feel secure, not fragile.
          </p>
        </header>

        <div className="flex flex-col gap-8 pb-16">
          {/* Block 1 - Timeline */}
          <section className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Submission timeline — every move is recorded.</h2>
            <p className="text-sm text-gray-400 mb-8 max-w-xl">
              Candidate and role submissions are linked to the originating account, creating an immutable sequence of introduction.
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 p-6 rounded-2xl border border-white/5">
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-[10px] font-bold gradient-text uppercase tracking-tighter">Step 0{i+1}</span>
                    <span className="text-xs font-semibold text-white">{step.label}</span>
                    <span className="text-[9px] text-gray-500 italic">{step.status}</span>
                  </div>
                  {i < 2 && <div className="hidden md:block h-[1px] w-12 bg-white/10" />}
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* Block 2 - Agreements */}
          <section className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Agreement-First Collaboration</h2>
            <p className="text-sm text-gray-400 mb-6">Commercial terms are confirmed via a standardized framework before any data is exchanged.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["Clear fees & splits", "Standardized language", "One source of truth"].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-[11px] font-medium text-gray-300">
                  {item}
                </div>
              ))}
            </div>
            <Link href="/legal-hub" className="text-blue-400 text-[11px] font-bold mt-6 inline-block hover:underline">
              View the 2026 Split Fee Agreement →
            </Link>
          </section>

          {/* Block 3 - Plain English */}
          <section className="glass-card p-8 rounded-[2rem] border-white/5">
            <h2 className="text-xl font-bold text-white mb-4">Protections in Plain English</h2>
            <p className="text-sm text-gray-400 mb-6">Authorship is recognized. Visibility is shared. Disputes are resolved via the framework.</p>
            <div className="flex flex-wrap gap-3">
              {["Clear Authorship", "Shared Visibility", "Agreed Resolution"].map((text, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  {text}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Root Footer */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <div className="glass-card py-4 px-8 rounded-2xl border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500">
          <p>Deal Protection underpins every branch of RecXchange.</p>
          <div className="flex gap-6">
            <Link href="/recruiter-roles" className="hover:text-blue-400 font-bold uppercase">Roles Flow</Link>
            <Link href="/pricing-and-splits" className="hover:text-purple-400 font-bold uppercase">Pricing & Splits</Link>
            <Link href="/legal-hub" className="hover:text-white font-bold uppercase">Legal Hub</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
