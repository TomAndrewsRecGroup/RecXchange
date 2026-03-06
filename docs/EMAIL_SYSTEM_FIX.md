# Weekly Email System - Issue & Resolution

**Date:** March 6, 2026  
**Issue:** Not receiving weekly funnel emails every Monday

---

## 🔴 Problem Identified

### **Root Cause: Cron Job Pointing to Old Endpoint**

Your `vercel.json` was configured to call the **deprecated** combined email endpoint:
```json
{
  "crons": [
    {
      "path": "/api/analytics/email-funnel",  // ❌ OLD
      "schedule": "0 9 * * 1"
    }
  ]
}
```

This endpoint `/api/analytics/email-funnel` sends **one combined email** with both recruiter and hiring manager funnels.

However, according to your documentation, the system was updated to send **two separate targeted emails**:
- 💼 **Recruiter Email**: `/api/analytics/email-recruiter-funnel`
- 📋 **Hiring Manager Email**: `/api/analytics/email-hiring-manager-funnel`

The cron job was never updated to point to the new endpoints!

---

## ✅ Solution Applied

### **Updated `vercel.json`**

Now configured with **TWO cron jobs** for the separate emails:

```json
{
  "crons": [
    {
      "path": "/api/analytics/email-recruiter-funnel",
      "schedule": "0 9 * * 1"
    },
    {
      "path": "/api/analytics/email-hiring-manager-funnel",
      "schedule": "0 9 * * 1"
    }
  ]
}
```

**What This Does:**
- Every Monday at 9:00 AM UTC
- Sends **two separate emails** to `FUNNEL_EMAIL_TO`
- One focused on recruiter metrics + GHL tier data
- One focused on hiring manager call booking metrics

---

## 📊 Email Configuration Status

### **Environment Variables (All Configured ✅)**

| Variable | Status | Purpose |
|----------|--------|----------|
| `SENDGRID_API_KEY` | ✅ Configured | SendGrid authentication |
| `SENDGRID_FROM_EMAIL` | ✅ Configured | Sender email address |
| `FUNNEL_EMAIL_TO` | ✅ Configured | Your recipient email |
| `GHL_API_KEY` | ✅ Configured | GoHighLevel API access |
| `GHL_LOCATION_ID` | ✅ Configured | Your GHL location |

### **Email Endpoints**

| Endpoint | Purpose | Test URL |
|----------|---------|----------|
| `/api/analytics/email-recruiter-funnel` | Weekly recruiter report | [Test](https://recxchange.vercel.app/api/analytics/email-recruiter-funnel) |
| `/api/analytics/email-hiring-manager-funnel` | Weekly hiring manager report | [Test](https://recxchange.vercel.app/api/analytics/email-hiring-manager-funnel) |

---

## 🚀 What Happens Next

### **Automatic Deployment**
1. The updated `vercel.json` is now committed
2. Vercel will automatically detect the cron configuration
3. **Next Monday (March 10, 2026 at 9:00 AM UTC)**, both emails will be sent

### **You Don't Need to Do Anything in Vercel Dashboard**

✨ Vercel automatically reads cron jobs from `vercel.json` - no manual configuration needed!

The cron jobs will:
- Run every Monday at 9:00 AM UTC (9:00 AM GMT in winter, 8:00 AM GMT in summer)
- Send to the email in `FUNNEL_EMAIL_TO`
- Include all funnel data from the previous 7 days
- Include GHL tier signup data (if available)

---

## 🧪 Testing Now (Before Monday)

### **Option 1: Test Dashboard (Visual)**
1. Go to: [https://recxchange.vercel.app/test-dashboard](https://recxchange.vercel.app/test-dashboard)
2. Click "Run Email Audit"
3. If ready, click "Send Recruiter Test Email" and "Send Hiring Manager Test Email"
4. Check your inbox for both emails

### **Option 2: Direct API Calls**

**Send test recruiter email:**
```bash
curl -X POST https://recxchange.vercel.app/api/analytics/email-recruiter-funnel
```

**Send test hiring manager email:**
```bash
curl -X POST https://recxchange.vercel.app/api/analytics/email-hiring-manager-funnel
```

**Or use the audit endpoint to trigger:**
```bash
# Test recruiter email
curl "https://recxchange.vercel.app/api/test/email-audit?sendTest=recruiter"

# Test hiring manager email
curl "https://recxchange.vercel.app/api/test/email-audit?sendTest=hm"
```

---

## 📧 Email Content Preview

### **💼 Recruiter Email**
**Subject:** "💼 Recruiter Funnel Report - [Date]"

**Includes:**
1. **GHL Actual Signups Section** (cyan border)
   - Website visitors this week
   - Paid signups (website + tier tag)
   - Conversion rate
   - Tier breakdown (Entry, Lite, Pro, Teams)

2. **8-Stage Recruiter Signup Funnel**
   - Total visitors
   - Conversion rate
   - Per-stage drop-off analysis
   - Biggest problem area highlighted

3. **Quick Action Stats**
   - Candidate match requests count

### **📋 Hiring Manager Email**
**Subject:** "📋 Hiring Manager Funnel Report - [Date]"

**Includes:**
1. **8-Stage Call Booking Funnel** (purple theme)
   - Total visitors
   - Call booking rate
   - Per-stage drop-off analysis
   - Biggest problem area highlighted

2. **Quick Action Stats**
   - RecX Direct info requests count

---

## ⚠️ Known Issues & Notes

### **GHL Tier Data May Show 0%**

For a contact to count as a "paid signup":
1. Must have a **website tag** (website, recxchange, web form, cta, etc.)
2. Must have a **tier tag** (os subs entry, lite, pro, or teams)
3. Must have been added in the **last 7 days**

If you see 0% conversion:
- Check that contacts are being tagged properly in GHL
- Verify your automation adds BOTH tags
- Check the last 7 days had actual signups

### **Test Results From GHL Sandbox**

Your recent test showed:
- ✅ Can read contacts (10 found)
- ✅ Can create contacts
- ⚠️ 0 paid tier signups in last 7 days
- ❌ Location/Tags API requires broader scope (not needed for emails!)

The location/tags 401 errors are **not a problem** - your API token has contacts-only permissions, which is sufficient for the weekly emails.

---

## 📅 Schedule

**Current Schedule:** Every Monday at 9:00 AM UTC

**UTC to Your Time:**
- 🇬🇧 UK (GMT): 9:00 AM (winter) / 8:00 AM (BST summer)
- 🇺🇸 US Eastern: 4:00 AM EST / 5:00 AM EDT
- 🇺🇸 US Pacific: 1:00 AM PST / 2:00 AM PDT

**Next Scheduled Send:** Monday, March 10, 2026 at 9:00 AM UTC

---

## 🔧 Future Maintenance

### **If Emails Stop Coming Again:**

1. Check cron job configuration:
   ```bash
   cat vercel.json
   ```
   Should show both email endpoints with `0 9 * * 1` schedule

2. Test endpoints manually:
   ```bash
   curl -X POST https://recxchange.vercel.app/api/analytics/email-recruiter-funnel
   curl -X POST https://recxchange.vercel.app/api/analytics/email-hiring-manager-funnel
   ```

3. Check Vercel deployment logs for errors

4. Verify environment variables are still set in Vercel

5. Use test dashboard: `/test-dashboard`

### **To Change Email Schedule:**

Edit `vercel.json` and change the `schedule` field:

```json
"schedule": "0 9 * * 1"  // Monday at 9am
"schedule": "0 9 * * 5"  // Friday at 9am
"schedule": "0 17 * * 1" // Monday at 5pm
```

Cron syntax: `minute hour day month weekday`

---

## ✅ Summary

**Problem:** Cron job was calling old deprecated endpoint  
**Solution:** Updated `vercel.json` to call new separate email endpoints  
**Status:** ✅ Fixed and deployed  
**Next Action:** Wait for Monday or send test emails now  
**Expected Result:** Two separate targeted emails every Monday at 9am UTC  

---

## 📞 Support

If issues persist:
1. Use the test dashboard at `/test-dashboard`
2. Check logs in Vercel deployment
3. Verify all environment variables are set
4. Test endpoints manually with curl
