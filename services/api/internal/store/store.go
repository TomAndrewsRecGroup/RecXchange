package store

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgxpool"
)

var (
	ErrNotFound = errors.New("not found")
	ErrConflict = errors.New("conflict")
)

type User struct {
	ID           uuid.UUID `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	Name         string    `json:"name"`
	Plan         string    `json:"plan"`
	IsAdmin      bool      `json:"is_admin"`
	CreatedAt    time.Time `json:"created_at"`
}

type Session struct {
	ID        uuid.UUID
	UserID    uuid.UUID
	TokenHash string
	ExpiresAt time.Time
}

type AuditLog struct {
	ID         uuid.UUID       `json:"id"`
	ActorID    *uuid.UUID      `json:"actor_id"`
	Action     string          `json:"action"`
	EntityType string          `json:"entity_type"`
	EntityID   *uuid.UUID      `json:"entity_id"`
	Payload    json.RawMessage `json:"payload"`
	CreatedAt  time.Time       `json:"created_at"`
}

type Client struct {
	ID          uuid.UUID `json:"id"`
	OwnerUserID uuid.UUID `json:"owner_user_id"`
	Name        string    `json:"name"`
	Sector      string    `json:"sector"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

type Contact struct {
	ID        uuid.UUID `json:"id"`
	ClientID  uuid.UUID `json:"client_id"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	RoleTitle string    `json:"role_title"`
	CreatedAt time.Time `json:"created_at"`
}

type Role struct {
	ID                      uuid.UUID       `json:"id"`
	OwnerUserID             uuid.UUID       `json:"owner_user_id"`
	ClientID                *uuid.UUID      `json:"client_id"`
	Kind                    string          `json:"kind"`
	Title                   string          `json:"title"`
	Description             string          `json:"description"`
	Location                string          `json:"location"`
	City                    string          `json:"city"`
	Country                 string          `json:"country"`
	SalaryMin               int             `json:"salary_min"`
	SalaryMax               int             `json:"salary_max"`
	Currency                string          `json:"currency"`
	BountyAmount            int             `json:"bounty_amount"`
	ProposedSplitOwnerBps   int             `json:"proposed_split_owner_bps"`
	ProposedSplitPartnerBps int             `json:"proposed_split_partner_bps"`
	Urgency                 string          `json:"urgency"`
	Status                  string          `json:"status"`
	ClientIdentityPublic    bool            `json:"client_identity_public"`
	FrictionAdvertScore     *int            `json:"friction_advert_score,omitempty"`
	FrictionSplitScore      *int            `json:"friction_split_score,omitempty"`
	FrictionReport          json.RawMessage `json:"friction_report,omitempty"`
	MustHaves               []string        `json:"must_haves"`
	Category                string          `json:"category"`
	Sector                  string          `json:"sector"`
	CreatedAt               time.Time       `json:"created_at"`
}

type Candidate struct {
	ID                uuid.UUID `json:"id"`
	OwnerUserID       uuid.UUID `json:"owner_user_id"`
	DisplayName       string    `json:"display_name"`
	Headline          string    `json:"headline"`
	Location          string    `json:"location"`
	SalaryExpectation int       `json:"salary_expectation"`
	Skills            []string  `json:"skills"`
	Systems           []string  `json:"systems"`
	Evidence          string    `json:"evidence"`
	SourceLabel       string    `json:"source_label"`
	CreatedAt         time.Time `json:"created_at"`
}

type Application struct {
	ID                 uuid.UUID `json:"id"`
	RoleID             uuid.UUID `json:"role_id"`
	CandidateID        uuid.UUID `json:"candidate_id"`
	SubmitterUserID    uuid.UUID `json:"submitter_user_id"`
	Status             string    `json:"status"`
	SubmittedAt        time.Time `json:"submitted_at"`
	OwnershipTimestamp time.Time `json:"ownership_timestamp"`
	CreatedAt          time.Time `json:"created_at"`
}

type ApplicationEvent struct {
	ID            uuid.UUID  `json:"id"`
	ApplicationID uuid.UUID  `json:"application_id"`
	FromStatus    string     `json:"from_status"`
	ToStatus      string     `json:"to_status"`
	ActorID       *uuid.UUID `json:"actor_id"`
	CreatedAt     time.Time  `json:"created_at"`
}

type Note struct {
	ID         uuid.UUID `json:"id"`
	EntityType string    `json:"entity_type"`
	EntityID   uuid.UUID `json:"entity_id"`
	AuthorID   uuid.UUID `json:"author_id"`
	Body       string    `json:"body"`
	CreatedAt  time.Time `json:"created_at"`
}

type SplitAgreement struct {
	ID            uuid.UUID       `json:"id"`
	ApplicationID uuid.UUID       `json:"application_id"`
	RoleID        uuid.UUID       `json:"role_id"`
	RoleKind      string          `json:"role_kind"`
	PlanAtSubmit  string          `json:"plan_at_submit"`
	RecxBps       int             `json:"recx_bps"`
	RecruiterBps  int             `json:"recruiter_bps"`
	PartnerBps    int             `json:"partner_bps"`
	TermsJSON     json.RawMessage `json:"terms_json"`
	CreatedAt     time.Time       `json:"created_at"`
}

type MatchRecord struct {
	ID        uuid.UUID `json:"id"`
	RoleID    uuid.UUID `json:"role_id"`
	UserID    uuid.UUID `json:"user_id"`
	Score     int       `json:"score"`
	Reason    string    `json:"reason"`
	CreatedAt time.Time `json:"created_at"`
}

type Automation struct {
	ID          uuid.UUID       `json:"id"`
	Type        string          `json:"type"`
	Payload     json.RawMessage `json:"payload"`
	Status      string          `json:"status"`
	CreatedAt   time.Time       `json:"created_at"`
	ProcessedAt *time.Time      `json:"processed_at,omitempty"`
}

type Stats struct {
	OpenRoles  int `json:"open_roles"`
	Direct     int `json:"direct"`
	Xchange    int `json:"xchange"`
	Referral   int `json:"referral"`
	Candidates int `json:"candidates"`
}

type Store interface {
	CreateUser(ctx context.Context, u *User) error
	GetUserByID(ctx context.Context, id uuid.UUID) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)
	ListUsers(ctx context.Context) ([]User, error)
	UpdateUserPlan(ctx context.Context, id uuid.UUID, plan string) error
	CountUsers(ctx context.Context) (int, error)

	CreateSession(ctx context.Context, s *Session) error
	GetSessionByTokenHash(ctx context.Context, hash string) (*Session, error)
	DeleteSessionByTokenHash(ctx context.Context, hash string) error

	InsertAudit(ctx context.Context, a *AuditLog) error
	ListAudit(ctx context.Context, limit int) ([]AuditLog, error)

	CreateClient(ctx context.Context, c *Client) error
	GetClient(ctx context.Context, id uuid.UUID) (*Client, error)
	ListClients(ctx context.Context) ([]Client, error)
	UpdateClient(ctx context.Context, c *Client) error

	CreateContact(ctx context.Context, c *Contact) error
	ListContactsByClient(ctx context.Context, clientID uuid.UUID) ([]Contact, error)

	CreateRole(ctx context.Context, r *Role) error
	GetRole(ctx context.Context, id uuid.UUID) (*Role, error)
	ListRoles(ctx context.Context, kind, status string) ([]Role, error)
	UpdateRole(ctx context.Context, r *Role) error

	HasTermsAcceptance(ctx context.Context, userID, roleID uuid.UUID) (bool, error)
	AcceptTerms(ctx context.Context, userID, roleID uuid.UUID) error

	CreateCandidate(ctx context.Context, c *Candidate) error
	GetCandidate(ctx context.Context, id uuid.UUID) (*Candidate, error)
	ListCandidates(ctx context.Context) ([]Candidate, error)

	CreateApplication(ctx context.Context, a *Application) error
	GetApplication(ctx context.Context, id uuid.UUID) (*Application, error)
	GetApplicationByRoleCandidate(ctx context.Context, roleID, candidateID uuid.UUID) (*Application, error)
	ListApplications(ctx context.Context, roleID *uuid.UUID) ([]Application, error)
	UpdateApplicationStatus(ctx context.Context, id uuid.UUID, status string) error

	InsertApplicationEvent(ctx context.Context, e *ApplicationEvent) error
	ListApplicationEvents(ctx context.Context, applicationID uuid.UUID) ([]ApplicationEvent, error)

	CreateNote(ctx context.Context, n *Note) error
	ListNotes(ctx context.Context, entityType string, entityID uuid.UUID) ([]Note, error)

	CreateSplitAgreement(ctx context.Context, s *SplitAgreement) error
	GetSplitAgreementByApplication(ctx context.Context, applicationID uuid.UUID) (*SplitAgreement, error)

	CreateMatchRecord(ctx context.Context, m *MatchRecord) error
	ListMatchRecords(ctx context.Context, roleID uuid.UUID) ([]MatchRecord, error)

	CreateAutomation(ctx context.Context, a *Automation) error
	ListAutomations(ctx context.Context) ([]Automation, error)
	ListPendingAutomations(ctx context.Context) ([]Automation, error)
	MarkAutomation(ctx context.Context, id uuid.UUID, status string) error

	PublicStats(ctx context.Context) (*Stats, error)
}

type Postgres struct {
	pool *pgxpool.Pool
}

func NewPostgres(pool *pgxpool.Pool) *Postgres { return &Postgres{pool: pool} }

func Connect(ctx context.Context, url string) (*pgxpool.Pool, error) {
	cfg, err := pgxpool.ParseConfig(url)
	if err != nil {
		return nil, err
	}
	pool, err := pgxpool.NewWithConfig(ctx, cfg)
	if err != nil {
		return nil, err
	}
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, err
	}
	return pool, nil
}

func ApplyMigrations(ctx context.Context, pool *pgxpool.Pool, dir string) error {
	path := filepath.Join(dir, "0001_init.sql")
	b, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("read migration: %w", err)
	}
	_, err = pool.Exec(ctx, string(b))
	return err
}

func FindMigrationsDir() string {
	candidates := []string{
		os.Getenv("MIGRATIONS_DIR"),
		"migrations",
		"./migrations",
		"/migrations",
		filepath.Join("services", "api", "migrations"),
	}
	for _, c := range candidates {
		if c == "" {
			continue
		}
		if _, err := os.Stat(filepath.Join(c, "0001_init.sql")); err == nil {
			return c
		}
	}
	return "migrations"
}

func isUnique(err error) bool {
	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) && pgErr.Code == "23505" {
		return true
	}
	return false
}

func (p *Postgres) CreateUser(ctx context.Context, u *User) error {
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	if u.CreatedAt.IsZero() {
		u.CreatedAt = time.Now().UTC()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO users (id, email, password_hash, name, plan, is_admin, created_at)
		VALUES ($1,$2,$3,$4,$5,$6,$7)`,
		u.ID, u.Email, u.PasswordHash, u.Name, u.Plan, u.IsAdmin, u.CreatedAt)
	if isUnique(err) {
		return ErrConflict
	}
	return err
}

func scanUser(row pgx.Row) (*User, error) {
	var u User
	err := row.Scan(&u.ID, &u.Email, &u.PasswordHash, &u.Name, &u.Plan, &u.IsAdmin, &u.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}

const userCols = `id, email, password_hash, name, plan, is_admin, created_at`

func (p *Postgres) GetUserByID(ctx context.Context, id uuid.UUID) (*User, error) {
	return scanUser(p.pool.QueryRow(ctx, `SELECT `+userCols+` FROM users WHERE id=$1 AND deleted_at IS NULL`, id))
}

func (p *Postgres) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	return scanUser(p.pool.QueryRow(ctx, `SELECT `+userCols+` FROM users WHERE lower(email)=lower($1) AND deleted_at IS NULL`, email))
}

func (p *Postgres) ListUsers(ctx context.Context) ([]User, error) {
	rows, err := p.pool.Query(ctx, `SELECT `+userCols+` FROM users WHERE deleted_at IS NULL ORDER BY created_at`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []User
	for rows.Next() {
		u, err := scanUser(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, *u)
	}
	return out, rows.Err()
}

func (p *Postgres) UpdateUserPlan(ctx context.Context, id uuid.UUID, plan string) error {
	tag, err := p.pool.Exec(ctx, `UPDATE users SET plan=$2 WHERE id=$1 AND deleted_at IS NULL`, id, plan)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (p *Postgres) CountUsers(ctx context.Context) (int, error) {
	var n int
	err := p.pool.QueryRow(ctx, `SELECT count(*) FROM users WHERE deleted_at IS NULL`).Scan(&n)
	return n, err
}

func (p *Postgres) CreateSession(ctx context.Context, s *Session) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO sessions (id, user_id, token_hash, expires_at) VALUES ($1,$2,$3,$4)`,
		s.ID, s.UserID, s.TokenHash, s.ExpiresAt)
	return err
}

func (p *Postgres) GetSessionByTokenHash(ctx context.Context, hash string) (*Session, error) {
	var s Session
	err := p.pool.QueryRow(ctx, `SELECT id, user_id, token_hash, expires_at FROM sessions WHERE token_hash=$1`, hash).
		Scan(&s.ID, &s.UserID, &s.TokenHash, &s.ExpiresAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return &s, err
}

func (p *Postgres) DeleteSessionByTokenHash(ctx context.Context, hash string) error {
	_, err := p.pool.Exec(ctx, `DELETE FROM sessions WHERE token_hash=$1`, hash)
	return err
}

func (p *Postgres) InsertAudit(ctx context.Context, a *AuditLog) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	if a.CreatedAt.IsZero() {
		a.CreatedAt = time.Now().UTC()
	}
	if a.Payload == nil {
		a.Payload = json.RawMessage(`{}`)
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO audit_log (id, actor_id, action, entity_type, entity_id, payload, created_at)
		VALUES ($1,$2,$3,$4,$5,$6,$7)`,
		a.ID, a.ActorID, a.Action, a.EntityType, a.EntityID, a.Payload, a.CreatedAt)
	return err
}

func (p *Postgres) ListAudit(ctx context.Context, limit int) ([]AuditLog, error) {
	if limit <= 0 || limit > 500 {
		limit = 100
	}
	rows, err := p.pool.Query(ctx, `SELECT id, actor_id, action, entity_type, entity_id, payload, created_at
		FROM audit_log ORDER BY created_at DESC LIMIT $1`, limit)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []AuditLog
	for rows.Next() {
		var a AuditLog
		if err := rows.Scan(&a.ID, &a.ActorID, &a.Action, &a.EntityType, &a.EntityID, &a.Payload, &a.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, a)
	}
	return out, rows.Err()
}

func (p *Postgres) CreateClient(ctx context.Context, c *Client) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC()
	}
	if c.Status == "" {
		c.Status = "active"
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO clients (id, owner_user_id, name, sector, status, created_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		c.ID, c.OwnerUserID, c.Name, c.Sector, c.Status, c.CreatedAt)
	return err
}

func (p *Postgres) GetClient(ctx context.Context, id uuid.UUID) (*Client, error) {
	var c Client
	err := p.pool.QueryRow(ctx, `SELECT id, owner_user_id, name, sector, status, created_at
		FROM clients WHERE id=$1 AND deleted_at IS NULL`, id).
		Scan(&c.ID, &c.OwnerUserID, &c.Name, &c.Sector, &c.Status, &c.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return &c, err
}

func (p *Postgres) ListClients(ctx context.Context) ([]Client, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, owner_user_id, name, sector, status, created_at
		FROM clients WHERE deleted_at IS NULL ORDER BY created_at`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Client
	for rows.Next() {
		var c Client
		if err := rows.Scan(&c.ID, &c.OwnerUserID, &c.Name, &c.Sector, &c.Status, &c.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

func (p *Postgres) UpdateClient(ctx context.Context, c *Client) error {
	tag, err := p.pool.Exec(ctx, `UPDATE clients SET name=$2, sector=$3, status=$4 WHERE id=$1 AND deleted_at IS NULL`,
		c.ID, c.Name, c.Sector, c.Status)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (p *Postgres) CreateContact(ctx context.Context, c *Contact) error {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO contacts (id, client_id, name, email, role_title, created_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		c.ID, c.ClientID, c.Name, c.Email, c.RoleTitle, c.CreatedAt)
	return err
}

func (p *Postgres) ListContactsByClient(ctx context.Context, clientID uuid.UUID) ([]Contact, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, client_id, name, email, role_title, created_at
		FROM contacts WHERE client_id=$1 ORDER BY created_at`, clientID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Contact
	for rows.Next() {
		var c Contact
		if err := rows.Scan(&c.ID, &c.ClientID, &c.Name, &c.Email, &c.RoleTitle, &c.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, c)
	}
	return out, rows.Err()
}

const roleCols = `id, owner_user_id, client_id, kind, title, description, location, city, country,
	salary_min, salary_max, currency, bounty_amount, proposed_split_owner_bps, proposed_split_partner_bps,
	urgency, status, client_identity_public, friction_advert_score, friction_split_score, friction_report,
	must_haves, category, sector, created_at`

func scanRole(row pgx.Row) (*Role, error) {
	var r Role
	var must []string
	err := row.Scan(&r.ID, &r.OwnerUserID, &r.ClientID, &r.Kind, &r.Title, &r.Description, &r.Location, &r.City, &r.Country,
		&r.SalaryMin, &r.SalaryMax, &r.Currency, &r.BountyAmount, &r.ProposedSplitOwnerBps, &r.ProposedSplitPartnerBps,
		&r.Urgency, &r.Status, &r.ClientIdentityPublic, &r.FrictionAdvertScore, &r.FrictionSplitScore, &r.FrictionReport,
		&must, &r.Category, &r.Sector, &r.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	if must == nil {
		must = []string{}
	}
	r.MustHaves = must
	return &r, nil
}

func (p *Postgres) CreateRole(ctx context.Context, r *Role) error {
	prepareRole(r)
	must := r.MustHaves
	if must == nil {
		must = []string{}
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO roles (
		id, owner_user_id, client_id, kind, title, description, location, city, country,
		salary_min, salary_max, currency, bounty_amount, proposed_split_owner_bps, proposed_split_partner_bps,
		urgency, status, client_identity_public, friction_advert_score, friction_split_score, friction_report,
		must_haves, category, sector, created_at
	) VALUES (
		$1,$2,$3,$4,$5,$6,$7,$8,$9,
		$10,$11,$12,$13,$14,$15,
		$16,$17,$18,$19,$20,$21,
		$22,$23,$24,$25
	)`,
		r.ID, r.OwnerUserID, r.ClientID, r.Kind, r.Title, r.Description, r.Location, r.City, r.Country,
		r.SalaryMin, r.SalaryMax, r.Currency, r.BountyAmount, r.ProposedSplitOwnerBps, r.ProposedSplitPartnerBps,
		r.Urgency, r.Status, r.ClientIdentityPublic, r.FrictionAdvertScore, r.FrictionSplitScore, nullJSON(r.FrictionReport),
		must, r.Category, r.Sector, r.CreatedAt)
	return err
}

func (p *Postgres) GetRole(ctx context.Context, id uuid.UUID) (*Role, error) {
	return scanRole(p.pool.QueryRow(ctx, `SELECT `+roleCols+` FROM roles WHERE id=$1 AND deleted_at IS NULL`, id))
}

func (p *Postgres) ListRoles(ctx context.Context, kind, status string) ([]Role, error) {
	q := `SELECT ` + roleCols + ` FROM roles WHERE deleted_at IS NULL`
	args := []any{}
	n := 1
	if kind != "" {
		q += fmt.Sprintf(` AND kind=$%d`, n)
		args = append(args, kind)
		n++
	}
	if status != "" {
		q += fmt.Sprintf(` AND status=$%d`, n)
		args = append(args, status)
		n++
	}
	q += ` ORDER BY created_at DESC`
	rows, err := p.pool.Query(ctx, q, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Role
	for rows.Next() {
		r, err := scanRole(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, *r)
	}
	return out, rows.Err()
}

func (p *Postgres) UpdateRole(ctx context.Context, r *Role) error {
	must := r.MustHaves
	if must == nil {
		must = []string{}
	}
	tag, err := p.pool.Exec(ctx, `UPDATE roles SET
		client_id=$2, kind=$3, title=$4, description=$5, location=$6, city=$7, country=$8,
		salary_min=$9, salary_max=$10, currency=$11, bounty_amount=$12,
		proposed_split_owner_bps=$13, proposed_split_partner_bps=$14, urgency=$15, status=$16,
		client_identity_public=$17, friction_advert_score=$18, friction_split_score=$19, friction_report=$20,
		must_haves=$21, category=$22, sector=$23
		WHERE id=$1 AND deleted_at IS NULL`,
		r.ID, r.ClientID, r.Kind, r.Title, r.Description, r.Location, r.City, r.Country,
		r.SalaryMin, r.SalaryMax, r.Currency, r.BountyAmount, r.ProposedSplitOwnerBps, r.ProposedSplitPartnerBps,
		r.Urgency, r.Status, r.ClientIdentityPublic, r.FrictionAdvertScore, r.FrictionSplitScore, nullJSON(r.FrictionReport),
		must, r.Category, r.Sector)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (p *Postgres) HasTermsAcceptance(ctx context.Context, userID, roleID uuid.UUID) (bool, error) {
	var n int
	err := p.pool.QueryRow(ctx, `SELECT count(*) FROM role_terms_acceptances WHERE user_id=$1 AND role_id=$2`, userID, roleID).Scan(&n)
	return n > 0, err
}

func (p *Postgres) AcceptTerms(ctx context.Context, userID, roleID uuid.UUID) error {
	_, err := p.pool.Exec(ctx, `INSERT INTO role_terms_acceptances (user_id, role_id, accepted_at)
		VALUES ($1,$2,now()) ON CONFLICT (user_id, role_id) DO NOTHING`, userID, roleID)
	return err
}

func (p *Postgres) CreateCandidate(ctx context.Context, c *Candidate) error {
	prepareCandidate(c)
	_, err := p.pool.Exec(ctx, `INSERT INTO candidates (
		id, owner_user_id, display_name, headline, location, salary_expectation, skills, systems, evidence, source_label, created_at
	) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
		c.ID, c.OwnerUserID, c.DisplayName, c.Headline, c.Location, c.SalaryExpectation, c.Skills, c.Systems, c.Evidence, c.SourceLabel, c.CreatedAt)
	return err
}

func scanCandidate(row pgx.Row) (*Candidate, error) {
	var c Candidate
	err := row.Scan(&c.ID, &c.OwnerUserID, &c.DisplayName, &c.Headline, &c.Location, &c.SalaryExpectation,
		&c.Skills, &c.Systems, &c.Evidence, &c.SourceLabel, &c.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	if err != nil {
		return nil, err
	}
	if c.Skills == nil {
		c.Skills = []string{}
	}
	if c.Systems == nil {
		c.Systems = []string{}
	}
	return &c, nil
}

const candCols = `id, owner_user_id, display_name, headline, location, salary_expectation, skills, systems, evidence, source_label, created_at`

func (p *Postgres) GetCandidate(ctx context.Context, id uuid.UUID) (*Candidate, error) {
	return scanCandidate(p.pool.QueryRow(ctx, `SELECT `+candCols+` FROM candidates WHERE id=$1 AND deleted_at IS NULL`, id))
}

func (p *Postgres) ListCandidates(ctx context.Context) ([]Candidate, error) {
	rows, err := p.pool.Query(ctx, `SELECT `+candCols+` FROM candidates WHERE deleted_at IS NULL ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Candidate
	for rows.Next() {
		c, err := scanCandidate(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, *c)
	}
	return out, rows.Err()
}

func (p *Postgres) CreateApplication(ctx context.Context, a *Application) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	now := time.Now().UTC()
	if a.CreatedAt.IsZero() {
		a.CreatedAt = now
	}
	if a.SubmittedAt.IsZero() {
		a.SubmittedAt = now
	}
	if a.OwnershipTimestamp.IsZero() {
		a.OwnershipTimestamp = now
	}
	if a.Status == "" {
		a.Status = "applied"
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO applications (
		id, role_id, candidate_id, submitter_user_id, status, submitted_at, ownership_timestamp, created_at
	) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
		a.ID, a.RoleID, a.CandidateID, a.SubmitterUserID, a.Status, a.SubmittedAt, a.OwnershipTimestamp, a.CreatedAt)
	if isUnique(err) {
		return ErrConflict
	}
	return err
}

func scanApp(row pgx.Row) (*Application, error) {
	var a Application
	err := row.Scan(&a.ID, &a.RoleID, &a.CandidateID, &a.SubmitterUserID, &a.Status, &a.SubmittedAt, &a.OwnershipTimestamp, &a.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return &a, err
}

const appCols = `id, role_id, candidate_id, submitter_user_id, status, submitted_at, ownership_timestamp, created_at`

func (p *Postgres) GetApplication(ctx context.Context, id uuid.UUID) (*Application, error) {
	return scanApp(p.pool.QueryRow(ctx, `SELECT `+appCols+` FROM applications WHERE id=$1`, id))
}

func (p *Postgres) GetApplicationByRoleCandidate(ctx context.Context, roleID, candidateID uuid.UUID) (*Application, error) {
	return scanApp(p.pool.QueryRow(ctx, `SELECT `+appCols+` FROM applications WHERE role_id=$1 AND candidate_id=$2`, roleID, candidateID))
}

func (p *Postgres) ListApplications(ctx context.Context, roleID *uuid.UUID) ([]Application, error) {
	var (
		rows pgx.Rows
		err  error
	)
	if roleID != nil {
		rows, err = p.pool.Query(ctx, `SELECT `+appCols+` FROM applications WHERE role_id=$1 ORDER BY submitted_at`, *roleID)
	} else {
		rows, err = p.pool.Query(ctx, `SELECT `+appCols+` FROM applications ORDER BY submitted_at`)
	}
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Application
	for rows.Next() {
		a, err := scanApp(rows)
		if err != nil {
			return nil, err
		}
		out = append(out, *a)
	}
	return out, rows.Err()
}

func (p *Postgres) UpdateApplicationStatus(ctx context.Context, id uuid.UUID, status string) error {
	tag, err := p.pool.Exec(ctx, `UPDATE applications SET status=$2 WHERE id=$1`, id, status)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (p *Postgres) InsertApplicationEvent(ctx context.Context, e *ApplicationEvent) error {
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	if e.CreatedAt.IsZero() {
		e.CreatedAt = time.Now().UTC()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO application_events (id, application_id, from_status, to_status, actor_id, created_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		e.ID, e.ApplicationID, nullStr(e.FromStatus), e.ToStatus, e.ActorID, e.CreatedAt)
	return err
}

func (p *Postgres) ListApplicationEvents(ctx context.Context, applicationID uuid.UUID) ([]ApplicationEvent, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, application_id, COALESCE(from_status,''), to_status, actor_id, created_at
		FROM application_events WHERE application_id=$1 ORDER BY created_at`, applicationID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []ApplicationEvent
	for rows.Next() {
		var e ApplicationEvent
		if err := rows.Scan(&e.ID, &e.ApplicationID, &e.FromStatus, &e.ToStatus, &e.ActorID, &e.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, e)
	}
	return out, rows.Err()
}

func (p *Postgres) CreateNote(ctx context.Context, n *Note) error {
	if n.ID == uuid.Nil {
		n.ID = uuid.New()
	}
	if n.CreatedAt.IsZero() {
		n.CreatedAt = time.Now().UTC()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO notes (id, entity_type, entity_id, author_id, body, created_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		n.ID, n.EntityType, n.EntityID, n.AuthorID, n.Body, n.CreatedAt)
	return err
}

func (p *Postgres) ListNotes(ctx context.Context, entityType string, entityID uuid.UUID) ([]Note, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, entity_type, entity_id, author_id, body, created_at
		FROM notes WHERE entity_type=$1 AND entity_id=$2 ORDER BY created_at`, entityType, entityID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []Note
	for rows.Next() {
		var n Note
		if err := rows.Scan(&n.ID, &n.EntityType, &n.EntityID, &n.AuthorID, &n.Body, &n.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, n)
	}
	return out, rows.Err()
}

func (p *Postgres) CreateSplitAgreement(ctx context.Context, s *SplitAgreement) error {
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	if s.CreatedAt.IsZero() {
		s.CreatedAt = time.Now().UTC()
	}
	if s.TermsJSON == nil {
		s.TermsJSON = json.RawMessage(`{}`)
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO split_agreements (
		id, application_id, role_id, role_kind, plan_at_submit, recx_bps, recruiter_bps, partner_bps, terms_json, created_at
	) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
		s.ID, s.ApplicationID, s.RoleID, s.RoleKind, s.PlanAtSubmit, s.RecxBps, s.RecruiterBps, s.PartnerBps, s.TermsJSON, s.CreatedAt)
	return err
}

func (p *Postgres) GetSplitAgreementByApplication(ctx context.Context, applicationID uuid.UUID) (*SplitAgreement, error) {
	var s SplitAgreement
	err := p.pool.QueryRow(ctx, `SELECT id, application_id, role_id, role_kind, plan_at_submit, recx_bps, recruiter_bps, partner_bps, terms_json, created_at
		FROM split_agreements WHERE application_id=$1`, applicationID).
		Scan(&s.ID, &s.ApplicationID, &s.RoleID, &s.RoleKind, &s.PlanAtSubmit, &s.RecxBps, &s.RecruiterBps, &s.PartnerBps, &s.TermsJSON, &s.CreatedAt)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, ErrNotFound
	}
	return &s, err
}

func (p *Postgres) CreateMatchRecord(ctx context.Context, m *MatchRecord) error {
	if m.ID == uuid.Nil {
		m.ID = uuid.New()
	}
	if m.CreatedAt.IsZero() {
		m.CreatedAt = time.Now().UTC()
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO match_records (id, role_id, user_id, score, reason, created_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		m.ID, m.RoleID, m.UserID, m.Score, m.Reason, m.CreatedAt)
	return err
}

func (p *Postgres) ListMatchRecords(ctx context.Context, roleID uuid.UUID) ([]MatchRecord, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, role_id, user_id, score, reason, created_at
		FROM match_records WHERE role_id=$1 ORDER BY score DESC, user_id`, roleID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var out []MatchRecord
	for rows.Next() {
		var m MatchRecord
		if err := rows.Scan(&m.ID, &m.RoleID, &m.UserID, &m.Score, &m.Reason, &m.CreatedAt); err != nil {
			return nil, err
		}
		out = append(out, m)
	}
	return out, rows.Err()
}

func (p *Postgres) CreateAutomation(ctx context.Context, a *Automation) error {
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	if a.CreatedAt.IsZero() {
		a.CreatedAt = time.Now().UTC()
	}
	if a.Status == "" {
		a.Status = "pending"
	}
	if a.Payload == nil {
		a.Payload = json.RawMessage(`{}`)
	}
	_, err := p.pool.Exec(ctx, `INSERT INTO automations (id, type, payload, status, created_at, processed_at)
		VALUES ($1,$2,$3,$4,$5,$6)`,
		a.ID, a.Type, a.Payload, a.Status, a.CreatedAt, a.ProcessedAt)
	return err
}

func (p *Postgres) ListAutomations(ctx context.Context) ([]Automation, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, type, payload, status, created_at, processed_at
		FROM automations ORDER BY created_at DESC`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return scanAutomations(rows)
}

func (p *Postgres) ListPendingAutomations(ctx context.Context) ([]Automation, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, type, payload, status, created_at, processed_at
		FROM automations WHERE status='pending' ORDER BY created_at`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	return scanAutomations(rows)
}

func scanAutomations(rows pgx.Rows) ([]Automation, error) {
	var out []Automation
	for rows.Next() {
		var a Automation
		if err := rows.Scan(&a.ID, &a.Type, &a.Payload, &a.Status, &a.CreatedAt, &a.ProcessedAt); err != nil {
			return nil, err
		}
		out = append(out, a)
	}
	return out, rows.Err()
}

func (p *Postgres) MarkAutomation(ctx context.Context, id uuid.UUID, status string) error {
	now := time.Now().UTC()
	tag, err := p.pool.Exec(ctx, `UPDATE automations SET status=$2, processed_at=$3 WHERE id=$1`, id, status, now)
	if err != nil {
		return err
	}
	if tag.RowsAffected() == 0 {
		return ErrNotFound
	}
	return nil
}

func (p *Postgres) PublicStats(ctx context.Context) (*Stats, error) {
	s := &Stats{}
	err := p.pool.QueryRow(ctx, `
		SELECT
			count(*) FILTER (WHERE status='open'),
			count(*) FILTER (WHERE status='open' AND kind='direct'),
			count(*) FILTER (WHERE status='open' AND kind='xchange'),
			count(*) FILTER (WHERE status='open' AND kind='referral')
		FROM roles WHERE deleted_at IS NULL`).Scan(&s.OpenRoles, &s.Direct, &s.Xchange, &s.Referral)
	if err != nil {
		return nil, err
	}
	err = p.pool.QueryRow(ctx, `SELECT count(*) FROM candidates WHERE deleted_at IS NULL`).Scan(&s.Candidates)
	return s, err
}

func prepareRole(r *Role) {
	if r.ID == uuid.Nil {
		r.ID = uuid.New()
	}
	if r.CreatedAt.IsZero() {
		r.CreatedAt = time.Now().UTC()
	}
	if r.Currency == "" {
		r.Currency = "GBP"
	}
	if r.Urgency == "" {
		r.Urgency = "standard"
	}
	if r.Status == "" {
		r.Status = "draft"
	}
	if r.ProposedSplitOwnerBps == 0 && r.ProposedSplitPartnerBps == 0 {
		r.ProposedSplitOwnerBps = 5000
		r.ProposedSplitPartnerBps = 5000
	}
	if r.MustHaves == nil {
		r.MustHaves = []string{}
	}
}

func prepareCandidate(c *Candidate) {
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC()
	}
	if c.Skills == nil {
		c.Skills = []string{}
	}
	if c.Systems == nil {
		c.Systems = []string{}
	}
	if c.SourceLabel == "" {
		c.SourceLabel = "demo-fictional"
	}
}

func nullJSON(b json.RawMessage) any {
	if len(b) == 0 {
		return nil
	}
	return b
}

func nullStr(s string) any {
	if s == "" {
		return nil
	}
	return s
}
