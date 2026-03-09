'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function GlowButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled = false,
  type = 'button'
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 sm:px-10 py-3 sm:py-4 text-sm sm:text-base',
    lg: 'px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg'
  }[size];

  const variantStyles = {
    primary: {
      glow: 'from-cyan-500 via-purple-500 to-fuchsia-500',
      bg: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-fuchsia-500',
      text: 'text-white',
      shadow: '0 0 20px rgba(0,240,255,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
    },
    secondary: {
      glow: 'from-cyan-500/50 via-purple-500/50 to-fuchsia-500/50',
      bg: 'bg-black/40 border-2 border-cyan-400/40 hover:border-cyan-300/60',
      text: 'text-cyan-300',
      shadow: '0 2px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(0,240,255,0.1)'
    },
    ghost: {
      glow: 'from-cyan-500/30 via-purple-500/30 to-fuchsia-500/30',
      bg: 'bg-transparent hover:bg-white/5',
      text: 'text-cyan-300 hover:text-cyan-200',
      shadow: 'none'
    }
  }[variant];

  const buttonContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
    >
      <div className="relative group isolate">
        {/* Softened glow layers */}
        {variant === 'primary' && (
          <>
            <span 
              className={`absolute -inset-3 bg-gradient-to-r ${variantStyles.glow} rounded-2xl blur-2xl opacity-15 group-hover:opacity-30 animate-pulse-slow pointer-events-none`}
              aria-hidden="true" 
            />
            <span 
              className={`absolute -inset-1.5 bg-gradient-to-r ${variantStyles.glow} rounded-xl blur-xl opacity-20 group-hover:opacity-35 transition-opacity pointer-events-none`}
              aria-hidden="true" 
            />
          </>
        )}
        
        {variant === 'secondary' && (
          <span 
            className={`absolute -inset-1 bg-gradient-to-r ${variantStyles.glow} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none`}
            aria-hidden="true" 
          />
        )}
        
        {/* Button shell */}
        <span 
          className={`relative flex items-center justify-center gap-2 sm:gap-3 ${sizeClasses} ${variantStyles.bg} rounded-xl font-black ${variantStyles.text} group-hover:scale-105 transition-all duration-300 ${className}`}
          style={{
            boxShadow: variantStyles.shadow
          }}
        >
          <span className="relative z-10 tracking-wider">{children}</span>
          {icon && <span className="relative z-10">{icon}</span>}
          
          {/* Energy sweep on hover */}
          {variant === 'primary' && (
            <span className="absolute inset-0 rounded-xl overflow-hidden" aria-hidden="true">
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </span>
          )}
        </span>
      </div>
    </motion.div>
  );

  if (href && !disabled) {
    return (
      <Link href={href} onClick={onClick}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} type={type}>
      {buttonContent}
    </button>
  );
}
