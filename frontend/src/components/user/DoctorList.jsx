// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const DoctorList = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/users/doctors', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setDoctors(response.data.data.filter(doctor => doctor.status === 'approved'));
//       } catch (err) {
//         setError(err.response?.data?.message || 'Failed to fetch doctors');
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const handleBookAppointment = (doctorId) => {
//     localStorage.setItem('selectedDoctorId', doctorId);
//     navigate('/user/appointments');
//   };

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">Find a Doctor</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {doctors.map(doctor => (
//           <div key={doctor._id} className="card">
//             <img src={`http://localhost:5000/${doctor.profilePic}`} alt={doctor.name} className="w-32 h-32 object-cover rounded-full mb-2" />
//             <h3 className="text-xl font-bold">{doctor.name}</h3>
//             <p>Specialization: {doctor.specialization}</p>
//             <p>Experience: {doctor.experience} years</p>
//             <p>Fee: ${doctor.feePerConsultation}</p>
//             <button onClick={() => handleBookAppointment(doctor._id)} className="btn mt-2">Book Appointment</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DoctorList;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please login again.');
          navigate('/login');
          return;
        }

        console.log('Fetching doctors...'); // Debug log
        
        const response = await axios.get('http://localhost:5000/api/users/doctors', {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });

        console.log('API Response:', response); // Debug log
        
        // Handle different response structures
        let doctorsData = [];
        if (response.data && response.data.data) {
          doctorsData = response.data.data;
        } else if (response.data && Array.isArray(response.data)) {
          doctorsData = response.data;
        } else {
          console.error('Unexpected response structure:', response.data);
          setError('Unexpected response format from server');
          return;
        }

        // Filter approved doctors
        const approvedDoctors = doctorsData.filter(doctor => doctor.status === 'approved');
        console.log('Approved doctors:', approvedDoctors); // Debug log
        
        setDoctors(approvedDoctors);
        
        if (approvedDoctors.length === 0) {
          setError('No approved doctors found at the moment.');
        }
        
      } catch (err) {
        console.error('Error fetching doctors:', err); // Debug log
        
        if (err.response) {
          // Server responded with error status
          const errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
          setError(errorMessage);
          
          // Handle specific error codes
          if (err.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/login');
          }
        } else if (err.request) {
          // Network error
          setError('Network error. Please check if the server is running on http://localhost:5000');
        } else {
          // Other error
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [navigate]);

  const handleBookAppointment = (doctorId) => {
    localStorage.setItem('selectedDoctorId', doctorId);
    navigate('/user/appointments');
  };

  if (loading) {
    return (
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Find a Doctor</h2>
        <p>Loading doctors...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Find a Doctor</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {doctors.length === 0 && !error && (
        <p className="text-gray-500">No doctors available at the moment.</p>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map(doctor => (
          <div key={doctor._id} className="card border rounded-lg p-4 shadow-md">
            <div className="flex flex-col items-center">
              {doctor.profilePic ? (
                <img 
                  src={`http://localhost:5000/${doctor.profilePic}`} 
                  alt={doctor.name} 
                  className="w-32 h-32 object-cover rounded-full mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
                  }}
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              
              <h3 className="text-xl font-bold text-center">{doctor.name}</h3>
              <p className="text-gray-600">Specialization: {doctor.specialization || 'Not specified'}</p>
              <p className="text-gray-600">Experience: {doctor.experience || 0} years</p>
              <p className="text-gray-600">Fee: ${doctor.feePerConsultation || 'Not specified'}</p>
              
              <button 
                onClick={() => handleBookAppointment(doctor._id)} 
                className="btn bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;