"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import GlowButton from '@/components/design-system/GlowButton';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  liveRole: string;
  notes: string;
}

const INITIAL: FormData = { name: '', email: '', phone: '', businessName: '', liveRole: '', notes: '' };

function Field({
  label,
  id,
  type = 'text',
  value,
  onChange,
  required,
  placeholder,
  textarea,
}: {
  label: string;
  id: keyof FormData;
  type?: string;
  value: string;
  onChange: (id: keyof FormData, val: string) => void;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const base =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/8 transition-all';
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-cyan-400 ml-0.5">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={3}
          value={value}
          onChange={e => onChange(id, e.target.value)}
          placeholder={placeholder}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(id, e.target.value)}
          placeholder={placeholder}
          className={base}
          required={required}
        />
      )}
    </div>
  );
}

export default function InstantRoleModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [state, setState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const set = (id: keyof FormData, val: string) => setForm(prev => ({ ...prev, [id]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.liveRole) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    setState('submitting');
    setErrorMsg('');
    try {
      const res = await fetch('/api/instant-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Submission failed');
      setState('success');
    } catch {
      setState('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={overlayRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(3,7,18,0.85)', backdropFilter: 'blur(12px)' }}
        onClick={e => { if (e.target === overlayRef.current) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-[#0d1a2e] to-[#0a0f1e] shadow-[0_0_60px_rgba(0,240,255,0.1)]"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5 bg-[#0d1a2e]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                <Zap className="text-cyan-400" size={18} />
              </div>
              <div>
                <h2 className="text-white font-bold text-base leading-tight">Instant Support</h2>
                <p className="text-gray-500 text-xs">We&apos;ll activate your role within the hour</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-6">
            {state === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="text-emerald-400" size={32} />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">We&apos;re on it.</h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                  Your role has been received. Our team will activate recruiter sourcing within the hour and be in touch shortly.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-gray-400 text-sm leading-relaxed mb-2">
                  Share your role details and we&apos;ll have specialist recruiters sourcing candidates within the hour — no delay, no waiting.
                </p>

                <Field label="Full Name" id="name" value={form.name} onChange={set} required placeholder="Jane Smith" />
                <Field label="Email" id="email" type="email" value={form.email} onChange={set} required placeholder="jane@company.com" />
                <Field label="Phone" id="phone" type="tel" value={form.phone} onChange={set} placeholder="+44 7700 000000" />
                <Field label="Business Name" id="businessName" value={form.businessName} onChange={set} placeholder="Acme Corp" />
                <Field label="Live Role" id="liveRole" value={form.liveRole} onChange={set} required placeholder="e.g. Senior Software Engineer – London – £90k" />
                <Field label="Additional Notes" id="notes" value={form.notes} onChange={set} textarea placeholder="Any requirements, urgency, or context..." />

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <AlertCircle size={15} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                  </div>
                )}

                <div className="pt-2">
                  <GlowButton
                    variant="primary"
                    size="md"
                    className="w-full"
                    disabled={state === 'submitting'}
                  >
                    {state === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 size={16} className="animate-spin" /> Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Zap size={16} /> Activate Instant Support
                      </span>
                    )}
                  </GlowButton>
                </div>

                <p className="text-center text-[11px] text-gray-600 pt-1">
                  By submitting you agree to our{' '}
                  <a href="/privacy" className="text-gray-500 hover:text-gray-300 underline">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
