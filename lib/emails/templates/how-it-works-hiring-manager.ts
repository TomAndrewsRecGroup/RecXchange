/**
 * How It Works - Hiring Manager Email Template
 * Explains RecXchange platform benefits for hiring managers/clients
 */

export const generateHowItWorksHiringManagerEmail = (firstName: string): string => {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>How RecXchange Works - For Hiring Managers</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px;">
          
          <tr>
            <td style="padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;">
              <img src="${LOGO_URL}" alt="RecXchange" width="180" style="margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;">RecXchange for Hiring Managers</h1>
              <p style="margin: 12px 0 0 0; color: #888; font-size: 15px;">Access 15,000+ specialist recruiters${firstName ? `, ${firstName}` : ''}</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 40px 24px;">
              
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 16px 0;">🎯 Why RecXchange for Hiring?</h2>
                    <p style="color: #e5e5e5; font-size: 16px; line-height: 1.8; margin: 0 0 16px 0;">Post your role once and get instant access to 15,000+ specialist recruiters who compete to find you the best candidates. Pay only when you hire.</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Our network includes recruiters specialized in every industry and geography, ensuring you get candidates from experts who understand your sector.</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 28px;">
                    <h3 style="color: rgb(59, 130, 246); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">Benefits for Hiring Managers</h3>
                    
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✅ <strong style="color: #fff;">Access 15,000+ Specialist Recruiters:</strong> One job post reaches thousands of recruitment professionals</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✅ <strong style="color: #fff;">Quality Pre-Vetted Candidates:</strong> Only interview candidates that pass recruiter screening</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✅ <strong style="color: #fff;">Competitive Pricing:</strong> Recruiters compete for your business, you get better rates</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✅ <strong style="color: #fff;">Faster Time to Hire:</strong> Multiple recruiters working simultaneously to fill your role</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">✅ <strong style="color: #fff;">Transparent Process:</strong> Track all submissions, interviews, and progress in real-time</p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px;">
                <tr>
                  <td style="padding: 40px 28px; text-align: center;">
                    <h3 style="color: #fff; font-size: 24px; font-weight: 800; margin: 0 0 16px 0;">Ready to Post Your Role?</h3>
                    <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0 0 28px 0;">Get started today and access our global network of recruitment specialists.</p>
                    
                    <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: inline-block; background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 18px 48px; border-radius: 10px; text-transform: uppercase;">Post Your Role Now</a>
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
