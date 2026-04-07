"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Zap, Cpu, Check, Globe, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';

type EnginePhase = 'idle' | 'scanning' | 'result';

const ROLE_TEMPLATES = [
  { company: 'Global Staffing Partner', daysAgo: 2, feeMin: 5500, feeMax: 8000 },
  { company: 'Boutique Search Firm',    daysAgo: 5, feeMin: 6000, feeMax: 9500 },
  { company: 'Independent Recruiter',   daysAgo: 1, feeMin: 4500, feeMax: 7000 },
];

function generateRoleTitles(baseTitle: string): string[] {
  const t = baseTitle.trim();
  const lower = t.toLowerCase();
  const coreTitle = t.replace(/^(senior|lead|principal|junior|associate|staff|chief|head of|vp of|director of)\s+/i, '').trim();
  const variants: string[] = [];
  if (!lower.startsWith('senior')) { variants.push(`Senior ${coreTitle}`); } else { variants.push(`Lead ${coreTitle}`); }
  variants.push(t);
  if (lower.includes('engineer')) { variants.push(coreTitle.replace(/engineer$/i, 'Specialist')); }
  else if (lower.includes('manager')) { variants.push(coreTitle.replace(/manager$/i, 'Lead')); }
  else if (lower.includes('developer')) { variants.push(coreTitle.replace(/developer$/i, 'Engineer')); }
  else if (lower.includes('consultant')) { variants.push(`Associate ${coreTitle}`); }
  else if (lower.includes('analyst')) { variants.push(`Senior ${coreTitle} \u2013 Permanent`); }
  else if (lower.includes('director')) { variants.push(`VP of ${coreTitle.replace(/director( of)?/i, '').trim()}`); }
  else { variants.push(`Senior ${coreTitle} \u2013 Permanent`); }
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const v of variants) { const key = v.toLowerCase(); if (!seen.has(key)) { seen.add(key); unique.push(v); } }
  if (unique.length < 3) unique.push(`${coreTitle} \u2013 Permanent`);
  return unique.slice(0, 3);
}

function randomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ─── Orbital dots ─────────────────────────────────────────────────────────────
function OrbitalDots({ phase }: { phase: EnginePhase }) {
  const orbits = [
    { r: 88,  duration: 3.2, color: 'rgba(0,240,255,0.7)',  size: 4 },
    { r: 104, duration: 5.1, color: 'rgba(168,85,247,0.6)', size: 3 },
    { r: 76,  duration: 2.4, color: 'rgba(255,0,255,0.5)',  size: 3 },
    { r: 118, duration: 7.8, color: 'rgba(0,240,255,0.4)',  size: 2 },
  ];
  return (
    <>
      {orbits.map((o, i) => (
        <motion.div key={i} className="absolute"
          style={{ width: o.r * 2, height: o.r * 2, top: '50%', left: '50%', marginTop: -o.r, marginLeft: -o.r }}
          animate={{ rotate: 360 }}
          transition={{ duration: phase === 'scanning' ? o.duration * 0.45 : o.duration, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute rounded-full" style={{
            width: o.size, height: o.size, top: 0, left: '50%', marginLeft: -(o.size / 2),
            background: o.color, boxShadow: `0 0 ${o.size * 3}px ${o.color}`,
          }} />
        </motion.div>
      ))}
    </>
  );
}

// ─── Scan counter ─────────────────────────────────────────────────────────────
function ScanCounter({ phase }: { phase: EnginePhase }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const TARGET = 270000000;
  const DURATION = 2800;
  useEffect(() => {
    if (phase === 'scanning') {
      startRef.current = performance.now();
      const tick = (now: number) => {
        const elapsed = now - (startRef.current ?? now);
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * TARGET));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    } else if (phase === 'result') {
      setCount(TARGET);
    } else {
      setCount(0);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);
  if (phase === 'idle') return null;
  return (
    <motion.div className="absolute flex flex-col items-center" style={{ bottom: 28 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-600 mb-0.5">Profiles Scanned</p>
      <p className="text-sm font-black tabular-nums" style={{
        color: phase === 'result' ? 'rgb(52,211,153)' : 'rgb(0,240,255)',
        textShadow: phase === 'result' ? '0 0 10px rgba(52,211,153,0.6)' : '0 0 10px rgba(0,240,255,0.5)'
      }}>{count.toLocaleString()}</p>
    </motion.div>
  );
}

type Seg = { id: number; x1: number; y1: number; x2: number; y2: number; w: number; children: number[] };
type NPulse = { id: number; segId: number; t: number; color: string };

const CX = 100, CY = 100;

function branch(segs: Seg[], id: number, x1: number, y1: number, angle: number, length: number, width: number, depth: number) {
  if (depth === 0 || length < 3) return;
  const rad = (angle * Math.PI) / 180;
  const x2 = x1 + Math.cos(rad) * length;
  const y2 = y1 + Math.sin(rad) * length;
  const children: number[] = [];
  segs.push({ id, x1, y1, x2, y2, w: width, children });
  const numBranches = depth > 2 ? 2 : Math.random() > 0.4 ? 3 : 2;
  const spread = depth > 3 ? 18 : 30;
  for (let i = 0; i < numBranches; i++) {
    const childId = segs.length;
    children.push(childId);
    const angleOffset = (i - (numBranches - 1) / 2) * spread + (Math.random() - 0.5) * 12;
    branch(segs, childId, x2, y2, angle + angleOffset, length * (0.6 + Math.random() * 0.15), width * 0.6, depth - 1);
  }
}

function buildNeuronSegs(): Seg[] {
  const segs: Seg[] = [];
  const arms = 7;
  for (let i = 0; i < arms; i++) {
    const baseAngle = (360 / arms) * i - 90 + (Math.random() - 0.5) * 20;
    branch(segs, segs.length, CX, CY, baseAngle, 22 + Math.random() * 8, 2.2, 4);
  }
  return segs;
}

const NEURON_SEGS: Seg[] = buildNeuronSegs();
const ROOT_IDS = NEURON_SEGS
  .filter(s => Math.hypot(s.x1 - CX, s.y1 - CY) < 5)
  .map(s => s.id);

function NeuronCore({ phase }: { phase: EnginePhase }) {
  const [pulses, setPulses] = useState<NPulse[]>([]);
  const pulseIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef(0);
  const fireTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const speed = phase === 'scanning' ? 0.022 : 0.008;
    const animate = (ts: number) => {
      if (!aliveRef.current) return;
      if (ts - lastTickRef.current > 14) {
        lastTickRef.current = ts;
        setPulses(prev => prev.map(p => ({ ...p, t: p.t + speed })).filter(p => p.t < 1));
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      aliveRef.current = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  useEffect(() => {
    aliveRef.current = true;
    const scheduleNext = () => {
      if (!aliveRef.current) return;
      const delay = phase === 'scanning'
        ? 60 + Math.random() * 120
        : 400 + Math.random() * 900;
      fireTimerRef.current = setTimeout(() => {
        if (!aliveRef.current) return;
        const rootSeg = ROOT_IDS[Math.floor(Math.random() * ROOT_IDS.length)];
        const colors = [
          'rgba(0,240,255,0.95)',
          'rgba(168,85,247,0.95)',
          'rgba(200,100,255,0.95)',
          'rgba(0,200,255,0.9)',
        ];
        setPulses(prev => [
          ...prev,
          { id: ++pulseIdRef.current, segId: rootSeg, t: 0, color: colors[Math.floor(Math.random() * colors.length)] },
        ]);
        scheduleNext();
      }, delay);
    };
    scheduleNext();
    return () => {
      aliveRef.current = false;
      if (fireTimerRef.current) clearTimeout(fireTimerRef.current);
    };
  }, [phase]);

  const isResult = phase === 'result';
  const somaFill = isResult ? 'rgba(52,211,153,0.95)' : 'rgba(0,240,255,0.95)';
  const somaGlow = isResult ? '0 0 18px 6px rgba(52,211,153,0.6)' : '0 0 18px 6px rgba(0,240,255,0.5)';

  return (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full overflow-visible"
      aria-hidden="true"
      style={{ filter: 'drop-shadow(0 0 6px rgba(0,200,255,0.25))' }}
    >
      <defs>
        <filter id="nc-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="nc-glow-strong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="axon-grad" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="rgba(0,240,255,0.55)" />
          <stop offset="100%" stopColor="rgba(168,85,247,0.15)" />
        </linearGradient>
      </defs>
      {NEURON_SEGS.map(s => (
        <line key={s.id}
          x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
          stroke="rgba(0,200,255,0.22)"
          strokeWidth={s.w}
          strokeLinecap="round"
          filter="url(#nc-glow)"
        />
      ))}
      {pulses.map(p => {
        const seg = NEURON_SEGS[p.segId];
        if (!seg) return null;
        const x = seg.x1 + (seg.x2 - seg.x1) * p.t;
        const y = seg.y1 + (seg.y2 - seg.y1) * p.t;
        const op = p.t < 0.18 ? p.t / 0.18 : p.t > 0.82 ? (1 - p.t) / 0.18 : 1;
        const r = seg.w * 1.2 + 0.8;
        return (
          <circle key={p.id}
            cx={x} cy={y} r={r}
            fill={p.color}
            opacity={op}
            filter="url(#nc-glow-strong)"
          />
        );
      })}
      <circle cx={CX} cy={CY} r={9}
        fill="rgba(0,240,255,0.06)"
        filter="url(#nc-glow-strong)"
      />
      <circle cx={CX} cy={CY} r={6}
        fill={somaFill}
        filter="url(#nc-glow-strong)"
        style={{ filter: somaGlow }}
      />
      <circle cx={CX - 1.5} cy={CY - 1.5} r={2}
        fill="rgba(255,255,255,0.7)"
      />
    </svg>
  );
}

// ─── Match Modal ─────────────────────────────────────────────────────────────
function MatchModal({ jobTitle, location, skills, onClose }: {
  jobTitle: string; location: string; skills: string; onClose: () => void;
}) {
  const skillList = skills.split(',').map(s => s.trim()).filter(Boolean).slice(0, 4);
  const roleTitles = generateRoleTitles(jobTitle);
  const roles = ROLE_TEMPLATES.map((t, i) => ({ ...t, title: roleTitles[i], fee: randomInRange(t.feeMin, t.feeMax) }));
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-lg z-10 rounded-3xl border border-cyan-400/30 bg-[#0a0a0f]/95 overflow-hidden"
        initial={{ scale: 0.85, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{ boxShadow: '0 0 60px rgba(0,240,255,0.15), 0 0 120px rgba(168,85,247,0.1)' }}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <StatusBadge label="MATCH FOUND" color="emerald" />
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">{jobTitle}</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] text-gray-400 bg-white/5 border border-white/10 rounded-full px-2.5 py-1">{location}</span>
                {skillList.map((s, i) => <span key={i} className="text-[10px] text-cyan-300 bg-cyan-400/5 border border-cyan-400/20 rounded-full px-2.5 py-1">{s}</span>)}
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all flex-shrink-0 ml-3" aria-label="Close"><X size={16} /></button>
          </div>
          <NeonDivider width="w-full" color="mixed" />
          <div className="mt-5 mb-6">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-4">Recent Matches on RecXchange</p>
            <div className="space-y-3">
              {roles.map((role, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.1 }} className="p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/30 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-white truncate">{role.title}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{role.company} · {role.daysAgo}d ago</p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <span className="text-[9px] text-gray-400 bg-white/5 rounded-full px-2 py-0.5">{location}</span>
                        {skillList.slice(0, 2).map((s, j) => <span key={j} className="text-[9px] text-cyan-400/70 bg-cyan-400/5 rounded-full px-2 py-0.5">{s}</span>)}
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-0.5">Split Fee</p>
                      <p className="text-base sm:text-lg font-black text-white">${role.fee.toLocaleString()}</p>
                      <p className="text-[9px] text-emerald-400">up to 70%</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <GlowButton variant="primary" size="lg" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" className="w-full text-center">
            Join RecXchange &amp; See Live Roles
          </GlowButton>
          <p className="text-center text-[10px] text-gray-500 mt-3">From $1/month &middot; Cancel anytime</p>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
      </motion.div>
    </motion.div>
  );
}

// ─── Xchange Engine ───────────────────────────────────────────────────────────
function XchangeEngine() {
  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [showModal, setShowModal] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canSubmit = jobTitle.trim().length > 1 && location.trim().length > 1 && skills.trim().length > 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || phase !== 'idle') return;
    trackEvent('xchange_engine_submitted', { page: '/recruiters-with-candidates' });
    setPhase('scanning');
    timerRef.current = setTimeout(() => { setPhase('result'); setShowModal(true); }, 2800);
  };
  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase('idle'); setShowModal(false); setJobTitle(''); setLocation(''); setSkills('');
  };
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px_1fr] xl:grid-cols-[1fr_420px_1fr] gap-6 sm:gap-8 lg:gap-6 items-center mb-16 sm:mb-20">

        {/* Left card */}
        <HolographicCard color="purple" variant="content">
          <h3 className="text-lg sm:text-xl font-bold mb-1 gradient-text">Find Matching Roles</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-5 leading-relaxed">Enter your candidate details and see what live roles are waiting on RecXchange.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">Job Title *</label>
              <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} disabled={phase !== 'idle'} placeholder="e.g. Electrical Engineer" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 transition-all disabled:opacity-50 placeholder:text-gray-600" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">Location *</label>
              <input type="text" value={location} onChange={e => setLocation(e.target.value)} disabled={phase !== 'idle'} placeholder="e.g. London, UK" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 transition-all disabled:opacity-50 placeholder:text-gray-600" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1.5">Key Skills *</label>
              <input type="text" value={skills} onChange={e => setSkills(e.target.value)} disabled={phase !== 'idle'} placeholder="e.g. AutoCAD, 18th Edition, HV" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400/50 transition-all disabled:opacity-50 placeholder:text-gray-600" />
              <p className="text-[10px] text-gray-600 mt-1">Separate with commas</p>
            </div>
            <button type="submit" disabled={!canSubmit || phase !== 'idle'} className="relative w-full py-3 rounded-xl border border-purple-400/40 bg-black/40 overflow-hidden group font-black text-xs uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-purple-300/60">
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center gap-2">
                {phase === 'scanning' ? (<><span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />Scanning...</>) : (<><Search size={14} />Find Matches</>)}
              </span>
            </button>
          </form>
        </HolographicCard>

        {/* Centre: core */}
        <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[420px]">
          {[1,2,3].map(i => (
            <motion.div key={i} className="absolute rounded-full border border-cyan-400/20"
              style={{ width: `${i * 30 + 60}%`, height: `${i * 30 + 60}%` }}
              animate={phase === 'scanning'
                ? { scale: [1, 1.1, 1], opacity: [0.15, 0.5, 0.15] }
                : { scale: [1, 1.02, 1], opacity: [0.06, 0.14, 0.06] }
              }
              transition={{ duration: phase === 'scanning' ? 0.9 : 3.5, delay: i * 0.22, repeat: Infinity }}
            />
          ))}
          <motion.div className="absolute w-52 h-52 xl:w-64 xl:h-64 rounded-full border-2"
            style={{ borderTopColor: 'rgba(0,240,255,0.5)', borderRightColor: 'rgba(168,85,247,0.3)', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
            animate={{ rotate: 360 }}
            transition={{ duration: phase === 'scanning' ? 0.9 : 4, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div className="absolute w-40 h-40 xl:w-52 xl:h-52 rounded-full border"
            style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'rgba(255,0,255,0.45)', borderLeftColor: 'rgba(0,240,255,0.25)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: phase === 'scanning' ? 1.3 : 6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div className="absolute w-60 h-60 xl:w-72 xl:h-72 rounded-full border"
            style={{ borderTopColor: 'transparent', borderRightColor: 'rgba(168,85,247,0.2)', borderBottomColor: 'transparent', borderLeftColor: 'rgba(0,240,255,0.1)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: phase === 'scanning' ? 2 : 12, repeat: Infinity, ease: 'linear' }}
          />
          <OrbitalDots phase={phase} />
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: '160px', height: '160px',
              background: 'radial-gradient(circle, rgba(0,240,255,0.08) 0%, rgba(168,85,247,0.06) 55%, transparent 100%)',
            }}
            animate={phase === 'scanning'
              ? { scale: [1, 1.06, 1], boxShadow: ['0 0 30px rgba(0,240,255,0.08)', '0 0 60px rgba(0,240,255,0.28)', '0 0 30px rgba(0,240,255,0.08)'] }
              : { scale: [1, 1.015, 1], boxShadow: ['0 0 10px rgba(0,240,255,0.04)', '0 0 22px rgba(0,240,255,0.1)', '0 0 10px rgba(0,240,255,0.04)'] }
            }
            transition={{ duration: phase === 'scanning' ? 0.9 : 3.5, repeat: Infinity }}
          >
            <div className="absolute inset-0">
              <NeuronCore phase={phase} />
            </div>
            <AnimatePresence mode="wait">
              {phase === 'result' && (
                <motion.div key="result"
                  initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 320 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                  <div className="rounded-full bg-black/60 p-2">
                    <Check size={24} strokeWidth={3} className="text-emerald-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence>
            {phase !== 'idle' && <ScanCounter phase={phase} />}
          </AnimatePresence>
          <AnimatePresence>
            {phase === 'result' && (
              <motion.p
                className="absolute text-[10px] font-black uppercase tracking-[0.25em] text-emerald-400"
                style={{ bottom: 52, textShadow: '0 0 12px rgba(52,211,153,0.6)' }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: [0, 1, 0.7, 1] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                &#9679; MATCH FOUND
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right card */}
        <HolographicCard color="cyan" variant="content">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Make the Most of Your <span className="text-cyan-400">Database</span></h2>
          <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">The Xchange Engine automatically analyses your candidates to extract insights and matches them across multiple dimensions.</p>
          <ul className="space-y-3 sm:space-y-4">
            {["Semantic matching beyond keywords", "Continuous 24/7 scanning", "Instant notifications"].map((item, i) => (
              <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                <Zap size={14} className="text-cyan-400 flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
          {phase === 'result' && (
            <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} onClick={handleReset}
              className="mt-6 w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase tracking-widest transition-all">
              Try Another
            </motion.button>
          )}
        </HolographicCard>
      </div>

      <AnimatePresence>
        {showModal && <MatchModal jobTitle={jobTitle} location={location} skills={skills} onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </>
  );
}

export default function RecruiterCandidatesPage() {
  useEffect(() => { trackEvent('page_viewed', { page: '/recruiters-with-candidates' }); }, []);
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1400px] mx-auto">
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 sm:mb-16 md:mb-20 mt-6">
            <StatusBadge label="MONETIZE YOUR TALENT" color="cyan" />
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}>
              Efficient Candidate Matching
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Stop letting your goldmine of candidates gather dust. Enter their details below and see what live roles are waiting on RecXchange right now.
            </p>
          </motion.header>
          <XchangeEngine />
          {/* Feature cards — equal height via items-stretch on the grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 items-stretch">
            <HolographicCard color="fuchsia" variant="feature" className="h-full">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="p-2 sm:p-3 bg-fuchsia-500/10 rounded-xl text-fuchsia-400 flex-shrink-0"><Cpu size={20} className="sm:w-6 sm:h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Multi-Dimensional Analysis</h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">Our AI evaluates candidates based on location fit, experience alignment, and work model preferences.</p>
                </div>
              </div>
            </HolographicCard>
            <HolographicCard color="cyan" variant="feature" className="h-full">
              <div className="flex gap-3 sm:gap-4 items-start">
                <div className="p-2 sm:p-3 bg-cyan-500/10 rounded-xl text-cyan-400 flex-shrink-0"><Zap size={20} className="sm:w-6 sm:h-6" /></div>
                <div>
                  <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Automated Discovery</h4>
                  <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">The engine re-calculates matches dynamically as new roles are added.</p>
                </div>
              </div>
            </HolographicCard>
          </div>
          <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
            <Globe className="mx-auto text-fuchsia-400 mb-6 sm:mb-8 opacity-50" size={48} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">No Candidates? <span className="gradient-text">No Problem.</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-2">
              If your own database doesn&apos;t have the right fit, search our global network instead. Over 270 million candidate profiles are available instantly through our data partner, Apollo. It&apos;s built right into RecXchange, so you can find candidates and roles with one login.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <motion.a
                href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-extrabold text-sm shadow-[0_0_25px_rgba(0,255,255,0.3)] transition-all inline-flex items-center gap-2"
              >
                <Search size={16} /> Search 270M Candidates
              </motion.a>
            </div>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
