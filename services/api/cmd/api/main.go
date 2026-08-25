package main

import (
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"recxchange-v2-api/internal/frictionclient"
	"recxchange-v2-api/internal/httpapi"
	"recxchange-v2-api/internal/matchclient"
	"recxchange-v2-api/internal/seed"
	"recxchange-v2-api/internal/store"
)

func main() {
	addr := httpapi.Env("API_ADDR", "0.0.0.0:8080")
	secret := httpapi.Env("SESSION_SECRET", "recx-v2-dev-session")
	origin := httpapi.Env("WEB_ORIGIN", "http://localhost:3001")
	dbURL := os.Getenv("DATABASE_URL")
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()

	var st store.Store
	if dbURL != "" {
		pool, err := store.Connect(ctx, dbURL)
		if err != nil {
			log.Fatalf("postgres: %v", err)
		}
		defer pool.Close()
		if err := store.ApplyMigrations(ctx, pool, store.FindMigrationsDir()); err != nil {
			log.Fatalf("migrate: %v", err)
		}
		st = store.NewPostgres(pool)
		if err := seed.Users(ctx, st); err != nil {
			log.Fatalf("seed users: %v", err)
		}
		if err := seed.SQLFile(ctx, pool); err != nil {
			log.Printf("seed sql: %v", err)
		}
	} else {
		log.Println("DATABASE_URL unset; using in-memory store")
		mem := store.NewMemory()
		st = mem
		if err := seed.Users(ctx, st); err != nil {
			log.Fatalf("seed users: %v", err)
		}
	}

	match := matchclient.New(os.Getenv("MATCH_URL"))
	friction := frictionclient.New(os.Getenv("FRICTION_URL"))
	api := httpapi.New(st, match, friction, secret, origin)

	go api.Worker.Loop(ctx, 5*time.Second)

	httpSrv := &http.Server{
		Addr:              addr,
		Handler:           api.Router(),
		ReadHeaderTimeout: 10 * time.Second,
	}
	go func() {
		log.Printf("api listening on %s", addr)
		if err := httpSrv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatal(err)
		}
	}()

	<-ctx.Done()
	shutdown, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	_ = httpSrv.Shutdown(shutdown)
}
