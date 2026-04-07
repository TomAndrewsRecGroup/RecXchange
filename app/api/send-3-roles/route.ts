import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface Role {
  id: string;
  source: 'recx_direct' | 'xchange';
  title: string;
  descriptionSnippet: string;
  company: string;
  location: string;
  workModel: 'remote' | 'hybrid' | 'onsite';
  industry: string;
  seniorityLevel: string;
  salaryMin: number;
  salaryMax: number;
  salaryCurrency: string;
  roleType: string;
  postedAt: string;
  splitAmount?: number;
  splitCurrency?: string;
}

interface RequestBody {
  email: string;
  firstName: string;
  industries: string[]; // Array of industries the recruiter works in
  eaveeWebhookUrl?: string; // Optional Eavee/GHL webhook URL
}

// Format currency with symbol
function formatCurrency(amount: number, currency: string): string {
  const symbols: Record<string, string> = {
    'USD': '$', 'GBP': '£', 'EUR': '€', 'CAD': 'C$', 'AUD': 'A$',
    'SGD': 'S$', 'AED': 'AED', 'INR': '₹', 'ZAR': 'R'
  };
  const symbol = symbols[currency] || currency;
  const formatted = amount >= 1000 
    ? `${Math.round(amount / 1000)}k` 
    : amount.toLocaleString();
  return `${symbol}${formatted}`;
}

// Format salary range
function formatSalaryRange(min: number, max: number, currency: string): string {
  return `${formatCurrency(min, currency)}-${formatCurrency(max, currency)}`;
}

// Get 3 random roles matching the recruiter's industries
function getMatchedRoles(allRoles: Role[], industries: string[]): Role[] {
  // Normalize industries for matching (case-insensitive)
  const normalizedIndustries = industries.map(i => i.toLowerCase().trim());
  
  // Filter roles that match recruiter's industries
  const matchedRoles = allRoles.filter(role => 
    normalizedIndustries.some(industry => 
      role.industry.toLowerCase().includes(industry) || 
      industry.includes(role.industry.toLowerCase())
    )
  );
  
  // If we have matched roles, randomly select 3
  if (matchedRoles.length > 0) {
    const shuffled = matchedRoles.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }
  
  // Fallback: if no matches, return 3 random roles from all roles
  const shuffled = allRoles.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

// Generate HTML email with Harmozi/Priestley style closing
function generateEmailHTML(firstName: string, roles: Role[]): string {
  // Calculate total potential fees
  const totalFees = roles.reduce((sum, role) => {
    if (role.splitAmount) return sum + role.splitAmount;
    return sum;
  }, 0);
  
  const avgFee = Math.round(totalFees / roles.length);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>3 Live Roles Matched to Your Sectors</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #050508; color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(255,0,255,0.05) 100%);">
    
    <!-- Header -->
    <div style="padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(139, 92, 246, 0.1);">
      <img src="https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w" alt="RecXchange" style="width: 160px; height: auto; margin-bottom: 20px; filter: drop-shadow(0px 0px 8px rgba(0, 255, 255, 0.4));" />
      <div style="display: inline-block; padding: 8px 16px; background: rgba(139, 92, 246, 0.1); border: 1px solid rgba(139, 92, 246, 0.3); border-radius: 12px; margin-bottom: 20px;">
        <span style="color: #a78bfa; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 2px;">Live Roles · Live Revenue</span>
      </div>
      <h1 style="margin: 0; font-size: 32px; font-weight: 900; background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; line-height: 1.2;">${firstName}, here are 3 roles we matched to your sectors</h1>
    </div>

    <!-- Opening Hook (Harmozi Style) -->
    <div style="padding: 30px; background: rgba(139, 92, 246, 0.03); border-bottom: 1px solid rgba(139, 92, 246, 0.1);">
      <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #d1d5db;">Here's what most recruiters don't realize...</p>
      <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.6; color: #d1d5db;">While they're cold-calling hiring managers and chasing leads, <strong style="color: #ffffff;">these 3 roles below are sitting there waiting to be filled</strong>, with the client relationship already built for you.</p>
      <p style="margin: 0; font-size: 16px; line-height: 1.6; color: #d1d5db;"><strong style="color: #00ffff;">Average fee on these three roles: ${formatCurrency(avgFee, roles[0].splitCurrency || 'GBP')}</strong></p>
    </div>

    <!-- Roles Section -->
    <div style="padding: 30px;">
      ${roles.map((role, index) => `
      <!-- Role Card ${index + 1} -->
      <div style="background: rgba(15, 15, 18, 0.6); border: 1px solid ${role.source === 'recx_direct' ? 'rgba(0, 255, 255, 0.2)' : 'rgba(255, 0, 255, 0.2)'}; border-radius: 24px; padding: 30px; margin-bottom: ${index < 2 ? '20px' : '0'}; backdrop-filter: blur(20px);">
        
        <!-- Role Header -->
        <div style="margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
            <span style="display: inline-block; padding: 6px 14px; background: ${role.source === 'recx_direct' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(255, 0, 255, 0.1)'}; border: 1px solid ${role.source === 'recx_direct' ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 0, 255, 0.3)'}; border-radius: 10px; color: ${role.source === 'recx_direct' ? '#00ffff' : '#ff00ff'}; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">${role.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'}</span>
            <span style="color: #9ca3af; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px;">${role.location}</span>
          </div>
          
          <h2 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 900; color: #ffffff; line-height: 1.2;">${role.title}</h2>
          
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <span style="color: #9ca3af; font-size: 12px; font-weight: 700; text-transform: uppercase;">${role.company}</span>
            <span style="width: 4px; height: 4px; background: rgba(255, 255, 255, 0.2); border-radius: 50%;"></span>
            <span style="color: #d1d5db; font-size: 12px;">${role.industry}</span>
          </div>
          
          <p style="margin: 0; color: #6b7280; font-size: 11px; text-transform: capitalize;">${role.workModel} · ${role.seniorityLevel} · ${role.roleType}</p>
        </div>

        <!-- Role Description -->
        <p style="margin: 0 0 20px 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">${role.descriptionSnippet}</p>

        <!-- Role Footer -->
        <div style="padding-top: 20px; border-top: 1px solid rgba(139, 92, 246, 0.1); display: flex; justify-content: space-between; align-items: center;">
          <div>
            <p style="margin: 0 0 5px 0; color: #6b7280; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px;">Your Split</p>
            <p style="margin: 0; font-size: 28px; font-weight: 900; background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${role.splitAmount && role.splitCurrency ? formatCurrency(role.splitAmount, role.splitCurrency) : 'TBD'}</p>
          </div>
        </div>
      </div>
      `).join('')}
    </div>

    <!-- The Close (Harmozi + Priestley Hybrid) -->
    <div style="padding: 40px 30px; background: rgba(139, 92, 246, 0.05); border-top: 1px solid rgba(139, 92, 246, 0.1);">
      <h3 style="margin: 0 0 20px 0; font-size: 20px; font-weight: 900; color: #ffffff;">Here's why this matters right now...</h3>
      
      <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">Every day these roles sit unfilled, someone else is making the placement. Every hour you wait, another recruiter is submitting their candidate.</p>
      
      <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;"><strong style="color: #ffffff;">The average RecXchange member makes their first split within 19 days.</strong> Not 6 months. Not "eventually." <em style="color: #00ffff;">Nineteen days.</em></p>
      
      <p style="margin: 0 0 15px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">Why? Because the business development is <strong style="color: #ffffff;">already done.</strong> The client is <strong style="color: #ffffff;">already warm.</strong> The role is <strong style="color: #ffffff;">already live.</strong></p>
      
      <div style="background: rgba(255, 0, 255, 0.05); border-left: 4px solid #ff00ff; padding: 20px; margin: 25px 0;">
        <p style="margin: 0 0 10px 0; font-size: 16px; font-weight: 700; color: #ff00ff;">Think about this:</p>
        <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">One placement from these three roles = <strong style="color: #ffffff;">${formatCurrency(avgFee, roles[0].splitCurrency || 'GBP')}</strong><br/>That's <strong style="color: #ffffff;">12 months of RecXchange membership paid for.</strong><br/>Everything after that? <strong style="color: #00ffff;">Pure profit.</strong></p>
      </div>
      
      <p style="margin: 0 0 25px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;">You're not buying a platform. You're buying <strong style="color: #ffffff;">access to revenue</strong> that's already sitting there, waiting for someone with the right candidate.</p>
      
      <p style="margin: 0 0 30px 0; font-size: 15px; line-height: 1.6; color: #d1d5db;"><strong style="color: #ffffff;">The question isn't "Is this worth it?"</strong><br/>The question is: <em style="color: #00ffff;">"How many placements am I missing while I'm thinking about it?"</em></p>

      <!-- CTA Button -->
      <div style="text-align: center; margin-bottom: 25px;">
        <a href="https://app.recxchange.io/register?trigger_link=QjW2p32pFmIWw7ESQTUD" style="display: inline-block; padding: 18px 40px; background: linear-gradient(135deg, #00ffff 0%, #ff00ff 100%); border-radius: 16px; color: #ffffff; font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; text-decoration: none; box-shadow: 0 10px 40px rgba(139, 92, 246, 0.3); transition: all 0.3s ease;">Start Submitting Candidates Now</a>
      </div>

      <!-- P.S. Section (Classic Priestley) -->
      <div style="border-top: 1px solid rgba(139, 92, 246, 0.1); padding-top: 20px; margin-top: 20px;">
        <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #a78bfa;">P.S.</p>
        <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">These exact three roles? They'll likely be filled in the next 7-14 days. But there are <strong style="color: #ffffff;">${totalFees > 100000 ? '$600k+' : '$400k+'} in total fees</strong> sitting across 100+ other live roles right now.</p>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">The members who join today get first access. The ones who "think about it"? They watch someone else cash the cheque.</p>
      </div>

      <div style="border-top: 1px solid rgba(139, 92, 246, 0.1); padding-top: 20px; margin-top: 20px;">
        <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 700; color: #a78bfa;">P.P.S.</p>
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">Still on the fence? <strong style="color: #ffffff;">Start with RecX Entry (it's free).</strong> Get access to roles, upload candidates, see how it works. No credit card. No commitment. Just revenue opportunity.</p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding: 30px; text-align: center; border-top: 1px solid rgba(139, 92, 246, 0.1);">
      <p style="margin: 0 0 15px 0; font-size: 12px; color: #6b7280;">You're receiving this because you expressed interest in RecXchange.</p>
      <div style="margin-bottom: 15px;">
        <a href="https://recxchange.io" style="color: #00ffff; text-decoration: none; font-size: 12px; margin: 0 10px;">Visit Website</a>
        <span style="color: #374151;">|</span>
        <a href="https://app.recxchange.io" style="color: #00ffff; text-decoration: none; font-size: 12px; margin: 0 10px;">Platform Login</a>
        <span style="color: #374151;">|</span>
        <a href="https://recxchange.io/privacy" style="color: #6b7280; text-decoration: none; font-size: 12px; margin: 0 10px;">Privacy Policy</a>
      </div>
      <p style="margin: 0; font-size: 11px; color: #4b5563;">© 2026 RecXchange Portal LLC. All rights reserved.</p>
    </div>

  </div>
</body>
</html>
  `.trim();
}

// Plain text version for email clients that don't support HTML
function generateEmailText(firstName: string, roles: Role[]): string {
  const totalFees = roles.reduce((sum, role) => sum + (role.splitAmount || 0), 0);
  const avgFee = Math.round(totalFees / roles.length);

  return `
${firstName}, here are 3 roles we matched to your sectors

${roles.map((role, i) => `
ROLE ${i + 1}: ${role.title}
${role.source === 'recx_direct' ? 'RecX Direct' : 'Xchange'} | ${role.location}

${role.company} - ${role.industry}
${role.workModel} · ${role.seniorityLevel} · ${role.roleType}

${role.descriptionSnippet}

Your Split: ${role.splitAmount && role.splitCurrency ? formatCurrency(role.splitAmount, role.splitCurrency) : 'TBD'}
Salary: ${formatSalaryRange(role.salaryMin, role.salaryMax, role.salaryCurrency)}
`).join('\n---\n')}

Here's why this matters right now...

Every day these roles sit unfilled, someone else is making the placement. Every hour you wait, another recruiter is submitting their candidate.

The average RecXchange member makes their first split within 19 days. Not 6 months. Not "eventually." Nineteen days.

Why? Because the business development is already done. The client is already warm. The role is already live.

Think about this:
One placement from these three roles = ${formatCurrency(avgFee, roles[0].splitCurrency || 'GBP')}
That's 12 months of RecXchange membership paid for.
Everything after that? Pure profit.

You're not buying a platform. You're buying access to revenue that's already sitting there, waiting for someone with the right candidate.

The question isn't "Is this worth it?"
The question is: "How many placements am I missing while I'm thinking about it?"

Start submitting candidates now:
https://app.recxchange.io/register?trigger_link=QjW2p32pFmIWw7ESQTUD

P.S. These exact three roles? They'll likely be filled in the next 7-14 days. But there are $600k+ in total fees sitting across 100+ other live roles right now.

The members who join today get first access. The ones who "think about it"? They watch someone else cash the cheque.

P.P.S. Still on the fence? Start with RecX Entry (it's free). Get access to roles, upload candidates, see how it works. No credit card. No commitment. Just revenue opportunity.

---
RecXchange Portal LLC
https://recxchange.io
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const { email, firstName, industries, eaveeWebhookUrl } = body;

    // Validate required fields
    if (!email || !firstName || !industries || industries.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: email, firstName, and industries are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Fetch roles from the API
    const rolesResponse = await fetch(`${request.nextUrl.origin}/api/roles`);
    if (!rolesResponse.ok) {
      throw new Error('Failed to fetch roles');
    }
    const rolesData = await rolesResponse.json();
    const allRoles: Role[] = rolesData.roles;

    // Get 3 matched roles
    const matchedRoles = getMatchedRoles(allRoles, industries);

    if (matchedRoles.length === 0) {
      return NextResponse.json(
        { error: 'No roles available at this time' },
        { status: 404 }
      );
    }

    // Generate email content
    const htmlContent = generateEmailHTML(firstName, matchedRoles);
    const textContent = generateEmailText(firstName, matchedRoles);

    // Prepare SendGrid email
    const msg = {
      to: email,
      from: {
        email: 'hello@recxchange.io',
        name: 'RecXchange'
      },
      subject: `${firstName}, ${matchedRoles.length} live roles matched to your sectors 💰`,
      text: textContent,
      html: htmlContent,
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: true
        },
        openTracking: {
          enable: true
        }
      },
      // Custom args for tracking
      customArgs: {
        campaign: 'send_3_roles',
        industries: industries.join(','),
        role_ids: matchedRoles.map(r => r.id).join(',')
      }
    };

    // Send email via SendGrid
    await sgMail.send(msg);

    // Send webhook to Eavee/GHL if URL provided
    if (eaveeWebhookUrl) {
      try {
        await fetch(eaveeWebhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            firstName,
            industries,
            rolesSent: matchedRoles.map(role => ({
              id: role.id,
              title: role.title,
              source: role.source,
              industry: role.industry,
              splitAmount: role.splitAmount,
              splitCurrency: role.splitCurrency
            })),
            timestamp: new Date().toISOString(),
            event: 'send_3_roles_email_sent'
          })
        });
      } catch (webhookError) {
        console.error('Failed to send webhook to Eavee/GHL:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      rolesSent: matchedRoles.length,
      roles: matchedRoles.map(role => ({
        id: role.id,
        title: role.title,
        industry: role.industry
      }))
    });

  } catch (error) {
    console.error('Error in send-3-roles API:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
