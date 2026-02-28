# GoHighLevel Conversational AI - Custom Actions Setup Guide

This guide explains how to configure your GHL Conversational AI agent ("RecXchange Support") to trigger automations via Custom Actions.

## 🎯 Overview

Your RecXchange Support AI can now:
1. **Send 3 Roles** - Email matched roles to recruiters
2. **Learn RecX Direct** - Explain premium tier benefits
3. **Schedule Call** - Book discovery calls for hiring managers

---

## 📋 Available Webhook Endpoints

### 1. Send 3 Roles (Recruiters)

**Webhook URL:**
```
https://recxchange.io/api/ghl/ai-actions/send-roles
```

**Method:** `POST`

**Request Body:**
```json
{
  "contactId": "{{contact.id}}",
  "conversationId": "{{conversation.id}}",
  "email": "{{contact.email}}",
  "firstName": "{{contact.first_name}}",
  "industries": ["Technology", "Finance", "Healthcare"]
}
```

**When to Trigger:**
- User says "send me roles"
- User asks "what roles do you have?"
- User wants to see matched opportunities

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "rolesSent": 3,
    "industries": ["Technology", "Finance"],
    "answer": "Great! I've sent 3 live roles..."
  }
}
```

---

### 2. Learn About RecX Direct (Recruiters)

**Webhook URL:**
```
https://recxchange.io/api/ghl/ai-actions/learn-recx-direct
```

**Method:** `POST`

**Request Body:**
```json
{
  "contactId": "{{contact.id}}",
  "conversationId": "{{conversation.id}}",
  "email": "{{contact.email}}",
  "firstName": "{{contact.first_name}}"
}
```

**When to Trigger:**
- User asks "what is RecX Direct?"
- User inquires about higher split fees
- User wants premium tier information

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "info": { /* RecX Direct details */ },
    "answer": "RecX Direct is our premium tier..."
  }
}
```

---

### 3. Schedule Call (Hiring Managers)

**Webhook URL:**
```
https://recxchange.io/api/ghl/ai-actions/schedule-call
```

**Method:** `POST`

**Request Body:**
```json
{
  "contactId": "{{contact.id}}",
  "conversationId": "{{conversation.id}}",
  "email": "{{contact.email}}",
  "firstName": "{{contact.first_name}}",
  "companyName": "{{contact.company_name}}"
}
```

**When to Trigger:**
- User says "I want to schedule a call"
- User asks to "speak with someone"
- User wants a consultation

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "bookingLink": "https://...",
    "answer": "Perfect! Here's your booking link..."
  }
}
```

---

## 🛠️ Setup Instructions in GHL

### Step 1: Navigate to Custom Actions
1. Go to **Settings** → **Conversation AI** → **Custom Actions**
2. Click **+ Create Action**

### Step 2: Configure Each Action

For each webhook above:

1. **Action Name:** `Send 3 Roles` / `Learn RecX Direct` / `Schedule Call`
2. **Description:** Brief description of what it does
3. **Webhook URL:** Copy from above
4. **Method:** POST
5. **Headers:** None required (auth handled server-side)
6. **Request Body:** Use the JSON template above with GHL variables

### Step 3: Define Trigger Conditions

**For "Send 3 Roles":**
- Intent: "User wants to see matched roles"
- Keywords: "send roles", "show me jobs", "what roles", "see opportunities"
- Context: Only for contacts tagged as "recruiter"

**For "Learn RecX Direct":**
- Intent: "User asks about RecX Direct or higher splits"
- Keywords: "recx direct", "higher split", "70%", "premium tier"
- Context: Only for contacts tagged as "recruiter"

**For "Schedule Call":**
- Intent: "User wants to book a consultation"
- Keywords: "schedule call", "book meeting", "speak with someone", "consultation"
- Context: Only for contacts tagged as "hiring-manager"

### Step 4: Map Response Data

In your AI Agent configuration:

1. Go to **Response Settings**
2. Enable **Use Custom Action Response**
3. Map the `answer` field from webhook response to AI reply:
   ```
   {{custom_action.response.data.answer}}
   ```

### Step 5: Test Each Action

1. Use the **Test Webhook** button in GHL
2. Verify the response format
3. Check that conversation messages are sent
4. Confirm tags are applied correctly

---

## 🎨 Example Conversation Flows

### Recruiter Flow: Send 3 Roles

```
User: "What roles do you have available?"

AI: "I can send you 3 live roles matched to your sectors! 
     What industries do you recruit in?"

User: "Technology and Finance"

AI: [Triggers Send 3 Roles webhook]
    "Great! I've sent 3 live roles matched to Technology 
     and Finance to your email. Check your inbox in 2-3 minutes!"
```

### Recruiter Flow: Learn RecX Direct

```
User: "What's RecX Direct?"

AI: [Triggers Learn RecX Direct webhook]
    "RecX Direct is our premium tier where you earn up to 70% 
     split fees (vs. 50% standard). Here are the key benefits..."
```

### Hiring Manager Flow: Schedule Call

```
User: "I'd like to schedule a call to discuss my hiring needs"

AI: [Triggers Schedule Call webhook]
    "Perfect! I'd love to connect you with our team. 
     Here's your personalized booking link: [link]
     
     What to expect on the call:
     • 15-30 minute consultation
     • Discuss your hiring needs..."
```

---

## 🔐 Environment Variables Required

Make sure these are set in your `.env` or Vercel:

```bash
GHL_API_KEY=your_api_key
GHL_LOCATION_ID=your_location_id
GHL_CONVERSATION_AI_AGENT_ID=your_agent_id
GHL_CALENDAR_ID=your_calendar_id (optional, for schedule-call)
```

---

## 📊 What Happens Behind the Scenes

### Send 3 Roles:
1. ✅ Validates contact data
2. ✅ Calls `/api/send-3-roles` with industries
3. ✅ Sends personalized email with 3 matched roles
4. ✅ Posts confirmation message to GHL conversation
5. ✅ Returns AI-friendly response

### Learn RecX Direct:
1. ✅ Retrieves RecX Direct benefits and comparison
2. ✅ Sends detailed message to GHL conversation
3. ✅ Tags contact as "interested-recx-direct"
4. ✅ Returns structured info for AI to explain

### Schedule Call:
1. ✅ Generates personalized booking link
2. ✅ Tags contact as "call-requested"
3. ✅ Sends booking link + instructions to conversation
4. ✅ Creates follow-up task for sales team
5. ✅ Returns booking info for AI response

---

## 🐛 Troubleshooting

### Webhook Not Triggering
- ✅ Check Custom Action is **enabled**
- ✅ Verify trigger conditions match user intent
- ✅ Check AI Agent has Custom Actions enabled
- ✅ Review GHL logs for errors

### Response Not Showing in Chat
- ✅ Verify `conversationId` is passed correctly
- ✅ Check GHL API credentials are valid
- ✅ Ensure response mapping is configured in AI settings

### Email Not Sending (Send 3 Roles)
- ✅ Verify SendGrid API key is configured
- ✅ Check `/api/send-3-roles` logs
- ✅ Confirm email format is valid

---

## 📞 Support

If you encounter issues:
1. Check server logs in Vercel
2. Review GHL webhook logs
3. Test endpoints directly with Postman
4. Contact support@recxchange.io

---

## 🚀 Next Steps

1. ✅ Configure each Custom Action in GHL
2. ✅ Test each workflow end-to-end
3. ✅ Update AI prompts to mention these capabilities
4. ✅ Monitor performance in GHL analytics
5. ✅ Iterate based on user feedback
