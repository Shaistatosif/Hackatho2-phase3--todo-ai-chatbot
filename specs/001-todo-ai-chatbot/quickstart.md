# Quickstart: Todo AI Chatbot

**Feature**: 001-todo-ai-chatbot
**Status**: ✅ Production Ready
**Last Updated**: 2026-01-16

Get the Todo AI Chatbot running in under 10 minutes!

## Prerequisites

Before you start, ensure you have:

- **Python 3.11+** - [Download](https://www.python.org/downloads/)
- **Node.js 20+** - [Download](https://nodejs.org/)
- **PostgreSQL Database** - [Neon](https://neon.tech) (recommended) or local PostgreSQL
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- **Git** - For cloning the repository

## 🚀 Quick Start (30 seconds to first run!)

### Option 1: Automated Setup (Recommended)

```bash
# Clone repository
git clone <repository-url>
cd Hackathon2-phase3

# Run setup script (creates .env files with examples)
# Windows:
setup.bat

# Linux/Mac:
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Setup

Follow the detailed steps below for full control.

---

## 📦 Backend Setup (5 minutes)

### 1. Navigate and Create Virtual Environment

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file with your values
```

**Required variables in `.env`:**

```env
# Database - Get from https://console.neon.tech
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# OpenAI - Get from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENAI_MODEL=gpt-4

# CORS (for local development)
CORS_ORIGINS=http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### 4. Initialize Database

```bash
# Create tables using SQLModel
python -c "from src.db import init_db; init_db()"

# Or run SQL migration directly
# Using psql (if you have PostgreSQL client):
psql $DATABASE_URL -f src/migrations/001_initial.sql
```

### 5. Start Backend Server

```bash
uvicorn src.api.main:app --reload --host 0.0.0.0 --port 8000
```

**✅ Backend is ready!** Visit: http://localhost:8000/docs

---

## 🎨 Frontend Setup (3 minutes)

### 1. Navigate and Install Dependencies

```bash
# Open new terminal
cd frontend
npm install
```

### 2. Configure Environment

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local
```

**Required variables in `.env.local`:**

```env
# Backend API
NEXT_PUBLIC_API_URL=http://localhost:8000

# Better Auth (must match backend)
AUTH_SECRET=your-secret-key-at-least-32-characters-long

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start Frontend Server

```bash
npm run dev
```

**✅ Frontend is ready!** Visit: http://localhost:3000

---

## ✨ Test the Application

### 1. Open Browser

Navigate to http://localhost:3000

### 2. Create Account or Login

Use the authentication interface to sign in

### 3. Try These Commands

```
"Add buy groceries to my list"
"Show me all my tasks"
"Mark task 1 as complete"
"Update task 2 to 'Buy milk and bread'"
"Delete the groceries task"
```

### 4. Verify API Works

```bash
# Health check
curl http://localhost:8000/health

# Expected response:
# {"status":"healthy","service":"todo-ai-chatbot"}
```

---

## 🔍 Verify Everything Works

### Backend Checklist

- [ ] Health endpoint responds: http://localhost:8000/health
- [ ] API docs load: http://localhost:8000/docs
- [ ] Database connection successful (no errors in logs)
- [ ] OpenAI API key valid (test chat message)

### Frontend Checklist

- [ ] Home page loads: http://localhost:3000
- [ ] Can create account/login
- [ ] Chat interface loads
- [ ] Messages send successfully
- [ ] Tasks appear in responses

---

## 📚 Development Workflow

### Terminal 1: Backend

```bash
cd backend
venv\Scripts\activate  # Windows
# or: source venv/bin/activate  # Linux/Mac
uvicorn src.api.main:app --reload
```

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

### Terminal 3: Logs/Testing (Optional)

```bash
# Watch backend logs
cd backend
tail -f logs/app.log

# Or run tests
pytest
```

---

## 🛠️ API Quick Reference

### Chat with AI

```bash
curl -X POST http://localhost:8000/api/user123/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Add buy milk to my list",
    "conversation_id": null
  }'
```

**Response:**

```json
{
  "conversation_id": 1,
  "response": "I've added 'Buy milk' to your tasks!",
  "tool_calls": [
    {
      "tool": "add_task",
      "parameters": {
        "user_id": "user123",
        "title": "Buy milk"
      },
      "result": {
        "success": true,
        "task_id": 1
      }
    }
  ]
}
```

### Get Tasks

```bash
# All tasks
curl http://localhost:8000/api/user123/tasks

# Pending only
curl http://localhost:8000/api/user123/tasks?filter=pending

# Completed only
curl http://localhost:8000/api/user123/tasks?filter=completed
```

### Get Conversations

```bash
# List all conversations
curl http://localhost:8000/api/user123/conversations

# Get specific conversation
curl http://localhost:8000/api/user123/conversations/1
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** `ValueError: DATABASE_URL environment variable is required`

**Solution:**
```bash
# Ensure .env file exists and DATABASE_URL is set
cat .env | grep DATABASE_URL
```

**Problem:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

---

### Frontend Won't Start

**Problem:** `Error: Cannot find module 'next'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Problem:** `API connection failed`

**Solution:**
- Verify backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

---

### Database Connection Failed

**Problem:** `Connection refused`

**Solution:**
- Verify DATABASE_URL is correct
- Ensure `?sslmode=require` is added for Neon
- Test connection: `psql $DATABASE_URL`

---

### OpenAI API Errors

**Problem:** `Invalid API key`

**Solution:**
- Verify OPENAI_API_KEY in `.env`
- Check API key is active: https://platform.openai.com/api-keys
- Ensure you have API credits

**Problem:** `Rate limit exceeded`

**Solution:**
- Wait a few minutes
- Upgrade OpenAI plan
- Check usage: https://platform.openai.com/usage

---

## 📖 Next Steps

1. **Explore the Code**
   - Backend: `backend/src/`
   - Frontend: `frontend/src/`
   - Read the detailed READMEs in each directory

2. **Customize**
   - Modify system prompt: `backend/src/agent/config.py`
   - Customize UI: `frontend/src/components/`
   - Add MCP tools: `backend/src/mcp/tools/`

3. **Deploy**
   - Backend: Deploy to Railway, Render, or AWS
   - Frontend: Deploy to Vercel or Netlify
   - Database: Already on Neon (or migrate to production DB)

4. **Extend Features**
   - Add task priorities
   - Add due dates
   - Add task categories
   - Add file attachments
   - Add team collaboration

---

## 🔗 Useful Links

- **Backend API Docs:** http://localhost:8000/docs
- **Backend Redoc:** http://localhost:8000/redoc
- **Frontend:** http://localhost:3000
- **OpenAI Platform:** https://platform.openai.com
- **Neon Console:** https://console.neon.tech

---

## 💡 Tips

- **Use GPT-4**: For best results, use `gpt-4` model (set in `OPENAI_MODEL`)
- **Monitor Logs**: Check backend console for detailed request/response logs
- **Rate Limiting**: Chat endpoint limited to 60 req/min per IP
- **Security**: Never commit `.env` or `.env.local` files
- **Testing**: Use `http://localhost:8000/docs` to test API directly

---

## ✅ Success Indicators

You're all set when you can:

✓ Send a message in the chat interface
✓ See AI response with task confirmation
✓ View tasks in the database
✓ Complete, update, and delete tasks via chat
✓ See conversation history persist

---

## 📞 Support

Having issues? Check:

1. Backend README: `backend/README.md`
2. Frontend README: `frontend/README.md`
3. Environment files: `.env.example` files
4. Logs: Backend console output

**Happy coding! 🎉**
