from fastapi import APIRouter, HTTPException
from app.models.request_models import SearchRequest, RetrieveLyricsRequest
from app.models.response_models import SearchResponse, LyricsResponse
from app.services.retrieval_service import RetrievalService
from app.services.lyrics_service import LyricsService

router = APIRouter(prefix="/rag", tags=["RAG"])

_retrieval_service = RetrievalService()
_lyrics_service = LyricsService()


@router.post("/search", response_model=SearchResponse)
def search_lyrics(request: SearchRequest) -> SearchResponse:
    """
    Semantic search over ingested lyrics.
    Accepts a natural language query and returns ranked, deduplicated song results.
    """
    results = _retrieval_service.search(request.query, request.top_k)
    return SearchResponse(results=results)


@router.post("/retrieve-lyrics", response_model=LyricsResponse)
def retrieve_lyrics(request: RetrieveLyricsRequest) -> LyricsResponse:
    """
    Retrieve the full lyrics text for a specific song by its song_id.
    Returns HTTP 404 if the song_id is not found.
    """
    return _lyrics_service.get_full_lyrics(request.song_id)
