/**
 * HowTo Schema Generator for SEO/GEO Optimization
 * 
 * Creates structured data for step-by-step guides that AI engines
 * and search engines can understand and feature in results.
 * 
 * Used for:
 * - Process documentation
 * - Tutorial content
 * - Workflow guides
 * - "How to" pages
 */

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToSchemaParams {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format (e.g., "PT30M" = 30 minutes)
  estimatedCost?: {
    currency: string;
    value: string;
  };
  supply?: string[]; // Required materials/prerequisites
  tool?: string[]; // Required tools
}

/**
 * Generate HowTo schema markup
 * 
 * @example
 * const schema = generateHowToSchema({
 *   name: "How to Make Your First Split Fee Placement",
 *   description: "Complete guide to earning split fees on RecXchange",
 *   steps: [
 *     {
 *       name: "Sign up and choose tier",
 *       text: "Create account and select pricing tier",
 *       url: "https://app.recxchange.io/register"
 *     },
 *     // ... more steps
 *   ],
 *   totalTime: "PT19D", // 19 days average
 *   estimatedCost: { currency: "USD", value: "1.00" }
 * });
 */
export function generateHowToSchema(params: HowToSchemaParams) {
  const {
    name,
    description,
    steps,
    totalTime,
    estimatedCost,
    supply,
    tool
  } = params;

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.url && { "url": step.url }),
      ...(step.image && { "image": step.image })
    })),
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value
      }
    }),
    ...(supply && supply.length > 0 && { "supply": supply }),
    ...(tool && tool.length > 0 && { "tool": tool })
  };

  return schema;
}

/**
 * Pre-built HowTo schemas for RecXchange pages
 */

export const collaborationHowToSchema = generateHowToSchema({
  name: "How to Make Money with Split Fee Recruitment on RecXchange",
  description: "Step-by-step guide to earning split fees as a recruiter on the RecXchange platform. Average time to first placement: 19 days.",
  totalTime: "PT19D",
  estimatedCost: {
    currency: "USD",
    value: "1.00"
  },
  steps: [
    {
      name: "Sign up and choose pricing tier",
      text: "Create a RecXchange account and select your membership tier: Entry ($1/month with 5 tokens), Lite ($99/month with 150 tokens), or Pro ($249/month with 400 tokens). Pro tier gives instant access to RecX Direct premium roles with up to 70% commission.",
      url: "https://app.recxchange.io/register"
    },
    {
      name: "Post a role or upload a candidate",
      text: "If you have a role you need help filling, post it with job details and your preferred fee split percentage (50/50, 60/40, or 70/30). If you have a candidate seeking opportunities, upload their profile with skills, experience, and availability. Set your fee split preference."
    },
    {
      name: "Get matched by the Xchange Engine",
      text: "RecXchange's AI-powered Xchange Engine analyzes your posting and automatically matches you with relevant partners from the network of 15,000+ recruiters. You'll receive instant notifications when potential matches are found. Filter partners by specialization, geography, success rate, and rating."
    },
    {
      name: "Review and connect with partners",
      text: "Review partner profiles showing their specializations, success rate, average time-to-fill, and reviews from other recruiters. Initiate contact through the platform's messaging system. Discuss role details, candidate qualifications, and confirm fee split terms (all automated in contracts)."
    },
    {
      name: "Collaborate to screen and present",
      text: "Work together to screen candidates or match them to roles. Share relevant details while keeping sensitive information protected until both parties agree. Present the candidate to the client as a unified team. RecXchange timestamps all submissions automatically for deal protection."
    },
    {
      name: "Close the placement and split fees",
      text: "When the placement succeeds and candidate is hired, fees are automatically split according to your pre-agreed contract. Standard splits are 50/50 for collaborative roles, 60/40 for specialized partnerships, or up to 70% on RecX Direct premium roles. Payments processed in 15-45 days depending on tier."
    },
    {
      name: "Build reputation and access premium roles",
      text: "After successful placements, both parties leave reviews. Higher ratings unlock access to more premium RecX Direct roles with 70% commissions, priority matching, and dedicated account management. Top-rated recruiters become preferred partners in the network."
    }
  ],
  supply: [
    "Active recruiter license or recruitment business",
    "Candidate database or client relationships",
    "Email and phone for candidate communication"
  ],
  tool: [
    "RecXchange platform account",
    "Internet connection",
    "Email and calendar for scheduling"
  ]
});

export const recXDirectHowToSchema = generateHowToSchema({
  name: "How to Access RecX Direct Premium Roles with 70% Commission",
  description: "Guide to unlocking RecX Direct premium client roles offering up to 70% commission splits on RecXchange platform.",
  totalTime: "PT7D",
  estimatedCost: {
    currency: "USD",
    value: "99.00"
  },
  steps: [
    {
      name: "Choose the right membership tier",
      text: "RecX Direct access requires either Lite ($99/month) or Pro ($249/month) membership. Pro members get instant access, while Lite members must be active on the platform for 7 days first. Pro tier also offers 70% splits vs 60% on Lite.",
      url: "https://recxchange.io/pricing"
    },
    {
      name: "Complete your recruiter profile",
      text: "Fill out your complete recruiter profile including specializations, industries, geographic coverage, and past placement experience. RecX Direct clients want to see proven expertise. Add your LinkedIn profile and any certifications."
    },
    {
      name: "Build initial platform reputation",
      text: "For Lite members: Actively use the platform for 7 days by posting roles, submitting candidates, and engaging with other recruiters. Complete at least 3 quality actions (submissions, posts, or collaborations). This ensures you understand the platform before accessing premium roles."
    },
    {
      name: "Access RecX Direct role board",
      text: "Once unlocked, navigate to the RecX Direct section in your dashboard. You'll see exclusive client roles marked with 'RecX Direct' badge showing higher commission percentages (60-70%). These are pre-vetted urgent client needs with approved budgets."
    },
    {
      name: "Submit qualified candidates quickly",
      text: "RecX Direct roles are time-sensitive. Submit your best-matched candidates within 24-48 hours. Include detailed profiles highlighting how candidate meets specific job requirements. Pro members get priority in the submission queue."
    },
    {
      name: "Work with dedicated account manager",
      text: "Pro members receive dedicated account manager support for RecX Direct placements. They coordinate with the client, handle interview scheduling, and expedite the hiring process. Average time-to-placement on RecX Direct roles: 12-18 days."
    },
    {
      name: "Receive higher commission and faster payment",
      text: "When placement succeeds, earn 60% (Lite) or 70% (Pro) of the total fee instead of standard 50%. Payments processed in 15-30 days (vs 30-45 days for standard roles). Example: $18,000 placement at 70% = $12,600 to you vs $9,000 at 50%."
    }
  ],
  supply: [
    "Candidate database or sourcing capability",
    "Industry-specific expertise",
    "Proven placement track record"
  ],
  tool: [
    "RecXchange Lite or Pro membership",
    "LinkedIn Recruiter (recommended)",
    "ATS or candidate tracking system"
  ]
});
