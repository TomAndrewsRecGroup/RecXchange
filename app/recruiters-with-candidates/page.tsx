"use client";
import React, { useState, useEffect } from "react";
import { Database, Search, Zap, Cpu, Bell, Globe, Upload, Check } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@u0040/lib/analytics';

type EnginePhase = 'idle' | 'uploading' | 'matching' | 'result';

// Enhanced job title patterns with more specific matching
const JOB_TITLE_PATTERNS = [
  /\b(registered nurse|nurse practitioner|clinical nurse specialist|nurse manager|charge nurse|staff nurse|community nurse|district nurse|practice nurse|school nurse|occupational health nurse|mental health nurse|learning disability nurse|children's nurse|neonatal nurse|midwife|student nurse)\b/gi,
  /\b(senior (nurse|nursing)|lead nurse|advanced (nurse|nursing) practitioner|consultant nurse|nurse educator|nurse researcher)\b/gi,
  /\b(consultant|registrar|foundation doctor|junior doctor|senior house officer|specialist registrar|staff grade|associate specialist|clinical fellow)\b/gi,
  /\b(general practitioner|gp partner|salaried gp|locum gp|gp registrar|medical director|clinical director)\b/gi,
  /\b(consultant (surgeon|physician|psychiatrist|radiologist|cardiologist|anesthetist|dermatologist|neurologist|pediatrician|oncologist))\b/gi,
  /\b(pharmacist|clinical pharmacist|hospital pharmacist|community pharmacist|pharmacy manager|principal pharmacist)\b/gi,
  /\b(physiotherapist|occupational therapist|speech (and )?language therapist|clinical psychologist|counseling psychologist|educational psychologist)\b/gi,
  /\b(paramedic|emergency care practitioner|ambulance technician|emergency medical technician)\b/gi,
  /\b(dentist|dental surgeon|orthodontist|dental hygienist|dental therapist|dental nurse)\b/gi,
  /\b(radiographer|diagnostic radiographer|therapeutic radiographer|sonographer|medical imaging)\b/gi,
  /\b(healthcare assistant|nursing assistant|support worker|care assistant|senior (healthcare|care) assistant)\b/gi,
  /\b(ward manager|clinical manager|matron|modern matron|service manager|operations manager|healthcare manager)\b/gi,
  /\b(mechanical engineer|senior mechanical engineer|principal mechanical engineer|lead mechanical engineer|chief mechanical engineer)\b/gi,
  /\b(civil engineer|senior civil engineer|structural engineer|site engineer|project engineer|geotechnical engineer)\b/gi,
  /\b(electrical engineer|senior electrical engineer|power systems engineer|control systems engineer|instrumentation engineer)\b/gi,
  /\b(software engineer|senior software engineer|lead software engineer|principal software engineer|staff software engineer)\b/gi,
  /\b(full[\s-]?stack (developer|engineer)|frontend (developer|engineer)|backend (developer|engineer)|web developer)\b/gi,
  /\b(devops engineer|site reliability engineer|cloud engineer|infrastructure engineer|platform engineer)\b/gi,
  /\b(data engineer|ml engineer|machine learning engineer|ai engineer|mlops engineer)\b/gi,
  /\b(chemical engineer|process engineer|production engineer|manufacturing engineer|quality engineer)\b/gi,
  /\b(aerospace engineer|automotive engineer|marine engineer|biomedical engineer|environmental engineer)\b/gi,
];

const ABBREVIATION_EXPANSIONS: Record<string, string> = {
  'rn': 'Registered Nurse',
  'gp': 'General Practitioner',
  'sho': 'Senior House Officer',
  'fy1': 'Foundation Year 1 Doctor',
  'fy2': 'Foundation Year 2 Doctor',
  'st1': 'Specialty Trainee Year 1',
  'cna': 'Certified Nursing Assistant',
  'lpn': 'Licensed Practical Nurse',
  'emt': 'Emergency Medical Technician',
  'qa': 'Quality Assurance Engineer',
  'ba': 'Business Analyst',
  'pa': 'Personal Assistant',
  'hr': 'Human Resources Manager',
  'it': 'IT Manager',
};

const jobMappings: Record<string, string[]> = {
  'Senior Software Engineer': ['software', 'developer', 'programming', 'javascript', 'python', 'java', 'react', 'node', 'frontend', 'backend', 'full stack', 'web dev'],
  'Data Scientist': ['data science', 'machine learning', 'ml', 'analytics', 'statistics', 'data analysis', 'pandas', 'tensorflow'],
  'DevOps Engineer': ['devops', 'kubernetes', 'docker', 'aws', 'azure', 'cloud', 'ci/cd', 'jenkins', 'terraform', 'infrastructure'],
  'Product Manager': ['product management', 'product manager', 'roadmap', 'agile', 'scrum', 'stakeholder', 'user stories', 'product owner'],
  'Sales Director': ['sales', 'business development', 'account management', 'revenue', 'b2b', 'enterprise sales', 'crm', 'salesforce', 'closing deals'],
  'Marketing Director': ['marketing', 'digital marketing', 'seo', 'sem', 'social media', 'content marketing', 'campaigns', 'brand', 'growth marketing'],
  'Mechanical Engineer': ['mechanical engineering', 'cad', 'solidworks', 'autocad', 'manufacturing', 'design engineer', 'mechanical design', 'product design', 'engineering drawings'],
};

function FakeXchangeEngine() {
  const [phase, setPhase] = useState<EnginePhase>('idle');
  const [matchScore, setMatchScore] = useState(0);
  const [splitFee, setSplitFee] = useState(0);
  const [jobTitle, setJobTitle] = useState('');

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
    const experienceSectionPatterns = [
      /(?:professional experience|work experience|employment history|experience|career history|work history)[:\s]*([\s\S]{0,2000}?)(?=education|skills|qualifications|certifications|references|$)/gi,
      /(?:current role|current position|present)[:\s]*([\s\S]{0,500}?)(?=\n\n|education|skills)/gi,
      /(?:job title|position|role)[:\s]*([^\n]{5,100})/gi,
    ];

    for (const pattern of experienceSectionPatterns) {
      const matches = cvText.match(pattern);
      if (matches && matches.length > 0) {
        const experienceSection = matches[0];
        
        for (const titlePattern of JOB_TITLE_PATTERNS) {
          const titleMatches = experienceSection.match(titlePattern);
          if (titleMatches && titleMatches.length > 0) {
            let extractedTitle = titleMatches[0].trim();
            
            const lowerTitle = extractedTitle.toLowerCase();
            if (ABBREVIATION_EXPANSIONS[lowerTitle]) {
              extractedTitle = ABBREVIATION_EXPANSIONS[lowerTitle];
            }
            
            if (!ABBREVIATION_EXPANSIONS[lowerTitle]) {
              extractedTitle = extractedTitle
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            }
            
            return extractedTitle;
          }
        }
      }
    }

    for (const titlePattern of JOB_TITLE_PATTERNS) {
      const titleMatches = cvText.match(titlePattern);
      if (titleMatches && titleMatches.length > 0) {
        let extractedTitle = titleMatches[0].trim();
        
        const lowerTitle = extractedTitle.toLowerCase();
        if (ABBREVIATION_EXPANSIONS[lowerTitle]) {
          extractedTitle = ABBREVIATION_EXPANSIONS[lowerTitle];
        }
        
        if (!ABBREVIATION_EXPANSIONS[lowerTitle]) {
          extractedTitle = extractedTitle
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
        }
        
        return extractedTitle;
      }
    }

    return null;
  };

  const findBestMatchFromKeywords = (cvText: string): string => {
    const textLower = cvText.toLowerCase();
    let bestMatch = 'Senior Software Engineer';
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

    trackEvent('fake_engine_cv_uploaded', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter'
    });

    setPhase('uploading');

    try {
      const cvText = await extractTextFromFile(file);
      
      let matchedJob = extractJobTitle(cvText);
      
      if (!matchedJob) {
        matchedJob = findBestMatchFromKeywords(cvText);
      }

      const randomScore = Math.floor(Math.random() * (97 - 85 + 1)) + 85;
      const randomFee = Math.floor(Math.random() * (9000 - 4500 + 1)) + 4500;

      setMatchScore(randomScore);
      setSplitFee(randomFee);
      setJobTitle(matchedJob);

      setTimeout(() => setPhase('matching'), 800);
      setTimeout(() => {
        setPhase('result');
        
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
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px_1fr] xl:grid-cols-[1fr_400px_1fr] gap-6 sm:gap-8 lg:gap-6 items-start mb-16 sm:mb-20 md:mb-24 lg:mb-32">
      {/* Left: Upload & Results */}
      <div className="glass-card p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border-purple-400/10">
        <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 gradient-text">Try the Xchange Engine</h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
          Upload a candidate CV and watch the AI find matching roles in real-time. All data stays in your browser and is deleted immediately.
        </p>

        {phase !== 'result' ? (
          <div>
            <label className="block w-full cursor-pointer">
              <div className="relative w-full py-5 sm:py-6 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 border-dashed border-cyan-400/30 bg-cyan-400/5 hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all text-center group">
                <Upload size={28} className="mx-auto mb-2 sm:mb-3 text-cyan-400 group-hover:scale-110 transition-transform sm:w-8 sm:h-8" />
                <p className="text-xs sm:text-sm font-bold text-white mb-1">Upload Candidate CV</p>
                <p className="text-[10px] sm:text-xs text-gray-500">PDF, DOC, DOCX, or TXT</p>
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
                className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-purple-400/5 border border-purple-400/10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-pulse" />
                  <p className="text-[10px] sm:text-xs text-gray-400 font-medium">
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
            className="space-y-4 sm:space-y-6"
          >
            <div className="p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500/10 to-cyan-500/10 border border-green-400/20">
              <div className="flex items-start justify-between mb-4 sm:mb-6 gap-2">
                <div>
                  <p className="text-[9px] sm:text-[10px] text-green-400 font-black uppercase tracking-widest mb-1.5 sm:mb-2">Match Found</p>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-0.5 sm:mb-1">{jobTitle}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500">RecX Direct Role</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-0.5 sm:mb-1">Match Score</p>
                  <p className="text-2xl sm:text-3xl font-bold gradient-text tabular-nums">{matchScore}%</p>
                </div>
              </div>

              <div className="pt-4 sm:pt-6 border-t border-white/10">
                <p className="text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1.5 sm:mb-2">Estimated Split Fee</p>
                <p className="text-3xl sm:text-4xl font-bold gradient-text tabular-nums">${splitFee.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={resetEngine}
                className="flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest transition-all"
              >
                Try Another
              </button>
              <Link
                href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}"
                onClick={handleSignupClick}
                className="flex-1 py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] text-white text-xs sm:text-sm font-bold uppercase tracking-[0.12em] sm:tracking-[0.15em] md:tracking-widest text-center transition-all"
              >
                See Live Roles
              </Link>
            </div>

            <p className="text-[10px] sm:text-xs text-gray-600 text-center italic">
              Sign up to access real matching on 100+ live roles
            </p>
          </motion.div>
        )}
      </div>

      {/* Middle: Animated Core - Hidden on mobile, shown on LG+ */}
      <div className="hidden lg:flex relative items-center justify-center min-h-[400px]">
        <div className="relative w-56 h-56 xl:w-64 xl:h-64">
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

          <motion.div
            className="absolute inset-12 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-fuchsia-500 shadow-[0_0_60px_rgba(0,255,255,0.3)]"
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
            
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
                    <Upload size={28} className="mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Ready</p>
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
                    <div className="w-7 h-7 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-2" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Uploading</p>
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
                    <Cpu size={28} className="mx-auto mb-2 animate-pulse" />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Matching</p>
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
                    <Check size={36} className="mx-auto mb-2" strokeWidth={3} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Match Found</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right: Utilize Database */}
      <div className="glass-card p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] border-l-4 border-cyan-400/30 relative overflow-hidden flex flex-col justify-between h-full">
        <div>
          <div className="absolute top-0 right-0 p-6 sm:p-8 opacity-5">
            <Database size={120} className="sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px]" />
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
            Utilize Your Existing <span className="text-cyan-400">Database</span>
          </h2>
          <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-xs sm:text-sm">
            The Xchange Engine automatically analyzes your CVs and profiles to extract meaningful insights like skill compatibility, career trajectory, and industry relevance. It then matches these candidates across multiple dimensions to the best-suited roles on the platform.
          </p>
          <ul className="space-y-3 sm:space-y-4">
            {[
              "Semantic matching beyond simple keywords",
              "Continuous 24/7 background scanning",
              "Instant notifications for high-quality role matches"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-300">
                <Zap size={14} className="text-cyan-400 flex-shrink-0 sm:w-4 sm:h-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterCandidatesPage() {
  useEffect(() => {
    trackEvent('page_viewed', {
      page: '/recruiters-with-candidates',
      persona: 'recruiter'
    });
  }, []);

  return (
    <div className="w-full pb-12 sm:pb-16 md:pb-20 pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] md:tracking-[0.4em] text-cyan-400/60 mb-3 sm:mb-4 md:mb-6 font-bold">
            Monetize Your Database
          </span>
          <h1 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-3 sm:mb-4 md:mb-6 tracking-tight leading-[1.1] pb-2 px-2">
            AI-Powered Candidate Matching
          </h1>
          <div className="pulse-underline mb-4 sm:mb-6 md:mb-8 mx-auto" />
          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed px-2">
            Stop letting your goldmine of candidates gather dust. Share your database with the Xchange Engine and let our AI find the roles they were meant for.
          </p>
        </motion.div>
      </div>

      <FakeXchangeEngine />

      {/* Visual Proof */}
      <div className="mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-xl sm:rounded-2xl md:rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative glass-card rounded-xl sm:rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-black shadow-2xl">
            <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 border-b border-white/5 bg-white/5">
              <span className="text-[8px] sm:text-[9px] font-bold text-gray-500 uppercase tracking-widest italic">Xchange Engine — AI Match Analysis</span>
              <div className="flex gap-1 sm:gap-1.5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500/20" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500/20" />
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500/20" />
              </div>
            </div>
            <div className="p-4 sm:p-6 md:p-8">
              <img 
                src="https://haaqtnq6favvrbuh.public.blob.vercel-storage.com/Match.png" 
                alt="System Match Interface" 
                className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-3 sm:mt-4 text-center italic leading-relaxed px-2">
          A real Xchange Match between recruiters, pulled from our RecXchange Platform
        </p>
      </div>

      {/* Trust Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 md:mb-24 lg:mb-32">
        <div className="glass-card p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-white/5">
          <div className="flex gap-3 sm:gap-4 items-start">
            <div className="p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl text-fuchsia-400 flex-shrink-0">
              <Cpu size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Multi-Dimensional Analysis</h4>
              <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
                Our AI evaluates candidates based on location fit, experience alignment, and work model preferences (remote/hybrid) to ensure every match is viable.
              </p>
            </div>
          </div>
        </div>
        <div className="glass-card p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border-white/5">
          <div className="flex gap-3 sm:gap-4 items-start">
            <div className="p-2 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl text-white flex-shrink-0">
              <Bell size={20} className="sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-bold mb-1.5 sm:mb-2 text-white text-sm sm:text-base">Automated Discovery</h4>
              <p className="text-gray-500 text-[11px] sm:text-xs leading-relaxed">
                The engine re-calculates matches dynamically as new roles are added, ensuring your candidates never miss an opportunity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 270M Search Section */}
      <div className="glass-card p-8 sm:p-12 lg:p-20 rounded-2xl sm:rounded-3xl md:rounded-[4rem] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-400/5 to-transparent pointer-events-none" />
        <Globe className="mx-auto text-fuchsia-400 mb-6 sm:mb-8 opacity-50" size={48} />
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
          No Candidates? <span className="gradient-text">No Problem.</span>
        </h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8 sm:mb-12 text-sm sm:text-base md:text-lg px-2">
          If your internal database doesn&apos;t have the right fit, tap into our global AI search engine. Access over 270 million candidate profiles instantly to find exactly who you need.
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
          <Link 
            href="{{trigger_link.Hc9mpfL0JxjX06kwNpd1}}" 
            onClick={() => trackEvent('cta_clicked', { 
              page: '/recruiters-with-candidates',
              cta_text: 'Search 270M Candidates',
              cta_location: '270M candidate search section',
              persona: 'recruiter'
            })}
            className="px-6 sm:px-10 py-3 sm:py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Search size={16} className="sm:w-[18px] sm:h-[18px]" /> Search 270M Candidates
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
            className="px-6 sm:px-10 py-3 sm:py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-all text-sm sm:text-base"
          >
            Our Data Provider
          </a>
        </div>
      </div>
    </div>
  );
}
