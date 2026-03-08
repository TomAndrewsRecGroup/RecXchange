'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HolographicCardProps {
  children: React.ReactNode;
  color?: 'cyan' | 'fuchsia' | 'purple' | 'emerald';
  href?: string;
  onClick?: () => void;
  variant?: 'stat' | 'content' | 'feature';
  className?: string;
  showStatusIndicator?: boolean;
  glowIntensity?: 'low' | 'medium' | 'high';
}

const colorConfig = {
  cyan: {
    glow: 'from-cyan-500/40 via-cyan-600/30 to-cyan-500/40',
    border: 'border-cyan-400/40 hover:border-cyan-300/60',
    statusBg: 'bg-cyan-400',
    scanLine: 'via-cyan-400',
    textHover: 'group-hover:text-cyan-300',
    shadow: 'rgba(0,240,255,0.2)',
    inset: 'rgba(0,240,255,0.2)',
    ambientGlow: 'rgba(0,240,255,0.1)'
  },
  fuchsia: {
    glow: 'from-fuchsia-500/40 via-pink-600/30 to-fuchsia-500/40',
    border: 'border-fuchsia-400/40 hover:border-fuchsia-300/60',
    statusBg: 'bg-fuchsia-400',
    scanLine: 'via-fuchsia-400',
    textHover: 'group-hover:text-fuchsia-300',
    shadow: 'rgba(255,0,255,0.2)',
    inset: 'rgba(255,0,255,0.2)',
    ambientGlow: 'rgba(255,0,255,0.1)'
  },
  purple: {
    glow: 'from-purple-500/40 via-purple-600/30 to-cyan-500/40',
    border: 'border-purple-400/40 hover:border-purple-300/60',
    statusBg: 'bg-purple-400',
    scanLine: 'via-purple-400',
    textHover: 'group-hover:text-purple-300',
    shadow: 'rgba(168,85,247,0.2)',
    inset: 'rgba(168,85,247,0.2)',
    ambientGlow: 'rgba(168,85,247,0.1)'
  },
  emerald: {
    glow: 'from-emerald-500/40 via-emerald-600/30 to-emerald-500/40',
    border: 'border-emerald-400/40 hover:border-emerald-300/60',
    statusBg: 'bg-emerald-400',
    scanLine: 'via-emerald-400',
    textHover: 'group-hover:text-emerald-300',
    shadow: 'rgba(16,185,129,0.2)',
    inset: 'rgba(16,185,129,0.2)',
    ambientGlow: 'rgba(16,185,129,0.1)'
  }
};

const glowStrength = {
  low: { opacity: 'opacity-30 group-hover:opacity-50', blur: 'blur-lg' },
  medium: { opacity: 'opacity-50 group-hover:opacity-80', blur: 'blur-xl' },
  high: { opacity: 'opacity-70 group-hover:opacity-100', blur: 'blur-2xl' }
};

export default function HolographicCard({
  children,
  color = 'cyan',
  href,
  onClick,
  variant = 'content',
  className = '',
  showStatusIndicator = false,
  glowIntensity = 'medium'
}: HolographicCardProps) {
  const colors = colorConfig[color];
  const glow = glowStrength[glowIntensity];

  const padding = {
    stat: 'p-3 sm:p-5',
    content: 'p-6 sm:p-8',
    feature: 'p-6'
  }[variant];

  const cardContent = (
    <div className="group relative">
      {/* Outer glow layer */}
      <div 
        className={`absolute -inset-1 bg-gradient-to-br ${colors.glow} rounded-2xl ${glow.blur} ${glow.opacity} transition duration-300`}
        aria-hidden="true" 
      />
      
      {/* Main card */}
      <div 
        className={`relative backdrop-blur-xl bg-black/40 ${padding} rounded-2xl border ${colors.border} transition-all duration-300 overflow-hidden ${className}`}
        style={{
          boxShadow: `0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 ${colors.inset}, 0 0 40px ${colors.ambientGlow}`
        }}
      >
        {/* Status indicator */}
        {showStatusIndicator && (
          <div className="absolute top-2 left-2" aria-hidden="true">
            <div className="relative flex h-1.5 w-1.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${colors.statusBg} opacity-75`} />
              <span 
                className={`relative inline-flex rounded-full h-1.5 w-1.5 ${colors.statusBg}`}
                style={{ boxShadow: `0 0 8px currentColor` }}
              />
            </div>
          </div>
        )}
        
        {children}
        
        {/* Bottom scan line */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${colors.scanLine} to-transparent opacity-50`}
          aria-hidden="true" 
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="block">
        {cardContent}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button onClick={onClick} className="block w-full text-left">
        {cardContent}
      </button>
    );
  }

  return cardContent;
}
