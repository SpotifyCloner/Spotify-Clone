from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import crud, models, schemas
from database import get_db

router = APIRouter(
    prefix="/playlists",
    tags=["playlists"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Playlist)
def create_playlist(playlist: schemas.PlaylistCreate, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = crud.get_user(db, user_id=playlist.user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return crud.create_playlist(db=db, playlist=playlist)

@router.get("/user/{user_id}", response_model=List[schemas.Playlist])
def read_user_playlists(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    playlists = crud.get_playlists_by_user(db, user_id=user_id, skip=skip, limit=limit)
    return playlists

# Additional endpoint to get a single playlist details if needed, 
# though requirements emphasized user playlists.
@router.get("/{playlist_id}", response_model=schemas.Playlist)
def read_playlist(playlist_id: int, db: Session = Depends(get_db)):
    db_playlist = crud.get_playlist(db, playlist_id=playlist_id)
    if db_playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return db_playlist

@router.put("/{playlist_id}", response_model=schemas.Playlist)
def update_playlist_name(playlist_id: int, playlist: schemas.PlaylistUpdate, db: Session = Depends(get_db)):
    db_playlist = crud.update_playlist(db, playlist_id=playlist_id, playlist=playlist)
    if db_playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return db_playlist

@router.delete("/{playlist_id}", response_model=schemas.Playlist)
def delete_playlist(playlist_id: int, db: Session = Depends(get_db)):
    db_playlist = crud.delete_playlist(db, playlist_id=playlist_id)
    if db_playlist is None:
        raise HTTPException(status_code=404, detail="Playlist not found")
    return db_playlist

@router.post("/{playlist_id}/add-song", response_model=schemas.PlaylistSong)
def add_song_to_playlist(playlist_id: int, song: schemas.PlaylistSongBase, db: Session = Depends(get_db)):
    # Verify playlist exists
    db_playlist = crud.get_playlist(db, playlist_id=playlist_id)
    if not db_playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    
    # Try adding song
    # For now, we assume track_id is valid (validated by external service or frontend)
    db_song = crud.add_song_to_playlist(db, playlist_id=playlist_id, track_id=song.track_id)
    if not db_song:
        raise HTTPException(status_code=400, detail="Song already in playlist")
    return db_song

@router.delete("/{playlist_id}/remove-song/{track_id}")
def remove_song_from_playlist(playlist_id: int, track_id: str, db: Session = Depends(get_db)):
     # Verify playlist exists
    db_playlist = crud.get_playlist(db, playlist_id=playlist_id)
    if not db_playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
        
    removed = crud.remove_song_from_playlist(db, playlist_id=playlist_id, track_id=track_id)
    if not removed:
         raise HTTPException(status_code=404, detail="Song not found in playlist")
    return {"message": "Song removed successfully"}

@router.get("/{playlist_id}/songs", response_model=List[schemas.PlaylistSong])
def get_playlist_songs(playlist_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    db_playlist = crud.get_playlist(db, playlist_id=playlist_id)
    if not db_playlist:
        raise HTTPException(status_code=404, detail="Playlist not found")
    
    songs = crud.get_songs_in_playlist(db, playlist_id=playlist_id, skip=skip, limit=limit)
    return songs
