// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AddDoctor = () => {
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
//       await axios.post('http://localhost:5000/api/admin/doctors', data, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/admin/doctors');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to add doctor');
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="text-2xl font-bold mb-4">Add Doctor</h2>
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
//         <button onClick={handleSubmit} className="btn">Add Doctor</button>
//       </div>
//     </div>
//   );
// };

// export default AddDoctor;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, User, Mail, Stethoscope, Calendar, DollarSign, Camera, AlertCircle } from 'lucide-react';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialization: '',
    experience: '',
    feePerConsultation: '',
    profilePic: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
    if (error) setError('');
    if (success) setSuccess(false);
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'profilePic' && formData[key]) data.append(key, formData[key]);
      else if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:5000/api/admin/doctors', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      resetForm();
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add doctor');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Add Doctor
          </h2>
          <p className="text-gray-600 mt-2">Fill in the details to add a new doctor to the system</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm animate-slide-down">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-3 animate-bounce" />
              <p className="text-green-700 font-medium">Doctor added successfully!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm animate-shake">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-slide-up">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                Full Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md"
                placeholder="Enter doctor's full name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md"
                placeholder="doctor@example.com"
                required
              />
            </div>

            {/* Specialization Field */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Stethoscope className="w-4 h-4 mr-2 text-blue-500" />
                Specialization
              </label>
              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md"
                placeholder="e.g., Cardiology, Dermatology"
                required
              />
            </div>

            {/* Experience and Fee Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Experience (Years)
                </label>
                <input
                  name="experience"
                  type="number"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md"
                  placeholder="5"
                  required
                />
              </div>

              <div className="group">
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4 mr-2 text-blue-500" />
                  Fee per Consultation
                </label>
                <input
                  name="feePerConsultation"
                  type="number"
                  value={formData.feePerConsultation}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md"
                  placeholder="500"
                  required
                />
              </div>
            </div>

            {/* Profile Picture Field */}
            <div className="group">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Camera className="w-4 h-4 mr-2 text-blue-500" />
                Profile Picture
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="profilePic"
                  onChange={handleFileChange}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50/50 hover:bg-white group-hover:shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  accept="image/*"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 active:scale-[0.98]'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                  Adding Doctor...
                </div>
              ) : (
                'Add Doctor'
              )}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddDoctor;