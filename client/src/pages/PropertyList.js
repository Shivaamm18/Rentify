import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { HiFilter, HiX, HiSearch, HiChevronLeft, HiChevronRight, HiAdjustments, HiViewGrid, HiMap } from 'react-icons/hi';

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
      setTimeout(() => setLoading(false), 500); // Small delay for smoother feel
    }
  };

  const handleFilterChange = (name, value) => {
    const newFilters = { ...filters, [name]: value, page: 1 };
    setFilters(newFilters);
    
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
    { label: 'Apartments', value: 'apartment' },
    { label: 'Houses', value: 'house' },
    { label: 'PG / Co-living', value: 'pg' },
    { label: 'Villas', value: 'villa' },
    { label: 'Flats', value: 'flat' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-xl">
              <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                Explore <span className="text-primary-600">Verified</span> Homes
              </h1>
              <p className="text-slate-500 font-medium">
                We've found {pagination.total} unique properties matching your preferences. Every listing is manually verified for your peace of mind.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                <button className="p-2.5 bg-white rounded-xl shadow-sm text-primary-600">
                  <HiViewGrid className="w-5 h-5" />
                </button>
                <button className="p-2.5 text-slate-400 hover:text-slate-600 transition-colors">
                  <HiMap className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold transition-all shadow-lg ${
                  showFilters 
                    ? 'bg-slate-900 text-white shadow-slate-900/20' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 shadow-slate-200/50'
                }`}
              >
                <HiAdjustments className="w-5 h-5" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Enhanced Sidebar Filters */}
          <aside className={`lg:w-80 flex-shrink-0 space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-premium space-y-10">
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Location</h3>
                <div className="relative group">
                  <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="text"
                    className="w-full pl-11 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-primary-500 transition-all text-sm font-bold text-slate-900"
                    placeholder="Which city?"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Property Type</h3>
                <div className="grid grid-cols-1 gap-2">
                  {propertyTypes.map(type => (
                    <button
                      key={type.value}
                      onClick={() => handleFilterChange('propertyType', filters.propertyType === type.value ? '' : type.value)}
                      className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all text-sm font-bold ${
                        filters.propertyType === type.value
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {type.label}
                      {filters.propertyType === type.value && <HiX className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Configuration</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5].map(n => (
                    <button
                      key={n}
                      onClick={() => handleFilterChange('bhk', filters.bhk === n.toString() ? '' : n.toString())}
                      className={`py-3 rounded-2xl transition-all text-sm font-black ${
                        filters.bhk === n.toString()
                          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {n}BHK
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Budget (Monthly)</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Min</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm font-bold"
                        placeholder="₹0"
                        value={filters.minRent}
                        onChange={(e) => handleFilterChange('minRent', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase">Max</label>
                      <input
                        type="number"
                        className="w-full px-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-primary-500 text-sm font-bold"
                        placeholder="₹Any"
                        value={filters.maxRent}
                        onChange={(e) => handleFilterChange('maxRent', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </section>

              <button
                onClick={() => setFilters({ city: '', state: '', minRent: '', maxRent: '', propertyType: '', bhk: '', page: 1 })}
                className="w-full py-4 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all"
              >
                Reset All Filters
              </button>
            </div>
          </aside>

          {/* Premium Property Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-white rounded-[2rem] h-[500px] border border-slate-100 p-7 animate-pulse">
                    <div className="aspect-[4/3] bg-slate-100 rounded-3xl mb-6"></div>
                    <div className="h-6 bg-slate-100 rounded-full w-2/3 mb-4"></div>
                    <div className="h-4 bg-slate-100 rounded-full w-1/2 mb-8"></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-10 bg-slate-100 rounded-2xl"></div>
                      <div className="h-10 bg-slate-100 rounded-2xl"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <AnimatePresence mode="popLayout">
                  {properties.map((property) => (
                    <motion.div
                      key={property._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-premium"
              >
                <div className="bg-primary-50 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                  <HiSearch className="w-16 h-16 text-primary-200" />
                </div>
                <h3 className="text-3xl font-black text-slate-900 mb-4">No Matches Found</h3>
                <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed text-lg">
                  We couldn't find any properties matching your filters. Try being less specific or resetting all filters.
                </p>
                <button
                  onClick={() => setFilters({ city: '', state: '', minRent: '', maxRent: '', propertyType: '', bhk: '', page: 1 })}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}

            {/* Pagination */}
            {!loading && pagination.pages > 1 && (
              <div className="mt-20 flex items-center justify-center space-x-3">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
                >
                  <HiChevronLeft className="w-6 h-6" />
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(n => (
                  <button
                    key={n}
                    onClick={() => handlePageChange(n)}
                    className={`w-14 h-14 rounded-2xl font-black transition-all ${
                      pagination.page === n
                        ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/40 translate-y-[-4px]'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {n}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-400 disabled:opacity-30 hover:bg-slate-50 transition-all shadow-sm"
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
