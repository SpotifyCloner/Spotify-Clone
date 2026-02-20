from typing import List, Dict, Any


def smart_filter(tracks: List[Dict[str, Any]], criteria: Dict[str, Any]) -> List[Dict[str, Any]]:
    """Filter and sort tracks by simple metadata criteria.

    Supported criteria keys:
    - mood: exact match
    - genre: exact match
    - tempo_min / tempo_max: numeric range
    - sort_by: one of 'tempo', 'title', 'score' (score only relevant if present)
    - ascending: bool
    """
    result = tracks

    mood = criteria.get("mood")
    if mood:
        result = [t for t in result if t.get("mood") == mood]

    genre = criteria.get("genre")
    if genre:
        result = [t for t in result if t.get("genre") == genre]

    tempo_min = criteria.get("tempo_min")
    tempo_max = criteria.get("tempo_max")
    if tempo_min is not None:
        result = [t for t in result if t.get("tempo") is not None and t.get("tempo") >= tempo_min]
    if tempo_max is not None:
        result = [t for t in result if t.get("tempo") is not None and t.get("tempo") <= tempo_max]

    sort_by = criteria.get("sort_by")
    ascending = bool(criteria.get("ascending", False))
    if sort_by:
        result = sorted(result, key=lambda x: x.get(sort_by, 0), reverse=not ascending)

    return result
