const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CAD: 'C$',
  AUD: 'A$',
  SGD: 'S$',
  AED: 'AED ',
  INR: '₹',
  ZAR: 'R',
};

export function formatSalary(min: number, max: number, currency: string) {
  const sym = CURRENCY_SYMBOLS[currency] || `${currency} `;
  const fmt = (n: number) =>
    n >= 1000 ? `${Math.round(n / 1000)}k` : n.toString();
  return `${sym}${fmt(min)}-${fmt(max)}`;
}

export function formatSplit(amount: number, currency: string) {
  const sym = CURRENCY_SYMBOLS[currency] || `${currency} `;
  return `${sym}${amount.toLocaleString()}`;
}

export const WORK_MODEL_LABEL: Record<string, string> = {
  remote: 'Remote',
  hybrid: 'Hybrid',
  onsite: 'On-site',
};
