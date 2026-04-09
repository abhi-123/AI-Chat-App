from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from models.request_models import ChatRequest
from services.ai_service import generate_response

app = FastAPI()

# ✅ CORS (React/JS connect)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 🔥 Allow all (for DEV)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/generate-response")
async def generate_chat_response(data: ChatRequest):
    try:
        result = await generate_response(data.messages)
        print(result)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))