import sys
import os
import json
import hashlib

# Allow running as: python -m app.ingestion.ingest_lyrics from the service root
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../..")))

from app.utils.text_chunker import chunk_lyrics
from app.services.embedding_service import EmbeddingService
from app.services.chromadb_service import ChromaDBService

DATA_FILE = os.path.join(os.path.dirname(__file__), "../../data/lyrics.json")


def make_chunk_id(song_id: str, chunk_index: int) -> str:
    """Generate a deterministic, collision-resistant ID for a lyric chunk."""
    raw = f"{song_id}::chunk::{chunk_index}"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def ingest(data_path: str = DATA_FILE) -> None:
    embedding_service = EmbeddingService()
    chromadb_service = ChromaDBService()

    with open(data_path, "r", encoding="utf-8") as f:
        songs = json.load(f)

    if not isinstance(songs, list):
        raise ValueError("lyrics.json must be a JSON array of song objects.")

    print(f"Starting ingestion of {len(songs)} song(s)...\n")

    for song in songs:
        song_id: str = str(song["song_id"])
        song_name: str = song["song_name"]
        artist: str = song["artist"]
        album: str = song.get("album", "")
        language: str = song.get("language", "")
        lyrics: str = song["lyrics"]

        chunks = chunk_lyrics(lyrics)
        if not chunks:
            print(f"  [SKIP] '{song_name}' by {artist} — no chunks produced.")
            continue

        print(f"  [{song_name}] by {artist} — {len(chunks)} chunk(s)")

        embeddings = embedding_service.embed(chunks)

        ids = [make_chunk_id(song_id, i) for i in range(len(chunks))]
        metadatas = [
            {
                "song_id": song_id,
                "song_name": song_name,
                "artist": artist,
                "album": album,
                "language": language,
            }
            for _ in chunks
        ]

        chromadb_service.upsert_chunks(
            ids=ids,
            embeddings=embeddings,
            documents=chunks,
            metadatas=metadatas,
        )

        chromadb_service.upsert_full_lyrics(
            song_id=song_id,
            song_name=song_name,
            artist=artist,
            lyrics=lyrics,
        )

        print(f"  [OK] '{song_name}' upserted successfully.")

    print("\nIngestion complete. Safe to re-run — duplicates are prevented via upsert.")


if __name__ == "__main__":
    ingest()
