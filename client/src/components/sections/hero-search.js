import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X, ChevronDown, Navigation } from 'lucide-react';
import { INDIAN_CITIES } from '../../utils/cities';
import { getCurrentCity } from '../../utils/geolocation';

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('Rent');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [locations, setLocations] = useState(['Whitefield', 'Electronic City']);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const navigate = useNavigate();

  const tabs = ['Buy', 'Rent', 'Commercial'];

  const removeLocation = (loc) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  const handleSearch = () => {
    navigate('/properties');
  };

  const handlePostProperty = () => {
    navigate('/add-property');
  };

  const handleDetectLocation = async (e) => {
    e.stopPropagation();
    setIsDetectingLocation(true);
    try {
      const city = await getCurrentCity();
      // Check if detected city is in our list, if not, we can still use it or alert
      setSelectedCity(city);
      setIsCityDropdownOpen(false);
    } catch (error) {
      alert('Could not detect location: ' + error.message);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  return (
    <section className="relative w-full min-h-[480px] bg-white flex flex-col items-center justify-start pt-12">
      {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Home Banner"
            className="w-full h-full object-cover object-center opacity-100 pointer-events-none"
          />
          {/* Subtle Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-[1200px]">
        {/* Headline */}
        <h1 className="text-[24px] md:text-[32px] font-bold text-white mb-8 leading-tight drop-shadow-lg">
          World&apos;s Largest Selection of <span className="text-primary">Zero Brokerage</span> Properties
        </h1>

        {/* Search Tab Interface */}
        <div className="w-full max-w-[900px]">
          {/* Tabs */}
          <div className="flex items-center justify-center gap-0 mb-[-1px]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 text-[16px] font-medium transition-all duration-200 border-b-2 outline-none ${
                  activeTab === tab
                    ? 'text-primary border-primary bg-white'
                    : 'text-text-muted border-transparent hover:text-text-main'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box Card */}
          <div className="bg-white rounded-nb shadow-search p-4 w-full border-t border-page-border">
            <div className="flex flex-col md:flex-row items-center gap-0 border border-page-border rounded-nb overflow-hidden">
              
              {/* City Selector */}
              <div 
                className="relative flex items-center px-4 py-3 bg-page-bg/50 border-r border-page-border min-w-[160px] cursor-pointer group"
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              >
                <div className="flex flex-col items-start overflow-hidden">
                  <span className="text-[10px] text-text-muted uppercase font-bold">City</span>
                  <span className="text-[14px] text-text-main font-semibold truncate max-w-[100px]">{selectedCity}</span>
                </div>
                <ChevronDown className={`ml-auto w-4 h-4 text-text-muted group-hover:text-text-main transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                
                {isCityDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 bg-white shadow-heavy rounded-b-nb border border-page-border z-50 mt-[1px] max-h-[300px] overflow-y-auto">
                    <div 
                      className="flex items-center gap-2 p-3 border-b border-page-border hover:bg-page-bg text-primary font-medium"
                      onClick={handleDetectLocation}
                    >
                      <Navigation className={`w-4 h-4 ${isDetectingLocation ? 'animate-pulse' : ''}`} />
                      {isDetectingLocation ? 'Detecting...' : 'Detect My Location'}
                    </div>
                    {INDIAN_CITIES.map((city) => (
                      <div
                        key={city}
                        className="p-3 hover:bg-page-bg text-[14px] text-text-main text-left border-b border-page-bg last:border-0"
                        onClick={() => {
                          setSelectedCity(city);
                          setIsCityDropdownOpen(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Location Input Area */}
              <div className="flex-1 flex flex-wrap items-center px-3 py-2 min-h-[54px] bg-white relative">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="flex items-center bg-[#E5F5F3] text-secondary px-2 py-1 rounded-nb mr-2 my-1 text-[13px] font-medium border border-secondary/20"
                  >
                    {loc}
                    <X
                      className="ml-1 w-3 h-3 cursor-pointer hover:text-secondary-hover"
                      onClick={() => removeLocation(loc)}
                    />
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Search upto 3 localities or landmarks"
                  className="flex-1 outline-none text-[14px] text-text-main placeholder-text-muted/60 min-w-[200px]"
                />
              </div>

              {/* Search Button */}
              <button 
                onClick={handleSearch}
                className="bg-primary hover:bg-primary-hover text-white px-8 h-[54px] md:h-auto flex items-center justify-center gap-2 font-semibold text-[16px] transition-colors duration-200 whitespace-nowrap min-w-[140px]"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
            
            {/* Filter Pills / Quick Settings */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="property_type" defaultChecked className="accent-primary w-4 h-4" />
                  <span className="text-[13px] text-text-muted group-hover:text-text-main">Full House</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="property_type" className="accent-primary w-4 h-4" />
                  <span className="text-[13px] text-text-muted group-hover:text-text-main">PG/Hostel</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer group border-l pl-6 border-page-border">
                  <span className="text-[13px] text-text-main font-medium">BHK Type</span>
                  <div className="flex items-center gap-2 bg-page-bg px-3 py-1 rounded-[16px] text-[12px] cursor-pointer hover:bg-page-border/40">
                    Select BHK Type <ChevronDown size={14} />
                  </div>
               </label>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 bg-white/90 backdrop-blur-sm rounded-nb p-6 shadow-heavy w-full max-w-[850px]">
          <div className="flex flex-col items-center gap-1 group">
             <div className="bg-white p-2 rounded-lg shadow-soft group-hover:shadow-heavy transition-shadow">
               <span className="text-secondary font-bold text-xl px-2">₹0</span>
             </div>
             <p className="text-[14px] font-bold text-black">No Brokerage</p>
             <p className="text-[11px] font-medium text-black/80">Directly from Owner</p>
          </div>
          <div className="flex flex-col items-center gap-1 group">
             <div className="bg-white p-2 rounded-lg shadow-soft group-hover:shadow-heavy transition-shadow">
               <MapPin className="text-primary w-6 h-6" />
             </div>
             <p className="text-[14px] font-bold text-black">Free Listing</p>
             <p className="text-[11px] font-medium text-black/80">Post property in minutes</p>
          </div>
        </div>
      </div>

      {/* Post Property Floating CTA */}
      <div className="mt-10 mb-8 z-10">
        <button 
          onClick={handlePostProperty}
          className="bg-secondary text-white px-6 py-2.5 rounded-nb font-medium text-[14px] shadow-heavy hover:bg-secondary-hover transition-all flex items-center gap-2"
        >
          Post Your Property for <span className="font-bold underline">FREE</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSearch;
