-- RecXchange v2 initial schema. UUIDs, timestamptz, parameterised from Go.

CREATE TABLE IF NOT EXISTS users (
    id              UUID PRIMARY KEY,
    email           TEXT NOT NULL UNIQUE,
    password_hash   TEXT NOT NULL,
    name            TEXT NOT NULL,
    plan            TEXT NOT NULL CHECK (plan IN ('guest', 'entry', 'lite', 'pro')),
    is_admin        BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at      TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS sessions (
    id          UUID PRIMARY KEY,
    user_id     UUID NOT NULL REFERENCES users (id),
    token_hash  TEXT NOT NULL UNIQUE,
    expires_at  TIMESTAMPTZ NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS audit_log (
    id          UUID PRIMARY KEY,
    actor_id    UUID REFERENCES users (id),
    action      TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id   UUID,
    payload     JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS clients (
    id             UUID PRIMARY KEY,
    owner_user_id  UUID NOT NULL REFERENCES users (id),
    name           TEXT NOT NULL,
    sector         TEXT NOT NULL DEFAULT '',
    status         TEXT NOT NULL DEFAULT 'active',
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at     TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS contacts (
    id         UUID PRIMARY KEY,
    client_id  UUID NOT NULL REFERENCES clients (id),
    name       TEXT NOT NULL,
    email      TEXT NOT NULL DEFAULT '',
    role_title TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS roles (
    id                          UUID PRIMARY KEY,
    owner_user_id               UUID NOT NULL REFERENCES users (id),
    client_id                   UUID REFERENCES clients (id),
    kind                        TEXT NOT NULL CHECK (kind IN ('direct', 'xchange', 'referral')),
    title                       TEXT NOT NULL,
    description                 TEXT NOT NULL DEFAULT '',
    location                    TEXT NOT NULL DEFAULT '',
    city                        TEXT NOT NULL DEFAULT '',
    country                     TEXT NOT NULL DEFAULT '',
    salary_min                  INTEGER NOT NULL DEFAULT 0,
    salary_max                  INTEGER NOT NULL DEFAULT 0,
    currency                    TEXT NOT NULL DEFAULT 'GBP',
    bounty_amount               INTEGER NOT NULL DEFAULT 0,
    proposed_split_owner_bps    INTEGER NOT NULL DEFAULT 5000,
    proposed_split_partner_bps  INTEGER NOT NULL DEFAULT 5000,
    urgency                     TEXT NOT NULL DEFAULT 'standard' CHECK (urgency IN ('standard', 'high', 'urgent')),
    status                      TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'paused', 'filled', 'archived')),
    client_identity_public      BOOLEAN NOT NULL DEFAULT FALSE,
    friction_advert_score       INTEGER,
    friction_split_score        INTEGER,
    friction_report             JSONB,
    must_haves                  TEXT[] NOT NULL DEFAULT '{}',
    category                    TEXT NOT NULL DEFAULT '',
    sector                      TEXT NOT NULL DEFAULT '',
    created_at                  TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at                  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS role_terms_acceptances (
    user_id     UUID NOT NULL REFERENCES users (id),
    role_id     UUID NOT NULL REFERENCES roles (id),
    accepted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, role_id)
);

CREATE TABLE IF NOT EXISTS candidates (
    id                  UUID PRIMARY KEY,
    owner_user_id       UUID NOT NULL REFERENCES users (id),
    display_name        TEXT NOT NULL,
    headline            TEXT NOT NULL DEFAULT '',
    location            TEXT NOT NULL DEFAULT '',
    salary_expectation  INTEGER NOT NULL DEFAULT 0,
    skills              TEXT[] NOT NULL DEFAULT '{}',
    systems             TEXT[] NOT NULL DEFAULT '{}',
    evidence            TEXT NOT NULL DEFAULT '',
    source_label        TEXT NOT NULL DEFAULT 'demo-fictional',
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at          TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS applications (
    id                   UUID PRIMARY KEY,
    role_id              UUID NOT NULL REFERENCES roles (id),
    candidate_id         UUID NOT NULL REFERENCES candidates (id),
    submitter_user_id    UUID NOT NULL REFERENCES users (id),
    status               TEXT NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'screening', 'interview', 'offer', 'placed')),
    submitted_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
    ownership_timestamp  TIMESTAMPTZ NOT NULL,
    created_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (role_id, candidate_id)
);

CREATE TABLE IF NOT EXISTS application_events (
    id              UUID PRIMARY KEY,
    application_id  UUID NOT NULL REFERENCES applications (id),
    from_status     TEXT,
    to_status       TEXT NOT NULL,
    actor_id        UUID REFERENCES users (id),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notes (
    id          UUID PRIMARY KEY,
    entity_type TEXT NOT NULL,
    entity_id   UUID NOT NULL,
    author_id   UUID NOT NULL REFERENCES users (id),
    body        TEXT NOT NULL,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS split_agreements (
    id              UUID PRIMARY KEY,
    application_id  UUID NOT NULL REFERENCES applications (id),
    role_id         UUID NOT NULL REFERENCES roles (id),
    role_kind       TEXT NOT NULL,
    plan_at_submit  TEXT NOT NULL,
    recx_bps        INTEGER NOT NULL,
    recruiter_bps   INTEGER NOT NULL,
    partner_bps     INTEGER NOT NULL,
    terms_json      JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS match_records (
    id         UUID PRIMARY KEY,
    role_id    UUID NOT NULL REFERENCES roles (id),
    user_id    UUID NOT NULL REFERENCES users (id),
    score      INTEGER NOT NULL,
    reason     TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS automations (
    id           UUID PRIMARY KEY,
    type         TEXT NOT NULL,
    payload      JSONB NOT NULL DEFAULT '{}'::jsonb,
    status       TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'done', 'failed')),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_roles_kind_status ON roles (kind, status);
CREATE INDEX IF NOT EXISTS idx_roles_owner ON roles (owner_user_id);
CREATE INDEX IF NOT EXISTS idx_applications_role_status ON applications (role_id, status);
CREATE INDEX IF NOT EXISTS idx_sessions_token_hash ON sessions (token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_automations_status ON automations (status);
CREATE INDEX IF NOT EXISTS idx_candidates_owner ON candidates (owner_user_id);
CREATE INDEX IF NOT EXISTS idx_clients_owner ON clients (owner_user_id);
CREATE INDEX IF NOT EXISTS idx_notes_entity ON notes (entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_match_records_role ON match_records (role_id);
