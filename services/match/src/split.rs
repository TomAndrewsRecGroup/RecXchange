//! Split quote rules. All values are basis points (10_000 = 100%).
//! Property: recruiter_bps + recx_bps + partner_bps = 10_000.

use serde::{Deserialize, Serialize};

pub const BPS_TOTAL: i32 = 10_000;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum RoleKind {
    Direct,
    Xchange,
    Referral,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "lowercase")]
pub enum Plan {
    Guest,
    Entry,
    Lite,
    Pro,
}

#[derive(Debug, Deserialize)]
pub struct QuoteRequest {
    pub role_kind: RoleKind,
    pub plan: Plan,
    pub proposed_owner_bps: Option<i32>,
    pub proposed_partner_bps: Option<i32>,
}

#[derive(Debug, Clone, Serialize, PartialEq, Eq)]
pub struct Quote {
    pub recx_bps: i32,
    pub recruiter_bps: i32,
    pub partner_bps: i32,
    pub display: String,
}

#[derive(Debug)]
pub struct QuoteError {
    pub code: &'static str,
    pub message: String,
}

pub fn direct_recruiter_bps(plan: Plan) -> Option<i32> {
    match plan {
        Plan::Entry => Some(5_000),
        Plan::Lite => Some(7_000),
        Plan::Pro => Some(10_000),
        Plan::Guest => None,
    }
}

pub fn referral_recruiter_bps(plan: Plan) -> Option<i32> {
    match plan {
        Plan::Lite => Some(5_000),
        Plan::Pro => Some(10_000),
        Plan::Entry | Plan::Guest => None,
    }
}

pub fn quote(req: &QuoteRequest) -> Result<Quote, QuoteError> {
    match req.role_kind {
        RoleKind::Direct => quote_direct(req.plan),
        RoleKind::Referral => quote_referral(req.plan),
        RoleKind::Xchange => quote_xchange(req.proposed_owner_bps, req.proposed_partner_bps),
    }
}

fn quote_direct(plan: Plan) -> Result<Quote, QuoteError> {
    let recruiter = direct_recruiter_bps(plan).ok_or_else(|| QuoteError {
        code: "PLAN_GATE_DIRECT",
        message: "Direct splits require Entry, Lite, or Pro.".into(),
    })?;
    let recx = BPS_TOTAL - recruiter;
    Ok(Quote {
        recx_bps: recx,
        recruiter_bps: recruiter,
        partner_bps: 0,
        display: format_display(recruiter, recx, 0, "direct"),
    })
}

fn quote_referral(plan: Plan) -> Result<Quote, QuoteError> {
    let recruiter = referral_recruiter_bps(plan).ok_or_else(|| QuoteError {
        code: "PLAN_GATE_REFERRAL",
        message: "Referral roles require Lite or Pro.".into(),
    })?;
    let recx = BPS_TOTAL - recruiter;
    Ok(Quote {
        recx_bps: recx,
        recruiter_bps: recruiter,
        partner_bps: 0,
        display: format_display(recruiter, recx, 0, "referral"),
    })
}

fn quote_xchange(owner: Option<i32>, partner: Option<i32>) -> Result<Quote, QuoteError> {
    let owner_bps = owner.unwrap_or(5_000);
    let partner_bps = partner.unwrap_or(5_000);
    if owner_bps + partner_bps != BPS_TOTAL {
        return Err(QuoteError {
            code: "SPLIT_INVALID",
            message: format!(
                "Xchange owner+partner must equal {BPS_TOTAL} bps (got {}).",
                owner_bps + partner_bps
            ),
        });
    }
    // RecXchange is not a party to Xchange contracts.
    Ok(Quote {
        recx_bps: 0,
        recruiter_bps: owner_bps,
        partner_bps,
        display: format_display(owner_bps, 0, partner_bps, "xchange"),
    })
}

fn format_display(recruiter: i32, recx: i32, partner: i32, kind: &str) -> String {
    match kind {
        "xchange" => format!(
            "Owner {}% / partner {}% (RecXchange not a party)",
            recruiter / 100,
            partner / 100
        ),
        _ if recx == 0 => "Recruiter keeps 100%".into(),
        _ => format!("Recruiter {}% / RecXchange {}%", recruiter / 100, recx / 100),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bps_always_sum_to_10000() {
        let kinds = [RoleKind::Direct, RoleKind::Xchange, RoleKind::Referral];
        let plans = [Plan::Entry, Plan::Lite, Plan::Pro];
        for kind in kinds {
            for plan in plans {
                let req = QuoteRequest {
                    role_kind: kind,
                    plan,
                    proposed_owner_bps: Some(5_000),
                    proposed_partner_bps: Some(5_000),
                };
                match quote(&req) {
                    Ok(q) => assert_eq!(
                        q.recruiter_bps + q.recx_bps + q.partner_bps,
                        BPS_TOTAL,
                        "{kind:?} {plan:?}"
                    ),
                    Err(e) => {
                        assert!(
                            (kind == RoleKind::Referral && plan == Plan::Entry)
                                || e.code == "PLAN_GATE_REFERRAL",
                            "unexpected reject {kind:?} {plan:?}: {}",
                            e.code
                        );
                    }
                }
            }
        }
    }

    #[test]
    fn direct_matrix() {
        let q = quote_direct(Plan::Entry).unwrap();
        assert_eq!(q.recruiter_bps, 5_000);
        assert_eq!(q.recx_bps, 5_000);
        let q = quote_direct(Plan::Lite).unwrap();
        assert_eq!(q.recruiter_bps, 7_000);
        assert_eq!(q.recx_bps, 3_000);
        let q = quote_direct(Plan::Pro).unwrap();
        assert_eq!(q.recruiter_bps, 10_000);
        assert_eq!(q.recx_bps, 0);
    }

    #[test]
    fn referral_entry_rejected() {
        let err = quote_referral(Plan::Entry).unwrap_err();
        assert_eq!(err.code, "PLAN_GATE_REFERRAL");
    }

    #[test]
    fn xchange_recx_is_zero() {
        let q = quote_xchange(Some(5_000), Some(5_000)).unwrap();
        assert_eq!(q.recx_bps, 0);
        assert_eq!(q.recruiter_bps, 5_000);
        assert_eq!(q.partner_bps, 5_000);
    }
}
