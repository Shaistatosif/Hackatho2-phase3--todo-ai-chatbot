# Research: Todo AI Chatbot

**Feature**: 001-todo-ai-chatbot
**Date**: 2026-01-13
**Status**: Complete

## Overview

This document consolidates research findings for the Todo AI Chatbot feature. All technology choices are aligned with the project constitution (v1.0.0).

---

## 1. OpenAI Agents SDK Integration

### Decision
Use OpenAI Agents SDK with function calling for MCP tool invocation.

### Rationale
- Native support for tool/function definitions
- Built-in conversation context management
- Streaming support for responsive UX
- Well-documented Python SDK

### Alternatives Considered
| Alternative | Rejected Because |
|-------------|------------------|
| LangChain | Over-engineered for single-agent use case; adds unnecessary abstraction layer |
| Direct OpenAI API | Missing agent orchestration features; would require custom tool dispatch |
| Anthropic Claude | Project constitution specifies OpenAI; switching would require amendment |

### Implementation Pattern
```python
from openai import OpenAI
from openai.types.beta import FunctionTool

client = OpenAI()

# Define MCP tools as functions
tools = [
    FunctionTool(
        type="function",
        function={
            "name": "add_task",
            "description": "Add a new task to the user's todo list",
            "parameters": {...}
        }
    ),
    # ... other tools
]

# Run agent with tools
response = client.chat.completions.create(
    model="gpt-4",
    messages=messages,
    tools=tools,
    tool_choice="auto"
)
```

---

## 2. MCP Server Architecture

### Decision
Implement MCP server as a stateless FastAPI module with 5 canonical tools.

### Rationale
- Constitution mandates MCP-based tool composition (Principle II)
- Stateless design per Principle I enables horizontal scaling
- FastAPI provides async support for database operations

### Tool Specifications

| Tool | Parameters | Returns |
|------|------------|---------|
| `add_task` | user_id, title, description? | task_id, confirmation |
| `list_tasks` | user_id, filter? (all/pending/completed) | task[] |
| `complete_task` | user_id, task_id | confirmation |
| `update_task` | user_id, task_id, title?, description? | confirmation |
| `delete_task` | user_id, task_id | confirmation |

### Error Codes
- `INVALID_INPUT` - Validation failure (400)
- `TASK_NOT_FOUND` - Task doesn't exist or wrong owner (404)
- `UNAUTHORIZED` - User doesn't own resource (403)
- `INTERNAL_ERROR` - Database or system failure (500)

---

## 3. Database Schema Design

### Decision
Use SQLModel with Neon PostgreSQL, three core tables with required indexes.

### Rationale
- Constitution specifies Neon PostgreSQL (Principle IV)
- SQLModel provides Pydantic validation + SQLAlchemy ORM
- Required indexes per constitution for performance

### Schema Summary

**Tasks Table**
- id (PK), user_id (indexed), title, description, completed, created_at, updated_at
- Index: idx_user_status (user_id, completed)
- Index: idx_user_created (user_id, created_at)

**Conversations Table**
- id (PK), user_id (indexed), created_at, updated_at

**Messages Table**
- id (PK), conversation_id (FK), role, content, tool_calls (JSONB), created_at
- Index: idx_conversation_messages (conversation_id, created_at)

### Connection Pattern
```python
from sqlmodel import create_engine, Session
from sqlalchemy.pool import NullPool

# Serverless-friendly: no connection pooling
engine = create_engine(
    DATABASE_URL,
    poolclass=NullPool,
    connect_args={"sslmode": "require"}
)
```

---

## 4. Authentication Strategy

### Decision
Use Better Auth with JWT tokens, 7-day expiration.

### Rationale
- Constitution specifies Better Auth (Technology Stack)
- JWT allows stateless verification per Principle I
- 7-day expiration balances security with user convenience

### Flow
1. Frontend: User logs in via Better Auth
2. Frontend: Receives JWT, stores in httpOnly cookie
3. Frontend: Sends JWT in Authorization header
4. Backend: Validates JWT signature and expiration
5. Backend: Extracts user_id for all operations

### Integration Points
- Frontend: `@better-auth/nextjs` client
- Backend: JWT validation middleware (decode + verify)

---

## 5. Frontend Architecture

### Decision
Next.js 14+ with App Router, OpenAI ChatKit for chat UI.

### Rationale
- Constitution specifies Next.js + ChatKit (Technology Stack)
- App Router provides server components for auth
- ChatKit handles message rendering and streaming

### Component Structure
```
src/
├── app/
│   ├── page.tsx           # Landing/auth
│   ├── chat/
│   │   └── page.tsx       # Main chat interface
│   └── api/
│       └── auth/[...]/    # Better Auth routes
├── components/
│   ├── ChatWindow.tsx     # ChatKit integration
│   ├── MessageList.tsx    # Message display
│   └── TaskSummary.tsx    # Optional task sidebar
└── lib/
    ├── api.ts             # Backend API client
    └── auth.ts            # Better Auth client
```

---

## 6. Testing Strategy

### Decision
Three-tier testing per constitution Principle VI.

### Rationale
- Constitution mandates unit, integration, and e2e tests
- Test-first development for all user stories
- Critical paths require integration coverage

### Test Distribution

| Tier | Scope | Tool | Example |
|------|-------|------|---------|
| Unit | MCP tools, models | pytest | `test_add_task_validates_title_length` |
| Integration | Chat flow | pytest + httpx | `test_create_task_via_chat` |
| E2E | User scenarios | pytest | `test_full_crud_workflow` |

### Coverage Targets
- Unit: 80%+ of MCP tools and models
- Integration: All user stories (P1-P6)
- E2E: Happy paths for all CRUD operations

---

## 7. Deployment Architecture

### Decision
Vercel for frontend, separate deployment for FastAPI backend.

### Rationale
- Constitution specifies Vercel for Next.js
- FastAPI requires Python runtime (not Vercel Functions)
- Options: Railway, Render, or Fly.io for backend

### Environment Variables
| Variable | Location | Purpose |
|----------|----------|---------|
| `DATABASE_URL` | Backend | Neon connection string |
| `OPENAI_API_KEY` | Backend | OpenAI API access |
| `AUTH_SECRET` | Both | Better Auth signing |
| `NEXT_PUBLIC_API_URL` | Frontend | Backend endpoint |
| `NEXT_PUBLIC_OPENAI_DOMAIN_KEY` | Frontend | ChatKit domain |

---

## 8. Rate Limiting & Security

### Decision
60 req/min per user on chat endpoint, CORS whitelist, input validation.

### Rationale
- Constitution specifies rate limiting (Principle V)
- Prevents abuse and controls OpenAI API costs
- Input validation prevents injection attacks

### Implementation
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@app.post("/api/{user_id}/chat")
@limiter.limit("60/minute")
async def chat(user_id: str, request: ChatRequest):
    ...
```

---

## Resolved Clarifications

All technical decisions are defined in the constitution. No NEEDS CLARIFICATION items remain.

| Item | Resolution |
|------|------------|
| Authentication method | Better Auth with JWT (constitution) |
| Database choice | Neon PostgreSQL (constitution) |
| AI framework | OpenAI Agents SDK (constitution) |
| Frontend framework | Next.js + ChatKit (constitution) |
| Deployment target | Vercel + Python host (constitution) |
