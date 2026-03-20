'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HiringManagerQuickActionProps {
  className?: string;
  prefill?: { firstName?: string; lastName?: string; email?: string; companyName?: string };
}

export default function HiringManagerQuickAction({ 
  className = '',
  prefill,
}: HiringManagerQuickActionProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!prefill) return;
    if (status !== 'idle') return;
    if (typeof prefill.firstName === 'string') setFirstName(prefill.firstName);
    if (typeof prefill.lastName === 'string') setLastName(prefill.lastName);
    if (typeof prefill.email === 'string') setEmail(prefill.email);
    if (typeof prefill.companyName === 'string') setCompanyName(prefill.companyName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill?.firstName, prefill?.lastName, prefill?.email, prefill?.companyName]);

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
      setErrorMessage('Please enter a valid business email address');
      return;
    }

    if (!companyName.trim()) {
      setErrorMessage('Please enter your company name');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/hiring-manager-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          companyName,
          source: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setFirstName('');
      setLastName('');
      setEmail('');
      setCompanyName('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Hiring manager action error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className={`hiring-manager-quick-action ${className}`}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="success-message"
          >
            <div className="success-icon">✓</div>
            <p>Perfect! Check your inbox for our video explainer on how RecXchange works for clients.</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="form-content"
          >
            <div className="name-row">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                disabled={status === 'loading'}
                required
                className="name-input"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                disabled={status === 'loading'}
                required
                className="name-input"
              />
            </div>
            <div className="input-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Business Email"
                disabled={status === 'loading'}
                required
                className="text-input"
              />
            </div>
            <div className="input-row">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                disabled={status === 'loading'}
                required
                className="text-input"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="submit-button"
            >
              {status === 'loading' ? (
                <span className="loading-spinner" />
              ) : (
                'How Does It Work?'
              )}
            </button>
            {errorMessage && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="error-message"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        )}
      </AnimatePresence>

      <style jsx>{`
        .hiring-manager-quick-action {
          width: 100%;
          max-width: 500px;
        }

        .form-content {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .name-row {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .input-row {
          display: flex;
          width: 100%;
        }

        .name-input {
          flex: 1;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.2s;
          text-align: center;
        }

        .text-input {
          flex: 1;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.2s;
          text-align: center;
        }

        .name-input:focus,
        .text-input:focus {
          outline: none;
          border-color: #00ffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .name-input::placeholder,
        .text-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .submit-button {
          width: 100%;
          padding: 14px 24px;
          background: linear-gradient(135deg, #00ffff, #c71df1);
          border: none;
          border-radius: 8px;
          color: #fff;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
          text-align: center;
          margin-top: 8px;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 255, 255, 0.3);
        }

        .submit-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.3);
          border-radius: 8px;
          color: #22c55e;
        }

        .success-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(34, 197, 94, 0.2);
          border-radius: 50%;
          font-size: 18px;
          font-weight: bold;
        }

        .success-message p {
          margin: 0;
          font-size: 14px;
          line-height: 1.4;
        }

        .error-message {
          margin: 8px 0 0 0;
          padding: 8px 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 6px;
          color: #ef4444;
          font-size: 13px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
