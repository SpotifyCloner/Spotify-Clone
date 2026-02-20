from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from ai_analytics.app.recommender import ContentRecommender
from ai_analytics.app.filters import smart_filter
from ai_analytics.app.events import EventLogger
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sample_tracks.json")

app = FastAPI(title="AI Analytics - Member 3")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

recommender = ContentRecommender.from_json(DATA_PATH)
event_logger = EventLogger()


class FilterRequest(BaseModel):
    mood: Optional[str] = None
    genre: Optional[str] = None
    tempo_min: Optional[int] = None
    tempo_max: Optional[int] = None
    sort_by: Optional[str] = None
    ascending: Optional[bool] = False


class EventIn(BaseModel):
    event_type: str
    user_id: Optional[str] = None
    track_id: Optional[str] = None
    metadata: Optional[Dict[str, Any]] = None


@app.get("/recommend/{track_id}")
def recommend(track_id: str, top_k: int = 5):
    recs = recommender.recommend(track_id, top_k=top_k)
    if recs is None:
        raise HTTPException(status_code=404, detail="Track not found")
    return {"id": track_id, "recommendations": recs}


@app.post("/filter")
def filter_tracks(req: FilterRequest):
    filtered = smart_filter(recommender.tracks, req.dict())
    return {"count": len(filtered), "results": filtered}


@app.post("/events")
def log_event(e: EventIn):
    event_logger.log_event(e.event_type, e.user_id, e.track_id, e.metadata)
    return {"status": "ok"}


@app.get("/events")
def get_events(limit: int = 100):
    return event_logger.get_events(limit)
