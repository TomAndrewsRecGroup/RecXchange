'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const INDUSTRIES = [
  'Accountancy', 'Aerospace', 'Agriculture', 'Automotive', 'Banking', 
  'Biotech', 'Chemicals', 'Construction', 'Consulting', 'Consumer Goods',
  'Data & Analytics', 'Defence', 'Digital Marketing', 'Education', 'Energy',
  'Engineering', 'Entertainment', 'Fashion', 'Finance', 'FMCG',
  'Food & Beverage', 'Gaming', 'Government', 'Healthcare', 'Hospitality',
  'HR', 'Industrial', 'Insurance', 'IT', 'Legal',
  'Life Sciences', 'Logistics', 'Manufacturing', 'Media', 'Mining',
  'Oil & Gas', 'Pharmaceuticals', 'Property', 'Public Sector', 'Recruitment',
  'Renewables', 'Retail', 'Sales', 'Software', 'Telecoms',
  'Transport', 'Travel', 'Utilities', 'Web3', 'Other'
];

interface HowItWorksFormProps {
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
  prefillName?: string;
  prefillEmail?: string;
  prefillCompany?: string;
  prefillIndustries?: string[];
  autoFocus?: boolean;
  bookedMeeting?: boolean; // Track if they already booked a meeting
}

export default function HowItWorksForm({
  className = '',
  isOpen: externalIsOpen,
  onClose,
  prefillName = '',
  prefillEmail = '',
  prefillCompany = '',
  prefillIndustries = [],
  autoFocus = false,
  bookedMeeting = false,
}: HowItWorksFormProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industries, setIndustries] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const setIsOpen = onClose ? () => onClose() : setInternalIsOpen;

  useEffect(() => {
    if (isOpen && prefillName) setName(prefillName);
  }, [isOpen, prefillName]);

  useEffect(() => {
    if (isOpen && prefillEmail) setEmail(prefillEmail);
  }, [isOpen, prefillEmail]);

  useEffect(() => {
    if (isOpen && prefillCompany) setCompanyName(prefillCompany);
  }, [isOpen, prefillCompany]);

  useEffect(() => {
    if (isOpen && prefillIndustries.length > 0) setIndustries(prefillIndustries);
  }, [isOpen, prefillIndustries]);

  const toggleIndustry = (industry: string) => {
    if (industries.includes(industry)) {
      setIndustries(industries.filter(i => i !== industry));
    } else {
      setIndustries([...industries, industry]);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setStatus('idle');
    setErrorMessage('');
    setName('');
    setEmail('');
    setCompanyName('');
    setIndustries([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email');
      return;
    }

    if (!companyName.trim()) {
      setErrorMessage('Please enter your company name');
      return;
    }

    if (industries.length === 0) {
      setErrorMessage('Please select at least one industry');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/hiring-manager-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          companyName,
          industries: industries.join(', '),
          bookedMeeting,
          source: 'how-it-works-modal',
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');

      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('How it works form error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  const isExternallyControlled = externalIsOpen !== undefined;

  return (
    <>
      {!isExternallyControlled && (
        <button
          onClick={() => setInternalIsOpen(true)}
          className={`inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all ${className}`}
        >
          How Does It Work?
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-lg bg-[#0a0a0f]/95 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 flex items-center justify-between p-6 border-b border-cyan-400/20 bg-[#0a0a0f]/95 backdrop-blur-xl z-10">
                  <div>
                    <h2 className="text-2xl font-bold text-white">How RecXchange Works</h2>
                    <p className="text-gray-400 text-sm mt-1">
                      {bookedMeeting 
                        ? "We'll send you the explainer video" 
                        : "Get our explainer video sent to your inbox"
                      }
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-start gap-4 p-6 bg-green-500/10 border border-green-500/30 rounded-lg"
                      >
                        <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-green-400 text-2xl font-bold">✓</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg mb-2">Email Sent!</h3>
                          <p className="text-gray-300 text-sm leading-relaxed">
                            Check your inbox for our video explaining how RecXchange works for hiring managers. 
                            {bookedMeeting && " We'll see you at your scheduled meeting!"}
                          </p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Smith"
                            disabled={status === 'loading'}
                            required
                            autoFocus={autoFocus}
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Business Email *
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            disabled={status === 'loading'}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Company Name *
                          </label>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="Acme Corp"
                            disabled={status === 'loading'}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-2">
                            Select Industries You Hire In *
                          </label>
                          <div className="max-h-48 overflow-y-auto p-3 bg-white/5 border border-white/20 rounded-lg space-y-1">
                            {INDUSTRIES.map((industry) => (
                              <button
                                key={industry}
                                type="button"
                                onClick={() => toggleIndustry(industry)}
                                disabled={status === 'loading'}
                                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all ${
                                  industries.includes(industry)
                                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/40 text-white font-medium'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                }`}
                              >
                                {industry}
                              </button>
                            ))}
                          </div>
                          <p className="text-gray-500 text-xs mt-2">
                            {industries.length} {industries.length === 1 ? 'industry' : 'industries'} selected
                          </p>
                        </div>

                        {errorMessage && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                          >
                            {errorMessage}
                          </motion.div>
                        )}

                        <button
                          type="submit"
                          disabled={status === 'loading'}
                          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {status === 'loading' ? (
                            <span className="inline-flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Sending...
                            </span>
                          ) : (
                            'Send Me The Video'
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
