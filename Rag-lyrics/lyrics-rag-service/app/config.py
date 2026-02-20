from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    CHROMA_PERSIST_DIR: str = "./chroma_store"
    COLLECTION_NAME: str = "lyrics_chunks"
    LYRICS_COLLECTION_NAME: str = "lyrics_full"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"
    TOP_K_DEFAULT: int = 5
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
