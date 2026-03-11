'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import ModalWrapper from './ModalWrapper';

const INDUSTRIES = [
  'Accounting & Finance', 'Administrative & Office Support', 'Advertising, Arts & Media',
  'Agriculture, Forestry & Fishing', 'Automotive', 'Banking & Financial Services',
  'Biotechnology', 'Building & Construction', 'Business Consulting & Management',
  'Call Centre & Customer Service', 'Chemicals', 'Community Services & Development',
  'Construction & Architecture', 'Consulting & Strategy', 'Consumer Products & FMCG',
  'Defence & Aerospace', 'Design & Architecture', 'Education & Training',
  'Electronics & Electrical', 'Energy & Utilities', 'Engineering',
  'Entertainment & Events', 'Environmental Services', 'Facilities Management',
  'Farming, Animals & Conservation', 'Fashion & Beauty', 'Food & Beverage',
  'Government & Public Sector', 'Healthcare & Medical', 'Hospitality & Tourism',
  'Human Resources & Recruitment', 'Industrial & Manufacturing',
  'Information & Communication Technology', 'Insurance & Superannuation', 'Legal',
  'Logistics, Transport & Distribution', 'Manufacturing, Transport & Logistics',
  'Marketing & Communications', 'Media & Digital', 'Mining, Resources & Energy',
  'Non-Profit & Charities', 'Oil & Gas', 'Pharmaceuticals', 'Professional Services',
  'Property & Real Estate', 'Public Relations', 'Retail & Consumer Products', 'Sales',
  'Science & Technology', 'Security & Law Enforcement', 'Sport & Recreation',
  'Telecommunications', 'Tourism & Hospitality', 'Trade & Services',
  'Transport & Logistics', 'Warehousing & Supply Chain'
].sort();

interface RecXDirectFormProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  prefillName?: string;
  prefillEmail?: string;
  prefillIndustries?: string[];
  autoFocus?: boolean;
}

export default function RecXDirectForm({
  className = '',
  isOpen: externalIsOpen,
  onClose: externalOnClose,
  prefillName = '',
  prefillEmail = '',
  prefillIndustries = [],
  autoFocus = false,
}: RecXDirectFormProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;

  const handleClose = () => {
    if (status !== 'loading') {
      externalOnClose ? externalOnClose() : setInternalIsOpen(false);
    }
  };

  // Only seed fields on the closed→open transition, never during typing
  const prevOpenRef = useRef(false);
  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = isOpen;
    if (isOpen && !wasOpen) {
      setName(prefillName);
      setEmail(prefillEmail);
      setSelectedIndustries(prefillIndustries);
      setStatus('idle');
      setErrorMessage('');
      setMarketingConsent(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else if (selectedIndustries.length < 5) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setErrorMessage('Please enter your name'); return; }
    if (!email || !email.includes('@')) { setErrorMessage('Please enter a valid email address'); return; }
    if (selectedIndustries.length === 0) { setErrorMessage('Please select at least one industry'); return; }

    setStatus('loading');
    setErrorMessage('');

    try {
      const nameParts = name.trim().split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || nameParts[0];

      const response = await fetch('/api/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          actionType: 'explain_recx_direct',
          industries: selectedIndustries,
          marketingConsent,
          source: window.location.pathname,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to submit');

      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setName('');
        setEmail('');
        setSelectedIndustries([]);
        setMarketingConsent(false);
        externalOnClose ? externalOnClose() : setInternalIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('RecX Direct form error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <>
      {externalIsOpen === undefined && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/5 text-fuchsia-400 text-xs font-bold uppercase tracking-widest hover:bg-fuchsia-400/10 transition-all"
        >
          LEARN ABOUT RECX DIRECT
        </button>
      )}

      <ModalWrapper
        isOpen={isOpen}
        onClose={handleClose}
        title="Learn About RecX Direct"
        subtitle="Select your industries and we’ll send you a detailed explainer of how RecX Direct works, current fee pool size, and how to earn up to 70% on placements."
        maxWidth="2xl"
        preventClose={status === 'loading'}
      >
        {status === 'success' ? (
          <div className="py-12 sm:py-16 md:py-20 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Explainer sent!</h3>
            <p className="text-gray-400 text-xs sm:text-sm">Check your email for the full RecX Direct breakdown.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Your Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                required disabled={status === 'loading'} autoFocus={autoFocus}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                required disabled={status === 'loading'}
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 text-sm text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                Your Industries ({selectedIndustries.length}/5) *
              </label>
              {selectedIndustries.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedIndustries.map((industry) => (
                    <button key={industry} type="button" onClick={() => handleIndustryToggle(industry)}
                      disabled={status === 'loading'}
                      className="px-2.5 py-1.5 sm:px-3 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 text-[10px] sm:text-xs font-bold flex items-center gap-1.5 sm:gap-2 hover:bg-fuchsia-400/20 transition-all disabled:opacity-50"
                    >
                      <span className="line-clamp-1">{industry}</span>
                      <X size={12} className="flex-shrink-0" />
                    </button>
                  ))}
                </div>
              )}
              <div className="max-h-48 sm:max-h-60 overflow-y-auto border border-white/10 rounded-xl bg-white/[0.03] p-2">
                {INDUSTRIES.map((industry) => (
                  <button key={industry} type="button" onClick={() => handleIndustryToggle(industry)}
                    disabled={(status === 'loading') || (!selectedIndustries.includes(industry) && selectedIndustries.length >= 5)}
                    className={`w-full text-left px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-xs sm:text-sm transition-all ${
                      selectedIndustries.includes(industry)
                        ? 'bg-fuchsia-400/20 text-fuchsia-400 font-bold'
                        : selectedIndustries.length >= 5
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    {industry}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t border-white/10 pt-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="checkbox" checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  disabled={status === 'loading'}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-white/5 text-fuchsia-400 focus:ring-fuchsia-400/50 focus:ring-offset-0 cursor-pointer disabled:opacity-50"
                />
                <span className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  Yes, I’d like to receive updates, role opportunities, and insights from RecXchange by email. You can unsubscribe at any time.
                </span>
              </label>
            </div>
            {errorMessage && (
              <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                className="text-xs sm:text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 sm:px-4"
              >
                {errorMessage}
              </motion.p>
            )}
            <button type="submit"
              disabled={status === 'loading' || selectedIndustries.length === 0}
              className="relative w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-xs sm:text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
              <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="relative z-10 text-white flex items-center justify-center">
                {status === 'loading' ? 'Sending...' : 'Send RecX Direct Explainer'}
              </span>
            </button>
          </form>
        )}
      </ModalWrapper>
    </>
  );
}
