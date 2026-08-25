package matchclient

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"

	"recxchange-v2-api/internal/entitlements"
)

type QuoteRequest struct {
	RoleKind           string `json:"role_kind"`
	Plan               string `json:"plan"`
	ProposedOwnerBps   *int   `json:"proposed_owner_bps,omitempty"`
	ProposedPartnerBps *int   `json:"proposed_partner_bps,omitempty"`
}

type Quote = entitlements.Quote

type StampRequest struct {
	RoleID          uuid.UUID `json:"role_id"`
	CandidateID     uuid.UUID `json:"candidate_id"`
	SubmitterUserID uuid.UUID `json:"submitter_user_id"`
}

type Stamp struct {
	Timestamp time.Time `json:"timestamp"`
	Key       string    `json:"key"`
}

type RoleProfile struct {
	ID       uuid.UUID `json:"id"`
	Kind     string    `json:"kind"`
	Location string    `json:"location"`
	City     string    `json:"city,omitempty"`
	Country  string    `json:"country,omitempty"`
	Category string    `json:"category,omitempty"`
	Sector   string    `json:"sector,omitempty"`
}

type RecruiterProfile struct {
	UserID          uuid.UUID `json:"user_id"`
	Categories      []string  `json:"categories"`
	Locations       []string  `json:"locations"`
	HistoricalKinds []string  `json:"historical_kinds"`
}

type RankRequest struct {
	Role       RoleProfile        `json:"role"`
	Recruiters []RecruiterProfile `json:"recruiters"`
}

type RankHit struct {
	UserID uuid.UUID `json:"user_id"`
	Score  int       `json:"score"`
	Reason string    `json:"reason"`
}

type APIError struct {
	Code    string
	Message string
	Status  int
}

func (e APIError) Error() string { return e.Code + ": " + e.Message }

type Client struct {
	BaseURL    string
	HTTP       *http.Client
	localStamps *stampBook
}

func New(baseURL string) *Client {
	return &Client{
		BaseURL: strings.TrimRight(baseURL, "/"),
		HTTP:    &http.Client{Timeout: 5 * time.Second},
		localStamps: newStampBook(),
	}
}

func (c *Client) Quote(ctx context.Context, req QuoteRequest) (Quote, error) {
	if c == nil || c.BaseURL == "" {
		return quoteLocal(req)
	}
	var out Quote
	if err := c.post(ctx, "/v1/split/quote", req, &out); err != nil {
		return quoteLocal(req)
	}
	return out, nil
}

func (c *Client) Stamp(ctx context.Context, req StampRequest) (Stamp, error) {
	if c == nil || c.BaseURL == "" {
		return c.localOrNew().stamp(req)
	}
	var out Stamp
	if err := c.post(ctx, "/v1/ownership/stamp", req, &out); err != nil {
		if ae, ok := err.(APIError); ok && ae.Code == "ALREADY_OWNED" {
			return Stamp{}, ae
		}
		return c.localOrNew().stamp(req)
	}
	return out, nil
}

func (c *Client) MatchRole(ctx context.Context, req RankRequest) ([]RankHit, error) {
	if c == nil || c.BaseURL == "" {
		return rankLocal(req), nil
	}
	var out struct {
		Matches []RankHit `json:"matches"`
	}
	if err := c.post(ctx, "/v1/match/role", req, &out); err != nil {
		return rankLocal(req), nil
	}
	return out.Matches, nil
}

func (c *Client) localOrNew() *stampBook {
	if c == nil {
		return newStampBook()
	}
	if c.localStamps == nil {
		c.localStamps = newStampBook()
	}
	return c.localStamps
}

func (c *Client) post(ctx context.Context, path string, body, dest any) error {
	b, err := json.Marshal(body)
	if err != nil {
		return err
	}
	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, c.BaseURL+path, bytes.NewReader(b))
	if err != nil {
		return err
	}
	httpReq.Header.Set("Content-Type", "application/json")
	res, err := c.HTTP.Do(httpReq)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	raw, _ := io.ReadAll(io.LimitReader(res.Body, 1<<20))
	if res.StatusCode >= 300 {
		var wrap struct {
			Error struct {
				Code    string `json:"code"`
				Message string `json:"message"`
			} `json:"error"`
		}
		_ = json.Unmarshal(raw, &wrap)
		code := wrap.Error.Code
		if code == "" {
			code = "MATCH_ERROR"
		}
		msg := wrap.Error.Message
		if msg == "" {
			msg = string(raw)
		}
		return APIError{Code: code, Message: msg, Status: res.StatusCode}
	}
	if dest == nil {
		return nil
	}
	return json.Unmarshal(raw, dest)
}

func quoteLocal(req QuoteRequest) (Quote, error) {
	owner, partner := 0, 0
	if req.ProposedOwnerBps != nil {
		owner = *req.ProposedOwnerBps
	}
	if req.ProposedPartnerBps != nil {
		partner = *req.ProposedPartnerBps
	}
	return entitlements.QuoteFor(req.RoleKind, req.Plan, owner, partner)
}

type stampBook struct {
	mu   sync.Mutex
	keys map[string]struct{}
}

func newStampBook() *stampBook {
	return &stampBook{keys: make(map[string]struct{})}
}

func (b *stampBook) stamp(req StampRequest) (Stamp, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	key := req.RoleID.String() + ":" + req.CandidateID.String()
	if _, ok := b.keys[key]; ok {
		return Stamp{}, APIError{Code: "ALREADY_OWNED", Message: "This candidate is already stamped on this role.", Status: 409}
	}
	b.keys[key] = struct{}{}
	return Stamp{Timestamp: time.Now().UTC(), Key: key}, nil
}

func rankLocal(req RankRequest) []RankHit {
	hits := make([]RankHit, 0, len(req.Recruiters))
	for _, rec := range req.Recruiters {
		hits = append(hits, scoreOne(req.Role, rec))
	}
	// deterministic: score desc, user_id asc
	for i := 0; i < len(hits); i++ {
		for j := i + 1; j < len(hits); j++ {
			if hits[j].Score > hits[i].Score || (hits[j].Score == hits[i].Score && hits[j].UserID.String() < hits[i].UserID.String()) {
				hits[i], hits[j] = hits[j], hits[i]
			}
		}
	}
	return hits
}

func scoreOne(role RoleProfile, rec RecruiterProfile) RankHit {
	score := 0
	var reasons []string
	roleCat := strings.ToLower(role.Category)
	if roleCat == "" {
		roleCat = strings.ToLower(role.Sector)
	}
	if roleCat != "" {
		for _, c := range rec.Categories {
			cl := strings.ToLower(c)
			if cl == roleCat || strings.Contains(roleCat, cl) {
				score += 40
				reasons = append(reasons, "category overlap")
				break
			}
		}
	}
	loc := strings.ToLower(role.Location)
	city := strings.ToLower(role.City)
	for _, l := range rec.Locations {
		ll := strings.ToLower(l)
		if (loc != "" && strings.Contains(loc, ll)) || (city != "" && strings.Contains(city, ll)) || (loc != "" && strings.Contains(ll, loc)) {
			score += 35
			reasons = append(reasons, "location overlap")
			break
		}
	}
	for _, k := range rec.HistoricalKinds {
		if strings.EqualFold(k, role.Kind) {
			score += 25
			reasons = append(reasons, "historical kind")
			break
		}
	}
	reason := "no overlap"
	if len(reasons) > 0 {
		reason = strings.Join(reasons, ", ")
	}
	return RankHit{UserID: rec.UserID, Score: score, Reason: reason}
}

func FormatStampKey(roleID, candidateID uuid.UUID) string {
	return fmt.Sprintf("%s:%s", roleID, candidateID)
}
