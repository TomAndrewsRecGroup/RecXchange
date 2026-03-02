'use client';

/**
 * Client component for managing cookie preferences
 * Used in the cookie-policy page to allow users to reopen the consent banner
 */
export default function ManageCookiesButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cookie-consent');
      window.location.reload();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-lg hover:shadow-lg transition-all"
    >
      Manage Cookie Preferences
    </button>
  );
}
