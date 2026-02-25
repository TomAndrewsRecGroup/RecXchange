# GHL Conversion Tracking Documentation

## Overview

The weekly funnel email now integrates with GoHighLevel CRM to track actual paid conversions from website visitors.

## How It Works

### Conversion Criteria

A contact is counted as a **conversion** only if they have:

1. **Website Tag** - Any tag indicating they came from RecXchange website
2. **Tier Tag** - One of the 4 paid tier tags

Both tags are **required** for a contact to be counted in the conversion metrics.

### Website Tag Detection

The system automatically detects contacts from the website by looking for tags containing:

- `website`
- `recxchange`
- `web form`
- `contact form`
- `cta`
- `trigger link`
- `sign in` / `signin`
- `get started`
- `join`
- `signup form`
- `landing page`
- `recruiter`
- `hiring manager`

### Tier Tags

The 4 paid tiers tracked:

1. `os subs entry`
2. `os subs lite`
3. `os subs pro`
4. `os subs teams`

### Sign-In Flow

Users who:
- Click "Sign In" trigger link
- Don't have an account
- Create one

Are tracked via the `sign in` / `signin` tag patterns.

## Email Report Structure

### 💎 Actual Signups Section (Top)

Shows:
- **Website Visitors Tagged**: Total contacts from website (any website tag)
- **Paid Tier Signups**: Contacts with BOTH website tag AND tier tag
- **Conversion Rate**: (Paid signups / Website visitors) × 100

### Tier Breakdown

4 cards showing signup count for each tier:
- Entry
- Lite  
- Pro
- Teams

Cards with signups get a **green border** to highlight active tiers.

## Environment Variables

Required in Vercel:

```bash
GHL_API_KEY=your_business_api_token
GHL_LOCATION_ID=VxHBI8kbavh407OMkAcu
```

## API Endpoints

### Production Email
`POST /api/analytics/email-funnel`
- Called by cron job every Monday
- Fetches real GHL data
- Sends to `FUNNEL_EMAIL_TO` email

### Test Email
`GET /api/analytics/test-email`
- Shows sample GHL data
- Good for previewing email design
- Safe to call anytime

## Code Location

- **GHL Client**: `lib/ghl-client.ts`
- **Email Route**: `app/api/analytics/email-funnel/route.ts`
- **Test Email**: `app/api/analytics/test-email/route.ts`

## Adding New Website Tags

To track new trigger links or forms:

1. Add tags in GHL that include patterns from `WEBSITE_TAG_PATTERNS`
2. Or update `WEBSITE_TAG_PATTERNS` in `lib/ghl-client.ts`

No code changes needed if tags match existing patterns!

## Metrics Tracked

```typescript
interface GHLConversionData {
  totalContacts: number;              // All contacts this week
  websiteTaggedContacts: number;      // Contacts with website tag
  tieredSignups: GHLTierData[];      // Breakdown by tier
  totalTieredSignups: number;        // Sum of all tier signups
  conversionRate: number;            // Percentage who paid
  period: { start: Date; end: Date };
}
```

## Example Email Output

```
💎 Actual Signups (from CRM)
┌────────────────────────────────────────┐
│ Website Visitors Tagged: 42            │
│ Paid Tier Signups: 31                  │
│ Conversion Rate: 73.8%                 │
└────────────────────────────────────────┘

┌─────────────┬─────────────┐
│ Entry: 8    │ Lite: 12    │ ✓ Green border
├─────────────┼─────────────┤
│ Pro: 7      │ Teams: 4    │ ✓ Green border
└─────────────┴─────────────┘
```

## Notes

- Data is fetched for the last 7 days
- Contacts must have tags added **within the tracking period**
- If a contact has multiple tier tags, highest tier is counted
- Gracefully handles missing GHL API credentials (skips section)
