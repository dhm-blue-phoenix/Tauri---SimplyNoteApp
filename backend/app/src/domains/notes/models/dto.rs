use serde::{Deserialize, Serialize};

use super::models::NoteStatus;

pub type DtoNotes = Vec<DtoNote>;

// Response Model ( GET )
#[derive(Debug, Serialize)]
pub struct DtoNote {
    pub id: String,
    pub title: String,
    pub content: String,
    pub status: NoteStatus,
    pub created_at: String,
}

// Request Model ( POST, PATCH )
#[derive(Debug, Deserialize)]
pub struct DtoNotePost {
    pub title: String,
    #[serde(default)]
    pub content: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct DtoNotePatch {
    pub title: Option<String>,
    pub content: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct DtoNoteDelete {
    pub id: String,
}