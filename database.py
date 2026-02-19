from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Database connection details
# Format: postgresql://username:password@host:port/database_name
# SQLALCHEMY_DATABASE_URL = "postgresql://music_user:1234@localhost:5432/music_app"

# Using SQLite for easier local setup as per requirements
SQLALCHEMY_DATABASE_URL = "sqlite:///./music_app.db"

# Create Database Engine
# connect_args={"check_same_thread": False} is required for SQLite only
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models to inherit from
Base = declarative_base()

# Dependency to get database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
