from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base
import os
from dotenv import load_dotenv
from datetime import datetime
from typing import Optional
from pydantic import BaseModel

load_dotenv()

# Database URL - you can modify this based on your PostgreSQL setup
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:password@localhost:5432/todoapp")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def create_tables():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    date: Optional[datetime] = None  # <-- should be datetime, not str
    priority: Optional[str] = 'medium'

class TodoCreate(TodoBase):
    pass

class TodoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None
    date: Optional[datetime] = None  # <-- should be datetime, not str
    priority: Optional[str] = None

class Todo(TodoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
