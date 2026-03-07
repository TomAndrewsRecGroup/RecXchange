import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  sanitizeInput,
  getSecurityHeaders 
} from '@/lib/security';
import { generateMatchCandidateEmail } from '@/lib/emails/templates/match-candidate-email';
import { generateHowItWorksRecruiterEmail } from '@/lib/emails/templates/how-it-works-recruiter';
import { generateHowItWorksHiringManagerEmail } from '@/lib/emails/templates/how-it-works-hiring-manager';
import { type Role, INDUSTRY_ROLES } from '@/lib/emails/data/industry-roles';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct' | 'explain_recx_direct_hm';
  source: string;
  industries?: string[];
  marketingConsent?: boolean;
}

/**
 * Helper function to select 3 roles based on provided industries
 */
function selectRoles(industries: string[]): { roles: Role[], industryText: string } {
  // Normalize industry names
  const normalizedIndustries = industries.map(i => 
    i.trim().charAt(0).toUpperCase() + i.trim().slice(1).toLowerCase()
  );
  
  // Try to get roles from first valid industry, fallback to Default
  let selectedIndustry = 'Default';
  let roles: Role[] = [];
  
  for (const industry of normalizedIndustries) {
    if (INDUSTRY_ROLES[industry]) {
      selectedIndustry = industry;
      roles = INDUSTRY_ROLES[industry];
      break;
    }
  }
  
  // Fallback to Default if no match
  if (roles.length === 0) {
    roles = INDUSTRY_ROLES['Default'];
  }
  
  // Generate industry text
  const industryText = normalizedIndustries.length > 0 
    ? normalizedIndustries.join(' • ') 
    : 'Technology';
  
  return { roles, industryText };
}

/**
 * POST /api/quick-action
 * 
 * Handles quick action submissions from landing pages:
 * 1. "Send me 3 matching roles" - Sends match-candidate email
 * 2. "Email me the explainer" (Recruiter) - Sends how-it-works-recruiter email
 * 3. "Email me the explainer" (Hiring Manager) - Sends how-it-works-hiring-manager email
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    // 1. Rate limiting
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
    const { firstName, lastName, email, actionType, source, industries, marketingConsent } = body;

    // 2. Validate and sanitize input
    let sanitizedData;
    try {
      sanitizedData = validateFormData({
        firstName,
        lastName,
        email,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input data' },
        { status: 400, headers: securityHeaders }
      );
    }

    const sanitizedFirstName = sanitizedData.firstName;
    const sanitizedLastName = sanitizedData.lastName;
    const sanitizedEmail = sanitizedData.email;
    const sanitizedSource = sanitizeInput(source, 200);
    const sanitizedIndustries = industries?.map(i => sanitizeInput(i, 100)) || [];

    // Email-based rate limiting
    const emailRateLimit = checkRateLimit(`email:${sanitizedEmail}`, 'email');
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

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'tom@recxchange.io';

    // 3. Create/update contact in GHL with appropriate tags
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        let tags: string[] = [];
        let contactType = '';
        
        if (actionType === 'match_candidate') {
          tags = ['Website - 3 Roles', 'recruiter', 'candidate-matcher', 'website'];
          contactType = 'Recruiter';
        } else if (actionType === 'explain_recx_direct') {
          tags = ['Website - RecX Explainer', 'recruiter', 'website', 'explainer-requested'];
          contactType = 'Recruiter';
        } else if (actionType === 'explain_recx_direct_hm') {
          tags = ['Website - RecX Explainer', 'client', 'hiring-manager', 'website', 'explainer-requested'];
          contactType = 'Hiring Manager';
        }

        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: sanitizedFirstName,
            lastName: sanitizedLastName,
            email: sanitizedEmail,
            locationId: GHL_LOCATION_ID,
            tags,
            source: `RecXchange - Quick Action (${actionType})`,
            customFields: {
              contact_type: contactType,
              action_type: actionType,
              source_page: sanitizedSource,
              inquiry_date: new Date().toISOString(),
              industries: sanitizedIndustries.join(', '),
              marketing_consent: marketingConsent ? 'Yes' : 'No'
            }
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to create GHL contact:', error);
      }
    }

    // 4. Send appropriate auto-response email based on action type
    if (SENDGRID_API_KEY) {
      try {
        let emailHTML = '';
        let subject = '';
        
        if (actionType === 'match_candidate') {
          const { roles, industryText } = selectRoles(sanitizedIndustries);
          emailHTML = generateMatchCandidateEmail(sanitizedFirstName, roles, industryText);
          subject = 'Your 3 Matching Roles from RecXchange';
        } else if (actionType === 'explain_recx_direct') {
          emailHTML = generateHowItWorksRecruiterEmail(sanitizedFirstName);
          subject = 'How RecX Direct Works - Your Complete Guide';
        } else if (actionType === 'explain_recx_direct_hm') {
          emailHTML = generateHowItWorksHiringManagerEmail(sanitizedFirstName);
          subject = 'How RecX Direct Works - Your Complete Guide';
        }
        
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: sanitizedEmail, name: `${sanitizedFirstName} ${sanitizedLastName}`.trim() }],
              subject
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: emailHTML
            }]
          })
        });
      } catch (error) {
        console.error('[Quick Action] Failed to send email:', error);
      }
    }

    // 5. Track analytics event
    try {
      trackEvent('quick_action_form_submitted', {
        action_type: actionType,
        source: sanitizedSource,
        industries: sanitizedIndustries.join(', '),
        marketing_consent: marketingConsent || false
      }, { bypassConsent: true });
    } catch (error) {
      console.error('[Quick Action] Failed to track event:', error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Email sent successfully',
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
