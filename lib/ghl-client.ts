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
  websiteSignups: number;
  tieredSignups: GHLTierData[];
  period: {
    start: Date;
    end: Date;
  };
}

const GHL_API_BASE = 'https://rest.gohighlevel.com/v1';

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
 * Get conversion data grouped by tier
 */
export async function getGHLConversionData(
  startDate: Date,
  endDate: Date,
  apiKey: string,
  locationId: string
): Promise<GHLConversionData> {
  const contacts = await getGHLContacts(startDate, endDate, apiKey, locationId);

  // Filter contacts from website (you may need to adjust this based on your source field)
  const websiteContacts = contacts.filter(contact => 
    contact.source?.toLowerCase().includes('website') ||
    contact.source?.toLowerCase().includes('recxchange') ||
    contact.tags?.some(tag => tag.toLowerCase().includes('website'))
  );

  // Define tier tags
  const tiers: Array<'os subs entry' | 'os subs lite' | 'os subs pro' | 'os subs teams'> = [
    'os subs entry',
    'os subs lite',
    'os subs pro',
    'os subs teams'
  ];

  // Group contacts by tier
  const tieredSignups: GHLTierData[] = tiers.map(tier => {
    const tierContacts = filterContactsByTag(contacts, tier);
    return {
      tier,
      count: tierContacts.length,
      contacts: tierContacts
    };
  });

  // Count contacts with any tier tag
  const contactsWithTier = contacts.filter(contact =>
    tiers.some(tier => 
      contact.tags?.some(tag => tag.toLowerCase().includes(tier.toLowerCase()))
    )
  );

  return {
    totalContacts: contacts.length,
    websiteSignups: websiteContacts.length,
    tieredSignups,
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
