"""Message model for conversation messages."""

from datetime import datetime
from typing import Optional, Any
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, Index
from sqlalchemy.dialects.postgresql import JSONB

from .conversation import Conversation


class Message(SQLModel, table=True):
    """A single message within a conversation."""

    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversations.id")
    role: str = Field(max_length=20)  # 'user', 'assistant', 'system'
    content: str
    tool_calls: Optional[dict[str, Any]] = Field(
        default=None, sa_column=Column(JSONB)
    )
    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: Optional[Conversation] = Relationship(back_populates="messages")

    __table_args__ = (
        Index("idx_message_conversation", "conversation_id", "created_at"),
    )


class MessageCreate(SQLModel):
    """Schema for creating a message."""

    role: str = Field(max_length=20)
    content: str = Field(max_length=2000)
    tool_calls: Optional[dict[str, Any]] = None
