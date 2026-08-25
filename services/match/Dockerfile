FROM rust:1.82-bookworm AS build
WORKDIR /src
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs && cargo build --release && rm -rf src
COPY src ./src
RUN touch src/main.rs && cargo build --release

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates wget \
	&& rm -rf /var/lib/apt/lists/*
COPY --from=build /src/target/release/recxchange-match /usr/local/bin/recxchange-match
ENV MATCH_ADDR=0.0.0.0:8081
EXPOSE 8081
CMD ["recxchange-match"]
