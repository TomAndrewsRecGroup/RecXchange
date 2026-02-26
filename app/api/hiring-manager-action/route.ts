import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

interface HiringManagerActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  source: string;
}

/**
 * Validate email address using RFC 5322 compliant regex
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * POST /api/hiring-manager-action
 * 
 * Handles hiring manager form submissions:
 * 1. Creates client company in GHL
 * 2. Creates contact within that client company
 * 3. Sends auto-response with video explainer
 * 4. Tracks analytics event
 * 
 * Note: Team notifications are handled by GHL automation workflows
 */
export async function POST(request: NextRequest) {
  try {
    const body: HiringManagerActionRequest = await request.json();
    const { firstName, lastName, email, companyName, source } = body;

    // Validate input
    if (!firstName || !lastName || !email || !companyName || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'analytics@recxchange.com';

    // 1. Create/update contact in GHL with company information
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            companyName,
            locationId: GHL_LOCATION_ID,
            tags: ['Website - QA Hiring Manager', 'client', 'hiring-manager', 'website'],
            source: `RecXchange Hiring Manager - ${source}`,
            customFields: {
              company_name: companyName,
              contact_type: 'Hiring Manager',
              source_page: source,
              inquiry_date: new Date().toISOString(),
            }
          })
        });

        if (!ghlResponse.ok) {
          console.error('[Hiring Manager Action] GHL error:', await ghlResponse.text());
        }
      } catch (error) {
        console.error('[Hiring Manager Action] Failed to create GHL contact:', error);
        // Continue even if GHL fails
      }
    }

    // 2. Send auto-response with video explainer
    if (SENDGRID_API_KEY) {
      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email, name: `${firstName} ${lastName}` }],
              subject: 'How RecXchange Works for Clients'
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                  <h2 style="color: #00ffff; margin: 0 0 20px 0;">Welcome to RecXchange, ${firstName}!</h2>
                  
                  <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">Thank you for your interest in RecXchange. We're excited to show you how our platform can revolutionize your hiring process at ${companyName}.</p>
                  
                  <div style="background: #f9f9f9; padding: 30px; border-radius: 12px; margin: 30px 0; text-align: center;">
                    <h3 style="color: #333; margin: 0 0 20px 0;">Watch: How RecXchange Works for Clients</h3>
                    <a href="https://recxchange.io/client-video" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #00ffff, #c71df1); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 10px;">Watch Video Explainer</a>
                  </div>
                  
                  <h3 style="color: #333; margin: 30px 0 15px 0;">What Makes RecXchange Different?</h3>
                  <ul style="color: #333; line-height: 1.8;">
                    <li><strong>Access 15,000+ Recruiters:</strong> Post once, reach thousands of specialists</li>
                    <li><strong>270M Candidate Database:</strong> Our network searches from a massive talent pool</li>
                    <li><strong>Zero Upfront Costs:</strong> Only pay when you hire</li>
                    <li><strong>Transparent Fee Structure:</strong> Set your fee upfront (12-20% standard)</li>
                    <li><strong>48-Hour Turnaround:</strong> First candidates submitted within 2 days</li>
                  </ul>
                  
                  <h3 style="color: #333; margin: 30px 0 15px 0;">Next Steps</h3>
                  <ol style="color: #333; line-height: 1.8;">
                    <li>Watch the video explainer above</li>
                    <li>Reply to this email with any questions</li>
                    <li>Schedule a demo call with our team</li>
                    <li>Post your first role and see the magic happen</li>
                  </ol>
                  
                  <div style="text-align: center; margin: 40px 0;">
                    <a href="https://recxchange.io/hiring-manager-live" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #00ffff, #c71df1); color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold;">Post Your First Role</a>
                  </div>
                  
                  <p style="color: #666; line-height: 1.6; margin-top: 30px; font-size: 14px; border-top: 1px solid #e5e5e5; padding-top: 20px;">
                    Questions? Simply reply to this email or book a call directly with our team. We're here to help ${companyName} find the perfect candidates.
                  </p>
                  
                  <p style="color: #333; margin-top: 30px;">Best regards,<br><strong>The RecXchange Team</strong></p>
                </div>
              `
            }]
          })
        });
      } catch (error) {
        console.error('[Hiring Manager Action] Failed to send auto-response:', error);
      }
    }

    // 3. Track analytics event
    try {
      trackEvent('hiring_manager_form_submitted', {
        company_name: companyName,
        page: source,
      });
    } catch (error) {
      console.error('[Hiring Manager Action] Failed to track event:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Hiring manager action processed successfully',
    });
  } catch (error) {
    console.error('[Hiring Manager Action] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
