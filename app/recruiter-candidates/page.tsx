"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import RecruiterFinalCTA from '@/components/RecruiterFinalCTA';

const mockCandidates = [
  { id: 1, name: "S. Chen", role: "Senior Backend Engineer", loc: "London", match: 94, skills: ["Go", "Kubernetes"] },
  { id: 2, name: "A. Murray", role: "Product Designer", loc: "Remote", match: 89, skills: ["Figma", "Design Systems"] },
  { id: 3, name: "J. Doe", role: "DevOps Architect", loc: "New York", match: 91, skills: ["AWS", "Terraform"] },
  { id: 4, name: "L. Zhang", role: "Fullstack Developer", loc: "Berlin", match: 87, skills: ["React", "Node.js"] },
];

export default function FillRolesPage() {
  const [feed, setFeed] = useState(mockCandidates);

  // Organic rotation effect for the live feed
  useEffect(() => {
    const interval = setInterval(() => {
      setFeed(prev => {
        const next = [...prev];
        const item = next.pop();
        if (item) next.unshift(item);
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative overflow-x-hidden text-white">
      
      {/* 1. Background Ambience */}
      <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="fixed bottom-0 left-0 w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 2. Header Section */}
        <header className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-label text-blue-400"
          >
            Recruiter Path — Fill Roles
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mt-6 leading-tight"
          >
            270M+ Profiles. <br/>
            <span className="gradient-text">Instant Match Accuracy.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg mt-8 leading-relaxed"
          >
            Bridge the gap between a signed mandate and a closed placement. Drop in your requirements and let our engine source, rank, and deliver the top 1% of the global talent pool.
          </motion.p>
        </header>

        {/* 3. Interactive Matching Workflow */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr,1fr] gap-12 items-start mb-24">
          
          {/* Left: Logic & Capabilities */}
          <div className="space-y-8">
            <div className="glass-card p-10 rounded-[3rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <h2 className="text-2xl font-bold mb-10">Intelligent Sourcing at Scale</h2>
              
              <div className="space-y-10">
                {[
                  { title: "Direct Distribution Engine", desc: "Sync your roles from any ATS to our global network, instantly notifying relevant talent and partner recruiters." },
                  { title: "Deep-Stack Filtering", desc: "Search beyond job titles. Filter by specific technical environments, past company prestige, and relocation intent." },
                  { title: "Automated Shortlisting", desc: "Our neural matching engine ranks candidates based on 'Placement Probability' so you only speak to the high-intent talent." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 pt-10 border-t border-white/5">
                <a href="https://app.recxchange.io/register" className="button-primary w-full block text-center py-5">
                  Access Sourcing Engine
                </a>
              </div>
            </div>

            
          </div>

          {/* Right: Live Sourcing Feed Simulation */}
          <div className="sticky top-32">
            <div className="glass-card p-8 rounded-[2.5rem] border-white/5 bg-black/40 relative overflow-hidden h-[640px]">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]" />
                  <span className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Global Sourcing Stream</span>
                </div>
                <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1 h-3 bg-blue-500/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />)}
                </div>
              </div>

              <div className="relative h-full">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {feed.map((c) => (
                      <motion.div
                        key={c.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, x: -20 }}
                        className="p-6 rounded-[1.5rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/40 transition-all cursor-default group"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">{c.name}</h5>
                            <p className="text-gray-500 text-[11px] font-medium tracking-wide">{c.role} • {c.loc}</p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] font-black text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-400/20 tabular-nums">
                              {c.match}% Match
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           {c.skills.map(skill => (
                             <span key={skill} className="text-[9px] text-gray-500 border border-white/5 px-2 py-0.5 rounded bg-white/[0.01]">
                               {skill}
                             </span>
                           ))}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {/* Fade effect to hide the overflow */}
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <RecruiterFinalCTA />
        
        {/* Footer Navigation Strip */}
        <footer className="mt-20 border-t border-white/5 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4 text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">
              <span>Protocol: RX-270M-V2</span>
              <span className="w-1 h-1 rounded-full bg-gray-800" />
              <span>Real-time Sync Active</span>
            </div>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <Link href="/deal-protection" className="hover:text-blue-400 transition-colors">Submit Rules</Link>
              <Link href="/pricing-and-splits" className="hover:text-purple-400 transition-colors">Split Math</Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
