import { NextRequest, NextResponse } from 'next/server';

/**
 * GHL Conversational AI Custom Action Webhook
 * Schedules a call for hiring managers using GHL Calendar
 * 
 * Called by: GHL AI Agent when hiring manager wants to schedule a call
 * 
 * Webhook URL: https://recxchange.io/api/ghl/ai-actions/schedule-call
 * Method: POST
 * 
 * Expected Payload from GHL AI:
 * {
 *   "contactId": "string",
 *   "conversationId": "string",
 *   "email": "string",
 *   "firstName": "string",
 *   "companyName": "string" (optional)
 * }
 */

const GHL_BASE = 'https://services.leadconnectorhq.com';
const API_KEY = process.env.GHL_API_KEY!;
const LOCATION_ID = process.env.GHL_LOCATION_ID!;
const CALENDAR_ID = process.env.GHL_CALENDAR_ID || ''; // You'll need to add this

const ghlHeaders = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Version': '2021-07-28',
};

// Default calendar booking link (you can customize this)
const DEFAULT_BOOKING_LINK = 'https://app.recxchange.io/widget/bookings/recxchange-discovery-call';

export async function POST(req: NextRequest) {
  console.log('[GHL AI Action] Schedule Call webhook triggered');
  
  try {
    const body = await req.json();
    console.log('[GHL AI Action] Payload:', JSON.stringify(body));
    
    const { contactId, conversationId, email, firstName, companyName } = body;

    if (!email || !firstName) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Missing required fields: email and firstName',
          data: null
        },
        { status: 400 }
      );
    }

    // Tag contact as interested in booking a call
    if (contactId) {
      try {
        const tags = ['call-requested', 'hiring-manager-call'];
        if (companyName) tags.push(`company-${companyName.toLowerCase().replace(/\s+/g, '-')}`);
        
        await fetch(`${GHL_BASE}/contacts/${contactId}`, {
          method: 'PUT',
          headers: ghlHeaders,
          body: JSON.stringify({ tags }),
        });
      } catch (tagError) {
        console.error('[GHL AI Action] Failed to tag contact:', tagError);
      }
    }

    // Generate personalized booking link
    const bookingLink = CALENDAR_ID 
      ? `${DEFAULT_BOOKING_LINK}?email=${encodeURIComponent(email)}&name=${encodeURIComponent(firstName)}`
      : DEFAULT_BOOKING_LINK;

    // Send booking link to conversation
    const responseMessage = `
Perfect ${firstName}! I'd love to connect you with our team.

**Here's your personalized booking link:**
${bookingLink}

**What to expect on the call:**
• 15-30 minute consultation
• Discuss your hiring needs and timeline
• Explore how RecXchange can fill your roles faster
• Q&A about our process and pricing
• No obligation or pressure

**Before the call, it helps to have:**
• Job description(s) ready
• Ideal candidate profile in mind
• Current hiring challenges noted

Click the link above to choose a time that works for you. I'll send a calendar invite immediately after you book!
    `.trim();

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
        console.error('[GHL AI Action] Failed to send booking message:', msgError);
      }
    }

    // Create a task for sales team to follow up
    if (contactId) {
      try {
        await fetch(`${GHL_BASE}/contacts/${contactId}/tasks`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            title: `Follow up on call request - ${firstName}${companyName ? ` (${companyName})` : ''}`,
            body: `Hiring manager requested a call. Booking link sent. Follow up if they don't schedule within 24 hours.`,
            dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
          }),
        });
      } catch (taskError) {
        console.error('[GHL AI Action] Failed to create task:', taskError);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingLink,
        answer: responseMessage
      }
    });

  } catch (error) {
    console.error('[GHL AI Action] Error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
        data: {
          answer: `I apologize for the technical issue. You can book a call directly here: ${DEFAULT_BOOKING_LINK}`
        }
      },
      { status: 500 }
    );
  }
}
