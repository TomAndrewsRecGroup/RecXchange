'use client';

import { useState } from 'react';
import { generateMatchCandidateEmail } from '@/lib/emails/templates/match-candidate-email';
import { generateHowItWorksRecruiterEmail } from '@/lib/emails/templates/how-it-works-recruiter';
import { generateHowItWorksHiringManagerEmail } from '@/lib/emails/templates/how-it-works-hiring-manager';
import { generateRecruiterFunnelEmail } from '@/lib/emails/templates/recruiter-funnel';
import { generateHiringManagerFunnelEmail } from '@/lib/emails/templates/hiring-manager-funnel';

type EmailTemplate = 'match-candidate' | 'how-it-works-recruiter' | 'how-it-works-hiring-manager' | 'recruiter-funnel' | 'hiring-manager-funnel';

export default function TestEmailPage() {
  const [loading, setLoading] = useState({ 
    recruiter: false, 
    hm: false,
    qa3roles: false,
    qaRecruiterRecx: false,
    qaHmRecx: false,
  });
  const [results, setResults] = useState<any>({ 
    recruiter: null, 
    hm: null,
    qa3roles: null,
    qaRecruiterRecx: null,
    qaHmRecx: null,
  });
  const [testEmail, setTestEmail] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<EmailTemplate>('match-candidate');
  const [previewFirstName, setPreviewFirstName] = useState('Tom');
  const [previewIndustries, setPreviewIndustries] = useState('Technology,Finance');

  const templates: Record<EmailTemplate, { label: string; description: string; generator: (firstName: string, industries?: string[]) => string }> = {
    'match-candidate': {
      label: '3 Matching Roles',
      description: 'Shows 3 industry-specific roles with full details',
      generator: (firstName, industries) => generateMatchCandidateEmail(firstName, industries || [])
    },
    'how-it-works-recruiter': {
      label: 'How It Works (Recruiter)',
      description: 'Complete RecXchange explainer for recruiters',
      generator: (firstName) => generateHowItWorksRecruiterEmail(firstName)
    },
    'how-it-works-hiring-manager': {
      label: 'How It Works (Hiring Manager)',
      description: 'Platform benefits for hiring managers/clients',
      generator: (firstName) => generateHowItWorksHiringManagerEmail(firstName)
    },
    'recruiter-funnel': {
      label: 'Recruiter Onboarding',
      description: 'Welcome and onboarding email for new recruiters',
      generator: (firstName) => generateRecruiterFunnelEmail(firstName)
    },
    'hiring-manager-funnel': {
      label: 'Hiring Manager Onboarding',
      description: 'Welcome and onboarding email for new clients',
      generator: (firstName) => generateHiringManagerFunnelEmail(firstName)
    }
  };

  const getPreviewHTML = () => {
    const template = templates[previewTemplate];
    const industryArray = previewIndustries.split(',').map(i => i.trim()).filter(Boolean);
    return template.generator(previewFirstName, industryArray);
  };

  const testRecruiterEmail = async () => {
    setLoading({ ...loading, recruiter: true });
    setResults({ ...results, recruiter: null });
    
    try {
      const response = await fetch('/api/analytics/email-recruiter-funnel', {
        method: 'POST',
      });
      
      const data = await response.json();
      setResults({ ...results, recruiter: { success: response.ok, status: response.status, data } });
      
      if (response.ok) {
        alert('✅ Recruiter funnel analytics email sent successfully! Check your inbox.');
      } else {
        alert(`❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setResults({ ...results, recruiter: { success: false, error: error.message } });
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading({ ...loading, recruiter: false });
    }
  };

  const testHMEmail = async () => {
    setLoading({ ...loading, hm: true });
    setResults({ ...results, hm: null });
    
    try {
      const response = await fetch('/api/analytics/email-hiring-manager-funnel', {
        method: 'POST',
      });
      
      const data = await response.json();
      setResults({ ...results, hm: { success: response.ok, status: response.status, data } });
      
      if (response.ok) {
        alert('✅ Hiring Manager funnel analytics email sent successfully! Check your inbox.');
      } else {
        alert(`❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setResults({ ...results, hm: { success: false, error: error.message } });
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading({ ...loading, hm: false });
    }
  };

  const testQuickAction = async (actionType: 'match_candidate' | 'explain_recx_direct' | 'explain_recx_direct_hm', key: 'qa3roles' | 'qaRecruiterRecx' | 'qaHmRecx', userType: string) => {
    const emailToUse = testEmail.trim() || undefined;
    
    if (!emailToUse) {
      alert('⚠️ Please enter your email address in the input field above to receive test emails.');
      return;
    }

    setLoading({ ...loading, [key]: true });
    setResults({ ...results, [key]: null });
    
    try {
      const response = await fetch('/api/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: emailToUse,
          actionType,
          source: '/test-email',
          industries: actionType === 'match_candidate' ? ['Technology', 'Finance'] : undefined,
          marketingConsent: true,
        }),
      });
      
      const data = await response.json();
      setResults({ ...results, [key]: { success: response.ok, status: response.status, data } });
      
      if (response.ok) {
        alert(`✅ ${userType} email sent to ${emailToUse}! Check your inbox.`);
      } else {
        alert(`❌ Failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setResults({ ...results, [key]: { success: false, error: error.message } });
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading({ ...loading, [key]: false });
    }
  };

  const checkHealth = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      alert(JSON.stringify(data, null, 2));
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-8">
        <div className="max-width-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                📧 Email Template Preview
              </h1>
              <p className="text-gray-400 text-sm mt-2">Live preview of quick action email templates</p>
            </div>
            <button
              onClick={() => setShowPreview(false)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-lg transition-all"
            >
              ← Back to Tests
            </button>
          </div>

          <div className="grid grid-cols-[300px_1fr] gap-8">
            {/* Left Sidebar */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-fit sticky top-8">
              <h3 className="text-lg font-semibold mb-4">Select Template</h3>
              
              {Object.entries(templates).map(([key, { label, description }]) => (
                <button
                  key={key}
                  onClick={() => setPreviewTemplate(key as EmailTemplate)}
                  className={`w-full text-left p-4 mb-3 rounded-xl transition-all ${
                    previewTemplate === key
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-500 border-0'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{label}</div>
                  <div className={`text-xs ${previewTemplate === key ? 'text-white/90' : 'text-gray-400'}`}>
                    {description}
                  </div>
                </button>
              ))}

              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-sm font-semibold mb-4">Customization</h3>
                
                <label className="block mb-4">
                  <span className="text-xs text-gray-400 font-semibold mb-2 block">First Name</span>
                  <input
                    type="text"
                    value={previewFirstName}
                    onChange={(e) => setPreviewFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm"
                  />
                </label>

                {previewTemplate === 'match-candidate' && (
                  <label className="block mb-4">
                    <span className="text-xs text-gray-400 font-semibold mb-2 block">Industries (comma-separated)</span>
                    <input
                      type="text"
                      value={previewIndustries}
                      onChange={(e) => setPreviewIndustries(e.target.value)}
                      placeholder="Technology,Finance,Healthcare"
                      className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg text-white text-sm"
                    />
                  </label>
                )}

                <button
                  onClick={() => {
                    const html = getPreviewHTML();
                    navigator.clipboard.writeText(html);
                    alert('✅ HTML copied to clipboard!');
                  }}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                >
                  📋 Copy HTML
                </button>
              </div>
            </div>

            {/* Right Preview */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                srcDoc={getPreviewHTML()}
                className="w-full h-[85vh] border-0"
                title="Email Preview"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Email Test Page
            </h1>
            <p className="text-gray-400 mb-8 text-sm">Test all weekly funnel emails and quick action auto-responses</p>
          </div>
          <button
            onClick={() => setShowPreview(true)}
            className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 border-0 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-purple-500/30 hover:scale-105"
          >
            👁️ Preview Email Templates
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Weekly Funnel Emails */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">📊 Weekly Funnel Analytics Emails</h2>
            <p className="text-gray-400 text-sm mb-6">These are sent automatically every Monday at 9am UTC to {process.env.NEXT_PUBLIC_FUNNEL_EMAIL_TO || 'your analytics email'}</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Recruiter Email */}
              <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">💼 Recruiter Funnel Analytics</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => checkHealth('/api/analytics/email-recruiter-funnel')}
                    className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-cyan-500/50 hover:border-cyan-400 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02]"
                  >
                    Check Health
                  </button>
                  <button
                    onClick={testRecruiterEmail}
                    disabled={loading.recruiter}
                    className="w-full bg-gradient-to-r from-cyan-500/80 to-cyan-600/80 backdrop-blur-md hover:from-cyan-500 hover:to-cyan-600 disabled:from-gray-600/50 disabled:to-gray-600/50 border border-cyan-400/30 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-cyan-500/50 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading.recruiter ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
                {results.recruiter && (
                  <div className="bg-black/50 backdrop-blur-lg border border-cyan-500/20 p-3 rounded-lg shadow-lg mt-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results.recruiter, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Hiring Manager Email */}
              <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3 text-purple-400">📋 Hiring Manager Funnel Analytics</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => checkHealth('/api/analytics/email-hiring-manager-funnel')}
                    className="w-full bg-white/5 backdrop-blur-md hover:bg-white/10 border border-purple-500/50 hover:border-purple-400 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02]"
                  >
                    Check Health
                  </button>
                  <button
                    onClick={testHMEmail}
                    disabled={loading.hm}
                    className="w-full bg-gradient-to-r from-purple-500/80 to-purple-600/80 backdrop-blur-md hover:from-purple-500 hover:to-purple-600 disabled:from-gray-600/50 disabled:to-gray-600/50 border border-purple-400/30 text-white text-sm font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-purple-500/50 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading.hm ? 'Sending...' : 'Send Test Email'}
                  </button>
                </div>
                {results.hm && (
                  <div className="bg-black/50 backdrop-blur-lg border border-purple-500/20 p-3 rounded-lg shadow-lg mt-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results.hm, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Action Emails */}
          <div className="bg-white/10 backdrop-blur-xl border border-green-500/20 rounded-2xl p-6 shadow-2xl shadow-green-500/10">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">⚡ Quick Action Auto-Response Emails</h2>
            <p className="text-gray-400 text-sm mb-4">These are sent immediately when users submit quick action forms</p>
            
            {/* Email Input */}
            <div className="mb-6 bg-white/5 backdrop-blur-md border border-green-500/30 rounded-xl p-4">
              <label htmlFor="test-email" className="block text-sm font-semibold text-green-400 mb-2">
                Your Email (to receive test emails):
              </label>
              <input
                id="test-email"
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="tom@andrewsrecruitmentgroup.com"
                className="w-full bg-black/50 backdrop-blur-sm border border-green-500/30 text-white placeholder-gray-500 px-4 py-3 rounded-lg focus:outline-none focus:border-green-400 transition-colors"
              />
              <p className="text-xs text-gray-400 mt-2">Enter your email to receive the quick action test emails</p>
            </div>
            
            <div className="space-y-4">
              {/* Send 3 Roles */}
              <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-green-400">📧 "Send me 3 matching roles"</h3>
                <p className="text-gray-400 text-xs mb-3">Template: <strong>match-candidate-email.ts</strong> - Recruiter quick action from /recruiters-with-candidates</p>
                <button
                  onClick={() => testQuickAction('match_candidate', 'qa3roles', '3 matching roles')}
                  disabled={loading.qa3roles}
                  className="w-full bg-gradient-to-r from-green-500/80 to-green-600/80 backdrop-blur-md hover:from-green-500 hover:to-green-600 disabled:from-gray-600/50 disabled:to-gray-600/50 border border-green-400/30 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-green-500/50 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading.qa3roles ? 'Sending...' : 'Send Test Email'}
                </button>
                {results.qa3roles && (
                  <div className="bg-black/50 backdrop-blur-lg border border-green-500/20 p-3 rounded-lg shadow-lg mt-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results.qa3roles, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* RecX Direct Explainer (Recruiter) */}
              <div className="bg-white/5 backdrop-blur-md border border-yellow-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-yellow-400">📧 "Email me the explainer" (Recruiter)</h3>
                <p className="text-gray-400 text-xs mb-3">Template: <strong>how-it-works-recruiter.ts</strong> - Recruiter RecX Direct request from /recruiter-roles or /pricing</p>
                <button
                  onClick={() => testQuickAction('explain_recx_direct', 'qaRecruiterRecx', 'RecX Direct explainer (Recruiter)')}
                  disabled={loading.qaRecruiterRecx}
                  className="w-full bg-gradient-to-r from-yellow-500/80 to-yellow-600/80 backdrop-blur-md hover:from-yellow-500 hover:to-yellow-600 disabled:from-gray-600/50 disabled:to-gray-600/50 border border-yellow-400/30 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-yellow-500/50 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading.qaRecruiterRecx ? 'Sending...' : 'Send Test Email'}
                </button>
                {results.qaRecruiterRecx && (
                  <div className="bg-black/50 backdrop-blur-lg border border-yellow-500/20 p-3 rounded-lg shadow-lg mt-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results.qaRecruiterRecx, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* RecX Direct Explainer (Hiring Manager) */}
              <div className="bg-white/5 backdrop-blur-md border border-orange-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-orange-400">📧 "Email me the explainer" (Hiring Manager)</h3>
                <p className="text-gray-400 text-xs mb-3">Template: <strong>how-it-works-hiring-manager.ts</strong> - Hiring Manager quick action from /hiring-manager pages</p>
                <button
                  onClick={() => testQuickAction('explain_recx_direct_hm', 'qaHmRecx', 'RecX Direct explainer (Hiring Manager)')}
                  disabled={loading.qaHmRecx}
                  className="w-full bg-gradient-to-r from-orange-500/80 to-orange-600/80 backdrop-blur-md hover:from-orange-500 hover:to-orange-600 disabled:from-gray-600/50 disabled:to-gray-600/50 border border-orange-400/30 text-white text-sm font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-xl hover:shadow-orange-500/50 hover:scale-[1.02] disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading.qaHmRecx ? 'Sending...' : 'Send Test Email'}
                </button>
                {results.qaHmRecx && (
                  <div className="bg-black/50 backdrop-blur-lg border border-orange-500/20 p-3 rounded-lg shadow-lg mt-3">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results.qaHmRecx, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-xl border border-blue-500/40 rounded-2xl p-6 shadow-2xl shadow-blue-500/10">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">ℹ️ How to Test</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li><strong>Preview Templates:</strong> Click "Preview Email Templates" button to see live rendered HTML of all quick action emails</li>
              <li><strong>Weekly Funnel Emails:</strong> These go to your FUNNEL_EMAIL_TO address automatically. Just click "Send Test Email".</li>
              <li><strong>Quick Action Emails:</strong> Enter your email in the input field above, then click the test buttons.</li>
              <li>Check "Health" buttons first to verify endpoints work (no email sent).</li>
              <li>Response JSON appears below each button with success/error details.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
