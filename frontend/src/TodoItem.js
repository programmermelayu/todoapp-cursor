import React, { useState } from 'react';
import './TodoItem.css';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');
  const [editPriority, setEditPriority] = useState(todo.priority || 'medium');
  const [editDate, setEditDate] = useState(todo.date || '');

  const handleToggleComplete = () => {
    onUpdate(todo.id, { completed: !todo.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(todo.id, {
      title: editTitle,
      description: editDescription,
      priority: editPriority,
      date: editDate,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      onDelete(todo.id);
    }
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-title"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="edit-description"
          placeholder="Description (optional)"
        />
        <div className="edit-extra">
          <select
            value={editPriority}
            onChange={e => setEditPriority(e.target.value)}
            className="edit-priority"
          >
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <input
            type="date"
            value={editDate}
            onChange={e => setEditDate(e.target.value)}
            className="edit-date"
          />
        </div>
        <div className="edit-actions">
          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={handleCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggleComplete}
          className="todo-checkbox"
        />
        <div className="todo-text">
          <h3 className="todo-title">{todo.title}</h3>
          {todo.description && <p className="todo-description">{todo.description}</p>}
          <div className="todo-meta">
            {todo.date && (
              <span className="todo-date">Due: {new Date(todo.date).toLocaleDateString()}</span>
            )}
            {todo.priority && (
              <span className={`todo-priority priority-${todo.priority}`}>{todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority</span>
            )}
            <small className="todo-date">
              Created: {new Date(todo.created_at).toLocaleDateString()}
            </small>
          </div>
        </div>
      </div>
      <div className="todo-actions">
        <button onClick={handleEdit} className="edit-btn">Edit</button>
        <button onClick={handleDelete} className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
