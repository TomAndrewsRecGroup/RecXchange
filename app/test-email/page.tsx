'use client';

import { useState } from 'react';

export default function TestEmailPage() {
  const [loading, setLoading] = useState({ recruiter: false, hm: false });
  const [results, setResults] = useState<{ recruiter: any; hm: any }>({ recruiter: null, hm: null });

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
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Email Test Page
        </h1>
        
        <div className="space-y-6">
          {/* Recruiter Email */}
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400">💼 Recruiter Email</h2>
            <div className="space-y-4">
              <button
                onClick={() => checkHealth('/api/analytics/email-recruiter-funnel')}
                className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Health (GET)
              </button>
              <button
                onClick={testRecruiterEmail}
                disabled={loading.recruiter}
                className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading.recruiter ? 'Sending...' : 'Send Test Email (POST)'}
              </button>
              {results.recruiter && (
                <div className="bg-black/50 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(results.recruiter, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Hiring Manager Email */}
          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">📋 Hiring Manager Email</h2>
            <div className="space-y-4">
              <button
                onClick={() => checkHealth('/api/analytics/email-hiring-manager-funnel')}
                className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Check Health (GET)
              </button>
              <button
                onClick={testHMEmail}
                disabled={loading.hm}
                className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading.hm ? 'Sending...' : 'Send Test Email (POST)'}
              </button>
              {results.hm && (
                <div className="bg-black/50 p-4 rounded-lg">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(results.hm, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Console Commands */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">📝 Browser Console Commands</h2>
            <p className="text-gray-400 mb-4 text-sm">
              You can also copy/paste these into your browser console (F12 → Console tab):
            </p>
            
            <div className="space-y-4">
              <div>
                <p className="text-cyan-400 text-sm mb-2">Test Recruiter Email:</p>
                <div className="bg-black/50 p-3 rounded font-mono text-xs overflow-x-auto">
                  fetch('/api/analytics/email-recruiter-funnel', {'{'}method: 'POST'{'}'}).then(r =&gt; r.json()).then(console.log)
                </div>
              </div>
              
              <div>
                <p className="text-purple-400 text-sm mb-2">Test Hiring Manager Email:</p>
                <div className="bg-black/50 p-3 rounded font-mono text-xs overflow-x-auto">
                  fetch('/api/analytics/email-hiring-manager-funnel', {'{'}method: 'POST'{'}'}).then(r =&gt; r.json()).then(console.log)
                </div>
              </div>
              
              <div>
                <p className="text-green-400 text-sm mb-2">Check Health (Recruiter):</p>
                <div className="bg-black/50 p-3 rounded font-mono text-xs overflow-x-auto">
                  fetch('/api/analytics/email-recruiter-funnel').then(r =&gt; r.json()).then(console.log)
                </div>
              </div>
              
              <div>
                <p className="text-green-400 text-sm mb-2">Check Health (Hiring Manager):</p>
                <div className="bg-black/50 p-3 rounded font-mono text-xs overflow-x-auto">
                  fetch('/api/analytics/email-hiring-manager-funnel').then(r =&gt; r.json()).then(console.log)
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">How to Test</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-300">
              <li>Click "Check Health" buttons to verify endpoints are working (no email sent)</li>
              <li>Click "Send Test Email" to actually send the email to your inbox</li>
              <li>Check the response JSON below the buttons for details</li>
              <li>Or use the console commands in your browser's developer tools (F12)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
