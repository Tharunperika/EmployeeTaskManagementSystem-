import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/employee/tasks/${user.id}`);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const completeTask = async (id) => {
    try {
      await API.put(`/employee/task/${id}/complete`);
      const updatedTasks = tasks.map((task) =>
        task.id === id ? { ...task, status: 'COMPLETED' } : task
      );
      setTasks(updatedTasks);
    } catch (err) {
      console.error('Error completing task:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const pendingTasks = tasks.filter((task) => task.status !== 'COMPLETED');
  const completedTasks = tasks.filter((task) => task.status === 'COMPLETED');

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Employee Dashboard</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Back
        </button>
      </div>

      {/* Pending Tasks */}
      <h4 className="text-info mb-3">Pending Tasks</h4>
      {pendingTasks.length === 0 ? (
        <p className="text-muted">No pending tasks.</p>
      ) : (
        <div className="row">
          {pendingTasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p>
                  Status:{' '}
                  <span className="badge bg-primary">{task.status}</span>
                </p>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => completeTask(task.id)}
                >
                  Mark as Completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      <hr className="my-5" />
      <h4 className="text-success mb-3">Completed Tasks</h4>
      {completedTasks.length === 0 ? (
        <p className="text-muted">No completed tasks yet.</p>
      ) : (
        <div className="row">
          {completedTasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm">
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <p>
                  Status: <span className="badge bg-success">COMPLETED</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;






