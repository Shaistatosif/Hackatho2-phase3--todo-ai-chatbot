# Todo AI Chatbot - Backend

AI-powered chatbot backend for natural language todo management using FastAPI, OpenAI Agents SDK, and MCP tools.

## Features

- Natural language task management via AI chatbot
- MCP (Model Context Protocol) tools for task operations
- Conversation history and context management
- Rate limiting and comprehensive error handling
- Request/response logging with unique request IDs
- PostgreSQL database with SQLModel ORM

## Prerequisites

- Python 3.11 or higher
- PostgreSQL database (Neon PostgreSQL recommended)
- OpenAI API key

## Installation

1. **Clone the repository and navigate to backend:**
   ```bash
   cd backend
   ```

2. **Create and activate a virtual environment:**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

## Configuration

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables in `.env`:**
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://user:password@host:5432/dbname?sslmode=require

   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here

   # API Configuration
   CORS_ORIGINS=http://localhost:3000,http://localhost:3001
   LOG_LEVEL=INFO

   # Optional: Rate Limiting
   RATE_LIMIT_ENABLED=true
   ```

3. **Database Setup:**

   The application uses Neon PostgreSQL (or any PostgreSQL database). Run the migration script:
   ```bash
   # Using psql:
   psql $DATABASE_URL -f src/migrations/001_initial.sql

   # Or using Python:
   python -c "from src.db import init_db; init_db()"
   ```

## Running the Application

### Development Mode

```bash
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000

### Production Mode

```bash
uvicorn src.api.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## API Endpoints

### Chat Endpoints
- `POST /api/{user_id}/chat` - Send message to chatbot (rate limit: 60/minute)
  - Request: `{"message": "add buy groceries", "conversation_id": null}`
  - Response: `{"conversation_id": 1, "response": "...", "tool_calls": [...]}`

### Task Endpoints
- `GET /api/{user_id}/tasks?filter=all|pending|completed` - List user's tasks

### Conversation Endpoints
- `GET /api/{user_id}/conversations` - List all conversations
- `GET /api/{user_id}/conversations/{conversation_id}` - Get specific conversation with messages

### Utility Endpoints
- `GET /health` - Health check
- `GET /` - API information

## MCP Tools

The backend implements the following MCP tools for task management:

1. **add_task** - Create a new task
2. **list_tasks** - List tasks with optional filtering
3. **complete_task** - Mark task as complete (supports ID or fuzzy title search)
4. **update_task** - Update task title/description
5. **delete_task** - Delete a task (supports ID or fuzzy title search)

## Project Structure

```
backend/
├── src/
│   ├── api/
│   │   ├── routes/          # API route handlers
│   │   │   ├── chat.py      # Chat endpoints
│   │   │   ├── tasks.py     # Task endpoints
│   │   │   └── conversations.py
│   │   ├── main.py          # FastAPI app setup
│   │   ├── schemas.py       # Pydantic models
│   │   ├── errors.py        # Error handlers
│   │   └── middleware.py    # Custom middleware
│   ├── models/              # SQLModel database models
│   │   ├── task.py
│   │   ├── conversation.py
│   │   └── message.py
│   ├── services/            # Business logic layer
│   │   ├── task_service.py
│   │   ├── conversation_service.py
│   │   └── message_service.py
│   ├── agent/               # OpenAI Agent configuration
│   │   ├── config.py        # System prompts
│   │   └── runner.py        # Agent execution
│   ├── mcp/                 # MCP tools
│   │   ├── server.py        # Tool registration
│   │   ├── schemas.py       # Tool schemas
│   │   └── tools/           # Individual MCP tools
│   ├── migrations/          # Database migrations
│   └── db.py                # Database connection
├── requirements.txt
├── pyproject.toml
└── README.md
```

## Development

### Linting

```bash
ruff check src/
```

### Code Formatting

```bash
ruff format src/
```

### Running Tests

```bash
pytest
```

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors (422)**: Invalid request data
- **HTTP Exceptions (4xx/5xx)**: HTTP-specific errors
- **Global Exception Handler (500)**: Unhandled errors with request tracking
- All errors include request IDs for debugging

## Logging

The application includes:
- Structured logging with request IDs
- Request/response logging middleware
- Error logging with stack traces
- Configurable log levels via `LOG_LEVEL` environment variable

## Rate Limiting

- Chat endpoint: 60 requests per minute per IP
- Configured using SlowAPI
- Returns 429 status code when exceeded

## Security

- CORS protection with configurable origins
- SSL/TLS required for database connections (Neon PostgreSQL)
- Input validation on all endpoints
- User isolation in all database queries

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| DATABASE_URL | PostgreSQL connection string | - | Yes |
| OPENAI_API_KEY | OpenAI API key for agent | - | Yes |
| CORS_ORIGINS | Comma-separated allowed origins | http://localhost:3000 | No |
| LOG_LEVEL | Logging level (DEBUG, INFO, WARNING, ERROR) | INFO | No |

## Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL includes `?sslmode=require` for Neon
- Verify database credentials and network access

### OpenAI API Errors
- Check OPENAI_API_KEY is valid
- Verify API quota and billing

### Rate Limit Errors
- Default is 60 requests/minute
- Contact administrator to adjust limits if needed
