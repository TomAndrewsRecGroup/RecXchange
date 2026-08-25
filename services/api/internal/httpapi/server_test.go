package httpapi_test

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"strings"
	"sync"
	"testing"

	"github.com/google/uuid"

	"recxchange-v2-api/internal/auth"
	"recxchange-v2-api/internal/frictionclient"
	"recxchange-v2-api/internal/httpapi"
	"recxchange-v2-api/internal/matchclient"
	"recxchange-v2-api/internal/seed"
	"recxchange-v2-api/internal/store"
)

type fixture struct {
	ts       *httptest.Server
	mem      *store.Memory
	direct   uuid.UUID
	referral uuid.UUID
	xchange  uuid.UUID
	cand     uuid.UUID
	cand2    uuid.UUID
}

var hashOnce sync.Once
var hashes map[string]string

func passwordHashes(t *testing.T) map[string]string {
	t.Helper()
	hashOnce.Do(func() {
		hashes = map[string]string{}
		for _, a := range seed.Accounts {
			h, err := auth.HashPassword(a.Password)
			if err != nil {
				panic(err)
			}
			hashes[a.Email] = h
		}
	})
	return hashes
}

func setup(t *testing.T) *fixture {
	t.Helper()
	ctx := context.Background()
	mem := store.NewMemory()
	hs := passwordHashes(t)
	for _, a := range seed.Accounts {
		if err := mem.CreateUser(ctx, &store.User{
			ID: a.ID, Email: a.Email, PasswordHash: hs[a.Email], Name: a.Name, Plan: a.Plan, IsAdmin: a.Admin,
		}); err != nil {
			t.Fatal(err)
		}
	}
	admin := seed.Accounts[0]
	client := &store.Client{OwnerUserID: admin.ID, Name: "Northern Civils Demo Ltd", Sector: "civils"}
	if err := mem.CreateClient(ctx, client); err != nil {
		t.Fatal(err)
	}
	direct := &store.Role{
		OwnerUserID: admin.ID, ClientID: &client.ID, Kind: "direct",
		Title: "Lead Controls Engineer — Manchester", Description: strings.Repeat("Plant and controls. ", 30),
		Location: "Manchester, UK", City: "Manchester", Country: "UK",
		SalaryMin: 70000, SalaryMax: 90000, Status: "open", Currency: "GBP", BountyAmount: 6000,
	}
	referral := &store.Role{
		OwnerUserID: admin.ID, ClientID: &client.ID, Kind: "referral",
		Title: "Traffic Marshal — London civils", Description: strings.Repeat("Banksman and marshal. ", 30),
		Location: "London, UK", City: "London", Country: "UK",
		SalaryMin: 28000, SalaryMax: 32000, Status: "open",
	}
	xchange := &store.Role{
		OwnerUserID: admin.ID, Kind: "xchange", Title: "Rail Track Engineer — Birmingham nights",
		Description: strings.Repeat("PTS nights possession. ", 30),
		Location: "Birmingham, UK", City: "Birmingham", Country: "UK",
		SalaryMin: 50000, SalaryMax: 62000, Status: "open",
		ProposedSplitOwnerBps: 5000, ProposedSplitPartnerBps: 5000, ClientIdentityPublic: true,
	}
	if err := mem.CreateRole(ctx, direct); err != nil {
		t.Fatal(err)
	}
	if err := mem.CreateRole(ctx, referral); err != nil {
		t.Fatal(err)
	}
	if err := mem.CreateRole(ctx, xchange); err != nil {
		t.Fatal(err)
	}
	cand := &store.Candidate{
		OwnerUserID: admin.ID, DisplayName: "Alex Demo", Headline: "Controls engineer (FICTIONAL)",
		Location: "Manchester", Skills: []string{"PLC"}, Systems: []string{"Siemens"},
		Evidence: "Labelled fictional seed evidence.", SourceLabel: "FICTIONAL",
	}
	cand2 := &store.Candidate{
		OwnerUserID: admin.ID, DisplayName: "Jordan Example", Headline: "QS (FICTIONAL)",
		Location: "Leeds", SourceLabel: "FICTIONAL",
	}
	if err := mem.CreateCandidate(ctx, cand); err != nil {
		t.Fatal(err)
	}
	if err := mem.CreateCandidate(ctx, cand2); err != nil {
		t.Fatal(err)
	}

	srv := httpapi.New(mem, matchclient.New(""), frictionclient.New(""), "test-secret", "http://localhost:3001")
	ts := httptest.NewServer(srv.Router())
	t.Cleanup(ts.Close)
	return &fixture{ts: ts, mem: mem, direct: direct.ID, referral: referral.ID, xchange: xchange.ID, cand: cand.ID, cand2: cand2.ID}
}

func do(t *testing.T, ts *httptest.Server, method, path string, body any, cookie *http.Cookie) *http.Response {
	t.Helper()
	var rdr io.Reader
	if body != nil {
		b, err := json.Marshal(body)
		if err != nil {
			t.Fatal(err)
		}
		rdr = bytes.NewReader(b)
	}
	req, err := http.NewRequest(method, ts.URL+path, rdr)
	if err != nil {
		t.Fatal(err)
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}
	if cookie != nil {
		req.AddCookie(cookie)
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		t.Fatal(err)
	}
	return res
}

func decode(t *testing.T, res *http.Response) map[string]any {
	t.Helper()
	defer res.Body.Close()
	raw, _ := io.ReadAll(res.Body)
	var out map[string]any
	if len(raw) > 0 {
		if err := json.Unmarshal(raw, &out); err != nil {
			t.Fatalf("json %s: %v", raw, err)
		}
	}
	return out
}

func errCode(body map[string]any) string {
	if e, ok := body["error"].(map[string]any); ok {
		if c, ok := e["code"].(string); ok {
			return c
		}
	}
	return ""
}

func login(t *testing.T, ts *httptest.Server, email, password string) *http.Cookie {
	t.Helper()
	res := do(t, ts, http.MethodPost, "/v1/auth/login", map[string]string{"email": email, "password": password}, nil)
	body := decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("login %s: %d %v", email, res.StatusCode, body)
	}
	for _, c := range res.Cookies() {
		if c.Name == auth.CookieName {
			return c
		}
	}
	t.Fatal("no session cookie")
	return nil
}

func TestHealthz(t *testing.T) {
	f := setup(t)
	res := do(t, f.ts, http.MethodGet, "/healthz", nil, nil)
	body := decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("%d %v", res.StatusCode, body)
	}
}

func TestLoginSuccessAndFail(t *testing.T) {
	f := setup(t)
	res := do(t, f.ts, http.MethodPost, "/v1/auth/login", map[string]string{"email": "admin@recxchange.io", "password": "RecX-Admin-2026!"}, nil)
	body := decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("ok login %d %v", res.StatusCode, body)
	}
	u := body["user"].(map[string]any)
	if u["email"] != "admin@recxchange.io" || u["is_admin"] != true {
		t.Fatalf("user %+v", u)
	}
	res = do(t, f.ts, http.MethodPost, "/v1/auth/login", map[string]string{"email": "admin@recxchange.io", "password": "wrong"}, nil)
	body = decode(t, res)
	if res.StatusCode != 401 || errCode(body) != "INVALID_CREDENTIALS" {
		t.Fatalf("fail login %d %s", res.StatusCode, errCode(body))
	}
}

func TestGuestPublicRolesAndPostUnauthorized(t *testing.T) {
	f := setup(t)
	res := do(t, f.ts, http.MethodGet, "/v1/public/roles", nil, nil)
	body := decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("public %d %v", res.StatusCode, body)
	}
	roles := body["roles"].([]any)
	if len(roles) < 3 {
		t.Fatalf("want ≥3 roles, got %d", len(roles))
	}
	for _, raw := range roles {
		r := raw.(map[string]any)
		if r["read_only"] != true {
			t.Fatalf("public payload must be read_only: %+v", r)
		}
		if r["kind"] == "direct" && r["client"] != nil {
			t.Fatalf("public direct must hide client: %+v", r)
		}
	}
	res = do(t, f.ts, http.MethodPost, "/v1/roles", map[string]any{"kind": "direct", "title": "Nope"}, nil)
	body = decode(t, res)
	if res.StatusCode != 401 {
		t.Fatalf("guest POST role %d %v", res.StatusCode, body)
	}
}

func TestEntryReferralForbidden(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "entry@recxchange.io", "RecX-Entry-2026!")
	res := do(t, f.ts, http.MethodPost, "/v1/roles/"+f.referral.String()+"/applications", map[string]string{"candidate_id": f.cand.String()}, c)
	body := decode(t, res)
	if res.StatusCode != 403 || errCode(body) != "PLAN_GATE_REFERRAL" {
		t.Fatalf("entry referral %d %s %v", res.StatusCode, errCode(body), body)
	}
}

func TestLiteDirectQuote70_30(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "lite@recxchange.io", "RecX-Lite-2026!")
	res := do(t, f.ts, http.MethodPost, "/v1/roles/"+f.direct.String()+"/applications", map[string]string{"candidate_id": f.cand.String()}, c)
	body := decode(t, res)
	if res.StatusCode != 201 {
		t.Fatalf("lite apply %d %v", res.StatusCode, body)
	}
	split := body["split"].(map[string]any)
	if int(split["recruiter_bps"].(float64)) != 7000 || int(split["recx_bps"].(float64)) != 3000 {
		t.Fatalf("lite split %+v", split)
	}
}

func TestProDirectQuote100_0(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "pro@recxchange.io", "RecX-Pro-2026!")
	res := do(t, f.ts, http.MethodPost, "/v1/roles/"+f.direct.String()+"/applications", map[string]string{"candidate_id": f.cand.String()}, c)
	body := decode(t, res)
	if res.StatusCode != 201 {
		t.Fatalf("pro apply %d %v", res.StatusCode, body)
	}
	split := body["split"].(map[string]any)
	if int(split["recruiter_bps"].(float64)) != 10000 || int(split["recx_bps"].(float64)) != 0 {
		t.Fatalf("pro split %+v", split)
	}
}

func TestWorkRoleRevealsClient(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "admin@recxchange.io", "RecX-Admin-2026!")
	res := do(t, f.ts, http.MethodGet, "/v1/roles/"+f.direct.String(), nil, c)
	body := decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("get role %d %v", res.StatusCode, body)
	}
	if body["client_hidden"] != true || body["client"] != nil {
		t.Fatalf("before work %+v", body)
	}
	res = do(t, f.ts, http.MethodPost, "/v1/roles/"+f.direct.String()+"/work", map[string]any{}, c)
	body = decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("work %d %v", res.StatusCode, body)
	}
	if body["client_hidden"] != false {
		t.Fatalf("after work hidden %+v", body)
	}
	client, _ := body["client"].(map[string]any)
	if client == nil || client["name"] == "" {
		t.Fatalf("client not revealed: %+v", body["client"])
	}
}

func TestDoubleApplyConflict(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "pro@recxchange.io", "RecX-Pro-2026!")
	res := do(t, f.ts, http.MethodPost, "/v1/roles/"+f.direct.String()+"/applications", map[string]string{"candidate_id": f.cand.String()}, c)
	body := decode(t, res)
	if res.StatusCode != 201 {
		t.Fatalf("first apply %d %v", res.StatusCode, body)
	}
	res = do(t, f.ts, http.MethodPost, "/v1/roles/"+f.direct.String()+"/applications", map[string]string{"candidate_id": f.cand.String()}, c)
	body = decode(t, res)
	if res.StatusCode != 409 || errCode(body) != "ALREADY_OWNED" {
		t.Fatalf("second apply %d %s %v", res.StatusCode, errCode(body), body)
	}
}

func TestAdminOnly(t *testing.T) {
	f := setup(t)
	c := login(t, f.ts, "pro@recxchange.io", "RecX-Pro-2026!")
	res := do(t, f.ts, http.MethodGet, "/v1/admin/users", nil, c)
	body := decode(t, res)
	if res.StatusCode != 403 {
		t.Fatalf("pro admin %d %v", res.StatusCode, body)
	}
	admin := login(t, f.ts, "admin@recxchange.io", "RecX-Admin-2026!")
	res = do(t, f.ts, http.MethodGet, "/v1/admin/users", nil, admin)
	body = decode(t, res)
	if res.StatusCode != 200 {
		t.Fatalf("admin users %d %v", res.StatusCode, body)
	}
}
