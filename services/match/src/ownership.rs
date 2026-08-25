use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::sync::Mutex;
use uuid::Uuid;

#[derive(Debug, Deserialize)]
pub struct StampRequest {
    pub role_id: Uuid,
    pub candidate_id: Uuid,
    pub submitter_user_id: Uuid,
}

#[derive(Debug, Serialize)]
pub struct Stamp {
    pub timestamp: DateTime<Utc>,
    pub key: String,
}

#[derive(Debug)]
pub struct StampError {
    pub code: &'static str,
    pub message: String,
}

pub struct OwnershipBook {
    keys: Mutex<HashSet<(Uuid, Uuid)>>,
}

impl OwnershipBook {
    pub fn new() -> Self {
        Self {
            keys: Mutex::new(HashSet::new()),
        }
    }

    pub fn stamp(&self, req: &StampRequest) -> Result<Stamp, StampError> {
        let mut keys = self.keys.lock().expect("ownership lock");
        let pair = (req.role_id, req.candidate_id);
        if !keys.insert(pair) {
            return Err(StampError {
                code: "ALREADY_OWNED",
                message: "This candidate is already stamped on this role.".into(),
            });
        }
        let ts = Utc::now();
        Ok(Stamp {
            timestamp: ts,
            key: format!("{}:{}", req.role_id, req.candidate_id),
        })
    }
}

impl Default for OwnershipBook {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn second_stamp_rejected() {
        let book = OwnershipBook::new();
        let req = StampRequest {
            role_id: Uuid::nil(),
            candidate_id: Uuid::from_u128(1),
            submitter_user_id: Uuid::from_u128(2),
        };
        assert!(book.stamp(&req).is_ok());
        let err = book.stamp(&req).unwrap_err();
        assert_eq!(err.code, "ALREADY_OWNED");
    }
}
