//! Deterministic recruiter ranking: category, location, historical kind overlap.

use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct RankRequest {
    pub role: RoleProfile,
    pub recruiters: Vec<RecruiterProfile>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RoleProfile {
    pub id: Uuid,
    pub kind: String,
    pub location: String,
    pub city: Option<String>,
    pub country: Option<String>,
    pub category: Option<String>,
    pub sector: Option<String>,
}

#[derive(Debug, Deserialize, Clone)]
pub struct RecruiterProfile {
    pub user_id: Uuid,
    pub categories: Vec<String>,
    pub locations: Vec<String>,
    pub historical_kinds: Vec<String>,
}

#[derive(Debug, Serialize, Clone, PartialEq)]
pub struct RankHit {
    pub user_id: Uuid,
    pub score: i32,
    pub reason: String,
}

pub fn rank(req: &RankRequest) -> Vec<RankHit> {
    let mut hits: Vec<RankHit> = req
        .recruiters
        .iter()
        .map(|r| score_one(&req.role, r))
        .collect();
    hits.sort_by(|a, b| b.score.cmp(&a.score).then_with(|| a.user_id.cmp(&b.user_id)));
    hits
}

fn score_one(role: &RoleProfile, rec: &RecruiterProfile) -> RankHit {
    let mut score = 0;
    let mut reasons: Vec<&str> = Vec::new();

    let role_cat = role
        .category
        .as_deref()
        .or(role.sector.as_deref())
        .unwrap_or("")
        .to_lowercase();
    if !role_cat.is_empty()
        && rec
            .categories
            .iter()
            .any(|c| c.eq_ignore_ascii_case(&role_cat) || role_cat.contains(&c.to_lowercase()))
    {
        score += 40;
        reasons.push("category overlap");
    }

    let loc = role.location.to_lowercase();
    let city = role.city.clone().unwrap_or_default().to_lowercase();
    if rec.locations.iter().any(|l| {
        let l = l.to_lowercase();
        (!loc.is_empty() && loc.contains(&l))
            || (!city.is_empty() && city.contains(&l))
            || l.contains(&loc)
    }) {
        score += 35;
        reasons.push("location overlap");
    }

    if rec
        .historical_kinds
        .iter()
        .any(|k| k.eq_ignore_ascii_case(&role.kind))
    {
        score += 25;
        reasons.push("historical kind");
    }

    let reason = if reasons.is_empty() {
        "no overlap".into()
    } else {
        reasons.join(", ")
    };
    RankHit {
        user_id: rec.user_id,
        score,
        reason,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn deterministic_order() {
        let a = Uuid::from_u128(1);
        let b = Uuid::from_u128(2);
        let req = RankRequest {
            role: RoleProfile {
                id: Uuid::nil(),
                kind: "direct".into(),
                location: "Manchester".into(),
                city: Some("Manchester".into()),
                country: Some("UK".into()),
                category: Some("plant".into()),
                sector: None,
            },
            recruiters: vec![
                RecruiterProfile {
                    user_id: b,
                    categories: vec!["plant".into()],
                    locations: vec!["Manchester".into()],
                    historical_kinds: vec!["direct".into()],
                },
                RecruiterProfile {
                    user_id: a,
                    categories: vec!["rail".into()],
                    locations: vec!["London".into()],
                    historical_kinds: vec!["xchange".into()],
                },
            ],
        };
        let hits = rank(&req);
        assert_eq!(hits[0].user_id, b);
        assert_eq!(hits[0].score, 100);
        assert_eq!(hits[1].score, 0);
    }
}
