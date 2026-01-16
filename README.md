# Todo AI Chatbot

Natural language todo management powered by OpenAI and MCP tools.

## Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://frontend-psi-eosin-17.vercel.app |
| Backend API | https://shaista-tosif-todo-ai-backend.hf.space |
| API Docs | https://shaista-tosif-todo-ai-backend.hf.space/docs |

## Features

- **Add Tasks**: "Add buy groceries to my list"
- **View Tasks**: "Show my tasks" or "What's pending?"
- **Complete Tasks**: "Mark groceries as done"
- **Update Tasks**: "Update task 2 to Buy milk"
- **Delete Tasks**: "Delete the meeting task"

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | FastAPI, Python 3.11+ |
| AI | OpenAI GPT-4 |
| Database | PostgreSQL (Neon) |
| Deployment | Vercel (Frontend), HuggingFace Spaces (Backend) |

## Project Structure

```
├── frontend/          # Next.js frontend
├── backend/           # FastAPI backend
├── hf-backend/        # HuggingFace Spaces backend
└── specs/             # Documentation
```

## Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- PostgreSQL database
- OpenAI API key

### Clone & Setup

```bash
git clone https://github.com/Shaistatosif/Hackatho2-phase3--todo-ai-chatbot.git
cd Hackatho2-phase3--todo-ai-chatbot
```

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your credentials
uvicorn src.api.main:app --reload
```

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your credentials
npm run dev
```

## Environment Variables

### Backend (.env)

```
DATABASE_URL=postgresql://user:pass@host/db?sslmode=require
OPENAI_API_KEY=sk-your-api-key
OPENAI_MODEL=gpt-4o-mini
CORS_ORIGINS=http://localhost:3000
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
AUTH_SECRET=your-secret-key-32-chars
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/{user_id}/chat` | Send message to chatbot |
| GET | `/api/{user_id}/tasks` | List user's tasks |
| GET | `/health` | Health check |

## Screenshots

![Todo AI Chatbot Screenshot](https://via.placeholder.com/800x500/0B0F14/7C7CFF?text=Todo+AI+Chatbot+-+Screenshot+Coming+Soon)

*Dark theme with galaxy-inspired UI, animated robot mascot, and intuitive chat interface.*

## Author

**Shaista Tosif**

## License

MIT License
