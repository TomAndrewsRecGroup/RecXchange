# Quick Action Forms - Documentation

## Overview

Quick Action Forms are lightweight, context-specific forms that capture leads and trigger immediate automated responses. They integrate with GHL CRM and SendGrid email automation.

## How to Use

### 1. Import the Component

```tsx
import QuickActionForm from '@/components/quick-action-form';
```

### 2. Add to Your Page

#### Example 1: Recruiter Match Candidate Form
**Location:** `/recruiters-with-candidates` (under fake engine result)

```tsx
<QuickActionForm 
  actionType="match_candidate"
  placeholder="Your email address"
  buttonText="Send me 3 matching roles"
/>
```

**What it does:**
- User enters email
- Tagged in GHL with `quick-action-match-candidate`, `website`, `quick-action`
- Team receives notification email
- User receives auto-response promising 3 roles within 24 hours
- Tracked in weekly recruiter funnel email

---

#### Example 2: RecX Direct Explainer Form
**Location:** `/recruiter-roles` or `/pricing`

```tsx
<QuickActionForm 
  actionType="explain_recx_direct"
  placeholder="Your email address"
  buttonText="Email me the explainer"
/>
```

**What it does:**
- User enters email
- Tagged in GHL with `quick-action-recx-direct`, `website`, `quick-action`
- Team receives notification email
- User receives full RecX Direct explainer + fee pool info
- Tracked in weekly hiring manager funnel email

---

## Action Types

### `match_candidate`
**Use Case:** Recruiters with candidates wanting role matches

**Auto-response includes:**
- Promise of 3 matching roles within 24 hours
- Link back to platform

**Team notification includes:**
- User email
- Source page
- Action required: Send 3 matching roles

---

### `explain_recx_direct`
**Use Case:** Hiring managers or recruiters wanting fee pool info

**Auto-response includes:**
- Full RecX Direct explainer
- Current fee pool amount (placeholder - update manually)
- How it works (4-step process)
- CTA to view pricing tiers

**Team notification includes:**
- User email
- Source page  
- Action required: Follow up if needed

---

## Weekly Email Tracking

### Recruiter Email
📧 **Endpoint:** `POST /api/analytics/email-recruiter-funnel`

**Includes:**
- GHL tier signups
- Recruiter signup funnel
- **Count of `match_candidate` requests**

---

### Hiring Manager Email
📧 **Endpoint:** `POST /api/analytics/email-hiring-manager-funnel`

**Includes:**
- Call booking funnel
- **Count of `explain_recx_direct` requests**

---

## Customization

### Optional Props

```tsx
<QuickActionForm 
  actionType="match_candidate"
  placeholder="Custom placeholder text"     // Optional
  buttonText="Custom button text"          // Optional
  className="my-custom-class"              // Optional
/>
```

### Styling

The form includes built-in styling with:
- Dark theme matching RecXchange brand
- Gradient button (cyan to purple)
- Smooth animations
- Success/error states
- Loading spinner

To override, pass `className` and use CSS modules or global styles.

---

## Backend Flow

### 1. Form Submission
User submits → `/api/quick-action` endpoint

### 2. GHL Integration
```
POST https://rest.gohighlevel.com/v1/contacts/
{
  email: user_email,
  locationId: GHL_LOCATION_ID,
  tags: [action_specific_tag, 'website', 'quick-action'],
  source: "RecXchange Quick Action - /page-path"
}
```

### 3. Email Automation

**Team Notification:**
- To: `FUNNEL_EMAIL_TO` (default: tom@andrewsrecruitmentgroup.com)
- Subject: Action-specific
- Body: User details + action required

**User Auto-Response:**
- To: User's email
- Subject: Action-specific
- Body: Branded HTML email with next steps

### 4. Analytics Tracking
```javascript
trackEvent({
  event: 'quick_action_submitted',
  properties: {
    action_type: 'match_candidate' | 'explain_recx_direct',
    source_page: '/page-path'
  }
});
```

---

## Environment Variables

Required in Vercel:

```bash
# GHL CRM
GHL_API_KEY=your_business_api_token
GHL_LOCATION_ID=VxHBI8kbavh407OMkAcu

# SendGrid Email
SENDGRID_API_KEY=your_sendgrid_key
SENDGRID_FROM_EMAIL=analytics@recxchange.com
FUNNEL_EMAIL_TO=tom@andrewsrecruitmentgroup.com
```

---

## Analytics Events

Quick action submissions are tracked as:

```javascript
{
  event: 'quick_action_submitted',
  properties: {
    action_type: string,
    source_page: string,
    email_provided: true
  },
  timestamp: Date
}
```

These events are:
- Stored in analytics storage
- Counted in weekly funnel emails
- Used for conversion tracking

---

## Testing

### Test Locally

1. Add form to any page:
```tsx
<QuickActionForm actionType="match_candidate" />
```

2. Enter test email and submit

3. Check:
   - Console for errors
   - GHL for new contact
   - Email inbox for team notification
   - User email for auto-response

### Test in Production

Use a real email address you control to verify:
1. Form submits successfully
2. Success message appears
3. GHL contact created with correct tags
4. Emails received (team + user)

---

## Error Handling

The form gracefully handles:
- Invalid email addresses (client-side validation)
- Network errors (retry prompt)
- GHL API failures (continues without GHL)
- SendGrid failures (logs error, continues)
- Analytics failures (silent fail)

---

## Future Action Types

To add new action types:

1. Update `ACTION_CONFIG` in:
   - `components/quick-action-form.tsx`
   - `app/api/quick-action/route.ts`

2. Add tracking to relevant weekly email:
   - Recruiter email: recruiter-focused actions
   - Hiring manager email: hiring-focused actions

3. Update this documentation

---

## Code Locations

- **Component:** `components/quick-action-form.tsx`
- **API Endpoint:** `app/api/quick-action/route.ts`
- **Recruiter Email:** `app/api/analytics/email-recruiter-funnel/route.ts`
- **Hiring Manager Email:** `app/api/analytics/email-hiring-manager-funnel/route.ts`
- **GHL Client:** `lib/ghl-client.ts`

---

## Summary

✅ **Easy to use:** Just import and add to any page

✅ **Fully automated:** GHL + email + analytics happen automatically

✅ **Tracked weekly:** Counts appear in funnel emails

✅ **User-friendly:** Smooth animations, clear feedback, mobile-responsive

✅ **Brand-aligned:** Matches RecXchange design system
