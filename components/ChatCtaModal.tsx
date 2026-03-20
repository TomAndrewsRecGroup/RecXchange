'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import HiringManagerQuickAction from '@/components/hiring-manager-quick-action';
import SendRolesForm from '@/components/send-roles-form';
import RecXDirectForm from '@/components/recx-direct-form';
import type { ChatCtaKind } from '@/hooks/useChatLogic';

export default function ChatCtaModal({
  open,
  kind,
  onClose,
  prefill,
}: {
  open: boolean;
  kind: ChatCtaKind | null;
  onClose: () => void;
  prefill: { firstName: string; lastName: string; email: string; companyName?: string };
}) {
  if (!open || !kind) return null;

  // Recruiter CTAs: use the exact existing modal gate components.
  if (kind === 'send3roles') {
    return (
      <SendRolesForm
        isOpen
        onClose={onClose}
        prefillName={`${prefill.firstName} ${prefill.lastName}`.trim()}
        prefillEmail={prefill.email}
      />
    );
  }

  if (kind === 'learnaboutrecxdirect') {
    return (
      <RecXDirectForm
        isOpen
        onClose={onClose}
        prefillName={`${prefill.firstName} ${prefill.lastName}`.trim()}
        prefillEmail={prefill.email}
      />
    );
  }

  const title = 'How RecXchange works';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(560px,calc(100vw-32px))] bg-[#0a0a0f]/95 border border-cyan-400/25 rounded-2xl shadow-2xl z-[1000] overflow-hidden"
          >
            <div className="flex items-start justify-between p-4 border-b border-cyan-400/20 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
              <div>
                <h3 className="text-white font-black text-sm">{title}</h3>
                <p className="text-gray-400 text-xs mt-1">Your details are prefilled. You can edit them before submitting.</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {kind === 'howitworks' && (
                <HiringManagerQuickAction
                  className="max-w-none"
                  prefill={{
                    firstName: prefill.firstName,
                    lastName: prefill.lastName,
                    email: prefill.email,
                    companyName: prefill.companyName || '',
                  }}
                />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
