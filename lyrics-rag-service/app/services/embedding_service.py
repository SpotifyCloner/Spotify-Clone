from __future__ import annotations
from sentence_transformers import SentenceTransformer
from typing import List
from app.config import get_settings

settings = get_settings()


class EmbeddingService:
    _instance: "EmbeddingService | None" = None
    _model: SentenceTransformer | None = None

    def __new__(cls) -> "EmbeddingService":
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._model = SentenceTransformer(settings.EMBEDDING_MODEL)
        return cls._instance

    def embed(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for a list of text strings."""
        if not texts:
            return []
        vectors = self._model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
        return vectors.tolist()

    def embed_query(self, query: str) -> List[float]:
        """Generate a single embedding for a query string."""
        vector = self._model.encode([query], normalize_embeddings=True, show_progress_bar=False)
        return vector[0].tolist()
