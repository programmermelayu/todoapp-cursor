import React, { useEffect, useState } from 'react';
import { todoAPI } from './api';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${theme}-theme`);
  }, [theme]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await todoAPI.getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const createTodo = async (todo) => {
    try {
      const response = await todoAPI.createTodo(todo);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const updateTodo = async (id, changes) => {
    try {
      const response = await todoAPI.updateTodo(id, changes);
      setTodos(todos.map(todo => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoAPI.deleteTodo(id);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      <div className="header-with-logo">
        <img src="/bitcoin.svg" alt="Bitcoin Logo" className="bitcoin-logo" />
        <h1>Bitcoiner's Todo List</h1>
      </div>
      <AddTodo onAdd={createTodo} />
      <div className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onUpdate={updateTodo} onDelete={deleteTodo} />
        ))}
      </div>
    </div>
  );
}

export default App;
