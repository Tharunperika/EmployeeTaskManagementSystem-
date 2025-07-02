import React, { useState } from 'react';
import API from '../services/api';

function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({ title: '', description: '', userId: '' });

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await API.post('/admin/task', form);
      setForm({ title: '', description: '', userId: '' });
      onTaskCreated();
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  return (
    <form onSubmit={createTask} className="card p-4 shadow-sm">
      <h5 className="mb-3 text-primary">Create New Task</h5>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Assign to User ID</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter employee user ID"
          value={form.userId}
          onChange={(e) => setForm({ ...form, userId: e.target.value })}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Create Task
      </button>
    </form>
  );
}

export default TaskForm;
