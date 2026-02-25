"use client";
import React, { useState } from "react";
import { Database, Search, Zap, Cpu, Bell, Globe, Upload, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

type EnginePhase = 'idle' | 'uploading' | 'matching' | 'result';

const jobTitles = [
  'Senior Software Engineer',
  'Sales Director',
  'Talent Acquisition Lead',
  'Product Manager',
  'Data Scientist',
  'DevOps Engineer',
  'Marketing Director',
  'Chief Technology Officer'
];

function FakeXchangeEngine() {
  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [matchScore, setMatchScore] = useState(0);
  const [splitFee, setSplitFee] = useState(0);
  const [jobTitle, setJobTitle] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate random results
    const randomScore = Math.floor(Math.random() * (97 - 85 + 1)) + 85;
    const randomFee = Math.floor(Math.random() * (9000 - 4500 + 1)) + 4500;
    const randomJob = jobTitles[Math.floor(Math.random() * jobTitles.length)];

    setMatchScore(randomScore);
    setSplitFee(randomFee);
    setJobTitle(randomJob);

    // Start animation sequence
    setPhase('uploading');
    setTimeout(() => setPhase('matching'), 800);
    setTimeout(() => setPhase('result'), 2800);

    // Clear the input so same file can be uploaded again
    e.target.value = '';
  };

  const resetEngine = () => {
    setPhase('idle');
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
      {/* Left: Animated Core */}
      <div className="relative flex items-center justify-center min-h-[400px]">
        <div className="relative w-80 h-80">
          {/* Outer Ring 1 - Cyan - Rotates Clockwise */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: 'rgba(0, 255, 255, 0.4)',
              borderRightColor: 'rgba(0, 255, 255, 0.2)',
            }}
            animate={{
              rotate: phase === 'matching' ? 360 : 0,
            }}
            transition={{
              duration: phase === 'matching' ? 2 : 4,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'linear'
            }}
          />

          {/* Outer Ring 2 - Fuchsia - Rotates Counter-Clockwise */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-transparent"
            style={{
              borderBottomColor: 'rgba(199, 29, 241, 0.4)',
              borderLeftColor: 'rgba(199, 29, 241, 0.2)',
            }}
            animate={{
              rotate: phase === 'matching' ? -360 : 0,
            }}
            transition={{
              duration: phase === 'matching' ? 2.5 : 5,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'linear'
            }}
          />

          {/* Core - Gradient Sphere */}
          <motion.div
            className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_60px_rgba(0,255,255,0.3)]"
            animate={{
              scale: phase === 'matching' ? [1, 1.1, 1] : 1,
              boxShadow: phase === 'result' 
                ? '0 0 80px rgba(34, 197, 94, 0.6)' 
                : phase === 'matching'
                ? ['0 0 60px rgba(0,255,255,0.3)', '0 0 100px rgba(199,29,241,0.5)', '0 0 60px rgba(0,255,255,0.3)']
                : '0 0 60px rgba(0,255,255,0.3)'
            }}
            transition={{
              duration: phase === 'matching' ? 1 : 0.5,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'easeInOut'
            }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            
            {/* Status indicator in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <Upload size={32} className="mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Ready</p>
                  </motion.div>
                )}
                {phase === 'uploading' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Uploading</p>
                  </motion.div>
                )}
                {phase === 'matching' && (
                  <motion.div
                    key="matching"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <Cpu size={32} className="mx-auto mb-2 animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-widest">Matching</p>
                  </motion.div>
                )}
                {phase === 'result' && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-green-400 text-center"
                  >
                    <Check size={40} className="mx-auto mb-2" strokeWidth={3} />
                    <p className="text-xs font-bold uppercase tracking-widest">Match Found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Upload & Results */}
      <div className="glass-card p-10 rounded-[2.5rem] border-purple-400/10">
        <h3 className="text-2xl font-bold mb-6 gradient-text">Try the Xchange Engine</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Upload a candidate CV and watch the AI find matching roles in real-time. All data stays in your browser and is deleted immediately.
        </p>

        {phase !== 'result' ? (
          <div>
            <label className="block w-full cursor-pointer">
              <div className="relative w-full py-6 px-8 rounded-2xl border-2 border-dashed border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all text-center group">
                <Upload size={32} className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold text-white mb-1">Upload Candidate CV</p>
                <p className="text-xs text-gray-500">PDF, DOC, or DOCX (browser only, not stored)</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={phase !== 'idle'}
              />
            </label>

            {(phase === 'uploading' || phase === 'matching') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-purple-400/5 border border-purple-400/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <p className="text-xs text-gray-400 font-medium">
                    {phase === 'uploading' ? 'Processing candidate profile...' : 'Scanning 100+ live roles for matches...'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] text-green-400 font-black uppercase tracking-widest mb-2">Match Found</p>
                  <h4 className="text-2xl font-bold text-white mb-1">{jobTitle}</h4>
                  <p className="text-xs text-gray-500">RecX Direct Role</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Match Score</p>
                  <p className="text-3xl font-bold gradient-text tabular-nums">{matchScore}%</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Estimated Split Fee</p>
                <p className="text-4xl font-bold gradient-text tabular-nums">${splitFee.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetEngine}
                className="flex-1 py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all"
              >
                Try Another
              </button>
              <Link
                href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}"
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] text-white text-sm font-bold uppercase tracking-widest text-center transition-all"
              >
                See Live Roles
              </Link>
            </div>

            <p className="text-xs text-gray-600 text-center italic">
              Sign up to access real matching on 100+ live roles
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function RecruiterCandidatesPage() {
  return (
    <div className="w-full pb-20 pt-24 px-6 max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Monetize Your Database
          </span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
            AI-Powered Candidate Matching
          </h1>
          <div className="pulse-underline mb-8 mx-auto" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop letting your goldmine of candidates gather dust. Share your database with the Xchange Engine and let our AI find the roles they were meant for.
          </p>
        </motion.div>
      </div>

      {/* Fake Xchange Engine Demo */}
      <FakeXchangeEngine />

      {/* Main Feature: The Database Sync */}
      <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-32">
        <div className="glass-card p-12 rounded-[3rem] border-l-4 border-cyan-400/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database size={200} />
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Utilize Your Existing <span className="text-cyan-400">Database</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The Xchange Engine automatically analyzes your CVs and profiles to extract meaningful insights like skill compatibility, career trajectory, and industry relevance. It then matches these candidates across multiple dimensions to the best-suited roles on the platform.
            </p>
            <ul className="space-y-4">
              {[
                "Semantic matching beyond simple keywords",
                "Continuous 24/7 background scanning",
                "Instant notifications for high-quality role matches"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Zap size={16} className="text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual Proof: The Match Screenshot - Now Matching Height */}
        <div className="flex flex-col">
          <div className="relative group flex-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic">Xchange Engine — AI Match Analysis</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/20" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                  <div className="w-2 h-2 rounded-full bg-green-500/20" />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6">
                <img 
                  src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/Match.png" 
                  alt="System Match Interface" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity object-contain"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center italic leading-relaxed">
            A real Xchange Match between recruiters, pulled from our RecXchange Platform
          </p>
        </div>
      </div>

      {/* Trust Cards: Analysis & Discovery */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-fuchsia-400">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Multi-Dimensional Analysis</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Our AI evaluates candidates based on location fit, experience alignment, and work model preferences (remote/hybrid) to ensure every match is viable.
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-white">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Automated Discovery</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                The engine re-calculates matches dynamically as new roles are added, ensuring your candidates never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative: The 270M Candidate Search */}
      <div className="glass-card p-12 lg:p-20 rounded-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-400/5 to-transparent pointer-events-none" />
        <Globe className="mx-auto text-fuchsia-400 mb-8 opacity-50" size={64} />
        <h2 className="text-4xl font-bold mb-6">
          No Candidates? <span className="gradient-text">No Problem.</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          If your internal database doesn&apos;t have the right fit, tap into our global AI search engine. Access over 270 million candidate profiles instantly to find exactly who you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" 
            className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <Search size={18} /> Start AI Search
          </Link>
          <a 
            href="https://apollo.io" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all"
          >
            Our Data Provider
          </a>
        </div>
      </div>
    </div>
  );
}
