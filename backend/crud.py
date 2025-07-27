from sqlalchemy.orm import Session
from models import Todo
from schemas import TodoCreate, TodoUpdate
from datetime import datetime

def get_todos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Todo).offset(skip).limit(limit).all()

def get_todo(db: Session, todo_id: int):
    return db.query(Todo).filter(Todo.id == todo_id).first()

def create_todo(db: Session, todo: TodoCreate):
    data = todo.dict()
    if data.get('date'):
        try:
            data['date'] = datetime.fromisoformat(data['date'])
        except Exception:
            data['date'] = None
    db_todo = Todo(**data)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_todo(db: Session, todo_id: int, todo_update: TodoUpdate):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        update_data = todo_update.dict(exclude_unset=True)
        if update_data.get('date'):
            try:
                update_data['date'] = datetime.fromisoformat(update_data['date'])
            except Exception:
                update_data['date'] = None
        for field, value in update_data.items():
            setattr(db_todo, field, value)
        db.commit()
        db.refresh(db_todo)
    return db_todo

def delete_todo(db: Session, todo_id: int):
    db_todo = db.query(Todo).filter(Todo.id == todo_id).first()
    if db_todo:
        db.delete(db_todo)
        db.commit()
    return db_todo
