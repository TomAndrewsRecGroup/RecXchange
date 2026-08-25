import type {
  Application,
  AuditEntry,
  Automation,
  Candidate,
  Client,
  FrictionFinding,
  FrictionReport,
  Note,
  PublicStats,
  Role,
  User,
  XrayResult,
  XraySearchInput,
} from './types';

export const API_URL =
  (typeof window === 'undefined'
    ? process.env.API_URL || process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_PUBLIC_API_URL) || 'http://localhost:8080';

export class ApiError extends Error {
  code: string;
  status: number;
  findings?: FrictionFinding[];

  constructor(
    code: string,
    message: string,
    status: number,
    findings?: FrictionFinding[],
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.findings = findings;
  }
}

function unwrapUser(data: unknown): User | null {
  if (!data || typeof data !== 'object') return null;
  const rec = data as Record<string, unknown>;
  const raw = (rec.user && typeof rec.user === 'object' ? rec.user : rec) as Record<
    string,
    unknown
  >;
  if (!raw.email && !raw.id) return null;
  return {
    id: String(raw.id ?? ''),
    email: String(raw.email ?? ''),
    name: String(raw.name ?? raw.email ?? 'Member'),
    plan: (String(raw.plan ?? 'entry') as User['plan']) || 'entry',
    is_admin: Boolean(raw.is_admin ?? raw.isAdmin),
  };
}

export function asArray<T>(data: unknown, keys: string[] = []): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === 'object') {
    const rec = data as Record<string, unknown>;
    const tryKeys = [
      ...keys,
      'items',
      'data',
      'results',
      'roles',
      'clients',
      'candidates',
      'applications',
      'users',
      'notes',
      'automations',
      'audit',
      'entries',
      'contacts',
    ];
    for (const k of tryKeys) {
      const v = rec[k];
      if (Array.isArray(v)) return v as T[];
    }
  }
  return [];
}

export function asObject<T>(data: unknown, key?: string): T {
  if (data && typeof data === 'object' && key) {
    const inner = (data as Record<string, unknown>)[key];
    if (inner && typeof inner === 'object') return inner as T;
  }
  return data as T;
}

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers);
  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Accept', 'application/json');

  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    ...init,
    headers,
  });

  const text = await res.text();
  let data: unknown = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }

  if (!res.ok) {
    const rec = data && typeof data === 'object' ? (data as Record<string, unknown>) : {};
    const err = rec.error as { code?: string; message?: string } | undefined;
    const findings = rec.findings as FrictionFinding[] | undefined;
    throw new ApiError(
      err?.code ?? `HTTP_${res.status}`,
      err?.message ?? res.statusText ?? 'Request failed',
      res.status,
      findings,
    );
  }

  return data as T;
}

function get<T>(path: string): Promise<T> {
  return request<T>(path, { method: 'GET' });
}

function post<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: 'POST',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

function patch<T>(path: string, body?: unknown): Promise<T> {
  return request<T>(path, {
    method: 'PATCH',
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}

export const api = {
  async me(): Promise<User | null> {
    try {
      const data = await get<unknown>('/v1/auth/me');
      return unwrapUser(data);
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
        return null;
      }
      throw e;
    }
  },

  async login(email: string, password: string): Promise<User> {
    const data = await post<unknown>('/v1/auth/login', { email, password });
    const user = unwrapUser(data);
    if (!user) {
      throw new ApiError('LOGIN_MALFORMED', 'Login succeeded but no user was returned', 500);
    }
    return user;
  },

  async logout(): Promise<void> {
    try {
      await post('/v1/auth/logout', {});
    } catch {
      // Cookie may already be gone.
    }
  },

  async publicRoles(kind?: string): Promise<Role[]> {
    const q = kind ? `?kind=${encodeURIComponent(kind)}` : '';
    const data = await get<unknown>(`/v1/public/roles${q}`);
    return asArray<Role>(data, ['roles']);
  },

  async publicRole(id: string): Promise<Role> {
    const data = await get<unknown>(`/v1/public/roles/${id}`);
    return asObject<Role>(data, 'role');
  },

  async stats(): Promise<PublicStats> {
    try {
      const data = await get<PublicStats>('/v1/public/stats');
      return data ?? {};
    } catch {
      return {};
    }
  },

  async clients(): Promise<Client[]> {
    const data = await get<unknown>('/v1/clients');
    return asArray<Client>(data, ['clients']);
  },

  async client(id: string): Promise<Client> {
    const data = await get<unknown>(`/v1/clients/${id}`);
    return asObject<Client>(data, 'client');
  },

  createClient(body: Partial<Client>): Promise<Client> {
    return post<Client>('/v1/clients', body).then((d) => asObject<Client>(d, 'client'));
  },

  patchClient(id: string, body: Partial<Client>): Promise<Client> {
    return patch<Client>(`/v1/clients/${id}`, body).then((d) =>
      asObject<Client>(d, 'client'),
    );
  },

  async roles(params?: { client_id?: string; kind?: string }): Promise<Role[]> {
    const q = new URLSearchParams();
    if (params?.client_id) q.set('client_id', params.client_id);
    if (params?.kind) q.set('kind', params.kind);
    const suffix = q.toString() ? `?${q.toString()}` : '';
    const data = await get<unknown>(`/v1/roles${suffix}`);
    return asArray<Role>(data, ['roles']);
  },

  async role(id: string): Promise<Role> {
    try {
      const data = await get<unknown>(`/v1/roles/${id}`);
      return asObject<Role>(data, 'role');
    } catch (e) {
      if (e instanceof ApiError && (e.status === 401 || e.status === 403 || e.status === 404)) {
        return api.publicRole(id);
      }
      throw e;
    }
  },

  createRole(body: Partial<Role> & Record<string, unknown>): Promise<Role> {
    return post<Role>('/v1/roles', body).then((d) => asObject<Role>(d, 'role'));
  },

  patchRole(id: string, body: Partial<Role> & Record<string, unknown>): Promise<Role> {
    return patch<Role>(`/v1/roles/${id}`, body).then((d) => asObject<Role>(d, 'role'));
  },

  workRole(id: string): Promise<Role> {
    return post<Role>(`/v1/roles/${id}/work`, {}).then((d) => asObject<Role>(d, 'role'));
  },

  async publishRole(id: string): Promise<{ role: Role; friction?: FrictionReport }> {
    const data = await post<unknown>(`/v1/roles/${id}/publish`, {});
    const rec = (data ?? {}) as Record<string, unknown>;
    const role = asObject<Role>(rec.role ?? data, 'role');
    const friction = (rec.friction ?? rec.friction_report) as FrictionReport | undefined;
    return { role, friction };
  },

  async scoreRole(id: string, body?: Record<string, unknown>): Promise<Role> {
    try {
      const data = await post<unknown>(`/v1/roles/${id}/score`, body ?? {});
      return asObject<Role>(data, 'role');
    } catch (e) {
      if (e instanceof ApiError && (e.status === 404 || e.status === 405)) {
        if (body) await api.patchRole(id, body);
        return api.role(id);
      }
      throw e;
    }
  },

  async candidates(): Promise<Candidate[]> {
    const data = await get<unknown>('/v1/candidates');
    return asArray<Candidate>(data, ['candidates']);
  },

  createCandidate(body: Partial<Candidate>): Promise<Candidate> {
    return post<Candidate>('/v1/candidates', body).then((d) =>
      asObject<Candidate>(d, 'candidate'),
    );
  },

  async xraySearch(body: XraySearchInput): Promise<XrayResult[]> {
    const data = await post<unknown>('/v1/xray/search', body);
    const rows = asArray<XrayResult | (Candidate & { score?: number })>(data, [
      'results',
      'matches',
      'candidates',
    ]);
    return rows.map((row) => {
      const rec = row as XrayResult & Candidate & { candidate?: Candidate };
      const candidate = rec.candidate ?? (rec as unknown as Candidate);
      return {
        candidate,
        score: rec.score ?? 0,
        why: rec.why ?? rec.reasons ?? [],
        evidence: rec.evidence ?? candidate.evidence ?? null,
        concerns: rec.concerns ?? [],
        verify: rec.verify ?? rec.verify_on_screen ?? [],
      };
    });
  },

  apply(roleId: string, body: { candidate_id: string }): Promise<Application> {
    return post<Application>(`/v1/roles/${roleId}/applications`, body).then((d) =>
      asObject<Application>(d, 'application'),
    );
  },

  setStage(applicationId: string, status: string): Promise<Application> {
    return post<Application>(`/v1/applications/${applicationId}/stage`, { status }).then(
      (d) => asObject<Application>(d, 'application'),
    );
  },

  async pipeline(roleId: string): Promise<Application[]> {
    const data = await get<unknown>(`/v1/pipeline?role_id=${encodeURIComponent(roleId)}`);
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const rec = data as Record<string, unknown>;
      if (rec.stages && typeof rec.stages === 'object') {
        const stages = rec.stages as Record<string, Application[]>;
        return Object.entries(stages).flatMap(([status, apps]) =>
          (apps ?? []).map((a) => ({ ...a, status: a.status || status })),
        );
      }
    }
    return asArray<Application>(data, ['applications', 'pipeline']);
  },

  async notes(entityType: string, entityId: string): Promise<Note[]> {
    try {
      const data = await get<unknown>(
        `/v1/notes?entity_type=${encodeURIComponent(entityType)}&entity_id=${encodeURIComponent(entityId)}`,
      );
      return asArray<Note>(data, ['notes']);
    } catch (e) {
      if (e instanceof ApiError && e.status === 404) return [];
      throw e;
    }
  },

  addNote(body: { entity_type: string; entity_id: string; body: string }): Promise<Note> {
    return post<Note>('/v1/notes', body).then((d) => asObject<Note>(d, 'note'));
  },

  async automations(): Promise<Automation[]> {
    const data = await get<unknown>('/v1/automations');
    return asArray<Automation>(data, ['automations']);
  },

  async adminUsers(): Promise<User[]> {
    const data = await get<unknown>('/v1/admin/users');
    return asArray<User>(data, ['users']);
  },

  async adminPatchUser(id: string, body: Partial<User>): Promise<User> {
    const data = await patch<unknown>(`/v1/admin/users/${id}`, body);
    return unwrapUser(data) ?? (data as User);
  },

  async adminAudit(): Promise<AuditEntry[]> {
    const data = await get<unknown>('/v1/admin/audit');
    return asArray<AuditEntry>(data, ['audit', 'entries', 'logs']);
  },
};
