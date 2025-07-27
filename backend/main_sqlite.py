from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

import crud
import schemas
from database_sqlite import get_db, create_tables

app = FastAPI(title="Todo API", description="A simple Todo API with FastAPI and SQLite")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
@app.on_event("startup")
def startup_event():
    create_tables()

@app.get("/")
def read_root():
    return {"message": "Todo API is running!"}

@app.get("/todos", response_model=List[schemas.Todo])
def get_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    todos = crud.get_todos(db, skip=skip, limit=limit)
    return todos

@app.get("/todos/{todo_id}", response_model=schemas.Todo)
def get_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = crud.get_todo(db, todo_id=todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.post("/todos", response_model=schemas.Todo)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    return crud.create_todo(db=db, todo=todo)

@app.put("/todos/{todo_id}", response_model=schemas.Todo)
def update_todo(todo_id: int, todo_update: schemas.TodoUpdate, db: Session = Depends(get_db)):
    todo = crud.update_todo(db, todo_id=todo_id, todo_update=todo_update)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo = crud.delete_todo(db, todo_id=todo_id)
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"message": "Todo deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
