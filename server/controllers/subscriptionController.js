const Subscription = require('../models/Subscription');
const User = require('../models/User');
const Property = require('../models/Property');
const PropertyView = require('../models/PropertyView');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// @desc    Create subscription
// @route   POST /api/subscriptions
// @access  Private
const createSubscription = async (req, res) => {
  try {
    const { plan, paymentMethodId } = req.body;

    // Define plan details
    const plans = {
      basic: {
        name: 'Basic Plan',
        price: { amount: 299, currency: 'INR' },
        duration: 30, // 30 days
        features: ['View contact details', 'Save up to 5 properties', 'Basic search filters']
      },
      premium: {
        name: 'Premium Plan',
        price: { amount: 499, currency: 'INR' },
        duration: 90, // 90 days
        features: ['View contact details', 'Save up to 20 properties', 'Advanced search filters', 'Priority customer support']
      },
      enterprise: {
        name: 'Enterprise Plan',
        price: { amount: 999, currency: 'INR' },
        duration: 365, // 365 days
        features: ['View contact details', 'Save unlimited properties', 'Advanced search filters', 'Priority customer support', 'Featured listing']
      }
    };

    if (!plans[plan]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid plan selected'
      });
    }

    const planDetails = plans[plan];

    // Check if user already has an active subscription
    const existingSubscription = await Subscription.findOne({
      userId: req.user.id,
      status: { $in: ['active', 'pending'] }
    });

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active subscription'
      });
    }

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: planDetails.price.amount * 100, // Amount in paise
      currency: planDetails.price.currency.toLowerCase(),
      payment_method: paymentMethodId,
      confirm: true,
      return_url: `${process.env.CLIENT_URL || 'http://localhost:3000'}/payment-success`,
    });

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({
        success: false,
        message: 'Payment failed'
      });
    }

    // Create subscription
    const subscription = await Subscription.create({
      userId: req.user.id,
      plan,
      planDetails,
      startDate: Date.now(),
      endDate: new Date(Date.now() + planDetails.duration * 24 * 60 * 60 * 1000), // Add duration in milliseconds
      status: 'active',
      paymentId: paymentIntent.id,
      transactionId: paymentIntent.id,
      paymentMethod: 'stripe',
      stripeSubscriptionId: paymentIntent.id
    });

    // Update user subscription status
    await User.findByIdAndUpdate(
      req.user.id,
      {
        subscription: subscription._id,
        subscriptionStatus: 'active',
        subscriptionExpiry: subscription.endDate
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: {
        subscription
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription creation'
    });
  }
};

// @desc    Get user subscription
// @route   GET /api/subscriptions/my-subscription
// @access  Private
const getMySubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.user.id })
      .populate('userId', 'name email role');

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No subscription found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        subscription
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription retrieval'
    });
  }
};

// @desc    Check if user can view property contact details
// @route   GET /api/subscriptions/check-access/:propertyId
// @access  Private
const checkPropertyAccess = async (req, res) => {
  try {
    const { propertyId } = req.params;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user has an active subscription
    const subscription = await Subscription.findOne({
      userId: req.user.id,
      status: 'active',
      endDate: { $gte: Date.now() }
    });

    // Check if user has viewed this property before (for non-subscribed users)
    const propertyView = await PropertyView.findOne({
      userId: req.user.id,
      propertyId: propertyId
    });

    // Determine if user has access
    let hasAccess = false;
    if (subscription) {
      hasAccess = true;
    } else if (propertyView && propertyView.subscriptionStatus === 'active') {
      // User previously viewed with active subscription
      hasAccess = true;
    } else {
      // User can view limited details without subscription
      hasAccess = false;
    }

    // Record the view
    await PropertyView.findOneAndUpdate(
      { userId: req.user.id, propertyId: propertyId },
      {
        userId: req.user.id,
        propertyId: propertyId,
        viewedAt: Date.now(),
        subscriptionStatus: subscription ? 'active' : 'inactive'
      },
      { upsert: true, new: true }
    );

    res.status(200).json({
      success: true,
      data: {
        hasAccess,
        propertyId,
        subscriptionActive: !!subscription
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during access check'
    });
  }
};

// @desc    Get all subscriptions (admin only)
// @route   GET /api/subscriptions
// @access  Private (Admin)
const getAllSubscriptions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;

    // Build filter
    let filter = {};
    if (status) filter.status = status;
    if (userId) filter.userId = userId;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const subscriptions = await Subscription.find(filter)
      .populate('userId', 'name email role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Subscription.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: {
        subscriptions
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription retrieval'
    });
  }
};

// @desc    Update subscription status (admin only)
// @route   PUT /api/subscriptions/:id
// @access  Private (Admin)
const updateSubscription = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const allowedStatuses = ['active', 'inactive', 'expired', 'cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values: ' + allowedStatuses.join(', ')
      });
    }

    const subscription = await Subscription.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Update user subscription status
    await User.findByIdAndUpdate(
      subscription.userId,
      {
        subscriptionStatus: status,
        subscriptionExpiry: status === 'expired' || status === 'cancelled' ? null : subscription.endDate
      }
    );

    res.status(200).json({
      success: true,
      data: {
        subscription
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription update'
    });
  }
};

// @desc    Cancel subscription
// @route   DELETE /api/subscriptions/:id
// @access  Private (User or Admin)
const cancelSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }

    // Check if user is the owner of the subscription or an admin
    if (subscription.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this subscription'
      });
    }

    // Update subscription status
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { status: 'cancelled' },
      { new: true }
    );

    // Update user subscription status
    await User.findByIdAndUpdate(
      subscription.userId,
      {
        subscriptionStatus: 'cancelled',
        subscriptionExpiry: null
      }
    );

    res.status(200).json({
      success: true,
      message: 'Subscription cancelled successfully',
      data: {
        subscription: updatedSubscription
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during subscription cancellation'
    });
  }
};

// @desc    Get subscription plans
// @route   GET /api/subscriptions/plans
// @access  Public
const getSubscriptionPlans = (req, res) => {
  const plans = {
    basic: {
      name: 'Basic Plan',
      price: { amount: 299, currency: 'INR' },
      duration: 30, // 30 days
      features: [
        'View contact details',
        'Save up to 5 properties',
        'Basic search filters'
      ]
    },
    premium: {
      name: 'Premium Plan',
      price: { amount: 499, currency: 'INR' },
      duration: 90, // 90 days
      features: [
        'View contact details',
        'Save up to 20 properties',
        'Advanced search filters',
        'Priority customer support'
      ]
    },
    enterprise: {
      name: 'Enterprise Plan',
      price: { amount: 999, currency: 'INR' },
      duration: 365, // 365 days
      features: [
        'View contact details',
        'Save unlimited properties',
        'Advanced search filters',
        'Priority customer support',
        'Featured listing'
      ]
    }
  };

  res.status(200).json({
    success: true,
    data: {
      plans
    }
  });
};

module.exports = {
  createSubscription,
  getMySubscription,
  checkPropertyAccess,
  getAllSubscriptions,
  updateSubscription,
  cancelSubscription,
  getSubscriptionPlans
};