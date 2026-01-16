"""OpenAI Agent runner with tool dispatch."""
import json
import logging
from typing import Any
from openai import OpenAI
from sqlmodel import Session
from src.agent.config import OPENAI_API_KEY, OPENAI_MODEL, SYSTEM_PROMPT, AGENT_TIMEOUT
from src.mcp.server import execute_tool, get_tool_definitions
import src.mcp.tools  # noqa: F401 - Import to register tools

logger = logging.getLogger(__name__)
client = OpenAI(api_key=OPENAI_API_KEY)

async def run_agent(user_id: str, message: str, history: list[dict], session: Session) -> tuple[str, list]:
    """Run agent with message. Returns (response, tool_calls)."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}] + history + [{"role": "user", "content": message}]
    tools = get_tool_definitions()
    tool_calls_made = []

    try:
        response = client.chat.completions.create(model=OPENAI_MODEL, messages=messages, tools=tools, tool_choice="auto", timeout=AGENT_TIMEOUT)
        msg = response.choices[0].message

        while msg.tool_calls:
            messages.append({"role": "assistant", "content": msg.content or "", "tool_calls": [{"id": tc.id, "type": "function", "function": {"name": tc.function.name, "arguments": tc.function.arguments}} for tc in msg.tool_calls]})

            for tc in msg.tool_calls:
                args = json.loads(tc.function.arguments)
                args["user_id"] = user_id
                result = await execute_tool(tc.function.name, args, session)
                tool_calls_made.append({"tool": tc.function.name, "parameters": args, "result": result})
                messages.append({"role": "tool", "tool_call_id": tc.id, "content": json.dumps(result)})

            response = client.chat.completions.create(model=OPENAI_MODEL, messages=messages, tools=tools, tool_choice="auto", timeout=AGENT_TIMEOUT)
            msg = response.choices[0].message

        return msg.content or "Done!", tool_calls_made
    except Exception as e:
        logger.error(f"Agent error: {e}")
        return "Sorry, please try again.", []
