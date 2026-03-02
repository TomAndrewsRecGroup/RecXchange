import { NextRequest, NextResponse } from 'next/server';

/**
 * Groq Conversational AI Custom Action Webhook
 * Triggers "Send 3 Roles" email automation for recruiters
 * 
 * Called by: Groq AI Agent when recruiter wants role recommendations
 * 
 * Webhook URL: https://recxchange.io/api/groq/ai-actions/send-roles
 * Method: POST
 * 
 * Expected Payload from Groq AI:
 * {
 *   "contactId": "string",
 *   "conversationId": "string",
 *   "email": "string",
 *   "firstName": "string",
 *   "industries": ["Technology", "Finance"] // Array of industries
 * }
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

export async function POST(req: NextRequest) {
  console.log('[Groq AI Action] Send Roles webhook triggered');
  
  try {
    const body = await req.json();
    console.log('[Groq AI Action] Payload:', JSON.stringify(body));
    
    const { contactId, conversationId, email, firstName, industries } = body;

    // Validate required fields
    if (!email || !firstName) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: email and firstName are required',
          data: null
        },
        { status: 400 }
      );
    }

    // Default to common industries if none provided
    const targetIndustries = industries && industries.length > 0 
      ? industries 
      : ['Technology', 'Finance', 'Healthcare'];

    console.log('[Groq AI Action] Calling send-3-roles API');
    
    // Call the existing send-3-roles API
    const sendRolesResponse = await fetch(`${req.nextUrl.origin}/api/send-3-roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        firstName,
        industries: targetIndustries,
      })
    });

    if (!sendRolesResponse.ok) {
      const errorData = await sendRolesResponse.json();
      throw new Error(errorData.error || 'Failed to send roles email');
    }

    const sendRolesData = await sendRolesResponse.json();
    console.log('[Groq AI Action] Roles email sent:', sendRolesData);

    // Send confirmation message back to conversation if IDs provided
    if (contactId && conversationId) {
      try {
        await fetch(`${GHL_BASE}/conversations/messages`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            type: 'Live_Chat',
            conversationId,
            message: `✅ Perfect! I've just sent ${sendRolesData.rolesSent} matched roles to ${email}. Check your inbox in the next few minutes!`,
            contactId: LOCATION_ID, // System message
          }),
        });
      } catch (msgError) {
        console.error('[Groq AI Action] Failed to send confirmation:', msgError);
      }
    }

    // Return data for Groq AI to use in conversation
    return NextResponse.json({
      success: true,
      data: {
        rolesSent: sendRolesData.rolesSent,
        industries: targetIndustries,
        answer: `Great! I've sent ${sendRolesData.rolesSent} live roles matched to your sectors (${targetIndustries.join(', ')}) to ${email}. You should receive the email within the next 2-3 minutes. Each role includes your potential split fee and full details.`
      }
    });

  } catch (error) {
    console.error('[Groq AI Action] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        data: {
          answer: "I apologize, but I encountered an error sending the roles. Please try again or contact support@recxchange.io"
        }
      },
      { status: 500 }
    );
  }
}
