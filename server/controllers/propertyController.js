const Property = require('../models/Property');
const User = require('../models/User');
const Subscription = require('../models/Subscription');
const { isValidPincode } = require('../utils/validators');
const cloudinary = require('cloudinary').v2;

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (Owner only)
const createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      rent,
      deposit,
      propertyType,
      bhk,
      furnished,
      amenities,
      address,
      area,
      floor,
      totalFloors,
      availabilityDate,
      contactInfo
    } = req.body;

    // Handle uploaded images from Cloudinary
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        images.push({
          url: file.path, // Cloudinary URL
          publicId: file.filename, // Cloudinary public ID
          isPrimary: index === 0
        });
      });
    }

    // Parse nested objects if they are sent as strings (common with multipart/form-data)
    const parsedRent = typeof rent === 'string' ? JSON.parse(rent) : rent;
    const parsedAddress = typeof address === 'string' ? JSON.parse(address) : address;
    const parsedArea = typeof area === 'string' ? JSON.parse(area) : area;
    const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    const parsedContactInfo = typeof contactInfo === 'string' ? JSON.parse(contactInfo) : contactInfo;

    // Validate required fields
    if (!title || !description || !parsedRent || !parsedAddress || !parsedAddress.city || !parsedAddress.state || !parsedAddress.pincode) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, rent, and address'
      });
    }

    // Validate pincode
    if (!isValidPincode(parsedAddress.pincode)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid Indian pincode'
      });
    }

    // Validate rent amount
    if (parsedRent.amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Rent amount must be greater than 0'
      });
    }

    // Validate property type
    const validPropertyTypes = ['apartment', 'house', 'pg', 'flat', 'villa', 'independent'];
    if (!validPropertyTypes.includes(propertyType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid property type'
      });
    }

    // Create property
    const property = await Property.create({
      title,
      description,
      ownerId: req.user.id,
      rent: {
        amount: parsedRent.amount,
        currency: parsedRent.currency || 'INR'
      },
      deposit: deposit || 0,
      propertyType,
      bhk: bhk || 0,
      furnished: furnished || 'unfurnished',
      amenities: parsedAmenities || [],
      address: parsedAddress,
      area: parsedArea || {},
      floor: floor || null,
      totalFloors: totalFloors || null,
      images,
      availabilityDate: availabilityDate || Date.now(),
      contactInfo: {
        phone: parsedContactInfo?.phone || req.user.phone,
        email: parsedContactInfo?.email || req.user.email
      }
    });

    // Add property to user's properties
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { properties: property._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: {
        property
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property creation'
    });
  }
};

// @desc    Get all properties (with optional filters)
// @route   GET /api/properties
// @access  Public
const getAllProperties = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const {
      city,
      state,
      minRent,
      maxRent,
      propertyType,
      bhk,
      furnished,
      available,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    let filter = { approved: true, available: true };

    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (state) filter['address.state'] = new RegExp(state, 'i');
    if (minRent) filter['rent.amount'] = { ...filter['rent.amount'], $gte: Number(minRent) };
    if (maxRent) {
      filter['rent.amount'] = filter['rent.amount'] || {};
      filter['rent.amount'].$lte = Number(maxRent);
    }
    if (propertyType) filter.propertyType = propertyType;
    if (bhk) filter.bhk = Number(bhk);
    if (furnished) filter.furnished = furnished;
    if (available !== undefined) filter.available = available === 'true';

    // Sorting
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query
    const properties = await Property.find(filter)
      .populate('ownerId', 'name email phone')
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Property.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: properties.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: {
        properties
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property retrieval'
    });
  }
};

// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('ownerId', 'name email phone isVerified');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is authenticated and has an active subscription
    let hasAccessToContact = false;
    if (req.user) { // If user is authenticated
      const subscription = await Subscription.findOne({
        userId: req.user.id,
        status: 'active',
        endDate: { $gte: Date.now() }
      });
      
      hasAccessToContact = !!subscription;
    }
    
    // Update view count
    property.views += 1;
    await property.save();
    
    // If user doesn't have access to contact info, remove it from response
    if (!hasAccessToContact) {
      property.contactInfo = {
        showContact: false
      };
    }

    res.status(200).json({
      success: true,
      data: {
        property
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property retrieval'
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Property owner only)
const updateProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      rent,
      deposit,
      propertyType,
      bhk,
      furnished,
      amenities,
      address,
      area,
      floor,
      totalFloors,
      images,
      availabilityDate,
      available,
      contactInfo
    } = req.body;

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the owner of the property
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    // Prepare update object
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (rent) updateData.rent = rent;
    if (deposit !== undefined) updateData.deposit = deposit;
    if (propertyType) updateData.propertyType = propertyType;
    if (bhk !== undefined) updateData.bhk = bhk;
    if (furnished) updateData.furnished = furnished;
    if (amenities) updateData.amenities = amenities;
    if (address) updateData.address = address;
    if (area) updateData.area = area;
    if (floor !== undefined) updateData.floor = floor;
    if (totalFloors !== undefined) updateData.totalFloors = totalFloors;
    if (images) updateData.images = images;
    if (availabilityDate) updateData.availabilityDate = availabilityDate;
    if (available !== undefined) updateData.available = available;
    if (contactInfo) updateData.contactInfo = contactInfo;

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: {
        property: updatedProperty
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property update'
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Property owner only)
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the owner of the property
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    // Delete images from Cloudinary
    if (property.images && property.images.length > 0) {
      for (const image of property.images) {
        if (image.publicId) {
          await cloudinary.uploader.destroy(image.publicId);
        }
      }
    }

    await Property.findByIdAndDelete(req.params.id);

    // Remove property from user's properties
    await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { properties: req.params.id } }
    );

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property deletion'
    });
  }
};

// @desc    Get properties by owner
// @route   GET /api/properties/my-properties
// @access  Private
const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ ownerId: req.user.id })
      .populate('ownerId', 'name email phone')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: properties.length,
      data: {
        properties
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property retrieval'
    });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties
};