# Spotify-Clone

A full-stack Spotify clone repository.

## 🚀 Active Feature: AI Lyrics RAG
This branch (`ai-lyrics-rag`) implements a Retrieval-Augmented Generation (RAG) system for searching and retrieving song lyrics semantically.

### Repository Structure
- **`lyrics-rag-service/`**: The core AI microservice.
  - Built with FastAPI, ChromaDB, and Sentence-Transformers.
  - Handles lyrics ingestion, semantic search, and retrieval.
  - See the [Service README](lyrics-rag-service/README.md) for setup and API details.
- **`backend/`**: The main application backend (Spring Boot).

## 🛠 Quick Start (Lyrics RAG)
To get the lyrics service running locally:
1. Navigate to the service folder: `cd lyrics-rag-service`
2. Install dependencies: `pip install -r requirements.txt`
3. Ingest data: `python -m app.ingestion.ingest_lyrics`
4. Start the API: `python -m uvicorn app.main:app --reload`

---
*Note: This branch focuses on the integration of AI-powered lyrics search.*
