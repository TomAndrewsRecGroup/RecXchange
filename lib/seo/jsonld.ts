/**
 * Serialize structured data for embedding in a <script type="application/ld+json">.
 *
 * JSON.stringify alone is NOT safe here: it does not escape "<", so a string
 * containing "</script>" (e.g. inside user-generated role descriptions from
 * the platform) would terminate the script tag and inject markup into the
 * page. Escaping "<" as < is the standard fix and remains valid JSON.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
