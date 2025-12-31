const Property = require('../models/Property');

// @desc    Advanced search properties
// @route   GET /api/search
// @access  Public
const searchProperties = async (req, res) => {
  try {
    const {
      query, // General search query (title, description)
      city,
      state,
      pincode,
      minRent,
      maxRent,
      propertyType,
      bhk,
      furnished,
      amenities,
      minArea,
      maxArea,
      available,
      isFeatured,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    // Build filter object
    let filter = { approved: true, available: true };

    // General search query
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { 'address.city': { $regex: query, $options: 'i' } },
        { 'address.state': { $regex: query, $options: 'i' } }
      ];
    }

    // Location filters
    if (city) filter['address.city'] = new RegExp(city, 'i');
    if (state) filter['address.state'] = new RegExp(state, 'i');
    if (pincode) filter['address.pincode'] = new RegExp(pincode, 'i');

    // Price filters
    if (minRent) {
      filter['rent.amount'] = { ...filter['rent.amount'], $gte: Number(minRent) };
    }
    if (maxRent) {
      filter['rent.amount'] = filter['rent.amount'] || {};
      filter['rent.amount'].$lte = Number(maxRent);
    }

    // Property type filter
    if (propertyType) {
      if (Array.isArray(propertyType)) {
        filter.propertyType = { $in: propertyType };
      } else {
        filter.propertyType = propertyType;
      }
    }

    // BHK filter
    if (bhk) {
      if (Array.isArray(bhk)) {
        filter.bhk = { $in: bhk.map(b => Number(b)) };
      } else {
        filter.bhk = Number(bhk);
      }
    }

    // Furnished filter
    if (furnished) {
      if (Array.isArray(furnished)) {
        filter.furnished = { $in: furnished };
      } else {
        filter.furnished = furnished;
      }
    }

    // Amenities filter
    if (amenities) {
      const amenitiesArray = Array.isArray(amenities) ? amenities : amenities.split(',');
      filter.amenities = { $all: amenitiesArray };
    }

    // Area filters
    if (minArea) {
      filter['area.size'] = { ...filter['area.size'], $gte: Number(minArea) };
    }
    if (maxArea) {
      filter['area.size'] = filter['area.size'] || {};
      filter['area.size'].$lte = Number(maxArea);
    }

    // Availability filter
    if (available !== undefined) {
      filter.available = available === 'true';
    }

    // Featured filter
    if (isFeatured !== undefined) {
      filter.isFeatured = isFeatured === 'true';
    }

    // Sorting
    const sort = {};
    if (sortBy === 'rent') {
      sort['rent.amount'] = sortOrder === 'asc' ? 1 : -1;
    } else {
      sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    // Execute query with aggregation for advanced search
    const properties = await Property.find(filter)
      .populate('ownerId', 'name email phone isVerified')
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
      message: 'Server error during property search'
    });
  }
};

// @desc    Get property suggestions for search
// @route   GET /api/search/suggestions
// @access  Public
const getPropertySuggestions = async (req, res) => {
  try {
    const { query, limit = 5 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Query parameter is required'
      });
    }

    // Find properties that match the query in title or location
    const suggestions = await Property.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { 'address.city': { $regex: query, $options: 'i' } },
        { 'address.state': { $regex: query, $options: 'i' } },
        { 'address.pincode': { $regex: query, $options: 'i' } }
      ],
      approved: true,
      available: true
    })
    .select('title address')
    .limit(Number(limit));

    res.status(200).json({
      success: true,
      data: {
        suggestions
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during property suggestion retrieval'
    });
  }
};

// @desc    Get search filters (for UI)
// @route   GET /api/search/filters
// @access  Public
const getSearchFilters = async (req, res) => {
  try {
    // Get distinct values for various filters
    const propertyTypes = await Property.distinct('propertyType', { approved: true });
    const cities = await Property.distinct('address.city', { approved: true });
    const states = await Property.distinct('address.state', { approved: true });
    
    // Get rent range
    const rentRange = await Property.aggregate([
      { $match: { approved: true, available: true } },
      {
        $group: {
          _id: null,
          minRent: { $min: "$rent.amount" },
          maxRent: { $max: "$rent.amount" }
        }
      }
    ]);

    // Get BHK range
    const bhkRange = await Property.aggregate([
      { $match: { approved: true, available: true } },
      {
        $group: {
          _id: null,
          minBhk: { $min: "$bhk" },
          maxBhk: { $max: "$bhk" }
        }
      }
    ]);

    // Get amenities
    const amenities = await Property.aggregate([
      { $match: { approved: true, available: true } },
      { $unwind: "$amenities" },
      {
        $group: {
          _id: "$amenities"
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        propertyTypes,
        cities: cities.slice(0, 50), // Limit to first 50 cities
        states,
        rentRange: rentRange[0] || { minRent: 0, maxRent: 100000 },
        bhkRange: bhkRange[0] || { minBhk: 0, maxBhk: 5 },
        amenities: amenities.map(a => a._id)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error during filter retrieval'
    });
  }
};

module.exports = {
  searchProperties,
  getPropertySuggestions,
  getSearchFilters
};