# RecXchange Analytics Setup

## Overview

This analytics system tracks conversion funnels across RecXchange and sends automated weekly reports.

## Features

- ✅ Site-wide CTA tracking
- ✅ Conversion funnel analysis (Recruiter & Hiring Manager)
- ✅ Automated weekly email reports (every Monday at 9 AM)
- ✅ Visual funnel charts in email
- ✅ Drop-off rate analysis
- ✅ Event storage and querying API

---

## Environment Variables

Add these to your `.env.local` (development) and Vercel Environment Variables (production):

```bash
# SendGrid Configuration (Required for email reports)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=analytics@recxchange.com
FUNNEL_EMAIL_TO=tom@andrewsrecruitmentgroup.com

# Analytics Configuration
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

### Getting SendGrid API Key:

1. Go to [SendGrid.com](https://sendgrid.com)
2. Sign up or log in
3. Navigate to Settings → API Keys
4. Create new API key with "Mail Send" permissions
5. Copy the API key and add to environment variables

---

## Conversion Funnels

### Recruiter Funnel

```
1. Page View          → User lands on site
2. Engagement         → Uses calculator or fake engine
3. Intent             → Clicks CTA or sees engine result
4. Signup             → Clicks signup link or submits form
5. Activation         → Creates account, posts role, uploads candidate
```

### Hiring Manager Funnel

```
1. Page View          → User lands on site
2. Engagement         → Views pricing or roles page
3. Intent             → Clicks any CTA
4. Signup             → Clicks signup link or submits form
5. Activation         → Creates account and posts first role
```

---

## How to Use

### 1. Track Events in Your Code

```typescript
import { trackEvent } from '@/lib/analytics';

// Track a page view
trackEvent('page_viewed', {
  page: '/recruiters',
  persona: 'recruiter'
});

// Track a CTA click
trackEvent('cta_clicked', {
  cta_text: 'Get Started',
  cta_location: 'hero',
  persona: 'recruiter'
});
```

### 2. Use TrackedLink Component

```tsx
import TrackedLink from '@/components/TrackedLink';

<TrackedLink
  href="/signup"
  ctaText="Get Started"
  ctaLocation="hero"
  persona="recruiter"
  className="btn-primary"
>
  Get Started
</TrackedLink>
```

### 3. View Events (Development)

Open browser console to see real-time event tracking:

```javascript
// View all session events
import { getSessionEvents } from '@/lib/analytics';
console.table(getSessionEvents());

// Clear session events
import { clearSessionEvents } from '@/lib/analytics';
clearSessionEvents();
```

---

## API Endpoints

### POST /api/analytics/track

Store an analytics event.

```bash
curl -X POST https://recxchange.com/api/analytics/track \
  -H "Content-Type: application/json" \
  -d '{
    "name": "page_viewed",
    "props": { "page": "/recruiters" },
    "timestamp": 1234567890
  }'
```

### GET /api/analytics/track

Retrieve stored events.

```bash
# Get all events
GET /api/analytics/track

# Filter by date
GET /api/analytics/track?since=2026-02-01

# Filter by event name
GET /api/analytics/track?event=cta_clicked
```

### GET /api/analytics/funnel

Get funnel metrics.

```bash
# Recruiter funnel (last 7 days)
GET /api/analytics/funnel?type=recruiter&weekly=true

# Hiring manager funnel with custom date range
GET /api/analytics/funnel?type=hiring-manager&start=2026-02-01&end=2026-02-25
```

### POST /api/analytics/email-funnel

Manually trigger weekly email report (normally run by cron).

```bash
curl -X POST https://recxchange.com/api/analytics/email-funnel
```

---

## Automated Weekly Emails

The system automatically sends funnel reports **every Monday at 9 AM GMT** via Vercel Cron.

### Email Contents:

- 📈 Visual funnel charts with conversion rates
- 🔻 Drop-off analysis between stages
- 📊 Key metrics: total users, conversion rate, converted count
- 👥 Separate funnels for recruiters and hiring managers
- 🎨 Beautiful HTML design with RecXchange branding

### Manual Trigger:

You can manually trigger the email anytime:

```bash
curl -X POST https://recxchange.com/api/analytics/email-funnel
```

---

## Vercel Cron Configuration

The `vercel.json` file configures the cron job:

```json
{
  "crons": [
    {
      "path": "/api/analytics/email-funnel",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

**Schedule:** `0 9 * * 1` = Every Monday at 9:00 AM GMT

To change the schedule, update the cron expression:
- `0 9 * * *` = Daily at 9 AM
- `0 9 * * 1,5` = Monday and Friday at 9 AM
- `0 */6 * * *` = Every 6 hours

---

## Production Considerations

### Current Implementation (Development/MVP)

- ⚠️ Events stored in memory (lost on server restart)
- ⚠️ Limited to 10,000 events
- ✅ Perfect for testing and initial launch

### For Production (Scale)

Replace in-memory storage with a database:

```typescript
// In /api/analytics/track/route.ts

// Replace this:
eventStore.push(event);

// With this (example using Prisma):
await prisma.analyticsEvent.create({
  data: {
    name: event.name,
    props: event.props,
    timestamp: new Date(event.timestamp)
  }
});
```

Recommended databases:
- **PostgreSQL** (via Vercel Postgres or Supabase)
- **MongoDB** (via MongoDB Atlas)
- **Firebase Firestore**

---

## Debugging

### Check Events Are Being Tracked

```javascript
// In browser console
import { getSessionEvents } from '@/lib/analytics';
console.log(getSessionEvents());
```

### Check API Is Storing Events

```bash
curl https://recxchange.com/api/analytics/track
```

### Check Funnel Calculation

```bash
curl https://recxchange.com/api/analytics/funnel?type=recruiter&weekly=true
```

### Test Email Sending

```bash
curl -X POST https://recxchange.com/api/analytics/email-funnel
```

Check your inbox (FUNNEL_EMAIL_TO) for the report.

---

## Event Reference

### Core Events

- `page_viewed` - User views a page
- `cta_clicked` - User clicks any CTA
- `signup_link_clicked` - User clicks signup
- `login_link_clicked` - User clicks login

### Calculator Events (Recruiter Roles Page)

- `calculator_viewed` - Calculator component loaded
- `calculator_completed` - User completes calculation
- `calculator_cta_clicked` - User clicks CTA from calculator

### Fake Engine Events (Recruiters with Candidates)

- `fake_engine_viewed` - Engine component loaded
- `fake_engine_cv_uploaded` - User uploads a CV
- `fake_engine_result_shown` - Match result displayed
- `fake_engine_signup_clicked` - User clicks "See Live Roles"
- `fake_engine_try_another_clicked` - User clicks "Try Another"

### Form Events

- `lead_form_submitted` - Lead form submitted
- `quick_action_form_viewed` - Quick action modal opened
- `quick_action_form_submitted` - Quick action submitted

---

## Next Steps

1. ✅ Add SENDGRID_API_KEY to Vercel environment variables
2. ✅ Deploy to production
3. ✅ Test email delivery manually
4. ✅ Wait for first automated Monday report
5. 🚀 Optimize based on funnel insights!

---

## Support

For questions or issues:
- Check browser console for tracking logs (development mode)
- Check Vercel logs for API errors
- Verify SendGrid API key is valid
- Ensure FUNNEL_EMAIL_TO is correct
