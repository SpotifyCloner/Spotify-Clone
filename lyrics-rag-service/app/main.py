from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.rag_controller import router as rag_router
from app.services.embedding_service import EmbeddingService


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Warm up the embedding model on startup so the first request is fast
    EmbeddingService()
    yield


app = FastAPI(
    title="Lyrics RAG Service",
    description="Semantic lyrics search and retrieval microservice. Designed for Spring Boot integration.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["POST", "GET"],
    allow_headers=["*"],
)

app.include_router(rag_router)


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error. Please try again later."},
    )


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok"}
