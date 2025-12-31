const mongoose = require('mongoose');

const propertyViewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true
  },
  viewedAt: {
    type: Date,
    default: Date.now
  },
  subscriptionStatus: {
    type: String,
    enum: ['active', 'inactive', 'expired'],
    required: true
  }
});

// Index for efficient querying
propertyViewSchema.index({ propertyId: 1, userId: 1 }, { unique: true });
propertyViewSchema.index({ viewedAt: -1 });

module.exports = mongoose.model('PropertyView', propertyViewSchema);