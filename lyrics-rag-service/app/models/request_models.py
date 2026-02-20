from pydantic import BaseModel, Field
from typing import Optional


class SearchRequest(BaseModel):
    query: str = Field(..., min_length=1, description="Search query text")
    top_k: int = Field(default=5, ge=1, le=50, description="Max number of songs to return")


class RetrieveLyricsRequest(BaseModel):
    song_id: str = Field(..., min_length=1, description="Unique song identifier")
