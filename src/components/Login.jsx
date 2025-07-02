import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Optional

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.role === 'ADMIN') navigate('/admin');
      else navigate('/employee');
    } catch (err) {
      setError(err.response?.data || 'Login failed.');
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
            <small>Organize, assign, and track tasks efficiently.</small>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center bg-white">
          <div className="card p-4 w-100 mx-3 shadow-sm border-0">
            <h3 className="text-center text-primary fw-bold mb-4">Login</h3>

            {error && (
              <div className="alert alert-danger text-center py-2">{error}</div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={form.username}
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 mb-3">
                Login
              </button>

              <p className="text-center text-muted">
                Don’t have an account?{' '}
                <a href="/register" className="text-decoration-none text-primary">
                  Register
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;





