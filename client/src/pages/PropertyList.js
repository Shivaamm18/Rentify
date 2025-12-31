import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFilter, HiX, HiSearch, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    state: searchParams.get('state') || '',
    minRent: searchParams.get('minRent') || '',
    maxRent: searchParams.get('maxRent') || '',
    propertyType: searchParams.get('propertyType') || '',
    bhk: searchParams.get('bhk') || '',
    page: 1
  });

  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0
  });

  useEffect(() => {
    loadProperties();
  }, [filters]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const response = await propertyAPI.getProperties(filters);
      if (response.data.success) {
        setProperties(response.data.data.properties);
        setPagination({
          page: response.data.data.page || 1,
          pages: response.data.data.pages || 1,
          total: response.data.data.total || 0
        });
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, val]) => {
      if (val) params.set(key, val);
    });
    setSearchParams(params);
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const propertyTypes = [
    'apartment', 'house', 'pg', 'flat', 'villa', 'independent'
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Your New Home</h1>
              <p className="text-slate-600">Browse through our collection of verified properties</p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-colors font-medium"
            >
              {showFilters ? <HiX className="w-5 h-5" /> : <HiFilter className="w-5 h-5" />}
              <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Location</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">City</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                      placeholder="e.g. Mumbai"
                      value={filters.city}
                      onChange={(e) => handleFilterChange('city', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Min Rent</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                      placeholder="₹0"
                      value={filters.minRent}
                      onChange={(e) => handleFilterChange('minRent', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1">Max Rent</label>
                    <input
                      type="number"
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                      placeholder="₹Any"
                      value={filters.maxRent}
                      onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Property Type</h3>
                <div className="space-y-2">
                  <select
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm capitalize"
                    value={filters.propertyType}
                    onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                  >
                    <option value="">All Types</option>
                    {propertyTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Configuration</h3>
                <select
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-sm"
                  value={filters.bhk}
                  onChange={(e) => handleFilterChange('bhk', e.target.value)}
                >
                  <option value="">Any BHK</option>
                  {[1, 2, 3, 4, 5].map(n => (
                    <option key={n} value={n}>{n} BHK</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setFilters({ city: '', state: '', minRent: '', maxRent: '', propertyType: '', bhk: '', page: 1 })}
                className="w-full py-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Property Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-slate-900 font-bold">
                {loading ? 'Searching...' : `${pagination.total} Results Found`}
              </h2>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>Sort by:</span>
                <select className="bg-transparent font-semibold text-slate-900 focus:outline-none cursor-pointer">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 4, 5, 6].map(i => (
                  <div key={i} className="animate-pulse bg-white rounded-2xl h-[400px] border border-slate-100"></div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {properties.map((property) => (
                    <motion.div
                      key={property._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HiSearch className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">No Properties Found</h3>
                <p className="text-slate-600 mb-8 max-w-sm mx-auto">
                  We couldn't find any properties matching your current filters. Try adjusting your search criteria.
                </p>
                <button
                  onClick={() => setFilters({ city: '', state: '', minRent: '', maxRent: '', propertyType: '', bhk: '', page: 1 })}
                  className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-all"
                >
                  <HiChevronLeft className="w-6 h-6" />
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => handlePageChange(n)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all ${
                      pagination.page === n
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-50 hover:bg-slate-50 transition-all"
                >
                  <HiChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default PropertyList;
