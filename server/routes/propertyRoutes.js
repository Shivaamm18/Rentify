const express = require('express');
const { 
  createProperty, 
  getAllProperties, 
  getPropertyById, 
  updateProperty, 
  deleteProperty,
  getMyProperties
} = require('../controllers/propertyController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

// All routes in this file are protected for owner actions
router.route('/')
  .post(protect, upload.array('images', 10), createProperty) // Only owners can create properties
  .get(getAllProperties); // Anyone can view properties

router.route('/my-properties')
  .get(protect, getMyProperties); // Only logged in users can view their properties

router.route('/:id')
  .get(getPropertyById) // Anyone can view a property
  .put(protect, upload.array('images', 10), updateProperty) // Only property owner can update
  .delete(protect, deleteProperty); // Only property owner can delete

module.exports = router;