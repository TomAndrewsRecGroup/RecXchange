'use client';

import { useState, type FormEvent } from 'react';
import { SUPPORT_EMAIL } from '@/lib/redesign/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const inputClasses =
  'w-full rounded-xl border border-[var(--rx-line)] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-[var(--rx-faint)] focus:border-[var(--rx-violet)] focus:outline-none transition-colors';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          typeof json.error === 'string'
            ? json.error
            : 'Something went wrong. Please try again.'
        );
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(
        err instanceof Error
          ? err.message
          : `Something went wrong. Please email ${SUPPORT_EMAIL} directly.`
      );
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="grad-border rounded-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <p className="text-2xl mb-2" aria-hidden="true">
          ✓
        </p>
        <h3 className="text-lg font-bold text-white mb-2">Message sent</h3>
        <p className="text-sm text-[var(--rx-muted)]">
          Thanks — we&apos;ve got it. We reply to everything, usually within
          one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-semibold text-white"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            className={inputClasses}
            placeholder="Your name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-semibold text-white"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            maxLength={254}
            autoComplete="email"
            className={inputClasses}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-company"
            className="mb-1.5 block text-sm font-semibold text-white"
          >
            Company <span className="text-[var(--rx-faint)]">(optional)</span>
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            maxLength={160}
            autoComplete="organization"
            className={inputClasses}
            placeholder="Company name"
          />
        </div>
        <div>
          <label
            htmlFor="contact-reason"
            className="mb-1.5 block text-sm font-semibold text-white"
          >
            I&apos;m contacting you as
          </label>
          <select
            id="contact-reason"
            name="reason"
            className={inputClasses}
            defaultValue="recruiter"
          >
            <option value="recruiter">A recruiter</option>
            <option value="employer">An employer hiring for a role</option>
            <option value="other">Something else</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-semibold text-white"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          className={inputClasses}
          placeholder="Tell us about your role, your question, or your desk…"
        />
      </div>

      {/* Honeypot — hidden from real users, bots fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-sm font-semibold text-white bg-[linear-gradient(100deg,#8b5cf6,#3b82f6_55%,#22d3ee)] shadow-[0_2px_16px_rgba(139,92,246,0.4)] transition-all hover:shadow-[0_2px_24px_rgba(59,130,246,0.55)] disabled:opacity-60 disabled:cursor-not-allowed motion-reduce:transition-none"
      >
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
