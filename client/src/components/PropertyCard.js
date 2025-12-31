import React from 'react';
import { Link } from 'react-router-dom';
import { HiLocationMarker, HiCurrencyRupee, HiHome, HiCheckCircle } from 'react-icons/hi';
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

  // Get the first image or a default placeholder
  const imageUrl = images && images.length > 0 
    ? images[0].url 
    : 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all group"
    >
      <Link to={`/properties/${_id}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            <span className="bg-white/90 backdrop-blur-sm text-primary-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
              {propertyType}
            </span>
            {available && (
              <span className="bg-green-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center space-x-1">
                <HiCheckCircle className="w-3 h-3" />
                <span>Available</span>
              </span>
            )}
          </div>
          {!available && (
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-white text-slate-900 px-4 py-2 rounded-lg font-bold shadow-lg">
                Unavailable
              </span>
            </div>
          )}
          <div className="absolute bottom-4 right-4">
            <div className="bg-primary-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg flex items-center space-x-1">
              <HiCurrencyRupee className="w-5 h-5" />
              <span className="text-lg">{rent.amount.toLocaleString('en-IN')}</span>
              <span className="text-xs font-normal opacity-80">/mo</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
          </div>
          
          <div className="flex items-center text-slate-500 text-sm mb-4">
            <HiLocationMarker className="w-4 h-4 mr-1 text-slate-400" />
            <span className="line-clamp-1">{address.city}, {address.state}</span>
          </div>
          
          <div className="flex items-center space-x-4 mb-4">
            {bhk > 0 && (
              <div className="flex items-center text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <HiHome className="w-4 h-4 mr-1.5 text-primary-500" />
                <span className="text-sm font-semibold">{bhk} BHK</span>
              </div>
            )}
            <div className="flex items-center text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
              <span className="text-sm font-semibold capitalize">{furnished}</span>
            </div>
          </div>
          
          <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed mb-4">
            {description}
          </p>
          
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-primary-600 font-bold text-sm group-hover:underline">
              View Details
            </span>
            <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-primary-400 transition-colors"></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
