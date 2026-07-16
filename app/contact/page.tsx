import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import ContactForm from '@/components/redesign/ContactForm';
import { SectionHeading } from '@/components/redesign/ui';
import { SUPPORT_EMAIL } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'Contact RecXchange | We Reply Within One Business Day',
  description:
    'Get in touch with RecXchange - recruiters, employers with roles to fill, or anything else. Use the form or email support@recxchange.io.',
  alternates: { canonical: 'https://recxchange.io/contact' },
};

export default function ContactPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-12 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title={
              <>
                Talk to a <span className="grad-text">human</span>
              </>
            }
            sub="Hiring for a role, joining as a recruiter, or anything in between - send it over and we'll reply within one business day."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-2xl px-4 sm:px-6 pb-10">
        <Reveal delay={100}>
          <ContactForm />
        </Reveal>
      </section>

      <section className="mx-auto max-w-2xl px-4 sm:px-6 pb-24 text-center">
        <Reveal delay={160}>
          <p className="text-sm text-[var(--rx-muted)]">
            Prefer email? Write to{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold grad-text hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
        </Reveal>
      </section>
    </>
  );
}
