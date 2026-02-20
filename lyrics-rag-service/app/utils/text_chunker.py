import nltk
from typing import List

# Download required NLTK data on first import
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt", quiet=True)


def chunk_lyrics(lyrics: str) -> List[str]:
    """
    Split lyrics text into sentence-level chunks using NLTK.
    Filters out empty or whitespace-only entries.
    Returns a list of non-empty sentence strings.
    """
    if not lyrics or not lyrics.strip():
        return []

    sentences = nltk.sent_tokenize(lyrics.strip())
    chunks = [s.strip() for s in sentences if s.strip()]
    return chunks
