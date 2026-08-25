# RecXchange v2 web

Open marketplace. Login unlocks Work / Apply / ATS / X-Ray. Admin is Pro + Admin UI.

## Run (via compose)

From the repo root:

```bash
docker compose -f deploy/compose.yaml up --build
```

App: [http://localhost:3001](http://localhost:3001)  
API: [http://localhost:8080](http://localhost:8080)

Or `make v2-up`.

## Demo users (not production credentials)

| Email | Password | Plan |
|-------|----------|------|
| `admin@recxchange.io` | `RecX-Admin-2026!` | Pro + admin |
| `pro@recxchange.io` | `RecX-Pro-2026!` | Pro |
| `lite@recxchange.io` | `RecX-Lite-2026!` | Lite |
| `entry@recxchange.io` | `RecX-Entry-2026!` | Entry |

## Env

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

See `deploy/.env.example`.

## Local Next only

```bash
cd apps/v2/web
npm install
NEXT_PUBLIC_API_URL=http://localhost:8080 npm run dev
```

Requires the API (and Postgres, match, friction) already up.
