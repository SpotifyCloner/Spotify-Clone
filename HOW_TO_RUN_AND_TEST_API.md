================================================================================
AI ANALYTICS - MEMBER 3
HOW TO RUN AND TEST THE API
================================================================================

## Quick Start

1. SETUP (first time only)
   a) Open PowerShell and navigate to the repo:

```
cd C:\Users\Admin\Desktop\Spotify\Spotify-Clone
```

   b) Create and activate virtual environment:

```
python -m venv .venv
. .venv\Scripts\Activate
```

   c) Install dependencies:

```
python -m pip install -r ai_analytics/requirements.txt
```

2. SEED SAMPLE DATA (populate events database)

```
python -m ai_analytics.app.seed_events
```

3. RUN THE API SERVER

```
uvicorn ai_analytics.app.main:app --reload --port 9000
```

Expected output:

```
Uvicorn running on http://127.0.0.1:9000 (Press CTRL+C to quit)
```

4. TEST THE API (open new PowerShell tab)

See TESTING ENDPOINTS section below

================================================================================
## TESTING ENDPOINTS
================================================================================

### Interactive Testing (Easiest - Browser)

1. Open browser: http://localhost:9000/docs
2. You will see FastAPI Swagger UI with all endpoints
3. Click "Try it out" on any endpoint, enter parameters, click "Execute"

### Testing with PowerShell

TEST 1: Get Recommendations for a Track

```
Invoke-RestMethod -Method GET -Uri http://localhost:9000/recommend/t1 | ConvertTo-Json -Depth 5
```

Expected: Returns track `t1` and 5 recommended similar tracks with similarity scores

TEST 2: Filter Tracks by Genre

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"genre":"pop"}' | ConvertTo-Json -Depth 5
```

Expected: Returns all pop songs (t7-t11, t52, t56)

TEST 3: Filter Tracks by Mood

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"mood":"happy"}' | ConvertTo-Json -Depth 5
```

Expected: Returns all happy mood songs

TEST 4: Filter by Genre and Sort by Tempo

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"genre":"rock","sort_by":"tempo","ascending":true}' | ConvertTo-Json -Depth 5
```

Expected: Rock songs sorted by tempo (ascending)

TEST 5: Filter by Tempo Range

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"tempo_min":100,"tempo_max":130}' | ConvertTo-Json -Depth 5
```

Expected: All tracks with tempo between 100-130 BPM

TEST 6: Log an Event

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/events -ContentType 'application/json' -Body '{"event_type":"play","user_id":"user123","track_id":"t52","metadata":{"source":"search"}}' | ConvertTo-Json -Depth 5
```

Expected: Returns {"status":"ok"}

TEST 7: Get Recent Events

```
Invoke-RestMethod -Method GET -Uri http://localhost:9000/events?limit=10 | ConvertTo-Json -Depth 5
```

Expected: Returns last 10 logged events from SQLite database

TEST 8: Recommend Telugu Track

```
Invoke-RestMethod -Method GET -Uri http://localhost:9000/recommend/t52 | ConvertTo-Json -Depth 5
```

Expected: Recommendations for t52 "ఆనందమె" (Telugu pop song)

TEST 9: Filter Telugu Songs Only

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"sort_by":"title"}' | ConvertTo-Json -Depth 5
```

Then check response for tracks t51-t58 (all Telugu language)

TEST 10: Complex Filter (Multiple Criteria)

```
Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"mood":"energetic","genre":"rock"}' | ConvertTo-Json -Depth 5
```

Expected: Rock songs with energetic mood

================================================================================
## AUTOMATED TESTING
================================================================================

Run Unit Tests (No Server Needed)

```
C:\Users\Admin\Desktop\Spotify\.venv\Scripts\python.exe -m ai_analytics.tests.test_all
```

Expected:

- recommender: OK t1 -> 5 recs
- filter (happy): 3 results
- events: POST and GET OK
- EventLogger DB: OK
- ALL TESTS PASSED

Run Full Test Suite (Seeds + Tests + Server + Integration)

From repo root, open PowerShell and run:

```
Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
.\run_all_tests.ps1
```

This script:

1. Seeds events database
2. Runs unit tests
3. Starts uvicorn server on port 9000
4. Runs integration checks on all endpoints
5. Stops the server

Expected: All steps complete without errors

================================================================================
## DATA OVERVIEW
================================================================================

Total Tracks: 58

- Indie: 5
- Pop: 5
- Rock: 5
- Electronic: 6
- Ambient: 5
- Hip-hop: 5
- Jazz/Blues: 5
- Country/Folk: 5
- Reggaeton: 4
- Telugu (distributed): 8

Languages: 11 (English, Spanish, Hindi, French, Japanese, German, Korean, Portuguese, Telugu, etc.)

Metadata per Track:

- `id`: unique track identifier
- `title`: song name
- `artist`: artist name
- `lyrics`: sample lyrics
- `mood`: happy, sad, calm, energetic, etc.
- `tempo`: BPM (beats per minute)
- `genre`: music genre
- `tags`: descriptive tags
- `language`: language code (en, es, hi, te, etc.)

================================================================================
## ENDPOINTS REFERENCE
================================================================================

1. GET `/recommend/{track_id}`
   - Parameters: `track_id` (string), `top_k` (optional, default 5)
   - Returns: Recommended tracks based on content similarity
   - Example: `http://localhost:9000/recommend/t1?top_k=3`

2. POST `/filter`
   - Body:
```json
{
  "mood": "string (optional)",
  "genre": "string (optional)",
  "tempo_min": "integer (optional)",
  "tempo_max": "integer (optional)",
  "sort_by": "string (optional - \"tempo\", \"title\", \"score\")",
  "ascending": "boolean (optional, default false)"
}
```
   - Returns: Count and list of filtered tracks

3. POST `/events`
   - Body:
```json
{
  "event_type": "string (required)",
  "user_id": "string (optional)",
  "track_id": "string (optional)",
  "metadata": "object (optional)"
}
```
   - Returns: `{ "status": "ok" }`

4. GET `/events`
   - Parameters: `limit` (optional, default 100)
   - Returns: List of recent events from database

================================================================================
## USEFUL NOTES
================================================================================

Sample Telugu Track IDs:

- t51 - చెరువులో (Folk)
- t52 - ఆనందమె (Pop)
- t53 - రాత్రి తరుణం (Indie)
- t54 - శక్తి (Rock)
- t55 - సంగీతం (Ambient)
- t56 - నీ తరపున (Ballad/Pop)
- t57 - రిథమ్ (Electronic)
- t58 - జీవితమె విజయం (Hip-hop)

Database:

- Events stored in: `ai_analytics/events.db` (SQLite)
- Can be cleared and re-seeded anytime with `seed_events.py`

Logs/Debug:

- Check uvicorn console output for API request logs
- Check test output for unit test results
- Check `events.db` contents with any SQLite browser

Stopping the Server:

- Press `Ctrl+C` in the PowerShell tab running uvicorn

================================================================================
## TROUBLESHOOTING
================================================================================

Q: Port 9000 already in use?
A: Change port: `uvicorn ai_analytics.app.main:app --port 9001`

Q: Python virtual environment issues?
A: Delete `.venv` folder and recreate:

```
rmdir .venv /s /q
python -m venv .venv
. .venv\Scripts\Activate
python -m pip install -r ai_analytics/requirements.txt
```

Q: Recommendations not working?
A: Ensure `sample_tracks.json` is in `ai_analytics/data/`

Q: Events not persisting?
A: Delete `ai_analytics/events.db` and re-run `seed_events.py`

Q: Tests failing?
A: Reinstall dependencies: `pip install --upgrade -r ai_analytics/requirements.txt`

================================================================================
END OF DOCUMENTATION
================================================================================
================================================================================
AI ANALYTICS - MEMBER 3
HOW TO RUN AND TEST THE API
================================================================================

QUICK START
-----------

1. SETUP (first time only)
   a) Open PowerShell and navigate to the repo:
      cd C:\Users\Admin\Desktop\Spotify\Spotify-Clone

   b) Create and activate virtual environment:
      python -m venv .venv
      . .venv\Scripts\Activate

   c) Install dependencies:
      python -m pip install -r ai_analytics/requirements.txt

2. SEED SAMPLE DATA (populate events database)
   python -m ai_analytics.app.seed_events

3. RUN THE API SERVER
   uvicorn ai_analytics.app.main:app --reload --port 9000

   Expected output:
   Uvicorn running on http://127.0.0.1:9000 (Press CTRL+C to quit)

4. TEST THE API (open new PowerShell tab)
   See TESTING ENDPOINTS section below

================================================================================
TESTING ENDPOINTS
================================================================================

Interactive Testing (Easiest - Browser)
--------------------------------------
1. Open browser: http://localhost:9000/docs
2. You will see FastAPI Swagger UI with all endpoints
3. Click "Try it out" on any endpoint, enter parameters, click "Execute"

Testing with PowerShell
----------------------

TEST 1: Get Recommendations for a Track
  Invoke-RestMethod -Method GET -Uri http://localhost:9000/recommend/t1 | ConvertTo-Json -Depth 5

  Expected: Returns track t1 and 5 recommended similar tracks with similarity scores

TEST 2: Filter Tracks by Genre
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"genre":"pop"}' | ConvertTo-Json -Depth 5

  Expected: Returns all pop songs (t7-t11, t52, t56)

TEST 3: Filter Tracks by Mood
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"mood":"happy"}' | ConvertTo-Json -Depth 5

  Expected: Returns all happy mood songs

TEST 4: Filter by Genre and Sort by Tempo
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"genre":"rock","sort_by":"tempo","ascending":true}' | ConvertTo-Json -Depth 5

  Expected: Rock songs sorted by tempo (ascending)

TEST 5: Filter by Tempo Range
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"tempo_min":100,"tempo_max":130}' | ConvertTo-Json -Depth 5

  Expected: All tracks with tempo between 100-130 BPM

TEST 6: Log an Event
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/events -ContentType 'application/json' -Body '{"event_type":"play","user_id":"user123","track_id":"t52","metadata":{"source":"search"}}' | ConvertTo-Json -Depth 5

  Expected: Returns {"status":"ok"}

TEST 7: Get Recent Events
  Invoke-RestMethod -Method GET -Uri http://localhost:9000/events?limit=10 | ConvertTo-Json -Depth 5

  Expected: Returns last 10 logged events from SQLite database

TEST 8: Recommend Telugu Track
  Invoke-RestMethod -Method GET -Uri http://localhost:9000/recommend/t52 | ConvertTo-Json -Depth 5

  Expected: Recommendations for t52 "ఆనందమె" (Telugu pop song)

TEST 9: Filter Telugu Songs Only
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"sort_by":"title"}' | ConvertTo-Json -Depth 5

  Then check response for tracks t51-t58 (all Telugu language)

TEST 10: Complex Filter (Multiple Criteria)
  Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"mood":"energetic","genre":"rock"}' | ConvertTo-Json -Depth 5

  Expected: Rock songs with energetic mood

================================================================================
AUTOMATED TESTING
================================================================================

Run Unit Tests (No Server Needed)
  C:\Users\Admin\Desktop\Spotify\.venv\Scripts\python.exe -m ai_analytics.tests.test_all

  Expected: 
  recommender: OK t1 -> 5 recs
  filter (happy): 3 results
  events: POST and GET OK
  EventLogger DB: OK
  ALL TESTS PASSED

Run Full Test Suite (Seeds + Tests + Server + Integration)
  From repo root, open PowerShell and run:
  Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned
  .\run_all_tests.ps1

  This script:
  1. Seeds events database
  2. Runs unit tests
  3. Starts uvicorn server on port 9000
  4. Runs integration checks on all endpoints
  5. Stops the server

  Expected: All steps complete without errors

================================================================================
DATA OVERVIEW
================================================================================

Total Tracks: 58
  - Indie: 5
  - Pop: 5
  - Rock: 5
  - Electronic: 6
  - Ambient: 5
  - Hip-hop: 5
  - Jazz/Blues: 5
  - Country/Folk: 5
  - Reggaeton: 4
  - Telugu (distributed): 8

Languages: 11
  English, Spanish, Hindi, French, Japanese, German, Korean, Portuguese, Telugu, etc.

Metadata per Track:
  - id: unique track identifier
  - title: song name
  - artist: artist name
  - lyrics: sample lyrics
  - mood: happy, sad, calm, energetic, etc.
  - tempo: BPM (beats per minute)
  - genre: music genre
  - tags: descriptive tags
  - language: language code (en, es, hi, te, etc.)

================================================================================
ENDPOINTS REFERENCE
================================================================================

1. GET /recommend/{track_id}
   Parameters: track_id (string), top_k (optional, default 5)
   Returns: Recommended tracks based on content similarity
   Example: http://localhost:9000/recommend/t1?top_k=3

2. POST /filter
   Body: {
     "mood": string (optional),
     "genre": string (optional),
     "tempo_min": integer (optional),
     "tempo_max": integer (optional),
     "sort_by": string (optional - "tempo", "title", "score"),
     "ascending": boolean (optional, default false)
   }
   Returns: Count and list of filtered tracks

3. POST /events
   Body: {
     "event_type": string (required),
     "user_id": string (optional),
     "track_id": string (optional),
     "metadata": object (optional)
   }
   Returns: {"status": "ok"}

4. GET /events
   Parameters: limit (optional, default 100)
   Returns: List of recent events from database

================================================================================
USEFUL NOTES
================================================================================

Sample Telugu Track IDs:
  t51 - చెరువులో (Folk)
  t52 - ఆనందమె (Pop)
  t53 - రాత్రి తరుణం (Indie)
  t54 - శక్తి (Rock)
  t55 - సంగీతం (Ambient)
  t56 - నీ తరపున (Ballad/Pop)
  t57 - రిథమ్ (Electronic)
  t58 - జీవితమె విజయం (Hip-hop)

Database:
  - Events stored in: ai_analytics/events.db (SQLite)
  - Can be cleared and re-seeded anytime with seed_events.py

Logs/Debug:
  - Check `uvicorn` console output for API request logs
  - Check test output for unit test results
  - Check events.db contents with any SQLite browser

Stopping the Server:
  - Press Ctrl+C in the PowerShell tab running uvicorn

================================================================================
TROUBLESHOOTING
================================================================================

Q: Port 9000 already in use?
A: Change port: uvicorn ai_analytics.app.main:app --port 9001

Q: Python virtual environment issues?
A: Delete .venv folder and recreate:
   rmdir .venv /s /q
   python -m venv .venv
   . .venv\Scripts\Activate
   python -m pip install -r ai_analytics/requirements.txt

Q: Recommendations not working?
A: Ensure sample_tracks.json is in ai_analytics/data/

Q: Events not persisting?
A: Delete ai_analytics/events.db and re-run seed_events.py

Q: Tests failing?
A: Reinstall dependencies: pip install --upgrade -r ai_analytics/requirements.txt

================================================================================
END OF DOCUMENTATION
================================================================================
