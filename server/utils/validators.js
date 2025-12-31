// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password strength
const isStrongPassword = (password) => {
  // At least 6 characters, with at least one uppercase, one lowercase, and one number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

// Validate phone number (Indian format)
const isValidPhone = (phone) => {
  // Indian phone number: 10 digits, optionally with country code
  const phoneRegex = /^(\+91[-\s]?)?[0-9]{10}$/;
  return phoneRegex.test(phone);
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