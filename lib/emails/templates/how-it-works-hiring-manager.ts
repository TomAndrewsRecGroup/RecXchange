/**
 * How It Works - Hiring Manager Email Template (Premium Edition)
 * 
 * Purpose: Convert hiring managers to book a meeting through premium design and sales psychology
 * Focus: Risk reversal, social proof, scarcity, urgency, clear value proposition
 * Trigger: User clicks "How Does It Work?" button on hiring-manager-home page
 */

export function generateHowItWorksHiringManagerEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>How Top Companies Are Hiring 40% Faster</title>
  <!--[if mso]>
  <style type="text/css">
    body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
  </style>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <!-- Main Container -->
        <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Logo Section -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 24px 24px 24px; text-align: center;">
              <img src="https://recxchange.io/logo-full.png" alt="RecXchange" style="max-width: 200px; height: auto; display: block; margin: 0 auto;" width="200" />
            </td>
          </tr>

          <!-- Premium Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 40px 24px; text-align: center; position: relative;">
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="text-align: right; padding-bottom: 16px;">
                    <span style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 6px 14px; border-radius: 20px; font-size: 11px; color: #ffffff; font-weight: 600; letter-spacing: 0.5px;">PREMIUM ACCESS</span>
                  </td>
                </tr>
              </table>
              <h1 style="margin: 0 0 16px 0; color: #ffffff; font-size: 28px; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;">How Top Companies Are Hiring 40% Faster (At Half the Cost)</h1>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.5; font-weight: 400;">The executive guide to RecX Direct</p>
            </td>
          </tr>

          <!-- Personalized Greeting -->
          <tr>
            <td style="padding: 32px 24px 24px 24px;">
              <p style="margin: 0; color: #1e293b; font-size: 17px; line-height: 1.6; font-weight: 600;">Hi ${firstName},</p>
              <p style="margin: 18px 0 0 0; color: #475569; font-size: 15px; line-height: 1.7;">You're evaluating whether RecX Direct is the right hiring solution for your organization. Smart move—this decision will impact your team's performance for years to come.</p>
              <p style="margin: 14px 0 0 0; color: #475569; font-size: 15px; line-height: 1.7;">Here's everything you need to make an informed decision in the next <strong style="color: #667eea;">10 minutes</strong>.</p>
            </td>
          </tr>

          <!-- Social Proof Banner -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #10b981; border-radius: 12px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 8px 0; color: #065f46; font-size: 14px; line-height: 1.6; font-weight: 600;">🏆 <strong>247 companies</strong> have hired through RecX Direct in the last 90 days</p>
                    <p style="margin: 0; color: #047857; font-size: 13px; line-height: 1.5;">Average time-to-hire: <strong>18 days</strong> | Average cost saving: <strong>$8,200 per hire</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- The Problem (Agitate Pain) -->
          <tr>
            <td style="padding: 0 24px 24px 24px;">
              <h2 style="margin: 0 0 18px 0; color: #1e293b; font-size: 22px; font-weight: 700; line-height: 1.3;">Traditional Recruitment Is Costing You More Than You Think</h2>
              
              <table role="presentation" style="width: 100%; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 12px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <div style="margin-bottom: 10px;">
                      <div style="color: #991b1b; font-size: 15px; font-weight: 700; margin-bottom: 2px;">❌ 25-30% fees</div>
                      <div style="color: #7f1d1d; font-size: 13px;">($25,000 on a $100k hire)</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                      <div style="color: #991b1b; font-size: 15px; font-weight: 700; margin-bottom: 2px;">❌ 45-60 day hiring cycles</div>
                      <div style="color: #7f1d1d; font-size: 13px;">(Lost productivity: $15,000+)</div>
                    </div>
                    <div style="margin-bottom: 10px;">
                      <div style="color: #991b1b; font-size: 15px; font-weight: 700; margin-bottom: 2px;">❌ Spam from 50+ agencies</div>
                      <div style="color: #7f1d1d; font-size: 13px;">(Hours wasted screening)</div>
                    </div>
                    <div>
                      <div style="color: #991b1b; font-size: 15px; font-weight: 700; margin-bottom: 2px;">❌ Exclusive retainers</div>
                      <div style="color: #7f1d1d; font-size: 13px;">(Pay upfront, limited pool)</div>
                    </div>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 16px 0 0 0; color: #475569; font-size: 14px; line-height: 1.7; font-style: italic; padding: 0 4px;">For a company making 10 hires/year at $100k average salary, you're spending <strong style="color: #ef4444;">$250,000 in recruitment fees alone</strong>—not including lost productivity from slow fills.</p>
            </td>
          </tr>

          <!-- The Solution (Premium Value Prop) -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px;">
                <tr>
                  <td style="padding: 32px 24px;">
                    <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 24px; font-weight: 800; line-height: 1.3;">RecX Direct: The Smart Alternative</h2>
                    
                    <!-- Benefit 1 -->
                    <table role="presentation" style="width: 100%; background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <div style="margin-bottom: 12px;">
                            <span style="font-size: 22px; margin-right: 10px;">💰</span>
                            <span style="color: #ffffff; font-size: 17px; font-weight: 700;">12-18% fees (vs 25-30%)</span>
                          </div>
                          <p style="margin: 0; padding-left: 32px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6;">Save <strong>$7,000-$12,000 per hire</strong>. Set your own fee. Pay only on successful placement.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Benefit 2 -->
                    <table role="presentation" style="width: 100%; background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <div style="margin-bottom: 12px;">
                            <span style="font-size: 22px; margin-right: 10px;">⚡</span>
                            <span style="color: #ffffff; font-size: 17px; font-weight: 700;">First candidates in 48 hours</span>
                          </div>
                          <p style="margin: 0; padding-left: 32px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6;"><strong>15,000+ recruiters</strong> compete for your role. Average time-to-hire: <strong>18 days</strong> (vs 45-60).</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Benefit 3 -->
                    <table role="presentation" style="width: 100%; background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 20px;">
                          <div style="margin-bottom: 12px;">
                            <span style="font-size: 22px; margin-right: 10px;">🎯</span>
                            <span style="color: #ffffff; font-size: 17px; font-weight: 700;">One dedicated account manager</span>
                          </div>
                          <p style="margin: 0; padding-left: 32px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6;">No agency spam. No juggling emails. One point of contact manages <strong>everything</strong>.</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Benefit 4 -->
                    <table role="presentation" style="width: 100%; background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px;">
                      <tr>
                        <td style="padding: 20px;">
                          <div style="margin-bottom: 12px;">
                            <span style="font-size: 22px; margin-right: 10px;">✅</span>
                            <span style="color: #ffffff; font-size: 17px; font-weight: 700;">Zero upfront costs</span>
                          </div>
                          <p style="margin: 0; padding-left: 32px; color: rgba(255, 255, 255, 0.9); font-size: 14px; line-height: 1.6;">No retainers. No subscriptions. No exclusivity. Post unlimited roles free. Cancel anytime.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ROI Calculation (Concrete Value) -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; border: 2px solid #10b981;">
                <tr>
                  <td style="padding: 28px 24px;">
                    <h3 style="margin: 0 0 20px 0; color: #065f46; font-size: 20px; font-weight: 700; text-align: center;">Your ROI in Real Numbers</h3>
                    
                    <!-- Traditional Agency -->
                    <table role="presentation" style="width: 100%; background-color: rgba(255, 255, 255, 0.8); border-radius: 8px; margin-bottom: 12px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="color: #047857; font-size: 13px; font-weight: 600; margin-bottom: 8px;">TRADITIONAL AGENCY</div>
                          <div style="color: #065f46; font-size: 15px; margin-bottom: 4px;">25% fee × $100k salary = <strong style="font-size: 18px;">$25,000</strong></div>
                          <div style="color: #047857; font-size: 13px;">+ 45 days time-to-hire</div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- RecX Direct -->
                    <table role="presentation" style="width: 100%; background-color: rgba(16, 185, 129, 0.2); border-radius: 8px; border: 2px dashed #10b981; margin-bottom: 16px;">
                      <tr>
                        <td style="padding: 16px;">
                          <div style="color: #065f46; font-size: 13px; font-weight: 600; margin-bottom: 8px;">RECX DIRECT</div>
                          <div style="color: #065f46; font-size: 15px; margin-bottom: 4px;">15% fee × $100k salary = <strong style="font-size: 18px;">$15,000</strong></div>
                          <div style="color: #047857; font-size: 13px;">+ 18 days time-to-hire</div>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Savings -->
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="text-align: center;">
                          <table role="presentation" style="margin: 0 auto; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">
                            <tr>
                              <td style="padding: 14px 28px;">
                                <div style="color: rgba(255, 255, 255, 0.9); font-size: 13px; font-weight: 600; margin-bottom: 4px;">YOU SAVE PER HIRE</div>
                                <div style="color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -1px;">$10,000</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 16px 0 0 0; text-align: center; color: #065f46; font-size: 15px; font-weight: 600;">10 hires/year = <span style="color: #10b981; font-size: 18px; font-weight: 800;">$100,000 saved</span></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- How It Works (Simplified) -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <h2 style="margin: 0 0 24px 0; color: #1e293b; font-size: 22px; font-weight: 700; text-align: center;">How It Works (3 Simple Steps)</h2>
              
              <!-- Step 1 -->
              <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                <tr>
                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                    <table role="presentation" style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);">
                      <tr>
                        <td style="text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 800; font-size: 20px;">1</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 17px; font-weight: 700;">Book a 15-Minute Strategy Call</h3>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">We'll analyze your hiring needs, map your ideal candidate profile, and show you exactly how RecX Direct will save you time and money.</p>
                  </td>
                </tr>
              </table>
              
              <!-- Step 2 -->
              <table role="presentation" style="width: 100%; margin-bottom: 16px;">
                <tr>
                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                    <table role="presentation" style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);">
                      <tr>
                        <td style="text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 800; font-size: 20px;">2</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 17px; font-weight: 700;">Post Your First Role (Free)</h3>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">Takes 3 minutes. Your dedicated account manager will immediately start coordinating with our 15,000+ recruiter network.</p>
                  </td>
                </tr>
              </table>
              
              <!-- Step 3 -->
              <table role="presentation" style="width: 100%;">
                <tr>
                  <td style="width: 48px; vertical-align: top; padding-right: 16px;">
                    <table role="presentation" style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">
                      <tr>
                        <td style="text-align: center; vertical-align: middle;">
                          <span style="color: #ffffff; font-weight: 800; font-size: 20px;">3</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td style="vertical-align: top;">
                    <h3 style="margin: 0 0 6px 0; color: #1e293b; font-size: 17px; font-weight: 700;">Review Pre-Vetted Candidates (48hrs)</h3>
                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.6;">Get shortlisted candidates within 2 days. Interview the best. Hire your pick. Pay one fee when they start.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA (Meeting Booking) -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);">
                <tr>
                  <td style="padding: 32px 24px; text-align: center;">
                    <table role="presentation" style="margin: 0 auto 16px auto; background-color: rgba(255, 255, 255, 0.2); border-radius: 20px;">
                      <tr>
                        <td style="padding: 6px 14px;">
                          <span style="color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.5px;">⏰ LIMITED SPOTS AVAILABLE</span>
                        </td>
                      </tr>
                    </table>
                    <h2 style="margin: 0 0 14px 0; color: #ffffff; font-size: 24px; font-weight: 800; line-height: 1.3;">Book Your Free 15-Minute Strategy Call Today</h2>
                    <p style="margin: 0 0 24px 0; color: rgba(255, 255, 255, 0.95); font-size: 16px; line-height: 1.6;">See exactly how much time and money you'll save on your next 3 hires</p>
                    <table role="presentation" style="margin: 0 auto;">
                      <tr>
                        <td>
                          <a href="https://recxchange.io/book-meeting" style="display: inline-block; background-color: #ffffff; color: #667eea; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 800; font-size: 17px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); min-width: 200px; text-align: center;">📅 Book Your Strategy Call →</a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin: 20px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 13px;">⚡ Only <strong>8 spots</strong> left this week | 🎯 No sales pitch, just insights</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Risk Reversal -->
          <tr>
            <td style="padding: 0 24px 28px 24px;">
              <table role="presentation" style="width: 100%; background-color: #fef3c7; border-radius: 12px; border: 2px solid #f59e0b;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 10px 0; color: #92400e; font-size: 15px; font-weight: 700; line-height: 1.6;">🛡️ <strong>100% Risk-Free Guarantee</strong></p>
                    <p style="margin: 0; color: #b45309; font-size: 14px; line-height: 1.6;">Post your first role completely free. If you don't receive qualified candidates within 48 hours, we'll <strong>personally</strong> source 3 candidates for you at no cost.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <h3 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 700; text-align: center;">What Leaders Like You Are Saying</h3>
              
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #667eea; margin-bottom: 14px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 10px 0; color: #475569; font-size: 14px; line-height: 1.7; font-style: italic;">"We filled 3 senior engineering roles in 21 days and saved $32,000 in recruitment fees. The quality was better than our previous agency."</p>
                    <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 700;">— Sarah Chen, VP Engineering at TechCorp</p>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #667eea; margin-bottom: 14px;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 10px 0; color: #475569; font-size: 14px; line-height: 1.7; font-style: italic;">"Finally, a platform that actually works. No more spam from 50 agencies. Just one account manager and top-tier candidates."</p>
                    <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 700;">— Michael Rodriguez, Head of Talent at GrowthLabs</p>
                  </td>
                </tr>
              </table>
              
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #667eea;">
                <tr>
                  <td style="padding: 18px 20px;">
                    <p style="margin: 0 0 10px 0; color: #475569; font-size: 14px; line-height: 1.7; font-style: italic;">"We've made 12 hires through RecX Direct this year. Average fee: 14%. Our CFO is thrilled with the cost savings."</p>
                    <p style="margin: 0; color: #667eea; font-size: 13px; font-weight: 700;">— Amanda Park, Director of HR at FinanceFlow</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Secondary CTA -->
          <tr>
            <td style="padding: 0 24px 28px 24px;">
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px;">
                <tr>
                  <td style="padding: 28px 24px; text-align: center;">
                    <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px; font-weight: 700;">Not Ready for a Call Yet?</h3>
                    <p style="margin: 0 0 18px 0; color: #64748b; font-size: 14px; line-height: 1.6;">Post your first role for free and see how it works</p>
                    <table role="presentation" style="margin: 0 auto;">
                      <tr>
                        <td>
                          <a href="https://recxchange.io/hiring-manager-live" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 700; font-size: 15px;">Post a Role (100% Free) →</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency + Scarcity -->
          <tr>
            <td style="padding: 0 24px 28px 24px;">
              <table role="presentation" style="width: 100%; background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; border: 2px dashed #ef4444;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 8px 0; color: #991b1b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⏰ Time-Sensitive Opportunity</p>
                    <p style="margin: 0; color: #7f1d1d; font-size: 14px; line-height: 1.7; font-weight: 600;">We're currently onboarding <strong>8 new clients this month</strong>. After that, we'll have a waitlist to maintain service quality. <strong>Book your call now to skip the queue.</strong></p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Questions / Contact -->
          <tr>
            <td style="padding: 0 24px 32px 24px;">
              <table role="presentation" style="width: 100%; background-color: #f8fafc; border-radius: 12px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="margin: 0 0 14px 0; color: #1e293b; font-size: 17px; font-weight: 700;">Have Questions?</h3>
                    <p style="margin: 0 0 14px 0; color: #475569; font-size: 14px; line-height: 1.6;">I'm here to help. Simply reply to this email or:</p>
                    <div style="margin-bottom: 10px;">
                      <a href="https://recxchange.io/book-meeting" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 600; display: block; padding: 4px 0;">📅 Book a 15-minute strategy call</a>
                    </div>
                    <div style="margin-bottom: 10px;">
                      <a href="mailto:tom@recxchange.io" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 600; display: block; padding: 4px 0;">📧 Email me directly: tom@recxchange.io</a>
                    </div>
                    <div>
                      <a href="https://recxchange.io/hiring-manager-home" style="color: #667eea; text-decoration: none; font-size: 14px; font-weight: 600; display: block; padding: 4px 0;">🌐 Learn more on our website</a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 28px 24px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); text-align: center;">
              <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 17px; font-weight: 700;">Ready to Transform Your Hiring?</p>
              <p style="margin: 0 0 20px 0; color: #cbd5e1; font-size: 14px; line-height: 1.6;">Join 247 companies hiring smarter with RecX Direct</p>
              <table role="presentation" style="margin: 0 auto 24px auto;">
                <tr>
                  <td>
                    <a href="https://recxchange.io/book-meeting" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 15px 32px; border-radius: 10px; font-weight: 700; font-size: 16px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">📅 Book My Strategy Call</a>
                  </td>
                </tr>
              </table>
              <div style="padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 12px;">RecXchange | Connecting 15,000+ recruiters with forward-thinking companies</p>
                <div>
                  <a href="https://recxchange.io" style="color: #94a3b8; text-decoration: none; font-size: 12px; padding: 0 8px;">Website</a>
                  <span style="color: #475569;">|</span>
                  <a href="https://recxchange.io/pricing" style="color: #94a3b8; text-decoration: none; font-size: 12px; padding: 0 8px;">Pricing</a>
                  <span style="color: #475569;">|</span>
                  <a href="https://recxchange.io/hiring-manager-home" style="color: #94a3b8; text-decoration: none; font-size: 12px; padding: 0 8px;">For Clients</a>
                </div>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
