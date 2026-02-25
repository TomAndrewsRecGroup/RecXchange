import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsEvent } from '@/lib/analytics';
import { 
  recruiterSignupFunnel,
  hiringManagerBookingFunnel,
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
    const recruiterMetrics = getWeeklyFunnelMetrics(events, recruiterSignupFunnel);
    const hiringManagerMetrics = getWeeklyFunnelMetrics(events, hiringManagerBookingFunnel);

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
      max-width: 900px;
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
      font-size: 32px;
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
    .funnel-header {
      margin-bottom: 30px;
    }
    .funnel h2 {
      color: #00ffff;
      font-size: 24px;
      margin: 0 0 8px 0;
    }
    .funnel-description {
      color: #888;
      font-size: 14px;
      margin: 0;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 30px;
      padding: 25px;
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
      font-size: 36px;
      font-weight: 800;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .insights {
      padding: 20px;
      background: #1a1a1a;
      border-radius: 12px;
      border-left: 4px solid #c71df1;
      margin-bottom: 30px;
    }
    .insights h3 {
      color: #c71df1;
      font-size: 16px;
      margin: 0 0 15px 0;
    }
    .insight-item {
      font-size: 13px;
      color: #aaa;
      margin-bottom: 8px;
      line-height: 1.5;
    }
    .insight-item strong {
      color: #fff;
    }
    .stage {
      position: relative;
      margin-bottom: 25px;
      padding: 25px;
      background: #0a0a0a;
      border-radius: 12px;
      border-left: 4px solid #00ffff;
    }
    .stage-number {
      position: absolute;
      top: 25px;
      left: -15px;
      width: 30px;
      height: 30px;
      background: linear-gradient(135deg, #00ffff, #c71df1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-weight: 800;
      font-size: 14px;
    }
    .stage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      padding-left: 20px;
    }
    .stage-title {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
    }
    .stage-count {
      font-size: 28px;
      font-weight: 800;
      color: #00ffff;
    }
    .stage-bar {
      height: 10px;
      background: #222;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 12px;
    }
    .stage-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #00ffff, #c71df1);
      border-radius: 5px;
      transition: width 0.3s ease;
    }
    .stage-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      margin-bottom: 12px;
    }
    .drop-off {
      color: #ff4444;
      font-weight: 600;
    }
    .stage-questions {
      background: #1a1a1a;
      padding: 15px;
      border-radius: 8px;
      margin-top: 12px;
    }
    .stage-questions-title {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #888;
      margin-bottom: 8px;
    }
    .stage-questions ul {
      margin: 0;
      padding-left: 20px;
      list-style: none;
    }
    .stage-questions li {
      font-size: 12px;
      color: #bbb;
      margin-bottom: 4px;
      position: relative;
    }
    .stage-questions li:before {
      content: '•';
      color: #00ffff;
      position: absolute;
      left: -15px;
    }
    .top-events {
      font-size: 11px;
      color: #777;
      margin-top: 8px;
    }
    .top-events span {
      color: #00ffff;
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
      <h1>📈 Weekly Funnel Report</h1>
      <p>${recruiterMetrics.period.start.toLocaleDateString()} - ${recruiterMetrics.period.end.toLocaleDateString()}</p>
    </div>
    
    <div class="content">
      ${generateFunnelHTML(recruiterMetrics)}
      ${generateFunnelHTML(hiringManagerMetrics)}
    </div>
    
    <div class="footer">
      <p><strong>RecXchange Analytics</strong> • Automated Weekly Report</p>
      <p>Generated on ${new Date().toLocaleString()}</p>
    </div>
  </div>
</body>
</html>
  `;
}

function generateFunnelHTML(metrics: FunnelMetrics): string {
  const stagesHTML = metrics.stages.map((stage, index) => `
    <div class="stage">
      <div class="stage-number">${index + 1}</div>
      <div class="stage-header">
        <div class="stage-title">${stage.description}</div>
        <div class="stage-count">${stage.count}</div>
      </div>
      <div class="stage-bar">
        <div class="stage-bar-fill" style="width: ${stage.percentage}%"></div>
      </div>
      <div class="stage-meta">
        <span>${stage.percentage}% of total users</span>
        ${stage.dropOffPercentage > 0 ? `<span class="drop-off">↓ ${stage.dropOffPercentage}% drop-off (${stage.dropOff} users)</span>` : '<span style="color: #22c55e;">✓ All users progressed</span>'}
      </div>
      ${stage.topEvents.length > 0 ? `
        <div class="top-events">
          Top events: <span>${stage.topEvents.map(e => `${e.event} (${e.count})`).join(', ')}</span>
        </div>
      ` : ''}
      <div class="stage-questions">
        <div class="stage-questions-title">Key Questions:</div>
        <ul>
          ${stage.keyQuestions.map(q => `<li>${q}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');

  return `
    <div class="funnel">
      <div class="funnel-header">
        <h2>${metrics.funnel}</h2>
        <p class="funnel-description">${metrics.description}</p>
      </div>
      
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
      
      <div class="insights">
        <h3>🔍 Key Insights</h3>
        <div class="insight-item">
          <strong>Biggest Drop-off:</strong> ${metrics.insights.biggestDropOff.stage} (${metrics.insights.biggestDropOff.percentage}% loss)
        </div>
        <div class="insight-item">
          <strong>Top Conversion Triggers:</strong> ${metrics.insights.topConversionTriggers.join(', ')}
        </div>
      </div>
      
      ${stagesHTML}
    </div>
  `;
}
