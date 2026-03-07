import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  sanitizeInput,
  getSecurityHeaders 
} from '@/lib/security';
import { generateHowItWorksHiringManagerEmail } from '@/lib/emails/templates/how-it-works-hiring-manager';

interface HowItWorksRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
}

/**
 * POST /api/submit-how-it-works
 * 
 * Handles "How Does It Work?" form submission from hiring-manager-home page
 * 1. Rate limiting and security checks
 * 2. Input validation and sanitization
 * 3. Creates contact in GHL
 * 4. Sends auto-response email with platform explanation
 * 5. Tracks analytics event
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

    const body: HowItWorksRequest = await request.json();
    const { name, email, phone, company } = body;

    // Parse name into first/last
    const nameParts = sanitizeInput(name, 100).split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    // 2. Validate and sanitize input
    let sanitizedData;
    try {
      sanitizedData = validateFormData({
        firstName,
        lastName,
        email,
        companyName: company || '',
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
    const sanitizedCompany = sanitizedData.companyName;
    const sanitizedPhone = phone ? sanitizeInput(phone, 50) : '';

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

    // 3. Create/update contact in GHL
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const tags = [
          'Website - How It Works',
          'client',
          'hiring-manager',
          'website',
          'how-it-works-requested'
        ];

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
            phone: sanitizedPhone,
            companyName: sanitizedCompany,
            locationId: GHL_LOCATION_ID,
            tags,
            source: 'RecXchange - How It Works (Hiring Manager Home)',
            customFields: {
              company_name: sanitizedCompany,
              contact_type: 'Hiring Manager',
              source_page: '/hiring-manager-home',
              inquiry_date: new Date().toISOString(),
              form_type: 'how-it-works'
            }
          })
        });
      } catch (error) {
        console.error('[How It Works] Failed to create GHL contact:', error);
      }
    }

    // 4. Send auto-response with platform explanation
    if (SENDGRID_API_KEY) {
      try {
        const emailHTML = generateHowItWorksHiringManagerEmail(sanitizedFirstName);
        
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: sanitizedEmail, name: `${sanitizedFirstName} ${sanitizedLastName}`.trim() }],
              subject: 'How RecX Direct Works - Your Complete Guide'
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{
              type: 'text/html',
              value: emailHTML
            }]
          })
        });
      } catch (error) {
        console.error('[How It Works] Failed to send email:', error);
      }
    }

    // 5. Track analytics event
    try {
      trackEvent('quick_action_form_submitted', {
        company_name: sanitizedCompany || 'not provided',
        page: '/hiring-manager-home',
        persona: 'hiring-manager',
        form_type: 'how-it-works',
      }, { bypassConsent: true });
    } catch (error) {
      console.error('[How It Works] Failed to track event:', error);
    }

    return NextResponse.json(
      {
        success: true,
        message: 'How It Works email sent successfully',
      },
      { headers: securityHeaders }
    );
  } catch (error) {
    console.error('[How It Works] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: securityHeaders }
    );
  }
}
