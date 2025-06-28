// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const UserHome = ({ user }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//     navigate('/login');
//   };

//   return (
//     <div className="container">
//       <nav className="navbar">
//         <div>Welcome, {user.name}</div>
//         <div>
//           <Link to="/user/doctors">Find Doctors</Link>
//           <Link to="/user/appointments">My Appointments</Link>
//           <Link to="/user/apply-doctor">Apply as Doctor</Link>
//           <button onClick={handleLogout} className="btn">Logout</button>
//         </div>
//       </nav>
//       <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
//       <p>Book appointments or apply to become a doctor.</p>
//     </div>
//   );
// };

// export default UserHome;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserHome = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-gray-600 text-sm">Welcome back,</span>
                <p className="text-gray-900 font-semibold">{user.name}</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/user/doctors" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Find Doctors
              </Link>
              <Link 
                to="/user/appointments" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                My Appointments
              </Link>
              <Link 
                to="/user/apply-doctor" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 hover:scale-105 transform"
              >
                Apply as Doctor
              </Link>
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 hover:scale-105 transform shadow-md"
              >
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={handleLogout} 
                className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Your Health Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage your healthcare journey with ease. Book appointments with top doctors or join our medical community.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Find Doctors Card */}
          <Link to="/user/doctors" className="group">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:bg-white/80">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                Find Doctors
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Browse through our network of qualified healthcare professionals and find the perfect doctor for your needs.
              </p>
              <div className="mt-6 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                <span>Explore Doctors</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* My Appointments Card */}
          <Link to="/user/appointments" className="group">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:bg-white/80">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                My Appointments
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Keep track of your scheduled appointments, view appointment history, and manage your upcoming visits.
              </p>
              <div className="mt-6 flex items-center text-green-600 font-medium group-hover:text-green-700">
                <span>View Appointments</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Apply as Doctor Card */}
          <Link to="/user/apply-doctor" className="group">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:bg-white/80">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                Apply as Doctor
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Join our medical community as a healthcare provider. Share your expertise and help patients in need.
              </p>
              <div className="mt-6 flex items-center text-purple-600 font-medium group-hover:text-purple-700">
                <span>Start Application</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile Navigation Links */}
        <div className="md:hidden grid grid-cols-1 gap-4 mb-8">
          <Link 
            to="/user/doctors" 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center font-medium text-gray-700 hover:text-blue-600 transition-colors border border-white/20"
          >
            Find Doctors
          </Link>
          <Link 
            to="/user/appointments" 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center font-medium text-gray-700 hover:text-green-600 transition-colors border border-white/20"
          >
            My Appointments
          </Link>
          <Link 
            to="/user/apply-doctor" 
            className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center font-medium text-gray-700 hover:text-purple-600 transition-colors border border-white/20"
          >
            Apply as Doctor
          </Link>
        </div>

        {/* Stats Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Our Platform?
          </h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <p className="text-gray-600">Qualified Doctors</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">10k+</div>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;