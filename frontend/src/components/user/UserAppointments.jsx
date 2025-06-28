// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const UserAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [formData, setFormData] = useState({ date: '', time: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const endpoint = role === 'doctor' ? '/api/doctors/appointments' : '/api/users/appointments';
//         const response = await axios.get(`http://localhost:5000${endpoint}`, {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setAppointments(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch appointments');
//       }
//     };
//     fetchAppointments();
//   }, [role]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleBookAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/users/appointments', {
//         doctorId: localStorage.getItem('selectedDoctorId'),
//         ...formData,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       navigate('/user/appointments');
//       window.location.reload();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Booking failed');
//     }
//   };

//   const handleStatusUpdate = async (appointmentId, status) => {
//     try {
//       await axios.put('http://localhost:5000/api/doctors/appointments/status', { appointmentId, status }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       window.location.reload();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Status update failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">{role === 'doctor' ? 'Doctor Appointments' : 'My Appointments'}</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       {role !== 'doctor' && (
//         <div className="card mb-4">
//           <h3 className="text-xl font-bold mb-2">Book Appointment</h3>
//           <div className="mb-4">
//             <label className="block mb-1">Date</label>
//             <input name="date" type="date" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-1">Time</label>
//             <input name="time" type="time" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//           </div>
//           <button onClick={handleBookAppointment} className="btn">Book</button>
//         </div>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {appointments.map(appointment => (
//           <div key={appointment._id} className="card">
//             <p>Doctor: {appointment.doctor.name}</p>
//             <p>Date: {appointment.date}</p>
//             <p>Time: {appointment.time}</p>
//             <p>Status: {appointment.status}</p>
//             {role === 'doctor' && (
//               <div className="flex space-x-2 mt-2">
//                 <button onClick={() => handleStatusUpdate(appointment._id, 'approved')} className="btn">Approve</button>
//                 <button onClick={() => handleStatusUpdate(appointment._id, 'rejected')} className="btn bg-red-500 hover:bg-red-600">Reject</button>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserAppointments;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UserAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({ date: '', time: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  useEffect(() => {
    fetchAppointments();
  }, [role]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const endpoint = role === 'doctor' ? '/api/doctors/appointments' : '/api/users/appointments';
      const response = await axios.get(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setAppointments(response.data.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:5000/api/users/appointments', {
        doctorId: localStorage.getItem('selectedDoctorId'),
        ...formData,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      
      // Show success message
      setBookingSuccess(true);
      setFormData({ date: '', time: '' });
      
      // Refresh appointments without page reload
      await fetchAppointments();
      
      // Hide success message after 3 seconds
      setTimeout(() => setBookingSuccess(false), 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId, status) => {
    setLoading(true);
    try {
      await axios.put('http://localhost:5000/api/doctors/appointments/status', { appointmentId, status }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      // Refresh appointments instead of page reload
      await fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Status update failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected': return 'text-red-600 bg-red-50 border-red-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation Bar */}
        <div className="mb-6 animate-fade-in">
          <Link 
            to="/user/home" 
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-blue-200 hover:bg-blue-50"
          >
            <span className="text-xl mr-2">🏠</span>
            Dashboard
          </Link>
        </div>

        {/* Animated Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 transform hover:scale-105 transition-transform duration-300">
            {role === 'doctor' ? '👨‍⚕️ Doctor Appointments' : '📅 My Appointments'}
          </h2>
          <p className="text-gray-600 opacity-0 animate-slide-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            {role === 'doctor' ? 'Manage patient appointments' : 'Book and track your medical appointments'}
          </p>
        </div>

        {/* Animated Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-lg shadow-sm animate-shake-fade-in">
            <div className="flex items-center">
              <span className="text-xl mr-2 animate-bounce">⚠️</span>
              {error}
            </div>
          </div>
        )}

        {/* Animated Success Alert */}
        {bookingSuccess && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-lg shadow-sm animate-success-bounce">
            <div className="flex items-center">
              <span className="text-xl mr-2 animate-pulse">✅</span>
              Appointment booked successfully!
            </div>
          </div>
        )}

        {/* Booking Form with Enhanced Animations */}
        {role !== 'doctor' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="text-3xl mr-3 animate-pulse">🩺</span>
              Book New Appointment
            </h3>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.4s'}}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📅 Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none transform focus:scale-105"
                    required
                  />
                </div>
                
                <div className="transform transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.5s'}}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🕐 Time
                  </label>
                  <input
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none transform focus:scale-105"
                    required
                  />
                </div>
              </div>
              
              <button
                onClick={handleBookAppointment}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-8 rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed animate-fade-in"
                style={{animationDelay: '0.6s'}}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Booking...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="text-xl mr-2">📋</span>
                    Book
                  </span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Loading Animation */}
        {loading && appointments.length === 0 && (
          <div className="flex items-center justify-center py-12 animate-pulse">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <span className="ml-4 text-gray-600 font-medium">Loading appointments...</span>
          </div>
        )}

        {/* Animated Appointments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl p-6 border border-gray-100 transform hover:scale-105 transition-all duration-300 animate-slide-up-stagger"
              style={{
                animationDelay: `${0.7 + index * 0.1}s`,
                animationFillMode: 'forwards',
                opacity: 0
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center">
                    <span className="text-xl mr-2">👨‍⚕️</span>
                    Doctor: {appointment.doctor.name}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 hover:scale-110 ${getStatusColor(appointment.status)}`}>
                  {appointment.status?.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-gray-600 flex items-center">
                  <span className="text-lg mr-2">📅</span>
                  Date: {appointment.date}
                </p>
                <p className="text-gray-600 flex items-center">
                  <span className="text-lg mr-2">🕐</span>
                  Time: {appointment.time}
                </p>
              </div>

              {role === 'doctor' && (
                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => handleStatusUpdate(appointment._id, 'approved')}
                    disabled={loading}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(appointment._id, 'rejected')}
                    disabled={loading}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">📅</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500">
              {role === 'doctor' 
                ? 'Appointments will appear here when patients book with you.' 
                : 'Book your first appointment to get started.'}
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideUpStagger {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes successBounce {
          0% { 
            opacity: 0; 
            transform: translateY(-20px) scale(0.8); 
          }
          50% { 
            transform: translateY(5px) scale(1.05); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-up-stagger {
          animation: slideUpStagger 0.6s ease-out forwards;
        }
        
        .animate-shake-fade-in {
          animation: shake 0.5s ease-in-out, fadeIn 0.3s ease-out;
        }
        
        .animate-success-bounce {
          animation: successBounce 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default UserAppointments;