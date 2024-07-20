from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from core.random_selection import selection
from app.models import User

router = APIRouter(prefix="/launch", tags=["secret_santa"])


@router.post("/")
def launch_secret_santa(session: int, db: Session = Depends(get_db)):
    users = db.query(User).filter(User.session == session).all()
    user_ids = [user.id for user in users]
    results = selection(user_ids)
    for user_id, attributed_id in results.items():
        user = db.query(User).filter(User.id == user_id).first()
        user.attributed = (
            db.query(User).filter(User.id == attributed_id).first().username
        )
    db.commit()
    return results
