package auth

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"net/http"
	"os"
	"strings"
	"sync"
	"time"

	"github.com/alexedwards/argon2id"
)

const CookieName = "recx_session"

// Params match the documented seed hashes: time=2, memory=64MiB, threads=1.
var Params = &argon2id.Params{
	Memory:      64 * 1024,
	Iterations:  2,
	Parallelism: 1,
	SaltLength:  16,
	KeyLength:   32,
}

func HashPassword(password string) (string, error) {
	return argon2id.CreateHash(password, Params)
}

func CheckPassword(password, hash string) (bool, error) {
	return argon2id.ComparePasswordAndHash(password, hash)
}

func NewToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	return hex.EncodeToString(b), nil
}

func HashToken(secret, token string) string {
	sum := sha256.Sum256([]byte(secret + ":" + token))
	return hex.EncodeToString(sum[:])
}

func Cookie(token string, maxAge int) *http.Cookie {
	c := &http.Cookie{
		Name:     CookieName,
		Value:    token,
		Path:     "/",
		MaxAge:   maxAge,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
		Secure:   strings.EqualFold(os.Getenv("ENV"), "prod"),
	}
	if maxAge < 0 {
		c.Expires = time.Unix(0, 0)
	}
	return c
}

func SetSessionCookie(w http.ResponseWriter, token string, ttl time.Duration) {
	http.SetCookie(w, Cookie(token, int(ttl.Seconds())))
}

func ClearSessionCookie(w http.ResponseWriter) {
	http.SetCookie(w, Cookie("", -1))
}

const (
	LoginLimit  = 5
	LoginWindow = time.Minute
)

// RateLimiter is an in-memory sliding window. Fine for a single API process.
type RateLimiter struct {
	mu      sync.Mutex
	hits    map[string][]time.Time
	limit   int
	window  time.Duration
	cleaned time.Time
}

func NewRateLimiter(limit int, window time.Duration) *RateLimiter {
	return &RateLimiter{
		hits:   make(map[string][]time.Time),
		limit:  limit,
		window: window,
	}
}

func DefaultLoginLimiter() *RateLimiter {
	return NewRateLimiter(LoginLimit, LoginWindow)
}

func (r *RateLimiter) Allow(key string) bool {
	if key == "" {
		key = "unknown"
	}
	r.mu.Lock()
	defer r.mu.Unlock()
	now := time.Now()
	cutoff := now.Add(-r.window)
	times := r.hits[key]
	kept := times[:0]
	for _, t := range times {
		if t.After(cutoff) {
			kept = append(kept, t)
		}
	}
	if len(kept) >= r.limit {
		r.hits[key] = kept
		return false
	}
	r.hits[key] = append(kept, now)
	if now.Sub(r.cleaned) > r.window*4 {
		for k, v := range r.hits {
			alive := v[:0]
			for _, t := range v {
				if t.After(cutoff) {
					alive = append(alive, t)
				}
			}
			if len(alive) == 0 {
				delete(r.hits, k)
			} else {
				r.hits[k] = alive
			}
		}
		r.cleaned = now
	}
	return true
}

func ClientKey(r *http.Request, email string) string {
	ip := r.RemoteAddr
	if xff := r.Header.Get("X-Forwarded-For"); xff != "" {
		ip = strings.TrimSpace(strings.Split(xff, ",")[0])
	} else if xr := r.Header.Get("X-Real-IP"); xr != "" {
		ip = xr
	}
	if host, _, ok := strings.Cut(ip, ":"); ok && strings.Count(ip, ":") == 1 {
		ip = host
	}
	return strings.ToLower(strings.TrimSpace(email)) + "|" + ip
}
