import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Optional for styling

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data || 'Registration failed.');
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="row w-100 mx-3 shadow-lg rounded overflow-hidden"
        style={{ maxWidth: '1000px', minHeight: '80vh' }}
      >
        {/* Left Image + Title */}
        <div className="col-md-6 position-relative d-none d-md-block p-0">
          <img
            src="https://img.freepik.com/free-vector/project-management-concept-illustration_114360-1543.jpg"
            alt="Task Management"
            className="img-fluid h-100 w-100"
            style={{ objectFit: 'cover' }}
          />

          {/* Top-left title */}
          <div
            className="position-absolute top-0 start-0 text-white text-start p-3"
            style={{
              zIndex: 2,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderBottomRightRadius: '10px',
              maxWidth: '100%',
            }}
          >
            <h4 className="fw-bold mb-1">Employee Task Management System</h4>
            <small>Create your account to get started!</small>
          </div>
        </div>

        {/* Right Register Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="card p-4 w-100 mx-3 shadow-sm border-0">
            <h3 className="text-center text-primary fw-bold mb-4">Register</h3>

            {message && (
              <div className={`alert text-center py-2 ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleRegister}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Register
              </button>

              <p className="text-center text-muted">
                Already have an account?{' '}
                <a href="/" className="text-decoration-none text-primary">
                  Login
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;




