"""Schemas for MCP tool responses."""

from typing import Any, Optional
from pydantic import BaseModel, Field


class ToolResult(BaseModel):
    """Base schema for tool execution results."""

    success: bool = Field(description="Whether the operation succeeded")
    message: str = Field(description="Human-readable result message")
    data: Optional[dict[str, Any]] = Field(
        default=None, description="Additional data from the operation"
    )


class AddTaskResult(ToolResult):
    """Result from add_task tool."""

    task_id: Optional[int] = Field(default=None, description="ID of the created task")


class ListTasksResult(ToolResult):
    """Result from list_tasks tool."""

    tasks: list[dict[str, Any]] = Field(
        default_factory=list, description="List of tasks"
    )
    count: int = Field(default=0, description="Number of tasks returned")


class CompleteTaskResult(ToolResult):
    """Result from complete_task tool."""

    task_id: Optional[int] = Field(default=None, description="ID of the completed task")


class UpdateTaskResult(ToolResult):
    """Result from update_task tool."""

    task_id: Optional[int] = Field(default=None, description="ID of the updated task")


class DeleteTaskResult(ToolResult):
    """Result from delete_task tool."""

    task_id: Optional[int] = Field(default=None, description="ID of the deleted task")
