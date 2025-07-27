import random
from database_sqlite import SessionLocal, create_tables
from models import Todo

titles = [
    "Buy groceries",
    "Read a book",
    "Go for a run",
    "Finish project",
    "Call a friend",
    "Clean the house",
    "Write a blog post",
    "Plan a trip",
    "Learn Python",
    "Watch a movie"
]
descriptions = [
    "Remember to get milk, eggs, and bread.",
    "Pick something from the reading list.",
    "Try to run at least 5km.",
    "Complete the pending work tasks.",
    "Catch up with an old friend.",
    "Tidy up the living room and kitchen.",
    "Share your thoughts on a recent topic.",
    "Research destinations and book tickets.",
    "Work through an online tutorial.",
    "Relax and enjoy a new film."
]

def seed_todos(n=5):
    create_tables()
    db = SessionLocal()
    try:
        for _ in range(n):
            idx = random.randint(0, len(titles) - 1)
            todo = Todo(
                title=titles[idx],
                description=descriptions[idx],
                completed=random.choice([True, False])
            )
            db.add(todo)
        db.commit()
        print(f"Inserted {n} random todos.")
    finally:
        db.close()

if __name__ == "__main__":
    seed_todos(15) 