import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { searchAPI } from '../services/api';
import { motion } from 'framer-motion';
import { HiSearch, HiLocationMarker, HiHome, HiCurrencyRupee, HiCheckCircle, HiShieldCheck, HiLightningBolt, HiArrowRight, HiStar } from 'react-icons/hi';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (searchQuery) searchParams.append('query', searchQuery);
    if (location) searchParams.append('city', location);
    navigate(`/properties?${searchParams.toString()}`);
  };

  const propertyTypes = [
    { label: 'Apartments', value: 'apartment', icon: '🏢' },
    { label: 'Houses', value: 'house', icon: '🏡' },
    { label: 'PG / Co-living', value: 'pg', icon: '👥' },
    { label: 'Villas', value: 'villa', icon: '🏰' },
    { label: 'Flats', value: 'flat', icon: '🏙️' },
    { label: 'Independent', value: 'independent', icon: '🏗️' }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Hero Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
                <HiStar className="text-yellow-400 w-5 h-5" />
                <span className="text-sm font-semibold tracking-wide uppercase">Trusted by 10k+ Tenants</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                Your Dream Home <br />
                <span className="text-primary-400 italic">Verified</span> & Ready.
              </h1>
              <p className="text-xl text-slate-100 mb-12 max-w-lg leading-relaxed opacity-90">
                Skip the broker. Discover verified rental properties with zero hidden costs and 100% transparency.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/properties" className="btn-primary py-4 px-8 text-lg">
                  Explore Listings
                </Link>
                <Link to="/register" className="btn-secondary py-4 px-8 text-lg !bg-white/10 !text-white border-white/30 backdrop-blur-sm hover:!bg-white/20">
                  List Your Property
                </Link>
              </div>
            </motion.div>

            {/* Premium Search Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 rounded-3xl shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Find Your Perfect Match</h3>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                  <div className="relative">
                    <HiLocationMarker className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Enter city (e.g. Bangalore, Noida)"
                      className="input-field pl-12"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Search Anything</label>
                  <div className="relative">
                    <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      placeholder="Property name, BHK, area..."
                      className="input-field pl-12"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-primary-50 rounded-2xl border border-primary-100">
                    <p className="text-xs font-bold text-primary-600 uppercase mb-1">Price Range</p>
                    <p className="text-sm font-semibold text-slate-800">Any Budget</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Property Type</p>
                    <p className="text-sm font-semibold text-slate-800">All Types</p>
                  </div>
                </div>
                <button type="submit" className="w-full btn-primary py-4 text-lg mt-4 flex items-center justify-center space-x-2">
                  <HiSearch className="w-6 h-6" />
                  <span>Search Properties</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale transition-all hover:grayscale-0">
            <span className="text-2xl font-black text-slate-400">ZILLOW</span>
            <span className="text-2xl font-black text-slate-400">AIRBNB</span>
            <span className="text-2xl font-black text-slate-400">MAGICBRICKS</span>
            <span className="text-2xl font-black text-slate-400">HOUSING</span>
            <span className="text-2xl font-black text-slate-400">NOBROKER</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Browse by Property Type</h2>
            <p className="text-slate-600 text-lg">Find the perfect category that fits your lifestyle</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {propertyTypes.map((type, i) => (
              <Link 
                key={i}
                to={`/properties?propertyType=${type.value}`}
                className="group p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center transition-all hover:bg-white hover:shadow-premium hover:-translate-y-2"
              >
                <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{type.icon}</div>
                <span className="font-bold text-slate-800 block">{type.label}</span>
                <span className="text-xs text-primary-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">Explore</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-600/10 blur-3xl rounded-full translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">We Make Renting <br /><span className="text-primary-400 underline decoration-wavy underline-offset-8">Delightful</span> again.</h2>
              <div className="space-y-8">
                {[
                  { icon: <HiShieldCheck />, title: "Verified Listings", desc: "Every property goes through a 20-point verification process before it goes live." },
                  { icon: <HiLightningBolt />, title: "Instant Visit Booking", desc: "Found something you like? Book a physical or virtual tour in one click." },
                  { icon: <HiCheckCircle />, title: "Digital Agreement", desc: "No more stamp paper hassle. Sign your rental agreements digitally in minutes." }
                ].map((item, i) => (
                  <div key={i} className="flex space-x-6 group">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all shadow-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  className="w-full h-full object-cover" 
                  alt="Modern Living"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-3xl shadow-2xl text-slate-900 max-w-xs -rotate-3 border-none">
                <div className="flex items-center space-x-1 text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => <HiStar key={i} />)}
                </div>
                <p className="font-medium italic mb-4 text-lg">"The best experience I've ever had finding a house in Bangalore. No brokers, no stress!"</p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <p className="font-bold text-sm">Rahul Sharma</p>
                    <p className="text-xs text-slate-500">Software Engineer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-[3rem] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black mb-8">Ready to Move In?</h2>
              <p className="text-xl text-primary-100 mb-12 max-w-2xl mx-auto opacity-90 leading-relaxed">
                Join 50,000+ happy tenants who found their perfect home with Rentify. Your next adventure starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link to="/register" className="px-12 py-5 bg-white text-primary-600 font-bold rounded-2xl hover:bg-slate-50 transition-all transform hover:scale-105 shadow-xl text-lg">
                  Create Free Account
                </Link>
                <Link to="/properties" className="px-12 py-5 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all text-lg flex items-center justify-center space-x-2">
                  <span>Browse All Homes</span>
                  <HiArrowRight />
                </Link>
              </div>
            </div>
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-900/20 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
