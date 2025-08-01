const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Generate a JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');



exports.registerUser = async (req, res) => {
  try {
    console.log('📥 Received register request:', req.body);

    const { username, email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Generate a random verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create new user with token
    const newUser = await User.create({ username, email, password, verificationToken });

    // Create Verification Link
    const verificationLink = `${process.env.BASE_URL}/api/auth/verify/${verificationToken}`;

    // Email Content
    const emailContent = `
  Hi ${username},<br/><br/>
  Thanks for signing up for Online Bookstore! Please confirm your email address:<br/><br/>
  <a href="${verificationLink}" target="_blank">Click here to verify your email</a><br/><br/>
  If you didn't sign up, you can ignore this message.
`;


    // Send the Email
    await sendEmail(email, 'Verify your Email - Online Bookstore', emailContent);

    res.status(201).json({
      message: "Registration successful! Please check your email to verify your account."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// @desc    Login user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate Token
    const token = generateToken(user);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

