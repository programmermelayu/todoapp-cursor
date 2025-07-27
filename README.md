# Todo List Application

A full-stack todo list application built with React frontend, FastAPI backend, and PostgreSQL database built 100% using AI tools like Warp and Cursor.

## Features

- Create, read, update, and delete todos
- Mark todos as completed/incomplete
- Add descriptions to todos
- Modern and responsive UI
- REST API backend with automatic documentation

## Prerequisites

- Python 3.12+
- Node.js 24+
- PostgreSQL 17+

## Setup Instructions

### 1. Database Setup

First, set up your PostgreSQL database:

1. Open PostgreSQL command line (psql) or pgAdmin
2. Create a new database:
   ```sql
   CREATE DATABASE todoapp;
   ```
3. Create a user (optional, or use existing postgres user):
   ```sql
   CREATE USER todouser WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE todoapp TO todouser;
   ```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   .\\venv\\Scripts\\activate.bat
   # On Linux/Mac
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Update the `.env` file with your database credentials:
   ```
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/todoapp
   ```

5. Run the backend server:
   ```bash
   python main.py
   ```

The backend will be available at `http://localhost:8000`
API documentation is available at `http://localhost:8000/docs`

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will be available at `http://localhost:3000`

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Add new todos by clicking in the input field
3. Mark todos as complete by checking the checkbox
4. Edit todos by clicking the "Edit" button
5. Delete todos by clicking the "Delete" button

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/{id}` - Get a specific todo
- `PUT /todos/{id}` - Update a todo
- `DELETE /todos/{id}` - Delete a todo

## Project Structure

```
todo-app/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── models.py        # Database models
│   ├── schemas.py       # Pydantic schemas
│   ├── crud.py          # Database operations
│   ├── database.py      # Database configuration
│   ├── requirements.txt # Python dependencies
│   └── .env            # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.js      # Main React component
│   │   ├── TodoItem.js # Todo item component
│   │   ├── AddTodo.js  # Add todo component
│   │   └── api.js      # API service
│   └── package.json    # Node.js dependencies
└── README.md
```

## Technologies Used

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **SQLAlchemy** - SQL toolkit and ORM
- **PostgreSQL** - Robust relational database
- **Pydantic** - Data validation using Python type annotations
- **Uvicorn** - ASGI server

### Frontend
- **React** - JavaScript library for building user interfaces
- **Axios** - HTTP client for making API requests
- **CSS3** - Modern styling with flexbox and animations

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
