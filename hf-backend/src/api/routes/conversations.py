"""Conversations endpoint."""
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from src.db import get_session
from src.api.schemas import ConversationResponse, ConversationDetailResponse, MessageResponse
from src.api.errors import ConversationNotFoundError

router = APIRouter()

@router.get("/{user_id}/conversations", response_model=list[ConversationResponse])
async def list_conversations(user_id: str, session: Session = Depends(get_session)):
    """List user's conversations."""
    from src.services.conversation_service import get_conversations
    convs = get_conversations(session, user_id)
    return [ConversationResponse(id=c.id, user_id=c.user_id, created_at=str(c.created_at), updated_at=str(c.updated_at)) for c in convs]


@router.get("/{user_id}/conversations/{conversation_id}", response_model=ConversationDetailResponse)
async def get_conversation(user_id: str, conversation_id: int, session: Session = Depends(get_session)):
    """Get a specific conversation with its messages."""
    from src.models import Conversation, Message

    conv = session.exec(select(Conversation).where(Conversation.id == conversation_id, Conversation.user_id == user_id)).first()
    if not conv:
        raise ConversationNotFoundError(conversation_id)

    msgs = session.exec(select(Message).where(Message.conversation_id == conversation_id).order_by(Message.created_at)).all()

    return ConversationDetailResponse(
        id=conv.id,
        user_id=conv.user_id,
        created_at=str(conv.created_at),
        updated_at=str(conv.updated_at),
        messages=[MessageResponse(id=m.id, conversation_id=m.conversation_id, role=m.role, content=m.content, tool_calls=m.tool_calls, created_at=str(m.created_at)) for m in msgs]
    )
