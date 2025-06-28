const Doctor = require('../schemas/docModel');
const Appointment = require('../schemas/appointmentModel');

exports.applyDoctor = async (req, res) => {
  try {
    const { name, email, specialization, experience, feePerConsultation } = req.body;
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;
    const doctor = new Doctor({
      name,
      email,
      specialization,
      experience,
      feePerConsultation,
      profilePic,
      status: 'pending',
      userId: req.user._id,
    });
    await doctor.save();
    res.status(201).json({ success: true, message: 'Doctor application submitted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.user._id })
      .populate('user', 'name email');
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};