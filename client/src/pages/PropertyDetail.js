import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyAPI, subscriptionAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiLocationMarker, HiCurrencyRupee, HiHome, HiCheckCircle, 
  HiInformationCircle, HiPhone, HiMail, HiUser, HiArrowLeft,
  HiEye, HiCalendar, HiShieldCheck
} from 'react-icons/hi';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const response = await propertyAPI.getPropertyById(id);
      if (response.data.success) {
        setProperty(response.data.data.property);
        
        if (isAuthenticated) {
          const accessResponse = await subscriptionAPI.checkPropertyAccess(id);
          if (accessResponse.data.success) {
            setHasAccess(accessResponse.data.data.hasAccess);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <HiInformationCircle className="w-16 h-16 text-slate-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Property Not Found</h2>
          <p className="text-slate-600 mb-8">The property you're looking for might have been removed or is no longer available.</p>
          <Link to="/properties" className="inline-flex items-center justify-center w-full px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
            <HiArrowLeft className="mr-2" />
            Back to Listings
          </Link>
        </div>
      </div>
    );
  }

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
    available,
    views,
    contactInfo,
    ownerId,
    createdAt
  } = property;

  const displayImages = images && images.length > 0 
    ? images 
    : [{ url: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }];

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link to="/properties" className="inline-flex items-center text-slate-500 hover:text-primary-600 font-medium transition-colors">
          <HiArrowLeft className="mr-2" />
          Back to all properties
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 p-2">
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={displayImages[activeImage].url}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute top-4 left-4 flex space-x-2">
                  <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                    {propertyType}
                  </span>
                  {available ? (
                    <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center space-x-1">
                      <HiCheckCircle className="w-3 h-3" />
                      <span>Available</span>
                    </span>
                  ) : (
                    <span className="bg-red-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center space-x-1">
                      <HiX className="w-3 h-3" />
                      <span>Not Available</span>
                    </span>
                  )}
                </div>
              </div>
              
              {displayImages.length > 1 && (
                <div className="flex space-x-2 p-4 overflow-x-auto scrollbar-hide">
                  {displayImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        activeImage === index ? 'border-primary-600 ring-2 ring-primary-100' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details Header */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">{title}</h1>
                  <div className="flex items-center text-slate-500">
                    <HiLocationMarker className="w-5 h-5 mr-2 text-slate-400" />
                    <span className="text-lg">{address.street}, {address.city}, {address.state} {address.pincode}</span>
                  </div>
                </div>
                <div className="bg-primary-50 px-6 py-4 rounded-2xl border border-primary-100 flex flex-col items-end">
                  <span className="text-primary-600 font-bold text-3xl flex items-center">
                    <HiCurrencyRupee className="w-8 h-8 mr-1" />
                    {rent.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-primary-400 text-sm font-medium uppercase tracking-wider">Per Month</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-100">
                <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">BHK</span>
                  <span className="text-slate-900 font-bold text-lg flex items-center">
                    <HiHome className="mr-2 text-primary-500" />
                    {bhk} BHK
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">Furnished</span>
                  <span className="text-slate-900 font-bold text-lg flex items-center capitalize">
                    {furnished}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">Area</span>
                  <span className="text-slate-900 font-bold text-lg flex items-center">
                    {area?.size || 'N/A'} {area?.unit || ''}
                  </span>
                </div>
                <div className="flex flex-col p-4 bg-slate-50 rounded-2xl">
                  <span className="text-slate-400 text-xs font-bold uppercase mb-1">Floor</span>
                  <span className="text-slate-900 font-bold text-lg">
                    {floor !== null ? `${floor}/${totalFloors}` : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Description & Amenities */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                  <span className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></span>
                  About this Property
                </h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg">
                  {description}
                </p>
              </div>

              {amenities && amenities.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                    <span className="w-1.5 h-6 bg-primary-600 rounded-full mr-3"></span>
                    Amenities & Facilities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <HiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact & Actions */}
          <div className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              
              {/* Contact Card */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-6 relative z-10">Contact Property Owner</h3>
                
                {hasAccess || contactInfo.showContact ? (
                  <div className="space-y-6 relative z-10">
                    <div className="flex items-center p-4 bg-slate-50 rounded-2xl">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
                        <HiUser className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Owner Name</p>
                        <p className="text-lg font-bold text-slate-900">{ownerId?.name}</p>
                      </div>
                    </div>
                    
                    <a href={`tel:${contactInfo.phone}`} className="flex items-center p-4 bg-primary-50 rounded-2xl group hover:bg-primary-100 transition-colors border border-primary-100">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                        <HiPhone className="w-6 h-6 text-primary-600" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-primary-400 uppercase tracking-wider">Phone Number</p>
                        <p className="text-lg font-bold text-primary-700">{contactInfo.phone}</p>
                      </div>
                    </a>
                    
                    <a href={`mailto:${contactInfo.email}`} className="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mr-4">
                        <HiMail className="w-6 h-6 text-slate-400" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Address</p>
                        <p className="text-lg font-bold text-slate-900 truncate max-w-[150px]">{contactInfo.email}</p>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="relative z-10">
                    <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 mb-6">
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4">
                        <HiShieldCheck className="w-8 h-8 text-primary-400" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 mb-2">Details Locked</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        Sign up for a subscription plan to view owner contact details and book properties.
                      </p>
                    </div>
                    <Link to="/subscription-plans" className="block w-full text-center py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
                      View Subscription Plans
                    </Link>
                  </div>
                )}
              </div>

              {/* Quick Info Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-500">
                      <HiEye className="mr-2" />
                      Total Views
                    </div>
                    <span className="font-bold text-slate-900">{views}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-500">
                      <HiCalendar className="mr-2" />
                      Listed On
                    </div>
                    <span className="font-bold text-slate-900">{new Date(createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-slate-500">
                      <HiCurrencyRupee className="mr-2" />
                      Security Deposit
                    </div>
                    <span className="font-bold text-slate-900">₹{deposit.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
