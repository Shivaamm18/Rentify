const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rent: {
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  deposit: {
    type: Number,
    default: 0
  },
  propertyType: {
    type: String,
    enum: ['apartment', 'house', 'pg', 'flat', 'villa', 'independent'],
    required: true
  },
  bhk: {
    type: Number,
    min: 0,
    max: 10
  },
  furnished: {
    type: String,
    enum: ['furnished', 'semi-furnished', 'unfurnished'],
    default: 'unfurnished'
  },
  amenities: [{
    type: String
  }],
  address: {
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      default: 'India',
      trim: true
    },
    pincode: {
      type: String,
      required: true,
      trim: true
    }
  },
  coordinates: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  area: {
    size: {
      type: Number,
      min: 0
    },
    unit: {
      type: String,
      default: 'sqft'
    }
  },
  floor: {
    type: Number
  },
  totalFloors: {
    type: Number
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    publicId: {
      type: String
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  availabilityDate: {
    type: Date,
    default: Date.now
  },
  available: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  contactInfo: {
    showContact: {
      type: Boolean,
      default: false // Only show contact if user has active subscription
    },
    phone: {
      type: String
    },
    email: {
      type: String
    }
  },
  approved: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  rating: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
propertySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for search functionality
propertySchema.index({ 
  'address.city': 1, 
  'address.state': 1, 
  'address.pincode': 1,
  'rent.amount': 1,
  'propertyType': 1,
  'available': 1,
  'approved': 1
});

module.exports = mongoose.model('Property', propertySchema);