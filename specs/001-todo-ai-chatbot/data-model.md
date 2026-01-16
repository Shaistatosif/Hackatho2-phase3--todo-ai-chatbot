# Data Model: Todo AI Chatbot

**Feature**: 001-todo-ai-chatbot
**Date**: 2026-01-13
**Database**: Neon PostgreSQL

## Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│    User     │       │  Conversation   │       │   Message   │
│  (external) │───1:N─│                 │───1:N─│             │
└─────────────┘       └─────────────────┘       └─────────────┘
      │
      │ 1:N
      ▼
┌─────────────┐
│    Task     │
└─────────────┘
```

## Entities

### Task

Represents a todo item belonging to a user.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PK, AUTO | Unique task identifier |
| user_id | VARCHAR(100) | NOT NULL, INDEXED | Owner's user ID |
| title | VARCHAR(200) | NOT NULL | Task title (1-200 chars) |
| description | VARCHAR(1000) | NULLABLE | Optional task details |
| completed | BOOLEAN | NOT NULL, DEFAULT FALSE | Completion status |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Last update timestamp |

**Indexes**:
- `idx_task_user_status` ON (user_id, completed) - Filter by status
- `idx_task_user_created` ON (user_id, created_at DESC) - Sort by recency

**Validation Rules**:
- title: Required, 1-200 characters, trimmed whitespace
- description: Optional, max 1000 characters
- user_id: Required, 1-100 characters

**State Transitions**:
```
[Created] ──complete──> [Completed]
    │                        │
    └──────uncomplete────────┘
    │
    └──────delete────────> [Deleted]
```

### Conversation

Represents a chat session between a user and the assistant.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PK, AUTO | Unique conversation identifier |
| user_id | VARCHAR(100) | NOT NULL, INDEXED | Owner's user ID |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation timestamp |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Last activity timestamp |

**Indexes**:
- `idx_conversation_user` ON (user_id) - Find user's conversations
- `idx_conversation_updated` ON (user_id, updated_at DESC) - Most recent first

### Message

Represents a single message within a conversation.

| Field | Type | Constraints | Description |
|-------|------|-------------|-------------|
| id | INTEGER | PK, AUTO | Unique message identifier |
| conversation_id | INTEGER | FK → Conversation.id, NOT NULL | Parent conversation |
| role | VARCHAR(20) | NOT NULL | 'user', 'assistant', or 'system' |
| content | TEXT | NOT NULL | Message content (max 2000 chars for user) |
| tool_calls | JSONB | NULLABLE | Tool invocations and results |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW | Creation timestamp |

**Indexes**:
- `idx_message_conversation` ON (conversation_id, created_at) - Chronological retrieval

**tool_calls Schema**:
```json
[
  {
    "tool": "add_task",
    "parameters": {
      "user_id": "user123",
      "title": "Buy groceries"
    },
    "result": {
      "task_id": 42,
      "message": "Task created successfully"
    }
  }
]
```

## SQLModel Definitions

```python
from datetime import datetime
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import Column, Index
from sqlalchemy.dialects.postgresql import JSONB

class Task(SQLModel, table=True):
    __tablename__ = "tasks"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(max_length=100, index=True)
    title: str = Field(max_length=200)
    description: Optional[str] = Field(default=None, max_length=1000)
    completed: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    __table_args__ = (
        Index('idx_task_user_status', 'user_id', 'completed'),
        Index('idx_task_user_created', 'user_id', 'created_at'),
    )

class Conversation(SQLModel, table=True):
    __tablename__ = "conversations"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(max_length=100, index=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    messages: list["Message"] = Relationship(back_populates="conversation")

class Message(SQLModel, table=True):
    __tablename__ = "messages"

    id: Optional[int] = Field(default=None, primary_key=True)
    conversation_id: int = Field(foreign_key="conversations.id")
    role: str = Field(max_length=20)  # 'user', 'assistant', 'system'
    content: str
    tool_calls: Optional[dict] = Field(default=None, sa_column=Column(JSONB))
    created_at: datetime = Field(default_factory=datetime.utcnow)

    conversation: Optional[Conversation] = Relationship(back_populates="messages")

    __table_args__ = (
        Index('idx_message_conversation', 'conversation_id', 'created_at'),
    )
```

## Database Migrations

### Initial Migration (001_initial.sql)

```sql
-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description VARCHAR(1000),
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_task_user_status ON tasks(user_id, completed);
CREATE INDEX idx_task_user_created ON tasks(user_id, created_at DESC);

-- Conversations table
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_conversation_user ON conversations(user_id);
CREATE INDEX idx_conversation_updated ON conversations(user_id, updated_at DESC);

-- Messages table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL,
    content TEXT NOT NULL,
    tool_calls JSONB,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_message_conversation ON messages(conversation_id, created_at);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER conversations_updated_at
    BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## Data Constraints

| Entity | Constraint | Enforcement |
|--------|------------|-------------|
| Task.title | 1-200 characters | Pydantic validation + DB |
| Task.description | Max 1000 characters | Pydantic validation + DB |
| Message.content (user) | Max 2000 characters | API validation |
| Conversation history | Max 50 messages | Application logic (sliding window) |
| User isolation | user_id match | All queries filter by user_id |

## Query Patterns

### Get User's Tasks (filtered)
```sql
SELECT * FROM tasks
WHERE user_id = :user_id
  AND (:filter IS NULL OR completed = :completed)
ORDER BY created_at DESC;
```

### Get Conversation History (limited)
```sql
SELECT * FROM messages
WHERE conversation_id = :conversation_id
ORDER BY created_at DESC
LIMIT 50;
```

### Fuzzy Task Title Search
```sql
SELECT * FROM tasks
WHERE user_id = :user_id
  AND LOWER(title) LIKE LOWER(:query || '%')
ORDER BY created_at DESC;
```
