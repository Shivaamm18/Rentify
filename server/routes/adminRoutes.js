const express = require('express');
const router = express.Router();
const { getAllUsers, updateUserRole, getAdminStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

// All routes here are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);
router.get('/stats', getAdminStats);

module.exports = router;