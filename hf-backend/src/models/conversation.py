"""Conversation model for chat sessions."""

from datetime import datetime
from typing import Optional, List, TYPE_CHECKING
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Index

if TYPE_CHECKING:
    from .message import Message


class Conversation(SQLModel, table=True):
    """A chat session between a user and the assistant."""

    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(max_length=100, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    messages: List["Message"] = Relationship(back_populates="conversation")

    __table_args__ = (
        Index("idx_conversation_user", "user_id"),
        Index("idx_conversation_updated", "user_id", "updated_at"),
    )


class ConversationCreate(SQLModel):
    """Schema for creating a conversation."""

    user_id: str = Field(min_length=1, max_length=100)
