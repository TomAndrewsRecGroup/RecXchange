import { safeJsonLd } from '@/lib/seo/jsonld';
import type { Metadata } from 'next';
import Reveal from '@/components/redesign/Reveal';
import RolesExplorer from '@/components/redesign/RolesExplorer';
import { SectionHeading, Stat, GradientButton } from '@/components/redesign/ui';
import { getRoles } from '@/lib/roles/fetch';
import { APP_REGISTER_URL, STATS } from '@/lib/redesign/site';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Live Roles | Split-Fee Recruitment Marketplace | RecXchange',
  description:
    'Browse live split-fee roles on RecXchange. Real placement fees, agreed splits, and RecX Direct roles paying up to 70% to the recruiter who delivers the candidate.',
  alternates: { canonical: 'https://recxchange.io/roles' },
};

export default async function RolesPage() {
  const { roles, total } = await getRoles();

  const directCount = roles.filter((r) => r.source === 'recx_direct').length;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Live split-fee recruitment roles on RecXchange',
    numberOfItems: total,
    itemListElement: roles.slice(0, 50).map((role, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://recxchange.io/roles/${role.id}`,
      name: role.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }}
      />
      <section className="mx-auto max-w-6xl px-4 sm:px-6 pt-20 sm:pt-24 pb-10 text-center">
        <Reveal>
          <SectionHeading
            as="h1"
            eyebrow="Live marketplace"
            title={
              <>
                {total} roles, <span className="grad-text">real fees</span>
              </>
            }
            sub="Every role below has an agreed fee and a fixed split. Find one that matches a candidate you already know, and the placement is yours to share."
          />
        </Reveal>
        <Reveal delay={140}>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-6">
            <Stat value={String(total)} label="Open roles" live />
            <Stat value={String(directCount)} label="RecX Direct roles" />
            <Stat value={STATS.maxSplit} label="Top split available" />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-16">
        <Reveal delay={100}>
          <RolesExplorer roles={roles} />
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-2xl sm:text-3xl font-extrabold text-white [text-wrap:balance]">
            Got a candidate for one of these?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[var(--rx-muted)]">
            Join the network to submit candidates, lock in your split, and get
            paid when they place.
          </p>
          <div className="mt-7">
            <GradientButton href={APP_REGISTER_URL} external size="lg">
              Join and submit a candidate
            </GradientButton>
          </div>
        </Reveal>
      </section>
    </>
  );
}
