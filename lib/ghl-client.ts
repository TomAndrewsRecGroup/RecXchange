/**
 * GoHighLevel API Client
 * 
 * Provides functions to interact with GHL API for contact and tag data
 */

export interface GHLContact {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
  dateAdded?: string;
  source?: string;
  customFields?: Record<string, any>;
}

export interface GHLTierData {
  tier: 'os subs entry' | 'os subs lite' | 'os subs pro' | 'os subs teams';
  count: number;
  contacts: GHLContact[];
}

export interface GHLConversionData {
  totalContacts: number;
  websiteTaggedContacts: number;
  tieredSignups: GHLTierData[];
  totalTieredSignups: number;
  conversionRate: number;
  period: {
    start: Date;
    end: Date;
  };
}

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

// Common website-related tag patterns to detect
// These should match tags applied via trigger links and contact forms
const WEBSITE_TAG_PATTERNS = [
  'website',
  'recxchange',
  'web form',
  'contact form',
  'cta',
  'trigger link',
  'sign in',
  'signin',
  'get started',
  'join',
  'signup form',
  'landing page',
  'recruiter',
  'hiring manager'
];

/**
 * Check if contact has any website-related tag
 */
function hasWebsiteTag(contact: GHLContact): boolean {
  if (!contact.tags || contact.tags.length === 0) {
    return false;
  }

  return contact.tags.some(tag => {
    const tagLower = tag.toLowerCase();
    return WEBSITE_TAG_PATTERNS.some(pattern => tagLower.includes(pattern));
  });
}

/**
 * Check if contact has any tier tag
 */
function hasTierTag(contact: GHLContact): boolean {
  if (!contact.tags || contact.tags.length === 0) {
    return false;
  }

  const tierPatterns = ['os subs entry', 'os subs lite', 'os subs pro', 'os subs teams'];
  return contact.tags.some(tag => {
    const tagLower = tag.toLowerCase();
    return tierPatterns.some(tier => tagLower.includes(tier));
  });
}

/**
 * Check if contact has both website tag AND tier tag
 * This identifies true conversions from website to paid tier
 */
function isWebsiteConversion(contact: GHLContact): boolean {
  return hasWebsiteTag(contact) && hasTierTag(contact);
}

/**
 * Fetch contacts from GHL within a date range
 */
export async function getGHLContacts(
  startDate: Date,
  endDate: Date,
  apiKey: string,
  locationId: string
): Promise<GHLContact[]> {
  const contacts: GHLContact[] = [];
  let skip = 0;
  const limit = 100; // Max per request
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `${GHL_API_BASE}/contacts/?locationId=${locationId}&skip=${skip}&limit=${limit}&startDate=${startDate.getTime()}&endDate=${endDate.getTime()}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[GHL Client] Error fetching contacts:', errorText);
      throw new Error(`GHL API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const fetchedContacts = data.contacts || [];
    
    contacts.push(...fetchedContacts);
    
    if (fetchedContacts.length < limit) {
      hasMore = false;
    } else {
      skip += limit;
    }
  }

  return contacts;
}

/**
 * Filter contacts by specific tag
 */
export function filterContactsByTag(contacts: GHLContact[], tag: string): GHLContact[] {
  return contacts.filter(contact => 
    contact.tags && contact.tags.some(t => 
      t.toLowerCase().includes(tag.toLowerCase())
    )
  );
}

/**
 * Get which specific tier a contact has
 */
function getContactTier(contact: GHLContact): 'os subs entry' | 'os subs lite' | 'os subs pro' | 'os subs teams' | null {
  if (!contact.tags) return null;

  const tiers: Array<'os subs entry' | 'os subs lite' | 'os subs pro' | 'os subs teams'> = [
    'os subs teams',  // Check highest tier first
    'os subs pro',
    'os subs lite',
    'os subs entry'
  ];

  for (const tier of tiers) {
    if (contact.tags.some(tag => tag.toLowerCase().includes(tier.toLowerCase()))) {
      return tier;
    }
  }

  return null;
}

/**
 * Get conversion data grouped by tier
 * Only counts contacts that have BOTH a website tag AND a tier tag
 */
export async function getGHLConversionData(
  startDate: Date,
  endDate: Date,
  apiKey: string,
  locationId: string
): Promise<GHLConversionData> {
  const contacts = await getGHLContacts(startDate, endDate, apiKey, locationId);

  // Filter to only website-tagged contacts
  const websiteContacts = contacts.filter(hasWebsiteTag);

  // Define tier tags
  const tiers: Array<'os subs entry' | 'os subs lite' | 'os subs pro' | 'os subs teams'> = [
    'os subs entry',
    'os subs lite',
    'os subs pro',
    'os subs teams'
  ];

  // Group website conversions by tier
  // CRITICAL: Only count contacts that have BOTH website tag AND tier tag
  const tieredSignups: GHLTierData[] = tiers.map(tier => {
    const tierContacts = websiteContacts.filter(contact => {
      // Must have both website tag and this specific tier tag
      return hasTierTag(contact) && getContactTier(contact) === tier;
    });
    
    return {
      tier,
      count: tierContacts.length,
      contacts: tierContacts
    };
  });

  // Total contacts with both website tag AND any tier tag
  const totalTieredSignups = tieredSignups.reduce((sum, tier) => sum + tier.count, 0);

  // Conversion rate: (paid signups / website visitors) * 100
  const conversionRate = websiteContacts.length > 0 
    ? Math.round((totalTieredSignups / websiteContacts.length) * 100 * 10) / 10
    : 0;

  return {
    totalContacts: contacts.length,
    websiteTaggedContacts: websiteContacts.length,
    tieredSignups,
    totalTieredSignups,
    conversionRate,
    period: {
      start: startDate,
      end: endDate
    }
  };
}

/**
 * Get weekly conversion data (last 7 days)
 */
export async function getWeeklyGHLConversionData(
  apiKey: string,
  locationId: string
): Promise<GHLConversionData> {
  const end = new Date();
  const start = new Date(end.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  return getGHLConversionData(start, end, apiKey, locationId);
}

/**
 * Export helper functions for testing
 */
export const helpers = {
  hasWebsiteTag,
  hasTierTag,
  isWebsiteConversion,
  getContactTier,
  WEBSITE_TAG_PATTERNS
};
