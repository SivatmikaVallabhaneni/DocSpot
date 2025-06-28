// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ApplyDoctor = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     specialization: '',
//     experience: '',
//     feePerConsultation: '',
//     profilePic: null,
//   });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, profilePic: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData();
//     Object.keys(formData).forEach(key => {
//       if (key === 'profilePic' && formData[key]) data.append(key, formData[key]);
//       else if (formData[key]) data.append(key, formData[key]);
//     });

//     try {
//       await axios.post('http://localhost:5000/api/doctors/apply', data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/user/home');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Application failed');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">Apply as Doctor</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <div className="card">
//         <div className="mb-4">
//           <label className="block mb-1">Name</label>
//           <input name="name" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Email</label>
//           <input name="email" type="email" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Specialization</label>
//           <input name="specialization" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Experience (Years)</label>
//           <input name="experience" type="number" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Fee per Consultation</label>
//           <input name="feePerConsultation" type="number" onChange={handleInputChange} className="w-full p-2 border rounded" required />
//         </div>
//         <div className="mb-4">
//           <label className="block mb-1">Profile Picture</label>
//           <input type="file" name="profilePic" onChange={handleFileChange} className="w-full p-2 border rounded" required />
//         </div>
//         <button onClick={handleSubmit} className="btn">Submit Application</button>
//       </div>
//     </div>
//   );
// };

// export default ApplyDoctor;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ApplyDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    experience: '',
    feePerConsultation: '',
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    if (error) setError('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Validate file
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024; // 5MB
      
      if (!allowedTypes.includes(file.type)) {
        setError('Please upload only JPG, JPEG, or PNG images');
        return;
      }
      
      if (file.size > maxSize) {
        setError('File size should be less than 5MB');
        return;
      }
    }
    
    setFormData({ ...formData, profilePic: file });
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.specialization.trim()) {
      setError('Specialization is required');
      return false;
    }
    if (!formData.experience || formData.experience < 0) {
      setError('Valid experience is required');
      return false;
    }
    if (!formData.feePerConsultation || formData.feePerConsultation < 0) {
      setError('Valid consultation fee is required');
      return false;
    }
    if (!formData.profilePic) {
      setError('Profile picture is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Create FormData object
      const data = new FormData();
      
      // Append all form fields
      data.append('name', formData.name.trim());
      data.append('email', formData.email.trim());
      data.append('specialization', formData.specialization.trim());
      data.append('experience', formData.experience);
      data.append('feePerConsultation', formData.feePerConsultation);
      
      if (formData.profilePic) {
        data.append('profilePic', formData.profilePic);
      }

      // Debug: Log what we're sending
      console.log('Sending data to backend:');
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please login again.');
        navigate('/login');
        return;
      }

      console.log('Making request to:', 'http://localhost:5000/api/doctors/apply');
      console.log('With token:', token);

      const response = await axios.post('http://localhost:5000/api/doctors/apply', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response received:', response.data);

      setSuccess('Application submitted successfully! You will be notified once it\'s reviewed.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        specialization: '',
        experience: '',
        feePerConsultation: '',
        profilePic: null,
      });
      
      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';

      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate('/user/home');
      }, 2000);

    } catch (err) {
      console.error('Error submitting application:', err);
      console.error('Error response:', err.response);
      
      if (err.response?.status === 401) {
        setError('Authentication failed. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Invalid form data. Please check all fields.');
      } else if (err.response?.status === 409) {
        setError('You have already applied as a doctor or are already a doctor.');
      } else {
        setError(err.response?.data?.message || 'Application failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Header with Animation */}
        <nav className="mb-8 animate-slide-down">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                <span className="text-4xl mr-3 animate-pulse">👨‍⚕️</span>
                Apply as Doctor
              </h1>
              <div className="flex gap-4">
                <Link 
                  to="/user/home" 
                  className="inline-flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-blue-600"
                >
                  <span className="text-lg mr-2">🏠</span>
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="inline-flex items-center px-6 py-3 bg-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-red-600"
                >
                  <span className="text-lg mr-2">🚪</span>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message with Animation */}
        {success && (
          <div className="mb-6 p-6 bg-green-50 border-l-4 border-green-400 text-green-700 rounded-xl shadow-lg animate-success-bounce">
            <div className="flex items-center">
              <span className="text-2xl mr-3 animate-bounce">✅</span>
              <p className="font-semibold">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message with Animation */}
        {error && (
          <div className="mb-6 p-6 bg-red-50 border-l-4 border-red-400 text-red-700 rounded-xl shadow-lg animate-shake-fade-in">
            <div className="flex items-center">
              <span className="text-2xl mr-3 animate-bounce">⚠️</span>
              <p className="font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* Application Form with Enhanced Animation */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Application Form</h2>
            <p className="text-gray-600">Fill in your details to join our medical team</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="animate-slide-in-left" style={{animationDelay: '0.3s'}}>
                <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                  <span className="text-xl mr-2">👤</span>
                  Full Name *
                </label>
                <input 
                  name="name" 
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange} 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 transform focus:scale-105" 
                  placeholder="Enter your full name"
                  required 
                />
              </div>

              {/* Email Field */}
              <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
                <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                  <span className="text-xl mr-2">📧</span>
                  Email Address *
                </label>
                <input 
                  name="email" 
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange} 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 transform focus:scale-105" 
                  placeholder="Enter your email"
                  required 
                />
              </div>

              {/* Specialization Field */}
              <div className="animate-slide-in-left" style={{animationDelay: '0.5s'}}>
                <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                  <span className="text-xl mr-2">🩺</span>
                  Specialization *
                </label>
                <input 
                  name="specialization" 
                  type="text"
                  value={formData.specialization}
                  onChange={handleInputChange} 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 transform focus:scale-105" 
                  placeholder="e.g., Cardiology, Dermatology"
                  required 
                />
              </div>

              {/* Experience Field */}
              <div className="animate-slide-in-right" style={{animationDelay: '0.6s'}}>
                <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                  <span className="text-xl mr-2">⏱️</span>
                  Experience (Years) *
                </label>
                <input 
                  name="experience" 
                  type="number" 
                  min="0"
                  max="50"
                  value={formData.experience}
                  onChange={handleInputChange} 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 transform focus:scale-105" 
                  placeholder="Years of experience"
                  required 
                />
              </div>
            </div>

            {/* Fee Field */}
            <div className="mt-6 animate-slide-in-up" style={{animationDelay: '0.7s'}}>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                <span className="text-xl mr-2">💰</span>
                Fee per Consultation (₹) *
              </label>
              <input 
                name="feePerConsultation" 
                type="number" 
                min="0"
                value={formData.feePerConsultation}
                onChange={handleInputChange} 
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 transform focus:scale-105" 
                placeholder="Consultation fee in rupees"
                required 
              />
            </div>

            {/* Profile Picture Field */}
            <div className="mt-6 animate-slide-in-up" style={{animationDelay: '0.8s'}}>
              <label className="block text-gray-700 font-semibold mb-3 flex items-center">
                <span className="text-xl mr-2">📸</span>
                Profile Picture *
              </label>
              <div className="relative">
                <input 
                  type="file" 
                  name="profilePic" 
                  onChange={handleFileChange} 
                  accept="image/jpeg,image/jpg,image/png"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                  required 
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 flex items-center">
                <span className="text-sm mr-1">ℹ️</span>
                Upload JPG, JPEG, or PNG (max 5MB)
              </p>
              {formData.profilePic && (
                <p className="text-sm text-green-600 mt-2 flex items-center animate-bounce">
                  <span className="text-sm mr-1">✅</span>
                  Selected: {formData.profilePic.name}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-6 mt-8 animate-slide-in-up" style={{animationDelay: '0.9s'}}>
              <button 
                type="submit" 
                disabled={loading}
                className={`flex-1 py-4 px-8 rounded-xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 active:scale-95 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <span className="text-xl mr-2">📋</span>
                    Submit Application
                  </span>
                )}
              </button>
              
              <Link 
                to="/user/home" 
                className="flex-1 py-4 px-8 rounded-xl text-white font-bold text-lg text-center bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 shadow-lg transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl flex items-center justify-center"
              >
                <span className="text-xl mr-2">❌</span>
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { 
            opacity: 0; 
            transform: translateY(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0; 
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0; 
            transform: translateX(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
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
        
        .animate-slide-down {
          animation: slideDown 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-shake-fade-in {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-success-bounce {
          animation: successBounce 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ApplyDoctor;