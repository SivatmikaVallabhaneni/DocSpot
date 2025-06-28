// const Doctor = require('../schemas/docModel');
// const User = require('../schemas/userModel');
// const Appointment = require('../schemas/appointmentModel');

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({ success: true, data: users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.getAllDoctors = async (req, res) => {
//   try {
//     const doctors = await Doctor.find();
//     res.status(200).json({ success: true, data: doctors });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.approveDoctor = async (req, res) => {
//   try {
//     const { doctorId, status } = req.body;
//     const doctor = await Doctor.findByIdAndUpdate(
//       doctorId,
//       { status },
//       { new: true }
//     );
//     if (!doctor) {
//       return res.status(404).json({ success: false, message: 'Doctor not found' });
//     }
//     res.status(200).json({ success: true, data: doctor });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.getAllAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find()
//       .populate('user', 'name email')
//       .populate('doctor', 'name specialization');
//     res.status(200).json({ success: true, data: appointments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

const User = require('../schemas/userModel');
const Doctor = require('../schemas/docModel');
const Appointment = require('../schemas/appointmentModel');
const multer = require('multer');
const path = require('path');

// Multer storage configuration for doctor profile pictures
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

exports.getAllUsers = async (req, res) => {
  try {
    console.log('Fetching all users for admin:', req.user._id);
    const users = await User.find();
    console.log('Users retrieved:', users.length);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Get users error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllDoctors = async (req, res) => {
  try {
    console.log('Fetching all doctors for admin:', req.user._id);
    const doctors = await Doctor.find();
    console.log('Doctors retrieved:', doctors.length);
    res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error('Get doctors error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.approveDoctor = async (req, res) => {
  try {
    console.log('Approve doctor request:', req.body);
    const { doctorId, status } = req.body;
    if (!doctorId || !status) {
      console.log('Missing fields:', { doctorId, status });
      return res.status(400).json({ success: false, message: 'Doctor ID and status required' });
    }
    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { status },
      { new: true }
    );
    if (!doctor) {
      console.log('Doctor not found:', doctorId);
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    console.log('Doctor updated:', doctor._id, 'Status:', status);
    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    console.error('Approve doctor error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    console.log('Fetching all appointments for admin:', req.user._id);
    const appointments = await Appointment.find().populate('user doctor');
    console.log('Appointments retrieved:', appointments.length);
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    console.error('Get appointments error:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.addDoctor = [
  upload.single('profilePic'),
  async (req, res) => {
    try {
      console.log('Add doctor request:', { body: req.body, file: req.file });
      const { name, email, specialization, experience, feePerConsultation } = req.body;
      if (!name || !email || !specialization || !experience || !feePerConsultation || !req.file) {
        console.log('Missing fields:', { name, email, specialization, experience, feePerConsultation, file: !!req.file });
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
      const doctor = new Doctor({
        userId: req.user._id, // Admin user ID
        name,
        email,
        specialization,
        experience,
        feePerConsultation,
        profilePic: req.file.path,
        status: 'approved',
      });
      await doctor.save();
      console.log('Doctor added:', doctor._id);
      res.status(201).json({ success: true, message: 'Doctor added successfully', data: doctor });
    } catch (error) {
      console.error('Add doctor error:', error.message);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  },
];

module.exports = {
  getAllUsers: exports.getAllUsers,
  getAllDoctors: exports.getAllDoctors,
  approveDoctor: exports.approveDoctor,
  getAllAppointments: exports.getAllAppointments,
  addDoctor: exports.addDoctor,
};
