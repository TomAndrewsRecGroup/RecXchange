# RecXchange API Test Suite

Comprehensive test scripts for the GHL AI Chat API endpoint.

## Available Tests

### Python Version (Recommended)

**File:** `api-test-ghl-chat.py`

**Requirements:**
```bash
pip install requests
```

**Usage:**
```bash
python tests/api-test-ghl-chat.py
```

**Features:**
- Cross-platform (Windows, Mac, Linux)
- Colored terminal output
- Detailed response validation
- Automatic test sequencing
- Performance timing

---

### Bash Version

**File:** `api-test-ghl-chat.sh`

**Requirements:**
- `curl` (pre-installed on Mac/Linux)
- `jq` (for JSON parsing)

**Install jq:**
```bash
# Mac
brew install jq

# Ubuntu/Debian
sudo apt-get install jq

# Windows (WSL)
sudo apt-get install jq
```

**Usage:**
```bash
chmod +x tests/api-test-ghl-chat.sh
./tests/api-test-ghl-chat.sh
```

---

## Test Coverage

### Test 1: Initial Message (New Contact)
- ✅ Creates new contact in GHL
- ✅ Sends message to AI bot
- ✅ Validates response structure
- ✅ Checks for contactId, conversationId
- ✅ Verifies AI response received
- ✅ Tests page context tracking
- ✅ Tests user intent detection

### Test 2: Follow-up Message (Existing Contact)
- ✅ Reuses contact and conversation IDs
- ✅ Sends follow-up message
- ✅ Maintains conversation history
- ✅ Tests session persistence
- ✅ Validates continued AI responses

### Test 3: Handover Trigger
- ✅ Detects manual handover request
- ✅ Returns handover flag true
- ✅ Marks conversation urgent in GHL
- ✅ Tests handover message response

### Test 4: Invalid Request
- ✅ Tests error handling
- ✅ Validates 400 Bad Request response
- ✅ Checks missing required fields
- ✅ Verifies error message structure

---

## Expected Results

### ✓ All Tests Pass

```
🏁 TEST SUITE COMPLETE

📊 RESULTS:
  Total Tests: 4
  ✓ Passed: 4
  ✗ Failed: 0

✓ ALL TESTS PASSED!
```

**Next Steps:**
1. Check [Vercel logs](https://vercel.com/tom-1100s-projects/recxchange/logs) for backend processing details
2. Verify contacts created in GHL with proper tags (`ai-chat`, `recruiter`, `page-homepage`)
3. Check GHL conversations for AI bot responses
4. Confirm handover test marked conversation as starred/urgent

---

### ✗ Some Tests Fail

**Common Issues:**

#### Test 1 Fails (Initial Message)
- Check Vercel deployment status
- Verify `GHL_API_KEY` environment variable is set
- Verify `GHL_LOCATION_ID` environment variable is set
- Check GHL API key has proper permissions

#### Tests 1-3 Pass, but AI doesn't respond
- Verify `GHL_CONVERSATION_AI_AGENT_ID` is set correctly
- Check GHL AI bot is in **Autopilot mode** (not Suggestive)
- Verify **Live_Chat channel** is enabled in GHL AI bot
- Confirm AI bot is **Active/Enabled** in GHL

#### Test 3 Fails (Handover)
- Check handover trigger words in code
- Verify `detectHandoverTrigger()` function is working
- Look for handover detection logs in Vercel

#### Test 4 Fails (Invalid Request)
- Check API validation logic
- Ensure required field checks are in place
- Verify 400 error responses are properly returned

---

## Manual Testing

You can also test manually using `curl`:

### Basic Test
```bash
curl -X POST https://recxchange.vercel.app/api/ghl/ai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manual Test",
    "email": "manual@test.com",
    "message": "What is RecXchange?",
    "persona": "recruiter",
    "pageContext": "Homepage"
  }'
```

### With Pretty Print
```bash
curl -X POST https://recxchange.vercel.app/api/ghl/ai-chat \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Manual Test",
    "email": "manual@test.com",
    "message": "What is RecXchange?",
    "persona": "recruiter"
  }' | jq '.'
```

---

## Vercel Logs Check

After running tests, check Vercel logs for:

### Successful Flow
```
[GHL AI Chat] === NEW REQUEST ===
[GHL AI Chat] Page Context: Homepage
[GHL AI Chat] User Intent: general-inquiry
[GHL AI Chat] Upserting contact
[GHL AI Chat] Created new conversation: abc123
[GHL AI Chat] ✓ Inbound message posted
[GHL AI Chat] Poll attempt 1/20
[GHL AI Chat] Poll attempt 2/20
[GHL AI Chat] ✓ AI response received: <message>
[GHL AI Chat] ✓ Request completed in 2500ms
```

### AI Not Responding
```
[GHL AI Chat] Poll attempt 20/20
[GHL AI Chat] ⚠️ AI bot did not respond after 20 attempts
[GHL AI Chat] Conversation marked for human review
```

---

## GHL Verification Checklist

After successful tests, verify in GHL:

### Contacts Created
- [ ] Contact exists with test email
- [ ] Tags include: `ai-chat`, `recruiter` or `hiring-manager`, `page-homepage`
- [ ] Custom fields populated:
  - `persona`: recruiter
  - `firstContactPage`: Homepage
  - `userIntent`: general-inquiry
  - `firstContactDate`: timestamp

### Conversations Created
- [ ] Conversation exists for contact
- [ ] System context message visible
- [ ] User inbound message visible
- [ ] AI outbound response visible (if AI responding)
- [ ] Handover test conversation marked starred/urgent

---

## Support

If tests fail and you can't resolve:

1. Check [Vercel Logs](https://vercel.com/tom-1100s-projects/recxchange/logs)
2. Review [GHL API Documentation](https://highlevel.stoplight.io/)
3. Verify environment variables in Vercel dashboard
4. Test GHL AI bot manually in GHL conversations first
5. Share Vercel logs for debugging support

---

## License

© 2026 RecXchange. All rights reserved.
