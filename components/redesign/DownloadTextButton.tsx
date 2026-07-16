'use client';

/**
 * Downloads the given text content as a file, client-side.
 * Used for the split-fee agreement template.
 */
export default function DownloadTextButton({
  content,
  filename,
  label,
}: {
  content: string;
  filename: string;
  label: string;
}) {
  const onClick = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white bg-[linear-gradient(100deg,#8b5cf6,#3b82f6_55%,#22d3ee)] shadow-[0_2px_16px_rgba(139,92,246,0.4)] transition-all duration-300 hover:shadow-[0_2px_24px_rgba(59,130,246,0.55)] hover:-translate-y-px motion-reduce:transition-none"
    >
      {label}
    </button>
  );
}
