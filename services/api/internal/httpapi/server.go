package httpapi

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"

	"recxchange-v2-api/internal/auth"
	"recxchange-v2-api/internal/entitlements"
	"recxchange-v2-api/internal/frictionclient"
	"recxchange-v2-api/internal/matchclient"
	"recxchange-v2-api/internal/store"
	"recxchange-v2-api/internal/worker"
)

type ctxKey int

const userKey ctxKey = 1

type Server struct {
	Store     store.Store
	Match     *matchclient.Client
	Friction  *frictionclient.Client
	Worker    *worker.Worker
	Secret    string
	WebOrigin string
	Limiter   *auth.RateLimiter
}

func New(s store.Store, match *matchclient.Client, fr *frictionclient.Client, secret, origin string) *Server {
	w := &worker.Worker{Store: s}
	return &Server{
		Store:     s,
		Match:     match,
		Friction:  fr,
		Worker:    w,
		Secret:    secret,
		WebOrigin: origin,
		Limiter:   auth.DefaultLoginLimiter(),
	}
}

func (s *Server) Router() http.Handler {
	r := chi.NewRouter()
	r.Use(s.cors)
	r.Get("/healthz", func(w http.ResponseWriter, _ *http.Request) {
		writeJSON(w, http.StatusOK, map[string]any{"ok": true, "service": "api"})
	})
	r.Post("/v1/auth/login", s.login)
	r.Post("/v1/auth/logout", s.logout)
	r.Get("/v1/auth/me", s.me)
	r.Get("/v1/public/roles", s.publicRoles)
	r.Get("/v1/public/roles/{id}", s.publicRole)
	r.Get("/v1/public/stats", s.publicStats)

	r.Group(func(r chi.Router) {
		r.Use(s.requireUser)
		r.Get("/v1/clients", s.listClients)
		r.Post("/v1/clients", s.createClient)
		r.Get("/v1/clients/{id}", s.getClient)
		r.Patch("/v1/clients/{id}", s.patchClient)
		r.Get("/v1/roles", s.listRoles)
		r.Post("/v1/roles", s.createRole)
		r.Get("/v1/roles/{id}", s.getRole)
		r.Patch("/v1/roles/{id}", s.patchRole)
		r.Post("/v1/roles/{id}/work", s.workRole)
		r.Post("/v1/roles/{id}/publish", s.publishRole)
		r.Post("/v1/roles/{id}/applications", s.apply)
		r.Get("/v1/candidates", s.listCandidates)
		r.Post("/v1/candidates", s.createCandidate)
		r.Post("/v1/xray/search", s.xray)
		r.Post("/v1/applications/{id}/stage", s.stage)
		r.Get("/v1/pipeline", s.pipeline)
		r.Get("/v1/notes", s.listNotes)
		r.Post("/v1/notes", s.createNote)
		r.Get("/v1/automations", s.listAutomations)
		r.Get("/v1/admin/users", s.adminUsers)
		r.Patch("/v1/admin/users", s.adminPatchUser)
		r.Get("/v1/admin/audit", s.adminAudit)
	})
	return r
}

func (s *Server) cors(next http.Handler) http.Handler {
	origin := s.WebOrigin
	if origin == "" {
		origin = "http://localhost:3001"
	}
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", origin)
		w.Header().Set("Access-Control-Allow-Credentials", "true")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}

func writeErr(w http.ResponseWriter, status int, code, msg string) {
	writeJSON(w, status, map[string]any{"error": map[string]string{"code": code, "message": msg}})
}

func (s *Server) currentUser(r *http.Request) *store.User {
	u, _ := r.Context().Value(userKey).(*store.User)
	return u
}

func (s *Server) loadUser(r *http.Request) *store.User {
	c, err := r.Cookie(auth.CookieName)
	if err != nil || c.Value == "" {
		return nil
	}
	hash := auth.HashToken(s.Secret, c.Value)
	sess, err := s.Store.GetSessionByTokenHash(r.Context(), hash)
	if err != nil || sess.ExpiresAt.Before(time.Now()) {
		return nil
	}
	u, err := s.Store.GetUserByID(r.Context(), sess.UserID)
	if err != nil {
		return nil
	}
	return u
}

func (s *Server) requireUser(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		u := s.loadUser(r)
		if u == nil {
			writeErr(w, http.StatusUnauthorized, "UNAUTHENTICATED", "Log in.")
			return
		}
		ctx := context.WithValue(r.Context(), userKey, u)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func (s *Server) login(w http.ResponseWriter, r *http.Request) {
	ip := r.RemoteAddr
	if !s.Limiter.Allow(ip) {
		writeErr(w, http.StatusTooManyRequests, "RATE_LIMIT", "Too many login attempts.")
		return
	}
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, http.StatusBadRequest, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	u, err := s.Store.GetUserByEmail(r.Context(), strings.ToLower(strings.TrimSpace(body.Email)))
	if err != nil {
		writeErr(w, http.StatusUnauthorized, "INVALID_CREDENTIALS", "Email or password is wrong.")
		return
	}
	ok, _ := auth.CheckPassword(body.Password, u.PasswordHash)
	if !ok {
		writeErr(w, http.StatusUnauthorized, "INVALID_CREDENTIALS", "Email or password is wrong.")
		return
	}
	token, err := auth.NewToken()
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "INTERNAL", "Could not start session.")
		return
	}
	sess := &store.Session{UserID: u.ID, TokenHash: auth.HashToken(s.Secret, token), ExpiresAt: time.Now().Add(24 * time.Hour)}
	if err := s.Store.CreateSession(r.Context(), sess); err != nil {
		writeErr(w, http.StatusInternalServerError, "INTERNAL", "Could not start session.")
		return
	}
	auth.SetSessionCookie(w, token, 24*time.Hour)
	_ = s.Store.InsertAudit(r.Context(), &store.AuditLog{ActorID: &u.ID, Action: "login", EntityType: "user", EntityID: &u.ID})
	writeJSON(w, http.StatusOK, map[string]any{"user": publicUser(u)})
}

func (s *Server) logout(w http.ResponseWriter, r *http.Request) {
	if c, err := r.Cookie(auth.CookieName); err == nil {
		_ = s.Store.DeleteSessionByTokenHash(r.Context(), auth.HashToken(s.Secret, c.Value))
	}
	auth.ClearSessionCookie(w)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true})
}

func (s *Server) me(w http.ResponseWriter, r *http.Request) {
	u := s.loadUser(r)
	if u == nil {
		writeErr(w, http.StatusUnauthorized, "UNAUTHENTICATED", "Log in.")
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"user": publicUser(u)})
}

func publicUser(u *store.User) map[string]any {
	return map[string]any{"id": u.ID, "email": u.Email, "name": u.Name, "plan": u.Plan, "is_admin": u.IsAdmin}
}

func (s *Server) redact(ctx context.Context, role *store.Role, u *store.User) map[string]any {
	hidden := role.Kind != entitlements.KindXchange
	if u != nil {
		ok, _ := s.Store.HasTermsAcceptance(ctx, u.ID, role.ID)
		if ok {
			hidden = false
		}
	}
	var client any
	if !hidden && role.ClientID != nil {
		if c, err := s.Store.GetClient(ctx, *role.ClientID); err == nil {
			client = map[string]any{"id": c.ID, "name": c.Name, "sector": c.Sector}
		}
	}
	return map[string]any{
		"id": role.ID, "kind": role.Kind, "title": role.Title, "description": role.Description,
		"location": role.Location, "city": role.City, "country": role.Country,
		"salary_min": role.SalaryMin, "salary_max": role.SalaryMax, "currency": role.Currency,
		"bounty_amount": role.BountyAmount,
		"proposed_split_owner_bps": role.ProposedSplitOwnerBps, "proposed_split_partner_bps": role.ProposedSplitPartnerBps,
		"urgency": role.Urgency, "status": role.Status, "must_haves": role.MustHaves,
		"friction_advert_score": role.FrictionAdvertScore, "friction_split_score": role.FrictionSplitScore,
		"friction_report": role.FrictionReport, "created_at": role.CreatedAt,
		"client_hidden": hidden, "client": client, "read_only": u == nil,
	}
}

func (s *Server) publicRoles(w http.ResponseWriter, r *http.Request) {
	kind := r.URL.Query().Get("kind")
	roles, err := s.Store.ListRoles(r.Context(), kind, "open")
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "INTERNAL", "Could not list roles.")
		return
	}
	out := make([]any, 0, len(roles))
	for i := range roles {
		out = append(out, s.redact(r.Context(), &roles[i], s.loadUser(r)))
	}
	writeJSON(w, http.StatusOK, map[string]any{"roles": out})
}

func (s *Server) publicRole(w http.ResponseWriter, r *http.Request) {
	id, err := uuid.Parse(chi.URLParam(r, "id"))
	if err != nil {
		writeErr(w, http.StatusBadRequest, "BAD_REQUEST", "Invalid id.")
		return
	}
	role, err := s.Store.GetRole(r.Context(), id)
	if err != nil {
		writeErr(w, http.StatusNotFound, "NOT_FOUND", "Role not found.")
		return
	}
	writeJSON(w, http.StatusOK, s.redact(r.Context(), role, s.loadUser(r)))
}

func (s *Server) publicStats(w http.ResponseWriter, r *http.Request) {
	st, err := s.Store.PublicStats(r.Context())
	if err != nil {
		writeErr(w, http.StatusInternalServerError, "INTERNAL", "Could not load stats.")
		return
	}
	writeJSON(w, http.StatusOK, st)
}

func (s *Server) listClients(w http.ResponseWriter, r *http.Request) {
	list, err := s.Store.ListClients(r.Context())
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list clients.")
		return
	}
	writeJSON(w, 200, map[string]any{"clients": list})
}

func (s *Server) createClient(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	if !entitlements.CanMutate(u.Plan) {
		writeErr(w, 403, "PLAN_GATE", "Your plan cannot do this.")
		return
	}
	var body store.Client
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	body.OwnerUserID = u.ID
	if err := s.Store.CreateClient(r.Context(), &body); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not create client.")
		return
	}
	writeJSON(w, 201, body)
}

func (s *Server) getClient(w http.ResponseWriter, r *http.Request) {
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	c, err := s.Store.GetClient(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Client not found.")
		return
	}
	writeJSON(w, 200, c)
}

func (s *Server) patchClient(w http.ResponseWriter, r *http.Request) {
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	c, err := s.Store.GetClient(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Client not found.")
		return
	}
	var body map[string]any
	_ = json.NewDecoder(r.Body).Decode(&body)
	if n, ok := body["name"].(string); ok {
		c.Name = n
	}
	if n, ok := body["sector"].(string); ok {
		c.Sector = n
	}
	if err := s.Store.UpdateClient(r.Context(), c); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not update.")
		return
	}
	writeJSON(w, 200, c)
}

func (s *Server) listRoles(w http.ResponseWriter, r *http.Request) {
	roles, err := s.Store.ListRoles(r.Context(), r.URL.Query().Get("kind"), r.URL.Query().Get("status"))
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list roles.")
		return
	}
	u := s.currentUser(r)
	out := make([]any, 0, len(roles))
	for i := range roles {
		out = append(out, s.redact(r.Context(), &roles[i], u))
	}
	writeJSON(w, 200, map[string]any{"roles": out})
}

func decodeRole(r *http.Request, existing *store.Role) (*store.Role, error) {
	var body map[string]any
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		return nil, err
	}
	role := existing
	if role == nil {
		role = &store.Role{Kind: "direct", Status: "draft", Currency: "GBP", ProposedSplitOwnerBps: 5000, ProposedSplitPartnerBps: 5000, Urgency: "standard"}
	}
	if v, ok := body["kind"].(string); ok {
		role.Kind = v
	}
	if v, ok := body["title"].(string); ok {
		role.Title = v
	}
	if v, ok := body["description"].(string); ok {
		role.Description = v
	}
	if v, ok := body["location"].(string); ok {
		role.Location = v
	}
	if v, ok := body["city"].(string); ok {
		role.City = v
	}
	if v, ok := body["country"].(string); ok {
		role.Country = v
	}
	if v, ok := body["urgency"].(string); ok {
		role.Urgency = v
	}
	if v, ok := asInt(body["salary_min"]); ok {
		role.SalaryMin = v
	}
	if v, ok := asInt(body["salary_max"]); ok {
		role.SalaryMax = v
	}
	if v, ok := asInt(body["bounty_amount"]); ok {
		role.BountyAmount = v
	}
	if v, ok := asInt(body["proposed_split_owner_bps"]); ok {
		role.ProposedSplitOwnerBps = v
	}
	if v, ok := asInt(body["proposed_split_partner_bps"]); ok {
		role.ProposedSplitPartnerBps = v
	}
	if v, ok := body["must_haves"].([]any); ok {
		role.MustHaves = nil
		for _, x := range v {
			if s, ok := x.(string); ok {
				role.MustHaves = append(role.MustHaves, s)
			}
		}
	}
	if v, ok := body["client_id"].(string); ok && v != "" {
		id, err := uuid.Parse(v)
		if err == nil {
			role.ClientID = &id
		}
	}
	return role, nil
}

func asInt(v any) (int, bool) {
	switch t := v.(type) {
	case float64:
		return int(t), true
	case int:
		return t, true
	default:
		return 0, false
	}
}

func (s *Server) createRole(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	role, err := decodeRole(r, nil)
	if err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	if !entitlements.CanPostKind(u.Plan, role.Kind) {
		writeErr(w, 403, entitlements.PlanGateCode(role.Kind), entitlements.PlanGateMessage(role.Kind))
		return
	}
	role.OwnerUserID = u.ID
	if role.Kind == entitlements.KindXchange {
		role.ClientIdentityPublic = true
	}
	if err := s.Store.CreateRole(r.Context(), role); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not create role.")
		return
	}
	writeJSON(w, 201, s.redact(r.Context(), role, u))
}

func (s *Server) getRole(w http.ResponseWriter, r *http.Request) {
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	role, err := s.Store.GetRole(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Role not found.")
		return
	}
	writeJSON(w, 200, s.redact(r.Context(), role, s.currentUser(r)))
}

func (s *Server) patchRole(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	existing, err := s.Store.GetRole(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Role not found.")
		return
	}
	role, err := decodeRole(r, existing)
	if err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	if err := s.Store.UpdateRole(r.Context(), role); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not update.")
		return
	}
	writeJSON(w, 200, s.redact(r.Context(), role, u))
}

func (s *Server) workRole(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	role, err := s.Store.GetRole(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Role not found.")
		return
	}
	if !entitlements.CanWorkKind(u.Plan, role.Kind) {
		writeErr(w, 403, entitlements.PlanGateCode(role.Kind), entitlements.PlanGateMessage(role.Kind))
		return
	}
	if err := s.Store.AcceptTerms(r.Context(), u.ID, role.ID); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not accept terms.")
		return
	}
	_ = s.Store.InsertAudit(r.Context(), &store.AuditLog{ActorID: &u.ID, Action: "work_role", EntityType: "role", EntityID: &role.ID})
	writeJSON(w, 200, s.redact(r.Context(), role, u))
}

func (s *Server) publishRole(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	role, err := s.Store.GetRole(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Role not found.")
		return
	}
	var body struct {
		ConfirmWarn bool `json:"confirm_warn"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)
	score, err := s.Friction.Score(r.Context(), frictionclient.ScoreRequest{
		Title: role.Title, Description: role.Description, Location: role.Location,
		SalaryMin: role.SalaryMin, SalaryMax: role.SalaryMax, MustHaves: role.MustHaves,
		RoleKind: role.Kind, ProposedOwnerBps: role.ProposedSplitOwnerBps, ProposedPartnerBps: role.ProposedSplitPartnerBps,
	})
	if err != nil {
		writeErr(w, 502, "FRICTION_DOWN", "Friction service unavailable.")
		return
	}
	raw, _ := json.Marshal(score)
	role.FrictionReport = raw
	role.FrictionAdvertScore = &score.AdvertScore
	role.FrictionSplitScore = &score.SplitScore
	if role.Kind == entitlements.KindXchange && score.Verdict == "block" {
		_ = s.Store.UpdateRole(r.Context(), role)
		writeJSON(w, 422, map[string]any{"error": map[string]any{"code": "FRICTION_BLOCK", "message": "Friction blocked publish.", "findings": score.Findings}, "friction": score})
		return
	}
	if role.Kind == entitlements.KindXchange && score.Verdict == "warn" && !body.ConfirmWarn {
		_ = s.Store.UpdateRole(r.Context(), role)
		writeJSON(w, 422, map[string]any{"error": map[string]any{"code": "FRICTION_WARN", "message": "Publish allowed with confirm.", "findings": score.Findings}, "friction": score})
		return
	}
	role.Status = "open"
	if err := s.Store.UpdateRole(r.Context(), role); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not publish.")
		return
	}
	atype := "xchange_saved"
	if role.Kind == entitlements.KindDirect {
		atype = "notify_match"
		hits, _ := s.Match.MatchRole(r.Context(), matchclient.RankRequest{
			Role: matchclient.RoleProfile{ID: role.ID, Kind: role.Kind, Location: role.Location, City: role.City, Country: role.Country, Category: role.Category, Sector: role.Sector},
		})
		for _, h := range hits {
			_ = s.Store.CreateMatchRecord(r.Context(), &store.MatchRecord{RoleID: role.ID, UserID: h.UserID, Score: h.Score, Reason: h.Reason})
		}
	}
	payload, _ := json.Marshal(map[string]any{"role_id": role.ID, "friction": score})
	_ = s.Store.CreateAutomation(r.Context(), &store.Automation{Type: atype, Payload: payload, Status: "pending"})
	_ = s.Worker.DrainOnce(r.Context())
	writeJSON(w, 200, s.redact(r.Context(), role, u))
}

func (s *Server) apply(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	roleID, _ := uuid.Parse(chi.URLParam(r, "id"))
	role, err := s.Store.GetRole(r.Context(), roleID)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Role not found.")
		return
	}
	if !entitlements.CanApplyKind(u.Plan, role.Kind) {
		code := entitlements.PlanGateCode(role.Kind)
		writeErr(w, 403, code, entitlements.PlanGateMessage(role.Kind))
		return
	}
	var body struct {
		CandidateID string `json:"candidate_id"`
	}
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	cid, err := uuid.Parse(body.CandidateID)
	if err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid candidate.")
		return
	}
	if _, err := s.Store.GetCandidate(r.Context(), cid); err != nil {
		writeErr(w, 404, "NOT_FOUND", "Candidate not found.")
		return
	}
	if _, err := s.Store.GetApplicationByRoleCandidate(r.Context(), roleID, cid); err == nil {
		writeErr(w, 409, "ALREADY_OWNED", "This candidate is already stamped on this role.")
		return
	}
	stamp, err := s.Match.Stamp(r.Context(), matchclient.StampRequest{RoleID: roleID, CandidateID: cid, SubmitterUserID: u.ID})
	if err != nil {
		if ae, ok := err.(matchclient.APIError); ok && ae.Code == "ALREADY_OWNED" {
			writeErr(w, 409, "ALREADY_OWNED", ae.Message)
			return
		}
		writeErr(w, 502, "MATCH_DOWN", "Match service unavailable.")
		return
	}
	owner, partner := role.ProposedSplitOwnerBps, role.ProposedSplitPartnerBps
	q, err := s.Match.Quote(r.Context(), matchclient.QuoteRequest{RoleKind: role.Kind, Plan: u.Plan, ProposedOwnerBps: &owner, ProposedPartnerBps: &partner})
	if err != nil {
		writeErr(w, 403, "PLAN_GATE", err.Error())
		return
	}
	app := &store.Application{RoleID: roleID, CandidateID: cid, SubmitterUserID: u.ID, Status: "applied", SubmittedAt: stamp.Timestamp, OwnershipTimestamp: stamp.Timestamp}
	if err := s.Store.CreateApplication(r.Context(), app); err != nil {
		if errors.Is(err, store.ErrConflict) {
			writeErr(w, 409, "ALREADY_OWNED", "This candidate is already stamped on this role.")
			return
		}
		writeErr(w, 500, "INTERNAL", "Could not apply.")
		return
	}
	terms, _ := json.Marshal(q)
	_ = s.Store.CreateSplitAgreement(r.Context(), &store.SplitAgreement{
		ApplicationID: app.ID, RoleID: roleID, RoleKind: role.Kind, PlanAtSubmit: u.Plan,
		RecxBps: q.RecxBps, RecruiterBps: q.RecruiterBps, PartnerBps: q.PartnerBps, TermsJSON: terms,
	})
	payload, _ := json.Marshal(map[string]any{"application_id": app.ID, "split": q.Display})
	_ = s.Store.CreateAutomation(r.Context(), &store.Automation{Type: "application_submitted", Payload: payload, Status: "pending"})
	_ = s.Worker.DrainOnce(r.Context())
	writeJSON(w, 201, map[string]any{"application": app, "split": q})
}

func (s *Server) listCandidates(w http.ResponseWriter, r *http.Request) {
	list, err := s.Store.ListCandidates(r.Context())
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list.")
		return
	}
	writeJSON(w, 200, map[string]any{"candidates": list})
}

func (s *Server) createCandidate(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	var c store.Candidate
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	c.OwnerUserID = u.ID
	if c.SourceLabel == "" {
		c.SourceLabel = "user"
	}
	if err := s.Store.CreateCandidate(r.Context(), &c); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not create.")
		return
	}
	writeJSON(w, 201, c)
}

func (s *Server) xray(w http.ResponseWriter, r *http.Request) {
	var q struct {
		Keywords  string   `json:"keywords"`
		Title     string   `json:"title"`
		Location  string   `json:"location"`
		Skills    []string `json:"skills"`
		Systems   []string `json:"systems"`
		SalaryMin int      `json:"salary_min"`
	}
	_ = json.NewDecoder(r.Body).Decode(&q)
	cands, err := s.Store.ListCandidates(r.Context())
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not search.")
		return
	}
	type hit struct {
		Candidate store.Candidate `json:"candidate"`
		Score     int             `json:"score"`
		Why       []string        `json:"why"`
		Concerns  []string        `json:"concerns"`
		Verify    []string        `json:"verify"`
	}
	var hits []hit
	needles := strings.ToLower(strings.Join(append(append([]string{q.Keywords, q.Title, q.Location}, q.Skills...), q.Systems...), " "))
	for _, c := range cands {
		hay := strings.ToLower(strings.Join(append(append([]string{c.DisplayName, c.Headline, c.Location, c.Evidence}, c.Skills...), c.Systems...), " "))
		score := 0
		why := []string{}
		for _, t := range strings.Fields(needles) {
			if len(t) > 1 && strings.Contains(hay, t) {
				score += 8
				if len(why) < 5 {
					why = append(why, "Matches “"+t+"”")
				}
			}
		}
		concerns := []string{}
		verify := []string{"This is labelled demo data. Verify tickets on screen."}
		if strings.Contains(strings.ToLower(c.Evidence), "thin") {
			concerns = append(concerns, "Seed evidence is thin. Do not treat as verified.")
		}
		if score == 0 {
			why = append(why, "Weak overlap — listed so you can see a miss, not a fabricated match.")
		}
		hits = append(hits, hit{Candidate: c, Score: score, Why: why, Concerns: concerns, Verify: verify})
	}
	writeJSON(w, 200, map[string]any{"results": hits})
}

func (s *Server) stage(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	id, _ := uuid.Parse(chi.URLParam(r, "id"))
	app, err := s.Store.GetApplication(r.Context(), id)
	if err != nil {
		writeErr(w, 404, "NOT_FOUND", "Application not found.")
		return
	}
	var body struct {
		Status string `json:"status"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)
	from := app.Status
	if err := s.Store.UpdateApplicationStatus(r.Context(), id, body.Status); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not move.")
		return
	}
	_ = s.Store.InsertApplicationEvent(r.Context(), &store.ApplicationEvent{ApplicationID: id, FromStatus: from, ToStatus: body.Status, ActorID: &u.ID})
	payload, _ := json.Marshal(map[string]any{"application_id": id, "from": from, "to": body.Status, "email_stub": "Subject: Stage " + body.Status + "\n\nDemo only. No email sent."})
	_ = s.Store.CreateAutomation(r.Context(), &store.Automation{Type: "stage_changed", Payload: payload, Status: "pending"})
	_ = s.Worker.DrainOnce(r.Context())
	app.Status = body.Status
	writeJSON(w, 200, app)
}

func (s *Server) pipeline(w http.ResponseWriter, r *http.Request) {
	var roleID *uuid.UUID
	if q := r.URL.Query().Get("role_id"); q != "" {
		id, err := uuid.Parse(q)
		if err == nil {
			roleID = &id
		}
	}
	apps, err := s.Store.ListApplications(r.Context(), roleID)
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not load pipeline.")
		return
	}
	writeJSON(w, 200, map[string]any{"applications": apps})
}

func (s *Server) listNotes(w http.ResponseWriter, r *http.Request) {
	et := r.URL.Query().Get("entity_type")
	id, _ := uuid.Parse(r.URL.Query().Get("entity_id"))
	list, err := s.Store.ListNotes(r.Context(), et, id)
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list notes.")
		return
	}
	writeJSON(w, 200, map[string]any{"notes": list})
}

func (s *Server) createNote(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	var body store.Note
	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid JSON.")
		return
	}
	body.AuthorID = u.ID
	if err := s.Store.CreateNote(r.Context(), &body); err != nil {
		writeErr(w, 500, "INTERNAL", "Could not add note.")
		return
	}
	writeJSON(w, 201, body)
}

func (s *Server) listAutomations(w http.ResponseWriter, r *http.Request) {
	list, err := s.Store.ListAutomations(r.Context())
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list.")
		return
	}
	writeJSON(w, 200, map[string]any{"automations": list})
}

func (s *Server) adminUsers(w http.ResponseWriter, r *http.Request) {
	if !s.currentUser(r).IsAdmin {
		writeErr(w, 403, "FORBIDDEN", "Admin only.")
		return
	}
	list, err := s.Store.ListUsers(r.Context())
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list.")
		return
	}
	out := make([]map[string]any, 0, len(list))
	for i := range list {
		out = append(out, publicUser(&list[i]))
	}
	writeJSON(w, 200, map[string]any{"users": out})
}

func (s *Server) adminPatchUser(w http.ResponseWriter, r *http.Request) {
	u := s.currentUser(r)
	if !u.IsAdmin {
		writeErr(w, 403, "FORBIDDEN", "Admin only.")
		return
	}
	var body struct {
		ID   string `json:"id"`
		Plan string `json:"plan"`
	}
	_ = json.NewDecoder(r.Body).Decode(&body)
	id, err := uuid.Parse(body.ID)
	if err != nil {
		writeErr(w, 400, "BAD_REQUEST", "Invalid id.")
		return
	}
	if err := s.Store.UpdateUserPlan(r.Context(), id, body.Plan); err != nil {
		writeErr(w, 404, "NOT_FOUND", "User not found.")
		return
	}
	_ = s.Store.InsertAudit(r.Context(), &store.AuditLog{ActorID: &u.ID, Action: "patch_plan", EntityType: "user", EntityID: &id})
	writeJSON(w, 200, map[string]any{"ok": true})
}

func (s *Server) adminAudit(w http.ResponseWriter, r *http.Request) {
	if !s.currentUser(r).IsAdmin {
		writeErr(w, 403, "FORBIDDEN", "Admin only.")
		return
	}
	list, err := s.Store.ListAudit(r.Context(), 100)
	if err != nil {
		writeErr(w, 500, "INTERNAL", "Could not list.")
		return
	}
	writeJSON(w, 200, map[string]any{"audit": list})
}

func Env(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
