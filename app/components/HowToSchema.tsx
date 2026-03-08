'use client';

import Script from 'next/script';

export function HowToSchema() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Use RecXchange to Split Recruitment Fees",
    "description": "Step-by-step guide for recruiters to collaborate and split fees on placements using RecXchange platform",
    "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png",
    "totalTime": "PT19D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "1"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "RecXchange account (Entry, Lite, or Pro tier)"
      },
      {
        "@type": "HowToSupply",
        "name": "Roles to fill or candidates to place"
      }
    ],
    "tool": [
      {
        "@type": "HowToTool",
        "name": "RecXchange Platform",
        "url": "https://app.recxchange.io"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Sign Up and Choose Your Tier",
        "text": "Create a RecXchange account and select your pricing tier: RecX Entry ($1/month, 5 tokens), RecX Lite ($99/month, 150 tokens, RecX Direct after 7 days), or RecX Pro ($250/month, 400 tokens, instant RecX Direct, 70% splits). No setup fees or long-term contracts required.",
        "url": "https://recxchange.io/pricing",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Post a Role or Upload Candidates",
        "text": "If you have a client role to fill, post it to the platform. If you have candidates seeking opportunities, upload their profiles. The Xchange Engine (AI matching) will automatically connect your role with recruiters who have matching candidates, or your candidates with relevant open roles from 15,000+ recruiters.",
        "url": "https://recxchange.io/recruiter",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Review Matches and Connect with Partners",
        "text": "Browse matched opportunities. If you posted a role, review candidate submissions from other recruiters. If you uploaded candidates, see which roles match their profiles. Contact partner recruiters to discuss collaboration and agree on fee split percentages (50/50, 60/40, or up to 70% on RecX Direct roles).",
        "url": "https://app.recxchange.io",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Submit Candidate and Finalize Agreement",
        "text": "Once you agree to collaborate, submit the candidate to the client. RecXchange automatically generates a timestamped split fee agreement protecting both parties. The agreement specifies the fee split percentage and payment terms. Average time to first placement: 19 days. Some recruiters fill roles within 48 hours using RecX Direct.",
        "url": "https://app.recxchange.io",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      },
      {
        "@type": "HowToStep",
        "position": 5,
        "name": "Placement and Fee Distribution",
        "text": "When the candidate is hired, the client pays the recruitment fee. RecXchange automatically splits the fee according to your agreement (e.g., 60/40 split on $15,000 = $9,000 to role holder + $6,000 to candidate provider). Pro members get priority payment processing (15-30 days). Average placement fee: $7,000.",
        "url": "https://recxchange.io/faq",
        "image": "https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Icon-GW-Small-25.png"
      }
    ],
    "yield": "Successful split fee placement with automated fee distribution. Average fee per deal: $7,000. RecX Direct roles offer up to 70% commission splits."
  };

  return (
    <Script
      id="howto-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
    />
  );
}
