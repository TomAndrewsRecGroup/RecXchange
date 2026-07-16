import type { Metadata } from 'next';
import Link from 'next/link';
import Reveal from '@/components/redesign/Reveal';
import {
  GradientButton,
  SectionHeading,
  GlassCard,
  Stat,
} from '@/components/redesign/ui';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const metadata: Metadata = {
  title: 'Why RecXchange | Deal Protection, Scale, and Proof',
  description:
    'Why 15,000+ recruiters trust RecXchange: timestamped submissions, automated split-fee contracts, a vetted network, and $750K+ in live fees at any moment.',
  alternates: { canonical: 'https://recxchange.io/why-recxchange' },
};

const protections = [
  {
    title: 'Timestamped candidate ownership',
    body: 'Every submission is recorded to the second. If a dispute ever arises over who introduced a candidate, the record settles it instantly - no arguments, no lost fees.',
  },
  {
    title: 'Contracts before contact',
    body: 'The split-fee agreement is generated and accepted before candidate details are exchanged. Terms can’t drift after the fact because they’re locked before the fact.',
  },
  {
    title: 'A network that is actually vetted',
    body: 'Every member is verified as a working recruiter. No candidates posing as recruiters, no employers fishing for CVs, no noise.',
  },
  {
    title: 'Transparent live inventory',
    body: `The ${STATS.liveRoles} roles and ${STATS.liveFees} in fees on the board are real and public. You can inspect the marketplace before you spend a penny.`,
  },
];

export default function WhyRecXchangePage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 sm:px-6 pt-20 sm:pt-28 pb-14 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Why RecXchange"
            title={
              <>
                Collaboration only works when{' '}
                <span className="grad-text">nobody can get burned</span>
              </>
            }
            sub="Split-fee recruitment has existed for decades. What stopped it scaling was trust. We fixed the trust problem with engineering, not promises."
          />
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-16">
        <Reveal>
          <div className="glass rounded-2xl px-6 py-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value={STATS.recruiters} label="Vetted recruiters" />
            <Stat value={STATS.candidates} label="Candidate profiles" />
            <Stat value={STATS.liveFees} label="Fees live now" live />
            <Stat value={STATS.avgPlacement} label="Avg. recruiter cut" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
        <Reveal>
          <SectionHeading
            eyebrow="Deal protection"
            title="Four guarantees, built into the product"
          />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {protections.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <GlassCard className="h-full">
                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--rx-muted)]">
                  {p.body}
                </p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 pb-20">
        <Reveal dir="scale">
          <div className="grad-border rounded-3xl p-8 sm:p-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
              Built by recruiters, not by a software company guessing
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--rx-muted)]">
              RecXchange was founded by Tom Andrews - 14+ years running desks
              across engineering, building materials and healthcare - and James
              Brown, the CTO behind the Xchange matching engine. Every
              protection in the platform exists because one of us was burned
              without it at some point.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[var(--rx-muted)]">
              The result is a marketplace where partnering with a stranger on a
              placement is safer than most handshake deals with people you
              know.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl font-black tracking-tight text-white [text-wrap:balance]">
            Judge it by the live board
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--rx-muted)]">
            {STATS.liveFees} in fees is on the table right now.{' '}
            <Link href="/roles" className="grad-text font-semibold hover:underline">
              Go and look
            </Link>{' '}
            - then decide.
          </p>
          <div className="mt-8">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Join now
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
