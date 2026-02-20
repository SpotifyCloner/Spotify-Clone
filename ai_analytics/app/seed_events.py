from ai_analytics.app.events import EventLogger

def seed_events():
    logger = EventLogger()
    sample_events = [
        ("play", "user1", "t1", {"source":"recommendation"}),
        ("play", "user2", "t8", {"source":"search"}),
        ("search", "user3", None, {"query":"khushi"}),
        ("add_to_playlist", "user1", "t7", {"playlist_id":"p1"}),
        ("play", "user4", "t19", {"source":"autoplay"}),
        ("play", "user2", "t20", {"source":"radio"}),
        ("skip", "user3", "t32", {"position":12}),
        ("play", "user5", "t37", {"source":"browse"}),
        ("play", "user6", "t50", {"source":"playlist"}),
        ("like", "user1", "t3", {}),
        ("play", "user2", "t13", {}),
        ("search", "user7", None, {"query":"reggaeton"}),
        ("play", "user8", "t27", {}),
        ("play", "user9", "t39", {}),
        ("play", "user10", "t44", {}),
    ]

    for ev in sample_events:
        event_type, user_id, track_id, meta = ev
        logger.log_event(event_type, user_id, track_id, meta)

    print(f"Seeded {len(sample_events)} events to {logger.db_path}")


if __name__ == '__main__':
    seed_events()
