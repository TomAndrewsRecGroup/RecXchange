/**
 * How It Works - Hiring Manager Email Template
 * Explains RecXchange platform benefits for hiring managers/clients
 * Focus: No upfront costs, dedicated account manager, easy process, fast results, lower cost
 */

export const generateHowItWorksHiringManagerEmail = (firstName: string): string => {
  const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
  
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>How RecXchange Works - For Hiring Managers</title>
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
    }
  </style>
  <!--<![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; background: #0a0a0a; color: #e5e5e5;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 800px;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 40px 24px; text-align: center; border-bottom: 1px solid #222;" class="mobile-padding">
              <img src="${LOGO_URL}" alt="RecXchange" width="180" style="margin-bottom: 20px;" />
              <h1 style="margin: 0; color: #fff; font-size: 28px; font-weight: 800; line-height: 1.2;" class="mobile-text">How RecXchange Works</h1>
              <p style="margin: 12px 0 0 0; color: rgb(59, 130, 246); font-size: 16px; font-weight: 600;">For Hiring Managers${firstName ? `, ${firstName}` : ''}</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 24px;" class="mobile-padding">
              
              <!-- Hero Section -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 32px 28px; text-align: center;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 24px; font-weight: 800; margin: 0 0 20px 0; line-height: 1.3;">Access 15,000+ Specialist Recruiters.<br/>Pay Only When You Hire.</h2>
                    <p style="color: #e5e5e5; font-size: 17px; line-height: 1.8; margin: 0 0 20px 0; font-weight: 600;">No upfront costs. No retainers. No risk.</p>
                    <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">RecXchange gives you instant access to our global network of pre-vetted recruitment specialists who compete to find you the perfect candidate—faster and at a lower cost than traditional agencies.</p>
                  </td>
                </tr>
              </table>

              <!-- Key Benefits Grid -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 32px;">
                <tr>
                  <td width="50%" style="padding: 0 8px 0 0; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 14px; padding: 24px; margin-bottom: 16px;">
                      <tr>
                        <td>
                          <p style="color: rgb(34, 197, 94); font-size: 32px; margin: 0 0 12px 0;">💰</p>
                          <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">No Upfront Costs</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Zero retainers. Zero exclusivity fees. Zero risk. Pay only when you successfully hire a candidate who passes probation.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 0 0 0 8px; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid rgba(59, 130, 246, 0.4); border-radius: 14px; padding: 24px; margin-bottom: 16px;">
                      <tr>
                        <td>
                          <p style="color: rgb(59, 130, 246); font-size: 32px; margin: 0 0 12px 0;">🤝</p>
                          <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Dedicated Account Manager</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">You get one point of contact. We manage the 15,000+ recruiters for you. No need to deal with hundreds of agencies.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding: 0 8px 0 0; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 14px; padding: 24px;">
                      <tr>
                        <td>
                          <p style="color: rgb(168, 85, 247); font-size: 32px; margin: 0 0 12px 0;">⚡</p>
                          <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Fast Results</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Multiple specialists working simultaneously on your role. Average time to first candidate: 48 hours. Average time to hire: 18 days.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="50%" style="padding: 0 0 0 8px; vertical-align: top;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid rgba(34, 197, 94, 0.4); border-radius: 14px; padding: 24px;">
                      <tr>
                        <td>
                          <p style="color: rgb(34, 197, 94); font-size: 32px; margin: 0 0 12px 0;">💸</p>
                          <h3 style="color: #fff; font-size: 18px; font-weight: 700; margin: 0 0 12px 0;">Lower Cost</h3>
                          <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Typical fee: 12-15% (vs 20-25% agency rates). Recruiters compete for your business, driving better value for you.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- How It Works (3 Steps) -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-align: center;">How RecXchange Works for You</h2>
                    
                    <!-- Step 1 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="40" height="40" style="background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); border-radius: 50%;">
                            <tr>
                              <td style="text-align: center; vertical-align: middle; color: #fff; font-weight: 900; font-size: 18px; padding: 0;">1</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">📋 Post Your Role (Takes 5 Minutes)</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Create an account and post your job via our simple platform. Include role details, salary range, required skills, and any specific requirements. Your dedicated account manager reviews and optimizes your posting.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 2 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="40" height="40" style="background: linear-gradient(135deg, rgb(59, 130, 246) 0%, rgb(168, 85, 247) 100%); border-radius: 50%;">
                            <tr>
                              <td style="text-align: center; vertical-align: middle; color: #fff; font-weight: 900; font-size: 18px; padding: 0;">2</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">🔍 Specialists Source Candidates for You</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Your role is instantly matched to relevant specialists across our 15,000+ recruiter network. They compete to find the best candidates. You receive only pre-screened, qualified submissions through your dashboard. No spam. No unqualified CVs.</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Step 3 -->
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td width="50" style="padding: 0 16px 0 0; vertical-align: top;">
                          <table cellpadding="0" cellspacing="0" border="0" width="40" height="40" style="background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); border-radius: 50%;">
                            <tr>
                              <td style="text-align: center; vertical-align: middle; color: #fff; font-weight: 900; font-size: 18px; padding: 0;">3</td>
                            </tr>
                          </table>
                        </td>
                        <td style="vertical-align: top;">
                          <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">✅ Interview, Hire, Pay Only On Success</h3>
                          <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Review candidates through your dashboard. Interview the ones you like. Make your hire. Pay the agreed placement fee only when your candidate starts and passes probation. If they don't work out, we provide free replacement candidates.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Easy Platform Login -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 28px;">
                    <h3 style="color: rgb(59, 130, 246); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">🖥️ Simple, Transparent Platform</h3>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✓ <strong style="color: #fff;">Track Everything in Real-Time:</strong> See candidate submissions, interview status, and progress in your dashboard</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✓ <strong style="color: #fff;">Direct Communication:</strong> Message recruiters, request more info, or provide feedback instantly</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 12px 0;">✓ <strong style="color: #fff;">One Login, All Roles:</strong> Manage multiple job postings from a single, intuitive interface</p>
                    <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">✓ <strong style="color: #fff;">Mobile Access:</strong> Review candidates on the go via our mobile-responsive platform</p>
                  </td>
                </tr>
              </table>

              <!-- Comparison: RecXchange vs Traditional Agency -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 32px 28px;">
                    <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 20px 0; text-align: center;">RecXchange vs Traditional Agencies</h2>
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0, 0, 0, 0.4); border-radius: 12px;">
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px; width: 45%;"><strong style="color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Feature</strong></td>
                        <td style="padding: 16px; text-align: center; width: 27.5%;"><strong style="color: rgb(168, 85, 247); font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">RecXchange</strong></td>
                        <td style="padding: 16px; text-align: center; width: 27.5%;"><strong style="color: #666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em;">Traditional</strong></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Upfront Cost</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">£0</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #ff4444; font-size: 16px; font-weight: 700;">£2,000-£5,000+</span></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Placement Fee</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">12-15%</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #ff4444; font-size: 16px; font-weight: 700;">20-25%</span></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Number of Recruiters</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">15,000+</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #ff4444; font-size: 16px; font-weight: 700;">1 Agency</span></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Account Management</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">Dedicated</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #ff4444; font-size: 16px; font-weight: 700;">Shared</span></td>
                      </tr>
                      <tr style="border-bottom: 1px solid #222;">
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Average Time to Hire</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">18 days</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #ff4444; font-size: 16px; font-weight: 700;">42 days</span></td>
                      </tr>
                      <tr>
                        <td style="padding: 16px;"><span style="color: #e5e5e5; font-size: 14px;">Replacement Guarantee</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: rgb(34, 197, 94); font-size: 16px; font-weight: 700;">✓ Free</span></td>
                        <td style="padding: 16px; text-align: center;"><span style="color: #888; font-size: 16px; font-weight: 700;">Varies</span></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Final CTA -->
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px;">
                <tr>
                  <td style="padding: 40px 28px; text-align: center;">
                    <h3 style="color: #fff; font-size: 26px; font-weight: 800; margin: 0 0 16px 0; line-height: 1.3;">Ready to Hire Faster & Save Money?</h3>
                    <p style="color: #ccc; font-size: 16px; line-height: 1.7; margin: 0 0 28px 0;">Post your first role today. No upfront costs. No commitments. Pay only when you hire.</p>
                    
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="height:56px;v-text-anchor:middle;width:280px;" arcsize="18%" stroke="f" fillcolor="rgb(168, 85, 247)">
                      <w:anchorlock/>
                      <center style="color:#ffffff;font-family:sans-serif;font-size:15px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Post Your Role Now</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="https://app.recxchange.io/register?trigger_link=jYQNc9YXcMkYPvo3HZfC" style="display: inline-block; background: linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(59, 130, 246) 100%); background-color: rgb(168, 85, 247); color: #fff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 18px 48px; border-radius: 10px; text-transform: uppercase; letter-spacing: 0.1em;">Post Your Role Now</a>
                    <!--<![endif]-->
                    
                    <p style="color: #888; font-size: 13px; margin: 20px 0 0 0;">✅ No credit card required • ✅ Setup in 5 minutes • ✅ Your dedicated account manager will reach out within 24 hours</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align: center; padding: 32px 24px; color: #666; font-size: 12px; border-top: 1px solid #222;">
              <p style="margin: 0 0 8px 0;">Questions? <a href="https://recxchange.io/contact" style="color: rgb(59, 130, 246); text-decoration: none;">Contact our team</a> or <a href="https://calendly.com/recxchange/demo" style="color: rgb(59, 130, 246); text-decoration: none;">book a demo</a></p>
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
