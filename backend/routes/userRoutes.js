const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, bookAppointment, getUserAppointments,getAllDoctors } = require('../controllers/userC');
const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.post('/appointments', protect, bookAppointment);
router.get('/appointments', protect, getUserAppointments);

router.get('/doctors', protect, getAllDoctors);
module.exports = router;