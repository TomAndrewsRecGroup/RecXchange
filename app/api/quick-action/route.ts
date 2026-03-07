import { NextRequest, NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { 
  checkRateLimit, 
  getClientIP, 
  validateFormData,
  getSecurityHeaders 
} from '@/lib/security';

interface QuickActionRequest {
  firstName: string;
  lastName: string;
  email: string;
  actionType: 'match_candidate' | 'explain_recx_direct';
  source: string;
  industries?: string[]; // Optional industries for match_candidate
  marketingConsent?: boolean; // GDPR marketing consent
}

// TODO: Replace with actual API call to live roles database
// This should pull from Manatal ATS or your live roles data source
const INDUSTRY_ROLES: Record<string, Array<{
  title: string; 
  company: string; 
  location: string; 
  workMode: string; 
  salary: string; 
  type: string;
  keySkills: string[];
  description: string;
}>> = {
  'Technology': [
    { 
      title: 'Senior Full-Stack Engineer', 
      company: 'FinTech Innovations Ltd', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£75,000 - £95,000', 
      type: 'Permanent',
      keySkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
      description: 'Build scalable fintech platforms with modern tech stack. Lead technical decisions and mentor junior developers.'
    },
    { 
      title: 'Lead DevOps Engineer', 
      company: 'CloudScale Systems', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£80,000 - £100,000', 
      type: 'Permanent',
      keySkills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
      description: 'Design and maintain cloud infrastructure. Automate deployment pipelines and ensure system reliability.'
    },
    { 
      title: 'Principal Software Architect', 
      company: 'Digital Dynamics PLC', 
      location: 'Edinburgh', 
      workMode: 'Hybrid', 
      salary: '£90,000 - £120,000', 
      type: 'Permanent',
      keySkills: ['System Design', 'Microservices', 'Java', 'Python', 'Azure'],
      description: 'Define technical strategy and architecture for enterprise systems. Lead cross-functional engineering teams.'
    },
  ],
  'Finance': [
    { 
      title: 'Senior Financial Analyst', 
      company: 'Sterling Capital Partners', 
      location: 'London', 
      workMode: 'Office', 
      salary: '£65,000 - £85,000', 
      type: 'Permanent',
      keySkills: ['Financial Modelling', 'Excel', 'SQL', 'Bloomberg', 'Valuation'],
      description: 'Conduct financial analysis and due diligence. Build complex financial models for investment decisions.'
    },
    { 
      title: 'Investment Banking Associate', 
      company: 'Apex Investment Group', 
      location: 'London', 
      workMode: 'Office', 
      salary: '£80,000 - £110,000', 
      type: 'Permanent',
      keySkills: ['M&A', 'DCF', 'Excel', 'PowerPoint', 'Deal Execution'],
      description: 'Execute M&A transactions and capital raises. Prepare pitch books and financial presentations.'
    },
    { 
      title: 'Portfolio Manager', 
      company: 'Meridian Wealth Management', 
      location: 'Leeds', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £95,000', 
      type: 'Permanent',
      keySkills: ['Asset Allocation', 'Risk Management', 'CFA', 'Bloomberg', 'Research'],
      description: 'Manage multi-asset portfolios. Develop investment strategies and conduct market research.'
    },
  ],
  'Healthcare': [
    { 
      title: 'Senior Clinical Pharmacist', 
      company: 'NHS Trust - Greater Manchester', 
      location: 'Manchester', 
      workMode: 'Office', 
      salary: '£50,000 - £65,000', 
      type: 'Permanent',
      keySkills: ['Clinical Pharmacy', 'Prescribing', 'Patient Care', 'BNF', 'Medicines Management'],
      description: 'Provide expert pharmaceutical care. Review prescriptions and advise medical teams on medication.'
    },
    { 
      title: 'Consultant Radiologist', 
      company: 'Royal Medical Centre', 
      location: 'Birmingham', 
      workMode: 'Office', 
      salary: '£85,000 - £110,000', 
      type: 'Permanent',
      keySkills: ['MRI', 'CT Scans', 'X-Ray', 'Diagnostic Imaging', 'GMC Registered'],
      description: 'Interpret medical images and provide diagnostic reports. Subspecialty in MSK or neuro preferred.'
    },
    { 
      title: 'Head of Nursing Operations', 
      company: 'Cambridge Healthcare Group', 
      location: 'Cambridge', 
      workMode: 'Office', 
      salary: '£60,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['Nursing Leadership', 'CQC', 'Staff Management', 'Quality Improvement', 'NMC Pin'],
      description: 'Lead nursing teams across multiple sites. Ensure CQC compliance and drive quality improvements.'
    },
  ],
  'Engineering': [
    { 
      title: 'Senior Mechanical Engineer', 
      company: 'Precision Engineering Co', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£55,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['CAD', 'SolidWorks', 'FEA', 'Product Design', 'Manufacturing'],
      description: 'Design mechanical systems and components. Lead projects from concept through to production.'
    },
    { 
      title: 'Principal Civil Engineer', 
      company: 'Infrastructure Solutions Ltd', 
      location: 'Bristol', 
      workMode: 'Office', 
      salary: '£70,000 - £90,000', 
      type: 'Permanent',
      keySkills: ['Civil 3D', 'Structural Design', 'Project Management', 'ICE Chartership', 'AutoCAD'],
      description: 'Lead infrastructure projects including bridges and highways. Manage multidisciplinary teams.'
    },
    { 
      title: 'Lead Electrical Engineer', 
      company: 'PowerTech Industries', 
      location: 'Sheffield', 
      workMode: 'Hybrid', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Power Systems', 'PLC', 'AutoCAD Electrical', 'HV/LV', 'IET Regs'],
      description: 'Design electrical distribution systems. Ensure compliance with regulations and standards.'
    },
  ],
  'Marketing': [
    { 
      title: 'Senior Digital Marketing Manager', 
      company: 'Growth Marketing Agency', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£55,000 - £70,000', 
      type: 'Permanent',
      keySkills: ['SEO', 'PPC', 'Google Analytics', 'Content Strategy', 'Social Media'],
      description: 'Develop and execute digital marketing campaigns. Optimize conversion rates and ROI.'
    },
    { 
      title: 'Head of Content Strategy', 
      company: 'BrandVision Media', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Content Marketing', 'Copywriting', 'SEO', 'Editorial', 'Brand Strategy'],
      description: 'Lead content strategy across all channels. Build and manage content team.'
    },
    { 
      title: 'Performance Marketing Lead', 
      company: 'Digital Commerce Group', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£65,000 - £85,000', 
      type: 'Permanent',
      keySkills: ['Paid Media', 'Google Ads', 'Facebook Ads', 'Analytics', 'Attribution'],
      description: 'Drive customer acquisition through paid channels. Optimize campaigns and budgets.'
    },
  ],
  'Sales': [
    { 
      title: 'Enterprise Sales Director', 
      company: 'SaaS Solutions UK', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £90,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'Salesforce', 'Account Management'],
      description: 'Close enterprise deals with major UK brands. Build strategic relationships with C-level buyers.'
    },
    { 
      title: 'Senior Account Executive', 
      company: 'Global Tech Distributors', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£50,000 - £65,000 + Commission', 
      type: 'Permanent',
      keySkills: ['B2B Sales', 'Pipeline Management', 'CRM', 'Prospecting', 'Closing'],
      description: 'Generate new business and manage sales pipeline. Achieve quarterly revenue targets.'
    },
    { 
      title: 'Head of Business Development', 
      company: 'Enterprise Cloud Services', 
      location: 'Manchester', 
      workMode: 'Hybrid', 
      salary: '£75,000 - £95,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Business Development', 'Partnerships', 'Strategic Sales', 'Negotiation', 'Contracts'],
      description: 'Identify and close strategic partnerships. Lead BD team and set growth strategy.'
    },
  ],
  'Default': [
    { 
      title: 'Senior Software Engineer', 
      company: 'Tech Innovations Ltd', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '£70,000 - £90,000', 
      type: 'Permanent',
      keySkills: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile'],
      description: 'Develop modern web applications. Collaborate with product and design teams.'
    },
    { 
      title: 'Project Manager', 
      company: 'Business Solutions PLC', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '£55,000 - £75,000', 
      type: 'Permanent',
      keySkills: ['Project Management', 'Agile', 'Stakeholder Management', 'PRINCE2', 'Jira'],
      description: 'Deliver projects on time and within budget. Coordinate cross-functional teams.'
    },
    { 
      title: 'Senior Business Analyst', 
      company: 'Consulting Partners UK', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '£60,000 - £80,000', 
      type: 'Permanent',
      keySkills: ['Business Analysis', 'Requirements', 'SQL', 'Stakeholder Engagement', 'Process Improvement'],
      description: 'Analyze business processes and gather requirements. Bridge gap between business and IT.'
    },
  ],
};

const generateRoleCard = (role: {
  title: string; 
  company: string; 
  location: string; 
  workMode: string; 
  salary: string; 
  type: string;
  keySkills: string[];
  description: string;
}, index: number) => {
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

const ACTION_CONFIG = {
  match_candidate: {
    ghlTag: 'Website - QA 3 roles',
    autoResponseSubject: '3 Matching Live Roles For You',
    autoResponseTemplate: (firstName: string, industries?: string[]) => {
      // Select roles based on industries
      let selectedRoles: Array<{title: string; company: string; location: string; workMode: string; salary: string; type: string; keySkills: string[]; description: string;}> = [];
      
      if (industries && industries.length > 0) {
        for (const industry of industries) {
          if (INDUSTRY_ROLES[industry]) {
            selectedRoles = INDUSTRY_ROLES[industry];
            break;
          }
        }
      }
      
      if (selectedRoles.length === 0) {
        selectedRoles = INDUSTRY_ROLES['Default'];
      }
      
      const industryText = industries && industries.length > 0 ? industries.join(', ') : 'multiple sectors';
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
    },
  },
  explain_recx_direct: {
    ghlTag: 'Website - QA RecX Direct',
    autoResponseSubject: 'How RecXchange Works - Your Complete Guide',
    autoResponseTemplate: (firstName: string) => {
      const LOGO_URL = 'https://images.squarespace-cdn.com/content/v1/68120154725429476150f64b/00d296cd-6741-4c0a-a711-08a3f35db445/REX-Logo-GW-25.png?format=1500w';
      
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

                      <!-- SECTION 1: What is RecXchange -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 28px;">
                            <h2 style="color: rgb(168, 85, 247); font-size: 22px; font-weight: 800; margin: 0 0 16px 0; text-transform: uppercase; letter-spacing: 0.05em;">🔵 What is RecXchange?</h2>
                            <p style="color: #e5e5e5; font-size: 16px; line-height: 1.8; margin: 0 0 16px 0; font-weight: 600;">RecXchange is a global recruiter collaboration platform where recruitment professionals work together to fill roles and place candidates faster than they could working alone.</p>
                            <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">Think of it like this: You have a role you can't fill, or a candidate you can't place. Instead of letting them sit in your database gathering dust, you post them to RecXchange. Our AI-powered Xchange Engine instantly matches your role to recruiters who have perfect candidates, or matches your candidate to recruiters who have perfect roles.</p>
                            <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0;">When a match is made and a placement happens, you split the fee 50/50. Automated contracts, secure escrow payments, and full transparency throughout.</p>
                            
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(0, 0, 0, 0.4); border-radius: 12px; padding: 20px; margin-top: 20px;">
                              <tr>
                                <td>
                                  <p style="color: rgb(168, 85, 247); font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">💡 Simple Example</p>
                                  <p style="color: #e5e5e5; font-size: 14px; line-height: 1.7; margin: 0;">You're a tech recruiter in London with a Senior DevOps role you've been unable to fill for 6 weeks. You post it to RecXchange. Within 24 hours, a recruiter in Manchester submits a perfect candidate they've been sitting on. You interview. You hire. £15,000 fee splits 50/50. You both walk away with £7,500. <strong style="color: rgb(168, 85, 247);">Role filled. Candidate placed. Everyone wins.</strong></p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Platform Stats Grid -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 28px;">
                        <tr>
                          <td width="32%" style="padding: 0 6px 0 0;" class="stat-box">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px;">
                              <tr>
                                <td style="padding: 22px 16px; text-align: center;">
                                  <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 10px 0;">Global Network</p>
                                  <p style="color: rgb(168, 85, 247); font-size: 28px; font-weight: 900; margin: 0 0 6px 0; line-height: 1;">15,000+</p>
                                  <p style="color: #888; font-size: 12px; font-weight: 600; margin: 0;">Vetted Recruiters</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="32%" style="padding: 0 6px;" class="stat-box">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 14px;">
                              <tr>
                                <td style="padding: 22px 16px; text-align: center;">
                                  <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 10px 0;">Total Bounty Available</p>
                                  <p style="color: rgb(59, 130, 246); font-size: 28px; font-weight: 900; margin: 0 0 6px 0; line-height: 1;">£750k+</p>
                                  <p style="color: #888; font-size: 12px; font-weight: 600; margin: 0;">Across All Live Roles</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                          <td width="32%" style="padding: 0 0 0 6px;" class="stat-box">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 14px;">
                              <tr>
                                <td style="padding: 22px 16px; text-align: center;">
                                  <p style="color: #666; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 10px 0;">Candidate Database</p>
                                  <p style="color: rgb(168, 85, 247); font-size: 28px; font-weight: 900; margin: 0 0 6px 0; line-height: 1;">270M+</p>
                                  <p style="color: #888; font-size: 12px; font-weight: 600; margin: 0;">Searchable Profiles</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- SECTION 2: How It Works (3 Steps) -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">⚡ How It Works (3 Simple Steps)</h2>
                            
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
                                  <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">📤 Post Your Role or Candidate</h3>
                                  <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Upload a role you're struggling to fill, or a candidate you can't place. It takes 2 minutes. Include key details like location, salary, required skills, and any deal breakers. The more detail you provide, the better the AI matching works.</p>
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
                                  <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">🤖 AI Finds Perfect Matches in Seconds</h3>
                                  <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">Our Xchange Engine instantly scans 15,000+ recruiters and 270M+ candidates to find matches. Relevant partners get instant alerts. They have the candidates for your roles, or the roles for your candidates. You'll typically see matches within 24 to 48 hours.</p>
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
                                  <h3 style="color: #fff; font-size: 17px; font-weight: 700; margin: 0 0 10px 0; line-height: 1.3;">💰 Split the Fee & Get Paid Automatically</h3>
                                  <p style="color: #ccc; font-size: 15px; line-height: 1.7; margin: 0;">When a placement happens, an automated Split Fee Agreement (SFA) is generated. Default split is 50/50, but you can negotiate 60/40 or even 70/30 for premium roles. Payment is handled securely through RecXchange escrow. No chasing invoices. No payment disputes.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- SECTION 3: RecX Direct Detailed Explainer with Bounty Model -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%); border: 2px solid rgba(168, 85, 247, 0.4); border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 4px;">
                              <tr>
                                <td>
                                  <p style="color: rgb(168, 85, 247); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px 0;">💎 Premium Feature</p>
                                  <h2 style="color: rgb(168, 85, 247); font-size: 24px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.03em; text-shadow: 0 0 20px rgba(168, 85, 247, 0.3);">What is RecX Direct?</h2>
                                </td>
                              </tr>
                            </table>
                            
                            <p style="color: #fff; font-size: 17px; line-height: 1.8; margin: 0 0 16px 0; font-weight: 700;">RecX Direct is our flat-rate subscription model that gives you unlimited access to roles with pre-attached Bounties.</p>
                            
                            <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 20px 0;"><strong style="color: #fff;">The Old Way:</strong> Pay 15% to 20% of salary per hire. Hire 5 people? That's 5 separate agency fees. Unpredictable costs. Budget nightmares.</p>
                            
                            <p style="color: #ddd; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;"><strong style="color: #fff;">The RecX Direct Way:</strong> Pay one flat monthly subscription. Access unlimited roles, each with a clear Bounty fee attached. You know exactly what you'll earn per placement before you even submit a candidate. Predictable earnings. Zero surprises.</p>

                            <h3 style="color: rgb(168, 85, 247); font-size: 18px; font-weight: 700; margin: 0 0 16px 0;">How Does the Bounty System Work?</h3>
                            <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 16px 0;">When a client uploads a role to RecX Direct, they attach a Bounty (the placement fee). This Bounty is visible to all recruiters on the platform. You can see exactly what you'll earn before submitting a candidate. No hidden fees. No surprises.</p>

                            <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0 0 16px 0;"><strong style="color: #fff;">Example:</strong> A fintech startup posts a Senior Software Engineer role with a £12,000 Bounty. You submit a candidate. They get hired. You receive £12,000. Simple as that. The Bounty is pre-agreed by the client when they upload the role.</p>

                            <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Perfect for recruiters who want predictable earnings and clients who want flat-rate, unlimited hiring without per-hire invoices stacking up.</p>
                          </td>
                        </tr>
                      </table>

                      <!-- SECTION 4: Pricing Tiers -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">💷 Pricing Tiers</h2>

                            <!-- Entry Tier -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟣 Entry Tier - £1/month</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">Perfect for solo recruiters testing the platform. Post 1 role OR 1 candidate. Access to full network. 50/50 fee splits. No credit card required for first month.</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Lite Tier -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px; margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: rgb(59, 130, 246); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🔵 Lite Tier - £99/month</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For active recruiters making 1 to 2 placements per month. Post up to 5 roles plus 10 candidates. AI matching priority. 50/50 or 60/40 split options. Circle of Trust access.</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Pro Tier -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.05); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; margin-bottom: 16px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🟣 Pro Tier - £299/month</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For agencies and high-volume recruiters. Unlimited roles plus candidates. 70/30 split options on premium roles. Advanced analytics dashboard. Dedicated account manager. Full RecX Direct Bounty access.</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Teams Tier -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.05); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 12px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: rgb(59, 130, 246); font-size: 16px; font-weight: 700; margin: 0 0 8px 0;">🔵 Teams Tier - Custom Pricing</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;">For recruitment agencies with 5+ consultants. Everything in Pro plus team collaboration tools, white-label options, API access, custom integrations, and enterprise SLAs. Contact for quote.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Success Stories Section -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 20px 0; text-transform: uppercase; letter-spacing: 0.05em;">🏆 Real Success Stories</h2>
                            
                            <!-- Story 1 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.08); border-left: 4px solid rgb(168, 85, 247); border-radius: 10px; margin-bottom: 20px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: #e5e5e5; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; font-style: italic;">"💼 I'm a tech recruiter in London. Posted a Senior DevOps role that had been stuck for 6 weeks. Client was getting frustrated. Within 48 hours of posting on RecXchange, a partner in Manchester submitted a perfect candidate they'd been sitting on for months. Interviewed Monday. Offered Wednesday. Started the following Monday. <strong style="color: rgb(168, 85, 247);">£15,000 fee split 50/50 equals £7,500 for me.</strong> I'd have earned £0 without RecXchange."</p>
                                  <p style="color: rgb(168, 85, 247); font-size: 14px; font-weight: 700; margin: 0;">Sarah Mitchell, Tech Recruiter at TechSource London</p>
                                  <p style="color: #888; font-size: 12px; margin: 6px 0 0 0;">Joined: August 2025 · Placements: 7 · Total Earnings: £42,000</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Story 2 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(59, 130, 246, 0.08); border-left: 4px solid rgb(59, 130, 246); border-radius: 10px; margin-bottom: 20px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: #e5e5e5; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; font-style: italic;">"💰 I had an amazing Finance candidate. CFA qualified, 8 years investment banking experience. Problem? I had zero roles for her. Posted her profile on RecXchange. Got matched to 3 different roles within 24 hours. Placed her with a partner in Edinburgh. <strong style="color: rgb(59, 130, 246);">Split fee: £12,000. My half: £6,000.</strong> Easiest money I've ever made. Now I upload every unplaced candidate immediately."</p>
                                  <p style="color: rgb(59, 130, 246); font-size: 14px; font-weight: 700; margin: 0;">James Thompson, Finance Recruiter at Capital Talent Partners</p>
                                  <p style="color: #888; font-size: 12px; margin: 6px 0 0 0;">Joined: June 2025 · Placements: 11 · Total Earnings: £68,500</p>
                                </td>
                              </tr>
                            </table>

                            <!-- Story 3 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: rgba(168, 85, 247, 0.08); border-left: 4px solid rgb(168, 85, 247); border-radius: 10px;">
                              <tr>
                                <td style="padding: 20px;">
                                  <p style="color: #e5e5e5; font-size: 15px; line-height: 1.7; margin: 0 0 16px 0; font-style: italic;">"🚀 We're a small SaaS startup hiring 3 to 5 people per quarter. Used to pay traditional agency fees costing us £30k+ annually. Switched to RecX Direct Pro tier (£299/month equals £3,588/year). <strong style="color: rgb(168, 85, 247);">We're saving £26,412 per year.</strong> Same quality candidates. Zero per-hire invoices. Game changer for startups watching burn rate."</p>
                                  <p style="color: rgb(168, 85, 247); font-size: 14px; font-weight: 700; margin: 0;">Emma Lewis, Head of Talent at CloudSync (Series A SaaS)</p>
                                  <p style="color: #888; font-size: 12px; margin: 6px 0 0 0;">RecX Direct subscriber since: January 2025 · Hires made: 14</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Platform Reviews -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 28px; text-align: center;">
                            <p style="color: #888; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 16px 0;">Verified Platform Rating</p>
                            <p style="color: #fff; font-size: 42px; font-weight: 900; margin: 0 0 10px 0; line-height: 1;">⭐️⭐️⭐️⭐️⭐️</p>
                            <p style="color: rgb(168, 85, 247); font-size: 32px; font-weight: 900; margin: 0 0 10px 0; line-height: 1;">4.8 / 5.0</p>
                            <p style="color: #aaa; font-size: 15px; margin: 0;">Based on 2,400+ verified recruiter reviews</p>
                          </td>
                        </tr>
                      </table>

                      <!-- FAQs Section -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: #111; border: 1px solid #222; border-radius: 16px; margin-bottom: 24px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <h2 style="color: rgb(59, 130, 246); font-size: 22px; font-weight: 800; margin: 0 0 24px 0; text-transform: uppercase; letter-spacing: 0.05em;">❓ Frequently Asked Questions</h2>

                            <!-- FAQ 1 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                              <tr>
                                <td style="padding: 0 0 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                  <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">Q: How do I know the recruiters are vetted and trustworthy?</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;"><strong style="color: #fff;">A:</strong> Every recruiter must verify their business registration, professional credentials, and go through a compliance check before joining. We monitor placement success rates and partner feedback. Poor performers are removed from the network.</p>
                                </td>
                              </tr>
                            </table>

                            <!-- FAQ 2 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 20px;">
                              <tr>
                                <td style="padding: 0 0 12px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                                  <p style="color: rgb(59, 130, 246); font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">Q: What happens if a candidate falls through during probation?</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;"><strong style="color: #fff;">A:</strong> Standard rebate clauses are built into our Split Fee Agreements. If a candidate leaves within the probation period (typically 3 months), the fee is pro-rated or refunded depending on the terms agreed upfront. Everything is transparent.</p>
                                </td>
                              </tr>
                            </table>

                            <!-- FAQ 3 -->
                            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                              <tr>
                                <td style="padding: 0;">
                                  <p style="color: rgb(168, 85, 247); font-size: 16px; font-weight: 700; margin: 0 0 10px 0;">Q: Can I negotiate fee splits other than 50/50?</p>
                                  <p style="color: #ccc; font-size: 14px; line-height: 1.7; margin: 0;"><strong style="color: #fff;">A:</strong> Yes. While 50/50 is the default, you can negotiate 60/40, 70/30, or even custom splits for premium roles. The recruiter who owns the client relationship typically gets the larger share, but it's flexible based on effort contribution.</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Final CTA Section -->
                      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%); background-color: rgba(59, 130, 246, 0.08); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 16px; margin-top: 32px;">
                        <tr>
                          <td style="padding: 32px 24px; text-align: center;">
                            <h3 style="color: #fff; font-size: 22px; font-weight: 700; margin: 0 0 12px 0;">Ready to Start Earning with RecXchange?</h3>
                            <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">Join 15,000+ vetted recruiters collaborating globally. Post your first role or candidate for free and see matches within 24 hours.</p>
                            
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
    },
  },
};

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);
  
  // Rate limiting check - using 'form' type as this is a form submission
  const rateLimitResult = checkRateLimit(ip, 'form');
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Too many requests. Please try again later.',
        retryAfter: rateLimitResult.resetIn 
      },
      { status: 429, headers: getSecurityHeaders() }
    );
  }

  try {
    const body: QuickActionRequest = await request.json();

    // Validate form data
    const validation = validateFormData(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join(', ') },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    const { firstName, lastName, email, actionType, source, industries, marketingConsent } = body;

    // Get action configuration
    const config = ACTION_CONFIG[actionType];
    if (!config) {
      return NextResponse.json(
        { success: false, error: 'Invalid action type' },
        { status: 400, headers: getSecurityHeaders() }
      );
    }

    // Track analytics event
    await trackEvent('quick_action_submitted', {
      actionType,
      source,
      hasIndustries: !!industries?.length,
      industries: industries || [],
      marketingConsent: !!marketingConsent,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send to GoHighLevel
    // await sendToGHL({
    //   email,
    //   firstName,
    //   lastName,
    //   tags: [config.ghlTag],
    //   source,
    //   marketingConsent,
    //   customFields: { industries }
    // });

    // TODO: Send auto-response email via SendGrid
    // await sendEmail({
    //   to: email,
    //   subject: config.autoResponseSubject,
    //   html: config.autoResponseTemplate(firstName, industries),
    // });

    console.log('Quick action processed:', {
      email,
      actionType,
      ghlTag: config.ghlTag,
      subject: config.autoResponseSubject,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Request processed successfully. Check your email for details!',
      },
      { status: 200, headers: getSecurityHeaders() }
    );

  } catch (error) {
    console.error('Quick action error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred processing your request. Please try again.' 
      },
      { status: 500, headers: getSecurityHeaders() }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405, headers: getSecurityHeaders() }
  );
}
