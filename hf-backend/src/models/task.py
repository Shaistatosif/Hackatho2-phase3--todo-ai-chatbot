"""Task model for todo items."""

from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field
from sqlalchemy import Index


class Task(SQLModel, table=True):
    """A todo item belonging to a user."""

    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(max_length=100, index=True)
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    __table_args__ = (
        Index("idx_task_user_status", "user_id", "completed"),
        Index("idx_task_user_created", "user_id", "created_at"),
    )


class TaskCreate(SQLModel):
    """Schema for creating a task."""

    title: str = Field(min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)


class TaskUpdate(SQLModel):
    """Schema for updating a task."""

    title: Optional[str] = Field(default=None, min_length=1, max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
