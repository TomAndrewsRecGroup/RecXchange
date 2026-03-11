"use client";
import React, { useState, useEffect } from "react";
import { Database, Search, Zap, Cpu, Upload, Check, Globe } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

type EnginePhase = 'idle' | 'uploading' | 'matching' | 'result';

// Keep all existing job matching logic from original file
const JOB_TITLE_PATTERNS = [
  /\b(registered nurse|nurse practitioner|clinical nurse specialist)\b/gi,
  /\b(software engineer|senior software engineer|lead software engineer)\b/gi,
  /\b(data scientist|machine learning engineer)\b/gi,
];

const jobMappings: Record<string, string[]> = {
  'Senior Software Engineer': ['software', 'developer', 'programming', 'javascript', 'python'],
  'Data Scientist': ['data science', 'machine learning', 'ml', 'analytics'],
};

function FakeXchangeEngine() {
  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [matchScore, setMatchScore] = useState(0);
  const [splitFee, setSplitFee] = useState(0);
  const [jobTitle, setJobTitle] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    trackEvent('fake_engine_cv_uploaded', { page: '/recruiters-with-candidates' });
    setPhase('uploading');

    const randomScore = Math.floor(Math.random() * (97 - 85 + 1)) + 85;
    const randomFee = Math.floor(Math.random() * (9000 - 4500 + 1)) + 4500;
    const matchedJob = 'Senior Software Engineer';

    setMatchScore(randomScore);
    setSplitFee(randomFee);
    setJobTitle(matchedJob);

    setTimeout(() => setPhase('matching'), 800);
    setTimeout(() => setPhase('result'), 2800);
    e.target.value = '';
  };

  const resetEngine = () => {
    trackEvent('fake_engine_try_another_clicked', { page: '/recruiters-with-candidates' });
    setPhase('idle');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] xl:grid-cols-[1fr_400px_1fr] gap-6 sm:gap-8 lg:gap-6 items-start mb-16 sm:mb-20">
      {/* Left: Upload */}
      <HolographicCard color="purple" variant="content">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 gradient-text">Try the Xchange Engine</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          Upload a candidate CV and watch the AI find matching roles in real-time.
        </p>

        {phase !== 'result' ? (
          <div>
            <label className="block w-full cursor-pointer">
              <div className="relative w-full py-5 sm:py-6 px-6 sm:px-8 rounded-xl border-2 border-dashed border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all text-center group">
                <Upload size={28} className="mx-auto mb-2 sm:mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className="text-xs sm:text-sm font-bold text-white mb-1">Upload Candidate CV</p>
                <p className="text-[10px] sm:text-xs text-gray-500">PDF, DOC, DOCX, or TXT</p>
              </div>
              <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleFileUpload} className="hidden" disabled={phase !== 'idle'} />
            </label>

            {(phase === 'uploading' || phase === 'matching') && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg bg-purple-400/5 border border-purple-400/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" />
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
                    {phase === 'uploading' ? 'Extracting job title...' : 'Scanning 100+ roles...'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 sm:space-y-6">
            <HolographicCard color="emerald" variant="stat">
              <div className="flex items-start justify-between mb-4 gap-2">
                <div>
                  <StatusBadge label="MATCH FOUND" color="emerald" size="sm" />
                  <h4 className="text-lg sm:text-xl font-bold text-white mt-2">{jobTitle}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">RecX Direct Role</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-0.5">Match Score</p>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text">{matchScore}%</p>
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1.5">Estimated Split Fee</p>
                <p className="text-3xl sm:text-4xl font-bold gradient-text">${splitFee.toLocaleString()}</p>
              </div>
            </HolographicCard>

            <div className="flex gap-3">
              <button onClick={resetEngine} className="flex-1 py-3 px-4 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all">
                Try Another
              </button>
              <GlowButton variant="primary" size="sm" href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" className="flex-1">
                See Live Roles
              </GlowButton>
            </div>
          </motion.div>
        )}
      </HolographicCard>

      {/* Middle: Animated Core (LG+) */}
      <div className="hidden lg:flex relative items-center justify-center min-h-[400px]">
        <div className="relative w-56 h-56 xl:w-64 xl:h-64">
          <motion.div className="absolute inset-0 rounded-full border-4 border-transparent" style={{ borderTopColor: 'rgba(0, 255, 255, 0.4)', borderRightColor: 'rgba(0, 255, 255, 0.2)' }}
            animate={{ rotate: phase === 'matching' ? 360 : 0 }} transition={{ duration: phase === 'matching' ? 2 : 4, repeat: phase === 'matching' ? Infinity : 0, ease: 'linear' }} />
          <motion.div className="absolute inset-12 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_60px_rgba(0,255,255,0.3)]" animate={{ scale: phase === 'matching' ? [1, 1.1, 1] : 1 }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'idle' && <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-center"><Upload size={28} className="mx-auto mb-2" /><p className="text-[10px] font-bold uppercase tracking-widest">Ready</p></motion.div>}
                {phase === 'matching' && <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-white text-center"><Cpu size={28} className="mx-auto mb-2 animate-pulse" /><p className="text-[10px] font-bold uppercase tracking-widest">Matching</p></motion.div>}
                {phase === 'result' && <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-green-400 text-center"><Check size={36} className="mx-auto mb-2" strokeWidth={3} /><p className="text-[10px] font-bold uppercase tracking-widest">Match Found</p></motion.div>}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Database Utilization */}
      <HolographicCard color="cyan" variant="content">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Utilize Your Existing <span className="text-cyan-400">Database</span></h2>
        <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
          The Xchange Engine automatically analyzes your CVs to extract insights and matches candidates across multiple dimensions.
        </p>
        <ul className="space-y-3 sm:space-y-4">
          {["Semantic matching beyond keywords", "Continuous 24/7 scanning", "Instant notifications"].map((item, i) => (
            <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300"><Zap size={14} className="text-cyan-400 flex-shrink-0" />{item}</li>
          ))}
        </ul>
      </HolographicCard>
    </div>
  );
}

export default function RecruiterCandidatesPage() {
  useEffect(() => {
    trackEvent('page_viewed', { page: '/recruiters-with-candidates' });
  }, []);

  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16 md:mb-20 mt-6">
            <StatusBadge label="MONETIZE YOUR DATABASE" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              AI-Powered Candidate Matching
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Stop letting your goldmine of candidates gather dust. Share your database with the Xchange Engine and let our AI find the roles they were meant for.
            </p>
          </motion.header>

          <FakeXchangeEngine />

          {/* Trust Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20">
            <HolographicCard color="fuchsia" variant="feature">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="p-2 sm:p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 flex-shrink-0"><Cpu size={20} className="sm:w-6 sm:h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Multi-Dimensional Analysis</h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Our AI evaluates candidates based on location fit, experience alignment, and work model preferences.</p>
                </div>
              </div>
            </HolographicCard>
            <HolographicCard color="cyan" variant="feature">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-xl text-cyan-400 flex-shrink-0"><Zap size={20} className="sm:w-6 sm:h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Automated Discovery</h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">The engine re-calculates matches dynamically as new roles are added.</p>
                </div>
              </div>
            </HolographicCard>
          </div>

          {/* 270M Search Section */}
          <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
            <Globe className="mx-auto text-fuchsia-400 mb-6 sm:mb-8 opacity-50" size={48} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">No Candidates? <span className="gradient-text">No Problem.</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-2">
              If your internal database doesn't have the right fit, tap into our global AI search engine. Access over 270 million candidate profiles instantly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <GlowButton variant="primary" size="lg" href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}">
                <Search size={16} className="inline mr-2" /> Search 270M Candidates
              </GlowButton>
            </div>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
