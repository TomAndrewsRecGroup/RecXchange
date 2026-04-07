// HomepageSEOContent — server component, injected in layout for / route only.
//
// PURPOSE: The homepage (app/page.tsx) is 'use client'. Crawlers see an empty
// shell on first load — hero text, stat labels, card copy are all JS-rendered.
// This component injects the same key content as hidden HTML that crawlers
// parse as real body text, without any visual impact whatsoever.
//
// VISIBILITY: position absolute, opacity 0, height 0, overflow hidden,
// pointer-events none, aria-hidden true. Invisible to users in every browser.
// Google, GPTBot, PerplexityBot etc. parse it as normal body content.
//
// DO NOT add display:none — some crawlers skip display:none content.
// The current approach (opacity+height+overflow) is crawler-visible.

export default function HomepageSEOContent() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        opacity: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: -9999,
      }}
    >
      <h1>RecXchange: Recruiter Collaboration Platform | 15,000+ Split Fee Network</h1>

      <p>
        RecXchange is a recruiter collaboration platform where 15,000+ specialist recruiters
        partner on placements and split fees automatically. Post roles to find candidates,
        or share candidates to find roles. Split fees from 50/50 up to 70% on RecX Direct roles.
        Access 270 million candidate profiles. Over $750,000 in active placement fees across
        100+ live roles. Recruiters earn an average of $7,000 per placement, their cut after
        the split, not the total fee divided.
      </p>

      <h2>For Recruiters</h2>
      <p>
        Join 15,000+ vetted specialist recruiters on RecXchange. Post your live roles to find
        candidates from the network, or upload your candidates to match them against hundreds
        of live roles instantly. The Xchange Engine, RecXchange's AI-powered matching system,
        automatically connects your roles and candidates to the most relevant partners in seconds.
        Earn up to 70% commission on RecX Direct roles (operated by Andrews Recruitment Group
        t/a RecX Direct). Automated split fee contracts. Timestamped deal protection.
        Search 270 million candidates across every sector and geography.
      </p>

      <h2>For Hiring Managers</h2>
      <p>
        RecXchange gives hiring managers access to 15,000+ specialist recruiters through a
        single dedicated Account Manager. We post your role to the full network immediately.
        Thousands of specialist recruiters compete to source the best candidates for your
        vacancy. You receive one shortlist, coordinate one interview process, and pay one
        success fee of 12 to 20% only on placement. No retainer. No upfront cost. No commitment.
        Test your brief in strategic mode before going live.
      </p>

      <h2>Split Fee Recruitment</h2>
      <p>
        Split fee recruitment is a collaborative model where two specialist recruiters partner
        on a single placement. The role-holding recruiter partners with the candidate-holding
        recruiter. The placement fee is split between them, typically 50/50, 60/40, or up to
        70/30 on RecX Direct. RecXchange automates the entire process: matching, agreements,
        submissions, and fee distribution. All split fee agreements are timestamped and
        legally binding before any candidate data is shared.
      </p>

      <h2>RecX Direct</h2>
      <p>
        RecX Direct is RecXchange's premium hiring product operated by Andrews Recruitment
        Group t/a RecX Direct (UK). Candidate-holding recruiters earn up to 70% of the total
        placement fee on RecX Direct roles, compared to 50% on standard collaborative roles.
        RecX Direct roles are exclusive client partnerships negotiated directly by Andrews
        Recruitment Group. Payment processing is faster: 15 to 30 days versus 30 to 45 days on
        standard roles.
      </p>

      <h2>The Xchange Engine</h2>
      <p>
        The Xchange Engine is RecXchange's AI-powered role-to-recruiter matching technology.
        It analyses each role's fingerprint across sector, seniority, location, salary band,
        and technical requirements, then ranks and alerts the most relevant specialist
        recruiters in real time. When you post a role, the right recruiters are notified
        within seconds. When you upload a candidate, they are matched against every live
        role on the platform automatically.
      </p>

      <h2>Pricing</h2>
      <p>
        RecXchange offers three subscription tiers for recruiters: RecX Entry at $1 per month
        (5 tokens, basic collaborative role and candidate access), RecX Lite at $99 per month
        (150 tokens, RecX Direct access after 7 days), and RecX Pro at $249 per month
        (400 tokens, instant RecX Direct access, up to 70% fee splits). Hiring managers pay
        no subscription, only a success fee of 12 to 20% on placement.
      </p>

      <h2>Deal Protection</h2>
      <p>
        RecXchange's Deal Protection system timestamps every candidate submission at the
        moment of upload. Automated split fee contracts are generated and agreed before
        any candidate data is shared between recruiters. This eliminates disputes over
        candidate ownership and ensures every recruiter is paid correctly and on time.
      </p>

      <h2>About RecXchange</h2>
      <p>
        RecXchange is operated by RecXchange Portal LLC t/a RecXchange, registered in the
        UAE. Co-founded in 2024 by Tom Andrews (CEO and Co-Founder, also Owner and
        Recruitment Director of Andrews Recruitment Group, https://andrews-recruitment.com)
        and James Brown (CTO and Co-Founder). The RecXchange website was fully designed,
        developed and is maintained by AMIVY Designs, an Andrews Recruitment Group company.
        RecX Direct is operated by Andrews Recruitment Group t/a RecX Direct (UK).
        The platform is available at app.recxchange.io. This marketing website at
        recxchange.io provides product information, pricing, guides, and educational content.
      </p>

      <h2>Sectors</h2>
      <p>
        RecXchange covers specialist recruitment across Technology, Engineering, Healthcare,
        Finance, Sales, HR and People, Legal, and Construction and Built Environment.
        Roles are available across the United Kingdom (London, Manchester, Birmingham,
        nationwide), United States, United Arab Emirates, Australia, South Africa,
        and Europe including cross-border international placements.
      </p>
    </div>
  );
}
