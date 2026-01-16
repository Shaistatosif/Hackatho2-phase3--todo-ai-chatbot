"""List tasks MCP tool."""
from sqlmodel import Session
from src.mcp.server import register_tool
from src.services.task_service import get_tasks

@register_tool("list_tasks")
async def list_tasks_tool(session: Session, user_id: str, filter: str = "all") -> dict:
    tasks = get_tasks(session, user_id, filter)
    if not tasks:
        return {"success": True, "message": "You don't have any tasks right now.", "tasks": [], "count": 0}

    task_list = [{"id": t.id, "title": t.title, "description": t.description, "completed": t.completed} for t in tasks]
    return {"success": True, "message": f"Found {len(tasks)} task(s)", "tasks": task_list, "count": len(tasks)}
