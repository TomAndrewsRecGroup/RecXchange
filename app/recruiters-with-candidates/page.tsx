"use client";
import React, { useState, useEffect } from "react";
import { Database, Search, Zap, Cpu, Bell, Globe, Upload, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

type EnginePhase = 'idle' | 'uploading' | 'matching' | 'result';

// Common job title patterns with professional certifications
const JOB_TITLE_PATTERNS = [
  // Healthcare & Medical
  /\b(nurse|nursing|rn|registered nurse|lpn|cna|nurse practitioner|midwife|healthcare assistant|clinical nurse|mental health nurse|pediatric nurse|critical care nurse|oncology nurse|emergency nurse|theatre nurse|district nurse|school nurse|occupational health nurse|nurse prescriber|specialist nurse|advanced nurse practitioner)\b/gi,
  /\b(doctor|physician|surgeon|consultant|gp|general practitioner|medical officer|psychiatrist|radiologist|cardiologist|anesthetist|dermatologist|neurologist|pediatrician)\b/gi,
  /\b(pharmacist|pharmacy|pharmaceutical|dispensing)\b/gi,
  /\b(physiotherapist|occupational therapist|speech therapist|therapist|counselor|psychologist|clinical psychologist)\b/gi,
  /\b(paramedic|emergency medical|emt|ambulance)\b/gi,
  /\b(dental|dentist|orthodontist|hygienist)\b/gi,
  /\b(radiographer|sonographer|medical imaging)\b/gi,
  /\b(healthcare manager|clinical manager|ward manager|practice manager)\b/gi,
  
  // Engineering
  /\b(mechanical engineer|civil engineer|electrical engineer|structural engineer|chemical engineer|aerospace engineer|biomedical engineer|industrial engineer|marine engineer|mining engineer|environmental engineer|automotive engineer|manufacturing engineer|design engineer|project engineer|site engineer|test engineer|validation engineer|systems engineer)\b/gi,
  /\b(software engineer|developer|programmer|full stack|frontend|backend|web developer|mobile developer|devops|cloud engineer|data engineer|ml engineer|ai engineer|security engineer)\b/gi,
  
  // Technology
  /\b(data scientist|data analyst|business analyst|system analyst|solutions architect|cloud architect|network architect|infrastructure engineer|network engineer|database administrator|dba|it manager|technical lead|tech lead|scrum master|product owner)\b/gi,
  /\b(ux designer|ui designer|product designer|graphic designer|web designer|creative director|art director)\b/gi,
  /\b(qa engineer|quality assurance|test engineer|qa analyst|automation engineer)\b/gi,
  
  // Business & Management
  /\b(project manager|programme manager|product manager|operations manager|general manager|business development manager|account manager|relationship manager|client services manager)\b/gi,
  /\b(sales director|sales manager|account executive|business development|sales representative|sales consultant)\b/gi,
  /\b(marketing director|marketing manager|digital marketing|content manager|seo specialist|social media manager|brand manager|growth manager)\b/gi,
  /\b(hr manager|human resources|talent acquisition|recruiter|recruitment consultant|people operations|hr business partner|hr advisor|talent partner)\b/gi,
  /\b(financial analyst|accountant|finance manager|controller|cfo|financial controller|management accountant|chartered accountant|auditor|tax advisor)\b/gi,
  /\b(operations director|operations manager|supply chain|logistics manager|procurement manager|warehouse manager)\b/gi,
  
  // Education
  /\b(teacher|lecturer|professor|teaching assistant|head teacher|deputy head|tutor|instructor|trainer|education coordinator)\b/gi,
  
  // Legal
  /\b(solicitor|barrister|lawyer|legal advisor|paralegal|legal executive|compliance officer|legal counsel)\b/gi,
  
  // Construction & Trades
  /\b(construction manager|site manager|quantity surveyor|building surveyor|carpenter|electrician|plumber|joiner|bricklayer|plasterer|roofer|painter|decorator)\b/gi,
  
  // Retail & Hospitality
  /\b(store manager|retail manager|assistant manager|team leader|supervisor|chef|sous chef|head chef|kitchen manager|restaurant manager|bar manager|hotel manager)\b/gi,
  
  // Other Professional
  /\b(architect|town planner|surveyor|estate agent|property manager|facilities manager|office manager|executive assistant|pa|personal assistant|administrator|receptionist)\b/gi,
  /\b(social worker|care manager|support worker|youth worker|community worker)\b/gi,
  /\b(journalist|editor|copywriter|content writer|technical writer|communications manager|pr manager)\b/gi,
];

// Specialty/certification patterns (to append to job titles)
const SPECIALTY_PATTERNS = [
  /\b(adhd|adhd specialist|adhd prescriber)\b/gi,
  /\b(diabetes|diabetes specialist)\b/gi,
  /\b(mental health|psychiatry|psychiatric)\b/gi,
  /\b(pediatric|paediatric|children|neonatal)\b/gi,
  /\b(oncology|cancer)\b/gi,
  /\b(cardiology|cardiac)\b/gi,
  /\b(neurology|neurological)\b/gi,
  /\b(emergency|a&e|accident and emergency|trauma)\b/gi,
  /\b(intensive care|icu|critical care)\b/gi,
  /\b(surgery|surgical|operating theatre|perioperative)\b/gi,
];

// Job role mappings for keyword-based fallback
const jobMappings: Record<string, string[]> = {
  'Senior Software Engineer': ['software', 'developer', 'programming', 'javascript', 'python', 'java', 'react', 'node', 'frontend', 'backend', 'full stack', 'web dev'],
  'Data Scientist': ['data science', 'machine learning', 'ml', 'analytics', 'statistics', 'data analysis', 'pandas', 'tensorflow'],
  'DevOps Engineer': ['devops', 'kubernetes', 'docker', 'aws', 'azure', 'cloud', 'ci/cd', 'jenkins', 'terraform', 'infrastructure'],
  'Product Manager': ['product management', 'product manager', 'roadmap', 'agile', 'scrum', 'stakeholder', 'user stories', 'product owner'],
  'Sales Director': ['sales', 'business development', 'account management', 'revenue', 'b2b', 'enterprise sales', 'crm', 'salesforce', 'closing deals'],
  'Marketing Director': ['marketing', 'digital marketing', 'seo', 'sem', 'social media', 'content marketing', 'campaigns', 'brand', 'growth marketing'],
  'Mechanical Engineer': ['mechanical engineering', 'cad', 'solidworks', 'autocad', 'manufacturing', 'design engineer', 'mechanical design', 'product design', 'engineering drawings'],
  'Civil Engineer': ['civil engineering', 'structural', 'construction', 'infrastructure', 'surveying', 'site engineer', 'project engineer'],
  'Electrical Engineer': ['electrical engineering', 'electronics', 'circuit', 'pcb', 'embedded', 'power systems', 'electrical design'],
  'HR Manager': ['human resources', 'hr', 'recruitment', 'talent acquisition', 'employee relations', 'hr manager', 'people operations'],
  'Financial Analyst': ['finance', 'financial analysis', 'accounting', 'excel', 'financial modeling', 'budgeting', 'forecasting', 'cpa', 'cfa'],
  'Project Manager': ['project management', 'pmp', 'project manager', 'stakeholder management', 'waterfall', 'agile', 'project planning'],
  'UX Designer': ['ux', 'ui', 'user experience', 'user interface', 'figma', 'sketch', 'adobe xd', 'wireframes', 'prototyping'],
  'Quality Assurance Engineer': ['qa', 'quality assurance', 'testing', 'test automation', 'selenium', 'manual testing', 'test cases'],
  'Operations Manager': ['operations', 'operations management', 'supply chain', 'logistics', 'process improvement', 'lean', 'six sigma']
};

function FakeXchangeEngine() {
  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [matchScore, setMatchScore] = useState(0);
  const [splitFee, setSplitFee] = useState(0);
  const [jobTitle, setJobTitle] = useState('');

  // Track when component is viewed
  useEffect(() => {
    trackEvent('fake_engine_viewed', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter'
    });
  }, []);

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        resolve(text);
      };
      reader.readAsText(file);
    });
  };

  const extractJobTitle = (cvText: string): string | null => {
    const textLower = cvText.toLowerCase();
    
    // Common CV section headers that precede job titles
    const experienceSectionPatterns = [
      /(?:professional experience|work experience|employment history|experience|career history|work history)[:\s]*([\s\S]{0,2000}?)(?=education|skills|qualifications|certifications|references|$)/gi,
      /(?:current role|current position|present)[:\s]*([\s\S]{0,500}?)(?=\n\n|education|skills)/gi,
      /(?:job title|position|role)[:\s]*([^\n]{5,100})/gi,
    ];

    // Try to extract from experience sections first
    for (const pattern of experienceSectionPatterns) {
      const matches = cvText.match(pattern);
      if (matches && matches.length > 0) {
        const experienceSection = matches[0];
        
        // Search for job title patterns in this section
        for (const titlePattern of JOB_TITLE_PATTERNS) {
          const titleMatches = experienceSection.match(titlePattern);
          if (titleMatches && titleMatches.length > 0) {
            // Get the first (most recent) job title
            const extractedTitle = titleMatches[0].trim();
            
            // Check for specialties to append
            const specialties: string[] = [];
            for (const specialtyPattern of SPECIALTY_PATTERNS) {
              const specialtyMatches = cvText.match(specialtyPattern);
              if (specialtyMatches && specialtyMatches.length > 0) {
                specialties.push(specialtyMatches[0].trim());
              }
            }
            
            // Capitalize properly
            let finalTitle = extractedTitle
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join(' ');
            
            // Append specialty if found - Use Array.from instead of spread
            if (specialties.length > 0) {
              const capitalizedSpecialties = specialties.map(s => 
                s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
              );
              const uniqueSpecialties = Array.from(new Set(capitalizedSpecialties));
              finalTitle = `${finalTitle} - ${uniqueSpecialties[0]}`;
            }
            
            return finalTitle;
          }
        }
      }
    }

    // Fallback: Search entire document for job title patterns
    for (const titlePattern of JOB_TITLE_PATTERNS) {
      const titleMatches = cvText.match(titlePattern);
      if (titleMatches && titleMatches.length > 0) {
        const extractedTitle = titleMatches[0].trim();
        
        // Check for specialties
        const specialties: string[] = [];
        for (const specialtyPattern of SPECIALTY_PATTERNS) {
          const specialtyMatches = cvText.match(specialtyPattern);
          if (specialtyMatches && specialtyMatches.length > 0) {
            specialties.push(specialtyMatches[0].trim());
          }
        }
        
        let finalTitle = extractedTitle
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
        
        // Use Array.from instead of spread
        if (specialties.length > 0) {
          const capitalizedSpecialties = specialties.map(s => 
            s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ')
          );
          const uniqueSpecialties = Array.from(new Set(capitalizedSpecialties));
          finalTitle = `${finalTitle} - ${uniqueSpecialties[0]}`;
        }
        
        return finalTitle;
      }
    }

    return null;
  };

  const findBestMatchFromKeywords = (cvText: string): string => {
    const textLower = cvText.toLowerCase();
    let bestMatch = 'Senior Software Engineer'; // default fallback
    let highestScore = 0;

    Object.entries(jobMappings).forEach(([role, keywords]) => {
      let score = 0;
      keywords.forEach(keyword => {
        if (textLower.includes(keyword.toLowerCase())) {
          score += 1;
        }
      });

      if (score > highestScore) {
        highestScore = score;
        bestMatch = role;
      }
    });

    return bestMatch;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Track CV upload
    trackEvent('fake_engine_cv_uploaded', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter'
    });

    setPhase('uploading');

    try {
      // Extract text from file
      const cvText = await extractTextFromFile(file);
      
      // Try to extract actual job title from CV first (PRIORITY)
      let matchedJob = extractJobTitle(cvText);
      
      // If no job title found, fallback to keyword matching
      if (!matchedJob) {
        matchedJob = findBestMatchFromKeywords(cvText);
      }

      // Generate random results with matched job
      const randomScore = Math.floor(Math.random() * (97 - 85 + 1)) + 85;
      const randomFee = Math.floor(Math.random() * (9000 - 4500 + 1)) + 4500;

      setMatchScore(randomScore);
      setSplitFee(randomFee);
      setJobTitle(matchedJob);

      // Continue animation sequence
      setTimeout(() => setPhase('matching'), 800);
      setTimeout(() => {
        setPhase('result');
        
        // Track result shown
        trackEvent('fake_engine_result_shown', {
          page: '/recruiters-with-candidates',
          persona: 'recruiter',
          matched_job: matchedJob,
          match_score: randomScore,
          split_fee: randomFee
        });
      }, 2800);
    } catch (error) {
      console.error('CV parsing error:', error);
      // If parsing fails, use keyword-based fallback
      const fallbackJob = 'Senior Software Engineer';
      const randomScore = Math.floor(Math.random() * (97 - 85 + 1)) + 85;
      const randomFee = Math.floor(Math.random() * (9000 - 4500 + 1)) + 4500;

      setMatchScore(randomScore);
      setSplitFee(randomFee);
      setJobTitle(fallbackJob);

      setTimeout(() => setPhase('matching'), 800);
      setTimeout(() => {
        setPhase('result');
        
        trackEvent('fake_engine_result_shown', {
          page: '/recruiters-with-candidates',
          persona: 'recruiter',
          matched_job: fallbackJob,
          match_score: randomScore,
          split_fee: randomFee
        });
      }, 2800);
    }

    // Clear the input so same file can be uploaded again
    e.target.value = '';
  };

  const resetEngine = () => {
    trackEvent('fake_engine_try_another_clicked', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter',
      matched_job: jobTitle,
      match_score: matchScore,
      split_fee: splitFee
    });
    setPhase('idle');
  };

  const handleSignupClick = () => {
    trackEvent('fake_engine_signup_clicked', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter',
      cta_text: 'See Live Roles',
      matched_job: jobTitle,
      match_score: matchScore,
      split_fee: splitFee
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
      {/* Left: Animated Core */}
      <div className="relative flex items-center justify-center min-h-[400px]">
        <div className="relative w-80 h-80">
          {/* Outer Ring 1 - Cyan - Rotates Clockwise */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            style={{
              borderTopColor: 'rgba(0, 255, 255, 0.4)',
              borderRightColor: 'rgba(0, 255, 255, 0.2)',
            }}
            animate={{
              rotate: phase === 'matching' ? 360 : 0,
            }}
            transition={{
              duration: phase === 'matching' ? 2 : 4,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'linear'
            }}
          />

          {/* Outer Ring 2 - Fuchsia - Rotates Counter-Clockwise */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-transparent"
            style={{
              borderBottomColor: 'rgba(199, 29, 241, 0.4)',
              borderLeftColor: 'rgba(199, 29, 241, 0.2)',
            }}
            animate={{
              rotate: phase === 'matching' ? -360 : 0,
            }}
            transition={{
              duration: phase === 'matching' ? 2.5 : 5,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'linear'
            }}
          />

          {/* Core - Gradient Sphere */}
          <motion.div
            className="absolute inset-16 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_60px_rgba(0,255,255,0.3)]"
            animate={{
              scale: phase === 'matching' ? [1, 1.1, 1] : 1,
              boxShadow: phase === 'result' 
                ? '0 0 80px rgba(34, 197, 94, 0.6)' 
                : phase === 'matching'
                ? ['0 0 60px rgba(0,255,255,0.3)', '0 0 100px rgba(199,29,241,0.5)', '0 0 60px rgba(0,255,255,0.3)']
                : '0 0 60px rgba(0,255,255,0.3)'
            }}
            transition={{
              duration: phase === 'matching' ? 1 : 0.5,
              repeat: phase === 'matching' ? Infinity : 0,
              ease: 'easeInOut'
            }}
          >
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            
            {/* Status indicator in center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {phase === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <Upload size={32} className="mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Ready</p>
                  </motion.div>
                )}
                {phase === 'uploading' && (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-xs font-bold uppercase tracking-widest">Uploading</p>
                  </motion.div>
                )}
                {phase === 'matching' && (
                  <motion.div
                    key="matching"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-white text-center"
                  >
                    <Cpu size={32} className="mx-auto mb-2 animate-pulse" />
                    <p className="text-xs font-bold uppercase tracking-widest">Matching</p>
                  </motion.div>
                )}
                {phase === 'result' && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-green-400 text-center"
                  >
                    <Check size={40} className="mx-auto mb-2" strokeWidth={3} />
                    <p className="text-xs font-bold uppercase tracking-widest">Match Found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Upload & Results */}
      <div className="glass-card p-10 rounded-[2.5rem] border-purple-400/10">
        <h3 className="text-2xl font-bold mb-6 gradient-text">Try the Xchange Engine</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Upload a candidate CV and watch the AI find matching roles in real-time. All data stays in your browser and is deleted immediately.
        </p>

        {phase !== 'result' ? (
          <div>
            <label className="block w-full cursor-pointer">
              <div className="relative w-full py-6 px-8 rounded-2xl border-2 border-dashed border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all text-center group">
                <Upload size={32} className="mx-auto mb-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                <p className="text-sm font-bold text-white mb-1">Upload Candidate CV</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX, or TXT (browser only, not stored)</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
                disabled={phase !== 'idle'}
              />
            </label>

            {(phase === 'uploading' || phase === 'matching') && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-xl bg-purple-400/5 border border-purple-400/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <p className="text-xs text-gray-400 font-medium">
                    {phase === 'uploading' ? 'Extracting job title and skills from CV...' : 'Scanning 100+ live roles for matches...'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/20">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-[10px] text-green-400 font-black uppercase tracking-widest mb-2">Match Found</p>
                  <h4 className="text-2xl font-bold text-white mb-1">{jobTitle}</h4>
                  <p className="text-xs text-gray-500">RecX Direct Role</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Match Score</p>
                  <p className="text-3xl font-bold gradient-text tabular-nums">{matchScore}%</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Estimated Split Fee</p>
                <p className="text-4xl font-bold gradient-text tabular-nums">${splitFee.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetEngine}
                className="flex-1 py-4 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all"
              >
                Try Another
              </button>
              <Link
                href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}"
                onClick={handleSignupClick}
                className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] text-white text-sm font-bold uppercase tracking-widest text-center transition-all"
              >
                See Live Roles
              </Link>
            </div>

            <p className="text-xs text-gray-600 text-center italic">
              Sign up to access real matching on 100+ live roles
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function RecruiterCandidatesPage() {
  // Track page view
  useEffect(() => {
    trackEvent('page_viewed', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter'
    });
  }, []);

  return (
    <div className="w-full pb-20 pt-24 px-6 max-w-[1200px] mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 mb-6 font-bold">
            Monetize Your Database
          </span>
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6 tracking-tight leading-tight pb-2">
            AI-Powered Candidate Matching
          </h1>
          <div className="pulse-underline mb-8 mx-auto" />
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Stop letting your goldmine of candidates gather dust. Share your database with the Xchange Engine and let our AI find the roles they were meant for.
          </p>
        </motion.div>
      </div>

      {/* Fake Xchange Engine Demo */}
      <FakeXchangeEngine />

      {/* Main Feature: The Database Sync */}
      <div className="grid lg:grid-cols-2 gap-12 items-stretch mb-32">
        <div className="glass-card p-12 rounded-[3rem] border-l-4 border-cyan-400/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Database size={200} />
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Utilize Your Existing <span className="text-cyan-400">Database</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              The Xchange Engine automatically analyzes your CVs and profiles to extract meaningful insights like skill compatibility, career trajectory, and industry relevance. It then matches these candidates across multiple dimensions to the best-suited roles on the platform.
            </p>
            <ul className="space-y-4">
              {[
                "Semantic matching beyond simple keywords",
                "Continuous 24/7 background scanning",
                "Instant notifications for high-quality role matches"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                  <Zap size={16} className="text-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Visual Proof: The Match Screenshot - Now Matching Height */}
        <div className="flex flex-col">
          <div className="relative group flex-1">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl h-full flex flex-col">
              <div className="flex items-center justify-between px-6 py-3 border-b border-white/5 bg-white/5">
                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest italic">Xchange Engine — AI Match Analysis</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500/20" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
                  <div className="w-2 h-2 rounded-full bg-green-500/20" />
                </div>
              </div>
              <div className="flex-1 flex items-center justify-center p-6">
                <img 
                  src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/Match.png" 
                  alt="System Match Interface" 
                  className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity object-contain"
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center italic leading-relaxed">
            A real Xchange Match between recruiters, pulled from our RecXchange Platform
          </p>
        </div>
      </div>

      {/* Trust Cards: Analysis & Discovery */}
      <div className="grid md:grid-cols-2 gap-8 mb-32">
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-fuchsia-400">
              <Cpu size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Multi-Dimensional Analysis</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                Our AI evaluates candidates based on location fit, experience alignment, and work model preferences (remote/hybrid) to ensure every match is viable.
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-8 rounded-3xl border-white/5">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-white/5 rounded-2xl text-white">
              <Bell size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-2 text-white">Automated Discovery</h4>
              <p className="text-gray-500 text-xs leading-relaxed">
                The engine re-calculates matches dynamically as new roles are added, ensuring your candidates never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative: The 270M Candidate Search */}
      <div className="glass-card p-12 lg:p-20 rounded-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-400/5 to-transparent pointer-events-none" />
        <Globe className="mx-auto text-fuchsia-400 mb-8 opacity-50" size={64} />
        <h2 className="text-4xl font-bold mb-6">
          No Candidates? <span className="gradient-text">No Problem.</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-12 text-lg">
          If your internal database doesn&apos;t have the right fit, tap into our global AI search engine. Access over 270 million candidate profiles instantly to find exactly who you need.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" 
            onClick={() => trackEvent('cta_clicked', { 
              page: '/recruiters-with-candidates',
              cta_text: 'Start AI Search',
              cta_location: '270M candidate search section',
              persona: 'recruiter'
            })}
            className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <Search size={18} /> Start AI Search
          </Link>
          <a 
            href="https://apollo.io" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_clicked', { 
              page: '/recruiters-with-candidates',
              cta_text: 'Our Data Provider',
              cta_location: '270M candidate search section',
              persona: 'recruiter'
            })}
            className="px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all"
          >
            Our Data Provider
          </a>
        </div>
      </div>
    </div>
  );
}
