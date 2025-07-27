import React, { useState } from 'react';
import './AddTodo.css';

const AddTodo = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [priority, setPriority] = useState('medium');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        title: title.trim(),
        description: description.trim() || null,
        priority,
        date: date || null,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDate('');
      setIsExpanded(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="add-todo">
      <form onSubmit={handleSubmit}>
        <div className="add-todo-input-group">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="add-todo-title"
            onFocus={handleExpand}
          />
          {isExpanded && (
            <>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="add-todo-description"
              />
              <div className="add-todo-extra">
                <select
                  value={priority}
                  onChange={e => setPriority(e.target.value)}
                  className="add-todo-priority"
                >
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="add-todo-date"
                />
              </div>
              <div className="add-todo-actions">
                <button type="submit" className="add-btn" disabled={!title.trim()}>
                  Add Todo
                </button>
                <button type="button" onClick={handleCollapse} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
