# Implementation Plan: Todo AI Chatbot

**Branch**: `001-todo-ai-chatbot` | **Date**: 2026-01-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-todo-ai-chatbot/spec.md`

## Summary

Build an AI-powered chatbot for natural language todo management using MCP server architecture. Users interact via conversational interface to create, view, update, complete, and delete tasks. The system uses OpenAI Agents SDK with MCP tools backed by Neon PostgreSQL, with a Next.js frontend using ChatKit.

## Technical Context

**Language/Version**: Python 3.11+ (backend), TypeScript/Node 20+ (frontend)
**Primary Dependencies**: FastAPI, OpenAI Agents SDK, MCP SDK, SQLModel (backend); Next.js, OpenAI ChatKit, Better Auth (frontend)
**Storage**: Neon PostgreSQL (serverless, SSL required)
**Testing**: pytest (backend), vitest (frontend)
**Target Platform**: Web application (Vercel deployment)
**Project Type**: Web (frontend + backend)
**Performance Goals**: 100 concurrent users, <5s task creation, <3s task list retrieval
**Constraints**: <30s agent timeout, 60 req/min rate limit, 50 message conversation history limit
**Scale/Scope**: Single-user MVP, expandable to 10k users

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Stateless Server Architecture | PASS | FastAPI backend recreates agent per request, no in-memory session state |
| II. MCP-Based Tool Composition | PASS | 5 canonical tools (add_task, list_tasks, complete_task, delete_task, update_task) with user_id validation |
| III. Natural Language Interface | PASS | OpenAI Agent interprets user intent, confirms actions, asks clarifying questions |
| IV. Database-Persisted State | PASS | All state in Neon PostgreSQL: Tasks, Conversations, Messages with required indexes |
| V. User Isolation & Security | PASS | Better Auth JWT, user_id filtering at API/MCP/DB layers, input validation per spec |
| VI. Test-First Development | PASS | Three-tier testing: unit (MCP tools), integration (chat flow), e2e (user scenarios) |

**Gate Result**: PASS - All principles satisfied. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/001-todo-ai-chatbot/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (OpenAPI spec)
│   └── openapi.yaml
└── tasks.md             # Phase 2 output (/sp.tasks command)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/          # SQLModel entities (Task, Conversation, Message)
│   ├── mcp/             # MCP server and tool implementations
│   ├── api/             # FastAPI routes and middleware
│   └── agent/           # OpenAI Agent configuration
├── tests/
│   ├── unit/            # MCP tool tests, model tests
│   ├── integration/     # Chat flow tests
│   └── e2e/             # Full scenario tests
├── pyproject.toml
└── .env.example

frontend/
├── src/
│   ├── components/      # React components (Chat, TaskList)
│   ├── app/             # Next.js app router pages
│   ├── lib/             # API client, auth utilities
│   └── hooks/           # Custom React hooks
├── tests/
├── package.json
└── .env.example
```

**Structure Decision**: Web application with separate backend (Python FastAPI) and frontend (Next.js) per constitution technology stack. Backend hosts MCP server and OpenAI Agent; frontend provides ChatKit-based UI.

## Complexity Tracking

No constitution violations requiring justification.
