import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  getClientIP,
  validateFormData,
  sanitizeInput,
  getSecurityHeaders,
} from '@/lib/security';

interface InstantRoleRequest {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  liveRole: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    const clientIP = getClientIP(request);
    const ipRateLimit = checkRateLimit(clientIP, 'form');
    if (!ipRateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.', resetIn: Math.ceil(ipRateLimit.resetIn / 1000) },
        { status: 429, headers: { ...securityHeaders, 'Retry-After': String(Math.ceil(ipRateLimit.resetIn / 1000)) } }
      );
    }

    const body: InstantRoleRequest = await request.json();
    const { name, email, phone, businessName, liveRole, notes } = body;

    // Validate core fields
    let sanitizedData;
    try {
      const nameParts = sanitizeInput(name || '', 100).split(' ');
      sanitizedData = validateFormData({
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email,
        companyName: businessName,
      });
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : 'Invalid input data' },
        { status: 400, headers: securityHeaders }
      );
    }

    const { firstName, lastName, email: sanitizedEmail, companyName } = sanitizedData;
    const sanitizedPhone = sanitizeInput(phone || '', 30);
    const sanitizedRole = sanitizeInput(liveRole || '', 300);
    const sanitizedNotes = sanitizeInput(notes || '', 1000);

    const emailRateLimit = checkRateLimit(`email:${sanitizedEmail}`, 'email');
    if (!emailRateLimit.success) {
      return NextResponse.json(
        { error: 'Too many submissions from this email. Please try again later.', resetIn: Math.ceil(emailRateLimit.resetIn / 1000) },
        { status: 429, headers: { ...securityHeaders, 'Retry-After': String(Math.ceil(emailRateLimit.resetIn / 1000)) } }
      );
    }

    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'tom@recxchange.io';
    const fullName = `${firstName} ${lastName}`.trim();

    // 1. GHL contact — tagged as client + Instant Role
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        const ghlRes = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${GHL_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email: sanitizedEmail,
            phone: sanitizedPhone,
            companyName,
            locationId: GHL_LOCATION_ID,
            tags: ['client', 'Instant Role', 'website', 'hiring-manager', 'instant-support-form'],
            source: 'RecXchange - Instant Role Form',
            customFields: {
              contact_type: 'Hiring Manager',
              source_page: 'hiring-manager-live',
              live_role: sanitizedRole,
              notes: sanitizedNotes,
              inquiry_date: new Date().toISOString(),
            },
          }),
        });
        if (!ghlRes.ok) {
          console.error('[Instant Role] GHL error:', await ghlRes.text());
        }
      } catch (err) {
        console.error('[Instant Role] GHL create failed:', err);
      }
    }

    // 2. Notification email to support@recxchange.io
    if (SENDGRID_API_KEY) {
      const tableRows = [
        ['Name', fullName],
        ['Email', sanitizedEmail],
        ['Phone', sanitizedPhone || '—'],
        ['Business Name', companyName || '—'],
        ['Live Role', sanitizedRole],
        ['Notes', sanitizedNotes || '—'],
        ['Submitted', new Date().toUTCString()],
      ]
        .map(
          ([label, value]) =>
            `<tr>
              <td style="padding:10px 14px;background:#111827;color:#9ca3af;font-size:13px;font-weight:600;border-bottom:1px solid #1f2937;white-space:nowrap;">${label}</td>
              <td style="padding:10px 14px;background:#0f172a;color:#f1f5f9;font-size:13px;border-bottom:1px solid #1f2937;">${value}</td>
            </tr>`
        )
        .join('');

      const emailHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
        <body style="margin:0;padding:0;background:#030712;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#030712;padding:40px 0;">
            <tr><td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

                <!-- Header -->
                <tr>
                  <td style="background:linear-gradient(135deg,#0a0a1a 0%,#0d1a2e 100%);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;border-bottom:1px solid #1e3a5f;">
                    <div style="display:inline-block;background:linear-gradient(135deg,#00f0ff22,#c71df122);border:1px solid #00f0ff44;border-radius:12px;padding:12px 20px;margin-bottom:20px;">
                      <span style="color:#00f0ff;font-size:12px;font-weight:700;letter-spacing:0.2em;">INSTANT ROLE REQUEST</span>
                    </div>
                    <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;">New Instant Support Submission</h1>
                    <p style="margin:10px 0 0;color:#94a3b8;font-size:14px;">A hiring manager has requested immediate recruiter support.</p>
                  </td>
                </tr>

                <!-- Body -->
                <tr>
                  <td style="background:#0a0f1e;padding:32px 40px;">
                    <p style="color:#94a3b8;font-size:14px;margin:0 0 24px;">The following details were submitted via the <strong style="color:#00f0ff;">Instant Support</strong> form on the RecXchange hiring manager live page.</p>

                    <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #1f2937;">
                      <thead>
                        <tr>
                          <th colspan="2" style="background:#0c1a2e;padding:12px 14px;text-align:left;color:#00f0ff;font-size:11px;letter-spacing:0.15em;font-weight:700;border-bottom:1px solid #1e3a5f;">SUBMISSION DETAILS</th>
                        </tr>
                      </thead>
                      <tbody>${tableRows}</tbody>
                    </table>

                    <div style="margin-top:28px;background:linear-gradient(135deg,#00f0ff0d,#c71df10d);border:1px solid #00f0ff22;border-radius:12px;padding:20px 24px;">
                      <p style="margin:0;color:#94a3b8;font-size:13px;line-height:1.6;">Please follow up promptly. This contact has been tagged <span style="color:#00f0ff;font-weight:700;">client</span> and <span style="color:#c71df1;font-weight:700;">Instant Role</span> in GHL.</p>
                    </div>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background:#070c18;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;border-top:1px solid #1e3a5f;">
                    <p style="margin:0;color:#4b5563;font-size:12px;">RecXchange &bull; Automated Lead Notification &bull; support@recxchange.io</p>
                  </td>
                </tr>

              </table>
            </td></tr>
          </table>
        </body>
        </html>
      `;

      try {
        await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: 'support@recxchange.io', name: 'RecXchange Support' }],
              subject: `⚡ Instant Role Request — ${fullName} @ ${companyName || 'Unknown Business'}`,
            }],
            from: { email: FROM_EMAIL, name: 'RecXchange' },
            content: [{ type: 'text/html', value: emailHtml }],
          }),
        });
      } catch (err) {
        console.error('[Instant Role] SendGrid notify failed:', err);
      }
    }

    return NextResponse.json({ success: true }, { headers: securityHeaders });
  } catch (error) {
    console.error('[Instant Role] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: securityHeaders });
  }
}
