"""FastAPI application entry point."""

import os
import logging
import sys
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from dotenv import load_dotenv

from src.db import init_db
from src.api.errors import ErrorCode
from src.api.middleware import RequestLoggingMiddleware

load_dotenv()

# Configure logging with enhanced format
logging.basicConfig(
    level=getattr(logging, os.getenv("LOG_LEVEL", "INFO")),
    format="%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s",
    handlers=[
        logging.StreamHandler(sys.stdout),
    ]
)
logger = logging.getLogger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    logger.info("Starting Todo AI Chatbot API...")
    init_db()
    logger.info("Database initialized")
    yield
    logger.info("Shutting down Todo AI Chatbot API...")


app = FastAPI(
    title="Todo AI Chatbot API",
    description="AI-powered chatbot for natural language todo management",
    version="1.0.0",
    lifespan=lifespan,
)

# Add rate limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Add request/response logging middleware
app.add_middleware(RequestLoggingMiddleware)

# CORS configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handle request validation errors."""
    request_id = getattr(request.state, "request_id", "unknown")
    logger.warning(
        f"Validation error on {request.method} {request.url.path}",
        extra={
            "request_id": request_id,
            "errors": exc.errors(),
            "body": exc.body,
        }
    )
    return JSONResponse(
        status_code=422,
        content={
            "error": ErrorCode.VALIDATION_ERROR,
            "message": "Invalid request data",
            "details": exc.errors(),
        },
    )


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Handle HTTP exceptions."""
    request_id = getattr(request.state, "request_id", "unknown")
    logger.warning(
        f"HTTP {exc.status_code} on {request.method} {request.url.path}: {exc.detail}",
        extra={
            "request_id": request_id,
            "status_code": exc.status_code,
        }
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "error": f"HTTP_{exc.status_code}",
            "message": exc.detail,
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unhandled errors."""
    request_id = getattr(request.state, "request_id", "unknown")
    logger.error(
        f"Unhandled exception on {request.method} {request.url.path}: {str(exc)}",
        extra={
            "request_id": request_id,
            "exception_type": type(exc).__name__,
        },
        exc_info=True
    )
    return JSONResponse(
        status_code=500,
        content={
            "error": ErrorCode.INTERNAL_ERROR,
            "message": "An unexpected error occurred. Please try again.",
            "request_id": request_id,
        },
    )


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "todo-ai-chatbot"}


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Todo AI Chatbot API",
        "version": "1.0.0",
        "docs": "/docs",
    }


# Import and include routers
from src.api.routes import chat, tasks, conversations

app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(tasks.router, prefix="/api", tags=["Tasks"])
app.include_router(conversations.router, prefix="/api", tags=["Conversations"])
