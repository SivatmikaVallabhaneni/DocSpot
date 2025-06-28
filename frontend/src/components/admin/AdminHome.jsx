import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div>Admin Dashboard</div>
        <div>
          <Link to="/admin/users">Users</Link>
          <Link to="/admin/doctors">Doctor Approvals</Link>
          <Link to="/admin/appointments">Appointments</Link>
          <button onClick={handleLogout} className="btn">Logout</button>
        </div>
      </nav>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Manage users, doctors, and appointments.</p>
    </div>
  );
};

export default AdminHome;