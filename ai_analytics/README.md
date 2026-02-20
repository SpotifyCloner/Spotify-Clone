AI/Analytics — Member 3 (Recommendations, Smart Filters, Analytics)

Quick start

1. Create and activate a Python virtualenv (recommended):

```bash
python -m venv .venv
# Windows
.venv\Scripts\activate
# mac / linux
source .venv/bin/activate
```

2. Install dependencies:

```bash
python -m pip install -r ai_analytics/requirements.txt
```

3. Run a quick self-test (prints recommendations):

```bash
python ai_analytics/app/test_run.py
```

4. Run the API server:

```bash
uvicorn ai_analytics.app.main:app --reload --port 9000
```

Files added

- ai_analytics/app/main.py: FastAPI endpoints for recommendations, filters, and events
- ai_analytics/app/recommender.py: Content-based recommender (TF-IDF + cosine)
- ai_analytics/app/filters.py: Smart filter logic
- ai_analytics/app/events.py: SQLite event logger + endpoints
- ai_analytics/data/sample_tracks.json: Small sample dataset
- ai_analytics/app/test_run.py: quick script to verify recommender

Next steps

- Integrate with team RAG pipeline (inject retrieved lyrics into context)
- Persist embeddings or switch to vector DB for scale
- Add auth and pagination for events
