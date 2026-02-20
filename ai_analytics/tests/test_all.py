from fastapi.testclient import TestClient
from ai_analytics.app.main import app, recommender
from ai_analytics.app.events import EventLogger
import json


def run_tests():
    client = TestClient(app)
    failures = []

    # 1) recommender basic test
    try:
        sample = recommender.tracks[0]["id"]
        rec = client.get(f"/recommend/{sample}")
        assert rec.status_code == 200
        body = rec.json()
        assert "recommendations" in body
        print("recommender: OK", sample, "->", len(body["recommendations"]), "recs")
    except AssertionError as e:
        failures.append(("recommender", str(e)))

    # 2) filter existing mood
    try:
        r = client.post("/filter", json={"mood": "happy"})
        assert r.status_code == 200
        b = r.json()
        print("filter (happy):", b.get("count"), "results")
    except AssertionError as e:
        failures.append(("filter_happy", str(e)))

    # 3) filter non-existing mood
    try:
        r = client.post("/filter", json={"mood": "nonexistent_mood"})
        assert r.status_code == 200
        b = r.json()
        assert b.get("count") == 0
        print("filter (nonexistent_mood): OK (0 results)")
    except AssertionError as e:
        failures.append(("filter_none", str(e)))

    # 4) events: post and get
    try:
        event_payload = {"event_type": "test_play", "user_id": "tester", "track_id": "t1", "metadata": {"note": "unit test"}}
        post = client.post("/events", json=event_payload)
        assert post.status_code == 200
        # fetch events and ensure latest contains our event_type
        evs = client.get("/events").json()
        assert any(e.get("event_type") == "test_play" for e in evs)
        print("events: POST and GET OK, events count:", len(evs))
    except AssertionError as e:
        failures.append(("events", str(e)))

    # 5) low-level EventLogger DB sanity
    try:
        logger = EventLogger()
        logger.log_event("sanity_check", "u_test", "t999", {"x": 1})
        res = logger.get_events(limit=5)
        assert any(r["event_type"] == "sanity_check" for r in res)
        print("EventLogger DB: OK")
    except AssertionError as e:
        failures.append(("eventlogger", str(e)))

    if failures:
        print("\nTESTS FAILED:")
        for f in failures:
            print(f" - {f[0]}: {f[1]}")
        raise SystemExit(1)
    else:
        print("\nALL TESTS PASSED")


if __name__ == '__main__':
    run_tests()
