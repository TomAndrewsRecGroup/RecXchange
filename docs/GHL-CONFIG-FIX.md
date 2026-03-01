# 🔧 GHL Configuration Fix

## ⚠️ Issue
GHL messages not appearing in dashboard - **Message count: 0**

## ✅ Root Cause
Environment variables need to be verified/updated in Vercel with correct IDs from your GHL AI Agent URL.

---

## 📋 Your GHL Details

From your AI Agent URL:
```
https://app.eavee.ai/v2/location/VxHBI8kbavh407OMkAcu/ai-agents/conversation-ai/agent/w1CPUs7pgRC08QGdYXCb
```

| Variable | Value |
|----------|-------|
| **Location ID** | `VxHBI8kbavh407OMkAcu` |
| **AI Agent ID** | `w1CPUs7pgRC08QGdYXCb` |

---

## 🎯 Fix Steps

### Step 1: Update Vercel Environment Variables

1. **Go to Vercel Project Settings:**
   - https://vercel.com/tom-1100s-projects/recxchange/settings/environment-variables

2. **Add/Update these 3 variables:**

   | Variable Name | Value | Environments |
   |---------------|-------|-------------|
   | `GHL_LOCATION_ID` | `VxHBI8kbavh407OMkAcu` | ✅ Production<br>✅ Preview<br>✅ Development |
   | `GHL_CONVERSATION_AI_AGENT_ID` | `w1CPUs7pgRC08QGdYXCb` | ✅ Production<br>✅ Preview<br>✅ Development |
   | `GHL_API_KEY` | `[your-api-key]` | ✅ Production<br>✅ Preview<br>✅ Development |

3. **For each variable:**
   - Click "Add New" or "Edit" if exists
   - Enter the **exact** values above
   - Check **all three** environment checkboxes
   - Click "Save"

---

### Step 2: Get Your GHL API Key

If you don't have your API key:

1. **Log in to GoHighLevel**
2. **Go to Settings → Company → API Keys** (or Settings → API Key)
3. **Create a new API key** (or use existing)
4. **Required Permissions:**
   - ✅ Contacts (read/write)
   - ✅ Conversations (read/write)
   - ✅ Messages (read/write)
5. **Copy the key** and add to Vercel as `GHL_API_KEY`

---

### Step 3: Redeploy Vercel Application

⚠️ **CRITICAL:** Environment variables only apply to NEW deployments!

1. **Go to Deployments:**
   - https://vercel.com/tom-1100s-projects/recxchange/deployments

2. **Find the latest deployment**

3. **Click the `...` menu** (three dots)

4. **Click "Redeploy"**

5. **Wait for deployment to complete** (~1-2 minutes)

---

### Step 4: Verify Configuration

**Run the verification script:**

```bash
python tests/verify-ghl-config.py
```

This will:
- ✅ Show you the expected values
- ✅ Guide you through checking Vercel env vars
- ✅ Test your GHL API connection (optional)
- ✅ Verify your AI agent exists and is active

---

### Step 5: Run Full API Test

**After redeploying, test the integration:**

```bash
python tests/api-test-ghl-chat.py
```

**Expected result:**
```
✓ TEST 1: INITIAL MESSAGE - SUCCESS
🤖 GHL AI Bot Response:
  RecXchange is a recruiter collaboration platform...
```

---

## 🔍 Verify in GHL Dashboard

After test passes, check your GHL dashboard:

1. **Go to:** https://app.eavee.ai/v2/location/VxHBI8kbavh407OMkAcu/conversations

2. **You should see:**
   - ✅ New contact: `api.test+[timestamp]@recxchange.test`
   - ✅ New conversation with messages
   - ✅ User inbound message
   - ✅ AI bot outbound response

3. **Verify contact tags:**
   - ✅ `ai-chat`
   - ✅ `recruiter` or `hiring-manager`
   - ✅ `recxchange-website`
   - ✅ `page-[pagename]`

---

## 🚨 Troubleshooting

### Issue: "Message count: 0" in logs

**Cause:** Wrong Location ID or API key doesn't have access

**Fix:**
1. Verify `GHL_LOCATION_ID` matches: `VxHBI8kbavh407OMkAcu`
2. Check API key has permissions for this location
3. Redeploy after fixing

---

### Issue: "AI bot did not respond"

**Cause:** AI agent not active or misconfigured

**Fix:**
1. Go to: https://app.eavee.ai/v2/location/VxHBI8kbavh407OMkAcu/ai-agents/conversation-ai/agent/w1CPUs7pgRC08QGdYXCb
2. Check **Bot Status:** Must be **"On"** or **"Autopilot"**
3. Check **Channel:** `Live_Chat` must be enabled
4. Verify agent has training/knowledge base configured

---

### Issue: "Failed to create contact"

**Cause:** Invalid API key or insufficient permissions

**Fix:**
1. Go to GHL Settings → API Keys
2. Verify key has:
   - ✅ Contacts: read/write
   - ✅ Conversations: read/write
   - ✅ Messages: read/write
3. Update `GHL_API_KEY` in Vercel
4. Redeploy

---

### Issue: Variables not taking effect

**Cause:** Need to redeploy after changing environment variables

**Fix:**
1. Go to Vercel Deployments
2. Click `...` → "Redeploy" on latest deployment
3. Wait for completion
4. Test again

---

## ✅ Quick Checklist

- [ ] Updated `GHL_LOCATION_ID` in Vercel
- [ ] Updated `GHL_CONVERSATION_AI_AGENT_ID` in Vercel
- [ ] Updated `GHL_API_KEY` in Vercel
- [ ] All three variables have checkmarks for Production/Preview/Development
- [ ] Redeployed Vercel application
- [ ] Ran verification script: `python tests/verify-ghl-config.py`
- [ ] Ran API test: `python tests/api-test-ghl-chat.py`
- [ ] Verified messages appear in GHL dashboard
- [ ] Verified AI bot responds in GHL conversations

---

## 📞 Need Help?

1. **Check Vercel logs:**
   - https://vercel.com/tom-1100s-projects/recxchange/logs
   - Look for `[GHL AI Chat]` entries

2. **Check GHL conversations:**
   - https://app.eavee.ai/v2/location/VxHBI8kbavh407OMkAcu/conversations

3. **Run diagnostic script:**
   ```bash
   python tests/verify-ghl-config.py
   ```

---

## 🎯 Expected Working Flow

```
User sends message
    ↓
API receives request
    ↓
API creates contact in GHL (Location: VxHBI8kbavh407OMkAcu)
    ↓
API creates conversation in GHL
    ↓
API posts message to conversation
    ↓
GHL AI Agent (w1CPUs7pgRC08QGdYXCb) receives message
    ↓
AI Agent "RecXchange Support" processes message
    ↓
AI Agent sends response
    ↓
API polls and fetches response
    ↓
API returns response to frontend
    ↓
User sees response ✓
```

---

## 📊 Vercel Logs - What to Look For

**Successful flow:**
```
[GHL AI Chat] === NEW REQUEST ===
[GHL AI Chat] Upserting contact
[GHL AI Chat] New contact created: abc123
[GHL AI Chat] Created new conversation: xyz456
[GHL AI Chat] → Sending to GHL AI bot
[GHL AI Chat] ✓ Message posted via inbound endpoint
[GHL AI Chat] Polling for AI response...
[GHL AI Chat] Poll attempt 1/20
[GHL AI Chat] Poll attempt 3/20
[GHL AI Chat] ✓ AI response received
[GHL AI Chat] ✓ Completed in 2500ms
```

**Failed flow (wrong config):**
```
[GHL AI Chat] === NEW REQUEST ===
[GHL AI Chat] Current message count: 0  ← PROBLEM: Can't read messages
[GHL AI Chat] ✗ Error: Failed to create contact
```

---

**Last Updated:** 2026-03-01
