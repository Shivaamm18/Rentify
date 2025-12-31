const { isValidEmail, isStrongPassword, isValidPhone, isValidPincode } = require('../utils/validators');

const validateRegisterInput = (req, res, next) => {
  const { name, email, password, phone } = req.body;

  // Validate name
  if (!name || name.trim().length < 2) {
    return res.status(400).json({
      success: false,
      message: 'Name must be at least 2 characters long'
    });
  }

  // Validate email
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

    // Validate password
    if (!password || !isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

  // Validate phone if provided
  if (phone && !isValidPhone(phone)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid Indian phone number'
    });
  }

  next();
};

const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid email address'
    });
  }

  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput
};