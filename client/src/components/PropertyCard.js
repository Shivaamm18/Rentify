import React from 'react';
import { Link } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyRupee, HiHome, HiCheckCircle, HiHeart, HiArrowRight } from 'react-icons/hi';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const {
    _id,
    title,
    description,
    rent,
    address,
    images,
    propertyType,
    bhk,
    furnished,
    available
  } = property;

  const imageUrl = images && images.length > 0 
    ? images[0].url 
    : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-[2rem] overflow-hidden shadow-soft hover:shadow-premium border border-slate-100 transition-all group relative"
    >
      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all border border-white/30">
        <HiHeart className="w-6 h-6" />
      </button>

      <Link to={`/properties/${_id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Status Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <span className="glass px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 shadow-sm border-none">
              {propertyType}
            </span>
            {available && (
              <span className="bg-emerald-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-sm flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                Available
              </span>
            )}
          </div>

          {/* Price Tag Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl flex items-center gap-1 shadow-2xl border border-white/10">
              <HiCurrencyRupee className="w-5 h-5 text-primary-400" />
              <span className="text-xl font-black tracking-tight">{rent?.amount?.toLocaleString('en-IN')}</span>
              <span className="text-xs opacity-60 font-medium lowercase">/mo</span>
            </div>
          </div>
        </div>
        
        <div className="p-7">
          <div className="mb-4">
            <h3 className="text-xl font-extrabold text-slate-900 line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-slate-500 text-sm font-medium">
              <HiLocationMarker className="w-4 h-4 mr-1 text-primary-500" />
              <span className="line-clamp-1">{address?.city}, {address?.state}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center justify-center gap-2 py-2 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50 transition-colors">
              <HiHome className="w-4 h-4 text-primary-600" />
              <span className="text-xs font-bold text-slate-700">{bhk} BHK</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 bg-slate-50 rounded-2xl border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50 transition-colors">
              <span className="text-xs font-bold text-slate-700 capitalize">{furnished}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-5 border-t border-slate-100">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + _id}`} alt="user" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-600">
                +12
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 text-primary-600 font-bold text-sm">
              <span>View Details</span>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
