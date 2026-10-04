FROM rust:1-bookworm

RUN apt-get update \
    && apt-get install -y --no-install-recommends pkg-config libssl-dev libsqlite3-dev sqlite3 curl \
    && rm -rf /var/lib/apt/lists/* \
    && cargo install cargo-watch --version 8.5.3 --locked

WORKDIR /workspace/backend
COPY backend/app/migrations/20260909210924_notes.sql /usr/local/share/simply-note/notes.sql
COPY containers/backend-dev-entrypoint.sh /usr/local/bin/backend-dev-entrypoint

ENV DATABASE_URL=sqlite:///data/simply-note.db \
    DB_PATH=/data/simply-note.db \
    IP_ADDR=0.0.0.0 \
    PORT=9964

EXPOSE 9964
ENTRYPOINT ["sh", "/usr/local/bin/backend-dev-entrypoint"]