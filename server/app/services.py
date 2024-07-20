from sqlalchemy.orm import Session
from app.models import User
from app.schemas import UserCreate


def create_user(db: Session, user: UserCreate):
    if db.query(User).filter(User.username == user.username).first():
        return {"error": "Username already exists"}
    if user.role not in ["admin", "user"]:
        return {"error": "Invalid role"}
    session_id = user.session_id or generate_unique_session_id(db)
    new_user = User(username=user.username, role=user.role, session=session_id)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


def generate_unique_session_id(db: Session) -> int:
    import numpy as np

    while True:
        session_id = np.random.randint(100000, 200000)
        if not db.query(User).filter(User.session == session_id).first():
            return session_id


def get_users(db: Session):
    return db.query(User).all()


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    db.delete(user)
    db.commit()
    return {"id": user_id}


def delete_all_users(db: Session):
    db.query(User).delete()
    db.commit()
    return {"message": "all users deleted"}


def get_users_by_session(db: Session, session_id: int):
    return db.query(User).filter(User.session == session_id).all()
