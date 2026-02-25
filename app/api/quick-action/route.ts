import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

interface QuickActionRequest {
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
}

const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'quick-action-match-candidate',
    autoResponseSubject: 'Your RecXchange Candidate Match Request',
    autoResponseTemplate: (email: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #00ffff; margin: 0 0 20px 0;">Thanks for your interest!</h2>
        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">We've received your request for matching roles. Our team will review your candidate profile and send you 3 tailored role suggestions within 24 hours.</p>
        <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">In the meantime, you can explore our platform at <a href="https://recxchange.io" style="color: #00ffff;">recxchange.io</a></p>
        <p style="color: #333; margin-top: 30px;">Best regards,<br><strong>The RecXchange Team</strong></p>
      </div>
    `,
  },
  explain_recx_direct: {
    ghlTag: 'quick-action-recx-direct',
    autoResponseSubject: 'RecX Direct - Explainer & Fee Pool',
    autoResponseTemplate: (email: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #00ffff; margin: 0 0 20px 0;">RecX Direct Explainer</h2>
        
        <h3 style="color: #333; margin: 30px 0 15px 0;">What is RecX Direct?</h3>
        <p style="color: #333; line-height: 1.6; margin-bottom: 20px;">RecX Direct is our revolutionary fee pooling model that makes premium recruitment accessible at any scale. Instead of paying traditional 15-20% fees, you pay a transparent monthly subscription and access a shared fee pool.</p>
        
        <h3 style="color: #333; margin: 30px 0 15px 0;">Current Fee Pool</h3>
        <div style="background: linear-gradient(135deg, #00ffff, #c71df1); padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="color: #000; font-size: 24px; font-weight: bold; margin: 0;">Active Pool: £XXX,XXX</p>
          <p style="color: #000; margin: 10px 0 0 0;">Updated weekly</p>
        </div>
        
        <h3 style="color: #333; margin: 30px 0 15px 0;">How It Works</h3>
        <ol style="color: #333; line-height: 1.8;">
          <li>Subscribe to your tier (Entry, Lite, Pro, or Teams)</li>
          <li>Post roles and access our candidate network</li>
          <li>Make hires from the shared fee pool</li>
          <li>Pay only your subscription - no per-hire fees</li>
        </ol>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="https://recxchange.io/pricing" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #00ffff, #c71df1); color: #000; text-decoration: none; border-radius: 8px; font-weight: bold;">View Pricing Tiers</a>
        </div>
        
        <p style="color: #666; line-height: 1.6; margin-top: 30px;">Questions? Reply to this email or book a call with our team.</p>
        
        <p style="color: #333; margin-top: 30px;">Best regards,<br><strong>The RecXchange Team</strong></p>
      </div>
    `,
  },
};

/**
 * POST /api/quick-action
 * 
 * Handles quick action form submissions:
 * 1. Creates/updates contact in GHL with appropriate tag
 * 2. Sends auto-response to user
 * 3. Tracks analytics event
 * 
 * Note: Team notifications are handled by GHL automation workflows
 */
export async function POST(request: NextRequest) {
  try {
    const body: QuickActionRequest = await request.json();
    const { email, actionType, source } = body;

    // Validate input
    if (!email || !actionType || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const config = ACTION_CONFIG[actionType];
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400 }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'analytics@recxchange.com';

    // 1. Create/update contact in GHL
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const ghlResponse = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            locationId: GHL_LOCATION_ID,
            tags: [config.ghlTag, 'website', 'quick-action'],
            source: `RecXchange Quick Action - ${source}`,
            customFields: {
              action_type: actionType,
              source_page: source,
              action_date: new Date().toISOString(),
            }
          })
        });

        if (!ghlResponse.ok) {
          console.error('[Quick Action] GHL error:', await ghlResponse.text());
        }
      } catch (error) {
        console.error('[Quick Action] Failed to create GHL contact:', error);
        // Continue even if GHL fails
      }
    }

    // 2. Send auto-response to user
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
              to: [{ email }],
              subject: config.autoResponseSubject
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: config.autoResponseTemplate(email)
            }]
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to send auto-response:', error);
      }
    }

    // 3. Track analytics event
    try {
      await trackEvent({
        event: 'quick_action_submitted',
        properties: {
          action_type: actionType,
          source_page: source,
          email_provided: true,
        },
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('[Quick Action] Failed to track event:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'Quick action processed successfully',
    });
  } catch (error) {
    console.error('[Quick Action] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
