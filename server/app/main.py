import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from .routes import user_routes, session_routes, actions_routes
from .config import settings
from dotenv import load_dotenv

load_dotenv("../.env")

app = FastAPI()

# Database initialization
Base.metadata.create_all(bind=engine)

origins = [
    os.getenv("FRONTEND_URL"),
]

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_routes.router)
app.include_router(session_routes.router)
app.include_router(actions_routes.router)


@app.get("/")
def read_root():
    return {"Hello": "World"}
