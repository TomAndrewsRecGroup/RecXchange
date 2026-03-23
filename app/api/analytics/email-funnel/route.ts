import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/lib/analytics';
import { requireCronSecret } from '@/lib/security';
import { 
  recruiterSignupFunnel,
  hiringManagerBookingFunnel,
  getWeeklyFunnelMetrics,
  generateFunnelASCII,
  FunnelMetrics
} from '@/lib/funnel';
import { getWeeklyGHLConversionData, GHLConversionData } from '@/lib/ghl-client';

/**
 * POST /api/analytics/email-funnel
 * 
 * Sends weekly funnel report via SendGrid
 * Should be called by a cron job every Monday
 */
export async function POST(request: NextRequest) {
  const authError = requireCronSecret(request);
  if (authError) return authError;

  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const EMAIL_TO = process.env.FUNNEL_EMAIL_TO || 'tom@andrews-recruitment.com';
    const EMAIL_FROM = process.env.SENDGRID_FROM_EMAIL || 'analytics@recxchange.com';
    const GHL_API_KEY = process.env.GHL_API_KEY;
    const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID;

    if (!SENDGRID_API_KEY) {
      console.error('[Email Funnel] SENDGRID_API_KEY not configured');
      return NextResponse.json(
        { error: 'SendGrid not configured' },
        { status: 500 }
      );
    }

    // Get events from storage
    const eventsResponse = await fetch(
      new URL('/api/analytics/track', request.url).toString()
    );
    const { events } = await eventsResponse.json();

    // Calculate metrics for both funnels
    const recruiterMetrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);
    const hiringManagerMetrics = getWeeklyFunnelMetrics(events, hiringManagerBookingFunnel);

    // Get GHL conversion data if API key is configured
    let ghlData: GHLConversionData | null = null;
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      try {
        ghlData = await getWeeklyGHLConversionData(GHL_API_KEY, GHL_LOCATION_ID);
        console.log('[Email Funnel] GHL conversion data fetched:', ghlData);
      } catch (error) {
        console.error('[Email Funnel] Failed to fetch GHL data:', error);
        // Continue without GHL data
      }
    }

    // Generate visualizations
    const recruiterViz = generateFunnelASCII(recruiterMetrics);
    const hiringManagerViz = generateFunnelASCII(hiringManagerMetrics);

    // Generate HTML email content
    const htmlContent = generateHTMLEmail(recruiterMetrics, hiringManagerMetrics, ghlData);

    // Send via SendGrid
    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{
          to: [{ email: EMAIL_TO }],
          subject: `📈 RecXchange Weekly Funnel Report - ${new Date().toLocaleDateString()}`
        }],
        from: { email: EMAIL_FROM, name: 'RecXchange Analytics' },
        content: [
          {
            type: 'text/plain',
            value: `${recruiterViz}\n\n${hiringManagerViz}`
          },
          {
            type: 'text/html',
            value: htmlContent
          }
        ]
      })
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('[Email Funnel] SendGrid error:', errorText);
      return NextResponse.json(
        { error: 'Failed to send email', details: errorText },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      recruiterMetrics,
      hiringManagerMetrics,
      ghlData,
      sentTo: EMAIL_TO
    });
  } catch (error) {
    console.error('[Email Funnel] Error:', error);
    return NextResponse.json(
      { error: 'Failed to send funnel email' },
      { status: 500 }
    );
  }
}

function generateHTMLEmail(
  recruiterMetrics: FunnelMetrics, 
  hiringManagerMetrics: FunnelMetrics,
  ghlData: GHLConversionData | null
): string {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: #0a0a0a;
      color: #e5e5e5;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 900px;
      margin: 0 auto;
      background: #0a0a0a;
      border-radius: 20px;
      overflow: hidden;
    }
    .header {
      background: #000;
      padding: 40px;
      text-align: center;
      border-bottom: 1px solid #222;
    }
    .logo {
      max-width: 200px;
      height: auto;
      margin-bottom: 20px;
    }
    .header h1 {
      margin: 0;
      color: #fff;
      font-size: 32px;
      font-weight: 800;
    }
    .header p {
      margin: 12px 0 0 0;
      color: #888;
      font-size: 16px;
    }
    .content {
      padding: 40px;
    }
    .ghl-section {
      background: #111;
      border-radius: 16px;
      padding: 30px;
      margin-bottom: 40px;
      border: 2px solid #00ffff;
    }
    .ghl-section h2 {
      color: #00ffff;
      font-size: 24px;
      margin: 0 0 20px 0;
      text-align: center;
    }
    .ghl-summary {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
    }
    .ghl-stat {
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .ghl-stat-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #666;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .ghl-stat-value {
      font-size: 42px;
      font-weight: 900;
      color: #00ffff;
      line-height: 1;
    }
    .ghl-stat-subtext {
      font-size: 13px;
      color: #666;
      margin-top: 8px;
    }
    .tier-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }
    .tier-card {
      background: linear-gradient(135deg, #0a0a0a, #111);
      border: 2px solid #222;
      border-radius: 12px;
      padding: 20px;
    }
    .tier-card.has-signups {
      border-color: #22c55e;
    }
    .tier-name {
      font-size: 14px;
      color: #888;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .tier-count {
      font-size: 36px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .tier-card.has-signups .tier-count {
      background: linear-gradient(135deg, #22c55e, #00ffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .funnel {
      margin-bottom: 60px;
      background: #111;
      border-radius: 16px;
      padding: 30px;
      border: 1px solid #222;
    }
    .funnel-header {
      margin-bottom: 30px;
      text-align: center;
    }
    .funnel h2 {
      color: #fff;
      font-size: 28px;
      margin: 0 0 8px 0;
    }
    .funnel-description {
      color: #888;
      font-size: 15px;
      margin: 0;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 40px;
    }
    .summary-card {
      background: linear-gradient(135deg, #0a0a0a, #111);
      border: 2px solid #222;
      border-radius: 12px;
      padding: 20px;
      text-align: center;
    }
    .summary-label {
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #666;
      margin-bottom: 10px;
      font-weight: 600;
    }
    .summary-value {
      font-size: 48px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
    }
    .summary-subtext {
      font-size: 13px;
      color: #666;
      margin-top: 8px;
    }
    .alert-box {
      background: linear-gradient(135deg, #ff4444, #ff0066);
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 30px;
      text-align: center;
    }
    .alert-box h3 {
      margin: 0 0 10px 0;
      font-size: 16px;
      color: #fff;
      font-weight: 700;
    }
    .alert-box p {
      margin: 0;
      font-size: 14px;
      color: #fff;
      opacity: 0.9;
    }
    .stage-visual {
      margin-bottom: 30px;
    }
    .stage-row {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      gap: 15px;
    }
    .stage-number {
      flex-shrink: 0;
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 900;
      font-size: 18px;
    }
    .stage-content {
      flex: 1;
      background: #0a0a0a;
      border: 1px solid #222;
      border-radius: 12px;
      padding: 20px;
    }
    .stage-title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }
    .stage-title {
      font-size: 18px;
      font-weight: 700;
      color: #fff;
    }
    .stage-count {
      font-size: 32px;
      font-weight: 900;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .progress-bar-container {
      background: #1a1a1a;
      height: 12px;
      border-radius: 6px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .progress-bar {
      height: 100%;
      background: linear-gradient(90deg, #00ffff, #c71df1);
      border-radius: 6px;
      transition: width 0.3s ease;
    }
    .stage-stats {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #888;
      margin-bottom: 12px;
    }
    .drop-off-warning {
      background: rgba(255, 68, 68, 0.1);
      border: 1px solid rgba(255, 68, 68, 0.3);
      border-radius: 8px;
      padding: 10px 15px;
      margin-top: 10px;
    }
    .drop-off-text {
      color: #ff4444;
      font-weight: 700;
      font-size: 14px;
    }
    .success-badge {
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: #22c55e;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }
    .footer {
      text-align: center;
      padding: 40px;
      color: #666;
      font-size: 12px;
      border-top: 1px solid #222;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="RecXchange Logo" class="logo" />
      <h1>Weekly Funnel Report</h1>
      <p>${recruiterMetrics.period.start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${recruiterMetrics.period.end.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
    </div>
    
    <div class="content">
      ${ghlData ? generateGHLSection(ghlData) : ''}
      ${generateFunnelHTML(recruiterMetrics)}
      ${generateFunnelHTML(hiringManagerMetrics)}
    </div>
    
    <div class="footer">
      <p><strong>RecXchange Analytics</strong> • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString('en-GB')}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateGHLSection(ghlData: GHLConversionData): string {
  return `
    <div class="ghl-section">
      <h2>💎 Actual Signups (from CRM)</h2>
      
      <div class="ghl-summary">
        <div class="ghl-stat">
          <div class="ghl-stat-label">Website Visitors</div>
          <div class="ghl-stat-value">${ghlData.websiteTaggedContacts}</div>
          <div class="ghl-stat-subtext">tagged this week</div>
        </div>
        <div class="ghl-stat">
          <div class="ghl-stat-label">Paid Signups</div>
          <div class="ghl-stat-value">${ghlData.totalTieredSignups}</div>
          <div class="ghl-stat-subtext">with tier tag</div>
        </div>
        <div class="ghl-stat">
          <div class="ghl-stat-label">Conversion Rate</div>
          <div class="ghl-stat-value">${ghlData.conversionRate}%</div>
          <div class="ghl-stat-subtext">to paid tier</div>
        </div>
      </div>
      
      <div class="tier-grid">
        ${ghlData.tieredSignups.map(tier => `
          <div class="tier-card ${tier.count > 0 ? 'has-signups' : ''}">
            <div class="tier-name">${tier.tier}</div>
            <div class="tier-count">${tier.count}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateFunnelHTML(metrics: FunnelMetrics): string {
  const stagesHTML = metrics.stages.map((stage, index) => {
    const isDropOffHigh = stage.dropOffPercentage > 30;
    const hasNoDrop = stage.dropOffPercentage === 0;
    
    return `
    <div class="stage-row">
      <div class="stage-number">${index + 1}</div>
      <div class="stage-content">
        <div class="stage-title-row">
          <div class="stage-title">${stage.description}</div>
          <div class="stage-count">${stage.count}</div>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${stage.percentage}%"></div>
        </div>
        <div class="stage-stats">
          <span><strong>${stage.percentage}%</strong> of all visitors</span>
          ${!hasNoDrop ? `<span><strong>${stage.dropOff}</strong> people left here</span>` : `<span class="success-badge">✓ Everyone continued</span>`}
        </div>
        ${isDropOffHigh ? `
          <div class="drop-off-warning">
            <div class="drop-off-text">⚠️ High Drop-off: ${stage.dropOffPercentage}% left at this stage</div>
          </div>
        ` : ''}
      </div>
    </div>
    `;
  }).join('');

  return `
    <div class="funnel">
      <div class="funnel-header">
        <h2>${metrics.funnel}</h2>
        <p class="funnel-description">${metrics.description}</p>
      </div>
      
      <div class="summary-grid">
        <div class="summary-card">
          <div class="summary-label">Total Visitors</div>
          <div class="summary-value">${metrics.totalUsers}</div>
          <div class="summary-subtext">this week</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Conversion Rate</div>
          <div class="summary-value">${metrics.conversionRate}%</div>
          <div class="summary-subtext">signed up / booked</div>
        </div>
        <div class="summary-card">
          <div class="summary-label">Converted</div>
          <div class="summary-value">${metrics.stages[metrics.stages.length - 1]?.count || 0}</div>
          <div class="summary-subtext">new users</div>
        </div>
      </div>
      
      <div class="alert-box">
        <h3>🚨 Biggest Problem Area</h3>
        <p><strong>${metrics.insights.biggestDropOff.stage}</strong> - ${metrics.insights.biggestDropOff.percentage}% of people are leaving here</p>
      </div>
      
      <div class="stage-visual">
        ${stagesHTML}
      </div>
    </div>
  `;
}
