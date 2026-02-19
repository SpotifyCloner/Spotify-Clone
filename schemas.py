from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    created_at: datetime
    # To avoid circular dependency issues when loading playlists with user, we might use ForwardRef or just minimal info.
    # For now, let's keep it simple. If we need to return playlists in user, we'll add it.

    class Config:
        orm_mode = True

# --- PlaylistSong Schemas ---
class PlaylistSongBase(BaseModel):
    track_id: str

class PlaylistSongCreate(PlaylistSongBase):
    pass

class PlaylistSong(PlaylistSongBase):
    id: int
    playlist_id: int
    added_at: datetime

    class Config:
        orm_mode = True

# --- Playlist Schemas ---
class PlaylistBase(BaseModel):
    name: str

class PlaylistCreate(PlaylistBase):
    user_id: int # Explicitly passed or inferred from auth

class PlaylistUpdate(BaseModel):
    name: str

class Playlist(PlaylistBase):
    id: int
    user_id: int
    created_at: datetime
    songs: List[PlaylistSong] = []

    class Config:
        orm_mode = True

# Extended User schema with playlists if needed, or keeping it separate. 
# For /playlists/user/{user_id}, we return List[Playlist], so Playlist schema is key.
