import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyAPI, subscriptionAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiLocationMarker, HiCurrencyRupee, HiHome, HiCheckCircle, HiXCircle,
  HiInformationCircle, HiPhone, HiMail, HiUser, HiArrowLeft,
  HiEye, HiCalendar, HiShieldCheck, HiChevronRight, HiChevronLeft, HiShare, HiHeart, HiStar
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
      setTimeout(() => setLoading(false), 500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin mb-6"></div>
          <p className="text-slate-500 font-bold text-lg animate-pulse">Fetching dream home details...</p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-premium max-w-md w-full text-center border border-slate-100"
        >
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <HiXCircle className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">Listing Unavailable</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">The property you're looking for might have been removed or is no longer available.</p>
          <Link to="/properties" className="btn-primary w-full flex items-center justify-center">
            <HiArrowLeft className="mr-2" />
            Explore Other Homes
          </Link>
        </motion.div>
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

  const nextImage = () => setActiveImage((prev) => (prev + 1) % displayImages.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + displayImages.length) % displayImages.length);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Dynamic Header */}
      <div className="bg-white border-b border-slate-100 sticky top-16 z-30 py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/properties" className="flex items-center text-slate-500 hover:text-primary-600 font-bold transition-all group">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mr-3 group-hover:bg-primary-50">
              <HiArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </div>
            <span>Back to listings</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
              <HiHeart className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary-600 hover:bg-primary-50 transition-all">
              <HiShare className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: VISUALS & SPECS */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Premium Gallery Wrapper */}
            <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-slate-100 p-3">
              <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden bg-slate-900 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    src={displayImages[activeImage].url}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
                
                {/* Image Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between px-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={prevImage} className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-900 hover:bg-white transition-all">
                    <HiChevronLeft className="w-7 h-7" />
                  </button>
                  <button onClick={nextImage} className="w-12 h-12 rounded-full glass flex items-center justify-center text-slate-900 hover:bg-white transition-all">
                    <HiChevronRight className="w-7 h-7" />
                  </button>
                </div>

                {/* Info Overlays */}
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="glass px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 shadow-2xl border-none">
                    {propertyType}
                  </span>
                  {available ? (
                    <span className="bg-emerald-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                      Live Listing
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl">
                      Occupied
                    </span>
                  )}
                </div>

                {/* Counter Overlay */}
                <div className="absolute bottom-6 right-6 bg-slate-900/40 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/20">
                  {activeImage + 1} / {displayImages.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              {displayImages.length > 1 && (
                <div className="flex gap-4 p-6 overflow-x-auto scrollbar-hide">
                  {displayImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={`relative flex-shrink-0 w-28 aspect-video rounded-2xl overflow-hidden border-4 transition-all transform ${
                        activeImage === index ? 'border-primary-600 scale-105 shadow-xl' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Title & Main Stats */}
            <div className="bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-100">
              <div className="flex flex-col md:flex-row justify-between gap-8 mb-10 pb-10 border-b border-slate-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary-600 font-bold uppercase text-xs tracking-widest">
                    <HiStar className="w-4 h-4" />
                    <span>Featured Property</span>
                  </div>
                  <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">{title}</h1>
                  <div className="flex items-center text-slate-500 font-medium text-lg">
                    <HiLocationMarker className="w-6 h-6 mr-2 text-primary-500" />
                    <span>{address?.street}, {address?.city}, {address?.state} {address?.pincode}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center min-w-[200px]">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-[10px] mb-2">Monthly Rent</p>
                  <div className="flex items-center text-primary-600">
                    <HiCurrencyRupee className="w-10 h-10" />
                    <span className="text-5xl font-black tracking-tighter">{rent?.amount?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'Bedrooms', val: `${bhk} BHK`, icon: <HiHome className="text-primary-500" /> },
                  { label: 'Furnishing', val: furnished, icon: <HiCheckCircle className="text-primary-500" /> },
                  { label: 'Total Area', val: `${area?.size || 'N/A'} ${area?.unit || ''}`, icon: <HiAdjustments className="text-primary-500" /> },
                  { label: 'Floor Level', val: floor !== null ? `${floor} of ${totalFloors}` : 'N/A', icon: <HiShieldCheck className="text-primary-500" /> }
                ].map((spec, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-3xl border border-slate-100 hover:bg-white hover:shadow-soft transition-all">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-xl mb-4 shadow-sm">
                      {spec.icon}
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{spec.label}</p>
                    <p className="text-slate-900 font-extrabold capitalize">{spec.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content & Amenities */}
            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-premium border border-slate-100">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center">
                  <div className="w-2 h-8 bg-primary-600 rounded-full mr-4"></div>
                  Property Description
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed text-lg whitespace-pre-line mb-10">
                  {description}
                </p>

                <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
                  <div className="w-2 h-8 bg-primary-600 rounded-full mr-4"></div>
                  Amenities
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {amenities?.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <HiCheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Info Sidebar Section */}
              <div className="space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-slate-100">
                  <h4 className="font-black text-slate-900 mb-6 uppercase tracking-widest text-xs">Financials</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500 font-bold text-sm">Security Deposit</span>
                      <span className="text-slate-900 font-black">₹{deposit?.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-slate-100">
                      <span className="text-slate-500 font-bold text-sm">Notice Period</span>
                      <span className="text-slate-900 font-black">1 Month</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-slate-500 font-bold text-sm">Brokerage</span>
                      <span className="text-emerald-600 font-black uppercase text-xs">Zero Fees</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-premium relative overflow-hidden">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <HiEye className="text-primary-400 w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-widest">{views} People Viewed</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium mb-2">Listed on</p>
                    <p className="text-xl font-black">{new Date(createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary-600/20 rounded-full blur-3xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACTIONS & CONTACT */}
          <div className="lg:col-span-4">
            <div className="sticky top-40 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-[3rem] p-10 shadow-premium border-2 border-primary-50 relative overflow-hidden"
              >
                {/* Visual Highlight */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400"></div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Interested?</h3>
                
                {hasAccess || contactInfo?.showContact ? (
                  <div className="space-y-6">
                    <div className="flex items-center p-5 bg-slate-50 rounded-3xl border border-slate-100">
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mr-4 text-2xl">
                        <HiUser className="text-primary-600" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Owner</p>
                        <p className="text-lg font-black text-slate-900">{ownerId?.name || 'Verified Owner'}</p>
                      </div>
                    </div>

                    <a href={`tel:${contactInfo?.phone}`} className="w-full btn-primary h-16 flex items-center justify-center gap-4 text-lg">
                      <HiPhone className="w-6 h-6" />
                      <span>Call Owner</span>
                    </a>

                    <a href={`mailto:${contactInfo?.email}`} className="w-full btn-secondary h-16 flex items-center justify-center gap-4 text-lg !border-slate-100">
                      <HiMail className="w-6 h-6" />
                      <span>Send Message</span>
                    </a>

                    <p className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Mention Rentify for a smooth experience</p>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="text-center py-6 bg-primary-50 rounded-[2rem] border border-primary-100">
                      <div className="w-20 h-20 bg-white rounded-3xl shadow-soft flex items-center justify-center mx-auto mb-6 text-3xl text-primary-600">
                        <HiShieldCheck />
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-2 tracking-tight">Details Locked</h4>
                      <p className="text-slate-500 font-medium text-sm px-6">Sign up for a premium plan to instantly unlock owner contact info.</p>
                    </div>

                    <Link to="/subscription-plans" className="w-full btn-primary h-16 flex items-center justify-center gap-3 shadow-premium">
                      <span>Unlock Contact Details</span>
                      <HiChevronRight className="w-5 h-5" />
                    </Link>

                    <div className="flex flex-col gap-4">
                      {[
                        "Direct owner contact",
                        "Priority virtual tour booking",
                        "Smart contract support"
                      ].map((txt, i) => (
                        <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-600">
                          <HiCheckCircle className="text-emerald-500 w-4 h-4" />
                          <span>{txt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

              {/* Verified Badge Card */}
              <div className="bg-emerald-50 rounded-[2.5rem] p-8 border border-emerald-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl text-emerald-500 shadow-sm">
                  <HiShieldCheck />
                </div>
                <div>
                  <h5 className="font-black text-emerald-900 tracking-tight">Rentify Verified</h5>
                  <p className="text-emerald-700/70 text-sm font-medium">This property has been physically inspected by our team.</p>
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
