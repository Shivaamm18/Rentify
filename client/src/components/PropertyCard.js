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
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-xl md:rounded-[2rem] overflow-hidden shadow-soft hover:shadow-premium border border-slate-100 transition-all group relative"
    >
      <button className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-red-500 transition-all border border-white/30">
        <HiHeart className="w-4 h-4 md:w-6 md:h-6" />
      </button>

      <Link to={`/properties/${_id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          
          <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-1.5 md:gap-2">
            <span className="glass px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] text-slate-900 shadow-sm border-none">
              {propertyType}
            </span>
            {available && (
              <span className="bg-emerald-500/90 backdrop-blur-sm text-white px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] shadow-sm flex items-center gap-1">
                <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse"></div>
                Available
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
            <div className="bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 md:px-4 md:py-2 rounded-xl md:rounded-2xl flex items-center gap-1 shadow-2xl border border-white/10">
              <HiCurrencyRupee className="w-4 h-4 md:w-5 md:h-5 text-primary-400" />
              <span className="text-base md:text-xl font-black tracking-tight">{rent?.amount?.toLocaleString('en-IN')}</span>
              <span className="text-[10px] md:text-xs opacity-60 font-medium lowercase">/mo</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 md:p-7">
          <div className="mb-3 md:mb-4">
            <h3 className="text-base md:text-xl font-extrabold text-slate-900 line-clamp-1 mb-1 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            <div className="flex items-center text-slate-500 text-xs md:text-sm font-medium">
              <HiLocationMarker className="w-3 h-3 md:w-4 md:h-4 mr-1 text-primary-500" />
              <span className="line-clamp-1">{address?.city}, {address?.state}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
            <div className="flex items-center justify-center gap-1.5 md:gap-2 py-1.5 md:py-2 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50 transition-colors">
              <HiHome className="w-3 h-3 md:w-4 md:h-4 text-primary-600" />
              <span className="text-[10px] md:text-xs font-bold text-slate-700">{bhk} BHK</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 md:gap-2 py-1.5 md:py-2 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 group-hover:border-primary-100 group-hover:bg-primary-50 transition-colors">
              <span className="text-[10px] md:text-xs font-bold text-slate-700 capitalize">{furnished}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 md:pt-5 border-t border-slate-100">
            <div className="flex -space-x-1.5 md:-space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?u=${i + _id}`} alt="user" />
                </div>
              ))}
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-primary-600">
                +12
              </div>
            </div>
            
            <div className="flex items-center gap-1 md:gap-1.5 text-primary-600 font-bold text-xs md:text-sm">
              <span className="hidden sm:inline">View Details</span>
              <span className="sm:hidden">View</span>
              <HiArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
