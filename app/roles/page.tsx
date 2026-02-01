"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Mock Data Generation
const allRoles = [
  { id: 1, title: "Principal AI Engineer", loc: "London, UK", salary: "£140k", split: "£14,000", type: "RecX Direct", industry: "Tech", skill: "Python" },
  { id: 2, title: "Head of Talent", loc: "New York, US", salary: "$180k", split: "$18,000", type: "Shared", industry: "HR", skill: "Strategy" },
  { id: 3, title: "Quantitative Researcher", loc: "Singapore", salary: "$200k", split: "$25,000", type: "RecX Direct", industry: "Finance", skill: "C++" },
  { id: 4, title: "Senior DevOps Lead", loc: "Remote", salary: "£110k", split: "£11,000", type: "Shared", industry: "Tech", skill: "AWS" },
  { id: 5, title: "Marketing Director", loc: "Berlin, DE", salary: "€120k", split: "€15,000", type: "RecX Direct", industry: "Marketing", skill: "Growth" },
  { id: 6, title: "Cloud Architect", loc: "Austin, US", salary: "$160k", split: "$16,000", type: "Shared", industry: "Tech", skill: "Azure" },
  { id: 7, title: "Product Manager", loc: "London, UK", salary: "£90k", split: "£9,000", type: "RecX Direct", industry: "Product", skill: "Agile" },
  { id: 8, title: "Frontend Developer", loc: "Amsterdam, NL", salary: "€85k", split: "€8,500", type: "Shared", industry: "Tech", skill: "React" },
  { id: 9, title: "Data Scientist", loc: "Toronto, CA", salary: "$130k", split: "$13,000", type: "RecX Direct", industry: "Tech", skill: "ML" },
  { id: 10, title: "Legal Counsel", loc: "Dubai, UAE", salary: "$150k", split: "$20,000", type: "Shared", industry: "Legal", skill: "Corporate" },
];

export default function RolesMarketplace() {
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('All'); 
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRoles = useMemo(() => {
    return allRoles.filter(role => {
      const matchesType = filterType === 'All' || role.type === filterType;
      const query = searchQuery.toLowerCase();
      return matchesType && (
        role.title.toLowerCase().includes(query) || 
        role.skill.toLowerCase().includes(query) ||
        role.industry.toLowerCase().includes(query) ||
        role.loc.toLowerCase().includes(query)
      );
    });
  }, [filterType, searchQuery]);

  const itemsPerPage = 4;
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const paginatedRoles = filteredRoles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = {
    total: allRoles.length,
    direct: allRoles.filter(r => r.type === 'RecX Direct').length,
    shared: allRoles.filter(r => r.type === 'Shared').length
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 mesh-background relative text-white">
      <div className="max-w-6xl mx-auto relative z-10">
        
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
            <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Live Exchange Terminal</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The <span className="gradient-text">Role Marketplace</span>
          </h1>
          <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
            Access exclusive roles directly from the RecXchange platform or collaborate with verified partners globally.
          </p>
        </header>

        <div className="flex flex-col gap-6 mb-12">
          <section className="glass-card p-2 rounded-2xl border-white/5 flex items-center shadow-2xl">
            <div className="pl-6 text-gray-500">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Filter by title, skill, industry or location..." 
              className="bg-transparent border-none rounded-xl px-4 py-4 text-sm text-white outline-none w-full placeholder:text-gray-600 font-medium"
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
          </section>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Roles', count: stats.total, val: 'All' },
              { label: 'RecX Direct', count: stats.direct, val: 'RecX Direct' },
              { label: 'Shared', count: stats.shared, val: 'Shared' }
            ].map((btn) => (
              <button 
                key={btn.val}
                onClick={() => { setFilterType(btn.val); setPage(1); }}
                className={`px-6 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
                  filterType === btn.val 
                  ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' 
                  : 'border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300'
                }`}
              >
                {btn.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${filterType === btn.val ? 'bg-blue-500/20' : 'bg-white/5'}`}>
                  {btn.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[580px] content-start">
          <AnimatePresence mode="wait">
            {paginatedRoles.length > 0 ? (
              paginatedRoles.map((role) => (
                <motion.div
                  key={role.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="glass-card group p-8 rounded-[2.5rem] border-white/5 hover:border-blue-500/20 hover:bg-white/[0.03] transition-all flex flex-col justify-between relative overflow-visible"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      {/* --- TOOLTIP START --- */}
                      <div className="relative group/tooltip">
                        <span className={`cursor-help text-[9px] font-black uppercase px-3 py-1 rounded-lg border tracking-widest transition-all ${
                          role.type === 'RecX Direct' 
                          ? 'border-blue-500/30 text-blue-400 bg-blue-500/5 group-hover/tooltip:bg-blue-500/10' 
                          : 'border-purple-500/30 text-purple-400 bg-purple-500/5 group-hover/tooltip:bg-purple-500/10'
                        }`}>
                          {role.type}
                        </span>
                        
                        {/* Popup Panel */}
                        <div className="absolute bottom-full left-0 mb-3 w-64 p-4 rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none translate-y-2 group-hover/tooltip:translate-y-0">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1.5 text-white flex items-center gap-2">
                            <span className={`w-1 h-1 rounded-full ${role.type === 'RecX Direct' ? 'bg-blue-500' : 'bg-purple-500'}`} />
                            {role.type}
                          </p>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-medium normal-case tracking-normal">
                            {role.type === 'RecX Direct' 
                              ? "RecXchange owned live clients. Business Development is done for you—just bring the talent." 
                              : "Recruiter Xchange. Collaborate with other professional recruiters on their exclusive roles."
                            }
                          </p>
                          <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#0a0a0a] border-r border-b border-white/10 rotate-45" />
                        </div>
                      </div>
                      {/* --- TOOLTIP END --- */}
                      
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{role.loc}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{role.title}</h3>
                    <div className="flex gap-2 items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      <span>{role.industry}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-gray-400">{role.skill}</span>
                    </div>
                  </div>
                  
                  <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest block mb-1">Fee Share Projection</span>
                      <span className="text-2xl font-bold gradient-text tabular-nums">{role.split}</span>
                    </div>
                    <Link href={`/roles/${role.id}`} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:border-blue-500 transition-all">
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">No roles found matching your criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 border-t border-white/5 pt-10">
          <button 
            disabled={page === 1}
            onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 disabled:opacity-20 hover:text-white transition-all"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`w-8 h-8 rounded-lg border text-[10px] font-bold transition-all ${
                  page === i + 1 ? 'bg-blue-500 border-blue-400 text-white' : 'border-white/5 bg-white/5 text-gray-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            disabled={page >= totalPages}
            onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 disabled:opacity-20 hover:text-white transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
