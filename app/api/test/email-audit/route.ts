import { NextRequest, NextResponse } from 'next/server';

interface AuditResult {
  component: string;
  status: 'configured' | 'missing' | 'warning';
  details: string;
  action?: string;
}

export async function GET(req: NextRequest) {
  const results: AuditResult[] = [];

  console.log('🔍 Starting Weekly Email System Audit...');

  // Check environment variables
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const sendgridFrom = process.env.SENDGRID_FROM_EMAIL;
  const funnelEmailTo = process.env.FUNNEL_EMAIL_TO;
  const ghlApiKey = process.env.GHL_API_KEY;
  const ghlLocationId = process.env.GHL_LOCATION_ID;

  results.push({
    component: 'SendGrid API Key',
    status: sendgridKey ? 'configured' : 'missing',
    details: sendgridKey ? `Set: ${sendgridKey.substring(0, 10)}...` : 'Not configured',
    action: sendgridKey ? undefined : 'Add SENDGRID_API_KEY to environment variables',
  });

  results.push({
    component: 'SendGrid From Email',
    status: sendgridFrom ? 'configured' : 'missing',
    details: sendgridFrom || 'Not configured',
    action: sendgridFrom ? undefined : 'Add SENDGRID_FROM_EMAIL (default: analytics@recxchange.com)',
  });

  results.push({
    component: 'Funnel Email Recipient',
    status: funnelEmailTo ? 'configured' : 'missing',
    details: funnelEmailTo || 'Not configured',
    action: funnelEmailTo ? undefined : 'Add FUNNEL_EMAIL_TO (your email address)',
  });

  results.push({
    component: 'GHL API Key',
    status: ghlApiKey ? 'configured' : 'missing',
    details: ghlApiKey ? `Set: ${ghlApiKey.substring(0, 10)}...` : 'Not configured',
    action: ghlApiKey ? undefined : 'Add GHL_API_KEY for tier signup tracking',
  });

  results.push({
    component: 'GHL Location ID',
    status: ghlLocationId ? 'configured' : 'missing',
    details: ghlLocationId || 'Not configured',
    action: ghlLocationId ? undefined : 'Add GHL_LOCATION_ID (default: VxHBI8kbavh407OMkAcu)',
  });

  // Test email endpoints
  const recruiterEmailEndpoint = '/api/analytics/email-recruiter-funnel';
  const hmEmailEndpoint = '/api/analytics/email-hiring-manager-funnel';
  const baseUrl = process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : req.nextUrl.origin;

  // Check if recruiter email endpoint is accessible
  try {
    const response = await fetch(`${baseUrl}${recruiterEmailEndpoint}`, {
      method: 'HEAD',
    });
    results.push({
      component: 'Recruiter Email Endpoint',
      status: 'configured',
      details: `${recruiterEmailEndpoint} (${response.status})`,
    });
  } catch (error) {
    results.push({
      component: 'Recruiter Email Endpoint',
      status: 'warning',
      details: 'Could not verify endpoint availability',
      action: 'Ensure the API route is deployed',
    });
  }

  // Check if hiring manager email endpoint is accessible
  try {
    const response = await fetch(`${baseUrl}${hmEmailEndpoint}`, {
      method: 'HEAD',
    });
    results.push({
      component: 'Hiring Manager Email Endpoint',
      status: 'configured',
      details: `${hmEmailEndpoint} (${response.status})`,
    });
  } catch (error) {
    results.push({
      component: 'Hiring Manager Email Endpoint',
      status: 'warning',
      details: 'Could not verify endpoint availability',
      action: 'Ensure the API route is deployed',
    });
  }

  // Check analytics tracking
  const analyticsEndpoint = '/api/analytics/track';
  try {
    const response = await fetch(`${baseUrl}${analyticsEndpoint}?action=test`, {
      method: 'GET',
    });
    results.push({
      component: 'Analytics Tracking',
      status: response.ok ? 'configured' : 'warning',
      details: response.ok ? 'Analytics endpoint is responding' : 'Analytics endpoint returned error',
    });
  } catch (error) {
    results.push({
      component: 'Analytics Tracking',
      status: 'warning',
      details: 'Could not verify analytics endpoint',
      action: 'Check /api/analytics/track is deployed',
    });
  }

  // Generate summary
  const configured = results.filter(r => r.status === 'configured').length;
  const missing = results.filter(r => r.status === 'missing').length;
  const warnings = results.filter(r => r.status === 'warning').length;

  const canSendRecruiterEmail = sendgridKey && sendgridFrom && funnelEmailTo;
  const canSendHMEmail = sendgridKey && sendgridFrom && funnelEmailTo;
  const hasGHLData = ghlApiKey && ghlLocationId;

  const cronJobs = [
    {
      name: 'Recruiter Weekly Email',
      schedule: '0 9 * * 1 (Every Monday at 9am UTC)',
      endpoint: recruiterEmailEndpoint,
      configured: canSendRecruiterEmail,
      notes: hasGHLData ? 'Will include GHL tier data' : 'Missing GHL config - no tier data',
    },
    {
      name: 'Hiring Manager Weekly Email',
      schedule: '0 9 * * 1 (Every Monday at 9am UTC)',
      endpoint: hmEmailEndpoint,
      configured: canSendHMEmail,
      notes: 'Ready to send',
    },
  ];

  const recommendations: string[] = [];

  if (missing > 0) {
    recommendations.push(`❌ ${missing} critical configuration(s) missing - emails cannot be sent`);
  }
  if (!hasGHLData && canSendRecruiterEmail) {
    recommendations.push('⚠️ GHL not configured - recruiter email will not show tier signup data');
  }
  if (canSendRecruiterEmail && canSendHMEmail) {
    recommendations.push('✅ All email endpoints are ready - set up cron jobs in Vercel');
  }
  if (warnings > 0) {
    recommendations.push(`⚠️ ${warnings} warning(s) found - review details below`);
  }

  // Test email feature
  const testEmailQuery = req.nextUrl.searchParams.get('sendTest');
  let testEmailResult = null;

  if (testEmailQuery === 'recruiter' || testEmailQuery === 'hm') {
    const endpoint = testEmailQuery === 'recruiter' ? recruiterEmailEndpoint : hmEmailEndpoint;
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
      });
      const data = await response.json();
      testEmailResult = {
        type: testEmailQuery === 'recruiter' ? 'Recruiter' : 'Hiring Manager',
        sent: response.ok,
        status: response.status,
        message: data.message || data.error,
      };
    } catch (error: any) {
      testEmailResult = {
        type: testEmailQuery === 'recruiter' ? 'Recruiter' : 'Hiring Manager',
        sent: false,
        error: error.message,
      };
    }
  }

  return NextResponse.json({
    timestamp: new Date().toISOString(),
    summary: {
      total: results.length,
      configured,
      missing,
      warnings,
      readyToSend: canSendRecruiterEmail && canSendHMEmail,
    },
    results,
    cronJobs,
    recommendations,
    testEmailResult,
    testInstructions: {
      recruiterEmail: `${baseUrl}/api/test/email-audit?sendTest=recruiter`,
      hiringManagerEmail: `${baseUrl}/api/test/email-audit?sendTest=hm`,
    },
  });
}
