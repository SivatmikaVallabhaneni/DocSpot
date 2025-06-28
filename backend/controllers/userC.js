// const User = require('../schemas/userModel');
// const Appointment = require('../schemas/appointmentModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ success: false, message: 'User already exists' });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(201).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
//     res.status(200).json({ success: true, token });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('-password');
//     res.status(200).json({ success: true, data: user });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.bookAppointment = async (req, res) => {
//   try {
//     const { doctorId, date, time } = req.body;
//     const appointment = new Appointment({
//       user: req.user._id,
//       doctor: doctorId,
//       date,
//       time,
//       status: 'pending',
//     });
//     await appointment.save();
//     res.status(201).json({ success: true, message: 'Appointment booked' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };

// exports.getUserAppointments = async (req, res) => {
//   try {
//     const appointments = await Appointment.find({ user: req.user._id })
//       .populate('doctor', 'name specialization');
//     res.status(200).json({ success: true, data: appointments });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };
const User = require('../schemas/userModel');
const Doctor = require('../schemas/docModel'); // Add this import
const Appointment = require('../schemas/appointmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    const appointment = new Appointment({
      user: req.user._id,
      doctor: doctorId,
      date,
      time,
      status: 'pending',
    });
    await appointment.save();
    res.status(201).json({ success: true, message: 'Appointment booked' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate('doctor', 'name specialization');
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ADD THIS NEW FUNCTION
exports.getAllDoctors = async (req, res) => {
  try {
    // Find all doctors with status 'approved'
    const doctors = await Doctor.find({ 
      status: 'approved' 
    });

    console.log('Found approved doctors:', doctors.length); // Debug log

    res.status(200).json({
      success: true,
      data: doctors,
      message: 'Doctors fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching doctors',
      error: error.message
    });
  }
};