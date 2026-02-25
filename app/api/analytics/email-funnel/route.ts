import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/lib/analytics';
import { 
  recruiterFunnel,
  hiringManagerFunnel,
  getWeeklyFunnelMetrics,
  generateFunnelASCII,
  FunnelMetrics
} from '@/lib/funnel';

/**
 * POST /api/analytics/email-funnel
 * 
 * Sends weekly funnel report via SendGrid
 * Should be called by a cron job every Monday
 */
export async function POST(request: NextRequest) {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const EMAIL_TO = process.env.FUNNEL_EMAIL_TO || 'tom@andrewsrecruitmentgroup.com';
    const EMAIL_FROM = process.env.SENDGRID_FROM_EMAIL || 'analytics@recxchange.com';

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
    const recruiterMetrics = getWeeklyFunnelMetrics(events, recruiterFunnel);
    const hiringManagerMetrics = getWeeklyFunnelMetrics(events, hiringManagerFunnel);

    // Generate visualizations
    const recruiterViz = generateFunnelASCII(recruiterMetrics);
    const hiringManagerViz = generateFunnelASCII(hiringManagerMetrics);

    // Generate HTML email content
    const htmlContent = generateHTMLEmail(recruiterMetrics, hiringManagerMetrics);

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
          subject: `RecXchange Weekly Funnel Report - ${new Date().toLocaleDateString()}`
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

function generateHTMLEmail(recruiterMetrics: FunnelMetrics, hiringManagerMetrics: FunnelMetrics): string {
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
      max-width: 800px;
      margin: 0 auto;
      background: #111;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #222;
    }
    .header {
      background: linear-gradient(135deg, #00ffff 0%, #c71df1 100%);
      padding: 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      color: #000;
      font-size: 28px;
      font-weight: 800;
    }
    .header p {
      margin: 8px 0 0 0;
      color: #000;
      opacity: 0.7;
      font-size: 14px;
    }
    .content {
      padding: 40px;
    }
    .funnel {
      margin-bottom: 60px;
    }
    .funnel h2 {
      color: #00ffff;
      font-size: 20px;
      margin: 0 0 20px 0;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      padding: 20px;
      background: #0a0a0a;
      border-radius: 12px;
      border: 1px solid #222;
    }
    .stat {
      text-align: center;
    }
    .stat-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666;
      margin-bottom: 8px;
    }
    .stat-value {
      font-size: 32px;
      font-weight: 800;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .stage {
      position: relative;
      margin-bottom: 20px;
      padding: 20px;
      background: #0a0a0a;
      border-radius: 12px;
      border-left: 4px solid #00ffff;
    }
    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .stage-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
    .stage-count {
      font-size: 24px;
      font-weight: 800;
      color: #00ffff;
    }
    .stage-bar {
      height: 8px;
      background: #222;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 8px;
    }
    .stage-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00ffff, #c71df1);
      border-radius: 4px;
      transition: width 0.3s ease;
    }
    .stage-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
    }
    .drop-off {
      color: #ff4444;
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
      <h1>Weekly Funnel Report</h1>
      <p>${recruiterMetrics.period.start.toLocaleDateString()} - ${recruiterMetrics.period.end.toLocaleDateString()}</p>
    </div>
    
    <div class="content">
      ${generateFunnelHTML(recruiterMetrics)}
      ${generateFunnelHTML(hiringManagerMetrics)}
    </div>
    
    <div class="footer">
      <p>RecXchange Analytics • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateFunnelHTML(metrics: FunnelMetrics): string {
  const stagesHTML = metrics.stages.map(stage => `
    <div class="stage">
      <div class="stage-header">
        <div class="stage-title">${stage.description}</div>
        <div class="stage-count">${stage.count}</div>
      </div>
      <div class="stage-bar">
        <div class="stage-bar-fill" style="width: ${stage.percentage}%"></div>
      </div>
      <div class="stage-meta">
        <span>${stage.percentage}% of total</span>
        ${stage.dropOffPercentage > 0 ? `<span class="drop-off">↓ ${stage.dropOffPercentage}% drop-off</span>` : ''}
      </div>
    </div>
  `).join('');

  return `
    <div class="funnel">
      <h2>${metrics.funnel}</h2>
      
      <div class="stats">
        <div class="stat">
          <div class="stat-label">Total Users</div>
          <div class="stat-value">${metrics.totalUsers}</div>
        </div>
        <div class="stat">
          <div class="stat-label">Conversion Rate</div>
          <div class="stat-value">${metrics.conversionRate}%</div>
        </div>
        <div class="stat">
          <div class="stat-label">Converted</div>
          <div class="stat-value">${metrics.stages[metrics.stages.length - 1]?.count || 0}</div>
        </div>
      </div>
      
      ${stagesHTML}
    </div>
  `;
}
