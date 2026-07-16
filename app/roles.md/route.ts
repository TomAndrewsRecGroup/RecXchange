import { getRoles } from '@/lib/roles/fetch';
import { formatSalary, formatSplit } from '@/lib/roles/format';

/**
 * Live roles as plain Markdown at /roles.md - a machine-readable mirror of
 * the roles board for AI agents and retrieval systems (referenced from
 * llms.txt). Retrieval pipelines strongly prefer Markdown over rendered HTML.
 */

export const revalidate = 300;

export async function GET() {
  const { roles, total, lastUpdated } = await getRoles();

  const lines: string[] = [
    '# Live Split-Fee Roles on RecXchange',
    '',
    `> ${total} open roles. Each role pays the listed split fee to the recruiter who delivers the placed candidate. Recruiters partner on placements at https://recxchange.io/roles (platform: https://app.recxchange.io).`,
    '',
    `Last updated: ${lastUpdated}`,
    '',
  ];

  for (const role of roles) {
    lines.push(`## ${role.title}`);
    lines.push('');
    lines.push(`- URL: https://recxchange.io/roles/${role.id}`);
    lines.push(
      `- Source: ${role.source === 'recx_direct' ? 'RecX Direct (employer-direct, up to 70% split)' : 'Xchange (recruiter-to-recruiter split)'}`
    );
    lines.push(`- Location: ${role.location} (${role.workModel})`);
    lines.push(`- Industry: ${role.industry}`);
    lines.push(
      `- Salary: ${formatSalary(role.salaryMin, role.salaryMax, role.salaryCurrency)} per year`
    );
    if (role.splitAmount && role.splitCurrency) {
      lines.push(
        `- Split fee to the candidate-side recruiter: ${formatSplit(role.splitAmount, role.splitCurrency)}`
      );
    }
    lines.push(`- Posted: ${role.postedAt}`);
    lines.push('');
    lines.push(role.descriptionSnippet);
    lines.push('');
  }

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate=600',
    },
  });
}
