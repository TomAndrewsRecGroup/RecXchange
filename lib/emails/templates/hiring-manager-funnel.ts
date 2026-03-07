/**
 * Hiring Manager Funnel Email Template
 * Onboarding/nurture email sequence for hiring managers/clients
 */

export const generateHiringManagerFunnelEmail = (firstName: string, step: number = 1): string => {
  const LOGO_URL = 'https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/REX-Main-Logo-25.png';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to RecXchange - Hiring Manager Onboarding</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px;">
          
          <tr>
            <td style="padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;">
              <img src="${LOGO_URL}" alt="RecXchange" width="180" style="margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;">Welcome to RecXchange${firstName ? `, ${firstName}` : ''}!</h1>
              <p style="margin: 12px 0 0 0; color: #888; font-size: 15px;">15,000+ recruiters ready to find your perfect candidate</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 24px;">
              
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 16px 0;">🎯 How It Works</h2>
                    <p style="color: #e5e5e5; font-size: 16px; line-height: 1.8; margin: 0 0 24px 0;">Hiring with RecXchange is simple and puts you in control:</p>
                    
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;"><strong style="color: rgb(59, 130, 246);">Step 1:</strong> Post your job role (takes 3 minutes)</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;"><strong style="color: rgb(59, 130, 246);">Step 2:</strong> Receive vetted candidate submissions from specialist recruiters</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;"><strong style="color: rgb(59, 130, 246);">Step 3:</strong> Interview candidates and make your hire</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;"><strong style="color: rgb(59, 130, 246);">Step 4:</strong> Pay only when the candidate successfully starts and passes probation</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h3 style="color: rgb(59, 130, 246); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">✅ Why Companies Choose RecXchange</h3>
                    
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 10px 0;">• Access to 15,000+ specialist recruiters competing for your business</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 10px 0;">• Average time to hire: 18 days (vs industry average of 42 days)</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 10px 0;">• Competitive pricing with transparent fee structure</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">• Quality guarantee: replacement candidates if hire doesn't work out</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px;">
                <tr>
                  <td style="padding: 40px 28px; text-align: center;">
                    <h3 style="color: #fff; font-size: 24px; font-weight: 800; margin: 0 0 16px 0;">Ready to Hire?</h3>
                    <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0 0 28px 0;">Post your first role and start receiving candidate submissions within 24 hours.</p>
                    
                    <a href="https://app.recxchange.io/post-role" style="display: inline-block; background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 18px 48px; border-radius: 10px; text-transform: uppercase;">Post Your Role</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="text-align: center; padding: 32px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 8px 0;">Questions? <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">Contact our team</a></p>
              <p style="margin: 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
