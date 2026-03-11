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
    { r: 88,  duration: 3.2, color: 'rgba(0,240,255,0.7)',  size: 4, startAngle: 0   },
    { r: 104, duration: 5.1, color: 'rgba(168,85,247,0.6)', size: 3, startAngle: 120 },
    { r: 76,  duration: 2.4, color: 'rgba(255,0,255,0.5)',  size: 3, startAngle: 240 },
    { r: 118, duration: 7.8, color: 'rgba(0,240,255,0.4)',  size: 2, startAngle: 60  },
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
      }}>
        {count.toLocaleString()}
      </p>
    </motion.div>
  );
}

// ─── Electric NeuronCore ──────────────────────────────────────────────────────
// Each edge fires a glowing pulse-dot that travels from one node to the other
// at a random interval, mimicking real synaptic transmission.
const NODES = [
  { cx: 50, cy: 50 },  // 0 — soma (centre)
  { cx: 76, cy: 24 },  // 1
  { cx: 84, cy: 62 },  // 2
  { cx: 24, cy: 30 },  // 3
  { cx: 16, cy: 68 },  // 4
  { cx: 52, cy: 90 },  // 5
  { cx: 92, cy: 46 },  // 6
  { cx: 8,  cy: 48 },  // 7
  { cx: 60, cy: 14 },  // 8 — extra dendrite tips
  { cx: 36, cy: 88 },  // 9
];
const EDGES: [number, number][] = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
  [1,2],[1,8],[3,4],[3,7],[2,5],[2,6],[4,9],[5,9],[6,8],
];

type Pulse = { id: number; edgeIdx: number; progress: number; color: string };

function NeuronCore({ phase }: { phase: EnginePhase }) {
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [firedNodes, setFiredNodes] = useState<Set<number>>(new Set());
  const pulseIdRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTickRef = useRef<number>(0);
  const scheduleRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Fire a pulse on a random edge, then trigger a node flash at the destination
  const firePulse = () => {
    const edgeIdx = Math.floor(Math.random() * EDGES.length);
    const colors = ['rgba(0,240,255,1)', 'rgba(168,85,247,1)', 'rgba(255,100,255,1)'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const id = ++pulseIdRef.current;
    setPulses(prev => [...prev, { id, edgeIdx, progress: 0, color }]);

    // schedule node flash at destination when pulse arrives (~400ms travel)
    const dest = EDGES[edgeIdx][1];
    const t = setTimeout(() => {
      setFiredNodes(prev => new Set([...prev, dest]));
      setTimeout(() => setFiredNodes(prev => { const n = new Set(prev); n.delete(dest); return n; }), 180);
    }, 420);
    scheduleRef.current.push(t);
  };

  // Animate pulse progress via rAF
  useEffect(() => {
    const speed = phase === 'scanning' ? 0.028 : 0.012;
    const animate = (ts: number) => {
      const dt = ts - lastTickRef.current;
      if (dt > 16) {
        lastTickRef.current = ts;
        setPulses(prev =>
          prev
            .map(p => ({ ...p, progress: p.progress + speed }))
            .filter(p => p.progress < 1)
        );
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [phase]);

  // Schedule random pulse firings
  useEffect(() => {
    let alive = true;
    const scheduleNext = () => {
      if (!alive) return;
      const delay = phase === 'scanning'
        ? 80 + Math.random() * 140
        : 300 + Math.random() * 700;
      const t = setTimeout(() => {
        if (alive) { firePulse(); scheduleNext(); }
      }, delay);
      scheduleRef.current.push(t);
    };
    scheduleNext();
    return () => {
      alive = false;
      scheduleRef.current.forEach(clearTimeout);
      scheduleRef.current = [];
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const isResult = phase === 'result';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" aria-hidden="true">
      <defs>
        {/* Glow filter for pulses and fired nodes */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.8" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Axon lines — always visible, faint */}
      {EDGES.map(([a, b], i) => (
        <line key={i}
          x1={NODES[a].cx} y1={NODES[a].cy}
          x2={NODES[b].cx} y2={NODES[b].cy}
          stroke="rgba(0,200,255,0.12)" strokeWidth="0.6"
        />
      ))}

      {/* Travelling pulse dots */}
      {pulses.map(p => {
        const [a, b] = EDGES[p.edgeIdx];
        const x = NODES[a].cx + (NODES[b].cx - NODES[a].cx) * p.progress;
        const y = NODES[a].cy + (NODES[b].cy - NODES[a].cy) * p.progress;
        // Fade in at start, bright in middle, fade out at end
        const opacity = p.progress < 0.15
          ? p.progress / 0.15
          : p.progress > 0.85
          ? (1 - p.progress) / 0.15
          : 1;
        return (
          <circle key={p.id} cx={x} cy={y} r={1.6}
            fill={p.color}
            opacity={opacity}
            filter="url(#glow)"
          />
        );
      })}

      {/* Node bodies — synapse flash when a pulse arrives */}
      {NODES.map((n, i) => {
        const isSoma = i === 0;
        const fired = firedNodes.has(i);
        const baseR = isSoma ? 5 : 2.2;
        const fireR = isSoma ? 7 : 3.5;
        return (
          <circle key={i} cx={n.cx} cy={n.cy}
            r={fired ? fireR : baseR}
            fill={
              fired
                ? (isSoma ? 'rgba(255,255,255,0.95)' : 'rgba(0,240,255,0.9)')
                : isResult
                ? (isSoma ? 'rgba(52,211,153,0.9)' : 'rgba(52,211,153,0.5)')
                : (isSoma ? 'rgba(0,240,255,0.7)' : 'rgba(168,85,247,0.45)')
            }
            filter={fired ? 'url(#glow-strong)' : 'url(#glow)'}
            style={{ transition: 'r 0.12s ease, fill 0.12s ease' }}
          />
        );
      })}
    </svg>
  );
}

// ─── Match Modal ──────────────────────────────────────────────────────────────
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

        {/* Left: Input Form */}
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

        {/* Centre: Core graphic */}
        <div className="relative flex items-center justify-center min-h-[300px] lg:min-h-[420px]">

          {/* Scanning rings */}
          {[1,2,3].map(i => (
            <motion.div key={i}
              className="absolute rounded-full border border-cyan-400/20"
              style={{ width: `${i * 30 + 60}%`, height: `${i * 30 + 60}%` }}
              animate={phase === 'scanning'
                ? { scale: [1, 1.1, 1], opacity: [0.15, 0.5, 0.15] }
                : { scale: [1, 1.02, 1], opacity: [0.06, 0.14, 0.06] }
              }
              transition={{ duration: phase === 'scanning' ? 0.9 : 3.5, delay: i * 0.22, repeat: Infinity }}
            />
          ))}

          {/* Outer spinning arc */}
          <motion.div className="absolute w-52 h-52 xl:w-64 xl:h-64 rounded-full border-2"
            style={{ borderTopColor: 'rgba(0,240,255,0.5)', borderRightColor: 'rgba(168,85,247,0.3)', borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
            animate={{ rotate: 360 }}
            transition={{ duration: phase === 'scanning' ? 0.9 : 4, repeat: Infinity, ease: 'linear' }}
          />
          {/* Inner counter-arc */}
          <motion.div className="absolute w-40 h-40 xl:w-52 xl:h-52 rounded-full border"
            style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: 'rgba(255,0,255,0.45)', borderLeftColor: 'rgba(0,240,255,0.25)' }}
            animate={{ rotate: -360 }}
            transition={{ duration: phase === 'scanning' ? 1.3 : 6, repeat: Infinity, ease: 'linear' }}
          />
          {/* Slow outer arc */}
          <motion.div className="absolute w-60 h-60 xl:w-72 xl:h-72 rounded-full border"
            style={{ borderTopColor: 'transparent', borderRightColor: 'rgba(168,85,247,0.2)', borderBottomColor: 'transparent', borderLeftColor: 'rgba(0,240,255,0.1)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: phase === 'scanning' ? 2 : 12, repeat: Infinity, ease: 'linear' }}
          />

          {/* Orbital dots */}
          <OrbitalDots phase={phase} />

          {/* Core sphere */}
          <motion.div
            className="relative w-32 h-32 xl:w-40 xl:h-40 rounded-full flex items-center justify-center"
            style={{ background: 'radial-gradient(circle, rgba(0,240,255,0.18) 0%, rgba(168,85,247,0.12) 60%, transparent 100%)' }}
            animate={phase === 'scanning'
              ? { scale: [1, 1.08, 1], boxShadow: ['0 0 20px rgba(0,240,255,0.1)', '0 0 40px rgba(0,240,255,0.35)', '0 0 20px rgba(0,240,255,0.1)'] }
              : { scale: [1, 1.02, 1], boxShadow: ['0 0 10px rgba(0,240,255,0.05)', '0 0 20px rgba(0,240,255,0.12)', '0 0 10px rgba(0,240,255,0.05)'] }
            }
            transition={{ duration: phase === 'scanning' ? 0.9 : 3, repeat: Infinity }}
          >
            {/* Electric neuron network fills the sphere */}
            <div className="absolute inset-2">
              <NeuronCore phase={phase} />
            </div>

            {/* Phase indicator — centre icon only, no text */}
            <AnimatePresence mode="wait">
              {phase === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Cpu size={18} className="text-cyan-400/30" />
                </motion.div>
              )}
              {phase === 'scanning' && (
                <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Cpu size={18} className="text-cyan-400/50 animate-pulse" />
                </motion.div>
              )}
              {phase === 'result' && (
                <motion.div key="result" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Check size={26} strokeWidth={3} className="text-emerald-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Scan counter */}
          <AnimatePresence>
            {phase !== 'idle' && <ScanCounter phase={phase} />}
          </AnimatePresence>

          {/* MATCH FOUND flash */}
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
                ● MATCH FOUND
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Info card */}
        <HolographicCard color="cyan" variant="content">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white">Utilize Your Existing <span className="text-cyan-400">Database</span></h2>
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
            <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6" style={{ textShadow: '0 0 60px rgba(0,240,255,0.3)' }}>
              Efficient Candidate Matching
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              Stop letting your goldmine of candidates gather dust. Enter their details below and see what live roles are waiting on RecXchange right now.
            </p>
          </motion.header>

          <XchangeEngine />

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

          <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
            <Globe className="mx-auto text-fuchsia-400 mb-6 sm:mb-8 opacity-50" size={48} />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white">No Candidates? <span className="gradient-text">No Problem.</span></h2>
            <p className="text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base px-2">
              If your internal database doesn&apos;t have the right fit, tap into our global search engine. Access over 270 million candidate profiles instantly through our Data Source partner, Apollo. Seamlessly built into RecXchange so you can access candidates and roles, with one login.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <GlowButton variant="primary" size="lg" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC">
                <Search size={16} className="inline mr-2" /> Search 270M Candidates
              </GlowButton>
            </div>
          </HolographicCard>
        </div>
      </div>
    </main>
  );
}
