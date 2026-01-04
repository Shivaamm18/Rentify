import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HiPlus, HiHome, HiOfficeBuilding, HiPencilAlt, HiTrash, 
  HiInformationCircle, HiChartBar, HiPlusCircle
} from 'react-icons/hi';

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadMyProperties();
  }, []);

  const loadMyProperties = async () => {
    try {
      const response = await propertyAPI.getMyProperties();
      if (response.data.success) {
        setProperties(response.data.data.properties);
      }
    } catch (error) {
      console.error('Error fetching my properties:', error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property listing? This action cannot be undone.')) {
      try {
        const response = await propertyAPI.deleteProperty(id);
        if (response.data.success) {
          setProperties(properties.filter(p => p._id !== id));
        }
      } catch (error) {
        console.error('Error deleting property:', error);
        alert('Failed to delete property. Please try again.');
      }
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 tracking-tight">
              My <span className="text-primary-600">Properties</span>
            </h1>
            <p className="text-slate-500 font-medium">Manage your active listings and track performance</p>
          </div>
          
          <Link 
            to="/add-property" 
            className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-200 group"
          >
            <HiPlusCircle className="w-6 h-6 mr-2 group-hover:rotate-90 transition-transform" />
            Post New Property
          </Link>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Listings', val: properties.length, icon: <HiHome className="text-primary-600" />, color: 'bg-primary-50' },
            { label: 'Total Views', val: properties.reduce((acc, curr) => acc + (curr.views || 0), 0), icon: <HiChartBar className="text-blue-600" />, color: 'bg-blue-50' },
            { label: 'Avg Rent', val: `₹${properties.length ? Math.round(properties.reduce((acc, curr) => acc + (curr.rent?.amount || 0), 0) / properties.length).toLocaleString('en-IN') : 0}`, icon: <HiOfficeBuilding className="text-emerald-600" />, color: 'bg-emerald-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-soft flex items-center space-x-4">
              <div className={`${stat.color} p-4 rounded-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-slate-900">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-[2rem] h-[450px] border border-slate-100 p-6 animate-pulse">
                <div className="aspect-video bg-slate-100 rounded-2xl mb-6"></div>
                <div className="h-6 bg-slate-100 rounded-full w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-100 rounded-full w-1/2 mb-8"></div>
                <div className="h-12 bg-slate-100 rounded-2xl w-full"></div>
              </div>
            ))}
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {properties.map((property) => (
                <motion.div
                  key={property._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group relative"
                >
                  <PropertyCard property={property} />
                  
                  {/* Management Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all z-20">
                    <button 
                      onClick={() => navigate(`/properties/${property._id}/edit`)}
                      className="w-10 h-10 rounded-xl bg-white shadow-xl flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white transition-all border border-slate-100"
                      title="Edit Listing"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(property._id)}
                      className="w-10 h-10 rounded-xl bg-white shadow-xl flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white transition-all border border-slate-100"
                      title="Delete Listing"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
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
              <HiHome className="w-16 h-16 text-primary-200" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-4">No Listings Yet</h3>
            <p className="text-slate-500 font-medium mb-12 max-w-sm mx-auto leading-relaxed text-lg">
              You haven't posted any properties for rent yet. Start by listing your first property today!
            </p>
            <Link to="/add-property" className="btn-primary px-12">
              Post Your First Property
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
