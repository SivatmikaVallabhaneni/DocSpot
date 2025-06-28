// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/appointments', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setAppointments(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch appointments');
//       }
//     };
//     fetchAppointments();
//   }, []);

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">All Appointments</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {appointments.map(appointment => (
//           <div key={appointment._id} className="card">
//             <p>User: {appointment.user.name}</p>
//             <p>Doctor: {appointment.doctor.name}</p>
//             <p>Date: {appointment.date}</p>
//             <p>Time: {appointment.time}</p>
//             <p>Status: {appointment.status}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminAppointments;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Clock, User, UserCheck, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/appointments', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        setAppointments(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch appointments');
      }
    };

    fetchAppointments();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105";
    
    switch (status) {
      case 'confirmed':
        return `${baseClasses} bg-emerald-100 text-emerald-800 border border-emerald-200 hover:bg-emerald-200`;
      case 'pending':
        return `${baseClasses} bg-amber-100 text-amber-800 border border-amber-200 hover:bg-amber-200`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200 hover:bg-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            All Appointments
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full animate-pulse"></div>
        </div>

        {/* Enhanced Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm transform transition-all duration-300 hover:scale-105">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2 animate-bounce" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Enhanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment, index) => (
            <div
              key={appointment._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 border border-gray-100 overflow-hidden"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Card Header Gradient */}
              <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              {/* Card Content */}
              <div className="p-6 space-y-4">
                {/* User Info */}
                <div className="flex items-center space-x-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Patient</p>
                    <p className="text-lg font-semibold text-gray-800">{appointment.user.name}</p>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex items-center space-x-3 group-hover:scale-105 transition-transform duration-300">
                  <div className="p-2 bg-green-100 rounded-full">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Doctor</p>
                    <p className="text-lg font-semibold text-gray-800">{appointment.doctor.name}</p>
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium text-gray-700">{appointment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm font-medium text-gray-700">{appointment.time}</p>
                    </div>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="pt-2 border-t border-gray-100">
                  <div className={getStatusBadge(appointment.status)}>
                    {getStatusIcon(appointment.status)}
                    <span className="capitalize">{appointment.status}</span>
                  </div>
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminAppointments;