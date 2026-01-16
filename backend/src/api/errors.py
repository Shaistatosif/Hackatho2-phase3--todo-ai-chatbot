"""Custom exceptions and error handlers for the API."""

from enum import Enum
from fastapi import HTTPException, status
from pydantic import BaseModel


class ErrorCode(str, Enum):
    """Standard error codes for the API."""

    INVALID_INPUT = "INVALID_INPUT"
    VALIDATION_ERROR = "VALIDATION_ERROR"
    UNAUTHORIZED = "UNAUTHORIZED"
    TASK_NOT_FOUND = "TASK_NOT_FOUND"
    CONVERSATION_NOT_FOUND = "CONVERSATION_NOT_FOUND"
    RATE_LIMITED = "RATE_LIMITED"
    INTERNAL_ERROR = "INTERNAL_ERROR"


class ErrorResponse(BaseModel):
    """Standard error response schema."""

    error: ErrorCode
    message: str


class TaskNotFoundError(HTTPException):
    """Raised when a task is not found."""

    def __init__(self, task_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": ErrorCode.TASK_NOT_FOUND, "message": f"Task {task_id} not found"},
        )


class ConversationNotFoundError(HTTPException):
    """Raised when a conversation is not found."""

    def __init__(self, conversation_id: int):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "error": ErrorCode.CONVERSATION_NOT_FOUND,
                "message": f"Conversation {conversation_id} not found",
            },
        )


class InvalidInputError(HTTPException):
    """Raised when input validation fails."""

    def __init__(self, message: str):
        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": ErrorCode.INVALID_INPUT, "message": message},
        )


class UnauthorizedError(HTTPException):
    """Raised when authentication fails."""

    def __init__(self, message: str = "Invalid or expired authentication token"):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": ErrorCode.UNAUTHORIZED, "message": message},
        )


class RateLimitedError(HTTPException):
    """Raised when rate limit is exceeded."""

    def __init__(self):
        super().__init__(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail={
                "error": ErrorCode.RATE_LIMITED,
                "message": "Rate limit exceeded. Please try again in 60 seconds.",
            },
        )


class InternalError(HTTPException):
    """Raised for unexpected internal errors."""

    def __init__(self, message: str = "An unexpected error occurred. Please try again."):
        super().__init__(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"error": ErrorCode.INTERNAL_ERROR, "message": message},
        )
