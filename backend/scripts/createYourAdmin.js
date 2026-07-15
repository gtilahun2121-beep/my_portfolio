const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Your email and password
    const email = 'gtilahun2121@gmail.com';
    const password = '12345678';

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('⚠️  User already exists!');
      console.log('Email:', email);
      
      // Update password
      const hashedPassword = await bcrypt.hash(password, 12);
      existingUser.password = hashedPassword;
      existingUser.role = 'ADMIN';
      await existingUser.save();
      
      console.log('✅ Password updated!');
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create admin user
      const admin = new User({
        name: 'Getnet Tilahun',
        email: email,
        password: hashedPassword,
        role: 'ADMIN'
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
    }

    console.log('');
    console.log('📧 Email: gtilahun2121@gmail.com');
    console.log('🔑 Password: 12345678');
    console.log('');
    console.log('You can now login at: http://localhost:3000/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
