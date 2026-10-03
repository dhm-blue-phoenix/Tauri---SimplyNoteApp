use chrono::NaiveDateTime;
use sqlx::FromRow;

use super::models::NoteStatus;

pub type DbNotes = Vec<DbNote>;

// DB Models
#[derive(Debug, FromRow)]
pub struct DbNote {
    pub id: String,
    pub title: String,
    pub content: String,
    pub status: NoteStatus,
    pub created_at: NaiveDateTime,
}

#[derive(Debug, FromRow)]
pub struct DbNoteInsert {
    pub title: String,
    pub content: String,
}

#[derive(Debug, FromRow)]
pub struct DbNoteUpdate {
    pub id: String,
    pub title: Option<String>,
    pub content: Option<String>,
}

#[derive(Debug, FromRow)]
pub struct DbNoteDelete {
    pub id: String,
}