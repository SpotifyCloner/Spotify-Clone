import sqlite3
import json
from typing import Optional, Dict, Any, List
from datetime import datetime

DB_PATH = "ai_analytics/events.db"


class EventLogger:
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._ensure_table()

    def _connect(self):
        return sqlite3.connect(self.db_path)

    def _ensure_table(self):
        conn = self._connect()
        cur = conn.cursor()
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                event_type TEXT,
                user_id TEXT,
                track_id TEXT,
                metadata TEXT,
                timestamp TEXT
            )
            """
        )
        conn.commit()
        conn.close()

    def log_event(self, event_type: str, user_id: Optional[str], track_id: Optional[str], metadata: Optional[Dict[str, Any]] = None):
        conn = self._connect()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO events (event_type, user_id, track_id, metadata, timestamp) VALUES (?, ?, ?, ?, ?)",
            (
                event_type,
                user_id,
                track_id,
                json.dumps(metadata) if metadata is not None else None,
                datetime.utcnow().isoformat(),
            ),
        )
        conn.commit()
        conn.close()

    def get_events(self, limit: int = 100) -> List[Dict[str, Any]]:
        conn = self._connect()
        cur = conn.cursor()
        cur.execute("SELECT id, event_type, user_id, track_id, metadata, timestamp FROM events ORDER BY id DESC LIMIT ?", (limit,))
        rows = cur.fetchall()
        conn.close()
        out = []
        for r in rows:
            meta = None
            if r[4]:
                try:
                    meta = json.loads(r[4])
                except Exception:
                    meta = r[4]
            out.append({
                "id": r[0],
                "event_type": r[1],
                "user_id": r[2],
                "track_id": r[3],
                "metadata": meta,
                "timestamp": r[5],
            })
        return out
