require('dotenv').config(); // Load .env file
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../schemas/userModel');

// Connect to MongoDB Atlas using .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function addAdminUser() {
  try {
    const plainPassword = "siva@1973"; // Replace with desired password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const newUser = await User.create({
      name: "siva", // Replace with desired name
      email: "siva1973@gmail.com", // Replace with unique email
      password: hashedPassword,
      role: "admin"
    });

    console.log('New admin user added:', newUser);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error adding admin user:', error);
    mongoose.connection.close();
  }
}

addAdminUser();