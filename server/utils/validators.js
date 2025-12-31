// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

// Validate phone number (more flexible)
const isValidPhone = (phone) => {
  // Allow 10 digits, with optional +91, spaces, dashes
  const phoneRegex = /^(\+91[-\s]?)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/[-\s]/g, ''));
};

// Validate Indian pincode
const isValidPincode = (pincode) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

module.exports = {
  isValidEmail,
  isStrongPassword,
  isValidPhone,
  isValidPincode
};