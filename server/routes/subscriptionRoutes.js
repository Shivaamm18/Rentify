const express = require('express');
const { 
  createSubscription,
  getMySubscription,
  checkPropertyAccess,
  getAllSubscriptions,
  updateSubscription,
  cancelSubscription,
  getSubscriptionPlans
} = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.route('/plans')
  .get(getSubscriptionPlans); // Public route to get subscription plans

router.route('/')
  .post(protect, createSubscription) // Private route to create subscription
  .get(protect, authorize('admin'), getAllSubscriptions); // Admin only to get all subscriptions

router.route('/my-subscription')
  .get(protect, getMySubscription); // Private route for user to get their subscription

router.route('/check-access/:propertyId')
  .get(protect, checkPropertyAccess); // Private route to check if user can access property details

router.route('/:id')
  .put(protect, authorize('admin'), updateSubscription) // Admin only
  .delete(protect, cancelSubscription); // User or admin can cancel

module.exports = router;