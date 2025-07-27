import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const todoAPI = {
  // Get all todos
  getTodos: () => api.get('/todos'),
  
  // Get a single todo
  getTodo: (id) => api.get(`/todos/${id}`),
  
  // Create a new todo
  createTodo: (todo) => api.post('/todos', todo),
  
  // Update a todo
  updateTodo: (id, todo) => api.put(`/todos/${id}`, todo),
  
  // Delete a todo
  deleteTodo: (id) => api.delete(`/todos/${id}`),
};

export default api;
