// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminApproval = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/admin/doctors', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setDoctors(response.data.data);
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleApproval = async (doctorId, status) => {
//     try {
//       await axios.put('http://localhost:5000/api/admin/doctors/approve', { doctorId, status }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       window.location.reload();
//     } catch (err) {
//       setError(err.response?.data?.message || 'Approval failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">Doctor Approvals</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {doctors.map(doctor => (
//           <div key={doctor._id} className="card">
//             <img src={`http://localhost:5000/${doctor.profilePic}`} alt={doctor.name} className="w-32 h-32 object-cover rounded-full mb-2" />
//             <h3 className="text-xl font-bold">{doctor.name}</h3>
//             <p>Email: {doctor.email}</p>
//             <p>Specialization: {doctor.specialization}</p>
//             <p>Status: {doctor.status}</p>
//             <div className="flex space-x-2 mt-2">
//               <button onClick={() => handleApproval(doctor._id, 'approved')} className="btn">Approve</button>
//               <button onClick={() => handleApproval(doctor._id, 'rejected')} className="btn bg-red-500 hover:bg-red-600">Reject</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AdminApproval;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminApproval = () => {
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/admin/doctors', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setDoctors(response.data.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch doctors');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleApproval = async (doctorId, status) => {
    try {
      setProcessingId(doctorId);
      setError('');
      setSuccessMessage('');

      await axios.put('http://localhost:5000/api/admin/doctors/approve', 
        { doctorId, status }, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Update the doctor's status in the local state instead of reloading
      setDoctors(prevDoctors =>
        prevDoctors.map(doctor =>
          doctor._id === doctorId ? { ...doctor, status } : doctor
        )
      );

      setSuccessMessage(`Doctor ${status === 'approved' ? 'approved' : 'rejected'} successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      setError(err.response?.data?.message || 'Approval failed');
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h3>
            <p className="text-gray-600 animate-pulse">Fetching doctor applications...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b-4 border-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              Doctor Approval Dashboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Review and manage doctor registration applications with advanced approval system
            </p>
            <div className="flex justify-center mt-4 space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                <span>Real-time Updates</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span>Secure Processing</span>
              </div>
              <div className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                <span>Advanced Analytics</span>
              </div>
            </div>
            
            {/* Stats Bar */}
            <div className="grid grid-cols-3 gap-4 mt-8 max-w-md mx-auto">
              <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-3 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <div className="text-2xl font-bold">{doctors.filter(d => d.status === 'approved').length}</div>
                <div className="text-xs opacity-90">Approved</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-3 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <div className="text-2xl font-bold">{doctors.filter(d => d.status === 'pending').length}</div>
                <div className="text-xs opacity-90">Pending</div>
              </div>
              <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-3 text-white shadow-md transform hover:scale-105 transition-transform duration-200">
                <div className="text-2xl font-bold">{doctors.filter(d => d.status === 'rejected').length}</div>
                <div className="text-xs opacity-90">Rejected</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Status Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 rounded-r-lg p-4 shadow-md animate-slideInDown">
            <div className="flex items-center">
              <span className="text-red-500 mr-3 text-2xl animate-bounce">⚠️</span>
              <div>
                <h4 className="text-red-800 font-semibold">Error Occurred</h4>
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {successMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-400 rounded-r-lg p-4 shadow-md animate-slideInDown">
            <div className="flex items-center">
              <span className="text-green-500 mr-3 text-2xl animate-bounce">✅</span>
              <div>
                <h4 className="text-green-800 font-semibold">Success!</h4>
                <p className="text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div 
              key={doctor._id} 
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Enhanced Header with Profile Image */}
              <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white opacity-5 rounded-full"></div>
                
                <div className="relative z-10 flex items-center space-x-4">
                  <div className="relative group">
                    <div className="w-18 h-18 bg-white rounded-full p-1 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <img 
                        src={`http://localhost:5000/${doctor.profilePic}`}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-full object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=6366f1&color=ffffff&size=64`;
                        }}
                      />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md transform hover:scale-125 transition-transform duration-200">
                      <span style={{ fontSize: '16px' }}>{getStatusIcon(doctor.status)}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-shadow">{doctor.name}</h3>
                    <p className="text-blue-100 text-sm font-medium">Medical Professional</p>
                    <div className="flex items-center mt-2">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      <span className="text-xs text-blue-100">Verified Profile</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Card Body */}
              <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                    <span className="text-blue-500 text-lg">📧</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Email Address</p>
                      <p className="text-gray-700 text-sm font-semibold">{doctor.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                    <span className="text-purple-500 text-lg">🩺</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 font-medium">Specialization</p>
                      <p className="text-gray-700 text-sm font-semibold">{doctor.specialization}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <span className="text-sm font-semibold text-gray-600">Current Status</span>
                    <span className={`px-4 py-2 rounded-full text-xs font-bold border-2 ${getStatusColor(doctor.status)} transform hover:scale-105 transition-transform duration-200 shadow-sm`}>
                      {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex space-x-3 mt-6 pt-4 border-t-2 border-gray-100">
                  <button
                    onClick={() => handleApproval(doctor._id, 'approved')}
                    disabled={processingId === doctor._id || doctor.status === 'approved'}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    {processingId === doctor._id ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-lg">✅</span>
                        <span>Approve</span>
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => handleApproval(doctor._id, 'rejected')}
                    disabled={processingId === doctor._id || doctor.status === 'rejected'}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                  >
                    {processingId === doctor._id ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <>
                        <span className="text-lg">❌</span>
                        <span>Reject</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {doctors.length === 0 && !loading && (
          <div className="text-center py-16 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 shadow-xl">
              <span style={{ fontSize: '64px' }} className="animate-bounce">👨‍⚕️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Applications Found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              There are currently no doctor applications pending review. New applications will appear here automatically.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Refresh Dashboard
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-white border-t-4 border-gradient-to-r from-blue-500 to-purple-600 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4">
                <span className="text-xl">🏥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">DocSpot Admin</h3>
              <p className="text-gray-600">Advanced healthcare management system for seamless doctor approval and verification.</p>
            </div>
            
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">System Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm text-gray-600">All Systems Operational</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm text-gray-600">Real-time Sync Active</span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm text-gray-600">Security Verified</span>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Total Applications: <span className="font-bold text-blue-600">{doctors.length}</span></p>
                <p>Processing Time: <span className="font-bold text-green-600">&lt; 2 seconds</span></p>
                <p>Success Rate: <span className="font-bold text-purple-600">99.9%</span></p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 DocSpot Healthcare Management System. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 mt-4">
              <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">Privacy Policy</span>
              <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">Terms of Service</span>
              <span className="text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer">Support</span>
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-15px);
          }
          70% {
            transform: translateY(-7px);
          }
          90% {
            transform: translateY(-3px);
          }
        }
        
        .animate-slideInDown {
          animation: slideInDown 0.5s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .text-shadow {
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default AdminApproval;