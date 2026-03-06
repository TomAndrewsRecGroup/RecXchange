'use client';

import { useState } from 'react';

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
        alert('✅ Recruiter email sent successfully! Check your inbox.');
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
        alert('✅ Hiring Manager email sent successfully! Check your inbox.');
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

  const testQuickAction = async (actionType: 'match_candidate' | 'explain_recx_direct', key: 'qa3roles' | 'qaRecruiterRecx' | 'qaHmRecx', userType: string) => {
    setLoading({ ...loading, [key]: true });
    setResults({ ...results, [key]: null });
    
    try {
      const response = await fetch('/api/quick-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Test',
          lastName: 'User',
          email: process.env.NEXT_PUBLIC_TEST_EMAIL || 'test@example.com',
          actionType,
          source: '/test-email',
          industries: actionType === 'match_candidate' ? ['Technology', 'Finance'] : undefined,
          marketingConsent: true,
        }),
      });
      
      const data = await response.json();
      setResults({ ...results, [key]: { success: response.ok, status: response.status, data } });
      
      if (response.ok) {
        alert(`✅ ${userType} email sent successfully! Check your inbox.`);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Email Test Page
        </h1>
        <p className="text-gray-400 mb-8 text-sm">Test all weekly funnel emails and quick action auto-responses</p>
        
        <div className="space-y-6">
          {/* Weekly Funnel Emails */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-white">📊 Weekly Funnel Emails</h2>
            <p className="text-gray-400 text-sm mb-6">These are sent automatically every Monday at 9am UTC</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* Recruiter Email */}
              <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-3 text-cyan-400">💼 Recruiter Funnel</h3>
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
                <h3 className="text-lg font-semibold mb-3 text-purple-400">📋 Hiring Manager Funnel</h3>
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
            <p className="text-gray-400 text-sm mb-6">These are sent immediately when users submit quick action forms</p>
            
            <div className="space-y-4">
              {/* Send 3 Roles */}
              <div className="bg-white/5 backdrop-blur-md border border-green-500/30 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2 text-green-400">📧 "Send me 3 matching roles"</h3>
                <p className="text-gray-400 text-xs mb-3">Recruiter quick action from /recruiters-with-candidates</p>
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
                <p className="text-gray-400 text-xs mb-3">Recruiter RecX Direct request from /recruiter-roles or /pricing</p>
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
                <p className="text-gray-400 text-xs mb-3">Hiring Manager RecX Direct request from /hiring-manager</p>
                <button
                  onClick={() => testQuickAction('explain_recx_direct', 'qaHmRecx', 'RecX Direct explainer (Hiring Manager)')}
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
              <li>Click "Check Health" buttons to verify endpoints are working (no email sent)</li>
              <li>Click "Send Test Email" to actually send the email to your inbox</li>
              <li>Check the response JSON below the buttons for details</li>
              <li>Quick action emails go to the email defined in the request (default: test@example.com)</li>
            </ol>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-xs"><strong>⚠️ Note:</strong> Quick action test emails use a test email address. To receive them in your inbox, update NEXT_PUBLIC_TEST_EMAIL in your environment variables.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
