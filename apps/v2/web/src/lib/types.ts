export type Plan = 'guest' | 'entry' | 'lite' | 'pro';
export type RoleKind = 'direct' | 'xchange' | 'referral';
export type RoleStatus = 'draft' | 'open' | 'paused' | 'filled' | 'archived';
export type Urgency = 'standard' | 'high' | 'urgent';
export type PipelineStage =
  | 'applied'
  | 'screening'
  | 'interview'
  | 'offer'
  | 'placed';

export interface User {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  is_admin: boolean;
}

export interface Client {
  id: string;
  owner_user_id?: string;
  name: string;
  sector?: string | null;
  status?: string | null;
  created_at?: string;
}

export interface Contact {
  id: string;
  client_id: string;
  name: string;
  email?: string | null;
  role_title?: string | null;
}

export interface FrictionFinding {
  code: string;
  severity: 'ok' | 'warn' | 'block' | string;
  message: string;
}

export interface FrictionReport {
  advert_score?: number;
  split_score?: number;
  verdict?: 'ok' | 'warn' | 'block' | string;
  findings?: FrictionFinding[];
}

export interface Role {
  id: string;
  owner_user_id?: string;
  client_id?: string | null;
  kind: RoleKind;
  title: string;
  description?: string | null;
  location?: string | null;
  city?: string | null;
  country?: string | null;
  salary_min?: number | null;
  salary_max?: number | null;
  currency?: string | null;
  bounty_amount?: number | null;
  proposed_split_owner_bps?: number | null;
  proposed_split_partner_bps?: number | null;
  urgency?: Urgency | string | null;
  status?: RoleStatus | string | null;
  client_identity_public?: boolean;
  client_hidden?: boolean;
  client?: Client | null;
  client_name?: string | null;
  read_only?: boolean;
  must_haves?: string[] | null;
  friction_advert_score?: number | null;
  friction_split_score?: number | null;
  friction_report?: FrictionReport | FrictionFinding[] | null;
  friction_verdict?: string | null;
  created_at?: string;
}

export interface Candidate {
  id: string;
  owner_user_id?: string;
  display_name: string;
  headline?: string | null;
  location?: string | null;
  salary_expectation?: number | null;
  skills?: string[] | null;
  systems?: string[] | null;
  evidence?: string | null;
  source_label?: string | null;
  created_at?: string;
}

export interface Application {
  id: string;
  role_id: string;
  candidate_id: string;
  submitter_user_id?: string;
  status: PipelineStage | string;
  submitted_at?: string;
  ownership_timestamp?: string;
  created_at?: string;
  candidate?: Candidate | null;
  role?: Role | null;
}

export interface Note {
  id: string;
  entity_type: string;
  entity_id: string;
  author_id?: string;
  author_name?: string | null;
  body: string;
  created_at?: string;
}

export interface Automation {
  id: string;
  type: string;
  payload?: unknown;
  status: 'pending' | 'done' | 'failed' | string;
  created_at?: string;
  processed_at?: string | null;
}

export interface AuditEntry {
  id?: string;
  actor_id?: string;
  actor_email?: string;
  action: string;
  entity_type?: string;
  entity_id?: string;
  payload?: unknown;
  created_at?: string;
}

export interface PublicStats {
  open_roles?: number;
  roles?: number;
  direct?: number;
  xchange?: number;
  referral?: number;
  applications?: number;
}

export interface XraySearchInput {
  keywords?: string;
  title?: string;
  location?: string;
  skills?: string[];
  systems?: string[];
  salary_min?: number;
  salary_max?: number;
}

export interface XrayResult {
  candidate: Candidate;
  score: number;
  why?: string[];
  reasons?: string[];
  evidence?: string | null;
  concerns?: string[];
  verify?: string[];
  verify_on_screen?: string[];
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
  };
  findings?: FrictionFinding[];
}

export interface SplitQuote {
  recx_bps: number;
  recruiter_bps: number;
  partner_bps: number;
  display?: string;
}

export const PIPELINE_STAGES: PipelineStage[] = [
  'applied',
  'screening',
  'interview',
  'offer',
  'placed',
];

export const ROLE_KINDS: RoleKind[] = ['direct', 'xchange', 'referral'];
