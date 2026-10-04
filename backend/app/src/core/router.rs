use axum::http::{header, HeaderValue, Method, StatusCode, Uri};
use axum::routing::get;
use axum::{Json, Router};
use serde::Serialize;
use tower_http::cors::CorsLayer;

use super::{ApiResultJson, AppState};
use crate::domains::domains_router;

pub fn router() -> Router<AppState> {
    Router::new()
        .route("/ping", get(ping))
        .nest("/api", domains_router())
        .fallback(fallback)
        .layer(
            CorsLayer::new()
                .allow_origin([
                    HeaderValue::from_static("http://0.0.0.0:1420"),
                    HeaderValue::from_static("http://localhost:1420"),
                ])
                .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE])
                .allow_headers([header::CONTENT_TYPE]),
        )
}

#[derive(Serialize)]
struct Fallback {
    path: String,
    msg: String,
    error: String,
}

#[derive(Serialize)]
struct Ping {
    msg: String,
}

async fn fallback(uri: Uri) -> ApiResultJson<Fallback> {
    let body: Fallback = Fallback {
        path: format!("{uri}").to_string(),
        msg: "Das ist kein gültiger Pfad!".to_string(),
        error: StatusCode::NOT_FOUND.to_string(),
    };
    Ok((StatusCode::NOT_FOUND, Json(body)))
}

async fn ping() -> ApiResultJson<Ping> {
    let body: Ping = Ping {
        msg: "Server leuft!".to_string(),
    };
    Ok((StatusCode::OK, Json(body)))
}
