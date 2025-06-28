// const express = require('express');
// const router = express.Router();
// const { applyDoctor, getDoctorAppointments, updateAppointmentStatus } = require('../controllers/doctorC');
// const { protect, doctor } = require('../middlewares/authMiddleware');
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// const upload = multer({ storage });

// router.post('/apply', protect, upload.single('profilePic'), applyDoctor);
// router.get('/appointments', protect, doctor, getDoctorAppointments);
// router.put('/appointments/status', protect, doctor, updateAppointmentStatus);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { applyDoctor, getDoctorAppointments, updateAppointmentStatus } = require('../controllers/doctorC');
const { protect, doctor } = require('../middlewares/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

router.post('/apply', protect, upload.single('profilePic'), applyDoctor);
router.get('/appointments', protect, doctor, getDoctorAppointments);
router.put('/appointments/status', protect, doctor, updateAppointmentStatus);

module.exports = router;