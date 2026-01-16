"""Message service."""
from sqlmodel import Session
from src.models import Message

def save_message(session: Session, conv_id: int, role: str, content: str, tool_calls: list = None) -> Message:
    msg = Message(conversation_id=conv_id, role=role, content=content, tool_calls=tool_calls)
    session.add(msg)
    session.commit()
    session.refresh(msg)
    return msg
