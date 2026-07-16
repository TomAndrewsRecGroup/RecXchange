import {
  ALL_DEMO_ROLES,
  convertToUSD,
  type APIResponse,
  type Role,
} from './data';

export interface RolesResult {
  total: number;
  lastUpdated: string;
  roles: Role[];
  demo: boolean;
  /**
   * Why the fallback set was served (only present when demo is true).
   * Deliberately non-sensitive; safe to expose for diagnostics.
   */
  fallbackReason?: string;
}

// Overridable so staging/tests can point at a different platform instance.
const PLATFORM_ROLES_URL =
  process.env.RECX_PLATFORM_ROLES_URL ??
  'https://app.recxchange.io/api/public/roles';

/**
 * The curated fallback set carries fixed authoring dates that age out and
 * make the board look stale. Re-spread them across the last three weeks,
 * preserving relative order, so the fallback still reads as a live board.
 */
function refreshDemoDates(roles: Role[]): Role[] {
  const ordered = [...roles].sort(
    (a, b) => new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
  );
  const now = Date.now();
  const windowMs = 21 * 24 * 60 * 60 * 1000;
  const step = windowMs / Math.max(1, ordered.length - 1);
  const remapped = new Map<string, string>();
  ordered.forEach((role, i) => {
    const ts = now - windowMs + step * i - 2 * 60 * 60 * 1000;
    remapped.set(role.id, new Date(ts).toISOString());
  });
  return roles.map((role) => ({
    ...role,
    postedAt: remapped.get(role.id) ?? role.postedAt,
  }));
}

/**
 * Fetch live roles from the platform, falling back to the curated demo set
 * when the platform API is unreachable or returns bad data. Shared by the
 * /api/roles route and the server-rendered /roles pages so both always agree.
 */
export async function getRoles(): Promise<RolesResult> {
  const demoResult = (fallbackReason: string): RolesResult => ({
    total: ALL_DEMO_ROLES.length,
    lastUpdated: new Date().toISOString(),
    roles: refreshDemoDates(ALL_DEMO_ROLES),
    demo: true,
    fallbackReason,
  });

  const apiKey = process.env.RECX_PLATFORM_API_KEY;
  if (!apiKey) {
    return demoResult('RECX_PLATFORM_API_KEY is not set in this environment');
  }

  try {
    const response = await fetch(PLATFORM_ROLES_URL, {
      headers: { 'x-api-key': apiKey, Accept: 'application/json' },
      // ISR: pages and the API route re-fetch the platform every 5 minutes.
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return demoResult(
        `platform API responded ${response.status} (401/403 usually means the key value is wrong or was rotated)`
      );
    }

    // A 200 with an HTML body means the platform served its app shell for an
    // unknown path - i.e. the roles endpoint does not exist at this URL.
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('json')) {
      return demoResult(
        `platform responded 200 with '${contentType}' instead of JSON - the endpoint URL is wrong or the public roles API is not enabled on the platform (set RECX_PLATFORM_ROLES_URL to the correct endpoint)`
      );
    }

    let data: APIResponse;
    try {
      data = await response.json();
    } catch {
      return demoResult('platform response claimed JSON but failed to parse');
    }
    if (!data.roles || !Array.isArray(data.roles)) {
      return demoResult('platform API responded 200 but without a roles array');
    }

    const filteredRoles = data.roles.filter((role) => {
      if (role.source === 'recx_direct') return true;
      if (role.source === 'xchange' && role.splitAmount && role.splitCurrency) {
        return convertToUSD(role.splitAmount, role.splitCurrency) >= 1000;
      }
      return false;
    });

    return {
      total: filteredRoles.length,
      lastUpdated: data.lastUpdated,
      roles: filteredRoles,
      demo: false,
    };
  } catch (error) {
    console.error('[roles] Error fetching live roles:', error);
    return demoResult('network error reaching the platform API');
  }
}

export async function getRoleById(id: string): Promise<Role | null> {
  const { roles } = await getRoles();
  return roles.find((r) => r.id === id) ?? null;
}
