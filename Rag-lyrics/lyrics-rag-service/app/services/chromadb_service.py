from __future__ import annotations
import chromadb
from chromadb import Collection
from typing import List, Dict, Any, Optional
from app.config import get_settings

settings = get_settings()


class ChromaDBService:
    _instance: "ChromaDBService | None" = None
    _client: chromadb.PersistentClient | None = None
    _chunks_collection: Collection | None = None
    _full_collection: Collection | None = None

    def __new__(cls) -> "ChromaDBService":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._client = chromadb.PersistentClient(
                path=settings.CHROMA_PERSIST_DIR
            )
            cls._instance._chunks_collection = cls._instance._client.get_or_create_collection(
                name=settings.COLLECTION_NAME,
                metadata={"hnsw:space": "cosine"},
            )
            cls._instance._full_collection = cls._instance._client.get_or_create_collection(
                name=settings.LYRICS_COLLECTION_NAME,
                metadata={"hnsw:space": "cosine"},
            )
        return cls._instance

    def upsert_chunks(
        self,
        ids: List[str],
        embeddings: List[List[float]],
        documents: List[str],
        metadatas: List[Dict[str, Any]],
    ) -> None:
        """Idempotently insert or update lyric chunks into the chunks collection."""
        if not ids:
            return
        self._chunks_collection.upsert(
            ids=ids,
            embeddings=embeddings,
            documents=documents,
            metadatas=metadatas,
        )

    def upsert_full_lyrics(
        self,
        song_id: str,
        song_name: str,
        artist: str,
        lyrics: str,
    ) -> None:
        """Idempotently insert or update a full lyrics document keyed by song_id."""
        self._full_collection.upsert(
            ids=[song_id],
            documents=[lyrics],
            metadatas=[{"song_id": song_id, "song_name": song_name, "artist": artist}],
            embeddings=[[0.0]],  # placeholder — this collection is key-lookup only
        )

    def query_chunks(
        self, embedding: List[float], top_k: int
    ) -> Dict[str, Any]:
        """Run a vector similarity query against the chunks collection."""
        results = self._chunks_collection.query(
            query_embeddings=[embedding],
            n_results=min(top_k * 10, self._chunks_collection.count() or 1),
            include=["documents", "metadatas", "distances"],
        )
        return results

    def get_full_lyrics(self, song_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve full lyrics document by song_id. Returns None if not found."""
        result = self._full_collection.get(
            ids=[song_id],
            include=["documents", "metadatas"],
        )
        if not result["ids"]:
            return None
        return {
            "song_id": result["ids"][0],
            "song_name": result["metadatas"][0]["song_name"],
            "artist": result["metadatas"][0]["artist"],
            "lyrics": result["documents"][0],
        }
