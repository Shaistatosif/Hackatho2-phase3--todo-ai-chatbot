---
title: Todo AI Chatbot Backend
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
---

# Todo AI Chatbot Backend

FastAPI backend for natural language todo management powered by OpenAI and MCP tools.

## 🚀 Quick Start

This Space runs a FastAPI backend that provides:
- Natural language task management
- OpenAI GPT integration
- MCP (Model Context Protocol) tools
- PostgreSQL database support
- RESTful API with automatic documentation

## 📋 Environment Variables

Configure these in Space Settings → Variables and secrets:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string (Neon recommended) | `postgresql://user:pass@host/db?sslmode=require` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4o-mini` or `gpt-4` |
| `CORS_ORIGINS` | Comma-separated allowed origins | `https://your-frontend.vercel.app` |
| `LOG_LEVEL` | Logging level | `INFO` or `DEBUG` |

## 🔗 API Endpoints

Once deployed, visit:
- **API Documentation**: `https://your-space.hf.space/docs`
- **Health Check**: `https://your-space.hf.space/health`
- **OpenAPI Spec**: `https://your-space.hf.space/openapi.json`

### Main Endpoints

- `POST /api/{user_id}/chat` - Send message to chatbot
- `GET /api/{user_id}/tasks` - List all tasks
- `GET /api/{user_id}/conversations` - List conversations
- `GET /health` - Health check

## 🏗️ Architecture

```
User → Frontend → This API → OpenAI Agent → MCP Tools → PostgreSQL
```

### MCP Tools

- `add_task` - Create new task
- `list_tasks` - List tasks (all/pending/completed)
- `complete_task` - Mark task as complete
- `update_task` - Update task details
- `delete_task` - Delete task

## 💾 Database Setup

Using Neon PostgreSQL (recommended):

1. Create account at [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string (includes `?sslmode=require`)
4. Add to Space secrets as `DATABASE_URL`

Database tables are created automatically on first run.

## 🔒 Security

- User isolation: All queries filtered by user_id
- Input validation on all endpoints
- Rate limiting: 60 requests/minute
- CORS protection
- SSL/TLS required for database

## 📊 Monitoring

Check the Logs tab to monitor:
- API requests and responses
- OpenAI API calls
- Database queries
- Error messages

## 🐛 Troubleshooting

### Space won't start
- Check Logs for error messages
- Verify all environment variables are set
- Ensure DATABASE_URL includes `?sslmode=require`

### OpenAI API errors
- Verify API key is correct
- Check you have credits in OpenAI account
- Try using `gpt-4o-mini` (cheaper) instead of `gpt-4`

### Database connection errors
- Verify DATABASE_URL format
- Ensure database allows connections from internet
- Check Neon database is not paused

### CORS errors
- Add your frontend URL to `CORS_ORIGINS`
- Use full URL: `https://your-app.vercel.app`
- No trailing slash

## 📚 Tech Stack

- **Framework**: FastAPI 0.115+
- **AI**: OpenAI GPT-4 / GPT-4o-mini
- **Database**: PostgreSQL (Neon)
- **ORM**: SQLModel
- **Tools**: MCP (Model Context Protocol)
- **Validation**: Pydantic
- **Server**: Uvicorn

## 🔗 Links

- [Frontend Repository](https://github.com/your-username/todo-ai-chatbot)
- [Documentation](https://github.com/your-username/todo-ai-chatbot/blob/main/DEPLOYMENT.md)
- [API Reference](https://your-space.hf.space/docs)

## 📜 License

MIT License - see LICENSE file for details

---

**Built with ❤️ using FastAPI, OpenAI, and MCP**
