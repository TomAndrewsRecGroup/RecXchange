# Send 3 Roles API Documentation

## Overview

The `/api/send-3-roles` endpoint sends personalized emails to recruiters featuring 3 live roles that match their specified industries. The email is designed with high-conversion Harmozi/Priestley-style copywriting and includes beautifully styled role cards matching the RecXchange brand.

## Purpose

This is a **massive conversion opportunity** designed to:
- Convert prospects into platform users
- Showcase real, live roles with tangible fee opportunities
- Demonstrate platform value immediately
- Drive sign-ups through urgency and social proof

## Endpoint

```
POST /api/send-3-roles
```

## Authentication

No authentication required for this endpoint (it's designed for prospect conversion).

## Request Body

```typescript
{
  email: string;              // Required: Recipient email address
  firstName: string;          // Required: Recipient first name
  industries: string[];       // Required: Array of industries (e.g., ["Technology", "Finance"])
  eaveeWebhookUrl?: string;   // Optional: Webhook URL for Eavee/GHL integration
}
```

### Example Request

```json
{
  "email": "recruiter@example.com",
  "firstName": "Sarah",
  "industries": ["Technology", "Finance", "Human Resources"],
  "eaveeWebhookUrl": "https://your-eavee-webhook.com/endpoint"
}
```

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "Email sent successfully",
  "rolesSent": 3,
  "roles": [
    {
      "id": "role-123",
      "title": "Senior Software Engineer",
      "industry": "Technology"
    },
    {
      "id": "role-456",
      "title": "Head of Talent Acquisition",
      "industry": "Human Resources"
    },
    {
      "id": "role-789",
      "title": "Quantitative Analyst",
      "industry": "Finance"
    }
  ]
}
```

### Error Responses

#### 400 - Bad Request
```json
{
  "error": "Missing required fields: email, firstName, and industries are required"
}
```

or

```json
{
  "error": "Invalid email format"
}
```

#### 404 - Not Found
```json
{
  "error": "No roles available at this time"
}
```

#### 500 - Server Error
```json
{
  "error": "Email service not configured"
}
```

or

```json
{
  "error": "Failed to send email",
  "details": "Detailed error message"
}
```

## How It Works

### 1. Industry Matching Algorithm

The API intelligently matches roles to the recruiter's industries:

- **Case-insensitive matching**: "technology" matches "Technology"
- **Partial matching**: "Tech" matches "Technology"
- **Multiple industries**: Searches across all provided industries
- **Random selection**: Picks 3 random roles from matched results
- **Fallback**: If no matches, sends 3 random roles from all available

### 2. Email Content

The email features:

#### Visual Design
- **Brand-matched styling**: Cyan/fuchsia gradient, glass cards, RecXchange logo
- **Role cards**: Identical design to `/roles` page cards
- **Mobile-responsive**: Works perfectly on all devices
- **Professional layout**: Clean, modern, conversion-focused

#### Copywriting Style (Harmozi + Priestley)

**Opening Hook:**
```
"Here's what most recruiters don't realize...

While they're cold-calling hiring managers and chasing leads, 
these 3 roles below are sitting there waiting to be filled—
with the client relationship already built for you."
```

**Social Proof:**
```
"The average RecXchange member makes their first split within 19 days.
Not 6 months. Not 'eventually.' Nineteen days."
```

**Value Reframe:**
```
"One placement from these three roles = £12k
That's 12 months of RecXchange membership paid for.
Everything after that? Pure profit."
```

**Urgency:**
```
"Every day these roles sit unfilled, someone else is making the placement.
Every hour you wait, another recruiter is submitting their candidate."
```

**P.S. Sections** (Classic Priestley):
- P.S. adds time-based urgency ("filled in 7-14 days")
- P.P.S. removes risk with free tier option

### 3. Role Information Included

Each role card shows:
- Role title
- Source badge (RecX Direct or Xchange)
- Company name
- Location
- Industry
- Work model (remote/hybrid/onsite)
- Seniority level
- Role type (permanent/contract)
- Description snippet
- **Your split amount** (highlighted)
- Salary range

### 4. Call-to-Action

Primary CTA button:
```
https://app.recxchange.io/register?trigger_link=QjW2p32pFmIWw7ESQTUD
```

- Prominent placement after close copy
- Gradient button matching brand
- Clear action: "Start Submitting Candidates Now"

## Integration with Eavee/GHL

When `eaveeWebhookUrl` is provided, the API sends a webhook with:

```json
{
  "email": "recruiter@example.com",
  "firstName": "Sarah",
  "industries": ["Technology", "Finance"],
  "rolesSent": [
    {
      "id": "role-123",
      "title": "Senior Software Engineer",
      "source": "recx_direct",
      "industry": "Technology",
      "splitAmount": 12000,
      "splitCurrency": "GBP"
    }
  ],
  "timestamp": "2026-02-27T18:00:00.000Z",
  "event": "send_3_roles_email_sent"
}
```

This allows you to:
- Track email sends in your CRM
- Trigger follow-up sequences
- Update contact records
- Monitor conversion funnel

## Environment Variables Required

```env
SENDGRID_API_KEY=your_sendgrid_api_key_here
```

### How to Get SendGrid API Key

1. Sign up at [SendGrid](https://sendgrid.com)
2. Go to Settings → API Keys
3. Create new API key with "Mail Send" permissions
4. Add to your `.env.local` file
5. Verify sender email: hello@recxchange.io

## Email Tracking

The API enables SendGrid tracking:

```typescript
trackingSettings: {
  clickTracking: { enable: true },
  openTracking: { enable: true }
}
```

Custom tracking arguments:
```typescript
customArgs: {
  campaign: 'send_3_roles',
  industries: 'Technology,Finance',
  role_ids: 'role-123,role-456,role-789'
}
```

View stats in SendGrid Dashboard:
- Open rates
- Click rates
- Bounce rates
- Geographic data
- Device/client data

## Example Usage

### JavaScript/TypeScript

```typescript
const sendRoles = async (email: string, firstName: string, industries: string[]) => {
  const response = await fetch('/api/send-3-roles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      firstName,
      industries,
      eaveeWebhookUrl: 'https://your-webhook-url.com/endpoint'
    })
  });

  const data = await response.json();
  
  if (data.success) {
    console.log(`Successfully sent ${data.rolesSent} roles to ${email}`);
  } else {
    console.error('Failed to send roles:', data.error);
  }
};

// Usage
await sendRoles(
  'recruiter@example.com',
  'Sarah',
  ['Technology', 'Finance', 'Human Resources']
);
```

### cURL

```bash
curl -X POST https://recxchange.io/api/send-3-roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "recruiter@example.com",
    "firstName": "Sarah",
    "industries": ["Technology", "Finance", "Human Resources"],
    "eaveeWebhookUrl": "https://your-webhook-url.com/endpoint"
  }'
```

### Python

```python
import requests

def send_3_roles(email, first_name, industries, webhook_url=None):
    payload = {
        "email": email,
        "firstName": first_name,
        "industries": industries
    }
    
    if webhook_url:
        payload["eaveeWebhookUrl"] = webhook_url
    
    response = requests.post(
        'https://recxchange.io/api/send-3-roles',
        json=payload
    )
    
    return response.json()

# Usage
result = send_3_roles(
    email='recruiter@example.com',
    first_name='Sarah',
    industries=['Technology', 'Finance', 'Human Resources'],
    webhook_url='https://your-webhook-url.com/endpoint'
)

print(f"Success: {result['success']}")
print(f"Roles sent: {result['rolesSent']}")
```

## Use Cases

### 1. Lead Magnet Follow-Up

When someone downloads your lead magnet or expresses interest:
```typescript
// After form submission
await fetch('/api/send-3-roles', {
  method: 'POST',
  body: JSON.stringify({
    email: formData.email,
    firstName: formData.firstName,
    industries: formData.selectedIndustries
  })
});
```

### 2. Onboarding Sequence

Send to new sign-ups who haven't activated:
```typescript
// Day 3 of onboarding sequence
if (!user.hasSubmittedCandidate) {
  await sendThreeRoles(user.email, user.firstName, user.industries);
}
```

### 3. Re-engagement Campaign

Win back inactive users:
```typescript
// For users inactive > 30 days
if (daysSinceLastLogin > 30) {
  await sendThreeRoles(user.email, user.firstName, user.industries);
}
```

### 4. Webinar Follow-Up

Immediate value after webinar:
```typescript
// Post-webinar automation
webinarAttendees.forEach(async (attendee) => {
  await sendThreeRoles(
    attendee.email,
    attendee.firstName,
    attendee.interestedIndustries
  );
});
```

## Best Practices

### Industry Selection

✅ **DO:**
- Use broad categories: "Technology", "Finance", "Healthcare"
- Collect 2-4 industries per recruiter
- Allow "All Industries" option for generalists

❌ **DON'T:**
- Use hyper-specific niches: "React Developers in FinTech"
- Send more than 5 industries (dilutes matching)

### Frequency

✅ **DO:**
- Send once per week maximum for same recipient
- Space out campaigns (avoid spam)
- Track opens/clicks before resending

❌ **DON'T:**
- Send daily
- Spam unengaged recipients
- Send without tracking consent

### Timing

Optimal send times (based on recruiter behavior):
- **Tuesday-Thursday**: 9am-11am GMT (highest open rates)
- **Avoid**: Monday mornings, Friday afternoons, weekends

## Monitoring & Analytics

### Key Metrics to Track

1. **Delivery Rate**: Should be > 95%
2. **Open Rate**: Target 35-45% (recruiter audience)
3. **Click Rate**: Target 8-12% (high-intent copy)
4. **Conversion Rate**: Track sign-ups from trigger link

### SendGrid Dashboard

Monitor in real-time:
```
Settings → Mail Settings → Event Webhook
```

Configure webhook to track:
- Delivered
- Opened
- Clicked
- Bounced
- Spam reports

### A/B Testing Ideas

1. **Subject lines**:
   - Current: "{firstName}, 3 live roles matched to your sectors 💰"
   - Test: "{firstName}, £36k in fees waiting (3 live roles)"

2. **CTA copy**:
   - Current: "Start Submitting Candidates Now"
   - Test: "Claim My Free Access Now"

3. **P.S. variations**:
   - Test different urgency messages
   - Test risk-reversal vs FOMO

## Troubleshooting

### Email Not Sending

**Check:**
1. `SENDGRID_API_KEY` is set in environment variables
2. Sender email (hello@recxchange.io) is verified in SendGrid
3. API key has "Mail Send" permissions
4. No SendGrid account suspension

**Debug:**
```typescript
try {
  await sgMail.send(msg);
} catch (error) {
  console.error('SendGrid Error:', error.response?.body);
}
```

### No Roles Matching Industries

**Causes:**
- Typos in industry names
- Industries not in current role dataset
- All roles already filled

**Solution:**
- Fallback to random 3 roles (already implemented)
- Log mismatches for analysis
- Update industry taxonomy regularly

### Webhook Not Firing

**Check:**
1. Valid webhook URL (HTTPS required)
2. Endpoint accepts POST requests
3. Webhook URL is accessible (not localhost)
4. Check webhook endpoint logs

**Note:** Webhook failures don't prevent email sending

## Future Enhancements

### Planned Features

1. **Dynamic role count**: Send 3, 5, or 10 roles based on user tier
2. **Personalized splits**: Show estimated earnings based on recruiter history
3. **Video thumbnails**: Add role explainer videos
4. **Calendar booking**: Include CTA to book demo call
5. **Social proof**: Include placement stats from similar recruiters
6. **Urgency counter**: Show "X recruiters currently viewing this role"

### Template Variations

1. **VIP version**: For high-value prospects (enterprise)
2. **Rapid-fire version**: More roles, less copy (re-engagement)
3. **Educational version**: Includes how-to guides (new users)

## Support

For issues or questions:
- **Technical**: developers@recxchange.io
- **Business**: hello@recxchange.io
- **Emergency**: Check SendGrid status page

## Version History

- **v1.0** (Feb 27, 2026): Initial release
  - SendGrid integration
  - Industry matching algorithm
  - Harmozi/Priestley copy
  - Eavee/GHL webhook support
  - Mobile-responsive HTML email
