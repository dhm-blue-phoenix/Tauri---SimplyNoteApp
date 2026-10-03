use std::result;

use sqlx::SqlitePool;

use super::db::{find_all, find_by_id, insert, update, delete};
use super::models::{
    DbNote, DbNoteInsert, DbNoteUpdate, DbNotes, DtoNote, DtoNotePost, DtoNotes, NoteStatus, DbNoteDelete, DtoNoteDelete
};
use crate::core::{ApiError, ApiResult};

pub async fn list(pool: &SqlitePool) -> ApiResult<DtoNotes> {
    let db_data: DbNotes = find_all(pool).await?;

    if db_data.is_empty() {
        return Err(ApiError::NotFound("Keine Notitzen Gefunden!".into()));
    }

    let dto_data: DtoNotes = db_data.into_iter().map(|note| format_dto_model(note)).collect();
    Ok(dto_data)
}

pub async fn find(pool: &SqlitePool, id: &str) -> ApiResult<DtoNote> {
    if id.len() != 36 {
        return Err(ApiError::InvalidInput("Ungültige ID".to_string()));
    };

    let db_data: DbNote = find_by_id(pool, id).await?;
    let dto_data: DtoNote = format_dto_model(db_data);
    Ok(dto_data)
}

pub async fn add(pool: &SqlitePool, data: DbNoteInsert) -> ApiResult<DtoNote> {
    let db_data: DbNote = insert(pool, data).await?;
    let dto_data: DtoNote = format_dto_model(db_data);
    Ok(dto_data)
}

pub async fn edit(pool: &SqlitePool, data: DbNoteUpdate) -> ApiResult<DtoNote> {
    if data.id.len() != 36 {
        return Err(ApiError::InvalidInput("Ungültige ID".to_string()));
    }

    if let Some(title) = &data.title {
        if title.trim().is_empty() {
            return Err(ApiError::InvalidInput(
                "Titel darf nicht leer sein".to_string(),
            ));
        }
    }

    let db_data: DbNote = update(pool, data).await?;
    let dto_data: DtoNote = format_dto_model(db_data);
    Ok(dto_data)
}

pub async fn remove(pool: &SqlitePool, id: &str) -> ApiResult<DtoNoteDelete> {
    if id.len() != 36 {
        return Err(ApiError::InvalidInput("Ungültige ID".to_string()));
    }
    
    let dto_data: DbNoteDelete = delete(pool, id).await?;
    let result: DtoNoteDelete = DtoNoteDelete {
        id: dto_data.id,
    };
    Ok(result)
}

fn format_dto_model(db_data: DbNote) -> DtoNote {
    DtoNote {
        id: db_data.id.to_string(),
        title: db_data.title,
        content: db_data.content,
        status: db_data.status,
        created_at: db_data.created_at.to_string(),
    }
}