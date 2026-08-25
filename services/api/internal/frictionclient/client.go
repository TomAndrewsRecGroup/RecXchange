package frictionclient

import (
	"bytes"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"strings"
	"time"
	"unicode"
)

type ScoreRequest struct {
	Title              string   `json:"title"`
	Description        string   `json:"description"`
	Location           string   `json:"location"`
	SalaryMin          int      `json:"salary_min"`
	SalaryMax          int      `json:"salary_max"`
	MustHaves          []string `json:"must_haves"`
	RoleKind           string   `json:"role_kind"`
	ProposedOwnerBps   int      `json:"proposed_owner_bps"`
	ProposedPartnerBps int      `json:"proposed_partner_bps"`
}

type Finding struct {
	Code     string `json:"code"`
	Severity string `json:"severity"`
	Message  string `json:"message"`
}

type Score struct {
	AdvertScore int       `json:"advert_score"`
	SplitScore  int       `json:"split_score"`
	Verdict     string    `json:"verdict"`
	Findings    []Finding `json:"findings"`
}

type Client struct {
	BaseURL string
	HTTP    *http.Client
}

func New(baseURL string) *Client {
	return &Client{
		BaseURL: strings.TrimRight(baseURL, "/"),
		HTTP:    &http.Client{Timeout: 5 * time.Second},
	}
}

func (c *Client) Score(ctx context.Context, req ScoreRequest) (Score, error) {
	if c == nil || c.BaseURL == "" {
		return ScoreLocal(req), nil
	}
	b, err := json.Marshal(req)
	if err != nil {
		return Score{}, err
	}
	httpReq, err := http.NewRequestWithContext(ctx, http.MethodPost, c.BaseURL+"/v1/score", bytes.NewReader(b))
	if err != nil {
		return Score{}, err
	}
	httpReq.Header.Set("Content-Type", "application/json")
	res, err := c.HTTP.Do(httpReq)
	if err != nil {
		return ScoreLocal(req), nil
	}
	defer res.Body.Close()
	raw, _ := io.ReadAll(io.LimitReader(res.Body, 1<<20))
	var out Score
	if err := json.Unmarshal(raw, &out); err != nil {
		return ScoreLocal(req), nil
	}
	return out, nil
}

var vague = map[string]struct{}{"consultant": {}, "professional": {}, "various": {}, "tbd": {}}

func ScoreLocal(req ScoreRequest) Score {
	findings := []Finding{}
	advert, split := 100, 100
	words := strings.Fields(strings.TrimSpace(req.Title))
	vagueHit := len(words) < 4
	for _, w := range words {
		k := strings.ToLower(strings.TrimFunc(w, func(r rune) bool { return !unicode.IsLetter(r) }))
		if _, ok := vague[k]; ok {
			vagueHit = true
		}
	}
	if vagueHit {
		advert -= 25
		findings = append(findings, Finding{Code: "TITLE_VAGUE", Severity: "warn", Message: "Title is vague. Name the job, not a category."})
	}
	if strings.TrimSpace(req.Location) == "" {
		advert -= 20
		findings = append(findings, Finding{Code: "LOCATION_MISSING", Severity: "warn", Message: "No location. Recruiter traffic will be weak."})
	}
	if req.SalaryMin <= 0 && req.SalaryMax <= 0 {
		advert -= 15
		findings = append(findings, Finding{Code: "SALARY_MISSING", Severity: "warn", Message: "No salary. Recruiter traffic will be weak."})
	} else if req.SalaryMax > 0 && req.SalaryMin > 0 && req.SalaryMax < req.SalaryMin {
		advert -= 30
		findings = append(findings, Finding{Code: "SALARY_INCOHERENT", Severity: "block", Message: "Salary max is below min. Fix the band before you publish."})
	}
	if len(req.Description) < 400 {
		advert -= 20
		findings = append(findings, Finding{Code: "DESCRIPTION_THIN", Severity: "warn", Message: "Description is thin. Spell out the work, not the vibe."})
	}
	if len(req.MustHaves) == 0 {
		advert -= 15
		findings = append(findings, Finding{Code: "MUST_HAVES_MISSING", Severity: "warn", Message: "No must-haves. Partners will guess, and guess wrong."})
	}
	if strings.EqualFold(req.RoleKind, "xchange") {
		if req.ProposedOwnerBps+req.ProposedPartnerBps != 10000 {
			split = 0
			findings = append(findings, Finding{Code: "SPLIT_INVALID", Severity: "block", Message: "Owner and partner shares must add to 100%."})
		} else if req.ProposedPartnerBps < 2000 {
			split -= 60
			findings = append(findings, Finding{Code: "SPLIT_HOSTILE", Severity: "block", Message: "A split this hostile will not attract the network."})
		} else if req.ProposedPartnerBps < 3000 {
			split -= 40
			findings = append(findings, Finding{Code: "SPLIT_UNATTRACTIVE", Severity: "warn", Message: "Partner share is thin. The network will skip this."})
		}
	}
	if advert < 0 {
		advert = 0
	}
	if advert > 100 {
		advert = 100
	}
	if split < 0 {
		split = 0
	}
	if split > 100 {
		split = 100
	}
	verdict := "ok"
	blocked := false
	for _, f := range findings {
		if f.Severity == "block" {
			blocked = true
		}
	}
	if blocked {
		verdict = "block"
	} else if advert < 50 || (strings.EqualFold(req.RoleKind, "xchange") && split < 50) {
		verdict = "warn"
	}
	return Score{AdvertScore: advert, SplitScore: split, Verdict: verdict, Findings: findings}
}
