import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  getSecurityHeaders 
} from '@/lib/security';
import { generateMatchCandidateEmail } from '@/lib/emails/templates/match-candidate';
import { generateHowItWorksRecruiterEmail } from '@/lib/emails/templates/how-it-works-recruiter';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
  industries?: string[]; // Optional industries for match_candidate
  marketingConsent?: boolean; // GDPR marketing consent
}

const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'Website - QA 3 roles',
    autoResponseSubject: '3 Matching Live Roles For You',
    autoResponseTemplate: generateMatchCandidateEmail,
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'How RecXchange Works - Your Complete Guide',
    autoResponseTemplate: generateHowItWorksRecruiterEmail,
  },
};

/**
 * POST /api/quick-action
 * 
 * Handles quick action form submissions
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    const clientIP = getClientIP(request);
    const ipRateLimit = checkRateLimit(clientIP, 'form');
    
    if (!ipRateLimit.success) {
      return NextResponse.json(
        { 
          error: 'Too many requests. Please try again later.',
          resetIn: Math.ceil(ipRateLimit.resetIn / 1000)
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': String(Math.ceil(ipRateLimit.resetIn / 1000)),
          }
        }
      );
    }

    const body: QuickActionRequest = await request.json();
    const { actionType, source, industries, marketingConsent } = body;

    let sanitizedData;
    try {
      sanitizedData = validateFormData(body);
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input data' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { firstName, lastName, email } = sanitizedData;

    if (!actionType || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: securityHeaders }
      );
    }

    const emailRateLimit = checkRateLimit(`email:${email}`, 'email');
    if (!emailRateLimit.success) {
      return NextResponse.json(
        { 
          error: 'Too many submissions from this email. Please try again later.',
          resetIn: Math.ceil(emailRateLimit.resetIn / 1000)
        },
        { 
          status: 429,
          headers: {
            ...securityHeaders,
            'Retry-After': String(Math.ceil(emailRateLimit.resetIn / 1000)),
          }
        }
      );
    }

    const config = ACTION_CONFIG[actionType];
    if (!config) {
      return NextResponse.json(
        { error: 'Invalid action type' },
        { status: 400, headers: securityHeaders }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'tom@recxchange.io';

    // Create/update GHL contact
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const tags = [config.ghlTag, 'website', 'quick-action'];
        
        if (industries && industries.length > 0) {
          const sanitizedIndustries = industries
            .filter(ind => typeof ind === 'string')
            .map(ind => ind.substring(0, 50))
            .slice(0, 10);
          tags.push(...sanitizedIndustries);
        }

        if (marketingConsent === true) {
          tags.push('marketing-consent-given');
        } else if (marketingConsent === false) {
          tags.push('marketing-consent-declined');
        }

        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            locationId: GHL_LOCATION_ID,
            tags,
            source: `RecXchange Quick Action - ${source}`,
            customFields: {
              action_type: actionType,
              source_page: source,
              action_date: new Date().toISOString(),
              industries: industries && industries.length > 0 ? industries.join(', ') : '',
              marketing_consent: marketingConsent === true ? 'yes' : marketingConsent === false ? 'no' : 'not_asked',
              marketing_consent_date: marketingConsent !== undefined ? new Date().toISOString() : '',
            }
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to create GHL contact:', error);
      }
    }

    // Send auto-response email
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
              subject: config.autoResponseSubject
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: actionType === 'match_candidate' 
                ? config.autoResponseTemplate(firstName, industries)
                : config.autoResponseTemplate(firstName)
            }]
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to send auto-response:', error);
      }
    }

    // Track analytics
    try {
      trackEvent('quick_action_form_submitted', {
        action_type: actionType,
        page: source,
        industries: industries && industries.length > 0 ? industries.join(', ') : 'none',
        marketing_consent: marketingConsent === true ? 'given' : marketingConsent === false ? 'declined' : 'not_asked',
      }, { bypassConsent: true });
    } catch (error) {
      console.error('[Quick Action] Failed to track event:', error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Quick action processed successfully',
      },
      { headers: securityHeaders }
    );
  } catch (error) {
    console.error('[Quick Action] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    );
  }
}
