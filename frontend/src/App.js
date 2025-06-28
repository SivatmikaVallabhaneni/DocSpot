
  import React, { useState, useEffect } from 'react';
     import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
     import axios from 'axios';
     import Home from './components/common/Home';
     import Login from './components/common/Login';
     import Register from './components/common/Register';
     import UserHome from './components/user/UserHome';
     import ApplyDoctor from './components/user/ApplyDoctor';
     import DoctorList from './components/user/DoctorList';
     import UserAppointments from './components/user/UserAppointments';
     import AdminDashboard from './components/admin/AdminDashboard';
     import AdminUsers from './components/admin/AdminUsers';
     import AdminApproval from './components/admin/AdminApproval';
     import AddDoctor from './components/user/AddDoctor';
     import AdminAppointments from './components/admin/AdminAppointments';
     import Notification from './components/common/Notification';
     import './App.css';

     const App = () => {
       const [user, setUser] = useState(null);
       const navigate = useNavigate();

       useEffect(() => {
         const token = localStorage.getItem('token');
         const role = localStorage.getItem('role');
         if (token) {
           axios.get('http://localhost:5000/api/users/profile', {
             headers: { Authorization: `Bearer ${token}` },
           })
             .then(response => {
               setUser({ ...response.data.data, role });
             })
             .catch(() => {
               localStorage.removeItem('token');
               localStorage.removeItem('role');
               navigate('/login');
             });
         }
       }, [navigate]);

       return (
         <div className="min-h-screen bg-gray-100">
           <Notification />
           <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login setUser={setUser} />} />
             <Route path="/register" element={<Register />} />
             <Route path="/user/home" element={user && user.role === 'user' ? <UserHome user={user} /> : <Navigate to="/login" />} />
             <Route path="/user/apply-doctor" element={user && user.role === 'user' ? <ApplyDoctor /> : <Navigate to="/login" />} />
             <Route path="/user/doctors" element={user && user.role === 'user' ? <DoctorList /> : <Navigate to="/login" />} />
             <Route path="/user/appointments" element={user && user.role === 'user' ? <UserAppointments /> : <Navigate to="/login" />} />
             <Route path="/admin/home" element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/login" />} />
             <Route path="/admin/users" element={user && user.role === 'admin' ? <AdminUsers /> : <Navigate to="/login" />} />
             <Route path="/admin/doctors" element={user && user.role === 'admin' ? <AdminApproval /> : <Navigate to="/login" />} />
             <Route path="/admin/add-doctor" element={user && user.role === 'admin' ? <AddDoctor /> : <Navigate to="/login" />} />
             <Route path="/admin/appointments" element={user && user.role === 'admin' ? <AdminAppointments /> : <Navigate to="/login" />} />
             <Route path="/doctor/appointments" element={user && user.role === 'doctor' ? <UserAppointments /> : <Navigate to="/login" />} />
           </Routes>
         </div>
       );
     };

     export default App;