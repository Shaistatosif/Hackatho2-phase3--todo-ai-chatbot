"""Tasks endpoint."""
from fastapi import APIRouter, Depends, Query
from sqlmodel import Session
from src.db import get_session
from src.api.schemas import TaskResponse

router = APIRouter()

@router.get("/{user_id}/tasks", response_model=list[TaskResponse])
async def list_tasks(user_id: str, filter: str = Query("all"), session: Session = Depends(get_session)):
    """List user's tasks."""
    from src.services.task_service import get_tasks
    tasks = get_tasks(session, user_id, filter)
    return [TaskResponse(id=t.id, user_id=t.user_id, title=t.title, description=t.description, completed=t.completed, created_at=str(t.created_at), updated_at=str(t.updated_at)) for t in tasks]
