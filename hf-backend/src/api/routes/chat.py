"""Chat endpoint for AI chatbot interaction."""
from fastapi import APIRouter, Depends, Request
from sqlmodel import Session
from slowapi import Limiter
from slowapi.util import get_remote_address
from src.db import get_session
from src.api.schemas import ChatRequest, ChatResponse

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

@router.post("/{user_id}/chat", response_model=ChatResponse)
@limiter.limit("60/minute")
async def chat(request: Request, user_id: str, chat_request: ChatRequest, session: Session = Depends(get_session)):
    """Send a message to the AI chatbot."""
    from src.services.conversation_service import get_or_create_conversation, get_history
    from src.services.message_service import save_message
    from src.agent.runner import run_agent

    conv = get_or_create_conversation(session, user_id, chat_request.conversation_id)
    history = get_history(session, conv.id)

    response_text, tool_calls = await run_agent(user_id, chat_request.message, history, session)

    save_message(session, conv.id, "user", chat_request.message)
    save_message(session, conv.id, "assistant", response_text, tool_calls)

    return ChatResponse(conversation_id=conv.id, response=response_text, tool_calls=tool_calls if tool_calls else None)
