// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({ users: 0, doctors: 0, appointments: 0 });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const [usersRes, doctorsRes, appointmentsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/admin/users', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:5000/api/admin/doctors', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get('http://localhost:5000/api/admin/appointments', {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);
//         setStats({
//           users: usersRes.data.data.length,
//           doctors: doctorsRes.data.data.length,
//           appointments: appointmentsRes.data.data.length,
//         });
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch dashboard data');
//       }
//     };
//     fetchStats();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };

//   return (
//     <div className="container">
//       <nav className="navbar">
//         <div>Admin Dashboard</div>
//         <div>
//           <Link to="/admin/users" className="mx-2 hover:underline">Users</Link>
//           <Link to="/admin/doctors" className="mx-2 hover:underline">Doctor Approvals</Link>
//           <Link to="/admin/add-doctor" className="mx-2 hover:underline">Add Doctor</Link>
//           <Link to="/admin/appointments" className="mx-2 hover:underline">Appointments</Link>
//           <button onClick={handleLogout} className="btn">Logout</button>
//         </div>
//       </nav>
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//         <div className="card">
//           <h3 className="text-xl font-bold">Total Users</h3>
//           <p className="text-3xl">{stats.users}</p>
//           <Link to="/admin/users" className="btn mt-2">View Users</Link>
//         </div>
//         <div className="card">
//           <h3 className="text-xl font-bold">Total Doctors</h3>
//           <p className="text-3xl">{stats.doctors}</p>
//           <Link to="/admin/doctors" className="btn mt-2">View Doctors</Link>
//         </div>
//         <div className="card">
//           <h3 className="text-xl font-bold">Total Appointments</h3>
//           <p className="text-3xl">{stats.appointments}</p>
//           <Link to="/admin/appointments" className="btn mt-2">View Appointments</Link>
//         </div>
//       </div>
//       <p>Manage users, doctors, and appointments from the links above.</p>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, doctors: 0, appointments: 0 });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const [usersRes, doctorsRes, appointmentsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/doctors', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/admin/appointments', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setStats({
          users: usersRes.data.data.length,
          doctors: doctorsRes.data.data.length,
          appointments: appointmentsRes.data.data.length,
        });
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch dashboard data');
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const cardBaseStyle = {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease, transform 0.3s ease'
  };

  const handleCardHover = (e, hover = true) => {
    e.currentTarget.style.boxShadow = hover
      ? '0 6px 12px rgba(0, 0, 0, 0.15)'
      : '0 4px 6px rgba(0, 0, 0, 0.1)';
    e.currentTarget.style.transform = hover ? 'translateY(-4px)' : 'translateY(0)';
  };

  const navLinkStyle = {
    color: '#4f46e5',
    textDecoration: 'none',
    transition: 'color 0.3s ease, transform 0.3s ease'
  };

  const handleLinkHover = (e, hover = true) => {
    e.target.style.color = hover ? '#4338ca' : '#4f46e5';
  };

  const buttonStyle = {
    backgroundColor: '#ef4444',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #e6f0ff, #e0e7ff)',
      padding: '24px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <nav style={{
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        animation: 'slideInFromTop 0.5s ease-out'
      }}>
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#4f46e5'
        }}>
          Admin Dashboard
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px'
        }}>
          {['users', 'doctors', 'add-doctor', 'appointments'].map(route => (
            <Link
              key={route}
              to={`/admin/${route}`}
              style={navLinkStyle}
              onMouseOver={e => handleLinkHover(e, true)}
              onMouseOut={e => handleLinkHover(e, false)}
            >
              {route === 'users' && 'Users'}
              {route === 'doctors' && 'Doctor Approvals'}
              {route === 'add-doctor' && 'Add Doctor'}
              {route === 'appointments' && 'Appointments'}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            style={buttonStyle}
            onMouseOver={e => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={e => e.target.style.backgroundColor = '#ef4444'}
          >
            Logout
          </button>
        </div>
      </nav>

      <h2 style={{
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '24px',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        Admin Control Center
      </h2>

      {error && (
        <p style={{
          color: '#ef4444',
          backgroundColor: '#fee2e2',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center',
          animation: 'slideInFromBottom 0.5s ease-out'
        }}>
          {error}
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '24px'
      }}>
        {[
          { title: 'Total Users', value: stats.users, link: '/admin/users' },
          { title: 'Total Doctors', value: stats.doctors, link: '/admin/doctors' },
          { title: 'Total Appointments', value: stats.appointments, link: '/admin/appointments' }
        ].map((item, idx) => (
          <div
            key={item.title}
            style={{ ...cardBaseStyle, animation: `slideInFrom${['Left', 'Bottom', 'Right'][idx]} 0.5s ease-out` }}
            onMouseOver={e => handleCardHover(e, true)}
            onMouseOut={e => handleCardHover(e, false)}
          >
            <h3 style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#374151'
            }}>
              {item.title}
            </h3>
            <p style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#4f46e5',
              margin: '8px 0'
            }}>
              {item.value}
            </p>
            <Link
              to={item.link}
              style={{
                display: 'inline-block',
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease'
              }}
              onMouseOver={e => e.target.style.backgroundColor = '#4338ca'}
              onMouseOut={e => e.target.style.backgroundColor = '#4f46e5'}
            >
              View {item.title.split(' ')[1]}
            </Link>
          </div>
        ))}
      </div>

      <p style={{
        color: '#4b5563',
        textAlign: 'center',
        animation: 'fadeIn 0.5s ease-out'
      }}>
        Efficiently manage users, doctors, and appointments with the controls above. Monitor system performance and make data-driven decisions.
      </p>
    </div>
  );
};

export default AdminDashboard;
