FROM rust:1-bookworm AS build

WORKDIR /workspace
RUN apt-get update \
    && apt-get install -y --no-install-recommends pkg-config libssl-dev libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

COPY backend/ ./backend/
RUN cargo build --release --manifest-path backend/Cargo.toml -p app

FROM debian:bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl libssl3 libsqlite3-0 sqlite3 \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 10001 app \
    && useradd --system --uid 10001 --gid app --home-dir /nonexistent app \
    && mkdir -p /data \
    && chown app:app /data

COPY --from=build /workspace/backend/target/release/app /usr/local/bin/simply-note-backend
COPY backend/app/migrations/20260909210924_notes.sql /usr/local/share/simply-note/notes.sql
COPY containers/backend-entrypoint.sh /usr/local/bin/backend-entrypoint

ENV DATABASE_URL=sqlite:///data/simply-note.db \
    DB_PATH=/data/simply-note.db \
    IP_ADDR=0.0.0.0 \
    PORT=9964

USER app
EXPOSE 9964
ENTRYPOINT ["sh", "/usr/local/bin/backend-entrypoint"]