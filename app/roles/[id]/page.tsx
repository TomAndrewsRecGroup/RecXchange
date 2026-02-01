"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function IndividualRoleView() {
  const params = useParams();
  
  // Mock data for the dynamic route
  const role = {
    title: "Principal AI Engineer",
    id: params.id || "RAI-992",
    type: "RecX Direct",
    loc: "London, UK (Hybrid)",
    salary: "£140,000 - £160,000",
    split: "£14,000",
    industry: "Artificial Intelligence / Fintech",
    posted: "2 hours ago",
    description: "Seeking a lead-level AI Engineer to build out the core inference engine for a Tier-1 Fintech platform. You will work directly with the CTO to scale LLM deployments across global infrastructure.",
    requirements: [
      "8+ years in Software Engineering (Python/C++)",
      "Proven experience deploying LLMs in production environments",
      "Deep understanding of vector databases and RAG architectures",
      "Previous experience in high-growth Fintech or HFT is a plus"
    ]
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white">
      {/* Background Ambience */}
      <div className="fixed top-0 right-0 w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation & Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 flex items-center justify-between"
        >
          <Link href="/roles" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all">
               <span className="text-gray-400 group-hover:text-blue-400 transition-colors">←</span>
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.2em] text-gray-500 group-hover:text-white transition-colors">
              Return to Marketplace
            </span>
          </Link>
          
          <div className="text-[9px] font-black text-gray-600 uppercase tracking-widest">
            Protocol: {role.type} // {role.id}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr,1fr] gap-12 items-start">
          
          {/* Left Column: Role Intelligence */}
          <div className="space-y-8">
            <section className="glass-card p-10 md:p-14 rounded-[3.5rem] border-white/5 bg-gradient-to-br from-white/[0.02] to-transparent">
              <header className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-[9px] font-black uppercase px-4 py-1.5 rounded-lg border tracking-[0.2em] ${
                    role.type === 'RecX Direct' ? 'border-blue-500/30 text-blue-400 bg-blue-500/5' : 'border-purple-500/30 text-purple-400 bg-purple-500/5'
                  }`}>
                    {role.type}
                  </span>
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{role.posted}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{role.title}</h1>
                <p className="text-xl text-gray-400 font-medium">{role.loc} • <span className="text-blue-500/80">{role.industry}</span></p>
              </header>

              <div className="space-y-12 pt-12 border-t border-white/5">
                <div>
                  <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-6">Mission Brief</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{role.description}</p>
                </div>

                <div>
                  <h3 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-6">Technical Roles</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {role.requirements.map((req, i) => (
                      <li key={i} className="flex gap-4 text-sm text-gray-400 group">
                        <span className="text-blue-500 font-bold group-hover:scale-110 transition-transform">/</span> 
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Sub-Context: Collaboration logic */}
            <div className="px-10 py-8 glass-card rounded-[2.5rem] border-white/5 flex flex-col md:flex-row gap-8 items-center justify-between">
               <div className="max-w-md">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    This role is managed via the **RecX Direct** distribution channel. Candidate ownership is strictly enforced by timestamped submission.
                  </p>
               </div>
               <Link href="/deal-protection" className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors">
                 SFA Governance Policy →
               </Link>
            </div>
          </div>

          {/* Right Column: Commercial Execution */}
          <aside className="space-y-8 lg:sticky lg:top-32">
            
            {/* Primary Action Card */}
            <section className="glass-card p-10 rounded-[3rem] border-white/5 bg-black/60 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="mb-10">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] block mb-3">Split Reward</span>
                <span className="text-5xl font-bold gradient-text tabular-nums tracking-tighter">{role.split}</span>
                <p className="text-[10px] text-gray-600 mt-3 font-bold uppercase">Estimated per placement</p>
              </div>
              
              <div className="space-y-5 mb-10 pt-8 border-t border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Package</span>
                  <span className="text-xs text-white font-mono">{role.salary}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Role ID</span>
                  <span className="text-xs text-white font-mono">{role.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Visibility</span>
                  <span className="text-[10px] text-green-500 font-black uppercase">Marketplace Global</span>
                </div>
              </div>

              <a 
                href="https://app.recxchange.io" 
                target="_blank" 
                rel="noopener noreferrer"
                className="button-primary w-full block text-center py-5 shadow-2xl shadow-blue-900/40"
              >
                Engage Role
              </a>
              
              <p className="text-[9px] text-gray-600 text-center mt-6 leading-relaxed font-medium">
                Standard RecXchange Terms of Business apply. Engage to trigger the automated Split Fee Agreement.
              </p>
            </section>

            

            {/* Deal Protection Micro-Card */}
            <section className="glass-card p-8 rounded-3xl border-white/5 bg-gradient-to-br from-green-500/5 to-transparent">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Deal Protection Active</h4>
              </div>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-4">
                Your submissions are protected by the RX-Protocol. No backdoor hiring, no circumvention.
              </p>
              <Link href="/deal-protection" className="text-[9px] font-bold text-blue-400 uppercase tracking-widest hover:underline">
                View Rules of Engagement
              </Link>
            </section>

          </aside>
        </div>
      </div>
    </main>
  );
}
