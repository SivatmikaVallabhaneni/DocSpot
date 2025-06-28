// const express = require('express');
// const dotenv = require('dotenv');
// const connectToDB = require('./config/connectToDB');
// const userRoutes = require('./routes/userRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// const path = require('path');

// dotenv.config();
// const app = express();

// // Connect to MongoDB Atlas
// connectToDB();

// // Middleware
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Routes
// app.use('/api/users', userRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/admin', adminRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const dotenv = require('dotenv');
const connectToDB = require('./config/connectToDB');
const userRoutes = require('./routes/userRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const adminRoutes = require('./routes/adminRoutes');
const path = require('path');
const cors = require('cors');

dotenv.config();
const app = express();

connectToDB();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));