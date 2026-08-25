package store

import (
	"context"
	"encoding/json"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
)

// Memory is an in-process Store used by unit tests so `go test ./...` needs no Postgres.
type Memory struct {
	mu           sync.RWMutex
	users        map[uuid.UUID]*User
	emailIndex   map[string]uuid.UUID
	sessions     map[string]*Session
	audit        []*AuditLog
	clients      map[uuid.UUID]*Client
	contacts     map[uuid.UUID]*Contact
	roles        map[uuid.UUID]*Role
	terms        map[string]time.Time
	candidates   map[uuid.UUID]*Candidate
	apps         map[uuid.UUID]*Application
	appIndex     map[string]uuid.UUID
	events       []*ApplicationEvent
	notes        []*Note
	splits       map[uuid.UUID]*SplitAgreement
	matches      []*MatchRecord
	automations  map[uuid.UUID]*Automation
}

func NewMemory() *Memory {
	return &Memory{
		users:       make(map[uuid.UUID]*User),
		emailIndex:  make(map[string]uuid.UUID),
		sessions:    make(map[string]*Session),
		clients:     make(map[uuid.UUID]*Client),
		contacts:    make(map[uuid.UUID]*Contact),
		roles:       make(map[uuid.UUID]*Role),
		terms:       make(map[string]time.Time),
		candidates:  make(map[uuid.UUID]*Candidate),
		apps:        make(map[uuid.UUID]*Application),
		appIndex:    make(map[string]uuid.UUID),
		splits:      make(map[uuid.UUID]*SplitAgreement),
		automations: make(map[uuid.UUID]*Automation),
	}
}

func cloneStrs(in []string) []string {
	if in == nil {
		return []string{}
	}
	out := make([]string, len(in))
	copy(out, in)
	return out
}

func cloneJSON(in json.RawMessage) json.RawMessage {
	if in == nil {
		return nil
	}
	out := make(json.RawMessage, len(in))
	copy(out, in)
	return out
}

func cloneUser(u *User) *User {
	if u == nil {
		return nil
	}
	c := *u
	return &c
}

func (m *Memory) CreateUser(_ context.Context, u *User) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if u.ID == uuid.Nil {
		u.ID = uuid.New()
	}
	if u.CreatedAt.IsZero() {
		u.CreatedAt = time.Now().UTC()
	}
	email := strings.ToLower(u.Email)
	if _, ok := m.emailIndex[email]; ok {
		return ErrConflict
	}
	cp := *u
	m.users[u.ID] = &cp
	m.emailIndex[email] = u.ID
	return nil
}

func (m *Memory) GetUserByID(_ context.Context, id uuid.UUID) (*User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	u, ok := m.users[id]
	if !ok {
		return nil, ErrNotFound
	}
	return cloneUser(u), nil
}

func (m *Memory) GetUserByEmail(_ context.Context, email string) (*User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	id, ok := m.emailIndex[strings.ToLower(email)]
	if !ok {
		return nil, ErrNotFound
	}
	return cloneUser(m.users[id]), nil
}

func (m *Memory) ListUsers(_ context.Context) ([]User, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]User, 0, len(m.users))
	for _, u := range m.users {
		out = append(out, *u)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.Before(out[j].CreatedAt) })
	return out, nil
}

func (m *Memory) UpdateUserPlan(_ context.Context, id uuid.UUID, plan string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	u, ok := m.users[id]
	if !ok {
		return ErrNotFound
	}
	u.Plan = plan
	return nil
}

func (m *Memory) CountUsers(_ context.Context) (int, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	return len(m.users), nil
}

func (m *Memory) CreateSession(_ context.Context, s *Session) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	cp := *s
	m.sessions[s.TokenHash] = &cp
	return nil
}

func (m *Memory) GetSessionByTokenHash(_ context.Context, hash string) (*Session, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	s, ok := m.sessions[hash]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *s
	return &cp, nil
}

func (m *Memory) DeleteSessionByTokenHash(_ context.Context, hash string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	delete(m.sessions, hash)
	return nil
}

func (m *Memory) InsertAudit(_ context.Context, a *AuditLog) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if a.ID == uuid.Nil {
		a.ID = uuid.New()
	}
	if a.CreatedAt.IsZero() {
		a.CreatedAt = time.Now().UTC()
	}
	if a.Payload == nil {
		a.Payload = json.RawMessage(`{}`)
	}
	cp := *a
	cp.Payload = cloneJSON(a.Payload)
	m.audit = append(m.audit, &cp)
	return nil
}

func (m *Memory) ListAudit(_ context.Context, limit int) ([]AuditLog, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	if limit <= 0 || limit > 500 {
		limit = 100
	}
	n := len(m.audit)
	out := make([]AuditLog, 0, min(limit, n))
	for i := n - 1; i >= 0 && len(out) < limit; i-- {
		cp := *m.audit[i]
		cp.Payload = cloneJSON(m.audit[i].Payload)
		out = append(out, cp)
	}
	return out, nil
}

func (m *Memory) CreateClient(_ context.Context, c *Client) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC()
	}
	if c.Status == "" {
		c.Status = "active"
	}
	cp := *c
	m.clients[c.ID] = &cp
	return nil
}

func (m *Memory) GetClient(_ context.Context, id uuid.UUID) (*Client, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	c, ok := m.clients[id]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *c
	return &cp, nil
}

func (m *Memory) ListClients(_ context.Context) ([]Client, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]Client, 0, len(m.clients))
	for _, c := range m.clients {
		out = append(out, *c)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.Before(out[j].CreatedAt) })
	return out, nil
}

func (m *Memory) UpdateClient(_ context.Context, c *Client) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	ex, ok := m.clients[c.ID]
	if !ok {
		return ErrNotFound
	}
	ex.Name = c.Name
	ex.Sector = c.Sector
	ex.Status = c.Status
	*c = *ex
	return nil
}

func (m *Memory) CreateContact(_ context.Context, c *Contact) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if c.ID == uuid.Nil {
		c.ID = uuid.New()
	}
	if c.CreatedAt.IsZero() {
		c.CreatedAt = time.Now().UTC()
	}
	cp := *c
	m.contacts[c.ID] = &cp
	return nil
}

func (m *Memory) ListContactsByClient(_ context.Context, clientID uuid.UUID) ([]Contact, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []Contact
	for _, c := range m.contacts {
		if c.ClientID == clientID {
			out = append(out, *c)
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.Before(out[j].CreatedAt) })
	return out, nil
}

func cloneRole(r *Role) *Role {
	cp := *r
	cp.MustHaves = cloneStrs(r.MustHaves)
	cp.FrictionReport = cloneJSON(r.FrictionReport)
	if r.ClientID != nil {
		id := *r.ClientID
		cp.ClientID = &id
	}
	if r.FrictionAdvertScore != nil {
		v := *r.FrictionAdvertScore
		cp.FrictionAdvertScore = &v
	}
	if r.FrictionSplitScore != nil {
		v := *r.FrictionSplitScore
		cp.FrictionSplitScore = &v
	}
	return &cp
}

func (m *Memory) CreateRole(_ context.Context, r *Role) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	prepareRole(r)
	m.roles[r.ID] = cloneRole(r)
	return nil
}

func (m *Memory) GetRole(_ context.Context, id uuid.UUID) (*Role, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	r, ok := m.roles[id]
	if !ok {
		return nil, ErrNotFound
	}
	return cloneRole(r), nil
}

func (m *Memory) ListRoles(_ context.Context, kind, status string) ([]Role, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []Role
	for _, r := range m.roles {
		if kind != "" && r.Kind != kind {
			continue
		}
		if status != "" && r.Status != status {
			continue
		}
		out = append(out, *cloneRole(r))
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.After(out[j].CreatedAt) })
	return out, nil
}

func (m *Memory) UpdateRole(_ context.Context, r *Role) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, ok := m.roles[r.ID]; !ok {
		return ErrNotFound
	}
	m.roles[r.ID] = cloneRole(r)
	return nil
}

func termsKey(userID, roleID uuid.UUID) string {
	return userID.String() + ":" + roleID.String()
}

func (m *Memory) HasTermsAcceptance(_ context.Context, userID, roleID uuid.UUID) (bool, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	_, ok := m.terms[termsKey(userID, roleID)]
	return ok, nil
}

func (m *Memory) AcceptTerms(_ context.Context, userID, roleID uuid.UUID) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	m.terms[termsKey(userID, roleID)] = time.Now().UTC()
	return nil
}

func cloneCand(c *Candidate) *Candidate {
	cp := *c
	cp.Skills = cloneStrs(c.Skills)
	cp.Systems = cloneStrs(c.Systems)
	return &cp
}

func (m *Memory) CreateCandidate(_ context.Context, c *Candidate) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	prepareCandidate(c)
	m.candidates[c.ID] = cloneCand(c)
	return nil
}

func (m *Memory) GetCandidate(_ context.Context, id uuid.UUID) (*Candidate, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	c, ok := m.candidates[id]
	if !ok {
		return nil, ErrNotFound
	}
	return cloneCand(c), nil
}

func (m *Memory) ListCandidates(_ context.Context) ([]Candidate, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]Candidate, 0, len(m.candidates))
	for _, c := range m.candidates {
		out = append(out, *cloneCand(c))
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.After(out[j].CreatedAt) })
	return out, nil
}

func appKey(roleID, candID uuid.UUID) string {
	return roleID.String() + ":" + candID.String()
}

func (m *Memory) CreateApplication(_ context.Context, a *Application) error {
	m.mu.Lock()
	defer m.mu.Unlock()
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
	k := appKey(a.RoleID, a.CandidateID)
	if _, ok := m.appIndex[k]; ok {
		return ErrConflict
	}
	cp := *a
	m.apps[a.ID] = &cp
	m.appIndex[k] = a.ID
	return nil
}

func (m *Memory) GetApplication(_ context.Context, id uuid.UUID) (*Application, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	a, ok := m.apps[id]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *a
	return &cp, nil
}

func (m *Memory) GetApplicationByRoleCandidate(_ context.Context, roleID, candidateID uuid.UUID) (*Application, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	id, ok := m.appIndex[appKey(roleID, candidateID)]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *m.apps[id]
	return &cp, nil
}

func (m *Memory) ListApplications(_ context.Context, roleID *uuid.UUID) ([]Application, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []Application
	for _, a := range m.apps {
		if roleID != nil && a.RoleID != *roleID {
			continue
		}
		out = append(out, *a)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].SubmittedAt.Before(out[j].SubmittedAt) })
	return out, nil
}

func (m *Memory) UpdateApplicationStatus(_ context.Context, id uuid.UUID, status string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	a, ok := m.apps[id]
	if !ok {
		return ErrNotFound
	}
	a.Status = status
	return nil
}

func (m *Memory) InsertApplicationEvent(_ context.Context, e *ApplicationEvent) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if e.ID == uuid.Nil {
		e.ID = uuid.New()
	}
	if e.CreatedAt.IsZero() {
		e.CreatedAt = time.Now().UTC()
	}
	cp := *e
	m.events = append(m.events, &cp)
	return nil
}

func (m *Memory) ListApplicationEvents(_ context.Context, applicationID uuid.UUID) ([]ApplicationEvent, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []ApplicationEvent
	for _, e := range m.events {
		if e.ApplicationID == applicationID {
			out = append(out, *e)
		}
	}
	return out, nil
}

func (m *Memory) CreateNote(_ context.Context, n *Note) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if n.ID == uuid.Nil {
		n.ID = uuid.New()
	}
	if n.CreatedAt.IsZero() {
		n.CreatedAt = time.Now().UTC()
	}
	cp := *n
	m.notes = append(m.notes, &cp)
	return nil
}

func (m *Memory) ListNotes(_ context.Context, entityType string, entityID uuid.UUID) ([]Note, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []Note
	for _, n := range m.notes {
		if n.EntityType == entityType && n.EntityID == entityID {
			out = append(out, *n)
		}
	}
	return out, nil
}

func (m *Memory) CreateSplitAgreement(_ context.Context, s *SplitAgreement) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if s.ID == uuid.Nil {
		s.ID = uuid.New()
	}
	if s.CreatedAt.IsZero() {
		s.CreatedAt = time.Now().UTC()
	}
	if s.TermsJSON == nil {
		s.TermsJSON = json.RawMessage(`{}`)
	}
	cp := *s
	cp.TermsJSON = cloneJSON(s.TermsJSON)
	m.splits[s.ApplicationID] = &cp
	return nil
}

func (m *Memory) GetSplitAgreementByApplication(_ context.Context, applicationID uuid.UUID) (*SplitAgreement, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	s, ok := m.splits[applicationID]
	if !ok {
		return nil, ErrNotFound
	}
	cp := *s
	cp.TermsJSON = cloneJSON(s.TermsJSON)
	return &cp, nil
}

func (m *Memory) CreateMatchRecord(_ context.Context, rec *MatchRecord) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if rec.ID == uuid.Nil {
		rec.ID = uuid.New()
	}
	if rec.CreatedAt.IsZero() {
		rec.CreatedAt = time.Now().UTC()
	}
	cp := *rec
	m.matches = append(m.matches, &cp)
	return nil
}

func (m *Memory) ListMatchRecords(_ context.Context, roleID uuid.UUID) ([]MatchRecord, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []MatchRecord
	for _, rec := range m.matches {
		if rec.RoleID == roleID {
			out = append(out, *rec)
		}
	}
	sort.Slice(out, func(i, j int) bool {
		if out[i].Score == out[j].Score {
			return out[i].UserID.String() < out[j].UserID.String()
		}
		return out[i].Score > out[j].Score
	})
	return out, nil
}

func (m *Memory) CreateAutomation(_ context.Context, a *Automation) error {
	m.mu.Lock()
	defer m.mu.Unlock()
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
	cp := *a
	cp.Payload = cloneJSON(a.Payload)
	m.automations[a.ID] = &cp
	return nil
}

func (m *Memory) ListAutomations(_ context.Context) ([]Automation, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	out := make([]Automation, 0, len(m.automations))
	for _, a := range m.automations {
		cp := *a
		cp.Payload = cloneJSON(a.Payload)
		out = append(out, cp)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.After(out[j].CreatedAt) })
	return out, nil
}

func (m *Memory) ListPendingAutomations(_ context.Context) ([]Automation, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	var out []Automation
	for _, a := range m.automations {
		if a.Status == "pending" {
			cp := *a
			cp.Payload = cloneJSON(a.Payload)
			out = append(out, cp)
		}
	}
	sort.Slice(out, func(i, j int) bool { return out[i].CreatedAt.Before(out[j].CreatedAt) })
	return out, nil
}

func (m *Memory) MarkAutomation(_ context.Context, id uuid.UUID, status string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	a, ok := m.automations[id]
	if !ok {
		return ErrNotFound
	}
	a.Status = status
	now := time.Now().UTC()
	a.ProcessedAt = &now
	return nil
}

func (m *Memory) PublicStats(_ context.Context) (*Stats, error) {
	m.mu.RLock()
	defer m.mu.RUnlock()
	s := &Stats{Candidates: len(m.candidates)}
	for _, r := range m.roles {
		if r.Status != "open" {
			continue
		}
		s.OpenRoles++
		switch r.Kind {
		case "direct":
			s.Direct++
		case "xchange":
			s.Xchange++
		case "referral":
			s.Referral++
		}
	}
	return s, nil
}

var _ Store = (*Memory)(nil)
var _ Store = (*Postgres)(nil)
