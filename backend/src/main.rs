mod db;
use std::sync::Arc;

use db::DB;
use db::model::Task;

use axum::{
    routing::{get, post},
    http::{
        StatusCode,
        header::{ACCEPT, AUTHORIZATION, CONTENT_TYPE},
        HeaderValue,
        Method,},
    response::{IntoResponse, Json},
    Router,
    extract::{State, Path},
};

use tower_http::cors::CorsLayer;
use std::net::SocketAddr;

use dotenv::dotenv;

pub struct AppState {
    db: DB,
}

#[tokio::main]
async fn main(){

    dotenv().ok();

    let db = DB::init().await.unwrap();

    let cors = CorsLayer::new()
    .allow_origin("http://localhost:3000".parse::<HeaderValue>().unwrap())
    .allow_methods([Method::GET, Method::POST, Method::PATCH, Method::DELETE, Method::OPTIONS, Method::PUT])
    .allow_credentials(true)
    .allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE]);

    let app = Router::new()
        .route("/", get(root))
        .route("/tasks", get(get_tasks))
        .route("/task", post(insert_task))
        .route("/task/:id", get(get_task).put(update_task).delete(delete_task))
        .with_state(Arc::new(AppState { db: db.clone() })).layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 8080));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();

    println!("✅ Server running on port 8080");
}

async fn root() -> &'static str {
    "Hello, World!"
}

async fn get_tasks(State(app_state): State<Arc<AppState>>) -> Result<impl IntoResponse, StatusCode>  {

    match app_state
        .db
        .get_tasks()
        .await
        .map_err(|e| StatusCode::INTERNAL_SERVER_ERROR)
    {
        Ok(res) => {
            println!("{:?}", res);
            Ok(Json(res))
        }
        Err(status) => Err(status)
    }
}

async fn insert_task(State(app_state): State<Arc<AppState>>, Json(body): Json<Task>) -> Result<impl IntoResponse, StatusCode>  {

    let task = Task {
        id: None,
        title: body.title,
        date: body.date,
        is_completed: body.is_completed,
    };

    match app_state
        .db
        .insert_task(task)
        .await
        .map_err(|e| StatusCode::INTERNAL_SERVER_ERROR)
    {
        Ok(res) => Ok(Json(res)),
        Err(status) => Err(status)
    }
}

async fn update_task(State(app_state): State<Arc<AppState>>, Json(body): Json<Task>) -> Result<impl IntoResponse, StatusCode>  {

    let task = Task {
        id: body.id,
        title: body.title,
        date: body.date,
        is_completed: body.is_completed,
    };

    match app_state
        .db
        .update_task(task)
        .await
        .map_err(|e| StatusCode::INTERNAL_SERVER_ERROR)
    {
        Ok(res) => Ok(Json(res)),
        Err(status) => Err(status)
    }
}

async fn delete_task(State(app_state): State<Arc<AppState>>, Path(id): Path<String>) -> Result<impl IntoResponse, StatusCode>  {

    match app_state
        .db
        .delete_task(&id)
        .await
        .map_err(|e| StatusCode::INTERNAL_SERVER_ERROR)
    {
        Ok(res) => Ok(Json(res)),
        Err(status) => Err(status)
    }
}

async fn get_task(State(app_state): State<Arc<AppState>>, Path(id): Path<String>) -> Result<impl IntoResponse, StatusCode>  {
    match app_state
        .db
        .get_task(&id)
        .await
        .map_err(|e| StatusCode::INTERNAL_SERVER_ERROR)
    {
        Ok(res) => Ok(Json(res)),
        Err(status) => Err(status)
    }
}