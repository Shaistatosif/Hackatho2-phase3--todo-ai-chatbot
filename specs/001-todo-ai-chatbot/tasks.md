# Tasks: Todo AI Chatbot

**Input**: Design documents from `/specs/001-todo-ai-chatbot/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- **Backend**: `backend/src/` (Python/FastAPI)
- **Frontend**: `frontend/src/` (Next.js/TypeScript)

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create backend project structure with directories: src/models/, src/mcp/, src/api/, src/agent/
- [x] T002 Create frontend project structure with directories: src/app/, src/components/, src/lib/, src/hooks/
- [x] T003 [P] Initialize Python project with pyproject.toml (FastAPI, SQLModel, openai, mcp dependencies)
- [x] T004 [P] Initialize Next.js project with package.json (ChatKit, better-auth dependencies)
- [x] T005 [P] Create backend/.env.example with all required environment variables
- [x] T006 [P] Create frontend/.env.example with all required environment variables
- [x] T007 [P] Configure backend linting with ruff.toml
- [x] T008 [P] Configure frontend linting with eslint.config.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

### Database & Models

- [x] T009 Create database connection module in backend/src/db.py (Neon PostgreSQL with NullPool)
- [x] T010 [P] Create Task model in backend/src/models/task.py per data-model.md
- [x] T011 [P] Create Conversation model in backend/src/models/conversation.py per data-model.md
- [x] T012 [P] Create Message model in backend/src/models/message.py per data-model.md
- [x] T013 Create models __init__.py exporting all models in backend/src/models/__init__.py
- [x] T014 Create database migration script in backend/src/migrations/001_initial.sql per data-model.md

### API Infrastructure

- [x] T015 Create FastAPI app with CORS and rate limiting in backend/src/api/main.py
- [x] T016 [P] Create request/response schemas in backend/src/api/schemas.py per openapi.yaml
- [x] T017 [P] Create error handlers and custom exceptions in backend/src/api/errors.py
- [x] T018 Create health check endpoint in backend/src/api/main.py

### MCP Tools Foundation

- [x] T019 Create MCP server base in backend/src/mcp/server.py
- [x] T020 Create tool response schemas in backend/src/mcp/schemas.py

### OpenAI Agent Foundation

- [x] T021 Create agent configuration with system prompt in backend/src/agent/config.py
- [x] T022 Create agent runner with tool dispatch in backend/src/agent/runner.py

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Create Tasks via Natural Language (Priority: P1) MVP

**Goal**: Users can add tasks by typing natural phrases like "add buy groceries"

**Independent Test**: Send "Add buy groceries to my list" → Task appears in database with title "Buy groceries"

### Implementation for User Story 1

- [x] T023 [US1] Implement add_task MCP tool in backend/src/mcp/tools/add_task.py
- [x] T024 [US1] Register add_task tool with MCP server in backend/src/mcp/server.py
- [x] T025 [US1] Create task creation service in backend/src/services/task_service.py
- [x] T026 [US1] Implement POST /api/{user_id}/chat endpoint in backend/src/api/routes/chat.py
- [x] T027 [US1] Add conversation creation/retrieval logic in backend/src/services/conversation_service.py
- [x] T028 [US1] Add message storage logic in backend/src/services/message_service.py
- [x] T029 [US1] Configure agent system prompt for task creation intent in backend/src/agent/config.py
- [x] T030 [US1] Add input validation for task title (1-200 chars) in backend/src/mcp/tools/add_task.py
- [x] T031 [US1] Add clarification prompt when intent unclear in backend/src/agent/config.py

**Checkpoint**: User Story 1 complete - can create tasks via chat

---

## Phase 4: User Story 2 - View and Filter Tasks (Priority: P2)

**Goal**: Users can see tasks by asking "show me my tasks" or "what's pending?"

**Independent Test**: Create 3 tasks → Ask "show pending" → See only incomplete tasks

### Implementation for User Story 2

- [x] T032 [US2] Implement list_tasks MCP tool in backend/src/mcp/tools/list_tasks.py
- [x] T033 [US2] Register list_tasks tool with MCP server in backend/src/mcp/server.py
- [x] T034 [US2] Add list tasks with filter to task_service in backend/src/services/task_service.py
- [x] T035 [US2] Format task list response for natural language in backend/src/mcp/tools/list_tasks.py
- [x] T036 [US2] Handle empty task list message in backend/src/mcp/tools/list_tasks.py
- [x] T037 [P] [US2] Implement GET /api/{user_id}/tasks endpoint in backend/src/api/routes/tasks.py

**Checkpoint**: User Story 2 complete - can view and filter tasks

---

## Phase 5: User Story 3 - Mark Tasks as Complete (Priority: P3)

**Goal**: Users can mark tasks done by saying "mark task 1 as done" or "I finished buying groceries"

**Independent Test**: Create task → Say "mark task 1 done" → Task shows as completed

### Implementation for User Story 3

- [x] T038 [US3] Implement complete_task MCP tool in backend/src/mcp/tools/complete_task.py
- [x] T039 [US3] Register complete_task tool with MCP server in backend/src/mcp/server.py
- [x] T040 [US3] Add complete task by ID to task_service in backend/src/services/task_service.py
- [x] T041 [US3] Add fuzzy title search for task matching in backend/src/services/task_service.py
- [x] T042 [US3] Handle task not found error in backend/src/mcp/tools/complete_task.py
- [ ] T043 [US3] Handle multiple matching tasks (ask clarification) in backend/src/mcp/tools/complete_task.py

**Checkpoint**: User Story 3 complete - can mark tasks as done

---

## Phase 6: User Story 4 - Update Task Details (Priority: P4)

**Goal**: Users can modify tasks by saying "change task 1 to Buy groceries and fruits"

**Independent Test**: Create task → Say "change task 1 to New Title" → Task title updated

### Implementation for User Story 4

- [x] T044 [US4] Implement update_task MCP tool in backend/src/mcp/tools/update_task.py
- [x] T045 [US4] Register update_task tool with MCP server in backend/src/mcp/server.py
- [x] T046 [US4] Add update task by ID to task_service in backend/src/services/task_service.py
- [x] T047 [US4] Handle partial updates (title only, description only) in backend/src/mcp/tools/update_task.py
- [x] T048 [US4] Ask for clarification when no changes specified in backend/src/mcp/tools/update_task.py

**Checkpoint**: User Story 4 complete - can update tasks

---

## Phase 7: User Story 5 - Delete Tasks (Priority: P5)

**Goal**: Users can remove tasks by saying "delete task 2" or "remove the meeting task"

**Independent Test**: Create task → Say "delete task 1" → Task no longer in list

### Implementation for User Story 5

- [x] T049 [US5] Implement delete_task MCP tool in backend/src/mcp/tools/delete_task.py
- [x] T050 [US5] Register delete_task tool with MCP server in backend/src/mcp/server.py
- [x] T051 [US5] Add delete task by ID to task_service in backend/src/services/task_service.py
- [x] T052 [US5] Handle task not found for deletion in backend/src/mcp/tools/delete_task.py
- [ ] T053 [US5] Add fuzzy title search for delete matching in backend/src/mcp/tools/delete_task.py

**Checkpoint**: User Story 5 complete - can delete tasks

---

## Phase 8: User Story 6 - Conversation Continuity (Priority: P6)

**Goal**: Chatbot remembers conversation context for natural follow-ups

**Independent Test**: Say "Add milk" → Say "Also add bread" → Both tasks created

### Implementation for User Story 6

- [x] T054 [US6] Implement conversation history retrieval (last 50 messages) in backend/src/services/conversation_service.py
- [x] T055 [US6] Build message array with system prompt + history in backend/src/agent/runner.py
- [x] T056 [US6] Store tool_calls as JSONB in message storage in backend/src/services/message_service.py
- [x] T057 [P] [US6] Implement GET /api/{user_id}/conversations endpoint in backend/src/api/routes/conversations.py
- [x] T058 [P] [US6] Implement GET /api/{user_id}/conversations/{id} endpoint in backend/src/api/routes/conversations.py
- [x] T059 [US6] Update conversation.updated_at on new messages in backend/src/services/conversation_service.py

**Checkpoint**: User Story 6 complete - conversation context maintained

---

## Phase 9: Frontend Implementation

**Purpose**: Build the chat UI with Next.js and ChatKit

- [x] T060 [P] Create API client for backend communication in frontend/src/lib/api.ts
- [x] T061 [P] Setup Better Auth client in frontend/src/lib/auth.ts
- [x] T062 Create chat page layout in frontend/src/app/chat/page.tsx
- [x] T063 Implement ChatWindow component with ChatKit in frontend/src/components/ChatWindow.tsx
- [x] T064 [P] Implement MessageList component in frontend/src/components/MessageList.tsx
- [x] T065 [P] Implement MessageInput component in frontend/src/components/MessageInput.tsx
- [x] T066 Create useChat hook for API communication in frontend/src/hooks/useChat.ts
- [x] T067 Add loading states and error handling in frontend/src/components/ChatWindow.tsx
- [x] T068 Create login/auth pages in frontend/src/app/page.tsx
- [x] T069 Add auth middleware for protected routes in frontend/src/middleware.ts

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T070 [P] Add comprehensive error logging in backend/src/api/main.py
- [ ] T071 [P] Add request/response logging middleware in backend/src/api/middleware.py
- [ ] T072 Implement rate limiting (60 req/min) in backend/src/api/main.py
- [ ] T073 Add CORS configuration for production in backend/src/api/main.py
- [ ] T074 [P] Create README with setup instructions in backend/README.md
- [ ] T075 [P] Create README with setup instructions in frontend/README.md
- [ ] T076 Run and validate quickstart.md steps
- [ ] T077 Security review: verify user isolation in all MCP tools
- [ ] T078 Performance validation: test with 100 concurrent users

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies - start immediately
- **Phase 2 (Foundational)**: Depends on Setup - BLOCKS all user stories
- **Phases 3-8 (User Stories)**: All depend on Phase 2 completion
  - Can proceed sequentially P1 → P2 → P3 → P4 → P5 → P6
  - Or in parallel if multiple developers
- **Phase 9 (Frontend)**: Can start after Phase 2, parallel with backend stories
- **Phase 10 (Polish)**: After all user stories complete

### User Story Dependencies

| Story | Depends On | Can Start After |
|-------|------------|-----------------|
| US1 (Create) | Phase 2 | T022 complete |
| US2 (View) | Phase 2 | T022 complete |
| US3 (Complete) | Phase 2 | T022 complete |
| US4 (Update) | Phase 2 | T022 complete |
| US5 (Delete) | Phase 2 | T022 complete |
| US6 (Context) | US1 | T031 complete |

### Within Each User Story

1. MCP tool implementation first
2. Register tool with server
3. Add service layer logic
4. Add API endpoint (if needed)
5. Handle edge cases and errors

### Parallel Opportunities

```bash
# Phase 1 - All parallel:
T003, T004, T005, T006, T007, T008

# Phase 2 - Models parallel:
T010, T011, T012

# Phase 2 - Schemas parallel:
T016, T017

# User Stories - After Phase 2, all can start in parallel:
US1 (T023-T031), US2 (T032-T037), US3 (T038-T043)...

# Frontend - Parallel with backend:
T060, T061, T064, T065
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T008)
2. Complete Phase 2: Foundational (T009-T022)
3. Complete Phase 3: User Story 1 - Create Tasks (T023-T031)
4. **STOP and VALIDATE**: Test task creation via chat
5. Deploy/demo if ready

### Incremental Delivery

| Milestone | Stories Included | Demo Capability |
|-----------|------------------|-----------------|
| MVP | US1 | Create tasks via chat |
| v0.2 | US1 + US2 | Create and view tasks |
| v0.3 | US1 + US2 + US3 | Full create/view/complete loop |
| v0.4 | All backend stories | Full CRUD via chat |
| v1.0 | Backend + Frontend | Complete application |

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1. Setup | T001-T008 (8) | Project structure |
| 2. Foundational | T009-T022 (14) | DB, API, MCP, Agent base |
| 3. US1 Create | T023-T031 (9) | Add tasks via chat |
| 4. US2 View | T032-T037 (6) | View/filter tasks |
| 5. US3 Complete | T038-T043 (6) | Mark tasks done |
| 6. US4 Update | T044-T048 (5) | Modify tasks |
| 7. US5 Delete | T049-T053 (5) | Remove tasks |
| 8. US6 Context | T054-T059 (6) | Conversation history |
| 9. Frontend | T060-T069 (10) | Next.js chat UI |
| 10. Polish | T070-T078 (9) | Logging, security, docs |

**Total Tasks**: 78
**MVP Tasks** (through US1): 31
