import type { FrictionFinding, FrictionReport } from './types';

const VAGUE = new Set(['consultant', 'professional', 'various', 'tbd']);

/**
 * Mirrors services/friction/app/scorer.py so the Xchange editor can show
 * live meters before the API persists scores. Server scores win after save.
 */
export function previewFriction(input: {
  title?: string;
  description?: string;
  location?: string;
  salary_min?: number | null;
  salary_max?: number | null;
  must_haves?: string[] | null;
  role_kind?: string;
  proposed_owner_bps?: number | null;
  proposed_partner_bps?: number | null;
}): FrictionReport {
  const findings: FrictionFinding[] = [];
  let advert = 100;
  let split = 100;

  const title = (input.title || '').trim();
  const words = title.split(/\s+/).filter(Boolean);
  if (
    words.length < 4 ||
    words.some((w) => VAGUE.has(w.toLowerCase().replace(/[.,]/g, '')))
  ) {
    advert -= 25;
    findings.push({
      code: 'TITLE_VAGUE',
      severity: 'warn',
      message: 'Title is vague. Name the job, not a category.',
    });
  }

  if (!(input.location || '').trim()) {
    advert -= 20;
    findings.push({
      code: 'LOCATION_MISSING',
      severity: 'warn',
      message: 'No location. Recruiter traffic will be weak.',
    });
  }

  const salaryMin = Number(input.salary_min || 0);
  const salaryMax = Number(input.salary_max || 0);
  if (salaryMin <= 0 && salaryMax <= 0) {
    advert -= 15;
    findings.push({
      code: 'SALARY_MISSING',
      severity: 'warn',
      message: 'No salary. Recruiter traffic will be weak.',
    });
  } else if (salaryMax && salaryMin && salaryMax < salaryMin) {
    advert -= 30;
    findings.push({
      code: 'SALARY_INCOHERENT',
      severity: 'block',
      message: 'Salary max is below min. Fix the band before you publish.',
    });
  }

  if ((input.description || '').length < 400) {
    advert -= 20;
    findings.push({
      code: 'DESCRIPTION_THIN',
      severity: 'warn',
      message: 'Description is thin. Spell out the work, not the vibe.',
    });
  }

  if (!input.must_haves || input.must_haves.length === 0) {
    advert -= 15;
    findings.push({
      code: 'MUST_HAVES_MISSING',
      severity: 'warn',
      message: 'No must-haves. Partners will guess, and guess wrong.',
    });
  }

  const owner = Number(input.proposed_owner_bps || 0);
  const partner = Number(input.proposed_partner_bps || 0);
  if ((input.role_kind || '').toLowerCase() === 'xchange') {
    if (owner + partner !== 10000) {
      split = 0;
      findings.push({
        code: 'SPLIT_INVALID',
        severity: 'block',
        message: 'Owner and partner shares must add to 100%.',
      });
    } else if (partner < 2000) {
      split -= 60;
      findings.push({
        code: 'SPLIT_HOSTILE',
        severity: 'block',
        message: 'A split this hostile will not attract the network.',
      });
    } else if (partner < 3000) {
      split -= 40;
      findings.push({
        code: 'SPLIT_UNATTRACTIVE',
        severity: 'warn',
        message:
          partner <= 1000
            ? 'A 90/10 split will not attract the network.'
            : 'Partner share is thin. The network will skip this.',
      });
    }
  }

  advert = Math.max(0, Math.min(100, advert));
  split = Math.max(0, Math.min(100, split));

  let verdict: FrictionReport['verdict'] = 'ok';
  if (findings.some((f) => f.severity === 'block')) verdict = 'block';
  else if (advert < 50 || ((input.role_kind || '') === 'xchange' && split < 50)) {
    verdict = 'warn';
  }

  return { advert_score: advert, split_score: split, verdict, findings };
}
