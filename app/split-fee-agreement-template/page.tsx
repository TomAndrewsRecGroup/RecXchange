import { safeJsonLd } from '@/lib/seo/jsonld';
import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import DownloadTextButton from '@/components/redesign/DownloadTextButton';
import {
  SectionHeading,
  GradientButton,
  GhostButton,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'Free Split-Fee Agreement Template | RecXchange',
  description:
    'A free, plain-English split-fee agreement template for recruiters: fee split, candidate ownership, payment terms, rebates, and dispute clauses. Download it, or let RecXchange generate agreements automatically.',
  alternates: {
    canonical: 'https://recxchange.io/split-fee-agreement-template',
  },
};

const sections = [
  {
    heading: '1. Parties and role',
    body: 'Full legal names and companies of the Role Holder (the recruiter who owns the job order and client relationship) and the Candidate Owner (the recruiter supplying the candidate), plus the role title, client name, and location the agreement covers.',
  },
  {
    heading: '2. Fee split',
    body: 'The percentage of the total placement fee due to each party, fixed before any candidate details are exchanged. State the gross fee basis (e.g. 15% of first-year salary) and the split (e.g. 50/50), and that the split applies to the fee actually received from the client.',
  },
  {
    heading: '3. Candidate ownership and introduction',
    body: 'The Candidate Owner warrants they have the candidate\'s consent to be represented. The introduction date and time are recorded; the candidate is considered introduced by the Candidate Owner for a protection period (commonly 12 months) for this client.',
  },
  {
    heading: '4. Payment terms',
    body: 'When the Candidate Owner is paid (e.g. within 14 days of the Role Holder receiving cleared client funds), the payment method, and what happens if the client pays late or short-pays.',
  },
  {
    heading: '5. Rebate and replacement',
    body: 'If the placed candidate leaves within the client\'s rebate period and a rebate is due, both parties refund their share in the same proportion as the original split. If a free replacement is made instead, no repayment is due.',
  },
  {
    heading: '6. Confidentiality and non-circumvention',
    body: 'Neither party may approach the other\'s client or candidate directly to bypass the agreement, for a stated period (commonly 12 months). Candidate and client details remain confidential to this placement.',
  },
  {
    heading: '7. Disputes',
    body: 'How disagreements are resolved: first by reference to the recorded timestamps and this agreement, then escalation (mediation or a named jurisdiction\'s courts). On RecXchange this clause is rarely needed because the record settles ownership automatically.',
  },
];

const templateText = `SPLIT-FEE PLACEMENT AGREEMENT
(Template provided by RecXchange - recxchange.io. This is a general template, not legal advice. Have a qualified adviser review it for your jurisdiction before use.)

1. PARTIES AND ROLE
Role Holder: [name, company, email]
Candidate Owner: [name, company, email]
Role: [job title] at [client company], [location]
Date of agreement: [date]

2. FEE SPLIT
Total placement fee basis: [e.g. 15% of first-year base salary]
Split: Role Holder [50]% / Candidate Owner [50]% of the fee actually received from the client.

3. CANDIDATE OWNERSHIP AND INTRODUCTION
The Candidate Owner confirms the candidate has consented to representation for this role.
Candidate introduced: [date and time recorded].
The candidate is deemed introduced by the Candidate Owner to this client for [12] months from the date above.

4. PAYMENT TERMS
The Role Holder invoices the client per their terms of business and pays the Candidate Owner their share within [14] days of receiving cleared funds, by [bank transfer].
If the client pays in instalments or short-pays, each payment is split at the agreed ratio.

5. REBATE AND REPLACEMENT
If a rebate becomes due to the client under the Role Holder's terms, each party refunds its share of the rebate in the same proportion as the split. If a free replacement candidate is provided instead, no refund is due between the parties.

6. CONFIDENTIALITY AND NON-CIRCUMVENTION
Neither party will approach the other's client or candidate directly to circumvent this agreement for [12] months. All candidate and client information exchanged is confidential to this placement.

7. DISPUTES
Disputes are resolved first by reference to the recorded introduction timestamps and this agreement, then by [mediation / the courts of [jurisdiction]].

SIGNED
Role Holder: ____________________  Date: ________
Candidate Owner: ____________________  Date: ________`;

const faqs = [
  {
    q: 'Do I really need a written split-fee agreement?',
    a: 'Yes. The most common way recruiters get burned in split-fee deals is a handshake arrangement where terms are "agreed" verbally and remembered differently after the placement. A written agreement fixing the split, payment timeline, and ownership before any candidate details change hands removes the argument entirely.',
  },
  {
    q: 'What should a split-fee agreement include?',
    a: 'Seven things: the parties and the role covered; the fee split percentages; candidate ownership and the introduction record; payment terms; rebate and replacement handling; confidentiality and non-circumvention; and a dispute clause. The free template on this page covers all seven.',
  },
  {
    q: 'Is this template legally binding?',
    a: 'It is a general template, not legal advice. Signed by both parties it forms a contract in most jurisdictions, but you should have a qualified adviser review it for your local law. On RecXchange, agreements are generated and accepted on-platform automatically, with every submission timestamped.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function AgreementTemplatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Free template"
            title={
              <>
                The split-fee agreement,{' '}
                <span className="grad-text">ready to use</span>
              </>
            }
            sub="Everything a split-fee agreement needs, in plain English: the split, ownership, payment, rebates, and disputes. Download it free, no email required."
          />
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <DownloadTextButton
              content={templateText}
              filename="recxchange-split-fee-agreement-template.txt"
              label="Download the template"
            />
            <GhostButton href="/blog/split-fee-agreement-guide">
              Read the full guide
            </GhostButton>
          </div>
        </Reveal>
      </section>

      {/* What's in it */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-16">
        <Reveal>
          <SectionHeading
            eyebrow="The seven clauses"
            title="What the template covers"
          />
        </Reveal>
        <div className="mt-10 space-y-4">
          {sections.map((s, i) => (
            <Reveal key={s.heading} delay={(i % 4) * 70}>
              <div className="glass rounded-2xl p-6">
                <h3 className="text-base font-bold text-white">{s.heading}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--rx-muted)]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-6 text-center text-xs text-[var(--rx-faint)]">
            This template is general information, not legal advice. Have a
            qualified adviser review it for your jurisdiction.
          </p>
        </Reveal>
      </section>

      {/* The automation pitch */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-16">
        <Reveal dir="scale">
          <div className="grad-border-hot rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
              Or never write one again
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[var(--rx-muted)]">
              On RecXchange, this entire agreement is generated, agreed, and
              recorded automatically before any candidate details are
              exchanged, with every submission timestamped. The template above
              is what the platform does for you on every single partnership.
            </p>
            <div className="mt-7">
              <GradientButton href={APP_REGISTER_URL} external>
                Automate it from $1/month
              </GradientButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Agreement questions" />
        </Reveal>
        <div className="mt-10 space-y-3">
          {faqs.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="group glass rounded-xl px-6 py-4">
                <summary className="cursor-pointer list-none text-[15px] font-semibold text-white flex items-center justify-between gap-4">
                  {item.q}
                  <span
                    className="grad-text text-xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--rx-muted)]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
        <Reveal delay={260}>
          <p className="mt-8 text-center text-sm text-[var(--rx-muted)]">
            New to the terminology?{' '}
            <Link
              href="/glossary"
              className="font-semibold grad-text hover:underline"
            >
              Check the split-fee glossary
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
