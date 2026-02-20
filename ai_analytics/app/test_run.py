from ai_analytics.app.recommender import ContentRecommender
import os

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "sample_tracks.json")


def run_quick_test():
    rec = ContentRecommender.from_json(DATA_PATH)
    print("Loaded", len(rec.tracks), "tracks")
    sample_id = rec.tracks[0]["id"]
    print(f"Recommendations for {sample_id} -> {rec.tracks[0]['title']} by {rec.tracks[0]['artist']}")
    out = rec.recommend(sample_id, top_k=3)
    for r in out:
        print(f" - {r['id']} {r['title']} ({r['artist']}) score={r['score']:.3f}")


if __name__ == '__main__':
    run_quick_test()
