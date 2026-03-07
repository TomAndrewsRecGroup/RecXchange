/**
 * Match Candidate Email Template
 * Sends 3 matching live roles based on user's industry preferences
 */

interface Role {
  title: string;
  company: string;
  location: string;
  workMode: string;
  salary: string;
  type: string;
  keySkills: string[];
  description: string;
}

const generateRoleCard = (role: Role, index: number): string => {
  // Alternate colors: Card 1 (index 0) = Purple, Card 2 (index 1) = Blue, Card 3 (index 2) = Purple
  const isPurple = index % 2 === 0;
  const primaryColor = isPurple ? 'rgb(168, 85, 247)' : 'rgb(59, 130, 246)';
  const gradientStart = isPurple ? 'rgb(168, 85, 247)' : 'rgb(59, 130, 246)';
  const gradientEnd = isPurple ? 'rgb(59, 130, 246)' : 'rgb(168, 85, 247)';
  const bgOpacity = isPurple ? '0.08' : '0.08';
  const borderOpacity = isPurple ? '0.3' : '0.3';
  
  return `
  <div style="background: #111; border: 1px solid #222; border-radius: 16px; padding: 20px; margin-bottom: 20px;">
    <!-- Role Header -->
    <div style="margin-bottom: 16px;">
      <h3 style="color: #fff; font-size: 20px; font-weight: 700; margin: 0 0 8px 0; line-height: 1.3;">${role.title}</h3>
      <p style="color: #888; font-size: 15px; margin: 0;">${role.company}</p>
    </div>
    
    <!-- Role Details Grid - Responsive -->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #222;">
      <tr>
        <td width="33%" style="padding: 0 8px 0 0;">
          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">📍 Location</p>
          <p style="color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;">${role.location}</p>
        </td>
        <td width="33%" style="padding: 0 8px;">
          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">💼 Work Mode</p>
          <p style="color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;">${role.workMode}</p>
        </td>
        <td width="33%" style="padding: 0 0 0 8px;">
          <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 6px 0;">📋 Type</p>
          <p style="color: #e5e5e5; font-size: 13px; font-weight: 600; margin: 0;">${role.type}</p>
        </td>
      </tr>
    </table>
    
    <!-- Salary -->
    <div style="background: rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, ${bgOpacity}); border: 1px solid rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, ${borderOpacity}); border-radius: 12px; padding: 14px; margin-bottom: 16px;">
      <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 8px 0;">💰 Salary Range</p>
      <p style="color: ${primaryColor}; font-size: 20px; font-weight: 700; margin: 0; line-height: 1.2;">${role.salary}</p>
    </div>
    
    <!-- Description -->
    <div style="margin-bottom: 16px;">
      <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0;">${role.description}</p>
    </div>
    
    <!-- Key Skills - Responsive wrap -->
    <div style="margin-bottom: 16px;">
      <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 10px 0;">🎯 Key Skills Required</p>
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td>
            ${role.keySkills.map(skill => `<span style="display: inline-block; background: rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, 0.1); border: 1px solid rgba(${isPurple ? '168, 85, 247' : '59, 130, 246'}, 0.3); border-radius: 6px; padding: 6px 10px; color: ${primaryColor}; font-size: 12px; font-weight: 600; margin: 0 6px 6px 0;">${skill}</span>`).join('')}
          </td>
        </tr>
      </table>
    </div>
    
    <!-- CTA Button - VML for Outlook gradient fallback -->
    <!--[if mso]>
    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="height:44px;v-text-anchor:middle;width:100%;" arcsize="23%" stroke="f" fillcolor="${primaryColor}">
      <w:anchorlock/>
      <center style="color:#ffffff;font-family:sans-serif;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Work This Role</center>
    </v:roundrect>
    <![endif]-->
    <!--[if !mso]><!-->
    <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: block; text-align: center; background: linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 100%); background-color: ${primaryColor}; color: #fff; text-decoration: none; font-weight: 700; font-size: 13px; padding: 14px 28px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em; line-height: 1.4;">Work This Role</a>
    <!--<![endif]-->
  </div>
`;
};

export const generateMatchCandidateEmail = (
  firstName: string,
  selectedRoles: Role[],
  industryText: string
): string => {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  
  return `
    <!DOCTYPE html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <title>Your 3 Matching Live Roles</title>
      <!--[if mso]>
      <style>
        * { font-family: sans-serif !important; }
      </style>
      <![endif]-->
      <!--[if !mso]><!-->
      <style>
        @media only screen and (max-width: 600px) {
          .mobile-padding { padding: 20px 16px !important; }
          .mobile-text { font-size: 24px !important; }
          .mobile-subtitle { font-size: 14px !important; }
        }
      </style>
      <!--<![endif]-->
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a; min-height: 100%;">
        <tr>
          <td align="center" style="padding: 20px 10px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px; background: #0a0a0a;">
              
              <!-- Header with Logo -->
              <tr>
                <td style="background: #0a0a0a; padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;" class="mobile-padding">
                  <img src="${LOGO_URL}" alt="RecXchange Logo" width="180" style="max-width: 180px; height: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />
                  <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800;" class="mobile-text">Your 3 Matching Live Roles</h1>
                  <div style="margin: 16px 0 0 0; color: rgb(59, 130, 246); font-size: 16px; font-weight: 600;" class="mobile-subtitle">${industryText}</div>
                  <p style="margin: 8px 0 0 0; color: #888; font-size: 14px;">Curated for ${firstName || 'you'}</p>
                </td>
              </tr>

              <!-- Content -->
              <tr>
                <td style="padding: 40px 24px;" class="mobile-padding">
                  
                  <!-- Intro Message -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 32px;">
                    <tr>
                      <td style="padding: 28px;">
                        <h2 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Thanks for your interest${firstName ? `, ${firstName}` : ''}! 🎯</h2>
                        <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 12px 0;">We've curated 3 live roles from our network that match your industry focus. These are real opportunities from verified hiring managers.</p>
                        <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0;">All roles below are part of our <strong style="color: rgb(59, 130, 246);">RecXchange</strong> network where recruiters collaborate and split fees 50/50.</p>
                      </td>
                    </tr>
                  </table>

                  <!-- Role Cards -->
                  ${selectedRoles.map((role, index) => generateRoleCard(role, index)).join('')}

                  <!-- Final CTA Section -->
                  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); background-color: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-top: 32px;">
                    <tr>
                      <td style="padding: 32px 24px; text-align: center;">
                        <h3 style="color: #fff; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">Ready to Access All Live Roles?</h3>
                        <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">Join RecXchange and unlock 100+ live roles with AI-powered matching. Collaborate with pre-vetted recruiters and split fees on every placement.</p>
                        
                        <!-- VML for Outlook gradient fallback -->
                        <!--[if mso]>
                        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="height:50px;v-text-anchor:middle;width:220px;" arcsize="20%" stroke="f" fillcolor="rgb(59, 130, 246)">
                          <w:anchorlock/>
                          <center style="color:#ffffff;font-family:sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Get Started Now</center>
                        </v:roundrect>
                        <![endif]-->
                        <!--[if !mso]><!-->
                        <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: inline-block; background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); background-color: rgb(59, 130, 246); color: #fff; text-decoration: none; font-weight: 700; font-size: 14px; padding: 16px 40px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Get Started Now</a>
                        <!--<![endif]-->
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="text-align: center; padding: 32px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
                  <p style="margin: 0 0 8px 0;">Questions? Reply to this email or <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">contact our team</a></p>
                  <p style="margin: 0;"><strong style="color: #fff;">The RecXchange Team</strong></p>
                  <p style="margin: 8px 0 0 0; font-size: 11px;">Generated on ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
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
