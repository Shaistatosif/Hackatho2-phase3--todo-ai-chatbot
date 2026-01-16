"""Database connection module for Neon PostgreSQL."""

import os
from sqlmodel import SQLModel, create_engine, Session
from sqlalchemy.pool import NullPool
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    # Use in-memory SQLite for development/testing when DATABASE_URL not provided
    DATABASE_URL = "sqlite:///./test.db"
    print("WARNING: Using SQLite in-memory database. Set DATABASE_URL for production.")
    engine = create_engine(DATABASE_URL, echo=os.getenv("DEBUG", "false").lower() == "true")
else:
    # Use NullPool for serverless (Neon) - no connection pooling
    engine = create_engine(
        DATABASE_URL,
        poolclass=NullPool,
        echo=os.getenv("DEBUG", "false").lower() == "true",
    )


def get_session():
    """Get a database session. Use as a dependency in FastAPI."""
    with Session(engine) as session:
        yield session


def init_db():
    """Initialize database tables."""
    # Import models to register them with SQLModel metadata
    from src.models import Task, Conversation, Message  # noqa: F401
    SQLModel.metadata.create_all(engine)
