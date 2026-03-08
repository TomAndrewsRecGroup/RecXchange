/**
 * Last Updated Component
 * 
 * Displays when page content was last updated.
 * Important for SEO freshness signals and user trust.
 */

interface LastUpdatedProps {
  date: string; // ISO 8601 format: "2026-03-08"
  className?: string;
}

export default function LastUpdated({ date, className = '' }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`text-xs text-gray-500 ${className}`}>
      <time dateTime={date}>
        Last updated: {formattedDate}
      </time>
    </div>
  );
}
