const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');  // Assuming User is defined in the index.js

// Register a new user
const registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  
  try {
    // Check if username already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // ✅ Fix: Ensure correct payload
      const payload = { id: user.id, role: user.role };
      console.log("JWT Payload Before Signing:", payload);  // Debugging line
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      console.log("Generated Token:", token);  // Debugging line
  
      res.json({ message: 'Login successful', token });
    } catch (err) {
      console.error("Error in loginUser:", err);
      res.status(500).json({ message: 'Server error during login' });
    }
  };  
  

module.exports = { registerUser, loginUser };
