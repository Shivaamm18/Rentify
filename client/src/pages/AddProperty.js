import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './AddProperty.css';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rent: { amount: '', currency: 'INR' },
    deposit: '',
    propertyType: 'apartment',
    bhk: '',
    furnished: 'unfurnished',
    amenities: [],
    address: {
      street: '',
      city: '',
      state: '',
      country: 'India',
      pincode: ''
    },
    area: { size: '', unit: 'sqft' },
    floor: '',
    totalFloors: '',
    images: [],
    availabilityDate: '',
    contactInfo: { phone: '', email: '' }
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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
    availabilityDate
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value
      }
    });
  };

  const handleRentChange = (field, value) => {
    setFormData({
      ...formData,
      rent: {
        ...formData.rent,
        [field]: value
      }
    });
  };

  const handleAreaChange = (field, value) => {
    setFormData({
      ...formData,
      area: {
        ...formData.area,
        [field]: value
      }
    });
  };

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value]
      });
    } else {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(amenity => amenity !== value)
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const propertyData = {
        ...formData,
        rent: {
          amount: parseFloat(rent.amount),
          currency: rent.currency
        },
        deposit: parseFloat(deposit) || 0,
        bhk: parseInt(bhk) || 0,
        area: {
          size: parseFloat(area.size) || 0,
          unit: area.unit
        },
        floor: parseInt(floor) || null,
        totalFloors: parseInt(totalFloors) || null
      };

      const response = await propertyAPI.createProperty(propertyData);
      if (response.data.success) {
        navigate('/my-properties');
      }
    } catch (error) {
      console.error('Error creating property:', error);
      alert('Error creating property. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const amenityOptions = [
    'WiFi', 'Furnished', 'AC', 'TV', 'Washing Machine', 'Refrigerator', 
    'Microwave', 'Gas Stove', 'Parking', 'Security', 'Lift', 'Gym', 
    'Swimming Pool', 'Garden', 'Power Backup'
  ];

  return (
    <div className="add-property-page">
      <div className="container">
        <div className="form-header">
          <h2>Add New Property</h2>
          <p>Fill in the details for your property listing</p>
        </div>

        <form onSubmit={onSubmit} className="property-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Property Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={onChange}
                className="form-control"
                placeholder="Enter property title"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={onChange}
                className="form-control"
                placeholder="Describe your property"
                rows="5"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="rent">Monthly Rent (₹) *</label>
              <input
                type="number"
                id="rent"
                value={rent.amount}
                onChange={(e) => handleRentChange('amount', e.target.value)}
                className="form-control"
                placeholder="Enter monthly rent"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deposit">Security Deposit (₹)</label>
              <input
                type="number"
                id="deposit"
                name="deposit"
                value={deposit}
                onChange={onChange}
                className="form-control"
                placeholder="Enter security deposit"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="propertyType">Property Type *</label>
              <select
                id="propertyType"
                name="propertyType"
                value={propertyType}
                onChange={onChange}
                className="form-control"
                required
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="pg">PG (Paying Guest)</option>
                <option value="flat">Flat</option>
                <option value="villa">Villa</option>
                <option value="independent">Independent House</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="bhk">BHK</label>
              <select
                id="bhk"
                name="bhk"
                value={bhk}
                onChange={onChange}
                className="form-control"
              >
                <option value="">Select BHK</option>
                <option value="0">Studio</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="furnished">Furnished Status</label>
              <select
                id="furnished"
                name="furnished"
                value={furnished}
                onChange={onChange}
                className="form-control"
              >
                <option value="unfurnished">Unfurnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="furnished">Furnished</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="area">Area (sqft)</label>
              <input
                type="number"
                id="area"
                value={area.size}
                onChange={(e) => handleAreaChange('size', e.target.value)}
                className="form-control"
                placeholder="Enter area in sqft"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="floor">Floor</label>
              <input
                type="number"
                id="floor"
                name="floor"
                value={floor}
                onChange={onChange}
                className="form-control"
                placeholder="Enter floor number"
                min="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="totalFloors">Total Floors</label>
              <input
                type="number"
                id="totalFloors"
                name="totalFloors"
                value={totalFloors}
                onChange={onChange}
                className="form-control"
                placeholder="Enter total floors"
                min="0"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="street">Street Address *</label>
              <input
                type="text"
                id="street"
                value={address.street}
                onChange={(e) => handleAddressChange('street', e.target.value)}
                className="form-control"
                placeholder="Enter street address"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                value={address.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="form-control"
                placeholder="Enter city"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                value={address.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                className="form-control"
                placeholder="Enter state"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode *</label>
              <input
                type="text"
                id="pincode"
                value={address.pincode}
                onChange={(e) => handleAddressChange('pincode', e.target.value)}
                className="form-control"
                placeholder="Enter pincode"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="availabilityDate">Availability Date</label>
              <input
                type="date"
                id="availabilityDate"
                name="availabilityDate"
                value={availabilityDate}
                onChange={onChange}
                className="form-control"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Amenities</label>
              <div className="amenities-grid">
                {amenityOptions.map((amenity, index) => (
                  <div key={index} className="form-check">
                    <input
                      type="checkbox"
                      id={`amenity-${index}`}
                      value={amenity}
                      onChange={handleAmenityChange}
                      className="form-check-input"
                    />
                    <label htmlFor={`amenity-${index}`} className="form-check-label">
                      {amenity}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating Property...' : 'Create Property'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/my-properties')}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;