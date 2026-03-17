'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  CreditCard,
  Lightbulb,
  BookOpen,
  MessageCircle,
} from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Recruiters',
    href: '/recruiter',
    icon: Users,
    accent: 'cyan' as const,
  },
  {
    label: 'Hiring Manager',
    href: '/hiring-manager-home',
    icon: Briefcase,
    accent: 'fuchsia' as const,
  },
  {
    label: 'Pricing',
    href: '/pricing',
    icon: CreditCard,
    accent: 'cyan' as const,
  },
  {
    label: 'Why RecXchange',
    href: '/why-recxchange',
    icon: Lightbulb,
    accent: 'fuchsia' as const,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: BookOpen,
    accent: 'cyan' as const,
  },
] as const;

const accentClasses = {
  cyan: {
    icon: 'text-cyan-400',
    iconHover: 'group-hover:text-cyan-300',
    label: 'group-hover:text-cyan-300',
    glow: 'group-hover:shadow-[0_0_12px_rgba(0,255,255,0.25)]',
    border: 'group-hover:border-cyan-400/40',
    bg: 'group-hover:bg-cyan-400/5',
  },
  fuchsia: {
    icon: 'text-fuchsia-400',
    iconHover: 'group-hover:text-fuchsia-300',
    label: 'group-hover:text-fuchsia-300',
    glow: 'group-hover:shadow-[0_0_12px_rgba(232,121,249,0.25)]',
    border: 'group-hover:border-fuchsia-400/40',
    bg: 'group-hover:bg-fuchsia-400/5',
  },
};

export default function QuickActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  // Hide on mobile to avoid clashing with the FloatingChat bubble
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  // Open the chat widget by dispatching a custom event that FloatingChat can listen to,
  // or — since FloatingChat renders its own toggle button — we programmatically click it.
  const handleLiveChat = () => {
    const chatButton = document.querySelector<HTMLButtonElement>('[data-chat-widget] button');
    if (chatButton) chatButton.click();
    // Close the menu after triggering chat
    setIsOpen(false);
  };

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[120] flex items-center"
      aria-label="Quick action navigation"
    >
      {/* Sliding panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeInOut' }}
            className="flex flex-col gap-1 bg-black/80 backdrop-blur-xl border border-cyan-400/20 rounded-l-2xl p-2 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
          >
            {/* Nav links */}
            {NAV_ITEMS.map(({ label, href, icon: Icon, accent }) => {
              const cls = accentClasses[accent];
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-transparent transition-all duration-200 ${cls.glow} ${cls.border} ${cls.bg}`}
                >
                  <Icon
                    size={16}
                    className={`flex-shrink-0 transition-colors duration-200 ${cls.icon} ${cls.iconHover}`}
                  />
                  <span
                    className={`text-sm font-medium text-gray-400 transition-colors duration-200 ${cls.label} whitespace-nowrap`}
                  >
                    {label}
                  </span>
                </Link>
              );
            })}

            {/* Divider */}
            <div className="my-1 border-t border-cyan-400/10" />

            {/* Live Chat button */}
            <button
              onClick={handleLiveChat}
              className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-transparent transition-all duration-200 group-hover:shadow-[0_0_12px_rgba(0,255,255,0.25)] hover:border-cyan-400/40 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-fuchsia-500/10"
            >
              <MessageCircle
                size={16}
                className="flex-shrink-0 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-200"
              />
              <span className="text-sm font-medium text-gray-400 group-hover:text-cyan-300 transition-colors duration-200 whitespace-nowrap">
                Live Chat
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle tab — always visible */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close quick actions' : 'Open quick actions'}
        className={`
          flex flex-col items-center justify-center gap-1.5
          w-7 h-24 rounded-l-xl
          bg-black/80 backdrop-blur-xl
          border border-r-0 border-cyan-400/20
          text-gray-400 hover:text-cyan-400
          shadow-[0_0_20px_rgba(0,255,255,0.08)]
          hover:shadow-[0_0_24px_rgba(0,255,255,0.2)]
          hover:bg-[#050508]/90
          transition-all duration-200
          group
        `}
      >
        {/* Rotated label */}
        <span
          className="text-[9px] font-bold tracking-widest uppercase text-gray-500 group-hover:text-cyan-400 transition-colors"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Quick Nav
        </span>
        {/* Chevron icon */}
        {isOpen ? (
          <ChevronRight size={12} className="text-cyan-400" />
        ) : (
          <ChevronLeft size={12} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
        )}
      </button>
    </div>
  );
}
