# 🚀 Deployment Guide - Todo AI Chatbot

Complete guide for deploying your Todo AI Chatbot to production.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Frontend Deployment (Vercel)](#frontend-deployment-vercel)
4. [Backend Deployment (Hugging Face Spaces)](#backend-deployment-hugging-face-spaces)
5. [Environment Variables](#environment-variables)
6. [Testing Your Deployment](#testing-your-deployment)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub account
- ✅ Vercel account (free tier works)
- ✅ Hugging Face account (free tier works)
- ✅ OpenAI API key with credits
- ✅ Neon PostgreSQL database (or any PostgreSQL database)
- ✅ Git installed on your machine

---

## GitHub Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click "New repository" (green button)
3. Repository settings:
   - Name: `todo-ai-chatbot` (or your preferred name)
   - Description: "Natural language todo management powered by OpenAI"
   - Visibility: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

### Step 2: Push Your Code to GitHub

Open terminal in your project directory and run:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Todo AI Chatbot with enhanced UI"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/todo-ai-chatbot.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 3: Verify Push

1. Go to your GitHub repository URL
2. You should see all your project files
3. Confirm that `.env` files are **NOT** visible (they should be ignored)

---

## Frontend Deployment (Vercel)

Vercel is perfect for Next.js applications with automatic deployments.

### Step 1: Sign Up for Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub" (recommended)
4. Authorize Vercel to access your GitHub account

### Step 2: Import Your Repository

1. Click "Add New..." → "Project"
2. Import your `todo-ai-chatbot` repository
3. Vercel will detect it's a Next.js project automatically

### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: Next.js
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Add Environment Variables

Click "Environment Variables" and add:

| Name | Value | Note |
|------|-------|------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-HF-SPACE.hf.space` | Replace after deploying backend |
| `AUTH_SECRET` | Generate random 32+ char string | Use `openssl rand -base64 32` |
| `NEXT_PUBLIC_APP_URL` | Leave empty for now | Vercel will auto-set |

To generate `AUTH_SECRET`:
```bash
openssl rand -base64 32
```

### Step 5: Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for build to complete
3. You'll get a URL like: `https://your-project.vercel.app`
4. Click "Visit" to see your frontend!

### Step 6: Update Environment Variable

1. After backend deployment (next section), come back here
2. Go to Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your backend URL
4. Click "Save"
5. Go to Deployments → Latest Deployment → "..." → "Redeploy"

### Step 7: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

---

## Backend Deployment (Hugging Face Spaces)

Hugging Face Spaces provides free hosting for Python applications.

### Step 1: Create Hugging Face Account

1. Go to [Hugging Face](https://huggingface.co)
2. Sign up for a free account
3. Verify your email

### Step 2: Create a New Space

1. Click your profile → "New Space"
2. Space settings:
   - **Space name**: `todo-ai-chatbot-backend`
   - **License**: MIT (or your choice)
   - **Space SDK**: Docker
   - **Visibility**: Public (free) or Private (requires paid plan)
3. Click "Create Space"

### Step 3: Prepare Backend Files

You need to create a `Dockerfile` in the `backend` directory:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 7860

# Run the application
CMD ["uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "7860"]
```

**Note**: Hugging Face Spaces requires port 7860!

### Step 4: Create README for Space

Create `backend/README.md` (if not exists):

```markdown
---
title: Todo AI Chatbot Backend
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
app_port: 7860
---

# Todo AI Chatbot Backend

FastAPI backend for natural language todo management.

## Environment Variables

Set these in Space Settings:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: Your OpenAI API key
- `CORS_ORIGINS`: Comma-separated frontend URLs
```

### Step 5: Push Backend to Hugging Face

Option A: Using Git (Recommended)

```bash
# Navigate to backend directory
cd backend

# Initialize git if needed
git init

# Add Hugging Face as remote
git remote add hf https://huggingface.co/spaces/YOUR_HF_USERNAME/todo-ai-chatbot-backend
# Replace YOUR_HF_USERNAME with your Hugging Face username

# Add files
git add .

# Commit
git commit -m "Deploy backend to Hugging Face"

# Push
git push hf main
```

Option B: Using Hugging Face Web UI

1. Go to your Space's "Files" tab
2. Click "Add file" → "Upload files"
3. Upload all files from `backend/` directory
4. Commit changes

### Step 6: Configure Environment Variables on Hugging Face

1. Go to your Space → Settings
2. Scroll to "Variables and secrets"
3. Add these secrets:

| Name | Value | Example |
|------|-------|---------|
| `DATABASE_URL` | Your Neon PostgreSQL URL | `postgresql://user:pass@host/db?sslmode=require` |
| `OPENAI_API_KEY` | Your OpenAI API key | `sk-...` |
| `CORS_ORIGINS` | Your Vercel frontend URL | `https://your-project.vercel.app` |
| `OPENAI_MODEL` | Model to use | `gpt-4o-mini` (cheaper) or `gpt-4` |
| `LOG_LEVEL` | Logging level | `INFO` |

**Important**: Get your Neon database URL from [Neon Console](https://console.neon.tech)

### Step 7: Wait for Build

1. Go to "Logs" tab
2. Watch the build process (5-10 minutes)
3. Once you see "Application startup complete", it's ready!
4. Your backend URL will be: `https://YOUR_HF_USERNAME-todo-ai-chatbot-backend.hf.space`

### Step 8: Test Backend

```bash
# Health check
curl https://YOUR_HF_USERNAME-todo-ai-chatbot-backend.hf.space/health

# Should return: {"status": "healthy", "timestamp": "..."}
```

### Step 9: Update Frontend with Backend URL

1. Go back to Vercel
2. Project Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your Hugging Face Space URL
4. Save and redeploy

---

## Environment Variables

### Backend (.env)

```env
# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# OpenAI
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-4o-mini

# CORS (comma-separated)
CORS_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:3000

# Logging
LOG_LEVEL=INFO
```

### Frontend (.env.local)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-hf-space.hf.space

# Auth Secret (generate with: openssl rand -base64 32)
AUTH_SECRET=your-super-secret-32-character-minimum-string

# App URL (auto-set by Vercel)
NEXT_PUBLIC_APP_URL=https://your-vercel-app.vercel.app
```

---

## Testing Your Deployment

### 1. Test Frontend

1. Visit your Vercel URL: `https://your-project.vercel.app`
2. You should see the home page with the animated robot
3. Click "Create Account"
4. Enter your name and create an account
5. You should be redirected to the chat page

### 2. Test Chat Functionality

1. On chat page, type: "Add buy groceries"
2. Bot should respond confirming task was added
3. Type: "Show me all my tasks"
4. Bot should list "buy groceries"
5. Type: "Mark buy groceries as complete"
6. Bot should confirm completion

### 3. Test Backend Directly

```bash
# Health check
curl https://YOUR_HF_SPACE.hf.space/health

# API docs
open https://YOUR_HF_SPACE.hf.space/docs
```

---

## Troubleshooting

### Frontend Issues

**Problem**: "Failed to fetch" errors

**Solution**:
1. Check `NEXT_PUBLIC_API_URL` is correct in Vercel
2. Verify backend is running on Hugging Face
3. Check CORS settings in backend allow your frontend URL

**Problem**: Build fails on Vercel

**Solution**:
1. Check build logs for specific errors
2. Verify `frontend` directory is set as root
3. Ensure all dependencies are in `package.json`

### Backend Issues

**Problem**: Space stuck in "Building"

**Solution**:
1. Check Logs tab for errors
2. Verify Dockerfile is correct
3. Ensure port 7860 is used
4. Check requirements.txt has all dependencies

**Problem**: "Database connection failed"

**Solution**:
1. Verify `DATABASE_URL` is correct
2. Ensure `?sslmode=require` is in connection string for Neon
3. Check database is accessible from internet
4. Run migrations: `alembic upgrade head`

**Problem**: "OpenAI API Error"

**Solution**:
1. Verify `OPENAI_API_KEY` is correct
2. Check you have credits in OpenAI account
3. Try using `gpt-4o-mini` instead of `gpt-4` (cheaper)

**Problem**: CORS errors in browser console

**Solution**:
1. Add your Vercel URL to `CORS_ORIGINS` in backend
2. Format: `https://your-app.vercel.app` (no trailing slash)
3. Multiple origins: `https://app1.vercel.app,https://app2.vercel.app`

### Database Issues

**Problem**: Tables don't exist

**Solution**:
```bash
# SSH into your space or run locally
cd backend
alembic upgrade head
```

**Problem**: Connection timeout

**Solution**:
- Neon databases may sleep after inactivity
- First request after sleep takes longer
- Consider upgrading to paid plan for always-on database

---

## 🎉 Success!

You now have a fully deployed Todo AI Chatbot!

- **Frontend**: `https://your-project.vercel.app`
- **Backend**: `https://your-space.hf.space`
- **API Docs**: `https://your-space.hf.space/docs`

### Next Steps

1. Share your project URL with your teacher/sir
2. Add a custom domain on Vercel (optional)
3. Set up monitoring with Vercel Analytics
4. Enable automatic deployments on GitHub push
5. Consider upgrading to paid plans for better performance

---

## 📊 Monitoring

### Vercel Analytics
1. Go to Project → Analytics
2. View page views, performance metrics
3. Free tier includes basic analytics

### Hugging Face Logs
1. Go to Space → Logs
2. Monitor API requests and errors
3. Check for rate limits or issues

### Database (Neon)
1. Go to Neon Console → Your Project
2. View connection counts
3. Monitor storage usage

---

## 💰 Cost Estimates

### Free Tier Limits

| Service | Free Tier | Cost After |
|---------|-----------|------------|
| Vercel | 100 GB bandwidth, Unlimited deployments | $20/month Pro |
| Hugging Face | Basic Spaces, 2 vCPU, 16GB RAM | $5/month for better specs |
| Neon | 10 projects, 0.5 GB storage/project | $19/month Pro |
| OpenAI | Pay per use | ~$0.002 per 1K tokens (gpt-4o-mini) |

**Estimated monthly cost for light use**: $0-5 (mostly OpenAI API calls)

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` files to GitHub
2. ✅ Use environment variables for all secrets
3. ✅ Keep dependencies updated (`npm audit`, `pip check`)
4. ✅ Enable 2FA on all accounts (GitHub, Vercel, HF, OpenAI)
5. ✅ Rotate API keys regularly
6. ✅ Monitor API usage to detect abuse
7. ✅ Set spending limits on OpenAI account

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Hugging Face Spaces Guide](https://huggingface.co/docs/hub/spaces)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [FastAPI Docker Deployment](https://fastapi.tiangolo.com/deployment/docker/)
- [Neon Documentation](https://neon.tech/docs)

---

## 🆘 Get Help

If you encounter issues:

1. Check the logs (Vercel or Hugging Face)
2. Review this guide's Troubleshooting section
3. Check GitHub Issues in the project repository
4. Ask on Discord/Slack community channels

---

**Made with ❤️ by Shaista**

Good luck with your deployment! 🚀
