import json
from typing import List, Dict, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel


class ContentRecommender:
    """Simple content-based recommender using TF-IDF over lyrics + tags."""

    def __init__(self, tracks: List[Dict]):
        self.tracks = tracks
        self.id_to_index = {t["id"]: i for i, t in enumerate(tracks)}
        docs = [self._doc_for(t) for t in tracks]
        self.vectorizer = TfidfVectorizer(stop_words="english")
        self.tfidf_matrix = self.vectorizer.fit_transform(docs)

    @classmethod
    def from_json(cls, path: str):
        with open(path, "r", encoding="utf-8") as f:
            tracks = json.load(f)
        return cls(tracks)

    def _doc_for(self, track: Dict) -> str:
        tags = " ".join(track.get("tags", []))
        return f"{track.get('lyrics','')} {tags}"

    def recommend(self, track_id: str, top_k: int = 5) -> List[Dict]:
        if track_id not in self.id_to_index:
            return []
        idx = self.id_to_index[track_id]
        query_vec = self.tfidf_matrix[idx]
        cosine_similarities = linear_kernel(query_vec, self.tfidf_matrix).flatten()
        # exclude itself
        cosine_similarities[idx] = -1
        top_indices = np.argsort(-cosine_similarities)[:top_k]
        recommendations = []
        for i in top_indices:
            score = float(cosine_similarities[i])
            recommendations.append({
                "id": self.tracks[i]["id"],
                "title": self.tracks[i]["title"],
                "artist": self.tracks[i]["artist"],
                "score": score,
            })
        return recommendations

    def bulk_recommend(self, top_k: int = 5) -> Dict[str, List[Dict]]:
        result = {}
        for t in self.tracks:
            result[t["id"]] = self.recommend(t["id"], top_k=top_k)
        return result
