# Lyrics RAG Service

A production-ready microservice for semantic lyrics retrieval and search, built with FastAPI and ChromaDB.

## 🚀 Tech Stack
- **FastAPI**: High-performance REST API.
- **ChromaDB**: Vector database for persistent embedding storage.
- **Sentence-Transformers**: local embeddings via `all-MiniLM-L6-v2`.
- **NLTK**: Sentence-based semantic chunking.

## 🛠 Setup

### 1. Requisites
- Python 3.11+
- Virtual environment (recommended)

### 2. Installation
```bash
pip install -r requirements.txt
```

### 3. Ingest Sample Data
This script splits lyrics into sentence chunks, generates embeddings, and stores them in ChromaDB idempotently.
```bash
python -m app.ingestion.ingest_lyrics
```

### 4. Start Server
Runs the FastAPI server on port 8000.
```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## 🔗 Spring Boot Integration

### 1. Search Lyrics (WebClient)
```java
public Flux<SearchResponse> search(String query) {
    return webClient.post()
        .uri("/rag/search")
        .bodyValue(new SearchRequest(query, 5))
        .retrieve()
        .bodyToFlux(SearchResponse.class);
}
```

### 2. Retrieve Full Lyrics (RestTemplate)
```java
public LyricsResponse getLyrics(String songId) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    HttpEntity<Map<String, String>> entity = new HttpEntity<>(Map.of("song_id", songId), headers);
    
    return restTemplate.postForObject("/rag/retrieve-lyrics", entity, LyricsResponse.class);
}
```

---

## 📡 API Reference

### POST `/rag/search`
**Request:**
```json
{
  "query": "songs about flying in the sky",
  "top_k": 5
}
```
**Response:**
```json
{
  "results": [
    {
      "song_id": "hotel-003",
      "song_name": "Hotel California",
      "artist": "Eagles",
      "score": 0.85,
      "matched_lyrics": ["Up ahead in the distance, I saw a shimmering light"]
    }
  ]
}
```

### POST `/rag/retrieve-lyrics`
**Request:**
```json
{
  "song_id": "imagine-001"
}
```
**Response:**
```json
{
  "song_id": "imagine-001",
  "song_name": "Imagine",
  "artist": "John Lennon",
  "lyrics": "Imagine there's no heaven..."
}
```
