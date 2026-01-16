<!--
================================================================================
SYNC IMPACT REPORT
================================================================================
Version Change: 0.0.0 → 1.0.0 (MAJOR - initial ratification)
Modified Principles: N/A (initial creation)
Added Sections:
  - Core Principles (6 principles)
  - Technology Stack
  - Development Workflow
  - Governance
Removed Sections: N/A (initial creation)
Templates Requiring Updates:
  - .specify/templates/plan-template.md - ✅ compatible (Constitution Check section)
  - .specify/templates/spec-template.md - ✅ compatible (Requirements structure)
  - .specify/templates/tasks-template.md - ✅ compatible (Phase structure)
Follow-up TODOs: None
================================================================================
-->

# Todo AI Chatbot Constitution

## Core Principles

### I. Stateless Server Architecture

All backend services MUST operate statelessly. Server instances MUST NOT retain
in-memory session data between requests. Benefits include:

- **Horizontal scalability**: Any server can handle any request
- **Resilience**: Server restarts do not lose data
- **Load balancing**: Requests distribute freely across instances
- **Simplicity**: No session management or sticky sessions required

The agent MUST be recreated on each request with history fetched from the
database. No server-side caching of conversation state is permitted in v1.0.

### II. MCP-Based Tool Composition

All task operations MUST be exposed through the Model Context Protocol (MCP).
The MCP server provides five canonical tools:

- `add_task` - Create new tasks
- `list_tasks` - Retrieve tasks with optional status filter
- `complete_task` - Mark tasks as done (idempotent)
- `delete_task` - Permanently remove tasks (hard delete)
- `update_task` - Modify task title/description (partial update)

Each tool MUST:
- Accept `user_id` as a required parameter for authorization
- Return structured JSON responses with status confirmation
- Validate all inputs before database operations
- Return descriptive error codes on failure (INVALID_INPUT, TASK_NOT_FOUND, etc.)

### III. Natural Language Interface

The AI agent MUST interpret user intent through natural language and map it to
appropriate MCP tools. The agent:

- MUST confirm all actions with friendly, conversational responses
- MUST ask clarifying questions when user intent is ambiguous
- MUST handle errors gracefully and suggest alternatives
- SHOULD avoid technical jargon in user-facing responses
- SHOULD be concise but helpful

Task identification supports both explicit IDs and title-based fuzzy matching.
When multiple tasks match a query, the agent MUST ask for clarification.

### IV. Database-Persisted State

All application state MUST be persisted to Neon PostgreSQL. This includes:

- **Tasks**: User todo items with title, description, completion status
- **Conversations**: Chat session metadata
- **Messages**: Full message history with role, content, and tool_calls

Required indexes for performance:
- `idx_user_status` on (user_id, completed)
- `idx_user_created` on (user_id, created_at)
- `idx_conversation_messages` on (conversation_id, created_at)

Conversation history is limited to the last 50 messages using a sliding window
strategy. The system prompt MUST always be preserved.

### V. User Isolation & Security

Users MUST only access their own data. Authorization is enforced at multiple
levels:

- **API Layer**: Better Auth JWT authentication on all endpoints
- **MCP Tools**: Every tool verifies user_id ownership before operations
- **Database**: Queries always filter by user_id

Input validation requirements:
- Task titles: 1-200 characters, non-empty
- Task descriptions: max 1000 characters
- Messages: max 2000 characters
- User IDs: 1-100 characters

Rate limiting (production): 60 requests/minute per user on chat endpoint.
CORS (production): Whitelist frontend domain only.

### VI. Test-First Development

Testing is structured in three tiers:

1. **Unit Tests**: Each MCP tool independently, database models (CRUD), agent
   intent detection, error handling
2. **Integration Tests**: Complete chat flow (user → agent → tools → response),
   conversation persistence, multi-tool turns, error propagation
3. **End-to-End Tests**: Full user scenarios (create/list/complete/update/delete)

Tests SHOULD be written before implementation (Red-Green-Refactor). Each user
story MUST be independently testable. Critical paths require integration test
coverage before deployment.

## Technology Stack

| Layer        | Technology                  | Version/Notes                    |
|--------------|-----------------------------|---------------------------------|
| Frontend     | OpenAI ChatKit + Next.js    | Deploy to Vercel                |
| Backend      | Python FastAPI              | uvicorn server                  |
| AI Framework | OpenAI Agents SDK           | gpt-4 model                     |
| MCP Server   | Official MCP SDK            | Stateless, database-backed      |
| ORM          | SQLModel                    | Pydantic + SQLAlchemy           |
| Database     | Neon PostgreSQL             | Serverless, SSL required        |
| Auth         | Better Auth                 | JWT, 7-day expiration           |

Environment variables (never hardcode):
- `DATABASE_URL` - Neon connection string with sslmode=require
- `OPENAI_API_KEY` - OpenAI API credentials
- `AUTH_SECRET` - Better Auth secret key
- `NEXT_PUBLIC_API_URL` - Backend API URL for frontend
- `NEXT_PUBLIC_OPENAI_DOMAIN_KEY` - ChatKit domain key

## Development Workflow

### API Contract

Single endpoint for chat interaction:

```
POST /api/{user_id}/chat
Content-Type: application/json

Request:
{
  "conversation_id": integer (optional),
  "message": string (required, 1-2000 chars)
}

Response:
{
  "conversation_id": integer,
  "response": string,
  "tool_calls": [{ tool, parameters, result }]
}
```

### Request Lifecycle

1. Validate request body → 400 on failure
2. Authenticate user → 401 on failure
3. Get or create conversation
4. Fetch conversation history (last 50 messages)
5. Build message array [system, ...history, user]
6. Store user message
7. Run OpenAI Agent with MCP tools (30s timeout)
8. Extract tool calls and results
9. Store assistant response with tool_calls as JSONB
10. Update conversation timestamp
11. Return JSON response

### Code Quality Gates

- All PRs must pass linting and formatting checks
- Integration tests must pass for affected features
- No hardcoded secrets or tokens
- Smallest viable diff - no unrelated refactoring
- Error paths explicitly handled

## Governance

This constitution supersedes all other development practices for the Todo AI
Chatbot project. All changes must comply with these principles.

**Amendment Process**:
1. Propose change with rationale
2. Document in ADR if architecturally significant
3. Update constitution with version bump
4. Propagate changes to dependent templates
5. Migrate existing code if breaking

**Version Policy** (Semantic Versioning):
- MAJOR: Principle removal or incompatible redefinition
- MINOR: New principle or material expansion
- PATCH: Clarifications, typos, non-semantic refinements

**Compliance Review**:
- All code reviews verify principle adherence
- Complexity beyond stated principles requires justification
- Use CLAUDE.md for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2026-01-12 | **Last Amended**: 2026-01-12
