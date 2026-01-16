"""Task service for CRUD operations."""
from sqlmodel import Session, select
from src.models import Task

def create_task(session: Session, user_id: str, title: str, description: str = None) -> Task:
    task = Task(user_id=user_id, title=title.strip(), description=description)
    session.add(task)
    session.commit()
    session.refresh(task)
    return task

def get_tasks(session: Session, user_id: str, filter: str = "all") -> list[Task]:
    stmt = select(Task).where(Task.user_id == user_id)
    if filter == "pending":
        stmt = stmt.where(Task.completed == False)
    elif filter == "completed":
        stmt = stmt.where(Task.completed == True)
    return list(session.exec(stmt.order_by(Task.created_at.desc())))

def get_task(session: Session, user_id: str, task_id: int) -> Task | None:
    stmt = select(Task).where(Task.id == task_id, Task.user_id == user_id)
    return session.exec(stmt).first()

def complete_task(session: Session, user_id: str, task_id: int) -> Task | None:
    task = get_task(session, user_id, task_id)
    if task:
        task.completed = True
        session.commit()
        session.refresh(task)
    return task

def update_task(session: Session, user_id: str, task_id: int, title: str = None, description: str = None) -> Task | None:
    task = get_task(session, user_id, task_id)
    if task:
        if title: task.title = title.strip()
        if description is not None: task.description = description
        session.commit()
        session.refresh(task)
    return task

def delete_task(session: Session, user_id: str, task_id: int) -> bool:
    task = get_task(session, user_id, task_id)
    if task:
        session.delete(task)
        session.commit()
        return True
    return False

def search_tasks(session: Session, user_id: str, query: str) -> list[Task]:
    stmt = select(Task).where(Task.user_id == user_id, Task.title.ilike(f"%{query}%"))
    return list(session.exec(stmt))
