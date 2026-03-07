/**
 * Explain RecXchange Direct Email Template
 * Comprehensive guide explaining how RecXchange works, pricing, features, and success stories
 */

export const generateExplainRecXDirectEmail = (firstName: string): string => {
  const LOGO_URL = 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png';
  
  // TODO: Replace this with actual API call to fetch live total bounty from database
  const TOTAL_BOUNTY = '$750,000'; // This should be dynamically fetched from the Live Roles page
  
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>How RecXchange Works - Complete Guide</title>
      <!--[if mso]>
      <style>
        * { font-family: sans-serif !important; }
      </style>
      <![endif]-->
      <!--[if !mso]><!-->
      <style>
        @media only screen and (max-width: 600px) {
          .mobile-padding { padding: 20px 16px !important; }
          .mobile-text { font-size: 22px !important; }
          .mobile-subtitle { font-size: 14px !important; }
          .stat-box { width: 100% !important; display: block !important; margin-bottom: 12px !important; }
        }
      </style>
      <!--<![endif]-->
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a; min-height: 100%;">
        <tr>
          <td align="center" style="padding: 20px 10px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px; background: #0a0a0a;">
              
              <!-- Header -->
              <tr>
                <td style="background: #0a0a0a; padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;" class="mobile-padding">
                  <img src="${LOGO_URL}" alt="RecXchange Logo" width="180" style="max-width: 180px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />
                  <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800; line-height: 1.2;" class="mobile-text">How RecXchange Works</h1>
                  <p style="margin: 12px 0 0 0; color: #888; font-size: 15px; line-height: 1.5;">Everything you need to know${firstName ? `, ${firstName}` : ''}</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 24px;" class="mobile-padding">
                  
                  <!-- Intro -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px;">
                    <tr>
                      <td style="padding: 0;">
                        <p style="color: #e5e5e5; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0; text-align: center;">Thanks for requesting the RecXchange explainer${firstName ? `, ${firstName}` : ''}! This email covers everything: what we do, how it works, pricing options, real success stories, and answers to common questions.</p>
                        <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0; text-align: center;"><em>Reading time: 8 minutes. Bookmark this email for future reference.</em></p>
                      </td>
                    </tr>
                  </table>
  `;
};
