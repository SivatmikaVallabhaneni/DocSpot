// import React from 'react';
// import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="container">
//       <h1 className="text-3xl font-bold mb-4">Welcome to DocSpot</h1>
//       <p className="mb-4">Book appointments with top doctors or apply to join our platform.</p>
//       <div className="flex space-x-4">
//         <Link to="/login" className="btn">Login</Link>
//         <Link to="/register" className="btn">Register</Link>
//       </div>
//     </div>
//   );
// };

// export default Home;
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredDoctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9,
      experience: "15+ years"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist", 
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8,
      experience: "12+ years"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      image: "https://pbs.twimg.com/profile_images/1670951320549834752/Vm6BF8V4_400x400.jpg",
      rating: 4.9,
      experience: "10+ years"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      rating: 4.7,
      experience: "18+ years"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to <span className="text-blue-600">DocSpot</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect with top healthcare professionals and get the medical care you deserve. 
            Book appointments instantly or join our network of trusted doctors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
            >
              Register
            </Link>
            
          </div>
        </div>

        {/* Featured Doctors Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Meet Our Top Doctors
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Experienced healthcare professionals ready to serve you
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-md">
                    <span className="text-yellow-500 font-semibold">⭐ {doctor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm mb-4">{doctor.experience} experience</p>
                  
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality Healthcare</h3>
            <p className="text-gray-600">Access to verified and experienced medical professionals</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Booking</h3>
            <p className="text-gray-600">Book appointments quickly and manage your schedule easily</p>
          </div>
          
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure & Private</h3>
            <p className="text-gray-600">Your medical information is protected with top-level security</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of patients who trust DocSpot for their healthcare needs
          </p>
          <Link 
            to="/register" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
