"""Update task MCP tool."""
from sqlmodel import Session
from src.mcp.server import register_tool
from src.services.task_service import update_task

@register_tool("update_task")
async def update_task_tool(session: Session, user_id: str, task_id: int, title: str = None, description: str = None) -> dict:
    if not title and description is None:
        return {"success": False, "message": "Please specify what to update (title or description)"}

    task = update_task(session, user_id, task_id, title, description)
    if not task:
        return {"success": False, "message": f"Task {task_id} not found"}
    return {"success": True, "message": f"Task updated successfully", "task_id": task.id}
