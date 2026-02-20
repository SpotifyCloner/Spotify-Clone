from fastapi import HTTPException
from app.services.chromadb_service import ChromaDBService
from app.models.response_models import LyricsResponse


class LyricsService:
    def __init__(self) -> None:
        self._chromadb_service = ChromaDBService()

    def get_full_lyrics(self, song_id: str) -> LyricsResponse:
        """
        Retrieve full lyrics for a song by its song_id.
        Raises HTTP 404 if the song is not found.
        """
        result = self._chromadb_service.get_full_lyrics(song_id)
        if result is None:
            raise HTTPException(
                status_code=404,
                detail=f"Song with song_id '{song_id}' not found.",
            )
        return LyricsResponse(
            song_id=result["song_id"],
            song_name=result["song_name"],
            artist=result["artist"],
            lyrics=result["lyrics"],
        )
