from pydantic import BaseModel
from typing import List


class SongResult(BaseModel):
    song_id: str
    song_name: str
    artist: str
    score: float
    matched_lyrics: List[str]


class SearchResponse(BaseModel):
    results: List[SongResult]


class LyricsResponse(BaseModel):
    song_id: str
    song_name: str
    artist: str
    lyrics: str
