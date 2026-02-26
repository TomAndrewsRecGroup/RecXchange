import { NextResponse } from 'next/server';

interface Role {
  id: string;
  source: 'recx_direct' | 'xchange';
  title: string;
  descriptionSnippet: string;
  company: string;
  location: string;
  workModel: 'remote' | 'hybrid' | 'onsite';
  industry: string;
  seniorityLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  roleType: string;
  postedAt: string;
  splitAmount?: number;
  splitCurrency?: string;
}

interface APIResponse {
  total: number;
  lastUpdated: string;
  roles: Role[];
}

// Currency conversion rates to USD (approximate, update regularly)
const CURRENCY_RATES: Record<string, number> = {
  'USD': 1,
  'GBP': 1.27,
  'EUR': 1.09,
  'CAD': 0.72,
  'AUD': 0.66,
  'SGD': 0.75,
  'AED': 0.27,
  'INR': 0.012,
  'ZAR': 0.055,
};

function convertToUSD(amount: number, currency: string): number {
  const rate = CURRENCY_RATES[currency] || 1;
  return amount * rate;
}

// Fallback demo data in case API is not available
const DEMO_ROLES: Role[] = [
  {
    id: 'demo-1',
    source: 'recx_direct',
    title: 'Principal AI Engineer',
    descriptionSnippet: 'Leading AI/ML team building next-generation recommendation systems. Python, TensorFlow, distributed systems experience required. Strong background in deep learning and NLP.',
    company: 'TechCorp',
    location: 'London, UK',
    workModel: 'hybrid',
    industry: 'Technology',
    seniorityLevel: 'senior',
    salaryMin: 120000,
    salaryMax: 160000,
    salaryCurrency: 'GBP',
    roleType: 'permanent',
    postedAt: '2026-02-20T09:00:00.000Z',
    splitAmount: 14000,
    splitCurrency: 'GBP'
  },
  {
    id: 'demo-2',
    source: 'xchange',
    title: 'Head of Talent Acquisition',
    descriptionSnippet: 'Strategic TA leader to build and scale talent function for high-growth fintech. Experience building teams from 100-500+. Strong employer branding and analytics focus.',
    company: 'FinTech Innovations',
    location: 'New York, US',
    workModel: 'hybrid',
    industry: 'Human Resources',
    seniorityLevel: 'executive',
    salaryMin: 150000,
    salaryMax: 200000,
    salaryCurrency: 'USD',
    roleType: 'permanent',
    postedAt: '2026-02-18T14:00:00.000Z',
    splitAmount: 18000,
    splitCurrency: 'USD'
  },
  {
    id: 'demo-3',
    source: 'recx_direct',
    title: 'Quantitative Researcher',
    descriptionSnippet: 'Systematic trading firm seeking quant researcher for alpha generation. Strong C++/Python, statistical modeling, and financial markets knowledge. PhD preferred.',
    company: 'Quantum Capital',
    location: 'Singapore',
    workModel: 'onsite',
    industry: 'Finance',
    seniorityLevel: 'senior',
    salaryMin: 180000,
    salaryMax: 250000,
    salaryCurrency: 'USD',
    roleType: 'permanent',
    postedAt: '2026-02-22T10:00:00.000Z',
    splitAmount: 25000,
    splitCurrency: 'USD'
  },
  {
    id: 'demo-4',
    source: 'xchange',
    title: 'Senior DevOps Engineer',
    descriptionSnippet: 'Cloud-native DevOps expert to lead infrastructure automation. AWS/GCP, Kubernetes, Terraform, CI/CD pipelines. Building highly scalable systems.',
    company: 'CloudScale',
    location: 'Remote',
    workModel: 'remote',
    industry: 'Technology',
    seniorityLevel: 'senior',
    salaryMin: 90000,
    salaryMax: 130000,
    salaryCurrency: 'GBP',
    roleType: 'permanent',
    postedAt: '2026-02-19T11:00:00.000Z',
    splitAmount: 11000,
    splitCurrency: 'GBP'
  },
  {
    id: 'demo-5',
    source: 'recx_direct',
    title: 'Marketing Director',
    descriptionSnippet: 'Growth marketing leader for B2B SaaS scale-up. Full-funnel expertise, team building, performance marketing, and brand strategy. 7+ years experience.',
    company: 'SaaS Ventures',
    location: 'Berlin, DE',
    workModel: 'hybrid',
    industry: 'Marketing',
    seniorityLevel: 'senior',
    salaryMin: 100000,
    salaryMax: 140000,
    salaryCurrency: 'EUR',
    roleType: 'permanent',
    postedAt: '2026-02-21T08:00:00.000Z',
    splitAmount: 15000,
    splitCurrency: 'EUR'
  },
  {
    id: 'demo-6',
    source: 'xchange',
    title: 'Cloud Solutions Architect',
    descriptionSnippet: 'Enterprise cloud architect for digital transformation projects. Azure specialist, architecture patterns, security, and client-facing experience required.',
    company: 'Digital Transformation Co',
    location: 'Austin, US',
    workModel: 'hybrid',
    industry: 'Technology',
    seniorityLevel: 'senior',
    salaryMin: 140000,
    salaryMax: 180000,
    salaryCurrency: 'USD',
    roleType: 'permanent',
    postedAt: '2026-02-17T13:00:00.000Z',
    splitAmount: 16000,
    splitCurrency: 'USD'
  },
  {
    id: 'demo-7',
    source: 'recx_direct',
    title: 'Product Manager - B2B',
    descriptionSnippet: 'Technical PM to own enterprise product roadmap. Strong API/platform experience, agile methodology, and stakeholder management. Computer science background preferred.',
    company: 'Platform Solutions',
    location: 'London, UK',
    workModel: 'hybrid',
    industry: 'Product',
    seniorityLevel: 'mid',
    salaryMin: 75000,
    salaryMax: 105000,
    salaryCurrency: 'GBP',
    roleType: 'permanent',
    postedAt: '2026-02-23T09:00:00.000Z',
    splitAmount: 9000,
    splitCurrency: 'GBP'
  },
  {
    id: 'demo-8',
    source: 'xchange',
    title: 'Senior Frontend Developer',
    descriptionSnippet: 'React specialist for consumer-facing product. Modern stack (Next.js, TypeScript, Tailwind), design systems, performance optimization. Strong UX sensibility.',
    company: 'ConsumerTech',
    location: 'Amsterdam, NL',
    workModel: 'remote',
    industry: 'Technology',
    seniorityLevel: 'senior',
    salaryMin: 70000,
    salaryMax: 95000,
    salaryCurrency: 'EUR',
    roleType: 'permanent',
    postedAt: '2026-02-16T12:00:00.000Z',
    splitAmount: 8500,
    splitCurrency: 'EUR'
  },
  {
    id: 'demo-9',
    source: 'recx_direct',
    title: 'Data Scientist',
    descriptionSnippet: 'ML-focused data scientist for personalization engine. Python, scikit-learn, SQL, A/B testing. Experience with recommendation systems and feature engineering.',
    company: 'E-commerce Plus',
    location: 'Toronto, CA',
    workModel: 'hybrid',
    industry: 'Technology',
    seniorityLevel: 'mid',
    salaryMin: 100000,
    salaryMax: 140000,
    salaryCurrency: 'CAD',
    roleType: 'permanent',
    postedAt: '2026-02-24T10:00:00.000Z',
    splitAmount: 13000,
    splitCurrency: 'CAD'
  },
  {
    id: 'demo-10',
    source: 'xchange',
    title: 'Legal Counsel - Commercial',
    descriptionSnippet: 'Commercial lawyer for high-growth tech company. Contract negotiation, SaaS agreements, M&A support. Common law qualification required, in-house experience preferred.',
    company: 'Legal Innovations',
    location: 'Dubai, UAE',
    workModel: 'onsite',
    industry: 'Legal',
    seniorityLevel: 'senior',
    salaryMin: 120000,
    salaryMax: 180000,
    salaryCurrency: 'USD',
    roleType: 'permanent',
    postedAt: '2026-02-15T07:00:00.000Z',
    splitAmount: 20000,
    splitCurrency: 'USD'
  }
];

export async function GET() {
  try {
    // Try to fetch from RecXchange backend API
    const response = await fetch('https://app.recxchange.io/api/public/roles', {
      headers: {
        'x-api-key': 'apaintballgunthatshootssausages'
      },
      cache: 'no-store' // Don't cache during development
    });

    if (!response.ok) {
      console.warn('Backend API not available, using demo data');
      // Return demo data if API fails
      return NextResponse.json({
        total: DEMO_ROLES.length,
        lastUpdated: new Date().toISOString(),
        roles: DEMO_ROLES,
        demo: true
      });
    }

    const data: APIResponse = await response.json();

    // Validate data structure
    if (!data.roles || !Array.isArray(data.roles)) {
      console.warn('Invalid data structure from API, using demo data');
      return NextResponse.json({
        total: DEMO_ROLES.length,
        lastUpdated: new Date().toISOString(),
        roles: DEMO_ROLES,
        demo: true
      });
    }

    // Filter roles based on requirements:
    // 1. All RecX Direct roles
    // 2. Only Xchange roles with >= $1,000 USD equivalent split
    const filteredRoles = data.roles.filter(role => {
      if (role.source === 'recx_direct') {
        return true; // Show all RecX Direct roles
      }
      
      // For Xchange roles, check split amount
      if (role.source === 'xchange' && role.splitAmount && role.splitCurrency) {
        const splitUSD = convertToUSD(role.splitAmount, role.splitCurrency);
        return splitUSD >= 1000; // Only show if >= $1,000 USD equivalent
      }
      
      return false; // Filter out if no split info
    });

    return NextResponse.json({
      total: filteredRoles.length,
      lastUpdated: data.lastUpdated,
      roles: filteredRoles,
      demo: false
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    // Return demo data as fallback
    return NextResponse.json({
      total: DEMO_ROLES.length,
      lastUpdated: new Date().toISOString(),
      roles: DEMO_ROLES,
      demo: true
    });
  }
}
