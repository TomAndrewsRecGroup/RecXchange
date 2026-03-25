'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft } from 'lucide-react';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import SendRolesForm from '@/components/send-roles-form';

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
  const [liveStats, setLiveStats] = useState({ roleCount: 0, totalFees: 0, averageFee: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const [rolesRes, statsRes] = await Promise.all([
          fetch('/api/roles'),
          fetch('/api/live-stats'),
        ]);
        const rolesData: APIResponse = await rolesRes.json();
        const statsData = await statsRes.json();
        setRoles(rolesData.roles);
        setLiveStats(statsData);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [showModal]);

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

  const roleTypeCounts = useMemo(() => ({
    total: roles.length,
    direct: roles.filter(r => r.source === 'recx_direct').length,
    xchange: roles.filter(r => r.source === 'xchange').length
  }), [roles]);

  const formatSalary = (min: number, max: number, currency: string) => {
    const symbols: Record<string, string> = {
      'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
      'SGD': 'S$', 'AED': 'AED', 'INR': '₹', 'ZAR': 'R'
    };
    const sym = symbols[currency] || currency;
    const fmt = (n: number) => n >= 1000 ? `${Math.round(n / 1000)}k` : n.toString();
    return `${sym}${fmt(min)}–${fmt(max)}`;
  };

  const formatSplit = (amount: number, currency: string) => {
    const symbols: Record<string, string> = {
      'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
      'SGD': 'S$', 'AED': 'AED', 'INR': '₹', 'ZAR': 'R'
    };
    return `${symbols[currency] || currency}${amount.toLocaleString()}`;
  };

  const openModal = (role: Role) => { setSelectedRole(role); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setSelectedRole(null); };

  if (loading) {
    return (
      <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
        <FuturisticBackground variant="default" />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-14 h-14 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading live roles...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12 md:mb-16 mt-6">
            <StatusBadge label="LIVE ROLES · LIVE REVENUE" color="purple" />
            <h1
              className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}
            >
              One placement pays for 12 months
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Browse live roles. Submit candidates. Split fees 50/50, 60/40, or take 70% on RecX Direct placements.
            </p>
            <div className="mt-5 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-cyan-400/5 border border-cyan-400/20 text-cyan-400 font-bold uppercase tracking-widest">${liveStats.averageFee.toLocaleString()} avg fee</span>
              <span className="text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-fuchsia-400/5 border border-fuchsia-400/20 text-fuchsia-400 font-bold uppercase tracking-widest">${Math.round(liveStats.totalFees / 1000)}k fees available</span>
              <span className="hidden sm:inline-flex text-[9px] sm:text-[10px] px-2.5 py-1 rounded-full bg-purple-400/5 border border-purple-400/20 text-purple-400 font-bold uppercase tracking-widest">UK · USA · Europe · Africa · Middle East</span>
            </div>
          </motion.header>

          {/* CTA — matches RecruiterFinalCTA "Join RecXchange Now" style */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 sm:mb-12">
            <HolographicCard color="purple" variant="content" glowIntensity="high">
              <div className="text-center">
                <p className="text-xs sm:text-sm md:text-base text-gray-300 mb-4 font-medium px-2">
                  Ready to access these roles? <span className="text-purple-400 font-bold">Join RecXchange</span> and start submitting candidates today.
                </p>
                <motion.a
                  href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
                >
                  Get Started Now
                </motion.a>
              </div>
            </HolographicCard>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-12">
            <HolographicCard color="cyan" variant="stat">
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Live Roles</p>
              <p className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{liveStats.roleCount.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">
                <span className="text-cyan-400 font-bold">{roleTypeCounts.direct}</span> RecX Direct · <span className="text-fuchsia-400 font-bold">{roleTypeCounts.xchange}</span> Xchange
              </p>
            </HolographicCard>
            <HolographicCard color="fuchsia" variant="stat">
              <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Total Fee Pool</p>
              <p className="text-4xl sm:text-5xl font-bold gradient-text mb-2">${liveStats.totalFees.toLocaleString()}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Available across all live roles</p>
            </HolographicCard>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col gap-4 sm:gap-5 mb-8 sm:mb-12">
            <div className="relative">
              <HolographicCard color="purple" variant="feature" className="!p-0">
                <div className="flex items-center px-4 py-3">
                  <Search size={18} className="text-gray-500 mr-3 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Filter by title, industry, location..."
                    className="bg-transparent border-none text-sm text-white outline-none w-full placeholder:text-gray-600"
                    onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                  />
                </div>
              </HolographicCard>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'All Roles', count: roleTypeCounts.total, val: 'All' },
                { label: 'RecX Direct', count: roleTypeCounts.direct, val: 'RecX Direct' },
                { label: 'Xchange', count: roleTypeCounts.xchange, val: 'Xchange' }
              ].map((btn) => (
                <button
                  key={btn.val}
                  onClick={() => { setFilterType(btn.val); setPage(1); }}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl border text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                    filterType === btn.val
                      ? 'border-purple-400/40 bg-purple-400/10 text-purple-400'
                      : 'border-white/10 bg-white/[0.02] text-gray-500 hover:text-gray-300'
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

          {/* Roles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 min-h-[580px] content-start mb-10 sm:mb-12">
            <AnimatePresence mode="wait">
              {paginatedRoles.length > 0 ? (
                paginatedRoles.map((role) => (
                  <motion.div key={role.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Full card is a button — opens modal on click anywhere */}
                    <button
                      type="button"
                      onClick={() => openModal(role)}
                      className="w-full h-full text-left cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl"
                    >
                      <HolographicCard
                        color={role.source === 'recx_direct' ? 'cyan' : 'fuchsia'}
                        variant="feature"
                        className="h-full flex flex-col justify-between transition-transform duration-200 group-hover:scale-[1.01] group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                      >
                        <div>
                          <div className="flex justify-between items-center mb-4 gap-2">
                            <StatusBadge
                              label={role.source === 'recx_direct' ? 'RECX DIRECT' : 'XCHANGE'}
                              color={role.source === 'recx_direct' ? 'cyan' : 'fuchsia'}
                              size="sm"
                            />
                            <span className="text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest truncate">{role.location}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white leading-tight">{role.title}</h3>
                          <div className="flex flex-wrap gap-1.5 items-center text-[9px] sm:text-[10px] text-gray-500 font-bold mb-2">
                            <span className="truncate">{role.company}</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-gray-400 truncate">{role.industry}</span>
                          </div>
                          <p className="text-[10px] text-gray-600 capitalize">{role.workModel} · {role.seniorityLevel} · {role.roleType}</p>
                        </div>
                        <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-end gap-3">
                          <div>
                            <span className="text-[8px] text-gray-600 uppercase font-black tracking-widest block mb-1">Fee Share</span>
                            <span className="text-xl font-bold gradient-text">
                              {role.splitAmount && role.splitCurrency ? formatSplit(role.splitAmount, role.splitCurrency) : 'TBD'}
                            </span>
                          </div>
                          {/* Visual affordance — not a separate click target */}
                          <span className="text-[9px] font-black uppercase tracking-widest text-purple-400 group-hover:text-cyan-400 transition-colors">
                            View →
                          </span>
                        </div>
                      </HolographicCard>
                    </button>
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
            <div className="flex items-center justify-center gap-6 pt-8 border-t border-white/10">
              <button
                disabled={page === 1}
                onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-[10px] font-black uppercase tracking-widest text-gray-500 disabled:opacity-20 hover:text-purple-400 transition-all"
              >
                ← Previous
              </button>
              <div className="flex gap-2 flex-wrap justify-center">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all ${
                      page === i + 1
                        ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white'
                        : 'bg-white/5 text-gray-500 hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                disabled={page >= totalPages}
                onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-[10px] font-black uppercase tracking-widest text-gray-500 disabled:opacity-20 hover:text-purple-400 transition-all"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Role Modal */}
      <AnimatePresence>
        {showModal && selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md px-4 py-6 overflow-y-auto"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full my-auto"
            >
              <HolographicCard color="purple" variant="content" className="relative">
                <button
                  onClick={closeModal}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-5 group"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  Back
                </button>
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <StatusBadge
                      label={selectedRole.source === 'recx_direct' ? 'RECX DIRECT' : 'XCHANGE'}
                      color={selectedRole.source === 'recx_direct' ? 'cyan' : 'fuchsia'}
                      size="sm"
                    />
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{selectedRole.location}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">{selectedRole.title}</h2>
                  <div className="flex flex-wrap gap-2 items-center text-xs text-gray-500 font-bold mb-4">
                    <span>{selectedRole.company}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span>{selectedRole.industry}</span>
                    <span className="w-1 h-1 rounded-full bg-white/10" />
                    <span className="capitalize">{selectedRole.workModel}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <HolographicCard color="cyan" variant="stat">
                      <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Salary Range</p>
                      <p className="text-lg font-bold text-white">{formatSalary(selectedRole.salaryMin, selectedRole.salaryMax, selectedRole.salaryCurrency)}</p>
                    </HolographicCard>
                    <HolographicCard color="fuchsia" variant="stat">
                      <p className="text-[9px] text-gray-600 uppercase font-black tracking-widest mb-1">Your Split</p>
                      <p className="text-lg font-bold gradient-text">
                        {selectedRole.splitAmount && selectedRole.splitCurrency ? formatSplit(selectedRole.splitAmount, selectedRole.splitCurrency) : 'TBD'}
                      </p>
                    </HolographicCard>
                  </div>
                  <div className="bg-black/40 p-6 rounded-2xl border border-white/5 mb-6">
                    <h3 className="text-sm font-bold text-white mb-3">Role Overview</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{selectedRole.descriptionSnippet}</p>
                  </div>
                  <div className="space-y-2 text-xs text-gray-500 mb-6">
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-purple-400 rounded-full" /><strong>Seniority:</strong> {selectedRole.seniorityLevel}</div>
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-purple-400 rounded-full" /><strong>Type:</strong> {selectedRole.roleType}</div>
                    <div className="flex items-center gap-2"><span className="w-1 h-1 bg-purple-400 rounded-full" /><strong>Posted:</strong> {new Date(selectedRole.postedAt).toLocaleDateString()}</div>
                  </div>
                </div>
                {/* CTA — same gradient pill style as header "Get Started Now" */}
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <motion.a
                      href="https://app.recxchange.io?trigger_link=Hc9mpfL0JxjX06kwNpd1"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={closeModal}
                      className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all"
                    >
                      Work This Role
                    </motion.a>
                  </div>
                  <div className="flex justify-center">
                    <SendRolesForm />
                  </div>
                  <p className="text-[10px] text-gray-600 text-center">Sign up to submit candidates and access full role details</p>
                </div>
              </HolographicCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
