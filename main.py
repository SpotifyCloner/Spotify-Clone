from fastapi import FastAPI
import models
from database import engine
from routers import users, playlists

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Music Streaming App - User Service",
    description="Backend service for user profile management",
    version="1.0.0"
)

# Include routers
app.include_router(users.router)
app.include_router(playlists.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Music App User Service"}
