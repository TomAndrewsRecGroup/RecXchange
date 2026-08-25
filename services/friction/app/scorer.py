"""Friction Lens — deterministic advert + split scorer.

Advert rubric (start 100, clamp 0–100):
  TITLE_VAGUE          −25  title < 4 words or in {consultant, professional, various, TBD}
  LOCATION_MISSING     −20  no location / remote flag
  SALARY_MISSING       −15  no salary range
  DESCRIPTION_THIN     −20  description < 400 chars
  MUST_HAVES_MISSING   −15  no must-haves
  SALARY_INCOHERENT    −30  salary max < min (block)

Split rubric (Xchange; start 100):
  SPLIT_UNATTRACTIVE   −40  partner share < 30% (bps < 3000)
  SPLIT_HOSTILE        −60  partner share < 20% (block)
  SPLIT_INVALID        block  owner+partner ≠ 10000
"""

from __future__ import annotations

from typing import Any

VAGUE_TOKENS = {"consultant", "professional", "various", "tbd"}
BPS_TOTAL = 10_000


def _clamp(n: int) -> int:
    return max(0, min(100, n))


def score(payload: dict[str, Any]) -> dict[str, Any]:
    findings: list[dict[str, str]] = []
    advert = 100
    split = 100

    title = (payload.get("title") or "").strip()
    words = [w for w in title.split() if w]
    if len(words) < 4 or any(w.lower().strip(".,") in VAGUE_TOKENS for w in words):
        advert -= 25
        findings.append(
            {
                "code": "TITLE_VAGUE",
                "severity": "warn",
                "message": "Title is vague. Name the job, not a category.",
            }
        )

    location = (payload.get("location") or "").strip().lower()
    if not location:
        advert -= 20
        findings.append(
            {
                "code": "LOCATION_MISSING",
                "severity": "warn",
                "message": "No location. Recruiter traffic will be weak.",
            }
        )

    salary_min = payload.get("salary_min") or 0
    salary_max = payload.get("salary_max") or 0
    try:
        salary_min = int(salary_min)
        salary_max = int(salary_max)
    except (TypeError, ValueError):
        salary_min, salary_max = 0, 0

    if salary_min <= 0 and salary_max <= 0:
        advert -= 15
        findings.append(
            {
                "code": "SALARY_MISSING",
                "severity": "warn",
                "message": "No salary. Recruiter traffic will be weak.",
            }
        )
    elif salary_max and salary_min and salary_max < salary_min:
        advert -= 30
        findings.append(
            {
                "code": "SALARY_INCOHERENT",
                "severity": "block",
                "message": "Salary max is below min. Fix the band before you publish.",
            }
        )

    description = payload.get("description") or ""
    if len(description) < 400:
        advert -= 20
        findings.append(
            {
                "code": "DESCRIPTION_THIN",
                "severity": "warn",
                "message": "Description is thin. Spell out the work, not the vibe.",
            }
        )

    must_haves = payload.get("must_haves") or []
    if not must_haves:
        advert -= 15
        findings.append(
            {
                "code": "MUST_HAVES_MISSING",
                "severity": "warn",
                "message": "No must-haves. Partners will guess, and guess wrong.",
            }
        )

    role_kind = (payload.get("role_kind") or "").lower()
    owner = int(payload.get("proposed_owner_bps") or 0)
    partner = int(payload.get("proposed_partner_bps") or 0)

    if role_kind == "xchange":
        if owner + partner != BPS_TOTAL:
            split = 0
            findings.append(
                {
                    "code": "SPLIT_INVALID",
                    "severity": "block",
                    "message": "Owner and partner shares must add to 100%.",
                }
            )
        elif partner < 2000:
            split -= 60
            findings.append(
                {
                    "code": "SPLIT_HOSTILE",
                    "severity": "block",
                    "message": "A split this hostile will not attract the network.",
                }
            )
        elif partner < 3000:
            split -= 40
            findings.append(
                {
                    "code": "SPLIT_UNATTRACTIVE",
                    "severity": "warn",
                    "message": "A 90/10 split will not attract the network."
                    if partner <= 1000
                    else "Partner share is thin. The network will skip this.",
                }
            )

    advert = _clamp(advert)
    split = _clamp(split)

    if any(f["severity"] == "block" for f in findings):
        verdict = "block"
    elif advert < 50 or (role_kind == "xchange" and split < 50):
        verdict = "warn"
    else:
        verdict = "ok"

    return {
        "advert_score": advert,
        "split_score": split,
        "verdict": verdict,
        "findings": findings,
    }
