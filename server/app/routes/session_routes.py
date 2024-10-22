from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import SessionResponse
from app.services import get_users_by_session

router = APIRouter(prefix="/session", tags=["session"])


@router.get("/{session_id}", response_model=list[SessionResponse])
def get_users_by_session_endpoint(session_id: int, db: Session = Depends(get_db)):
    users = get_users_by_session(db, session_id)
    if not users:
        raise HTTPException(status_code=404, detail="Session not found")
    return users
