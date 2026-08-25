from fastapi import FastAPI
from pydantic import BaseModel, Field

from app.scorer import score

app = FastAPI(title="RecXchange Friction Lens", version="0.1.0")


class ScoreIn(BaseModel):
    title: str = ""
    description: str = ""
    location: str = ""
    salary_min: int = 0
    salary_max: int = 0
    must_haves: list[str] = Field(default_factory=list)
    role_kind: str = "xchange"
    proposed_owner_bps: int = 5000
    proposed_partner_bps: int = 5000


@app.get("/healthz")
def healthz() -> dict:
    return {"ok": True, "service": "friction"}


@app.post("/v1/score")
def score_endpoint(body: ScoreIn) -> dict:
    return score(body.model_dump())
