mod dto;
mod db;
mod models;

pub use db::{DbNotes, DbNote, DbNoteInsert, DbNoteUpdate, DbNoteDelete};
pub use dto::{DtoNotes, DtoNote, DtoNotePost, DtoNotePatch, DtoNoteDelete};
pub use models::NoteStatus;