from __future__ import annotations
import math
from typing import List
from app.services.embedding_service import EmbeddingService
from app.services.chromadb_service import ChromaDBService
from app.models.response_models import SongResult


class RetrievalService:
    def __init__(self) -> None:
        self._embedding_service = EmbeddingService()
        self._chromadb_service = ChromaDBService()

    def search(self, query: str, top_k: int) -> List[SongResult]:
        """
        Embed the query, search ChromaDB, group results by song,
        apply strict lexical gating and thresholding, and return top-K.
        """
        query_embedding = self._embedding_service.embed_query(query)
        raw = self._chromadb_service.query_chunks(query_embedding, top_k)

        if not raw["ids"] or not raw["ids"][0]:
            return []

        query_words = set(w.lower() for w in query.lower().split() if len(w) > 2)
        song_map: dict[str, dict] = {}

        ids = raw["ids"][0]
        documents = raw["documents"][0]
        metadatas = raw["metadatas"][0]
        distances = raw["distances"][0]

        # First pass: Identify lexical matches
        lexical_results = []
        semantic_results = []
        
        for doc, meta, distance in zip(documents, metadatas, distances):
            similarity = max(0.0, 1.0 - (distance / 2.0))
            doc_lower = doc.lower()
            
            # Check for literal overlap
            has_lexical = any(w in doc_lower for w in query_words)
            
            if has_lexical:
                # Add boost and mark as high-confidence
                lexical_results.append((doc, meta, similarity + 0.5))
            elif similarity >= 0.5: # Higher threshold for purely semantic matches
                semantic_results.append((doc, meta, similarity))

        # Strict Lexical Gating: If literal matches exist, ignore purely semantic ones
        # This prevents "wooden" from returning "dry land" just because it's semantically close
        final_candidates = lexical_results if lexical_results else semantic_results

        for doc, meta, similarity in final_candidates:
            song_id = meta["song_id"]
            if song_id not in song_map:
                song_map[song_id] = {
                    "song_id": song_id,
                    "song_name": meta["song_name"],
                    "artist": meta["artist"],
                    "max_similarity": similarity,
                    "matched_lyrics": [],
                }

            entry = song_map[song_id]
            entry["matched_lyrics"].append(doc)
            if similarity > entry["max_similarity"]:
                entry["max_similarity"] = similarity

        # Compute composite score and build results
        results: List[SongResult] = []
        for entry in song_map.values():
            n_chunks = len(entry["matched_lyrics"])
            composite_score = entry["max_similarity"] * math.log1p(n_chunks)
            results.append(
                SongResult(
                    song_id=entry["song_id"],
                    song_name=entry["song_name"],
                    artist=entry["artist"],
                    score=round(composite_score, 6),
                    matched_lyrics=entry["matched_lyrics"],
                )
            )

        # Sort descending by composite score, return top-K
        results.sort(key=lambda r: r.score, reverse=True)
        return results[:top_k]
