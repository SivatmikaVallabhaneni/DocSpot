
// const express = require('express');
// const router = express.Router();
// const { getAllUsers, getAllDoctors, approveDoctor, getAllAppointments } = require('../controllers/adminC');
// const { protect, admin } = require('../middlewares/authMiddleware');

// router.get('/users', protect, admin, getAllUsers);
// router.get('/doctors', protect, admin, getAllDoctors);
// router.put('/doctors/approve', protect, admin, approveDoctor);
// router.get('/appointments', protect, admin, getAllAppointments);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getAllUsers, getAllDoctors, approveDoctor, getAllAppointments, addDoctor } = require('../controllers/adminC');
const { protect, admin } = require('../middlewares/authMiddleware');

router.get('/users', protect, admin, getAllUsers);
router.get('/doctors', protect, admin, getAllDoctors);
router.put('/doctors/approve', protect, admin, approveDoctor);
router.get('/appointments', protect, admin, getAllAppointments);
router.post('/doctors', protect, admin, addDoctor);

module.exports = router;