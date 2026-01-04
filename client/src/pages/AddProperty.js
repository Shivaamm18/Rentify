import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { 
    HiHome, HiCurrencyRupee, HiLocationMarker, HiCheckCircle, 
    HiChevronLeft, HiPlus, HiTag, HiInformationCircle, HiCamera, HiTrash
  } from 'react-icons/hi';

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
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Add to selected files
    setSelectedFiles(prev => [...prev, ...files]);

    // Create previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => {
      // Revoke the URL to avoid memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      
      // Append non-nested fields
      form.append('title', formData.title);
      form.append('description', formData.description);
      form.append('propertyType', formData.propertyType);
      form.append('furnished', formData.furnished);
      form.append('bhk', formData.bhk || 0);
      form.append('deposit', formData.deposit || 0);
      form.append('floor', formData.floor || '');
      form.append('totalFloors', formData.totalFloors || '');
      form.append('availabilityDate', formData.availabilityDate);

      // Append nested fields as JSON strings
      form.append('rent', JSON.stringify({
        amount: parseFloat(formData.rent.amount),
        currency: formData.rent.currency
      }));
      form.append('address', JSON.stringify(formData.address));
      form.append('area', JSON.stringify({
        size: parseFloat(formData.area.size) || 0,
        unit: formData.area.unit
      }));
      form.append('amenities', JSON.stringify(formData.amenities));
      form.append('contactInfo', JSON.stringify({
        phone: formData.contactInfo.phone || user.phone,
        email: formData.contactInfo.email || user.email
      }));

      // Append files
      selectedFiles.forEach(file => {
        form.append('images', file);
      });

      const response = await propertyAPI.createProperty(form);
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

  const propertyTypes = [
    'apartment', 'house', 'pg', 'flat', 'villa', 'independent'
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/my-properties" className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors mb-8">
          <HiChevronLeft className="mr-2 w-5 h-5" />
          Back to My Properties
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
        >
          <div className="bg-primary-600 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">List Your Property</h1>
              <p className="text-primary-100">Provide accurate details to attract potential tenants</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="p-8 space-y-12">
            {/* Basic Information */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                  <HiInformationCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Basic Information</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-slate-700 mb-1">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    placeholder="e.g. Spacious 2 BHK Apartment in Whitefield"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-slate-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    value={description}
                    onChange={onChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    placeholder="Describe your property features, neighborhood, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="propertyType" className="block text-sm font-semibold text-slate-700 mb-1">
                      Property Type *
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      required
                      value={propertyType}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900 capitalize"
                    >
                      {propertyTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="bhk" className="block text-sm font-semibold text-slate-700 mb-1">
                      Configuration (BHK)
                    </label>
                    <select
                      id="bhk"
                      name="bhk"
                      value={bhk}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    >
                      <option value="">Select</option>
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>{n} BHK</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="furnished" className="block text-sm font-semibold text-slate-700 mb-1">
                      Furnishing
                    </label>
                    <select
                      id="furnished"
                      name="furnished"
                      value={furnished}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900 capitalize"
                    >
                      <option value="unfurnished">Unfurnished</option>
                      <option value="semi-furnished">Semi-furnished</option>
                      <option value="furnished">Fully Furnished</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Pricing & Area */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                  <HiCurrencyRupee className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Pricing & Area</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="rent" className="block text-sm font-semibold text-slate-700 mb-1">
                    Monthly Rent (₹) *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiCurrencyRupee className="text-slate-400 w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      id="rent"
                      required
                      min="0"
                      value={rent.amount}
                      onChange={(e) => handleRentChange('amount', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                      placeholder="e.g. 25000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="deposit" className="block text-sm font-semibold text-slate-700 mb-1">
                    Security Deposit (₹)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <HiCurrencyRupee className="text-slate-400 w-5 h-5" />
                    </div>
                    <input
                      type="number"
                      id="deposit"
                      min="0"
                      value={deposit}
                      onChange={onChange}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                      placeholder="e.g. 50000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="area" className="block text-sm font-semibold text-slate-700 mb-1">
                    Super Built-up Area (sqft)
                  </label>
                  <input
                    type="number"
                    id="area"
                    min="0"
                    value={area.size}
                    onChange={(e) => handleAreaChange('size', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    placeholder="e.g. 1100"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="floor" className="block text-sm font-semibold text-slate-700 mb-1">
                      Floor
                    </label>
                    <input
                      type="number"
                      id="floor"
                      name="floor"
                      value={floor}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                      placeholder="e.g. 5"
                    />
                  </div>
                  <div>
                    <label htmlFor="totalFloors" className="block text-sm font-semibold text-slate-700 mb-1">
                      Total Floors
                    </label>
                    <input
                      type="number"
                      id="totalFloors"
                      name="totalFloors"
                      value={totalFloors}
                      onChange={onChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                      placeholder="e.g. 20"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                  <HiLocationMarker className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Location Details</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label htmlFor="street" className="block text-sm font-semibold text-slate-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    id="street"
                    required
                    value={address.street}
                    onChange={(e) => handleAddressChange('street', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    placeholder="House No, Building Name, Locality"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      id="city"
                      required
                      value={address.city}
                      onChange={(e) => handleAddressChange('city', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-semibold text-slate-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      id="state"
                      required
                      value={address.state}
                      onChange={(e) => handleAddressChange('state', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="pincode" className="block text-sm font-semibold text-slate-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      required
                      value={address.pincode}
                      onChange={(e) => handleAddressChange('pincode', e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900"
                    />
                  </div>
                </div>
                </div>
              </section>
              
              {/* Image Upload */}
              <section>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                    <HiCamera className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Property Images</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-all">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <HiCamera className="w-12 h-12 text-slate-400 mb-3" />
                        <p className="mb-2 text-sm text-slate-500 font-semibold">Click to upload images</p>
                        <p className="text-xs text-slate-400">PNG, JPG or WebP (Max 5MB each)</p>
                      </div>
                      <input 
                        type="file" 
                        className="hidden" 
                        multiple 
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {previews.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                          <img 
                            src={preview} 
                            alt={`Preview ${index}`} 
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>

              {/* Amenities */}
            <section>
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-primary-50 p-2 rounded-lg text-primary-600">
                  <HiPlus className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Amenities</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {amenityOptions.map((amenity, index) => (
                  <label key={index} className="flex items-center space-x-3 p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
                    <input
                      type="checkbox"
                      value={amenity}
                      onChange={handleAmenityChange}
                      className="w-5 h-5 text-primary-600 border-slate-300 rounded focus:ring-primary-500 transition-all"
                    />
                    <span className="text-sm font-medium text-slate-700">{amenity}</span>
                  </label>
                ))}
              </div>
            </section>

            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 disabled:opacity-50 flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                ) : (
                  <HiCheckCircle className="w-6 h-6 mr-2" />
                )}
                <span>{loading ? 'Creating Listing...' : 'Submit Property Listing'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/my-properties')}
                className="flex-1 py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddProperty;
