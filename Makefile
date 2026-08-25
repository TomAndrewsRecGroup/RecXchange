.PHONY: v2-up v2-down v2-test v2-test-rust v2-test-python v2-test-go

v2-up:
	docker compose -f deploy/compose.yaml up --build

v2-down:
	docker compose -f deploy/compose.yaml down

v2-test-rust:
	cd services/match && cargo test

v2-test-python:
	cd services/friction && python3 -m pytest -q

v2-test-go:
	cd services/api && go test ./...

v2-test: v2-test-rust v2-test-python v2-test-go
