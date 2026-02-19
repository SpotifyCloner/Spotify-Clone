from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
import models, schemas

# --- User CRUD ---
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate):
    # In a real production app, password should be hashed here.
    fake_hashed_password = user.password 
    db_user = models.User(email=user.email, name=user.name, password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user_id: int, user: schemas.UserCreate):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.name = user.name
        db_user.email = user.email
        db_user.password = user.password # Again, should be hashed
        db.commit()
        db.refresh(db_user)
    return db_user

def delete_user(db: Session, user_id: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return db_user

# --- Playlist CRUD ---

def create_playlist(db: Session, playlist: schemas.PlaylistCreate):
    db_playlist = models.Playlist(name=playlist.name, user_id=playlist.user_id)
    db.add(db_playlist)
    db.commit()
    db.refresh(db_playlist)
    return db_playlist

def get_playlists_by_user(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.Playlist).filter(models.Playlist.user_id == user_id).offset(skip).limit(limit).all()

def get_playlist(db: Session, playlist_id: int):
    return db.query(models.Playlist).filter(models.Playlist.id == playlist_id).first()

def update_playlist(db: Session, playlist_id: int, playlist: schemas.PlaylistUpdate):
    db_playlist = db.query(models.Playlist).filter(models.Playlist.id == playlist_id).first()
    if db_playlist:
        db_playlist.name = playlist.name
        db.commit()
        db.refresh(db_playlist)
    return db_playlist

def delete_playlist(db: Session, playlist_id: int):
    db_playlist = db.query(models.Playlist).filter(models.Playlist.id == playlist_id).first()
    if db_playlist:
        # Cascade delete is handled by DB relationship, but explicit delete is fine
        db.delete(db_playlist)
        db.commit()
    return db_playlist

# --- Playlist Song CRUD ---

def add_song_to_playlist(db: Session, playlist_id: int, track_id: str):
    # Check if song exists in playlist is handled by unique constraint, 
    # but we can also check here to avoid DB error or handle it gracefully.
    # However, for conciseness and race-condition safety, let constraint handle it or do a check.
    
    # Check for duplicate
    existing_song = db.query(models.PlaylistSong).filter(
        models.PlaylistSong.playlist_id == playlist_id,
        models.PlaylistSong.track_id == track_id
    ).first()
    
    if existing_song:
        return None # Indicate duplicate

    db_song = models.PlaylistSong(playlist_id=playlist_id, track_id=track_id)
    db.add(db_song)
    try:
        db.commit()
        db.refresh(db_song)
        return db_song
    except IntegrityError:
        db.rollback()
        return None

def remove_song_from_playlist(db: Session, playlist_id: int, track_id: str):
    db_song = db.query(models.PlaylistSong).filter(
        models.PlaylistSong.playlist_id == playlist_id,
        models.PlaylistSong.track_id == track_id
    ).first()
    
    if db_song:
        db.delete(db_song)
        db.commit()
        return True
    return False

def get_songs_in_playlist(db: Session, playlist_id: int, skip: int = 0, limit: int = 100):
    return db.query(models.PlaylistSong).filter(models.PlaylistSong.playlist_id == playlist_id).offset(skip).limit(limit).all()
