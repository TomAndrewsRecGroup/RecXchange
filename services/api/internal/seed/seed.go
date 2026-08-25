package seed

import (
	"context"
	"os"
	"path/filepath"
	"strings"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgxpool"

	"recxchange-v2-api/internal/auth"
	"recxchange-v2-api/internal/store"
)

type Account struct {
	Email    string
	Password string
	Name     string
	Plan     string
	Admin    bool
	ID       uuid.UUID
}

var Accounts = []Account{
	{Email: "admin@recxchange.io", Password: "RecX-Admin-2026!", Name: "Tom Admin", Plan: "pro", Admin: true, ID: uuid.MustParse("a1111111-1111-4111-8111-111111111111")},
	{Email: "pro@recxchange.io", Password: "RecX-Pro-2026!", Name: "Alex Demo", Plan: "pro", ID: uuid.MustParse("a2222222-2222-4222-8222-222222222222")},
	{Email: "lite@recxchange.io", Password: "RecX-Lite-2026!", Name: "Jordan Example", Plan: "lite", ID: uuid.MustParse("a3333333-3333-4333-8333-333333333333")},
	{Email: "entry@recxchange.io", Password: "RecX-Entry-2026!", Name: "Sam Sample", Plan: "entry", ID: uuid.MustParse("a4444444-4444-4444-8444-444444444444")},
}

func Users(ctx context.Context, s store.Store) error {
	for _, a := range Accounts {
		if _, err := s.GetUserByEmail(ctx, a.Email); err == nil {
			continue
		}
		hash, err := auth.HashPassword(a.Password)
		if err != nil {
			return err
		}
		u := &store.User{ID: a.ID, Email: a.Email, PasswordHash: hash, Name: a.Name, Plan: a.Plan, IsAdmin: a.Admin}
		if err := s.CreateUser(ctx, u); err != nil && err != store.ErrConflict {
			return err
		}
	}
	return nil
}

func SQLFile(ctx context.Context, pool *pgxpool.Pool) error {
	if pool == nil {
		return nil
	}
	candidates := []string{
		os.Getenv("SEED_SQL"),
		filepath.Join("deploy", "seed.sql"),
		filepath.Join("..", "..", "deploy", "seed.sql"),
		"/seed.sql",
	}
	var path string
	for _, c := range candidates {
		if c == "" {
			continue
		}
		if _, err := os.Stat(c); err == nil {
			path = c
			break
		}
	}
	if path == "" {
		return nil
	}
	b, err := os.ReadFile(path)
	if err != nil {
		return err
	}
	_, err = pool.Exec(ctx, string(b))
	if err != nil && strings.Contains(err.Error(), "already exists") {
		return nil
	}
	return err
}
