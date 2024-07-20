from pydantic import BaseModel
from typing import Optional


class UserCreate(BaseModel):
    username: str
    role: str
    session_id: Optional[int] = None


class UserResponse(BaseModel):
    id: int
    username: str
    role: str
    session: int
    attributed: Optional[str]

    class Config:
        orm_mode = True


class SessionResponse(BaseModel):
    id: int
    username: str
    role: str
    attributed: Optional[str]

    class Config:
        orm_mode = True
