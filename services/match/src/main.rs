mod ownership;
mod rank;
mod split;

use axum::{
    extract::State,
    http::StatusCode,
    routing::{get, post},
    Json, Router,
};
use ownership::{OwnershipBook, StampRequest};
use rank::RankRequest;
use serde_json::{json, Value};
use split::QuoteRequest;
use std::net::SocketAddr;
use std::sync::Arc;

struct AppState {
    book: OwnershipBook,
}

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt()
        .with_env_filter("info")
        .init();

    let state = Arc::new(AppState {
        book: OwnershipBook::new(),
    });

    let app = router(state);
    let addr: SocketAddr = std::env::var("MATCH_ADDR")
        .unwrap_or_else(|_| "0.0.0.0:8081".into())
        .parse()
        .expect("MATCH_ADDR");
    tracing::info!("match listening on {addr}");
    let listener = tokio::net::TcpListener::bind(addr).await.expect("bind");
    axum::serve(listener, app).await.expect("serve");
}

fn router(state: Arc<AppState>) -> Router {
    Router::new()
        .route("/healthz", get(healthz))
        .route("/v1/split/quote", post(split_quote))
        .route("/v1/ownership/stamp", post(ownership_stamp))
        .route("/v1/match/role", post(match_role))
        .with_state(state)
}

async fn healthz() -> Json<Value> {
    Json(json!({ "ok": true, "service": "match" }))
}

async fn split_quote(Json(body): Json<QuoteRequest>) -> (StatusCode, Json<Value>) {
    match split::quote(&body) {
        Ok(q) => (StatusCode::OK, Json(serde_json::to_value(q).unwrap())),
        Err(e) => (
            StatusCode::UNPROCESSABLE_ENTITY,
            Json(json!({ "error": { "code": e.code, "message": e.message } })),
        ),
    }
}

async fn ownership_stamp(
    State(state): State<Arc<AppState>>,
    Json(body): Json<StampRequest>,
) -> (StatusCode, Json<Value>) {
    match state.book.stamp(&body) {
        Ok(s) => (StatusCode::OK, Json(serde_json::to_value(s).unwrap())),
        Err(e) => (
            StatusCode::CONFLICT,
            Json(json!({ "error": { "code": e.code, "message": e.message } })),
        ),
    }
}

async fn match_role(Json(body): Json<RankRequest>) -> Json<Value> {
    let hits = rank::rank(&body);
    Json(json!({ "matches": hits }))
}

#[cfg(test)]
mod tests {
    use super::*;
    use split::{Plan, QuoteRequest, RoleKind};

    #[test]
    fn table_all_plans_direct_referral() {
        let cases = [
            (RoleKind::Direct, Plan::Entry, 5_000, 5_000, 0),
            (RoleKind::Direct, Plan::Lite, 7_000, 3_000, 0),
            (RoleKind::Direct, Plan::Pro, 10_000, 0, 0),
            (RoleKind::Referral, Plan::Lite, 5_000, 5_000, 0),
            (RoleKind::Referral, Plan::Pro, 10_000, 0, 0),
        ];
        for (kind, plan, rec, recx, partner) in cases {
            let q = split::quote(&QuoteRequest {
                role_kind: kind,
                plan,
                proposed_owner_bps: None,
                proposed_partner_bps: None,
            })
            .unwrap();
            assert_eq!(q.recruiter_bps, rec);
            assert_eq!(q.recx_bps, recx);
            assert_eq!(q.partner_bps, partner);
            assert_eq!(q.recruiter_bps + q.recx_bps + q.partner_bps, 10_000);
        }
    }
}
