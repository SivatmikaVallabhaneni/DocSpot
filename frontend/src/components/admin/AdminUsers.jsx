// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/users', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setUsers(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch users');
//       }
//     };
//     fetchUsers();
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {users.map(user => (
//           <div key={user._id} className="card">
//             <h3 className="text-xl font-bold">{user.name}</h3>
//             <p>Email: {user.email}</p>
//             <p>Role: {user.role}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #0f172a, #4c1d95, #0f172a)',
      padding: '32px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Animated Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          animation: 'fade-in 0.8s ease-out'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #60a5fa, #a78bfa, #f472b6)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '16px',
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite'
          }}>
            Manage Users
          </h1>
          <div style={{
            width: '128px',
            height: '4px',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            margin: '0 auto',
            borderRadius: '9999px',
            opacity: '0.8',
            animation: 'pulse 2s ease-in-out infinite'
          }}></div>
        </div>

        {/* Enhanced Error Display */}
        {error && (
          <div style={{
            marginBottom: '32px',
            animation: 'slide-down 0.6s ease-out'
          }}>
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              color: '#fca5a5',
              padding: '24px',
              borderRadius: '16px',
              boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease',
              transform: 'scale(1)',
              ':hover': { transform: 'scale(1.05)' }
            }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  backgroundColor: '#ef4444',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }} >!</span>
                </div>
                <span style={{ fontWeight: '500' }}>{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Users Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '32px'
        }}>
          {users.map((user, index) => (
            <div 
              key={user.id || index}
              style={{
                position: 'relative',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                padding: '32px',
                boxShadow: '0 10px 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.5s ease-out',
                animation: `fade-in-up 0.8s ease-out ${index * 150}ms both`,
                overflow: 'hidden'
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.2)';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.05)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              {/* Animated Background Gradient */}
              <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                bottom: '0',
                background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(244, 114, 182, 0.1))',
                opacity: '0',
                transition: 'opacity 0.5s ease',
                borderRadius: '24px'
              }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0'}></div>
              
              {/* Floating Orbs */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                width: '80px',
                height: '80px',
                background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2))',
                borderRadius: '50%',
                filter: 'blur(20px)',
                opacity: '0',
                transition: 'all 0.7s ease',
                animation: 'float 6s ease-in-out infinite'
              }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0'}></div>
              <div style={{
                position: 'absolute',
                bottom: '-16px',
                left: '-16px',
                width: '64px',
                height: '64px',
                background: 'linear-gradient(to bottom right, rgba(244, 114, 182, 0.2), rgba(59, 130, 246, 0.2))',
                borderRadius: '50%',
                filter: 'blur(20px)',
                opacity: '0',
                transition: 'all 0.7s ease',
                animation: 'float-delayed 6s ease-in-out infinite 2s'
              }} onMouseOver={e => e.currentTarget.style.opacity = '1'} onMouseOut={e => e.currentTarget.style.opacity = '0'}></div>
              
              <div style={{ position: 'relative', zIndex: '10' }}>
                {/* User Avatar */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(to bottom right, #3b82f6, #7c3aed)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  transition: 'transform 0.3s ease',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                }} onMouseOver={e => e.currentTarget.style.transform = 'rotate(12deg)'} onMouseOut={e => e.currentTarget.style.transform = 'rotate(0)'}>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>

                {/* User Name */}
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '16px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }} onMouseOver={e => {
                  e.currentTarget.style.color = 'transparent';
                  e.currentTarget.style.background = 'linear-gradient(to right, #60a5fa, #a78bfa)';
                  e.currentTarget.style.WebkitBackgroundClip = 'text';
                  e.currentTarget.style.backgroundClip = 'text';
                }} onMouseOut={e => {
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.background = 'none';
                }}>
                  {user.name}
                </h3>

                {/* User Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }} onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)'} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#60a5fa',
                      borderRadius: 
                      '50%',
                      marginRight: '12px',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></div>
                    <div>
                      <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500' }}>Email:</span>
                      <p style={{ color: 'white', fontWeight: '500' }}>{user.email}</p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    transition: 'all 0.3s ease'
                  }} onMouseOver={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: '#a78bfa',
                      borderRadius: '50%',
                      marginRight: '12px',
                      animation: 'pulse 2s ease-in-out infinite'
                    }}></div>
                    <div>
                      <span style={{ color: '#9ca3af', fontSize: '14px', fontWeight: '500' }}>Role:</span>
                      <p style={{ color: 'white', fontWeight: '500', textTransform: 'capitalize' }}>{user.role}</p>
                    </div>
                  </div>
                </div>

                {/* Hover Shine Effect */}
                <div style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.05), transparent)',
                  transform: 'skewX(-12deg) translateX(-200%)',
                  transition: 'transform 1s ease-out'
                }} onMouseOver={e => e.currentTarget.style.transform = 'skewX(-12deg) translateX(200%)'} onMouseOut={e => e.currentTarget.style.transform = 'skewX(-12deg) translateX(-200%)'}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {users.length === 0 && !error && (
          <div style={{
            textAlign: 'center',
            padding: '80px 0',
            animation: 'fade-in 0.8s ease-out'
          }}>
            <div style={{
              width: '128px',
              height: '128px',
              background: 'linear-gradient(to bottom right, #4b5563, #1f2937)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              <span style={{ fontSize: '48px' }}>👥</span>
            </div>
            <p style={{ color: '#9ca3af', fontSize: '20px' }}>No users found</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(5deg); }
          66% { transform: translateY(5px) rotate(-3deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(8px) rotate(-4deg); }
          66% { transform: translateY(-6px) rotate(2deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default AdminUsers;