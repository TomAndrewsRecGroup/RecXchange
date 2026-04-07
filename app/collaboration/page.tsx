'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FuturisticBackground from '@/components/design-system/FuturisticBackground';
import HolographicCard from '@/components/design-system/HolographicCard';
import StatusBadge from '@/components/design-system/StatusBadge';
import NeonDivider from '@/components/design-system/NeonDivider';
import GlowButton from '@/components/design-system/GlowButton';
import LastUpdated from '@/components/LastUpdated';

export default function CollaborationPage() {
  return (
    <main className="relative bg-[#0a0a0f] min-h-screen overflow-hidden">
      <FuturisticBackground variant="default" />

      <div className="relative z-10 pt-16 sm:pt-20 md:pt-28 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8 md:mb-12 mt-6">
            <StatusBadge label="WHY RECXCHANGE EXISTS" color="fuchsia" />
            <h1
              className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2 mt-6"
              style={{ textShadow: '0 0 20px rgba(0,240,255,0.15)' }}
            >
              Collaboration Over Competition
            </h1>
            <NeonDivider width="w-40" color="mixed" />
            <p className="text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed px-2 mt-6">
              How one recruiter&apos;s impossible situation sparked a movement that is changing the way recruiters work, forever.
            </p>
          </motion.header>

          {/* Speakable Definition Block */}
          <section className="mb-8 sm:mb-12" data-speakable="true">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">What is recruiter collaboration?</h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Recruiter collaboration is the practice of specialist recruiters partnering on placements through a structured platform, sharing roles and candidates to fill positions neither could fill alone. On RecXchange, 15,000+ recruiters collaborate using legally binding split fee agreements, typically splitting fees 50/50 to 70/30. The platform handles matching, contracts, and fee protection automatically, so recruiters can focus on making placements rather than chasing paperwork.
            </p>
          </section>

          {/* Everyone Wins */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 sm:mb-12 md:mb-16">
            <HolographicCard color="fuchsia" variant="content" glowIntensity="high">
              <div className="text-center mb-6 sm:mb-8">
                <StatusBadge label="THE BELIEF" color="fuchsia" size="sm" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 mt-4">Everyone Wins.</h2>
                <p className="text-gray-300 text-[13px] sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                  The concept is proven. The belief is real. Collaboration within recruitment not only <em>can</em> exist; we believe it beats competition <strong className="text-white">every single day of the week.</strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8">
                {[
                  {
                    emoji: '&#128176;',
                    who: 'Recruiters Win',
                    color: 'cyan',
                    desc: 'Earn on roles you would have otherwise lost, and access live roles you never had before. Collaboration creates income where there was none.'
                  },
                  {
                    emoji: '&#127970;',
                    who: 'Clients Win',
                    color: 'fuchsia',
                    desc: 'Get the candidate who truly meets the spec. No compromise, no lowering the bar, no settling for second best. Just the right person, every time.'
                  },
                  {
                    emoji: '&#127919;',
                    who: 'Candidates Win',
                    color: 'purple',
                    desc: 'Get the role they have actually wanted. Not a near-miss pushed by a recruiter under pressure. The right fit, placed with purpose, every time.'
                  }
                ].map((item, i) => (
                  <HolographicCard key={i} color={item.color as any} variant="feature" className="flex flex-col">
                    <div className="text-3xl mb-3" dangerouslySetInnerHTML={{ __html: item.emoji }} />
                    <h3 className="font-bold text-base mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">{item.who}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">{item.desc}</p>
                  </HolographicCard>
                ))}
              </div>

              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 border border-fuchsia-400/20">
                <p className="text-white font-bold text-base sm:text-lg md:text-xl leading-relaxed">
                  &quot;Collaboration over competition isn&apos;t just a catchphrase; it&apos;s our belief and the core reason why RecXchange is here.&quot;
                </p>
                <p className="text-gray-400 text-xs sm:text-sm mt-2">Tom Andrews, CEO &amp; Co-Founder, RecXchange</p>
              </div>
            </HolographicCard>
          </motion.section>

          <NeonDivider width="w-full" color="mixed" />

          {/* The Origin Story */}
          <section className="my-8 sm:my-12 md:my-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <HolographicCard color="purple" variant="content">
                <StatusBadge label="THE ORIGIN STORY" color="purple" size="sm" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6 mt-4">
                  100+ Roles. One Recruiter. Zero Good Options.
                </h2>
                <div className="space-y-4 text-gray-300 text-[13px] sm:text-sm md:text-base leading-relaxed">
                  <p>
                    In 2024, <strong className="text-white">Tom Andrews</strong>, CEO &amp; Co-Founder of RecXchange, was in the first year of building his new recruitment agency. He was making serious waves. Great clients, strong relationships, and a desk with <strong className="text-white">15 live roles</strong> to work. By any measure, things were going well.
                  </p>
                  <p>
                    Then came the moment that changed everything.
                  </p>
                  <p>
                    Tom won a brand new client, a significant win, and that client opened up <strong className="text-white">all of their roles</strong>. Over <strong className="text-white">90 vacancies</strong>, handed to a solo recruiter who was already at capacity. Combined with his existing desk, Tom suddenly had over <strong className="text-white">100 open roles</strong> to work simultaneously.
                  </p>
                  <p>
                    The maths simply didn&apos;t work. A single recruiter cannot effectively work 100+ roles. But Tom had two things pulling at him from opposite directions: he wanted to prove himself to the new client who had placed enormous trust in him, and he absolutely refused to drop the ball on the existing clients who had built that trust with him over time.
                  </p>
                  <p>
                    He asked himself: <strong className="text-white">&quot;Is there a place where recruiters can genuinely collaborate? Where I can bring trusted partners in on roles without losing control or quality?&quot;</strong>
                  </p>
                  <p>
                    He looked. He searched. And what he found either didn&apos;t feel right, or it was so clunky and inefficient that it had clearly been <strong className="text-white">built by technologists who thought they understood recruitment; but clearly didn&apos;t.</strong>
                  </p>
                  <p>
                    The right platform simply did not exist. So he decided to build it.
                  </p>
                </div>
              </HolographicCard>
            </motion.div>
          </section>

          {/* The Partnership */}
          <section className="mb-8 sm:mb-12 md:mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <HolographicCard color="cyan" variant="content">
                <StatusBadge label="THE PARTNERSHIP" color="cyan" size="sm" />
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4 sm:mb-5 md:mb-6 mt-4">
                  Two Founders. One Vision.
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                    <div className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold text-sm mb-1 uppercase tracking-wider">Tom Andrews</div>
                    <div className="text-white font-bold text-base mb-2">CEO &amp; Co-Founder</div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      14+ years in recruitment. Lived the pain of trying to scale a desk solo. Knows exactly what recruiters need because he is one.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-fuchsia-400/5 border border-fuchsia-400/20">
                    <div className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent font-bold text-sm mb-1 uppercase tracking-wider">James Brown</div>
                    <div className="text-white font-bold text-base mb-2">CTO &amp; Co-Founder</div>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      Expert in Technology, Automation, and AI. Builds the systems that make collaboration seamless, intelligent and scalable.
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-gray-300 text-[13px] sm:text-sm md:text-base leading-relaxed">
                  <p>
                    Tom took the problem to his business partner, <strong className="text-white">James Brown</strong>, CTO &amp; Co-Founder, who brought deep expertise in technology, automation, and AI to the table. Together, they asked a simple question: what would a collaboration platform look like if it was designed <em>by recruiters, for recruiters</em>?
                  </p>
                  <p>
                    Not a job board. Not a LinkedIn clone. Not another clunky marketplace built by engineers who&apos;ve never picked up the phone to a candidate. Something genuinely purpose-built for the way recruiters actually work; fast-paced, relationship-driven, and results-obsessed.
                  </p>
                  <p>
                    That&apos;s what they set out to build. And that&apos;s <strong className="text-white">RecXchange</strong>.
                  </p>
                </div>
              </HolographicCard>
            </motion.div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* The Philosophy */}
          <section className="my-8 sm:my-12 md:my-16">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 px-2">The RecXchange Philosophy</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">Work smart. Collaborate where it counts. Win more.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-stretch">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
                <HolographicCard color="cyan" variant="content" className="flex-1">
                  <StatusBadge label="WORK IT SOLO" color="cyan" size="sm" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 mt-4">When to Keep the Full Fee</h3>
                  <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-4">
                    Not every role needs a partner. If the role is in your lane, you already have the candidates, and you have the bandwidth, then work it. Deliver, place, and take 100% of the fee. That&apos;s exactly how it should be.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-[13px] sm:text-sm">
                    {[
                      'The role sits squarely in your specialism',
                      'You already have the right candidates in your network',
                      'You have the time and capacity to work it properly',
                      'You have a strong, direct relationship with the client',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-cyan-400 mt-0.5 flex-shrink-0">&#10003;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </HolographicCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
                <HolographicCard color="fuchsia" variant="content" className="flex-1">
                  <StatusBadge label="COLLABORATE" color="fuchsia" size="sm" />
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 sm:mb-4 mt-4">When to Bring in a Partner</h3>
                  <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-4">
                    <strong className="text-white">50% of the fee is infinitely better than 0%.</strong> And telling a client &quot;sorry, we can&apos;t fill it&quot; or &quot;it&apos;s a tough market&quot; costs you far more than the fee; it costs you the relationship. Collaborate instead.
                  </p>
                  <ul className="space-y-2 text-gray-300 text-[13px] sm:text-sm">
                    {[
                      "You've exhausted your candidate network for this role",
                      'The role is slightly outside your core specialism',
                      "You're at capacity and can't give it the time it deserves",
                      'You want to protect your client relationship above all else',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-fuchsia-400 mt-0.5 flex-shrink-0">&#10003;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </HolographicCard>
              </motion.div>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* Two Recruiter Archetypes */}
          <section className="my-8 sm:my-12 md:my-16">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3 px-2">RecXchange is Built for Every Recruiter</h2>
              <p className="text-gray-400 text-[13px] sm:text-sm md:text-base px-2">Two different strengths. One platform. Unlimited opportunity.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-stretch">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
                <HolographicCard color="purple" variant="content" className="flex-1">
                  <div className="text-4xl mb-4">&#129309;</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">The Relationship-Led Recruiter</h3>
                  <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-4">
                    You live for Business Development. You have incredible client relationships, a packed role pipeline, and a reputation that speaks for itself. But you can&apos;t work every role at full speed, and you refuse to let your clients down.
                  </p>
                  <div className="p-4 rounded-xl bg-purple-400/5 border border-purple-400/20">
                    <p className="text-purple-300 text-xs sm:text-sm font-semibold">
                      RecXchange connects you with world-class sourcers who find the candidates while you keep the client relationship. You share the fee. Everyone delivers.
                    </p>
                  </div>
                </HolographicCard>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
                <HolographicCard color="cyan" variant="content" className="flex-1">
                  <div className="text-4xl mb-4">&#127919;</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3">The World-Class Sourcer</h3>
                  <p className="text-gray-300 text-[13px] sm:text-sm leading-relaxed mb-4">
                    You are exceptional at finding people. Speaking to candidates all day is where you thrive. But Business Development? Cold calling clients? Not your thing, and that&apos;s completely fine.
                  </p>
                  <div className="p-4 rounded-xl bg-cyan-400/5 border border-cyan-400/20">
                    <p className="text-cyan-300 text-xs sm:text-sm font-semibold">
                      RecXchange gives you a live feed of real roles to work right now. No BD required. Just source, submit, collaborate and earn, doing what you do best.
                    </p>
                  </div>
                </HolographicCard>
              </motion.div>
            </div>
          </section>

          <NeonDivider width="w-full" color="mixed" />

          {/* CTA */}
          <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="my-8 sm:my-12 md:my-16">
            <HolographicCard color="purple" variant="content" glowIntensity="high" className="text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2">
                Ready to Stop Competing and Start Collaborating?
              </h2>
              <p className="text-gray-300 text-[13px] sm:text-sm md:text-base mb-5 sm:mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Join thousands of recruiters already earning more, delivering more, and building something bigger together on RecXchange.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <GlowButton variant="primary" size="md" href="/recruiter">Join as Recruiter</GlowButton>
                <GlowButton variant="secondary" size="md" href="/split-fees">Learn About Split Fees</GlowButton>
                <GlowButton variant="secondary" size="md" href="/why-recxchange">Why RecXchange?</GlowButton>
              </div>
            </HolographicCard>
          </motion.section>

          <div className="mt-8 sm:mt-10 md:mt-12">
            <LastUpdated date="2026-03-13" />
          </div>

        </div>
      </div>
    </main>
  );
}
