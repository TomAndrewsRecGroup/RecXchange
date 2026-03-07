/**
 * Industry Roles Data
 * Mock data for matching candidate email - should be replaced with actual API call
 * TODO: Replace with actual API call to live roles database from Manatal ATS
 */

export interface Role {
  title: string;
  company: string;
  location: string;
  workMode: string;
  salary: string;
  type: string;
  keySkills: string[];
  description: string;
}

export const INDUSTRY_ROLES: Record<string, Role[]> = {
  'Technology': [
    { 
      title: 'Senior Full-Stack Engineer', 
      company: 'FinTech Innovations Ltd', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '$75,000 - $95,000', 
      type: 'Permanent',
      keySkills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
      description: 'Build scalable fintech platforms with modern tech stack. Lead technical decisions and mentor junior developers.'
    },
    { 
      title: 'Lead DevOps Engineer', 
      company: 'CloudScale Systems', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$80,000 - $100,000', 
      type: 'Permanent',
      keySkills: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'CI/CD'],
      description: 'Design and maintain cloud infrastructure. Automate deployment pipelines and ensure system reliability.'
    },
    { 
      title: 'Principal Software Architect', 
      company: 'Digital Dynamics PLC', 
      location: 'Edinburgh', 
      workMode: 'Hybrid', 
      salary: '$90,000 - $120,000', 
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
      salary: '$65,000 - $85,000', 
      type: 'Permanent',
      keySkills: ['Financial Modelling', 'Excel', 'SQL', 'Bloomberg', 'Valuation'],
      description: 'Conduct financial analysis and due diligence. Build complex financial models for investment decisions.'
    },
    { 
      title: 'Investment Banking Associate', 
      company: 'Apex Investment Group', 
      location: 'London', 
      workMode: 'Office', 
      salary: '$80,000 - $110,000', 
      type: 'Permanent',
      keySkills: ['M&A', 'DCF', 'Excel', 'PowerPoint', 'Deal Execution'],
      description: 'Execute M&A transactions and capital raises. Prepare pitch books and financial presentations.'
    },
    { 
      title: 'Portfolio Manager', 
      company: 'Meridian Wealth Management', 
      location: 'Leeds', 
      workMode: 'Hybrid', 
      salary: '$70,000 - $95,000', 
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
      salary: '$50,000 - $65,000', 
      type: 'Permanent',
      keySkills: ['Clinical Pharmacy', 'Prescribing', 'Patient Care', 'BNF', 'Medicines Management'],
      description: 'Provide expert pharmaceutical care. Review prescriptions and advise medical teams on medication.'
    },
    { 
      title: 'Consultant Radiologist', 
      company: 'Royal Medical Centre', 
      location: 'Birmingham', 
      workMode: 'Office', 
      salary: '$85,000 - $110,000', 
      type: 'Permanent',
      keySkills: ['MRI', 'CT Scans', 'X-Ray', 'Diagnostic Imaging', 'GMC Registered'],
      description: 'Interpret medical images and provide diagnostic reports. Subspecialty in MSK or neuro preferred.'
    },
    { 
      title: 'Head of Nursing Operations', 
      company: 'Cambridge Healthcare Group', 
      location: 'Cambridge', 
      workMode: 'Office', 
      salary: '$60,000 - $75,000', 
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
      salary: '$55,000 - $75,000', 
      type: 'Permanent',
      keySkills: ['CAD', 'SolidWorks', 'FEA', 'Product Design', 'Manufacturing'],
      description: 'Design mechanical systems and components. Lead projects from concept through to production.'
    },
    { 
      title: 'Principal Civil Engineer', 
      company: 'Infrastructure Solutions Ltd', 
      location: 'Bristol', 
      workMode: 'Office', 
      salary: '$70,000 - $90,000', 
      type: 'Permanent',
      keySkills: ['Civil 3D', 'Structural Design', 'Project Management', 'ICE Chartership', 'AutoCAD'],
      description: 'Lead infrastructure projects including bridges and highways. Manage multidisciplinary teams.'
    },
    { 
      title: 'Lead Electrical Engineer', 
      company: 'PowerTech Industries', 
      location: 'Sheffield', 
      workMode: 'Hybrid', 
      salary: '$60,000 - $80,000', 
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
      salary: '$55,000 - $70,000', 
      type: 'Permanent',
      keySkills: ['SEO', 'PPC', 'Google Analytics', 'Content Strategy', 'Social Media'],
      description: 'Develop and execute digital marketing campaigns. Optimize conversion rates and ROI.'
    },
    { 
      title: 'Head of Content Strategy', 
      company: 'BrandVision Media', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$60,000 - $80,000', 
      type: 'Permanent',
      keySkills: ['Content Marketing', 'Copywriting', 'SEO', 'Editorial', 'Brand Strategy'],
      description: 'Lead content strategy across all channels. Build and manage content team.'
    },
    { 
      title: 'Performance Marketing Lead', 
      company: 'Digital Commerce Group', 
      location: 'London', 
      workMode: 'Hybrid', 
      salary: '$65,000 - $85,000', 
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
      salary: '$70,000 - $90,000 + Commission', 
      type: 'Permanent',
      keySkills: ['Enterprise Sales', 'SaaS', 'Negotiation', 'Salesforce', 'Account Management'],
      description: 'Close enterprise deals with major UK brands. Build strategic relationships with C-level buyers.'
    },
    { 
      title: 'Senior Account Executive', 
      company: 'Global Tech Distributors', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '$50,000 - $65,000 + Commission', 
      type: 'Permanent',
      keySkills: ['B2B Sales', 'Pipeline Management', 'CRM', 'Prospecting', 'Closing'],
      description: 'Generate new business and manage sales pipeline. Achieve quarterly revenue targets.'
    },
    { 
      title: 'Head of Business Development', 
      company: 'Enterprise Cloud Services', 
      location: 'Manchester', 
      workMode: 'Hybrid', 
      salary: '$75,000 - $95,000 + Commission', 
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
      salary: '$70,000 - $90,000', 
      type: 'Permanent',
      keySkills: ['JavaScript', 'React', 'Node.js', 'Git', 'Agile'],
      description: 'Develop modern web applications. Collaborate with product and design teams.'
    },
    { 
      title: 'Project Manager', 
      company: 'Business Solutions PLC', 
      location: 'Manchester', 
      workMode: 'Remote', 
      salary: '$55,000 - $75,000', 
      type: 'Permanent',
      keySkills: ['Project Management', 'Agile', 'Stakeholder Management', 'PRINCE2', 'Jira'],
      description: 'Deliver projects on time and within budget. Coordinate cross-functional teams.'
    },
    { 
      title: 'Senior Business Analyst', 
      company: 'Consulting Partners UK', 
      location: 'Birmingham', 
      workMode: 'Hybrid', 
      salary: '$60,000 - $80,000', 
      type: 'Permanent',
      keySkills: ['Business Analysis', 'Requirements', 'SQL', 'Stakeholder Engagement', 'Process Improvement'],
      description: 'Analyze business processes and gather requirements. Bridge gap between business and IT.'
    },
  ],
};
