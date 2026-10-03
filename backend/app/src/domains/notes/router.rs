use axum::{Router, routing::get};
use crate::core::AppState;
use super::handler::{get_note, get_notes, patch_note, post_note, delete_note};

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/notes", get(get_notes).post(post_note))
        .route("/notes/{id}", get(get_note).patch(patch_note).delete(delete_note))
}
