#!/usr/bin/env python3
"""
GHL Configuration Verification Script
Checks environment variables and tests GHL API connectivity

Usage:
  python tests/verify-ghl-config.py
  
Requirements:
  pip install requests
"""

import os
import requests
import json

# Expected values from URL
EXPECTED_LOCATION_ID = "VxHBI8kbavh407OMkAcu"
EXPECTED_AI_AGENT_ID = "w1CPUs7pgRC08QGdYXCb"

print("="*80)
print("🔍 GHL CONFIGURATION VERIFICATION")
print("="*80)
print()
print("🎯 EXPECTED VALUES (from your GHL URL):")
print(f"  Location ID: {EXPECTED_LOCATION_ID}")
print(f"  AI Agent ID: {EXPECTED_AI_AGENT_ID}")
print()
print("="*80)
print("📦 CHECKING VERCEL ENVIRONMENT VARIABLES")
print("="*80)
print()
print("⚠️  Note: This script should be run on Vercel (via API route) to check")
print("   the actual environment variables. Running locally will not show Vercel vars.")
print()
print("💡 INSTRUCTIONS TO CHECK VERCEL ENV VARS:")
print()
print("1. Go to: https://vercel.com/tom-1100s-projects/recxchange/settings/environment-variables")
print()
print("2. Verify these variables are set:")
print()
print("   Variable Name                     | Expected Value")
print("   ----------------------------------|----------------------------------")
print(f"   GHL_LOCATION_ID                   | {EXPECTED_LOCATION_ID}")
print(f"   GHL_CONVERSATION_AI_AGENT_ID      | {EXPECTED_AI_AGENT_ID}")
print("   GHL_API_KEY                       | (your API key - keep secret)")
print()
print("3. For each variable, check the 'Environment' column:")
print("   • Should have checkmarks for: Production, Preview, Development")
print()
print("4. After adding/updating variables:")
print("   • Go to Deployments tab")
print("   • Click '...' menu on latest deployment")
print("   • Click 'Redeploy' to apply changes")
print()
print("="*80)
print("🔑 HOW TO GET YOUR GHL API KEY")
print("="*80)
print()
print("1. Log in to GoHighLevel")
print("2. Go to Settings → API Key (or Company → API Keys)")
print("3. Create a new API key if needed")
print("4. Copy the key and add to Vercel as GHL_API_KEY")
print()
print("⚠️  IMPORTANT: API key must have these permissions:")
print("   • Contacts (read/write)")
print("   • Conversations (read/write)")
print("   • Messages (read/write)")
print()
print("="*80)
print("🧪 TEST API CONNECTION")
print("="*80)
print()

api_key = input("🔑 Enter your GHL API key to test connection (or press Enter to skip): ").strip()

if api_key:
    print("\n🔍 Testing GHL API connection...\n")
    
    # Test 1: Get Location Info
    print("Test 1: Fetching Location Info")
    try:
        headers = {
            'Authorization': f'Bearer {api_key}',
            'Version': '2021-07-28',
        }
        
        response = requests.get(
            f'https://services.leadconnectorhq.com/locations/{EXPECTED_LOCATION_ID}',
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print(f"  ✅ SUCCESS - Location found!")
            print(f"  Name: {data.get('location', {}).get('name', 'N/A')}")
            print(f"  ID: {data.get('location', {}).get('id', 'N/A')}")
        elif response.status_code == 401:
            print(f"  ❌ FAILED - Invalid API key (401 Unauthorized)")
            print(f"  Check that your API key is correct and active")
        elif response.status_code == 404:
            print(f"  ❌ FAILED - Location not found (404)")
            print(f"  Check that Location ID is correct: {EXPECTED_LOCATION_ID}")
        else:
            print(f"  ⚠️  Unexpected status: {response.status_code}")
            print(f"  Response: {response.text[:200]}")
    except Exception as e:
        print(f"  ❌ ERROR: {e}")
    
    print()
    
    # Test 2: List Contacts (basic permissions check)
    print("Test 2: Checking API Permissions (list contacts)")
    try:
        response = requests.get(
            f'https://services.leadconnectorhq.com/contacts/?locationId={EXPECTED_LOCATION_ID}&limit=1',
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            print(f"  ✅ SUCCESS - Can read contacts")
        elif response.status_code == 403:
            print(f"  ❌ FAILED - No permission to read contacts (403 Forbidden)")
            print(f"  Update API key permissions in GHL")
        else:
            print(f"  ⚠️  Status: {response.status_code}")
    except Exception as e:
        print(f"  ❌ ERROR: {e}")
    
    print()
    
    # Test 3: Check AI Agent exists
    print("Test 3: Verifying AI Agent exists")
    try:
        response = requests.get(
            f'https://services.leadconnectorhq.com/conversations/agents/{EXPECTED_AI_AGENT_ID}',
            headers={
                **headers,
                'locationId': EXPECTED_LOCATION_ID,
            },
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            agent_name = data.get('name', 'N/A')
            agent_status = data.get('status', 'N/A')
            print(f"  ✅ SUCCESS - AI Agent found!")
            print(f"  Name: {agent_name}")
            print(f"  Status: {agent_status}")
            print(f"  ID: {EXPECTED_AI_AGENT_ID}")
            
            if agent_status != 'active':
                print(f"  ⚠️  WARNING: Agent status is '{agent_status}' (should be 'active')")
        elif response.status_code == 404:
            print(f"  ❌ FAILED - AI Agent not found (404)")
            print(f"  Check that Agent ID is correct: {EXPECTED_AI_AGENT_ID}")
        else:
            print(f"  ⚠️  Status: {response.status_code}")
            print(f"  Response: {response.text[:200]}")
    except Exception as e:
        print(f"  ❌ ERROR: {e}")
    
    print()
    print("="*80)
    print("✅ API CONNECTION TEST COMPLETE")
    print("="*80)
    
else:
    print("\n⏭️  Skipped API connection test\n")

print()
print("="*80)
print("📝 NEXT STEPS")
print("="*80)
print()
print("1. Update Vercel environment variables with correct values")
print("2. Redeploy your Vercel application")
print("3. Run the API test: python tests/api-test-ghl-chat.py")
print("4. Check Vercel logs: https://vercel.com/tom-1100s-projects/recxchange/logs")
print()
print("="*80)
