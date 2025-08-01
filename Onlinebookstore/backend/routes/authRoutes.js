const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { registerUser, loginUser } = require('../controllers/authcontroller');
const { registerValidation, loginValidation, validate } = require('../middleware/validateAuth');
const protect = require('../middleware/auth'); //  JWT auth middleware

// Register Route (with validation middleware)
router.post('/register', registerValidation, validate, registerUser);

// Login Route (with validation middleware)
router.post('/login', loginValidation, validate, loginUser);

// Email Verification Route
router.get('/verify/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Mark user as verified & remove token (without triggering pre-save password hashing)
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save({ validateBeforeSave: false });

    res.json({ message: '✅ Email verified successfully! You can now login.' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ message: 'Server error during verification' });
  }
});

// Optional: Fetch logged-in user profile (protected route)
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // omit password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
