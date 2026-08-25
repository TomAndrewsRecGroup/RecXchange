from app.scorer import score

EXCELLENT_DESC = (
    "Hire a 360 plant fitter for a civil contractor running a 40-machine fleet "
    "across the North West. The desk owns JCB, CAT and Hitachi 13–22t excavators, "
    "telehandlers and dumpers. You will source, qualify and submit within 48 hours, "
    "own the client update, and close on a retained-style service with a named hiring "
    "manager. Must hold CPCS or NPORS relevant to the kit, a full UK driving licence, "
    "and two years of workshop or field fitment. This is a permanent role, days, "
    "company van, overtime, and a clear path to lead fitter."
)


def test_excellent_advert_at_least_80():
    out = score(
        {
            "title": "360 Plant Fitter — Manchester days",
            "description": EXCELLENT_DESC,
            "location": "Manchester, UK",
            "salary_min": 38000,
            "salary_max": 45000,
            "must_haves": ["CPCS", "full UK licence"],
            "role_kind": "xchange",
            "proposed_owner_bps": 5000,
            "proposed_partner_bps": 5000,
        }
    )
    assert out["advert_score"] >= 80
    assert out["verdict"] == "ok"
    assert out["split_score"] == 100


def test_vague_title_no_salary_thin_desc():
    out = score(
        {
            "title": "Consultant",
            "description": "Various roles TBD.",
            "location": "",
            "salary_min": 0,
            "salary_max": 0,
            "must_haves": [],
            "role_kind": "direct",
        }
    )
    assert out["advert_score"] <= 40
    assert out["verdict"] != "ok"
    codes = {f["code"] for f in out["findings"]}
    assert "TITLE_VAGUE" in codes
    assert "SALARY_MISSING" in codes


def test_90_10_split_unattractive_or_hostile():
    out = score(
        {
            "title": "Rail Track Engineer — Birmingham nights",
            "description": EXCELLENT_DESC,
            "location": "Birmingham",
            "salary_min": 50000,
            "salary_max": 62000,
            "must_haves": ["PTS", "night shift"],
            "role_kind": "xchange",
            "proposed_owner_bps": 9000,
            "proposed_partner_bps": 1000,
        }
    )
    codes = {f["code"] for f in out["findings"]}
    assert "SPLIT_UNATTRACTIVE" in codes or "SPLIT_HOSTILE" in codes
    assert out["verdict"] in {"warn", "block"}


def test_invalid_bps_sum_is_block():
    out = score(
        {
            "title": "Site Engineer Civils — Leeds",
            "description": EXCELLENT_DESC,
            "location": "Leeds",
            "salary_min": 42000,
            "salary_max": 50000,
            "must_haves": ["HNC Civil"],
            "role_kind": "xchange",
            "proposed_owner_bps": 5000,
            "proposed_partner_bps": 4000,
        }
    )
    assert out["verdict"] == "block"
    assert any(f["code"] == "SPLIT_INVALID" for f in out["findings"])


def test_80_20_split_hostile():
    out = score(
        {
            "title": "HGV Class 2 Driver — Sheffield",
            "description": EXCELLENT_DESC,
            "location": "Sheffield",
            "salary_min": 32000,
            "salary_max": 36000,
            "must_haves": ["Class 2"],
            "role_kind": "xchange",
            "proposed_owner_bps": 8000,
            "proposed_partner_bps": 2000,
        }
    )
    # 20% is not < 20%, so hostile is for <20%. 2000 bps = 20% → unattractive (<30%).
    codes = {f["code"] for f in out["findings"]}
    assert "SPLIT_UNATTRACTIVE" in codes or "SPLIT_HOSTILE" in codes
