'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings } from 'lucide-react';

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // Load existing preferences
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
        applyConsent(savedPrefs);
      } catch (e) {
        console.error('Failed to parse cookie consent:', e);
      }
    }
  }, []);

  const applyConsent = (prefs: typeof preferences) => {
    // Analytics (Vercel, Funnel tracking)
    if (prefs.analytics) {
      // Enable Vercel Analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track');
      }
    }

    // Marketing (future integrations)
    if (prefs.marketing) {
      // Enable marketing pixels when added
    }

    // Dispatch event for other components to listen to
    window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: prefs }));
  };

  const saveConsent = (prefs: typeof preferences) => {
    const consentData = {
      ...prefs,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    localStorage.setItem('cookie-consent', JSON.stringify(consentData));
    setPreferences(prefs);
    applyConsent(prefs);
    setShowBanner(false);
    setShowPreferences(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  };

  const savePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[300] p-4 sm:p-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0a0a0f]/98 backdrop-blur-xl border border-cyan-400/30 rounded-2xl shadow-2xl overflow-hidden">
            {!showPreferences ? (
              // Simple banner view
              <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Icon and Text */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-white font-bold text-sm sm:text-base mb-1">
                          We use cookies
                        </h3>
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                          We use essential cookies to make our site work. With your consent, we may also use analytics cookies to improve your experience. You can customize your preferences or reject optional cookies.
                        </p>
                      </div>
                    </div>
                    <Link
                      href="/cookie-policy"
                      className="text-cyan-400 hover:text-cyan-300 text-xs underline transition-colors"
                    >
                      View our Cookie Policy
                    </Link>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 sm:min-w-[200px]">
                    <button
                      onClick={acceptAll}
                      className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      Accept All
                    </button>
                    <button
                      onClick={rejectAll}
                      className="w-full px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                    >
                      Reject Optional
                    </button>
                    <button
                      onClick={() => setShowPreferences(true)}
                      className="w-full px-4 py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Settings size={16} />
                      Customize
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Preferences view
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-base sm:text-lg flex items-center gap-2">
                    <Settings size={20} className="text-cyan-400" />
                    Cookie Preferences
                  </h3>
                  <button
                    onClick={() => setShowPreferences(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        Necessary Cookies
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Essential for the website to function. Cannot be disabled.
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 font-medium">Always Active</span>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        Analytics Cookies
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Help us understand how visitors interact with our website (Vercel Analytics, funnel tracking).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-white/5 border border-white/10 rounded-lg">
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm mb-1">
                        Marketing Cookies
                      </h4>
                      <p className="text-gray-400 text-xs leading-relaxed">
                        Used to track visitors across websites for advertising purposes (currently not used).
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-cyan-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={savePreferences}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all"
                  >
                    Save Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/20 transition-all"
                  >
                    Accept All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
