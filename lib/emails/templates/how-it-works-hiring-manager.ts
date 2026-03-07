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
  <title>How Top Companies Are Hiring 40% Faster</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 60px 20px;">
        <table role="presentation" style="max-width: 640px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Premium Header with Gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); padding: 50px 40px; text-align: center; position: relative;">
              <div style="position: absolute; top: 20px; right: 20px; background-color: rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); padding: 8px 16px; border-radius: 20px; font-size: 12px; color: #ffffff; font-weight: 600; letter-spacing: 0.5px;">PREMIUM ACCESS</div>
              <h1 style="margin: 0 0 16px 0; color: #ffffff; font-size: 32px; font-weight: 800; line-height: 1.2; letter-spacing: -0.5px;">How Top Companies Are Hiring<br>40% Faster (At Half the Cost)</h1>
              <p style="margin: 0; color: rgba(255, 255, 255, 0.95); font-size: 18px; line-height: 1.5; font-weight: 400;">The executive guide to RecX Direct</p>
            </td>
          </tr>

          <!-- Personalized Greeting -->
          <tr>
            <td style="padding: 40px 40px 30px 40px;">
              <p style="margin: 0; color: #1e293b; font-size: 18px; line-height: 1.6; font-weight: 600;">Hi ${firstName},</p>
              <p style="margin: 20px 0 0 0; color: #475569; font-size: 16px; line-height: 1.7;">You're evaluating whether RecX Direct is the right hiring solution for your organization. Smart move—this decision will impact your team's performance for years to come.</p>
              <p style="margin: 16px 0 0 0; color: #475569; font-size: 16px; line-height: 1.7;">Here's everything you need to make an informed decision in the next <strong style="color: #667eea;">10 minutes</strong>.</p>
            </td>
          </tr>

          <!-- Social Proof Banner -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border-left: 4px solid #10b981; padding: 20px 24px; border-radius: 12px;">
                <p style="margin: 0; color: #065f46; font-size: 15px; line-height: 1.6; font-weight: 600;">🏆 <strong>247 companies</strong> have hired through RecX Direct in the last 90 days</p>
                <p style="margin: 8px 0 0 0; color: #047857; font-size: 14px; line-height: 1.5;">Average time-to-hire: <strong>18 days</strong> | Average cost saving: <strong>$8,200 per hire</strong></p>
              </div>
            </td>
          </tr>

          <!-- The Problem (Agitate Pain) -->
          <tr>
            <td style="padding: 0 40px 30px 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 24px; font-weight: 700; line-height: 1.3;">Traditional Recruitment Is Costing You More Than You Think</h2>
              
              <div style="background-color: #fef2f2; border-left: 4px solid #ef4444; padding: 20px 24px; border-radius: 12px; margin-bottom: 20px;">
                <div style="margin-bottom: 12px;">
                  <span style="color: #991b1b; font-size: 16px; font-weight: 700;">❌ 25-30% fees</span>
                  <span style="color: #7f1d1d; font-size: 14px; margin-left: 8px;">($25,000 on a $100k hire)</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="color: #991b1b; font-size: 16px; font-weight: 700;">❌ 45-60 day hiring cycles</span>
                  <span style="color: #7f1d1d; font-size: 14px; margin-left: 8px;">(Lost productivity: $15,000+)</span>
                </div>
                <div style="margin-bottom: 12px;">
                  <span style="color: #991b1b; font-size: 16px; font-weight: 700;">❌ Spam from 50+ agencies</span>
                  <span style="color: #7f1d1d; font-size: 14px; margin-left: 8px;">(Hours wasted screening)</span>
                </div>
                <div>
                  <span style="color: #991b1b; font-size: 16px; font-weight: 700;">❌ Exclusive retainers</span>
                  <span style="color: #7f1d1d; font-size: 14px; margin-left: 8px;">(Pay upfront, limited pool)</span>
                </div>
              </div>
              
              <p style="margin: 0; color: #475569; font-size: 16px; line-height: 1.7; font-style: italic;">For a company making 10 hires/year at $100k average salary, you're spending <strong style="color: #ef4444;">$250,000 in recruitment fees alone</strong>—not including lost productivity from slow fills.</p>
            </td>
          </tr>

          <!-- The Solution (Premium Value Prop) -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 16px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: 0; right: 0; width: 200px; height: 200px; background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%); border-radius: 50%;"></div>
                <h2 style="margin: 0 0 20px 0; color: #ffffff; font-size: 26px; font-weight: 800; line-height: 1.3; position: relative; z-index: 1;">RecX Direct: The Smart Alternative</h2>
                
                <div style="background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; margin-bottom: 20px; position: relative; z-index: 1;">
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 24px; margin-right: 12px;">💰</span>
                    <span style="color: #ffffff; font-size: 18px; font-weight: 700;">12-18% fees (vs 25-30%)</span>
                  </div>
                  <p style="margin: 0 0 0 36px; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;">Save <strong>$7,000-$12,000 per hire</strong>. Set your own fee. Pay only on successful placement.</p>
                </div>
                
                <div style="background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; margin-bottom: 20px; position: relative; z-index: 1;">
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 24px; margin-right: 12px;">⚡</span>
                    <span style="color: #ffffff; font-size: 18px; font-weight: 700;">First candidates in 48 hours</span>
                  </div>
                  <p style="margin: 0 0 0 36px; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;"><strong>15,000+ recruiters</strong> compete for your role. Average time-to-hire: <strong>18 days</strong> (vs 45-60).</p>
                </div>
                
                <div style="background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; margin-bottom: 20px; position: relative; z-index: 1;">
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 24px; margin-right: 12px;">🎯</span>
                    <span style="color: #ffffff; font-size: 18px; font-weight: 700;">One dedicated account manager</span>
                  </div>
                  <p style="margin: 0 0 0 36px; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;">No agency spam. No juggling emails. One point of contact manages <strong>everything</strong>.</p>
                </div>
                
                <div style="background-color: rgba(255, 255, 255, 0.15); backdrop-filter: blur(10px); border-radius: 12px; padding: 24px; position: relative; z-index: 1;">
                  <div style="margin-bottom: 16px;">
                    <span style="font-size: 24px; margin-right: 12px;">✅</span>
                    <span style="color: #ffffff; font-size: 18px; font-weight: 700;">Zero upfront costs</span>
                  </div>
                  <p style="margin: 0 0 0 36px; color: rgba(255, 255, 255, 0.9); font-size: 15px; line-height: 1.6;">No retainers. No subscriptions. No exclusivity. Post unlimited roles free. Cancel anytime.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- ROI Calculation (Concrete Value) -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border-radius: 16px; padding: 32px; border: 2px solid #10b981;">
                <h3 style="margin: 0 0 24px 0; color: #065f46; font-size: 22px; font-weight: 700; text-align: center;">Your ROI in Real Numbers</h3>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 16px; background-color: rgba(255, 255, 255, 0.8); border-radius: 8px; margin-bottom: 12px;">
                      <div style="color: #047857; font-size: 14px; font-weight: 600; margin-bottom: 8px;">TRADITIONAL AGENCY</div>
                      <div style="color: #065f46; font-size: 16px; margin-bottom: 4px;">25% fee × $100k salary = <strong style="font-size: 20px;">$25,000</strong></div>
                      <div style="color: #047857; font-size: 14px;">+ 45 days time-to-hire</div>
                    </td>
                  </tr>
                  <tr><td style="height: 12px;"></td></tr>
                  <tr>
                    <td style="padding: 16px; background-color: rgba(16, 185, 129, 0.2); border-radius: 8px; border: 2px dashed #10b981;">
                      <div style="color: #065f46; font-size: 14px; font-weight: 600; margin-bottom: 8px;">RECX DIRECT</div>
                      <div style="color: #065f46; font-size: 16px; margin-bottom: 4px;">15% fee × $100k salary = <strong style="font-size: 20px;">$15,000</strong></div>
                      <div style="color: #047857; font-size: 14px;">+ 18 days time-to-hire</div>
                    </td>
                  </tr>
                  <tr><td style="height: 20px;"></td></tr>
                  <tr>
                    <td style="text-align: center;">
                      <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: inline-block; padding: 16px 32px; border-radius: 12px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">
                        <div style="color: rgba(255, 255, 255, 0.9); font-size: 14px; font-weight: 600; margin-bottom: 4px;">YOU SAVE PER HIRE</div>
                        <div style="color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: -1px;">$10,000</div>
                      </div>
                    </td>
                  </tr>
                  <tr><td style="height: 16px;"></td></tr>
                  <tr>
                    <td style="text-align: center;">
                      <p style="margin: 0; color: #065f46; font-size: 16px; font-weight: 600;">10 hires/year = <span style="color: #10b981; font-size: 20px; font-weight: 800;">$100,000 saved</span></p>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- How It Works (Simplified) -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h2 style="margin: 0 0 28px 0; color: #1e293b; font-size: 24px; font-weight: 700; text-align: center;">How It Works (3 Simple Steps)</h2>
              
              <div style="display: flex; margin-bottom: 20px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);">
                  <span style="color: #ffffff; font-weight: 800; font-size: 22px;">1</span>
                </div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px; font-weight: 700;">Book a 15-Minute Strategy Call</h3>
                  <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">We'll analyze your hiring needs, map your ideal candidate profile, and show you exactly how RecX Direct will save you time and money.</p>
                </div>
              </div>
              
              <div style="display: flex; margin-bottom: 20px;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);">
                  <span style="color: #ffffff; font-weight: 800; font-size: 22px;">2</span>
                </div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px; font-weight: 700;">Post Your First Role (Free)</h3>
                  <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">Takes 3 minutes. Your dedicated account manager will immediately start coordinating with our 15,000+ recruiter network.</p>
                </div>
              </div>
              
              <div style="display: flex;">
                <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 20px; flex-shrink: 0; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">
                  <span style="color: #ffffff; font-weight: 800; font-size: 22px;">3</span>
                </div>
                <div>
                  <h3 style="margin: 0 0 8px 0; color: #1e293b; font-size: 18px; font-weight: 700;">Review Pre-Vetted Candidates (48hrs)</h3>
                  <p style="margin: 0; color: #64748b; font-size: 15px; line-height: 1.6;">Get shortlisted candidates within 2 days. Interview the best. Hire your pick. Pay one fee when they start.</p>
                </div>
              </div>
            </td>
          </tr>

          <!-- Primary CTA (Meeting Booking) -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; padding: 40px; text-align: center; box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4);">
                <div style="display: inline-block; background-color: rgba(255, 255, 255, 0.2); padding: 6px 14px; border-radius: 20px; margin-bottom: 20px;">
                  <span style="color: #ffffff; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">⏰ LIMITED SPOTS AVAILABLE</span>
                </div>
                <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 28px; font-weight: 800; line-height: 1.3;">Book Your Free 15-Minute<br>Strategy Call Today</h2>
                <p style="margin: 0 0 28px 0; color: rgba(255, 255, 255, 0.95); font-size: 17px; line-height: 1.6;">See exactly how much time and money you'll save on your next 3 hires</p>
                <a href="https://recxchange.io/book-meeting" style="display: inline-block; background-color: #ffffff; color: #667eea; text-decoration: none; padding: 18px 40px; border-radius: 12px; font-weight: 800; font-size: 18px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); transition: transform 0.2s;">📅 Book Your Strategy Call →</a>
                <p style="margin: 24px 0 0 0; color: rgba(255, 255, 255, 0.85); font-size: 14px;">⚡ Only <strong>8 spots</strong> left this week | 🎯 No sales pitch, just insights</p>
              </div>
            </td>
          </tr>

          <!-- Risk Reversal -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background-color: #fef3c7; border-radius: 12px; padding: 24px; text-align: center; border: 2px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 16px; font-weight: 700; line-height: 1.6;">🛡️ <strong>100% Risk-Free Guarantee</strong></p>
                <p style="margin: 12px 0 0 0; color: #b45309; font-size: 15px; line-height: 1.6;">Post your first role completely free. If you don't receive qualified candidates within 48 hours, we'll <strong>personally</strong> source 3 candidates for you at no cost.</p>
              </div>
            </td>
          </tr>

          <!-- Social Proof -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <h3 style="margin: 0 0 24px 0; color: #1e293b; font-size: 22px; font-weight: 700; text-align: center;">What Leaders Like You Are Saying</h3>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 16px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 12px 0; color: #475569; font-size: 15px; line-height: 1.7; font-style: italic;">"We filled 3 senior engineering roles in 21 days and saved $32,000 in recruitment fees. The quality was better than our previous agency."</p>
                <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: 700;">— Sarah Chen, VP Engineering at TechCorp</p>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 16px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 12px 0; color: #475569; font-size: 15px; line-height: 1.7; font-style: italic;">"Finally, a platform that actually works. No more spam from 50 agencies. Just one account manager and top-tier candidates."</p>
                <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: 700;">— Michael Rodriguez, Head of Talent at GrowthLabs</p>
              </div>
              
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border-left: 4px solid #667eea;">
                <p style="margin: 0 0 12px 0; color: #475569; font-size: 15px; line-height: 1.7; font-style: italic;">"We've made 12 hires through RecX Direct this year. Average fee: 14%. Our CFO is thrilled with the cost savings."</p>
                <p style="margin: 0; color: #667eea; font-size: 14px; font-weight: 700;">— Amanda Park, Director of HR at FinanceFlow</p>
              </div>
            </td>
          </tr>

          <!-- Secondary CTA -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8fafc; border-radius: 12px;">
                <tr>
                  <td style="padding: 32px; text-align: center;">
                    <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 20px; font-weight: 700;">Not Ready for a Call Yet?</h3>
                    <p style="margin: 0 0 20px 0; color: #64748b; font-size: 15px; line-height: 1.6;">Post your first role for free and see how it works</p>
                    <a href="https://recxchange.io/hiring-manager-live" style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 16px;">Post a Role (100% Free) →</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Urgency + Scarcity -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 24px; text-align: center; border: 2px dashed #ef4444;">
                <p style="margin: 0 0 8px 0; color: #991b1b; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">⏰ Time-Sensitive Opportunity</p>
                <p style="margin: 0; color: #7f1d1d; font-size: 16px; line-height: 1.7; font-weight: 600;">We're currently onboarding <strong>8 new clients this month</strong>. After that, we'll have a waitlist to maintain service quality. <strong>Book your call now to skip the queue.</strong></p>
              </div>
            </td>
          </tr>

          <!-- Questions / Contact -->
          <tr>
            <td style="padding: 0 40px 40px 40px;">
              <div style="background-color: #f8fafc; border-radius: 12px; padding: 28px;">
                <h3 style="margin: 0 0 16px 0; color: #1e293b; font-size: 18px; font-weight: 700;">Have Questions?</h3>
                <p style="margin: 0 0 16px 0; color: #475569; font-size: 15px; line-height: 1.6;">I'm here to help. Simply reply to this email or:</p>
                <div style="margin-bottom: 12px;">
                  <a href="https://recxchange.io/book-meeting" style="color: #667eea; text-decoration: none; font-size: 15px; font-weight: 600;">📅 Book a 15-minute strategy call</a>
                </div>
                <div style="margin-bottom: 12px;">
                  <a href="mailto:tom@recxchange.io" style="color: #667eea; text-decoration: none; font-size: 15px; font-weight: 600;">📧 Email me directly: tom@recxchange.io</a>
                </div>
                <div>
                  <a href="https://recxchange.io/hiring-manager-home" style="color: #667eea; text-decoration: none; font-size: 15px; font-weight: 600;">🌐 Learn more on our website</a>
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 32px 40px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); text-align: center;">
              <p style="margin: 0 0 12px 0; color: #ffffff; font-size: 18px; font-weight: 700;">Ready to Transform Your Hiring?</p>
              <p style="margin: 0 0 24px 0; color: #cbd5e1; font-size: 15px; line-height: 1.6;">Join 247 companies hiring smarter with RecX Direct</p>
              <a href="https://recxchange.io/book-meeting" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 16px 36px; border-radius: 10px; font-weight: 700; font-size: 17px; box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);">📅 Book My Strategy Call</a>
              <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 13px;">RecXchange | Connecting 15,000+ recruiters with forward-thinking companies</p>
                <div style="margin-top: 12px;">
                  <a href="https://recxchange.io" style="color: #94a3b8; text-decoration: none; font-size: 13px; margin: 0 10px;">Website</a>
                  <span style="color: #475569;">|</span>
                  <a href="https://recxchange.io/pricing" style="color: #94a3b8; text-decoration: none; font-size: 13px; margin: 0 10px;">Pricing</a>
                  <span style="color: #475569;">|</span>
                  <a href="https://recxchange.io/hiring-manager-home" style="color: #94a3b8; text-decoration: none; font-size: 13px; margin: 0 10px;">For Clients</a>
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
