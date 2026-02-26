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

export async function GET() {
  try {
    // Fetch from RecXchange backend API
    const response = await fetch('https://app.recxchange.io/api/public/roles', {
      headers: {
        'x-api-key': 'apaintballgunthatshootssausages'
      },
      next: { revalidate: 300 } // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error('Failed to fetch roles from backend');
    }

    const data: APIResponse = await response.json();

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
      roles: filteredRoles
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}
