use super::super::models::{DtoNote, DtoNotePatch, DtoNotePost, DtoNotes, DtoNoteDelete};
use super::super::service::{add, edit, find, list, remove};
use crate::core::{ApiError, ApiResult, ApiResultJson, AppState as CoreState};
use crate::domains::notes::models::{DbNoteInsert, DbNoteUpdate};
use axum::Json;
use axum::extract::{Path, State};
use axum::http::StatusCode;
use sqlx::SqlitePool;

pub async fn get_notes(State(state): State<CoreState>) -> ApiResultJson<DtoNotes> {
    let pool: &SqlitePool = &state.db;

    let notes: DtoNotes = list(pool).await?;
    Ok((StatusCode::OK, Json(notes)))
}

pub async fn get_note(
    State(state): State<CoreState>,
    Path(id): Path<String>,
) -> ApiResultJson<DtoNote> {
    let pool: &SqlitePool = &state.db;
    let id: &str = id.trim();

    let note: DtoNote = find(pool, id).await?;
    Ok((StatusCode::OK, Json(note)))
}

pub async fn post_note(
    State(state): State<CoreState>,
    Json(data): Json<DtoNotePost>,
) -> ApiResultJson<DtoNote> {
    let pool: &SqlitePool = &state.db;
    let resp_data: DbNoteInsert = DbNoteInsert {
        title: data.title.trim().to_string(),
        content: data.content.unwrap_or_default().trim().to_string(),
    };

    let note: DtoNote = add(pool, resp_data).await?;
    Ok((StatusCode::CREATED, Json(note)))
}

pub async fn patch_note(
    State(state): State<CoreState>,
    Path(id): Path<String>,
    Json(data): Json<DtoNotePatch>,
) -> ApiResultJson<DtoNote> {
    let pool: &SqlitePool = &state.db;
    if data.title.is_none() && data.content.is_none() {
        return Err(ApiError::InvalidInput(
            "Mindestens ein Feld muss angegeben werden".to_string(),
        ));
    }

    let resp_data: DbNoteUpdate = DbNoteUpdate {
        id: id.trim().to_string(),
        title: data.title.map(|title| title.trim().to_string()),
        content: data.content.map(|content| content.trim().to_string()),
    };

    let note: DtoNote = edit(pool, resp_data).await?;
    Ok((StatusCode::OK, Json(note)))
}

pub async fn delete_note(
    State(state): State<CoreState>,
    Path(id): Path<String>,
) -> ApiResultJson<DtoNoteDelete> {
    let pool: &SqlitePool = &state.db;
    let id: &str = id.trim();

    let result: DtoNoteDelete = remove(pool, id).await?;
    Ok((StatusCode::OK, Json(result)))
}
