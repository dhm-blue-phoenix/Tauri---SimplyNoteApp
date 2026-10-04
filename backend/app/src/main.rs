mod core;
mod domains;

use axum::Router;
use dotenvy::dotenv;
use tokio::net::TcpListener;

use crate::core::{Environment, init_state};

#[tokio::main]
async fn main() {
    let _ = dotenv();
    let config: Environment = Environment::load();

    let app: Router = core::router().with_state(init_state(&config.db_url).await);

    let listener: TcpListener = TcpListener::bind(config.addr)
        .await
        .expect("Das binden der ip auf den TcpListener ist Fehlgeschlagen");

    println!("\n Server leuft auf http://{}", listener.local_addr().unwrap());

    axum::serve(listener, app)
        .await
        .expect("Server konnte nicht gestartet werden");
}
