"""Conversation service."""
from sqlmodel import Session, select
from src.models import Conversation, Message

def get_or_create_conversation(session: Session, user_id: str, conv_id: int = None) -> Conversation:
    if conv_id:
        conv = session.exec(select(Conversation).where(Conversation.id == conv_id, Conversation.user_id == user_id)).first()
        if conv: return conv
    conv = Conversation(user_id=user_id)
    session.add(conv)
    session.commit()
    session.refresh(conv)
    return conv

def get_conversations(session: Session, user_id: str) -> list[Conversation]:
    return list(session.exec(select(Conversation).where(Conversation.user_id == user_id).order_by(Conversation.updated_at.desc())))

def get_history(session: Session, conv_id: int, limit: int = 50) -> list[dict]:
    msgs = session.exec(select(Message).where(Message.conversation_id == conv_id).order_by(Message.created_at.desc()).limit(limit))
    return [{"role": m.role, "content": m.content} for m in reversed(list(msgs))]

def update_timestamp(session: Session, conv_id: int):
    conv = session.get(Conversation, conv_id)
    if conv:
        from datetime import datetime
        conv.updated_at = datetime.utcnow()
        session.commit()
