const express = require('express');
const { register, login, getMe, updateMe, logout } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { validateRegisterInput, validateLoginInput } = require('../middleware/validation');

const router = express.Router();

router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);
router.route('/me').get(protect, getMe);
router.route('/update').put(protect, updateMe);
router.route('/logout').post(protect, logout);

module.exports = router;