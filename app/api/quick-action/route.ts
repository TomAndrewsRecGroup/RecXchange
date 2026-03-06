import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  getSecurityHeaders 
} from '@/lib/security';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
  industries?: string[]; // Optional industries for match_candidate
  marketingConsent?: boolean; // GDPR marketing consent
}

// Industry-specific role database
const INDUSTRY_ROLES: Record<string, Array<{title: string; company: string; location: string; workMode: string; salary: string; type: string}>> = {
  'Technology': [
    { title: 'Senior Full-Stack Engineer', company: 'FinTech Innovations Ltd', location: 'London', workMode: 'Hybrid', salary: '£75,000 - £95,000', type: 'Permanent' },
    { title: 'Lead DevOps Engineer', company: 'CloudScale Systems', location: 'Manchester', workMode: 'Remote', salary: '£80,000 - £100,000', type: 'Permanent' },
    { title: 'Principal Software Architect', company: 'Digital Dynamics PLC', location: 'Edinburgh', workMode: 'Hybrid', salary: '£90,000 - £120,000', type: 'Permanent' },
  ],
  'Finance': [
    { title: 'Senior Financial Analyst', company: 'Sterling Capital Partners', location: 'London', workMode: 'Office', salary: '£65,000 - £85,000', type: 'Permanent' },
    { title: 'Investment Banking Associate', company: 'Apex Investment Group', location: 'London', workMode: 'Office', salary: '£80,000 - £110,000', type: 'Permanent' },
    { title: 'Portfolio Manager', company: 'Meridian Wealth Management', location: 'Leeds', workMode: 'Hybrid', salary: '£70,000 - £95,000', type: 'Permanent' },
  ],
  'Healthcare': [
    { title: 'Senior Clinical Pharmacist', company: 'NHS Trust - Greater Manchester', location: 'Manchester', workMode: 'Office', salary: '£50,000 - £65,000', type: 'Permanent' },
    { title: 'Consultant Radiologist', company: 'Royal Medical Centre', location: 'Birmingham', workMode: 'Office', salary: '£85,000 - £110,000', type: 'Permanent' },
    { title: 'Head of Nursing Operations', company: 'Cambridge Healthcare Group', location: 'Cambridge', workMode: 'Office', salary: '£60,000 - £75,000', type: 'Permanent' },
  ],
  'Engineering': [
    { title: 'Senior Mechanical Engineer', company: 'Precision Engineering Co', location: 'Birmingham', workMode: 'Hybrid', salary: '£55,000 - £75,000', type: 'Permanent' },
    { title: 'Principal Civil Engineer', company: 'Infrastructure Solutions Ltd', location: 'Bristol', workMode: 'Office', salary: '£70,000 - £90,000', type: 'Permanent' },
    { title: 'Lead Electrical Engineer', company: 'PowerTech Industries', location: 'Sheffield', workMode: 'Hybrid', salary: '£60,000 - £80,000', type: 'Permanent' },
  ],
  'Marketing': [
    { title: 'Senior Digital Marketing Manager', company: 'Growth Marketing Agency', location: 'London', workMode: 'Hybrid', salary: '£55,000 - £70,000', type: 'Permanent' },
    { title: 'Head of Content Strategy', company: 'BrandVision Media', location: 'Manchester', workMode: 'Remote', salary: '£60,000 - £80,000', type: 'Permanent' },
    { title: 'Performance Marketing Lead', company: 'Digital Commerce Group', location: 'London', workMode: 'Hybrid', salary: '£65,000 - £85,000', type: 'Permanent' },
  ],
  'Sales': [
    { title: 'Enterprise Sales Director', company: 'SaaS Solutions UK', location: 'London', workMode: 'Hybrid', salary: '£70,000 - £90,000 + Commission', type: 'Permanent' },
    { title: 'Senior Account Executive', company: 'Global Tech Distributors', location: 'Birmingham', workMode: 'Hybrid', salary: '£50,000 - £65,000 + Commission', type: 'Permanent' },
    { title: 'Head of Business Development', company: 'Enterprise Cloud Services', location: 'Manchester', workMode: 'Hybrid', salary: '£75,000 - £95,000 + Commission', type: 'Permanent' },
  ],
  'Default': [
    { title: 'Senior Software Engineer', company: 'Tech Innovations Ltd', location: 'London', workMode: 'Hybrid', salary: '£70,000 - £90,000', type: 'Permanent' },
    { title: 'Project Manager', company: 'Business Solutions PLC', location: 'Manchester', workMode: 'Remote', salary: '£55,000 - £75,000', type: 'Permanent' },
    { title: 'Senior Business Analyst', company: 'Consulting Partners UK', location: 'Birmingham', workMode: 'Hybrid', salary: '£60,000 - £80,000', type: 'Permanent' },
  ],
};

const generateRoleCard = (role: {title: string; company: string; location: string; workMode: string; salary: string; type: string}) => `
  <div style="background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 28px; margin-bottom: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
    <!-- Role Title -->
    <h3 style="color: #00ffff; font-size: 22px; font-weight: 700; margin: 0 0 16px 0; line-height: 1.3;">${role.title}</h3>
    
    <!-- Company & Type Badge -->
    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;">
      <div style="background: rgba(0,255,255,0.1); border: 1px solid rgba(0,255,255,0.2); border-radius: 8px; padding: 6px 14px;">
        <span style="color: #00ffff; font-size: 13px; font-weight: 600;">${role.company}</span>
      </div>
      <div style="background: rgba(199,29,241,0.1); border: 1px solid rgba(199,29,241,0.2); border-radius: 8px; padding: 6px 14px;">
        <span style="color: #c71df1; font-size: 13px; font-weight: 600;">${role.type}</span>
      </div>
    </div>
    
    <!-- Role Details Grid -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
      <div>
        <p style="color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">📍 Location</p>
        <p style="color: #fff; font-size: 15px; font-weight: 600; margin: 0;">${role.location}</p>
      </div>
      <div>
        <p style="color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">💼 Work Mode</p>
        <p style="color: #fff; font-size: 15px; font-weight: 600; margin: 0;">${role.workMode}</p>
      </div>
    </div>
    
    <!-- Salary -->
    <div style="background: linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(199,29,241,0.15) 100%); border-radius: 12px; padding: 16px; margin-bottom: 20px;">
      <p style="color: #888; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">💰 Salary Range</p>
      <p style="color: #fff; font-size: 20px; font-weight: 700; margin: 0; background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${role.salary}</p>
    </div>
    
    <!-- CTA Button -->
    <a href="https://recxchange.io" style="display: block; text-align: center; background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); color: #000; text-decoration: none; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s;">View Full Role Details</a>
  </div>
`;

const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'Website - QA 3 roles',
    autoResponseSubject: '3 Matching Roles For Your Candidates',
    autoResponseTemplate: (firstName: string, industries?: string[]) => {
      // Select roles based on industries
      let selectedRoles: Array<{title: string; company: string; location: string; workMode: string; salary: string; type: string}> = [];
      
      if (industries && industries.length > 0) {
        // Get roles from the first industry that has roles
        for (const industry of industries) {
          if (INDUSTRY_ROLES[industry]) {
            selectedRoles = INDUSTRY_ROLES[industry];
            break;
          }
        }
      }
      
      // Fallback to default roles if no industry match
      if (selectedRoles.length === 0) {
        selectedRoles = INDUSTRY_ROLES['Default'];
      }
      
      const industryText = industries && industries.length > 0 ? industries.join(', ') : 'multiple sectors';
      
      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your 3 Matching Roles</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);">
          <div style="max-width: 680px; margin: 0 auto; padding: 48px 24px;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 48px;">
              <h1 style="margin: 0 0 16px 0; font-size: 36px; font-weight: 800; background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2;">Your 3 Matching Roles</h1>
              <div style="width: 80px; height: 4px; background: linear-gradient(90deg, #00ffff 0%, #c71df1 100%); margin: 0 auto 24px auto; border-radius: 2px;"></div>
              <p style="color: #999; font-size: 16px; line-height: 1.6; margin: 0;">Live RecX Direct roles in <strong style="color: #00ffff;">${industryText}</strong></p>
            </div>

            <!-- Intro Message -->
            <div style="background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); border-radius: 24px; padding: 32px; margin-bottom: 32px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
              <h2 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 16px 0;">Thanks for your interest${firstName ? `, ${firstName}` : ''}! 🎯</h2>
              <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">We've curated 3 high-quality roles from our RecX Direct fee pool that match your industry focus. These are live client roles with transparent fees and verified hiring managers.</p>
              <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">All roles below are part of our <strong style="color: #00ffff;">RecX Direct</strong> model — meaning <strong>no per-hire fees</strong>, just your subscription and access to the shared fee pool.</p>
            </div>

            <!-- Role Cards -->
            ${selectedRoles.map(role => generateRoleCard(role)).join('')}

            <!-- CTA Section -->
            <div style="background: linear-gradient(135deg, rgba(0,255,255,0.15) 0%, rgba(199,29,241,0.15) 100%); border: 1px solid rgba(0,255,255,0.2); border-radius: 24px; padding: 40px 32px; text-align: center; margin-top: 32px;">
              <h3 style="color: #fff; font-size: 24px; font-weight: 700; margin: 0 0 16px 0;">Ready to Access All Live Roles?</h3>
              <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 28px 0;">Join RecXchange and unlock 100+ live roles with the Xchange Engine's AI-powered matching. No per-hire fees. Just results.</p>
              <a href="https://recxchange.io/pricing" style="display: inline-block; background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%); color: #000; text-decoration: none; font-weight: 700; font-size: 16px; padding: 18px 48px; border-radius: 12px; text-transform: uppercase; letter-spacing: 0.1em; box-shadow: 0 8px 24px rgba(0,255,255,0.3);">View All Pricing Tiers</a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 48px; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.1);">
              <p style="color: #666; font-size: 13px; margin: 0 0 8px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: #00ffff; text-decoration: none;">contact our team</a></p>
              <p style="color: #666; font-size: 13px; margin: 0;">Best regards,<br><strong style="color: #fff;">The RecXchange Team</strong></p>
            </div>
          </div>
        </body>
        </html>
      `;
    },
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'RecX Direct - Explainer & Fee Pool',
    autoResponseTemplate: (firstName: string) => `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
        <h2 style="color: #00ffff; margin: 0 0 20px 0;">RecX Direct Explainer${firstName ? ` for ${firstName}` : ''}</h2>
        
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
 * 1. Rate limiting and security checks
 * 2. Input validation and sanitization
 * 3. Creates/updates contact in GHL with appropriate tag
 * 4. Tags contacts based on marketing consent (GDPR compliance)
 * 5. Sends auto-response to user
 * 6. Tracks analytics event
 * 
 * Note: Team notifications are handled by GHL automation workflows
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    // 1. Rate limiting - prevent spam and abuse
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

    // 2. Validate and sanitize input
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

    // Validate action type and source
    if (!actionType || !source) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: securityHeaders }
      );
    }

    // Email-based rate limiting - prevent email spam
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

    // 3. Create/update contact in GHL
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        // Build tags array with industries and consent status
        const tags = [config.ghlTag, 'website', 'quick-action'];
        
        if (industries && industries.length > 0) {
          // Sanitize industry tags
          const sanitizedIndustries = industries
            .filter(ind => typeof ind === 'string')
            .map(ind => ind.substring(0, 50))
            .slice(0, 10); // Max 10 industries
          tags.push(...sanitizedIndustries);
        }

        // Add marketing consent tags
        if (marketingConsent === true) {
          tags.push('marketing-consent-given');
        } else if (marketingConsent === false) {
          tags.push('marketing-consent-declined');
        }

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

        if (!ghlResponse.ok) {
          console.error('[Quick Action] GHL error:', await ghlResponse.text());
        }
      } catch (error) {
        console.error('[Quick Action] Failed to create GHL contact:', error);
        // Continue even if GHL fails
      }
    }

    // 4. Send auto-response to user (always send transactional email)
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

    // 5. Track analytics event (bypasses consent check for transactional events)
    try {
      trackEvent('quick_action_form_submitted', {
        action_type: actionType,
        page: source,
        industries: industries && industries.length > 0 ? industries.join(', ') : 'none',
        marketing_consent: marketingConsent === true ? 'given' : marketingConsent === false ? 'declined' : 'not_asked',
      }, { bypassConsent: true }); // Transactional event
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
