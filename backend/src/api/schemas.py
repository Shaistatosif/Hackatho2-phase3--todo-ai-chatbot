"""Request/Response schemas for the API."""

from typing import Optional, Any
from pydantic import BaseModel, Field


class ChatRequest(BaseModel):
    """Request schema for chat endpoint."""

    conversation_id: Optional[int] = Field(
        default=None,
        description="Existing conversation ID (omit to create new conversation)",
    )
    message: str = Field(
        min_length=1,
        max_length=2000,
        description="User's message in natural language",
    )


class ToolCall(BaseModel):
    """Schema for a single tool invocation."""

    tool: str = Field(description="MCP tool name")
    parameters: dict[str, Any] = Field(description="Parameters passed to the tool")
    result: dict[str, Any] = Field(description="Tool execution result")


class ChatResponse(BaseModel):
    """Response schema for chat endpoint."""

    conversation_id: int = Field(description="Conversation ID (new or existing)")
    response: str = Field(description="AI assistant's response")
    tool_calls: Optional[list[ToolCall]] = Field(
        default=None,
        description="MCP tool invocations made during this turn",
    )


class TaskResponse(BaseModel):
    """Response schema for a task."""

    id: int
    user_id: str
    title: str
    description: Optional[str] = None
    completed: bool
    created_at: str
    updated_at: str


class ConversationResponse(BaseModel):
    """Response schema for a conversation."""

    id: int
    user_id: str
    created_at: str
    updated_at: str


class MessageResponse(BaseModel):
    """Response schema for a message."""

    id: int
    conversation_id: int
    role: str
    content: str
    tool_calls: Optional[list[ToolCall]] = None
    created_at: str


class ConversationDetailResponse(ConversationResponse):
    """Response schema for a conversation with messages."""

    messages: list[MessageResponse] = []
