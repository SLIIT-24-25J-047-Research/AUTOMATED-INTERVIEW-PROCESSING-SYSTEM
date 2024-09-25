const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      role,  
    });

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role, 
      },
    };

    // Generate JWT Token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },  
      (err, token) => {
        if (err) throw err;

        // Send back token and the user role in the response
        res.json({
          token,
          role: user.role, // Send role for the frontend to handle redirection
          msg: 'User registered successfully',
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return the token and the user's role
    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};




//---

module.exports = { login , register };
