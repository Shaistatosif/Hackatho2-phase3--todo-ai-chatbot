"""Complete task MCP tool."""
from sqlmodel import Session
from src.mcp.server import register_tool
from src.services.task_service import complete_task, get_task, search_tasks

@register_tool("complete_task")
async def complete_task_tool(session: Session, user_id: str, task_id: int = None, task_title: str = None) -> dict:
    """Complete a task by ID or title. If title matches multiple tasks, returns list for clarification."""

    # If task_id provided, use it directly
    if task_id:
        task = complete_task(session, user_id, task_id)
        if not task:
            return {"success": False, "message": f"Task {task_id} not found"}
        return {"success": True, "message": f"Task '{task.title}' marked as complete", "task_id": task.id}

    # If task_title provided, search for matching tasks
    if task_title:
        matches = search_tasks(session, user_id, task_title)

        if not matches:
            return {"success": False, "message": f"No tasks found matching '{task_title}'"}

        if len(matches) > 1:
            # Multiple matches - return list for clarification
            task_list = "\n".join([f"- Task {t.id}: {t.title}" for t in matches])
            return {
                "success": False,
                "message": f"Multiple tasks match '{task_title}'. Please specify which one:\n{task_list}",
                "matches": [{"id": t.id, "title": t.title} for t in matches]
            }

        # Single match - complete it
        task = complete_task(session, user_id, matches[0].id)
        return {"success": True, "message": f"Task '{task.title}' marked as complete", "task_id": task.id}

    return {"success": False, "message": "Please provide either task_id or task_title"}
