'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickActionFormProps {
  actionType: 'match_candidate' | 'explain_recx_direct';
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

const ACTION_CONFIG = {
  match_candidate: {
    placeholder: 'Your email address',
    buttonText: 'Send me 3 matching roles',
    successMessage: 'Great! We\'ll send you 3 matching roles within 24 hours.',
    ghlTag: 'quick-action-match-candidate',
    emailSubject: 'RecXchange - Match My Candidate',
  },
  explain_recx_direct: {
    placeholder: 'Your email address',
    buttonText: 'Email me the explainer',
    successMessage: 'Perfect! Check your inbox for the RecX Direct explainer and fee pool.',
    ghlTag: 'quick-action-recx-direct',
    emailSubject: 'RecXchange - RecX Direct Info',
  },
};

export default function QuickActionForm({ 
  actionType, 
  placeholder, 
  buttonText,
  className = '' 
}: QuickActionFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const config = ACTION_CONFIG[actionType];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          actionType,
          source: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setStatus('success');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Quick action error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  };

  return (
    <div className={`quick-action-form ${className}`}>
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
            <p>{config.successMessage}</p>
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
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder || config.placeholder}
                disabled={status === 'loading'}
                required
                className="email-input"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="submit-button"
              >
                {status === 'loading' ? (
                  <span className="loading-spinner" />
                ) : (
                  buttonText || config.buttonText
                )}
              </button>
            </div>
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
        .quick-action-form {
          width: 100%;
          max-width: 500px;
        }

        .form-content {
          width: 100%;
        }

        .input-group {
          display: flex;
          gap: 8px;
          width: 100%;
        }

        .email-input {
          flex: 1;
          padding: 14px 18px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: #fff;
          font-size: 15px;
          transition: all 0.2s;
        }

        .email-input:focus {
          outline: none;
          border-color: #00ffff;
          background: rgba(255, 255, 255, 0.08);
        }

        .email-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .submit-button {
          padding: 14px 24px;
          background: linear-gradient(135deg, #00ffff, #c71df1);
          border: none;
          border-radius: 8px;
          color: #000;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
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
          border: 2px solid #000;
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
        }
      `}</style>
    </div>
  );
}
