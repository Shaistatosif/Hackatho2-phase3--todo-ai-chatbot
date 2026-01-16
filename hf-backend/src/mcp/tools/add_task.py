"""Add task MCP tool."""
from sqlmodel import Session
from src.mcp.server import register_tool
from src.services.task_service import create_task

@register_tool("add_task")
async def add_task_tool(session: Session, user_id: str, title: str, description: str = None) -> dict:
    if not title or len(title.strip()) == 0:
        return {"success": False, "message": "Task title is required"}
    if len(title) > 200:
        return {"success": False, "message": "Task title must be 200 characters or less"}

    task = create_task(session, user_id, title, description)
    return {"success": True, "message": f"Task '{task.title}' created successfully", "task_id": task.id}
