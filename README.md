# 🤖 Todo AI Chatbot

> **Natural language todo management powered by OpenAI and MCP tools**

An intelligent chatbot application that lets you manage your todo list through natural conversation. Built with FastAPI, Next.js, and the Model Context Protocol (MCP).

[![Production Ready](https://img.shields.io/badge/status-production%20ready-green)](https://github.com/your-repo)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 20+](https://img.shields.io/badge/node-20+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

---

## ✨ Features

### Natural Language Interface
- **Conversational Task Management**: Add, view, update, complete, and delete tasks using natural language
- **Context Awareness**: Chatbot remembers conversation history for seamless follow-ups
- **Fuzzy Search**: Find tasks by partial title matches
- **Smart Clarification**: Asks for clarification when multiple tasks match

### Technical Highlights
- **MCP Tools**: Modular, reusable tools for task operations
- **OpenAI Integration**: Powered by GPT-4 for intelligent conversation understanding
- **Real-time Updates**: Instant task updates with optimistic UI
- **Type-Safe**: Full TypeScript frontend, Python type hints in backend
- **Production-Ready**: Comprehensive error handling, logging, rate limiting, and security

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- PostgreSQL (Neon recommended)
- OpenAI API key

### 30-Second Setup with Docker

```bash
# Clone repository
git clone <repository-url>
cd Hackathon2-phase3

# Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local

# Edit .env files with your credentials

# Start with Docker
docker-compose up -d

# Visit http://localhost:3000
```

### Manual Setup

See detailed instructions in [`specs/001-todo-ai-chatbot/quickstart.md`](specs/001-todo-ai-chatbot/quickstart.md)

---

## 📁 Project Structure

```
Hackathon2-phase3/
├── backend/                    # FastAPI backend
│   ├── src/
│   │   ├── api/               # REST API endpoints
│   │   ├── models/            # SQLModel database models
│   │   ├── services/          # Business logic layer
│   │   ├── agent/             # OpenAI agent configuration
│   │   ├── mcp/               # MCP tools and server
│   │   ├── migrations/        # Database migrations
│   │   └── db.py              # Database connection
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md              # Backend documentation
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom React hooks
│   │   └── lib/               # Utilities and API client
│   ├── Dockerfile
│   ├── package.json
│   └── README.md              # Frontend documentation
│
├── specs/                      # Specifications and planning
│   └── 001-todo-ai-chatbot/
│       ├── spec.md            # Feature specification
│       ├── plan.md            # Architecture plan
│       ├── tasks.md           # Implementation tasks
│       ├── data-model.md      # Database schema
│       └── quickstart.md      # Quickstart guide
│
├── docker-compose.yml          # Docker orchestration
├── .dockerignore
└── README.md                   # This file
```

---

## 🎯 Core Capabilities

### Chat Commands
```
✓ "Add buy groceries to my list"
✓ "Show me all my tasks"
✓ "What tasks are pending?"
✓ "Mark task 1 as complete"
✓ "I finished buying groceries"
✓ "Update task 2 to 'Buy milk and bread'"
✓ "Delete the meeting task"
✓ "Remove task 3"
```

### MCP Tools

| Tool | Description |
|------|-------------|
| `add_task` | Create a new task with title and optional description |
| `list_tasks` | List tasks with filtering (all/pending/completed) |
| `complete_task` | Mark task as complete by ID or fuzzy title search |
| `update_task` | Update task title and/or description |
| `delete_task` | Delete task by ID or fuzzy title search |

---

## 🏗️ Architecture

### Backend (FastAPI + Python)
- **API Layer**: RESTful endpoints with automatic OpenAPI docs
- **Service Layer**: Business logic with database operations
- **Agent Layer**: OpenAI integration with tool dispatch
- **MCP Layer**: Reusable tools following Model Context Protocol
- **Database**: PostgreSQL with SQLModel ORM (supports Neon serverless)

### Frontend (Next.js + TypeScript)
- **App Router**: Modern Next.js routing with Server/Client Components
- **Component Library**: Reusable React components with TypeScript
- **State Management**: Custom hooks for chat and authentication
- **Styling**: Tailwind CSS for responsive design
- **Authentication**: Better Auth for secure session management

### Data Flow
```
User → Frontend → REST API → Agent Runner → MCP Tools → Database
                                    ↓
                              OpenAI GPT-4
```

---

## 🔧 Development

### Backend Development

```bash
cd backend

# Setup
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run
uvicorn src.api.main:app --reload

# Lint
ruff check src/

# Format
ruff format src/
```

### Frontend Development

```bash
cd frontend

# Setup
npm install

# Run
npm run dev

# Lint
npm run lint

# Test
npm test
```

---

## 🐳 Docker Deployment

### Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Production

```bash
# Build production images
docker-compose build

# Start with production configs
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

---

## 🔒 Security Features

- ✅ **User Isolation**: All database queries filtered by user_id
- ✅ **Input Validation**: Comprehensive validation on all endpoints
- ✅ **Rate Limiting**: 60 requests/minute per IP on chat endpoint
- ✅ **CORS Protection**: Configurable allowed origins
- ✅ **Error Handling**: Sanitized error messages, no sensitive data exposure
- ✅ **Request Tracking**: Unique request IDs for debugging
- ✅ **SSL/TLS**: Required for database connections (Neon)

---

## 📊 API Documentation

Once the backend is running, visit:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/{user_id}/chat` | Send message to chatbot |
| `GET` | `/api/{user_id}/tasks` | List user's tasks |
| `GET` | `/api/{user_id}/conversations` | List conversations |
| `GET` | `/api/{user_id}/conversations/{id}` | Get specific conversation |
| `GET` | `/health` | Health check |

---

## 🌍 Environment Variables

### Backend (.env)

```env
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4
CORS_ORIGINS=http://localhost:3000
LOG_LEVEL=INFO
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
AUTH_SECRET=your-secret-key-at-least-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

See `.env.example` files for complete documentation.

---

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`backend/README.md`](backend/README.md) | Backend setup and development |
| [`frontend/README.md`](frontend/README.md) | Frontend setup and development |
| [`specs/001-todo-ai-chatbot/quickstart.md`](specs/001-todo-ai-chatbot/quickstart.md) | Complete quickstart guide |
| [`specs/001-todo-ai-chatbot/spec.md`](specs/001-todo-ai-chatbot/spec.md) | Feature specification |
| [`specs/001-todo-ai-chatbot/plan.md`](specs/001-todo-ai-chatbot/plan.md) | Architecture and design |
| [`specs/001-todo-ai-chatbot/tasks.md`](specs/001-todo-ai-chatbot/tasks.md) | Implementation task breakdown |

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest                          # All tests
pytest tests/unit/             # Unit tests only
pytest --cov=src               # With coverage
```

### Frontend Tests

```bash
cd frontend
npm test                       # All tests
npm run test:coverage         # With coverage
```

---

## 🚢 Deployment

### Backend Options
- **Railway**: One-click deploy with PostgreSQL addon
- **Render**: Deploy from GitHub with automatic SSL
- **AWS ECS**: Container deployment with RDS PostgreSQL
- **Heroku**: Deploy with Heroku Postgres addon

### Frontend Options
- **Vercel**: Recommended, automatic deployments from GitHub
- **Netlify**: Deploy with serverless functions
- **AWS Amplify**: Full-stack deployment

### Database Options
- **Neon** (Recommended): Serverless PostgreSQL with instant provisioning
- **Supabase**: PostgreSQL with real-time capabilities
- **AWS RDS**: Managed PostgreSQL
- **Heroku Postgres**: Simple managed PostgreSQL

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenAI** for GPT-4 and chat completion APIs
- **FastAPI** for the excellent Python web framework
- **Next.js** for the powerful React framework
- **MCP** (Model Context Protocol) for tool standardization
- **Neon** for serverless PostgreSQL

---

## 📞 Support

- **Documentation**: See the `/specs` folder
- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions

---

## 🗺️ Roadmap

- [ ] Task priorities and due dates
- [ ] Task categories/tags
- [ ] File attachments
- [ ] Team collaboration
- [ ] Mobile app (React Native)
- [ ] Voice input support
- [ ] Recurring tasks
- [ ] Task notifications
- [ ] Analytics dashboard

---

**Built with ❤️ using FastAPI, Next.js, and OpenAI**
