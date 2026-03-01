#!/bin/bash

# RecXchange GHL AI Chat API Test Suite
# Run this script to test the GHL AI chat endpoint

BASE_URL="https://recxchange.vercel.app"
API_ENDPOINT="${BASE_URL}/api/ghl/ai-chat"

echo "================================================================================"
echo "🧪 RECXCHANGE GHL AI CHAT API TEST SUITE"
echo "================================================================================"
echo ""
echo "Target: ${API_ENDPOINT}"
echo "Date: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TEST_COUNT=0
PASS_COUNT=0
FAIL_COUNT=0

# Function to print test header
test_header() {
  echo ""
  echo "────────────────────────────────────────────────────────────────────────────────"
  echo "📤 TEST $1: $2"
  echo "────────────────────────────────────────────────────────────────────────────────"
}

# Function to check response
check_response() {
  local response=$1
  local status_code=$(echo "$response" | tail -n1)
  local body=$(echo "$response" | sed '$d')
  
  if [ "$status_code" = "200" ]; then
    echo -e "${GREEN}✓ SUCCESS - Status 200 OK${NC}"
    echo ""
    echo "Response Body:"
    echo "$body" | jq '.'
    PASS_COUNT=$((PASS_COUNT + 1))
    return 0
  else
    echo -e "${RED}✗ FAILED - Status $status_code${NC}"
    echo "Response: $body"
    FAIL_COUNT=$((FAIL_COUNT + 1))
    return 1
  fi
}

# ===========================
# TEST 1: Initial Message (New Contact)
# ===========================
test_header "1" "INITIAL MESSAGE (New Contact)"
TEST_COUNT=$((TEST_COUNT + 1))

echo "Payload:"
cat <<EOF | jq '.'
{
  "name": "Test User API",
  "email": "api.test+$(date +%s)@recxchange.test",
  "message": "What is RecXchange?",
  "persona": "recruiter",
  "pageContext": "Homepage",
  "userIntent": "general-inquiry"
}
EOF

echo ""
echo "Sending request..."

RESPONSE1=$(curl -s -w "\n%{http_code}" -X POST "${API_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Test User API\",
    \"email\": \"api.test+$(date +%s)@recxchange.test\",
    \"message\": \"What is RecXchange?\",
    \"persona\": \"recruiter\",
    \"pageContext\": \"Homepage\",
    \"userIntent\": \"general-inquiry\"
  }")

check_response "$RESPONSE1"

# Extract IDs for follow-up test
CONTACT_ID=$(echo "$RESPONSE1" | sed '$d' | jq -r '.contactId')
CONVERSATION_ID=$(echo "$RESPONSE1" | sed '$d' | jq -r '.conversationId')
AI_MESSAGE=$(echo "$RESPONSE1" | sed '$d' | jq -r '.message')

if [ "$CONTACT_ID" != "null" ] && [ "$CONTACT_ID" != "" ]; then
  echo ""
  echo "📝 Stored for next test:"
  echo "  contactId: $CONTACT_ID"
  echo "  conversationId: $CONVERSATION_ID"
  echo ""
  echo "💬 AI Response Preview:"
  echo "  ${AI_MESSAGE:0:150}..."
fi

sleep 3

# ===========================
# TEST 2: Follow-up Message (Existing Contact)
# ===========================
if [ "$CONTACT_ID" != "null" ] && [ "$CONTACT_ID" != "" ]; then
  test_header "2" "FOLLOW-UP MESSAGE (Existing Contact)"
  TEST_COUNT=$((TEST_COUNT + 1))
  
  echo "Using stored IDs:"
  echo "  contactId: $CONTACT_ID"
  echo "  conversationId: $CONVERSATION_ID"
  echo ""
  
  echo "Payload:"
  cat <<EOF | jq '.'
{
  "contactId": "$CONTACT_ID",
  "conversationId": "$CONVERSATION_ID",
  "message": "How much is RecX Lite?",
  "pageContext": "Pricing",
  "history": [
    {"role": "assistant", "content": "Previous message"},
    {"role": "user", "content": "How much is RecX Lite?"}
  ]
}
EOF
  
  echo ""
  echo "Sending request..."
  
  RESPONSE2=$(curl -s -w "\n%{http_code}" -X POST "${API_ENDPOINT}" \
    -H "Content-Type: application/json" \
    -d "{
      \"contactId\": \"$CONTACT_ID\",
      \"conversationId\": \"$CONVERSATION_ID\",
      \"message\": \"How much is RecX Lite?\",
      \"pageContext\": \"Pricing\",
      \"history\": [
        {\"role\": \"assistant\", \"content\": \"Previous message\"},
        {\"role\": \"user\", \"content\": \"How much is RecX Lite?\"}
      ]
    }")
  
  check_response "$RESPONSE2"
  
  sleep 3
fi

# ===========================
# TEST 3: Handover Trigger
# ===========================
test_header "3" "HANDOVER TRIGGER"
TEST_COUNT=$((TEST_COUNT + 1))

echo "Testing handover trigger with message: 'I want to speak to a human'"
echo ""

echo "Payload:"
cat <<EOF | jq '.'
{
  "name": "Handover Test User",
  "email": "handover.test+$(date +%s)@recxchange.test",
  "message": "I want to speak to a human",
  "persona": "hiring-manager",
  "companyName": "Test Company Inc",
  "pageContext": "Contact"
}
EOF

echo ""
echo "Sending request..."

RESPONSE3=$(curl -s -w "\n%{http_code}" -X POST "${API_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"Handover Test User\",
    \"email\": \"handover.test+$(date +%s)@recxchange.test\",
    \"message\": \"I want to speak to a human\",
    \"persona\": \"hiring-manager\",
    \"companyName\": \"Test Company Inc\",
    \"pageContext\": \"Contact\"
  }")

if check_response "$RESPONSE3"; then
  HANDOVER_FLAG=$(echo "$RESPONSE3" | sed '$d' | jq -r '.handover')
  echo ""
  echo "📊 Handover Validation:"
  if [ "$HANDOVER_FLAG" = "true" ]; then
    echo -e "  ${GREEN}✓ Handover flag: true${NC}"
  else
    echo -e "  ${RED}✗ Handover flag: $HANDOVER_FLAG (expected: true)${NC}"
  fi
fi

# ===========================
# TEST 4: Invalid Request (Missing Fields)
# ===========================
test_header "4" "INVALID REQUEST (Missing Fields)"
TEST_COUNT=$((TEST_COUNT + 1))

echo "Testing error handling with missing required fields"
echo ""

echo "Payload:"
cat <<EOF | jq '.'
{
  "message": "This should fail"
}
EOF

echo ""
echo "Sending request..."

RESPONSE4=$(curl -s -w "\n%{http_code}" -X POST "${API_ENDPOINT}" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"This should fail\"
  }")

STATUS_CODE=$(echo "$RESPONSE4" | tail -n1)
if [ "$STATUS_CODE" = "400" ]; then
  echo -e "${GREEN}✓ SUCCESS - Correctly rejected with 400 Bad Request${NC}"
  echo ""
  echo "Response:"
  echo "$RESPONSE4" | sed '$d' | jq '.'
  PASS_COUNT=$((PASS_COUNT + 1))
else
  echo -e "${RED}✗ FAILED - Expected 400, got $STATUS_CODE${NC}"
  FAIL_COUNT=$((FAIL_COUNT + 1))
fi

# ===========================
# SUMMARY
# ===========================
echo ""
echo "================================================================================"
echo "🏁 TEST SUITE COMPLETE"
echo "================================================================================"
echo ""
echo "📊 RESULTS:"
echo "  Total Tests: $TEST_COUNT"
echo -e "  ${GREEN}Passed: $PASS_COUNT${NC}"
echo -e "  ${RED}Failed: $FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
  echo -e "${GREEN}✓ ALL TESTS PASSED!${NC}"
  echo ""
  echo "💡 NEXT STEPS:"
  echo "  1. Check Vercel logs: https://vercel.com/tom-1100s-projects/recxchange/logs"
  echo "  2. Verify contacts in GHL with proper tags and custom fields"
  echo "  3. Check GHL conversations for AI responses"
  echo "  4. Confirm handover marked conversations as urgent/starred"
  exit 0
else
  echo -e "${RED}✗ SOME TESTS FAILED${NC}"
  echo ""
  echo "🔍 TROUBLESHOOTING:"
  echo "  • Check Vercel deployment is successful"
  echo "  • Verify GHL_API_KEY, GHL_LOCATION_ID, GHL_CONVERSATION_AI_AGENT_ID env vars"
  echo "  • Check GHL AI bot is in Autopilot mode with Live_Chat enabled"
  echo "  • Review Vercel logs for detailed error messages"
  exit 1
fi
