from sqlalchemy import Column, Integer, String
from app.database import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(20), unique=True, nullable=False)
    role = Column(String(20))
    session = Column(Integer, nullable=False)
    attributed = Column(String(20))
