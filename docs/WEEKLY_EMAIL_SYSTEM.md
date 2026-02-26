# Weekly Email System - Complete Guide

## Overview

RecXchange now has **2 targeted weekly emails** that track different user journeys and conversions:

1. **💼 Recruiter Email** - Signup funnel + GHL tier conversions + candidate match requests
2. **📋 Hiring Manager Email** - Call booking funnel + RecX Direct info requests

---

## Email 1: Recruiter Weekly Report

### 📧 Endpoint
`POST /api/analytics/email-recruiter-funnel`

### 🔷 Subject Line
"💼 Recruiter Funnel Report - [Date]"

### 📊 What's Included

#### 1. GHL Actual Signups Section (Top)
**Cyan border, prominent placement**

- **Website Visitors**: Total contacts tagged from website this week
- **Paid Signups**: Contacts with BOTH website tag AND tier tag
- **Conversion Rate**: Percentage who upgraded to paid
- **Tier Breakdown**: 4 cards showing signups per tier
  - os subs entry
  - os subs lite
  - os subs pro
  - os subs teams

**Data Source:** GHL API (requires both website tag + tier tag)

---

#### 2. Recruiter Signup Funnel
**8-stage funnel tracking recruiter journey**

1. Arrived on Site
2. Explored Platform
3. Researched Questions
4. Saw Value Proposition
5. Clicked to Sign Up
6. Started Signup Form
7. Account Created ✓
8. Became Active User

**Metrics shown:**
- Total visitors
- Conversion rate
- Converted users
- Biggest drop-off stage
- Per-stage counts and percentages

**Data Source:** Analytics events from `/api/analytics/track`

---

#### 3. Quick Action Stats
**Bottom of funnel section**

- Count of recruiters who requested candidate matches
- Via "Send me 3 matching roles" quick action form

**Data Source:** `quick_action_submitted` events with `action_type: match_candidate`

---

### 🕐 Schedule
Every Monday via cron job

### 📤 Sent To
`FUNNEL_EMAIL_TO` environment variable (default: tom@andrewsrecruitmentgroup.com)

---

## Email 2: Hiring Manager Weekly Report

### 📧 Endpoint
`POST /api/analytics/email-hiring-manager-funnel`

### 🔶 Subject Line
"📋 Hiring Manager Funnel Report - [Date]"

### 📊 What's Included

#### 1. Call Booking Funnel
**8-stage funnel tracking hiring manager journey**

1. Arrived on Site
2. Explored Service
3. Researched Solutions
4. Understood Benefits
5. Clicked to Book Call
6. Opened Calendly
7. Call Booked ✓
8. Attended Call & Joined

**Metrics shown:**
- Total visitors
- Booking rate
- Calls booked
- Biggest drop-off stage
- Per-stage counts and percentages

**Data Source:** Analytics events from `/api/analytics/track`

**Color theme:** Purple gradient (different from recruiter cyan)

---

#### 2. Quick Action Stats
**Bottom of funnel section**

- Count of hiring managers who requested RecX Direct info
- Via "Email me the explainer" quick action form

**Data Source:** `quick_action_submitted` events with `action_type: explain_recx_direct`

---

### 🕐 Schedule
Every Monday via cron job

### 📤 Sent To
`FUNNEL_EMAIL_TO` environment variable (default: tom@andrewsrecruitmentgroup.com)

---

## Setup Instructions

### 1. Environment Variables

Add to Vercel:

```bash
# SendGrid (required for both emails)
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=analytics@recxchange.com
FUNNEL_EMAIL_TO=tom@andrewsrecruitmentgroup.com

# GHL (required for recruiter email tier data)
GHL_API_KEY=your_ghl_business_api_token
GHL_LOCATION_ID=VxHBI8kbavh407OMkAcu
```

### 2. Cron Jobs

Set up 2 cron jobs in Vercel (or your scheduler):

**Recruiter Email:**
```
Schedule: 0 9 * * 1  (Every Monday at 9am)
Endpoint: POST /api/analytics/email-recruiter-funnel
```

**Hiring Manager Email:**
```
Schedule: 0 9 * * 1  (Every Monday at 9am)
Endpoint: POST /api/analytics/email-hiring-manager-funnel
```

### 3. GHL Tag Setup

Ensure contacts are tagged in GHL with:

**Website tags** (any of these):
- website
- recxchange  
- web form
- contact form
- cta
- trigger link
- sign in / signin
- get started
- join
- signup form
- landing page
- recruiter
- hiring manager

**Tier tags** (for paid signups):
- os subs entry
- os subs lite
- os subs pro
- os subs teams

**Quick action tags** (auto-added by forms):
- quick-action-match-candidate
- quick-action-recx-direct
- quick-action

---

## Quick Action Forms Integration

### Recruiter: Match Candidate Form
**Add to:** `/recruiters-with-candidates` (under fake engine result)

```tsx
import QuickActionForm from '@/components/quick-action-form';

<QuickActionForm 
  actionType="match_candidate"
  buttonText="Send me 3 matching roles"
/>
```

**What happens:**
1. User submits email
2. Tagged in GHL
3. Team notification sent
4. User gets auto-response (24hr promise)
5. Counted in recruiter weekly email

---

### Hiring Manager: RecX Direct Explainer
**Add to:** `/recruiter-roles` or `/pricing`

```tsx
import QuickActionForm from '@/components/quick-action-form';

<QuickActionForm 
  actionType="explain_recx_direct"
  buttonText="Email me the explainer"
/>
```

**What happens:**
1. User submits email
2. Tagged in GHL
3. Team notification sent
4. User gets full explainer + fee pool info
5. Counted in hiring manager weekly email

---

## Testing

### Test Recruiter Email
```bash
curl -X POST https://recxchange.vercel.app/api/analytics/email-recruiter-funnel
```

### Test Hiring Manager Email
```bash
curl -X POST https://recxchange.vercel.app/api/analytics/email-hiring-manager-funnel
```

### Test Quick Action Forms
1. Navigate to page with form
2. Enter test email
3. Submit
4. Verify:
   - Success message appears
   - GHL contact created
   - Team notification received
   - User auto-response received

---

## Email Design

### Recruiter Email
- **Theme:** Cyan (#00ffff) gradients
- **Logo:** RecXchange white logo
- **Subtitle:** "💼 Recruiter Focus"
- **Sections:** GHL data → Funnel → Quick actions

### Hiring Manager Email  
- **Theme:** Purple (#c71df1) gradients
- **Logo:** RecXchange white logo
- **Subtitle:** "📋 Hiring Manager Focus"
- **Sections:** Funnel → Quick actions

### Common Elements
- Dark background (#0a0a0a)
- Gradient progress bars
- Stage-by-stage breakdown
- Drop-off warnings (red) for >30%
- Success badges (green) for 0% drop-off

---

## Data Flow

```
Website Events → /api/analytics/track → Storage
                          ↓
                   Weekly Email APIs
                          ↓
            ┌─────────┴─────────┐
            │                      │
      Recruiter Email      Hiring Manager Email
            │                      │
    │                              │
    │                              │
GHL API          Analytics Events
(Tier Data)      (Funnel + Quick Actions)
    │                              │
    └────────┬──────────────────┘
            │
     SendGrid Email
            │
      Your Inbox 📨
```

---

## File Locations

### Email APIs
- `app/api/analytics/email-recruiter-funnel/route.ts`
- `app/api/analytics/email-hiring-manager-funnel/route.ts`

### Quick Action System
- `components/quick-action-form.tsx`
- `app/api/quick-action/route.ts`

### Supporting Libraries
- `lib/funnel.ts` - Funnel calculation logic
- `lib/ghl-client.ts` - GHL API integration
- `lib/analytics.ts` - Event tracking

### Documentation
- `docs/GHL_CONVERSION_TRACKING.md` - GHL integration details
- `docs/QUICK_ACTION_FORMS.md` - Form usage guide
- `docs/WEEKLY_EMAIL_SYSTEM.md` - This file

---

## Migration from Old System

### What Changed

**Before:**
- 1 combined email with both funnels
- No GHL integration
- No quick action tracking

**After:**
- 2 targeted emails (recruiter + hiring manager)
- GHL tier signup data in recruiter email
- Quick action counts in both emails
- Clearer focus per audience

### Old Endpoint (deprecated)
`/api/analytics/email-funnel` - Still exists but not used

### Migration Steps
1. Update cron jobs to call 2 new endpoints
2. Remove old `/api/analytics/email-funnel` cron job
3. Add GHL environment variables
4. Deploy Quick Action Forms to pages

---

## Troubleshooting

### No GHL data in recruiter email
- Check `GHL_API_KEY` is set
- Check `GHL_LOCATION_ID` is correct
- Verify contacts have BOTH website tag AND tier tag
- Check API logs for GHL errors

### Quick action counts are 0
- Ensure forms are deployed to pages
- Check `quick_action_submitted` events in analytics
- Verify event tracking is working

### Emails not sending
- Check `SENDGRID_API_KEY` is valid
- Verify `SENDGRID_FROM_EMAIL` is authenticated in SendGrid
- Check API logs for SendGrid errors

### Wrong data in emails
- Check date range in funnel calculation
- Verify analytics events are being stored
- Test with `/api/analytics/track` GET endpoint

---

## Summary

✅ **2 targeted emails** for different audiences

✅ **GHL integration** tracks actual paid conversions

✅ **Quick action forms** capture high-intent leads

✅ **Full automation** from form submit to weekly report

✅ **Beautiful design** matching RecXchange brand

✅ **Actionable insights** with drop-off warnings and conversion triggers
