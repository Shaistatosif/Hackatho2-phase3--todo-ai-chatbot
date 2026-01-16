"""MCP Server for Todo AI Chatbot tools."""

from typing import Any, Callable
from sqlmodel import Session

# Tool registry
_tools: dict[str, Callable] = {}


def register_tool(name: str):
    """Decorator to register an MCP tool."""

    def decorator(func: Callable):
        _tools[name] = func
        return func

    return decorator


def get_tool(name: str) -> Callable | None:
    """Get a registered tool by name."""
    return _tools.get(name)


def list_tools() -> list[str]:
    """List all registered tool names."""
    return list(_tools.keys())


async def execute_tool(
    name: str,
    parameters: dict[str, Any],
    session: Session,
) -> dict[str, Any]:
    """Execute a registered tool with parameters."""
    tool = get_tool(name)
    if not tool:
        return {
            "success": False,
            "message": f"Unknown tool: {name}",
        }

    try:
        result = await tool(session=session, **parameters)
        return result
    except Exception as e:
        return {
            "success": False,
            "message": f"Tool execution failed: {str(e)}",
        }


def get_tool_definitions() -> list[dict[str, Any]]:
    """Get OpenAI function definitions for all registered tools."""
    definitions = []

    # add_task
    definitions.append({
        "type": "function",
        "function": {
            "name": "add_task",
            "description": "Add a new task to the user's todo list",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier",
                    },
                    "title": {
                        "type": "string",
                        "description": "The task title (1-200 characters)",
                    },
                    "description": {
                        "type": "string",
                        "description": "Optional task description",
                    },
                },
                "required": ["user_id", "title"],
            },
        },
    })

    # list_tasks
    definitions.append({
        "type": "function",
        "function": {
            "name": "list_tasks",
            "description": "List the user's tasks with optional filtering",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier",
                    },
                    "filter": {
                        "type": "string",
                        "enum": ["all", "pending", "completed"],
                        "description": "Filter tasks by status",
                    },
                },
                "required": ["user_id"],
            },
        },
    })

    # complete_task
    definitions.append({
        "type": "function",
        "function": {
            "name": "complete_task",
            "description": "Mark a task as complete by ID or title search",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier",
                    },
                    "task_id": {
                        "type": "integer",
                        "description": "The task ID to complete (use this if you know the specific ID)",
                    },
                    "task_title": {
                        "type": "string",
                        "description": "Search for task by title (use this if user mentions task by name)",
                    },
                },
                "required": ["user_id"],
            },
        },
    })

    # update_task
    definitions.append({
        "type": "function",
        "function": {
            "name": "update_task",
            "description": "Update a task's title or description",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier",
                    },
                    "task_id": {
                        "type": "integer",
                        "description": "The task ID to update",
                    },
                    "title": {
                        "type": "string",
                        "description": "New task title",
                    },
                    "description": {
                        "type": "string",
                        "description": "New task description",
                    },
                },
                "required": ["user_id", "task_id"],
            },
        },
    })

    # delete_task
    definitions.append({
        "type": "function",
        "function": {
            "name": "delete_task",
            "description": "Permanently delete a task by ID or title search",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The user's unique identifier",
                    },
                    "task_id": {
                        "type": "integer",
                        "description": "The task ID to delete (use this if you know the specific ID)",
                    },
                    "task_title": {
                        "type": "string",
                        "description": "Search for task by title to delete (use this if user mentions task by name)",
                    },
                },
                "required": ["user_id"],
            },
        },
    })

    return definitions
