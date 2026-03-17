import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, isValidEmail, getSecurityHeaders } from '@/lib/security';

/**
 * POST /api/investor-access
 *
 * Receives a "request access" submission from the /investor page and
 * emails the details to tom@recxchange.io via SendGrid.
 */
export async function POST(request: NextRequest) {
  const securityHeaders = getSecurityHeaders();

  try {
    const body = await request.json();
    const { name, businessName, email } = body;

    // Basic validation
    if (!name || !businessName || !email) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400, headers: securityHeaders }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400, headers: securityHeaders }
      );
    }

    const safeName         = sanitizeInput(name, 120);
    const safeBusinessName = sanitizeInput(businessName, 200);
    const safeEmail        = sanitizeInput(email, 254);

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const FROM_EMAIL       = process.env.SENDGRID_FROM_EMAIL || 'tom@recxchange.io';
    const TO_EMAIL         = 'tom@recxchange.io';

    if (!SENDGRID_API_KEY) {
      console.error('[investor-access] SENDGRID_API_KEY not set');
      return NextResponse.json(
        { error: 'Email service not configured.' },
        { status: 500, headers: securityHeaders }
      );
    }

    const submittedAt = new Date().toLocaleString('en-GB', {
      timeZone: 'Europe/London',
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/><title>Investor Access Request</title></head>
<body style="font-family:'Segoe UI',Arial,sans-serif;background:#0a0a0f;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0f;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111827;border-radius:12px;border:1px solid #1f2937;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,rgba(0,240,255,0.12),rgba(168,85,247,0.12));padding:28px 32px;border-bottom:1px solid rgba(0,240,255,0.2);">
              <p style="margin:0;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#00f0ff;font-weight:700;">RecXchange Investor Portal</p>
              <h1 style="margin:8px 0 0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.2;">New Access Request</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:28px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f2937;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Name</p>
                    <p style="margin:4px 0 0;font-size:16px;color:#f0f0f0;font-weight:600;">${safeName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f2937;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Business Name</p>
                    <p style="margin:4px 0 0;font-size:16px;color:#f0f0f0;font-weight:600;">${safeBusinessName}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid #1f2937;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Email</p>
                    <p style="margin:4px 0 0;font-size:16px;color:#00f0ff;font-weight:600;">
                      <a href="mailto:${safeEmail}" style="color:#00f0ff;text-decoration:none;">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:#6b7280;font-weight:600;">Submitted</p>
                    <p style="margin:4px 0 0;font-size:14px;color:#9ca3af;">${submittedAt} (London)</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:16px 32px;border-top:1px solid #1f2937;background:rgba(0,0,0,0.2);">
              <p style="margin:0;font-size:12px;color:#374151;text-align:center;">RecXchange Investor Portal &middot; recxchange.io/investor</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL, name: 'Tom Andrews' }], subject: `Investor Access Request: ${safeName} (${safeBusinessName})` }],
        from: { email: FROM_EMAIL, name: 'RecXchange Investor Portal' },
        reply_to: { email: safeEmail, name: safeName },
        content: [{ type: 'text/html', value: htmlBody }],
      }),
    });

    if (!sgResponse.ok) {
      const errText = await sgResponse.text();
      console.error('[investor-access] SendGrid error:', errText);
      return NextResponse.json(
        { error: 'Failed to send request. Please try again.' },
        { status: 500, headers: securityHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Access request sent.' },
      { headers: securityHeaders }
    );
  } catch (err) {
    console.error('[investor-access] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500, headers: securityHeaders }
    );
  }
}
