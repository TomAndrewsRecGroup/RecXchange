'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

// Same industry list as SendRolesForm
const INDUSTRIES = [
  'Accounting & Finance',
  'Administrative & Office Support',
  'Advertising, Arts & Media',
  'Agriculture, Forestry & Fishing',
  'Automotive',
  'Banking & Financial Services',
  'Biotechnology',
  'Building & Construction',
  'Business Consulting & Management',
  'Call Centre & Customer Service',
  'Chemicals',
  'Community Services & Development',
  'Construction & Architecture',
  'Consulting & Strategy',
  'Consumer Products & FMCG',
  'Defence & Aerospace',
  'Design & Architecture',
  'Education & Training',
  'Electronics & Electrical',
  'Energy & Utilities',
  'Engineering',
  'Entertainment & Events',
  'Environmental Services',
  'Facilities Management',
  'Farming, Animals & Conservation',
  'Fashion & Beauty',
  'Food & Beverage',
  'Government & Public Sector',
  'Healthcare & Medical',
  'Hospitality & Tourism',
  'Human Resources & Recruitment',
  'Industrial & Manufacturing',
  'Information & Communication Technology',
  'Insurance & Superannuation',
  'Legal',
  'Logistics, Transport & Distribution',
  'Manufacturing, Transport & Logistics',
  'Marketing & Communications',
  'Media & Digital',
  'Mining, Resources & Energy',
  'Non-Profit & Charities',
  'Oil & Gas',
  'Pharmaceuticals',
  'Professional Services',
  'Property & Real Estate',
  'Public Relations',
  'Retail & Consumer Products',
  'Sales',
  'Science & Technology',
  'Security & Law Enforcement',
  'Sport & Recreation',
  'Telecommunications',
  'Tourism & Hospitality',
  'Trade & Services',
  'Transport & Logistics',
  'Warehousing & Supply Chain'
].sort();

interface RecXDirectFormProps {
  className?: string;
}

export default function RecXDirectForm({ className = '' }: RecXDirectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleIndustryToggle = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries(selectedIndustries.filter(i => i !== industry));
    } else if (selectedIndustries.length < 5) {
      setSelectedIndustries([...selectedIndustries, industry]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      setErrorMessage('Please enter your first name');
      return;
    }

    if (!lastName.trim()) {
      setErrorMessage('Please enter your last name');
      return;
    }
    
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (selectedIndustries.length === 0) {
      setErrorMessage('Please select at least one industry');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          actionType: 'explain_recx_direct',
          industries: selectedIndustries,
          source: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      
      // Reset after 3 seconds and close modal
      setTimeout(() => {
        setStatus('idle');
        setFirstName('');
        setLastName('');
        setEmail('');
        setSelectedIndustries([]);
        setIsOpen(false);
      }, 3000);
    } catch (error) {
      console.error('RecX Direct form error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`recx-direct-trigger ${className}`}
      >
        Learn About RecX Direct
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-10 rounded-[2.5rem] border-fuchsia-400/20 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors z-10"
            >
              <X size={24} />
            </button>

            <h2 className="text-3xl font-bold gradient-text mb-4">Learn About RecX Direct</h2>
            <p className="text-gray-400 text-sm mb-8">
              Select your industries and we'll send you a detailed explainer of how RecX Direct works, current fee pool size, and how to earn up to 70% on placements.
            </p>

            {status === 'success' ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 bg-green-500/10 border border-green-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Explainer sent!</h3>
                <p className="text-gray-400 text-sm">Check your email for the full RecX Direct breakdown.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      disabled={status === 'loading'}
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === 'loading'}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-fuchsia-400/50 transition-all disabled:opacity-50"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                    Your Industries ({selectedIndustries.length}/5) *
                  </label>
                  
                  {/* Selected Tags */}
                  {selectedIndustries.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedIndustries.map((industry) => (
                        <button
                          key={industry}
                          type="button"
                          onClick={() => handleIndustryToggle(industry)}
                          disabled={status === 'loading'}
                          className="px-3 py-1.5 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/30 text-fuchsia-400 text-xs font-bold flex items-center gap-2 hover:bg-fuchsia-400/20 transition-all disabled:opacity-50"
                        >
                          {industry}
                          <X size={14} />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Industry Dropdown */}
                  <div className="max-h-60 overflow-y-auto border border-white/10 rounded-xl bg-white/[0.03] p-2">
                    {INDUSTRIES.map((industry) => (
                      <button
                        key={industry}
                        type="button"
                        onClick={() => handleIndustryToggle(industry)}
                        disabled={(status === 'loading') || (!selectedIndustries.includes(industry) && selectedIndustries.length >= 5)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all ${
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

                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading' || selectedIndustries.length === 0}
                  className="relative w-full py-4 rounded-2xl border border-white/15 bg-black/40 overflow-hidden group/btn font-bold text-sm uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute inset-[1px] rounded-2xl bg-black/80 group-hover/btn:bg-transparent transition-colors" />
                  <span className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                  <span className="relative z-10 text-white flex items-center justify-center">
                    {status === 'loading' ? 'Sending...' : 'Send RecX Direct Explainer'}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .recx-direct-trigger {
          padding: 14px 24px;
          background: linear-gradient(135deg, #c71df1, #00ffff);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .recx-direct-trigger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(199, 29, 241, 0.3);
        }

        .glass-card {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .gradient-text {
          background: linear-gradient(135deg, #c71df1, #00ffff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </>
  );
}
