#!/bin/bash

# Quick Test Script - RecXchange GHL AI Chat
# Tests with Chat Widget (SMS Chat) channel enabled

echo "================================================================================"
echo "🧪 RECXCHANGE GHL AI CHAT - QUICK TEST"
echo "================================================================================"
echo ""
echo "📝 Testing with Chat Widget (SMS Chat) channel now enabled"
echo ""

# Generate timestamp for unique email
TIMESTAMP=$(date +%s)
EMAIL="api.test+${TIMESTAMP}@recxchange.test"

echo "📤 Sending test message..."
echo "   Email: $EMAIL"
echo "   Message: What is RecXchange?"
echo ""
echo "⏳ Waiting for response (may take 10-15 seconds)..."
echo ""

# Send request
RESPONSE=$(curl -s -w "\n%{http_code}" -X POST https://recxchange.vercel.app/api/ghl/ai-chat \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User API\",
    \"email\": \"$EMAIL\",
    \"message\": \"What is RecXchange?\",
    \"persona\": \"recruiter\",
    \"pageContext\": \"Homepage\"
  }" \
  --max-time 30)

# Split response and status code
BODY=$(echo "$RESPONSE" | head -n -1)
STATUS=$(echo "$RESPONSE" | tail -n 1)

echo "Status Code: $STATUS"
echo ""

if [ "$STATUS" = "200" ]; then
  echo "✅ SUCCESS - API responded!"
  echo ""
  echo "Response:"
  echo "$BODY" | jq '.' 2>/dev/null || echo "$BODY"
  echo ""
  
  # Extract message
  MESSAGE=$(echo "$BODY" | jq -r '.message' 2>/dev/null)
  
  if [ ! -z "$MESSAGE" ] && [ "$MESSAGE" != "null" ]; then
    echo "🤖 GHL AI Bot Response:"
    echo "────────────────────────────────────────────────────────────────────────────────"
    echo "$MESSAGE" | head -c 300
    echo ""
    echo "────────────────────────────────────────────────────────────────────────────────"
    echo ""
    echo "🎉 SUCCESS! Your GHL AI bot is responding!"
    echo ""
    echo "📍 Next Steps:"
    echo "  1. Check GHL Dashboard:"
    echo "     https://app.eavee.ai/v2/location/VxHBI8kbavh407OMkAcu/conversations"
    echo "  2. Look for contact: $EMAIL"
    echo "  3. Verify bot response in conversation"
    echo "  4. Test on live website: https://recxchange.vercel.app"
  else
    echo "⚠️ No message in response - check Vercel logs"
  fi
else
  echo "❌ FAILED - Status $STATUS"
  echo ""
  echo "Response:"
  echo "$BODY"
  echo ""
  echo "🔍 Troubleshooting:"
  echo "  • Check Vercel deployment is live"
  echo "  • Verify environment variables are set"
  echo "  • Ensure 'Chat Widget (SMS Chat)' channel is enabled in GHL"
  echo "  • Check Vercel logs: https://vercel.com/tom-1100s-projects/recxchange/logs"
fi

echo ""
echo "================================================================================"
echo "TEST COMPLETE"
echo "================================================================================"
