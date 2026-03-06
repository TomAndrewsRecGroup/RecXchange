'use client';

import { useState } from 'react';

export default function TestDashboard() {
  const [ghlResults, setGhlResults] = useState<any>(null);
  const [emailResults, setEmailResults] = useState<any>(null);
  const [loading, setLoading] = useState({ ghl: false, email: false });

  const testGHL = async () => {
    setLoading({ ...loading, ghl: true });
    try {
      const response = await fetch('/api/test/ghl-sandbox');
      const data = await response.json();
      setGhlResults(data);
    } catch (error: any) {
      setGhlResults({ error: error.message });
    } finally {
      setLoading({ ...loading, ghl: false });
    }
  };

  const testEmail = async () => {
    setLoading({ ...loading, email: true });
    try {
      const response = await fetch('/api/test/email-audit');
      const data = await response.json();
      setEmailResults(data);
    } catch (error: any) {
      setEmailResults({ error: error.message });
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  const sendTestEmail = async (type: 'recruiter' | 'hm') => {
    setLoading({ ...loading, email: true });
    try {
      const response = await fetch(`/api/test/email-audit?sendTest=${type}`);
      const data = await response.json();
      setEmailResults(data);
      alert(
        data.testEmailResult?.sent
          ? `✅ ${data.testEmailResult.type} email sent successfully!`
          : `❌ Failed to send email: ${data.testEmailResult?.error || 'Unknown error'}`
      );
    } catch (error: any) {
      alert(`❌ Error: ${error.message}`);
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
      case 'configured':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'error':
      case 'missing':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            RecXchange Testing Dashboard
          </h1>
          <p className="text-gray-400">Comprehensive testing for GHL integrations and weekly email systems</p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-cyan-400">🔗</span>
              GHL Integration Tests
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Tests all GoHighLevel API endpoints including location, contacts, tags, and tier tracking.
            </p>
            <button
              onClick={testGHL}
              disabled={loading.ghl}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading.ghl ? 'Testing...' : 'Run GHL Tests'}
            </button>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
              <span className="text-purple-400">📧</span>
              Weekly Email Audit
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Audits email system configuration, environment variables, and endpoint availability.
            </p>
            <button
              onClick={testEmail}
              disabled={loading.email}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading.email ? 'Auditing...' : 'Run Email Audit'}
            </button>
          </div>
        </div>

        {/* GHL Results */}
        {ghlResults && (
          <div className="mb-8 bg-white/5 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-cyan-400">GHL Test Results</h3>

            {/* Summary */}
            {ghlResults.summary && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400">{ghlResults.summary.totalTests}</div>
                  <div className="text-sm text-gray-400">Total Tests</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{ghlResults.summary.passed}</div>
                  <div className="text-sm text-gray-400">Passed</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{ghlResults.summary.failed}</div>
                  <div className="text-sm text-gray-400">Failed</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-gray-300">{ghlResults.summary.totalTime}</div>
                  <div className="text-sm text-gray-400">Total Time</div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {ghlResults.recommendations && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-400">Recommendations</h4>
                <ul className="space-y-1 text-sm">
                  {ghlResults.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-2 text-gray-400">Endpoint</th>
                    <th className="text-left p-2 text-gray-400">Method</th>
                    <th className="text-left p-2 text-gray-400">Status</th>
                    <th className="text-left p-2 text-gray-400">Time</th>
                    <th className="text-left p-2 text-gray-400">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {ghlResults.results?.map((result: any, i: number) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="p-2 font-mono text-xs">{result.endpoint}</td>
                      <td className="p-2">
                        <span className="px-2 py-1 rounded bg-white/10 text-xs">{result.method}</span>
                      </td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded border text-xs ${getStatusBadge(result.status)}`}>
                          {result.status}
                        </span>
                      </td>
                      <td className="p-2 text-gray-400">{result.responseTime ? `${result.responseTime}ms` : '-'}</td>
                      <td className="p-2 text-xs">
                        {result.error ? (
                          <span className="text-red-400">{result.error}</span>
                        ) : result.data ? (
                          <pre className="text-gray-400 max-w-md overflow-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        ) : (
                          '-'
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Email Results */}
        {emailResults && (
          <div className="mb-8 bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 text-purple-400">Email System Audit</h3>

            {/* Summary */}
            {emailResults.summary && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{emailResults.summary.total}</div>
                  <div className="text-sm text-gray-400">Components</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{emailResults.summary.configured}</div>
                  <div className="text-sm text-gray-400">Configured</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-red-400">{emailResults.summary.missing}</div>
                  <div className="text-sm text-gray-400">Missing</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg">
                  <div className={`text-2xl font-bold ${emailResults.summary.readyToSend ? 'text-green-400' : 'text-red-400'}`}>
                    {emailResults.summary.readyToSend ? '✓' : '✗'}
                  </div>
                  <div className="text-sm text-gray-400">Ready to Send</div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {emailResults.recommendations && (
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold mb-2 text-blue-400">Recommendations</h4>
                <ul className="space-y-1 text-sm">
                  {emailResults.recommendations.map((rec: string, i: number) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Configuration Results */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3">Configuration Status</h4>
              <div className="space-y-2">
                {emailResults.results?.map((result: any, i: number) => (
                  <div key={i} className="flex items-start justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{result.component}</div>
                      <div className="text-sm text-gray-400">{result.details}</div>
                      {result.action && <div className="text-xs text-yellow-400 mt-1">→ {result.action}</div>}
                    </div>
                    <span className={`px-3 py-1 rounded border text-xs ml-4 ${getStatusBadge(result.status)}`}>
                      {result.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cron Jobs */}
            {emailResults.cronJobs && (
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Scheduled Cron Jobs</h4>
                <div className="space-y-3">
                  {emailResults.cronJobs.map((job: any, i: number) => (
                    <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{job.name}</div>
                        <span className={`px-2 py-1 rounded text-xs ${job.configured ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {job.configured ? 'Ready' : 'Not Configured'}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <div className="text-gray-400">Schedule: <span className="text-white font-mono text-xs">{job.schedule}</span></div>
                        <div className="text-gray-400">Endpoint: <span className="text-cyan-400 font-mono text-xs">{job.endpoint}</span></div>
                        <div className="text-gray-400">Notes: <span className="text-white">{job.notes}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Test Email Buttons */}
            {emailResults.summary?.readyToSend && (
              <div className="border-t border-white/10 pt-6">
                <h4 className="font-semibold mb-3">Send Test Emails</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => sendTestEmail('recruiter')}
                    disabled={loading.email}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    💼 Send Recruiter Test Email
                  </button>
                  <button
                    onClick={() => sendTestEmail('hm')}
                    disabled={loading.email}
                    className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    📋 Send Hiring Manager Test Email
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Testing Instructions</h3>
          <div className="space-y-4 text-sm text-gray-300">
            <div>
              <h4 className="font-semibold text-cyan-400 mb-2">GHL Integration Tests</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Tests all GoHighLevel API endpoints for recruiters and hiring managers</li>
                <li>Verifies location, contacts, tags, and tier tracking</li>
                <li>Creates and deletes test contacts to verify write permissions</li>
                <li>Provides recommendations if any issues are found</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Email System Audit</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Checks all required environment variables (SendGrid, GHL, recipient)</li>
                <li>Verifies email API endpoints are deployed and accessible</li>
                <li>Lists cron job configuration for weekly automated emails</li>
                <li>Allows sending test emails to verify full email delivery</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
