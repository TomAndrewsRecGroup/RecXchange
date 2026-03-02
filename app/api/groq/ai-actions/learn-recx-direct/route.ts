import { NextRequest, NextResponse } from 'next/server';

/**
 * Groq Conversational AI Custom Action Webhook
 * Provides information about RecX Direct and sends educational content
 * 
 * Called by: Groq AI Agent when recruiter asks about RecX Direct
 * 
 * Webhook URL: https://recxchange.io/api/groq/ai-actions/learn-recx-direct
 * Method: POST
 * 
 * Expected Payload from Groq AI:
 * {
 *   "contactId": "string",
 *   "conversationId": "string",
 *   "email": "string",
 *   "firstName": "string"
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

const RECX_DIRECT_INFO = {
  title: 'RecX Direct',
  description: 'Exclusive roles with higher split fees - up to 70% commission',
  benefits: [
    'Up to 70% split on placements (vs. 50% standard)',
    'Direct relationship with hiring companies',
    'Priority access to high-value roles',
    'Faster payment processing',
    'Dedicated account management'
  ],
  comparison: {
    standard: {
      name: 'RecX Xchange',
      split: '50%',
      relationship: 'Shared pool',
      paymentTime: '30-45 days'
    },
    direct: {
      name: 'RecX Direct',
      split: 'Up to 70%',
      relationship: 'Direct client',
      paymentTime: '15-30 days'
    }
  },
  learnMoreUrl: 'https://recxchange.io/why-recxchange'
};

export async function POST(req: NextRequest) {
  console.log('[Groq AI Action] Learn RecX Direct webhook triggered');
  
  try {
    const body = await req.json();
    console.log('[Groq AI Action] Payload:', JSON.stringify(body));
    
    const { contactId, conversationId, email, firstName } = body;

    // Build detailed response
    const responseMessage = `
**RecX Direct** is our premium tier where you can earn **up to 70% split fees** (compared to 50% on standard roles).

**Key Benefits:**
• Higher commission rates (60-70% vs. 50%)
• Direct client relationships
• Priority role access
• Faster payment (15-30 days vs. 30-45 days)
• Dedicated support

**How it works:**
1. RecXchange negotiates exclusive partnerships with hiring companies
2. These companies offer higher splits in exchange for priority placement
3. You get first access to these premium roles
4. You keep more of the fee

**Example:**
- Standard Role: £20k fee → You earn £10k (50%)
- RecX Direct Role: £20k fee → You earn £14k (70%)

Learn more: https://recxchange.io/why-recxchange
    `.trim();

    // Send detailed message back to conversation
    if (contactId && conversationId) {
      try {
        await fetch(`${GHL_BASE}/conversations/messages`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            type: 'Live_Chat',
            conversationId,
            message: responseMessage,
            contactId: LOCATION_ID,
          }),
        });
      } catch (msgError) {
        console.error('[Groq AI Action] Failed to send info message:', msgError);
      }
    }

    // Tag contact as interested in RecX Direct
    if (contactId) {
      try {
        await fetch(`${GHL_BASE}/contacts/${contactId}`, {
          method: 'PUT',
          headers: ghlHeaders,
          body: JSON.stringify({
            tags: ['interested-recx-direct']
          }),
        });
      } catch (tagError) {
        console.error('[Groq AI Action] Failed to tag contact:', tagError);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        info: RECX_DIRECT_INFO,
        answer: responseMessage
      }
    });

  } catch (error) {
    console.error('[Groq AI Action] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        data: {
          answer: "I apologize, but I encountered an error. You can learn more about RecX Direct at https://recxchange.io/why-recxchange"
        }
      },
      { status: 500 }
    );
  }
}
