#!/bin/sh
set -eu

sqlite3 "${DB_PATH:-/data/simply-note.db}" < /usr/local/share/simply-note/notes.sql
exec /usr/local/bin/simply-note-backend