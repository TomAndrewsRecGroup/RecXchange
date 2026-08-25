FROM golang:1.23-bookworm AS build
WORKDIR /src
COPY services/api/go.mod services/api/go.sum ./
RUN go mod download
COPY services/api/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o /recxchange-api ./cmd/api

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates wget \
	&& rm -rf /var/lib/apt/lists/*
COPY --from=build /recxchange-api /usr/local/bin/recxchange-api
COPY services/api/migrations /migrations
COPY deploy/seed.sql /seed.sql
ENV API_ADDR=0.0.0.0:8080
ENV MIGRATIONS_DIR=/migrations
ENV SEED_SQL=/seed.sql
EXPOSE 8080
CMD ["recxchange-api"]
