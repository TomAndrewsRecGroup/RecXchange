# Send 3 Roles Email Campaign - Setup Guide

## 🚀 Quick Start

This guide will help you set up the automated "Send 3 Roles" email campaign that converts prospects into RecXchange users.

## ✨ What This Does

Automatically sends beautifully designed emails featuring 3 live roles matched to a recruiter's industries. Each email includes:

- **3 personalized role cards** (matching your /roles page design)
- **Harmozi + Priestley style copywriting** (high-conversion)
- **Industry-intelligent matching** (shows relevant roles)
- **Real fee amounts** (builds trust and urgency)
- **Direct sign-up CTA** (with tracking link)
- **Eavee/GHL integration** (syncs with your CRM)

## 🛠️ Prerequisites

1. SendGrid account (free tier works)
2. Verified sender email (hello@recxchange.io)
3. Environment variables configured
4. npm dependencies installed

## 📝 Step 1: Install Dependencies

The required dependency is already added to `package.json`:

```bash
npm install
# or
yarn install
```

This installs `@sendgrid/mail` version 8.1.4.

## 🔑 Step 2: Get SendGrid API Key

### Create SendGrid Account

1. Go to [SendGrid](https://sendgrid.com)
2. Sign up for free account (100 emails/day free forever)
3. Complete email verification

### Generate API Key

1. Navigate to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it: `RecXchange Send 3 Roles`
4. Select **Restricted Access**
5. Enable **Mail Send** permission (Full Access)
6. Click **Create & View**
7. **Copy the API key** (you'll only see it once!)

### Verify Sender Email

1. Go to **Settings** → **Sender Authentication**
2. Click **Verify a Single Sender**
3. Enter details:
   - **From Name**: RecXchange
   - **From Email**: hello@recxchange.io
   - **Reply To**: hello@recxchange.io
   - **Address**: Pinnacle Building, Sheikh Zayed Road
   - **City**: Dubai
   - **Country**: United Arab Emirates
4. Check email and click verification link
5. Sender is now verified ✅

## ⚙️ Step 3: Configure Environment Variables

### Local Development

Create/update `.env.local`:

```env
SENDGRID_API_KEY=SG.your_actual_api_key_here
```

### Production (Vercel)

1. Go to Vercel Dashboard → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Add new variable:
   - **Name**: `SENDGRID_API_KEY`
   - **Value**: Your SendGrid API key
   - **Environment**: Production, Preview, Development
4. Click **Save**
5. Redeploy your application

## 🧪 Test the API

### Test Request (cURL)

```bash
curl -X POST http://localhost:3000/api/send-3-roles \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "Test",
    "industries": ["Technology", "Finance"]
  }'
```

### Expected Response

```json
{
  "success": true,
  "message": "Email sent successfully",
  "rolesSent": 3,
  "roles": [
    {
      "id": "demo-1",
      "title": "Principal AI Engineer",
      "industry": "Technology"
    },
    {
      "id": "demo-3",
      "title": "Quantitative Researcher",
      "industry": "Finance"
    },
    {
      "id": "demo-9",
      "title": "Data Scientist",
      "industry": "Technology"
    }
  ]
}
```

### Test in Browser Console

```javascript
fetch('/api/send-3-roles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'test@example.com',
    firstName: 'Test',
    industries: ['Technology', 'Finance']
  })
})
.then(r => r.json())
.then(console.log);
```

## 🔗 Step 4: Integrate with Eavee/GHL

### Get Webhook URL

1. Log into Eavee or GoHighLevel
2. Navigate to **Automations** or **Workflows**
3. Create new workflow: "Send 3 Roles Email Sent"
4. Add **Webhook Trigger**
5. Copy the webhook URL

### Configure Webhook in API Call

```javascript
fetch('/api/send-3-roles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'recruiter@example.com',
    firstName: 'Sarah',
    industries: ['Technology', 'Finance'],
    eaveeWebhookUrl: 'https://your-eavee-webhook-url.com/endpoint' // Add this
  })
});
```

### Webhook Payload Structure

Eavee/GHL will receive:

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

### Eavee/GHL Actions

Set up follow-up actions:

1. **Tag contact**: "3-Roles-Email-Sent"
2. **Update custom field**: Last email sent date
3. **Wait 3 days**
4. **If not opened**: Send follow-up SMS
5. **If clicked but not signed up**: Send reminder email
6. **If signed up**: Move to onboarding sequence

## 📊 Step 5: Monitor Performance

### SendGrid Dashboard

1. Go to **Analytics** → **Email Activity**
2. Filter by custom args: `campaign:send_3_roles`
3. Monitor:
   - Delivery rate (target: > 95%)
   - Open rate (target: 35-45%)
   - Click rate (target: 8-12%)

### Set Up Email Webhooks (Optional)

1. **Settings** → **Mail Settings** → **Event Webhook**
2. Configure HTTP POST URL
3. Select events:
   - Delivered
   - Opened
   - Clicked
   - Bounced
   - Spam Report
4. Save settings

## 🛠️ Common Integration Patterns

### Pattern 1: Lead Magnet Follow-Up

```typescript
// After lead magnet download
app.post('/api/lead-magnet-download', async (req, res) => {
  const { email, firstName, industries } = req.body;
  
  // Store lead in database
  await db.leads.create({ email, firstName, industries });
  
  // Send 3 roles immediately
  await fetch('/api/send-3-roles', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      firstName,
      industries,
      eaveeWebhookUrl: process.env.EAVEE_WEBHOOK_URL
    })
  });
  
  res.json({ success: true });
});
```

### Pattern 2: Webinar Follow-Up

```typescript
// After webinar ends
app.post('/api/webinar-completed', async (req, res) => {
  const attendees = await getWebinarAttendees(req.body.webinarId);
  
  // Send to all attendees
  for (const attendee of attendees) {
    await fetch('/api/send-3-roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: attendee.email,
        firstName: attendee.firstName,
        industries: attendee.interests || ['Technology']
      })
    });
    
    // Rate limit: 1 email per second
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  res.json({ sent: attendees.length });
});
```

### Pattern 3: Scheduled Campaign

```typescript
// Daily cron job: send to inactive users
import cron from 'node-cron';

// Run every day at 9am GMT
cron.schedule('0 9 * * *', async () => {
  const inactiveUsers = await db.users.findMany({
    where: {
      lastLoginAt: { lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      emailsSent: { lt: 3 }
    }
  });
  
  for (const user of inactiveUsers) {
    await fetch('/api/send-3-roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        industries: user.industries
      })
    });
  }
  
  console.log(`Sent 3 roles to ${inactiveUsers.length} inactive users`);
});
```

### Pattern 4: Form Submission

```typescript
// Contact form with industry selection
app.post('/api/contact', async (req, res) => {
  const { email, firstName, message, interestedIndustries } = req.body;
  
  // Store in CRM
  await crm.createContact({ email, firstName, message });
  
  // Send 3 roles if they selected industries
  if (interestedIndustries && interestedIndustries.length > 0) {
    await fetch('/api/send-3-roles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        industries: interestedIndustries,
        eaveeWebhookUrl: process.env.EAVEE_WEBHOOK_URL
      })
    });
  }
  
  res.json({ success: true, rolesSent: interestedIndustries?.length > 0 });
});
```

## ⚠️ Important Notes

### SendGrid Free Tier Limits

- **100 emails/day** on free tier
- Upgrade to Essentials ($19.95/mo) for 50,000/month
- No daily sending limit on paid plans

### Email Best Practices

✅ **DO:**
- Send during business hours (9am-5pm GMT)
- Respect unsubscribe requests immediately
- Monitor bounce rates (keep < 5%)
- A/B test subject lines
- Track conversion from each campaign

❌ **DON'T:**
- Send to purchased email lists
- Send more than once per week per recipient
- Ignore spam complaints
- Send without proper consent
- Use misleading subject lines

### Legal Compliance

- **GDPR**: Ensure consent for marketing emails
- **CAN-SPAM**: Include unsubscribe link (already in template)
- **CASL** (Canada): Requires explicit consent
- **Privacy Policy**: Update to mention automated emails

## 🐞 Troubleshooting

### Error: "Email service not configured"

**Solution**: Check `SENDGRID_API_KEY` is set in environment variables

```bash
# Check locally
echo $SENDGRID_API_KEY

# Check in Vercel
vercel env pull
```

### Error: "Unauthorized"

**Solution**: 
1. Verify API key is correct
2. Check API key has Mail Send permissions
3. Regenerate API key if needed

### Error: "Sender address not verified"

**Solution**: Verify hello@recxchange.io in SendGrid

### Emails Not Being Delivered

**Check:**
1. Recipient email is valid
2. Not in recipient's spam folder
3. SendGrid dashboard shows "Delivered"
4. No bounces in SendGrid Activity

### No Roles Matching Industries

**Check:**
1. Industry names match role data
2. `/api/roles` endpoint is working
3. Roles have industry field populated
4. Fallback to random roles is working

## 📚 Full API Documentation

See [API_SEND_3_ROLES.md](./API_SEND_3_ROLES.md) for:
- Complete API reference
- Request/response schemas
- Advanced usage examples
- A/B testing strategies
- Webhook integration details

## ✅ Checklist

Before going live:

- [ ] SendGrid API key configured
- [ ] Sender email verified
- [ ] Test email sent successfully
- [ ] Test email received and renders correctly
- [ ] Mobile rendering tested (Gmail, Outlook, iPhone)
- [ ] Links work (sign-up CTA)
- [ ] Tracking enabled (opens, clicks)
- [ ] Eavee/GHL webhook tested (if using)
- [ ] Rate limits configured (if bulk sending)
- [ ] Unsubscribe link present and working
- [ ] Privacy policy updated
- [ ] GDPR consent collected (if EU users)

## 📞 Support

Need help?
- **Technical issues**: developers@recxchange.io
- **SendGrid problems**: Check [SendGrid Status](https://status.sendgrid.com)
- **Business questions**: hello@recxchange.io

---

**Ready to convert prospects into users? Start sending! 🚀**
