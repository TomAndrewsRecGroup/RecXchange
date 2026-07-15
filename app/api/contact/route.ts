import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

const SUPPORT_EMAIL = 'support@recxchange.io';
const FROM_EMAIL = 'hello@recxchange.io';

const REASONS = ['recruiter', 'employer', 'other'] as const;
type Reason = (typeof REASONS)[number];

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  reason?: unknown;
  message?: unknown;
  website?: unknown; // honeypot - real users never fill this
}

function str(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > max) return null;
  return trimmed;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: NextRequest) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Honeypot: silently accept and drop bot submissions
  if (typeof body.website === 'string' && body.website.trim() !== '') {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 254);
  const company = str(body.company, 160); // optional
  const message = str(body.message, 5000);
  const reason: Reason = REASONS.includes(body.reason as Reason)
    ? (body.reason as Reason)
    : 'other';

  if (!name || !message) {
    return NextResponse.json(
      { error: 'Please fill in your name and a message.' },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 }
    );
  }

  if (!process.env.SENDGRID_API_KEY) {
    console.error('[contact] SENDGRID_API_KEY not configured');
    return NextResponse.json(
      { error: `Email is temporarily unavailable. Please email ${SUPPORT_EMAIL} directly.` },
      { status: 503 }
    );
  }

  const reasonLabel =
    reason === 'recruiter'
      ? 'Recruiter enquiry'
      : reason === 'employer'
        ? 'Employer / hiring enquiry'
        : 'General enquiry';

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    `Reason: ${reasonLabel}`,
    '',
    message,
  ].filter((l): l is string => l !== null);

  try {
    await sgMail.send({
      to: SUPPORT_EMAIL,
      from: { email: FROM_EMAIL, name: 'RecXchange Website' },
      replyTo: { email, name },
      subject: `[Contact] ${reasonLabel} - ${name}`,
      text: lines.join('\n'),
      html: `<div style="font-family:sans-serif;font-size:14px;line-height:1.6">${lines
        .map((l) => escapeHtml(l))
        .join('<br/>')}</div>`,
    });
  } catch (err) {
    console.error('[contact] SendGrid send failed:', err);
    return NextResponse.json(
      { error: `Something went wrong sending your message. Please email ${SUPPORT_EMAIL} directly.` },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
