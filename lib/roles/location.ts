/**
 * Parse free-text role locations ("London, UK", "Ponca City, OK, USA",
 * "Remote (Global)") into the structured address Google Jobs requires.
 * Structured jobLocation.address is what separates JobPosting markup that
 * enters the Google Jobs panel from markup that gets ignored.
 */

export interface ParsedLocation {
  /** ISO 3166-1 alpha-2 country code, if identifiable */
  addressCountry?: string;
  /** State / region, if identifiable */
  addressRegion?: string;
  /** City / locality, if identifiable */
  addressLocality?: string;
  /** True when the text itself signals a remote role */
  remoteHint: boolean;
}

const COUNTRY_CODES: Record<string, string> = {
  uk: 'GB',
  'united kingdom': 'GB',
  england: 'GB',
  scotland: 'GB',
  wales: 'GB',
  'south wales': 'GB',
  usa: 'US',
  us: 'US',
  'united states': 'US',
  uae: 'AE',
  'united arab emirates': 'AE',
  dubai: 'AE',
  australia: 'AU',
  germany: 'DE',
  netherlands: 'NL',
  canada: 'CA',
  singapore: 'SG',
  nigeria: 'NG',
  'south africa': 'ZA',
  france: 'FR',
  spain: 'ES',
  italy: 'IT',
  ireland: 'IE',
  europe: '',
  global: '',
};

const US_STATE_RE = /^[A-Z]{2}$/;

export function parseRoleLocation(location: string): ParsedLocation {
  const raw = location.trim();
  const remoteHint = /remote/i.test(raw);

  // Strip "(Remote)" style suffixes before splitting
  const cleaned = raw.replace(/\(.*?\)/g, '').trim();
  const parts = cleaned
    .split(/[,/]/)
    .map((p) => p.trim())
    .filter(Boolean);

  const result: ParsedLocation = { remoteHint };
  if (parts.length === 0) return result;

  // Walk from the end looking for a recognisable country
  for (let i = parts.length - 1; i >= 0; i--) {
    const code = COUNTRY_CODES[parts[i].toLowerCase()];
    if (code !== undefined) {
      if (code) result.addressCountry = code;
      parts.splice(i, 1);
      break;
    }
  }

  // A trailing two-letter token in a US-style location is a state
  if (parts.length > 0) {
    const last = parts[parts.length - 1];
    if (US_STATE_RE.test(last)) {
      result.addressRegion = last;
      parts.pop();
      if (result.addressCountry === undefined) result.addressCountry = 'US';
    }
  }

  // Whatever leads is the locality, as long as it isn't itself "Remote"
  if (parts.length > 0 && !/remote|multiple|nationwide/i.test(parts[0])) {
    result.addressLocality = parts[0];
  }

  return result;
}
