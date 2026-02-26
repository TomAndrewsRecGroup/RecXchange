'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Role {
  id: string;
  source: 'recx_direct' | 'xchange';
  title: string;
  descriptionSnippet: string;
  company: string;
  location: string;
  workModel: 'remote' | 'hybrid' | 'onsite';
  industry: string;
  seniorityLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  roleType: string;
  postedAt: string;
  splitAmount?: number;
  splitCurrency?: string;
}

interface APIResponse {
  total: number;
  lastUpdated: string;
  roles: Role[];
}

export default function RolesMarketplace() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterType, setFilterType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  // Fetch roles from API
  useEffect(() => {
    async function fetchRoles() {
      try {
        const response = await fetch('/api/roles');
        const data: APIResponse = await response.json();
        setRoles(data.roles);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRoles();
  }, []);

  const filteredRoles = useMemo(() => {
    return roles.filter(role => {
      const matchesType = filterType === 'All' || 
        (filterType === 'RecX Direct' && role.source === 'recx_direct') ||
        (filterType === 'Xchange' && role.source === 'xchange');
      const query = searchQuery.toLowerCase();
      return matchesType && (
        role.title.toLowerCase().includes(query) ||
        role.industry.toLowerCase().includes(query) ||
        role.location.toLowerCase().includes(query) ||
        role.company.toLowerCase().includes(query)
      );
    });
  }, [roles, filterType, searchQuery]);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const paginatedRoles = filteredRoles.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const stats = useMemo(() => {
    return {
      total: roles.length,
      direct: roles.filter(r => r.source === 'recx_direct').length,
      xchange: roles.filter(r => r.source === 'xchange').length
    };
  }, [roles]);

  // Calculate total fee pool from all split values (convert to USD for display)
  const totalFeePool = useMemo(() => {
    const CURRENCY_RATES: Record<string, number> = {
      'USD': 1, 'GBP': 1.27, 'EUR': 1.09, 'CAD': 0.72, 'AUD': 0.66,
      'SGD': 0.75, 'AED': 0.27, 'INR': 0.012, 'ZAR': 0.055
    };
    return roles.reduce((sum, role) => {
      if (role.splitAmount && role.splitCurrency) {
        const rate = CURRENCY_RATES[role.splitCurrency] || 1;
        return sum + (role.splitAmount * rate);
      }
      return sum;
    }, 0);
  }, [roles]);

  const formatSalary = (min: number, max: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
      'SGD': 'S$', 'AED': 'AED', 'INR': '₹', 'ZAR': 'R'
    };
    const symbol = currencySymbols[currency] || currency;
    const formatNum = (num: number) => num >= 1000 ? `${Math.round(num / 1000)}k` : num.toString();
    return `${symbol}${formatNum(min)}-${formatNum(max)}`;
  };

  const formatSplit = (amount: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
      'SGD': 'S$', 'AED': 'AED', 'INR': '₹', 'ZAR': 'R'
    };
    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <main className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center" style={{
        backgroundColor: '#050508',
        backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 255, 0.15) 0px, transparent 50%)',
        backgroundAttachment: 'fixed'
      }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Loading live roles...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20 px-6 relative text-white" style={{
      backgroundColor: '#050508',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(0, 255, 255, 0.15) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 0, 255, 0.15) 0px, transparent 50%)',
      backgroundAttachment: 'fixed'
    }}>
      <div className="max-w-[1200px] mx-auto relative z-10">

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
            <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
              One placement pays for 12 months
            </h1>
            <div className="pulse-underline mb-8 mx-auto" />
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Browse live roles. Submit candidates. Split fees 50/50, 60/40, or take 70% on RecX Direct placements.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-500">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">${Math.round(totalFeePool / roles.length).toLocaleString()} avg fee</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">${Math.round(totalFeePool / 1000)}k fees available</span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">UK · USA · Europe · Africa · Middle East · Australia</span>
            </div>
          </motion.div>
        </header>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card p-8 rounded-[2.5rem] border-purple-400/20 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/5 to-cyan-500/10 mb-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-fuchsia-500/5 blur-3xl" />
          <div className="relative z-10">
            <p className="text-sm md:text-base text-gray-300 mb-4 font-medium">
              Ready to access these roles? <span className="text-purple-400 font-bold">Join RecXchange</span> and start submitting candidates today.
            </p>
            <Link
              href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl border border-white/20 bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-black text-sm uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              Get Started Now
            </Link>
          </div>
        </motion.div>

        {/* Total Roles and Total Fee Pool Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8 rounded-[2.5rem] border-cyan-400/10 bg-gradient-to-r from-cyan-400/[0.03] to-transparent relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[60px]" />
            <div className="relative">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3">Total Live Roles</p>
              <p className="text-5xl font-bold gradient-text tabular-nums mb-2">{stats.total.toLocaleString()}</p>
              <p className="text-xs text-gray-500 font-medium">
                <span className="text-cyan-400 font-bold">{stats.direct}</span> RecX Direct · <span className="text-fuchsia-400 font-bold">{stats.xchange}</span> Xchange
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="glass-card p-8 rounded-[2.5rem] border-fuchsia-400/10 bg-gradient-to-r from-fuchsia-400/[0.03] to-transparent relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 blur-[60px]" />
            <div className="relative">
              <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3">Total Fee Pool</p>
              <p className="text-5xl font-bold gradient-text tabular-nums mb-2">${Math.round(totalFeePool).toLocaleString()}</p>
              <p className="text-xs text-gray-500 font-medium">Available across all live roles</p>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 mb-12">
          <section className="glass-card p-2 rounded-2xl border-purple-400/10 flex items-center shadow-2xl">
            <div className="pl-6 text-gray-500">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Filter by title, company, industry or location..."
              className="bg-transparent border-none rounded-xl px-4 py-4 text-sm text-white outline-none w-full placeholder:text-gray-600 font-medium"
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            />
          </section>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'All Roles', count: stats.total, val: 'All' },
              { label: 'RecX Direct', count: stats.direct, val: 'RecX Direct' },
              { label: 'Xchange', count: stats.xchange, val: 'Xchange' }
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
                          role.source === 'recx_direct'
                            ? 'border-cyan-400/30 text-cyan-400 bg-cyan-400/5 group-hover/tooltip:bg-cyan-400/10'
                            : 'border-fuchsia-400/30 text-fuchsia-400 bg-fuchsia-400/5 group-hover/tooltip:bg-fuchsia-400/10'
                        }`}>
                          {role.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'}
                        </span>
                        <div className="absolute bottom-full left-0 mb-3 w-64 p-4 rounded-2xl bg-[#0a0a0a] border border-purple-400/10 shadow-2xl opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-50 pointer-events-none translate-y-2 group-hover/tooltip:translate-y-0">
                          <p className="text-[10px] font-black uppercase tracking-widest mb-1.5 text-white flex items-center gap-2">
                            <span className={`w-1 h-1 rounded-full ${role.source === 'recx_direct' ? 'bg-cyan-400' : 'bg-fuchsia-400'}`} />
                            {role.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'}
                          </p>
                          <p className="text-[11px] text-gray-400 leading-relaxed font-medium normal-case tracking-normal">
                            {role.source === 'recx_direct'
                              ? "RecXchange owned live clients. Business Development is done for you—just bring the talent."
                              : "Recruiter Xchange. Collaborate with other professional recruiters on their exclusive roles."
                            }
                          </p>
                          <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#0a0a0a] border-r border-b border-purple-400/10 rotate-45" />
                        </div>
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{role.location}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white transition-colors">{role.title}</h3>
                    <div className="flex gap-2 items-center text-[10px] text-gray-500 font-bold uppercase tracking-tighter mb-3">
                      <span>{role.company}</span>
                      <span className="w-1 h-1 rounded-full bg-white/10" />
                      <span className="text-gray-400">{role.industry}</span>
                    </div>
                    <p className="text-xs text-gray-600 capitalize">{role.workModel} · {role.seniorityLevel} · {role.roleType}</p>
                  </div>

                  <div className="mt-10 pt-6 border-t border-purple-400/10 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] text-gray-600 uppercase font-black tracking-widest block mb-1">Fee Share Projection</span>
                      <span className="text-2xl font-bold gradient-text tabular-nums">
                        {role.splitAmount && role.splitCurrency ? formatSplit(role.splitAmount, role.splitCurrency) : 'TBD'}
                      </span>
                    </div>
                    <button 
                      onClick={() => { setSelectedRole(role); setShowModal(true); }}
                      className="relative inline-flex items-center justify-center px-6 py-3 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                      <span className="relative z-10 text-white flex items-center">View Details</span>
                    </button>
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
        {totalPages > 1 && (
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
        )}
      </div>

      {/* Role Detail Modal */}
      <AnimatePresence>
        {showModal && selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
            onClick={() => { setShowModal(false); setSelectedRole(null); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative glass-card p-10 rounded-[3rem] border-purple-400/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => { setShowModal(false); setSelectedRole(null); }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-lg border tracking-widest ${
                    selectedRole.source === 'recx_direct'
                      ? 'border-cyan-400/30 text-cyan-400 bg-cyan-400/5'
                      : 'border-fuchsia-400/30 text-fuchsia-400 bg-fuchsia-400/5'
                  }`}>
                    {selectedRole.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'}
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedRole.location}</span>
                </div>

                <h2 className="text-3xl font-bold gradient-text mb-3">{selectedRole.title}</h2>
                <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500 font-bold uppercase mb-4">
                  <span>{selectedRole.company}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span>{selectedRole.industry}</span>
                  <span className="w-1 h-1 rounded-full bg-white/10" />
                  <span className="capitalize">{selectedRole.workModel}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="glass-card p-4 rounded-xl border-white/5">
                    <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Salary Range</p>
                    <p className="text-lg font-bold text-white">{formatSalary(selectedRole.salaryMin, selectedRole.salaryMax, selectedRole.salaryCurrency)}</p>
                  </div>
                  <div className="glass-card p-4 rounded-xl border-white/5">
                    <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Your Split</p>
                    <p className="text-lg font-bold gradient-text">
                      {selectedRole.splitAmount && selectedRole.splitCurrency ? formatSplit(selectedRole.splitAmount, selectedRole.splitCurrency) : 'TBD'}
                    </p>
                  </div>
                </div>

                <div className="glass-card p-6 rounded-2xl border-white/5 mb-6">
                  <h3 className="text-sm font-bold text-white mb-3">Role Overview</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{selectedRole.descriptionSnippet}</p>
                </div>

                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full" />
                    <span className="capitalize"><strong>Seniority:</strong> {selectedRole.seniorityLevel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full" />
                    <span className="capitalize"><strong>Type:</strong> {selectedRole.roleType}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-purple-400 rounded-full" />
                    <span><strong>Posted:</strong> {new Date(selectedRole.postedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}"
                  onClick={() => { setShowModal(false); setSelectedRole(null); }}
                  className="relative w-full py-4 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all flex items-center justify-center"
                >
                  <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white">Work This Role</span>
                </Link>
                
                <p className="text-xs text-gray-600 text-center">Sign up to submit candidates and access full role details</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
