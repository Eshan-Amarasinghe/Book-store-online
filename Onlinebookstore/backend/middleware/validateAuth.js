const { check, validationResult } = require('express-validator');

// Validation rules for registration
exports.registerValidation = [
  check('username', 'Username is required').notEmpty(),
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isString().isLength({ min: 6 })
];

// Validation rules for login
exports.loginValidation = [
  check('email', 'Please provide a valid email').isEmail(),
  check('password', 'Password is required').exists()
];

// Middleware to check validation errors
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array()); // Debugging
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
