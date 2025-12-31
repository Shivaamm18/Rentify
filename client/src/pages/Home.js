import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchAPI } from '../services/api';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiHome, HiCurrencyRupee, HiCheckCircle, HiShieldCheck, HiLightningBolt } from 'react-icons/hi';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const propertyTypes = [
    'apartment', 'house', 'pg', 'flat', 'villa', 'independent'
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (searchQuery) searchParams.append('query', searchQuery);
    if (location) searchParams.append('city', location);
    if (priceRange) {
      const [min, max] = priceRange.split('-');
      if (min) searchParams.append('minRent', min);
      if (max) searchParams.append('maxRent', max);
    }
    if (propertyType) searchParams.append('propertyType', propertyType);

    navigate(`/properties?${searchParams.toString()}`);
  };

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length > 2) {
      try {
        const response = await searchAPI.getPropertySuggestions(value);
        setSuggestions(response.data.data.suggestions || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setSearchQuery(suggestion.title || suggestion.address.city);
    setSuggestions([]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
              Find Your Perfect <span className="text-primary-600">Rental Property</span> in India
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Discover thousands of verified rental properties across India. 
              Rent with confidence and ease.
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="relative col-span-1 lg:col-span-2">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiSearch className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900"
                  placeholder="Property name or keywords..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full bg-white rounded-xl shadow-2xl border border-slate-100 py-2 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        type="button"
                        className="w-full px-4 py-2 text-left hover:bg-slate-50 flex flex-col"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        <span className="font-semibold text-slate-800">{suggestion.title}</span>
                        <span className="text-xs text-slate-500">{suggestion.address?.city}, {suggestion.address?.state}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiLocationMarker className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900"
                  placeholder="City"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiCurrencyRupee className="h-5 w-5 text-slate-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 bg-slate-50 border border-transparent rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-transparent transition-all text-slate-900 appearance-none"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-5000">₹0 - ₹5k</option>
                  <option value="5000-10000">₹5k - ₹10k</option>
                  <option value="10000-25000">₹10k - ₹25k</option>
                  <option value="25000-50000">₹25k - ₹50k</option>
                  <option value="50000-">₹50k+</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-primary-200 flex items-center justify-center space-x-2"
              >
                <HiSearch className="h-5 w-5" />
                <span>Search</span>
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Rentify?</h2>
            <div className="h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { icon: <HiShieldCheck className="w-8 h-8 text-green-500" />, title: 'Verified Properties', desc: 'All listings are verified by our expert team for authenticity.' },
              { icon: <HiCurrencyRupee className="w-8 h-8 text-blue-500" />, title: 'Transparent Pricing', desc: 'No hidden charges. What you see is what you pay.' },
              { icon: <HiLightningBolt className="w-8 h-8 text-amber-500" />, title: 'Instant Booking', desc: 'Contact owners and book your dream home instantly.' },
              { icon: <HiCheckCircle className="w-8 h-8 text-primary-500" />, title: 'Secure Deals', desc: 'End-to-end encrypted communication and secure payments.' },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
              >
                <div className="bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories / Property Types */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Property Types</h2>
              <p className="text-slate-600">Explore properties by their category</p>
            </div>
            <Link to="/properties" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {propertyTypes.map((type) => (
              <Link 
                key={type}
                to={`/properties?propertyType=${type}`}
                className="group bg-slate-50 hover:bg-primary-50 border border-slate-100 hover:border-primary-200 p-6 rounded-2xl text-center transition-all"
              >
                <div className="text-slate-400 group-hover:text-primary-600 mb-4 flex justify-center">
                  <HiHome className="w-10 h-10" />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-primary-700 capitalize">
                  {type}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-600 rounded-3xl p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-primary-500 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary-700 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative z-10 text-center max-w-3xl mx-auto text-white">
              <h2 className="text-3xl lg:text-5xl font-bold mb-8">Ready to Find Your Next Home?</h2>
              <p className="text-xl text-primary-100 mb-10 leading-relaxed">
                Join thousands of satisfied users who found their dream rental property with Rentify. 
                Start your journey today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="w-full sm:w-auto px-10 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition-colors shadow-xl">
                  Get Started
                </Link>
                <Link to="/properties" className="w-full sm:w-auto px-10 py-4 border-2 border-primary-400 text-white font-bold rounded-xl hover:bg-primary-500 transition-colors">
                  Browse Properties
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer is usually a separate component, but I'll add a simple one or ensure it's in App.js */}
    </div>
  );
};

export default Home;
