import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Live Recruitment Roles | RecXchange - Browse 1000s of Split Fee Opportunities",
  description: "Browse live recruitment roles from 15,000+ recruiters. Submit candidates and split fees 50/50, 60/40, or take 70% on RecX Direct placements. £14,000 average fee share. One placement pays for 12 months membership.",
  keywords: [
    "recruitment roles",
    "live recruitment jobs",
    "split fee roles",
    "recruiter marketplace",
    "collaborative recruitment roles",
    "RecX Direct roles",
    "recruitment job board",
    "fee share opportunities"
  ],
  openGraph: {
    title: "Live Recruitment Roles | RecXchange",
    description: "Browse 1000s of live roles. Submit candidates. Split fees automatically. £14,000 average fee share.",
    url: "https://recxchange.io/roles",
    type: "website"
  },
  alternates: {
    canonical: "https://recxchange.io/roles"
  }
};

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
    <main className="min-h-screen pt-32 pb-20 px-6 relative text-white" style={{
      backgroundColor: '#050508',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 255, 0.15) 0px, transparent 50%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-6xl mx-auto relative z-10">

        {/* Hero Header */}
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="block text-[10px] uppercase tracking-[0.4em] text-purple-400/60 mb-6 font-bold">
              Live Roles · Live Revenue
            </span>
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight">
              One placement pays for 12 months
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Browse live roles. Submit candidates. Split fees 50/50, 60/40, or take 70% on RecX Direct placements.
            </p>
          </motion.div>
        </header>

        <div className="flex flex-col gap-6 mb-12">
          <section className="glass-card p-2 rounded-2xl border-purple-400/10 flex items-center shadow-2xl">
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
                    ? 'border-purple-400/40 bg-purple-400/10 text-purple-400'
                    : 'border-white/5 bg-white/[0.02] text-gray-500 hover:text-gray-300'
                }`}
              >
                {btn.label}
                <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${filterType === btn.val ? 'bg-purple-400/20' : 'bg-white/5'}`}>
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
                  className="glass-card group p-8 rounded-[2.5rem] border-white/5 hover:border-purple-400/20 hover:bg-purple-400/[0.02] transition-all flex flex-col justify-between relative overflow-visible"
                >
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div className="relative group/tooltip">
                        <span className={`cursor-help text-[9px] font-black uppercase px-3 py-1 rounded-lg border tracking-widest transition-all ${
                          role.type === 'RecX Direct'
                            ? 'border-cyan-400/30 text-cyan-400 bg-cyan-400/5 group-hover/tooltip:bg-cyan-400/10'
                            : 'border-fuchsia-400/30 text-fuchsia-400 bg-fuchsia-400/5 group-hover/tooltip:bg-fuchsia-400/10'
                        }`}>
                          {role.type}
                        </span>
                        <div className="absolute bottom-full left-0 mb-3 w-64 p-4 rounded-2xl bg-[#0a0a0a] border border-purple-400/10 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none translate-y-2 group-hover/tooltip:translate-y-0">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1.5 text-white flex items-center gap-2">
                            <span className={`w-1 h-1 rounded-full ${role.type === 'RecX Direct' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
                            {role.type}
                          </p>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-medium normal-case tracking-normal">
                            {role.type === 'RecX Direct'
                              ? "RecXchange owned live clients. Business Development is done for you—just bring the talent."
                              : "Recruiter Xchange. Collaborate with other professional recruiters on their exclusive roles."
                            }
                          </p>
                          <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#0a0a0a] border-r border-b border-purple-400/10 rotate-45" />
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{role.loc}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white transition-colors">{role.title}</h3>
                    <div className="flex gap-2 items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                      <span>{role.industry}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-gray-400">{role.skill}</span>
                    </div>
                  </div>

                  <div className="mt-10 pt-6 border-t border-purple-400/10 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest block mb-1">Fee Share Projection</span>
                      <span className="text-2xl font-bold gradient-text tabular-nums">{role.split}</span>
                    </div>
                    <Link 
                      href={`/roles/${role.id}`} 
                      className="relative inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative z-10 text-white flex items-center">View Details</span>
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

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-center gap-8 border-t border-purple-400/10 pt-10">
          <button
            disabled={page === 1}
            onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 disabled:opacity-20 hover:text-purple-400 transition-all"
          >
            ← Previous
          </button>
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className={`relative w-8 h-8 rounded-lg border overflow-hidden text-[10px] font-bold transition-all ${
                  page === i + 1
                    ? 'border-white/15 bg-black/40'
                    : 'border-white/5 bg-white/5 text-gray-500 hover:border-purple-400/30'
                }`}
              >
                {page === i + 1 ? (
                  <>
                    <span className="absolute inset-[1px] rounded-lg bg-black/80" />
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500" />
                    <span className="relative z-10 text-white flex items-center justify-center h-full">{i + 1}</span>
                  </>
                ) : (
                  <span className="flex items-center justify-center h-full">{i + 1}</span>
                )}
              </button>
            ))}
          </div>
          <button
            disabled={page >= totalPages}
            onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 disabled:opacity-20 hover:text-purple-400 transition-all"
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}
