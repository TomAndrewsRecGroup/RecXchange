'use client';

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  preventClose?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-3xl',
};

export default function ModalWrapper({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl',
  preventClose = false,
  className = '',
}: ModalWrapperProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const handleClose = () => {
    if (!preventClose) onClose();
  };

  const modal = (
    <AnimatePresence>
      {isOpen && (
        // Root: fixed full-screen container, pointer-events-none so it never
        // intercepts clicks itself. Children opt back in with pointer-events-auto.
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] pointer-events-none"
        >
          {/* Backdrop - separate element, pointer-events-auto only here.
              Clicking it calls handleClose; it never overlaps the panel. */}
          <div
            className="absolute inset-0 bg-black/90 pointer-events-auto"
            onClick={handleClose}
          />

          {/* Panel container - sits on top of backdrop via z-index, flex-centred */}
          <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              // pointer-events-auto re-enables interactions on the panel only
              className={`relative w-full ${maxWidthClasses[maxWidth]} max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] pointer-events-auto ${className}`}
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(0, 255, 255, 0.2)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={preventClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-500 hover:text-white transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Close modal"
              >
                <X size={20} className="sm:w-6 sm:h-6" />
              </button>

              {/* Header */}
              <div className="p-6 sm:p-8 md:p-10 border-b border-white/5">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 pr-8"
                  style={{
                    background: 'linear-gradient(135deg, #00ffff, #c71df1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{subtitle}</p>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10">{children}</div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
