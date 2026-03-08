'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatusBadgeProps {
  label: string;
  color?: 'cyan' | 'emerald' | 'fuchsia' | 'purple';
  animated?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const colorConfig = {
  cyan: {
    bg: 'rgba(0,240,255,0.05)',
    border: 'rgba(0,240,255,0.3)',
    text: 'text-cyan-300',
    glow: 'rgba(0,240,255,0.2)',
    dot: 'bg-cyan-400',
    shadow: '0 0 10px rgba(0,240,255,0.5)'
  },
  emerald: {
    bg: 'rgba(16,185,129,0.05)',
    border: 'rgba(16,185,129,0.3)',
    text: 'text-emerald-300',
    glow: 'rgba(16,185,129,0.2)',
    dot: 'bg-emerald-400',
    shadow: '0 0 10px rgba(16,185,129,0.5)'
  },
  fuchsia: {
    bg: 'rgba(255,0,255,0.05)',
    border: 'rgba(255,0,255,0.3)',
    text: 'text-fuchsia-300',
    glow: 'rgba(255,0,255,0.2)',
    dot: 'bg-fuchsia-400',
    shadow: '0 0 10px rgba(255,0,255,0.5)'
  },
  purple: {
    bg: 'rgba(168,85,247,0.05)',
    border: 'rgba(168,85,247,0.3)',
    text: 'text-purple-300',
    glow: 'rgba(168,85,247,0.2)',
    dot: 'bg-purple-400',
    shadow: '0 0 10px rgba(168,85,247,0.5)'
  }
};

export default function StatusBadge({ 
  label, 
  color = 'cyan',
  animated = true,
  size = 'md'
}: StatusBadgeProps) {
  const colors = colorConfig[color];
  
  const sizeClasses = {
    sm: { container: 'px-2 py-1', text: 'text-[8px]', dot: 'w-2 h-2' },
    md: { container: 'px-4 py-2', text: 'text-xs', dot: 'w-3 h-3' },
    lg: { container: 'px-5 py-2.5', text: 'text-sm', dot: 'w-3.5 h-3.5' }
  }[size];

  const MotionWrapper = animated ? motion.div : 'div';
  const motionProps = animated ? {
    initial: { opacity: 0, scale: 0.8, y: -20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  } : {};

  return (
    <MotionWrapper
      {...motionProps}
      className="inline-flex items-center gap-2.5 rounded-full relative group"
      style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bg} 50%, ${colors.bg} 100%)`,
        border: `1px solid ${colors.border}`,
        boxShadow: `0 0 30px ${colors.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
        padding: sizeClasses.container.split(' ').slice(0, 2).join(' ')
      }}
    >
      {/* Animated status indicator */}
      <div className={`relative flex items-center justify-center ${sizeClasses.dot}`} aria-hidden="true">
        <span className={`absolute inline-flex h-full w-full rounded-full ${colors.dot} opacity-75 animate-ping`} />
        <span 
          className={`relative inline-flex rounded-full h-2 w-2 ${colors.dot}`}
          style={{ boxShadow: colors.shadow }}
        />
      </div>
      
      <span 
        className={`${sizeClasses.text} font-bold ${colors.text} tracking-[0.2em] uppercase`}
        style={{ textShadow: colors.shadow }}
      >
        {label}
      </span>
      
      {/* Holographic shimmer */}
      <div className="absolute inset-0 rounded-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
      </div>
    </MotionWrapper>
  );
}
