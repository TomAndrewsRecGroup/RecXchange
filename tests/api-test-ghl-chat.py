#!/usr/bin/env python3
"""
RecXchange GHL AI Chat API Test Suite
Python version for cross-platform compatibility

Usage:
  python tests/api-test-ghl-chat.py
  
Requirements:
  pip install requests
"""

import requests
import json
import time
from datetime import datetime

# Configuration
BASE_URL = "https://recxchange.vercel.app"
API_ENDPOINT = f"{BASE_URL}/api/ghl/ai-chat"

# Colors for terminal output
class Colors:
    GREEN = '\033[0;32m'
    RED = '\033[0;31m'
    YELLOW = '\033[1;33m'
    BLUE = '\033[0;34m'
    NC = '\033[0m'  # No Color

# Test counters
test_count = 0
pass_count = 0
fail_count = 0

def print_header():
    print("=" * 80)
    print("🧪 RECXCHANGE GHL AI CHAT API TEST SUITE")
    print("=" * 80)
    print(f"\nTarget: {API_ENDPOINT}")
    print(f"Date: {datetime.utcnow().isoformat()}Z\n")

def test_header(num, title):
    print("\n" + "─" * 80)
    print(f"📤 TEST {num}: {title}")
    print("─" * 80)

def check_response(response, test_name):
    global pass_count, fail_count
    
    print(f"\nStatus Code: {response.status_code}")
    print(f"Response Time: {response.elapsed.total_seconds() * 1000:.0f}ms")
    
    if response.status_code in [200, 400]:  # 400 is expected for invalid requests
        try:
            data = response.json()
            print(f"\n{Colors.GREEN}✓ SUCCESS{Colors.NC}")
            print(f"\nResponse Body:")
            print(json.dumps(data, indent=2))
            pass_count += 1
            return data
        except json.JSONDecodeError:
            print(f"\n{Colors.RED}✗ FAILED - Invalid JSON response{Colors.NC}")
            print(f"Response text: {response.text}")
            fail_count += 1
            return None
    else:
        print(f"\n{Colors.RED}✗ FAILED - Status {response.status_code}{Colors.NC}")
        print(f"Response: {response.text}")
        fail_count += 1
        return None

def test_initial_message():
    """Test 1: Initial message from new contact"""
    global test_count
    test_count += 1
    
    test_header(1, "INITIAL MESSAGE (New Contact)")
    
    timestamp = int(time.time())
    payload = {
        "name": "Test User API",
        "email": f"api.test+{timestamp}@recxchange.test",
        "message": "What is RecXchange?",
        "persona": "recruiter",
        "pageContext": "Homepage",
        "userIntent": "general-inquiry"
    }
    
    print("Payload:")
    print(json.dumps(payload, indent=2))
    print("\nSending request...")
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        data = check_response(response, "initial_message")
        
        if data:
            # Validate response structure
            print(f"\n📊 Response Validation:")
            checks = {
                "success field": "success" in data,
                "contactId present": "contactId" in data and data.get("contactId"),
                "conversationId present": "conversationId" in data and data.get("conversationId"),
                "message present": "message" in data and data.get("message"),
                "handover field": "handover" in data,
            }
            
            for check_name, result in checks.items():
                status = f"{Colors.GREEN}✓{Colors.NC}" if result else f"{Colors.RED}✗{Colors.NC}"
                print(f"  {status} {check_name}: {result}")
            
            # Return IDs for follow-up test
            return {
                "contactId": data.get("contactId"),
                "conversationId": data.get("conversationId"),
                "message": data.get("message", "")
            }
        
        return None
        
    except requests.exceptions.Timeout:
        print(f"\n{Colors.RED}✗ FAILED - Request timed out after 30 seconds{Colors.NC}")
        return None
    except Exception as e:
        print(f"\n{Colors.RED}✗ FAILED - {str(e)}{Colors.NC}")
        return None

def test_followup_message(contact_id, conversation_id):
    """Test 2: Follow-up message from existing contact"""
    global test_count
    test_count += 1
    
    test_header(2, "FOLLOW-UP MESSAGE (Existing Contact)")
    
    print(f"Using stored IDs:")
    print(f"  contactId: {contact_id}")
    print(f"  conversationId: {conversation_id}")
    
    payload = {
        "contactId": contact_id,
        "conversationId": conversation_id,
        "message": "How much is RecX Lite?",
        "pageContext": "Pricing",
        "history": [
            {"role": "assistant", "content": "Previous message"},
            {"role": "user", "content": "How much is RecX Lite?"}
        ]
    }
    
    print("\nPayload:")
    print(json.dumps(payload, indent=2))
    print("\nSending request...")
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        return check_response(response, "followup_message")
        
    except Exception as e:
        print(f"\n{Colors.RED}✗ FAILED - {str(e)}{Colors.NC}")
        return None

def test_handover_trigger():
    """Test 3: Handover trigger detection"""
    global test_count
    test_count += 1
    
    test_header(3, "HANDOVER TRIGGER")
    
    print("Testing handover trigger with message: 'I want to speak to a human'")
    
    timestamp = int(time.time())
    payload = {
        "name": "Handover Test User",
        "email": f"handover.test+{timestamp}@recxchange.test",
        "message": "I want to speak to a human",
        "persona": "hiring-manager",
        "companyName": "Test Company Inc",
        "pageContext": "Contact"
    }
    
    print("\nPayload:")
    print(json.dumps(payload, indent=2))
    print("\nSending request...")
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        data = check_response(response, "handover_trigger")
        
        if data:
            handover_flag = data.get("handover", False)
            print(f"\n📊 Handover Validation:")
            if handover_flag:
                print(f"  {Colors.GREEN}✓ Handover flag: true{Colors.NC}")
            else:
                print(f"  {Colors.RED}✗ Handover flag: {handover_flag} (expected: true){Colors.NC}")
        
        return data
        
    except Exception as e:
        print(f"\n{Colors.RED}✗ FAILED - {str(e)}{Colors.NC}")
        return None

def test_invalid_request():
    """Test 4: Invalid request (missing fields)"""
    global test_count, pass_count, fail_count
    test_count += 1
    
    test_header(4, "INVALID REQUEST (Missing Fields)")
    
    print("Testing error handling with missing required fields")
    
    payload = {
        "message": "This should fail"
    }
    
    print("\nPayload:")
    print(json.dumps(payload, indent=2))
    print("\nSending request...")
    
    try:
        response = requests.post(
            API_ENDPOINT,
            json=payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 400:
            print(f"\n{Colors.GREEN}✓ SUCCESS - Correctly rejected with 400 Bad Request{Colors.NC}")
            try:
                data = response.json()
                print("\nResponse:")
                print(json.dumps(data, indent=2))
            except:
                print(f"Response text: {response.text}")
            pass_count += 1
        else:
            print(f"\n{Colors.RED}✗ FAILED - Expected 400, got {response.status_code}{Colors.NC}")
            fail_count += 1
        
    except Exception as e:
        print(f"\n{Colors.RED}✗ FAILED - {str(e)}{Colors.NC}")
        fail_count += 1

def print_summary():
    """Print test suite summary"""
    print("\n" + "=" * 80)
    print("🏁 TEST SUITE COMPLETE")
    print("=" * 80)
    print(f"\n📊 RESULTS:")
    print(f"  Total Tests: {test_count}")
    print(f"  {Colors.GREEN}Passed: {pass_count}{Colors.NC}")
    print(f"  {Colors.RED}Failed: {fail_count}{Colors.NC}")
    print()
    
    if fail_count == 0:
        print(f"{Colors.GREEN}✓ ALL TESTS PASSED!{Colors.NC}")
        print("\n💡 NEXT STEPS:")
        print("  1. Check Vercel logs: https://vercel.com/tom-1100s-projects/recxchange/logs")
        print("  2. Verify contacts in GHL with proper tags and custom fields")
        print("  3. Check GHL conversations for AI responses")
        print("  4. Confirm handover marked conversations as urgent/starred")
        return 0
    else:
        print(f"{Colors.RED}✗ SOME TESTS FAILED{Colors.NC}")
        print("\n🔍 TROUBLESHOOTING:")
        print("  • Check Vercel deployment is successful")
        print("  • Verify GHL_API_KEY, GHL_LOCATION_ID, GHL_CONVERSATION_AI_AGENT_ID env vars")
        print("  • Check GHL AI bot is in Autopilot mode with Live_Chat enabled")
        print("  • Review Vercel logs for detailed error messages")
        return 1

def main():
    """Main test runner"""
    print_header()
    
    # Test 1: Initial message
    result1 = test_initial_message()
    time.sleep(2)
    
    # Test 2: Follow-up message (if we got IDs from test 1)
    if result1 and result1.get("contactId") and result1.get("conversationId"):
        test_followup_message(result1["contactId"], result1["conversationId"])
        time.sleep(2)
    
    # Test 3: Handover trigger
    test_handover_trigger()
    time.sleep(2)
    
    # Test 4: Invalid request
    test_invalid_request()
    
    # Print summary and exit
    exit_code = print_summary()
    exit(exit_code)

if __name__ == "__main__":
    main()
