import React, { useEffect, useState } from 'react';
import API from '../services/api';
import TaskForm from './TaskForm';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/admin/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const res = await API.get('/admin/task-history');
      setCompletedTasks(res.data);
    } catch (err) {
      console.error('Failed to fetch completed tasks:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/admin/task/${id}`);
      fetchTasks();
      fetchCompletedTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((task) => task.status === 'PENDING').length;
  const completedCount = completedTasks.length;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Admin Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Task Stats */}
      <div className="row mb-4 text-center">
        <div className="col-md-4 mb-3">
          <div className="card bg-dark text-white p-3 shadow-sm">
            <h5>Total Tasks</h5>
            <h3>{totalTasks}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-primary text-white p-3 shadow-sm">
            <h5>Pending Tasks</h5>
            <h3>{pendingTasks}</h3>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card bg-success text-white p-3 shadow-sm">
            <h5>Completed Tasks</h5>
            <h3>{completedCount}</h3>
          </div>
        </div>
      </div>

      {/* Task Creation Form */}
      <div className="mb-4">
        <TaskForm
          onTaskCreated={() => {
            fetchTasks();
            fetchCompletedTasks();
          }}
        />
      </div>

      {/* Current Task List */}
      <h4 className="text-secondary mb-3">Active Tasks</h4>
      {tasks.length === 0 ? (
        <p className="text-muted">No tasks available.</p>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card shadow-sm p-3 border-left-primary">
                <h5>{task.title}</h5>
                <p className="mb-2">{task.description}</p>
                <p>
                  <span
                    className={`badge ${
                      task.status === 'COMPLETED' ? 'bg-success' : 'bg-warning text-dark'
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                <p>
                  <strong>Assigned to:</strong>{' '}
                  {task.assignedTo?.name || 'User ID ' + task.assignedTo?.id}
                </p>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Task Completion History */}
      <hr className="my-5" />
      <h4 className="text-secondary mb-3">Task Completion History</h4>
      {completedTasks.length === 0 ? (
        <p className="text-muted">No tasks completed yet.</p>
      ) : (
        <ul className="list-group">
          {completedTasks.map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="mb-1">{task.title}</h6>
                <small>
                  Completed by:{' '}
                  <strong>{task.assignedTo?.name || 'User ID ' + task.assignedTo?.id}</strong>
                </small>
              </div>
              <span className="badge bg-success">COMPLETED</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;

