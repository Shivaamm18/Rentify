import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, X, ChevronDown, Navigation, Sparkles } from 'lucide-react';
import { INDIAN_CITIES } from '../../utils/cities';
import { getCurrentCity, getNearbyLocalities } from '../../utils/geolocation';

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('Rent');
  const [selectedCity, setSelectedCity] = useState('Bangalore');
  const [locations, setLocations] = useState(['Whitefield', 'Electronic City']);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [nearbySuggestions, setNearbySuggestions] = useState([]);
  const [detectedLocationData, setDetectedLocationData] = useState(null);
  const navigate = useNavigate();

  // Load nearby suggestions if we already have location data or on first load for default city
  useEffect(() => {
    if (selectedCity === 'Bangalore' && nearbySuggestions.length === 0) {
      setNearbySuggestions(['Whitefield', 'Koramangala', 'Indiranagar', 'HSR Layout', 'Electronic City']);
    }
  }, [selectedCity]);

  const filteredCities = INDIAN_CITIES.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const tabs = ['Buy', 'Rent', 'Commercial'];

  const removeLocation = (loc) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  const addLocation = (loc) => {
    if (locations.length < 3 && !locations.includes(loc)) {
      setLocations([...locations, loc]);
    }
  };

  const handleSearch = () => {
    navigate('/properties');
  };

  const handlePostProperty = () => {
    navigate('/add-property');
  };

  const handleDetectLocation = async (e) => {
    if (e) e.stopPropagation();
    setIsDetectingLocation(true);
    try {
      const locationData = await getCurrentCity();
      setDetectedLocationData(locationData);
      setSelectedCity(locationData.city);
      
      const localities = await getNearbyLocalities(locationData);
      setNearbySuggestions(localities);
      
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
            <div className="bg-white rounded-nb shadow-search p-2 md:p-4 w-full border-t border-page-border">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-0 border border-page-border rounded-nb overflow-hidden">
                
                {/* City Selector */}
                <div 
                  className="relative flex items-center px-4 py-3 bg-page-bg/50 border-b md:border-b-0 md:border-r border-page-border min-w-full md:min-w-[160px] cursor-pointer group"
                  onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                >
                  <div className="flex flex-col items-start overflow-hidden">
                    <span className="text-[10px] text-text-muted uppercase font-bold">City</span>
                    <span className="text-[14px] text-text-main font-semibold truncate max-w-[150px] md:max-w-[100px]">{selectedCity}</span>
                  </div>
                  <ChevronDown className={`ml-auto w-4 h-4 text-text-muted group-hover:text-text-main transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
                  
                    {isCityDropdownOpen && (
                      <>
                        {/* Mobile Overlay Backdrop */}
                        <div className="fixed inset-0 bg-black/40 z-[100] md:hidden" onClick={(e) => { e.stopPropagation(); setIsCityDropdownOpen(false); }}></div>
                        
                        <div className="absolute top-full left-0 w-full md:w-64 bg-white shadow-heavy rounded-b-nb border border-page-border z-[101] md:z-50 mt-0 md:mt-[1px] flex flex-col fixed md:absolute inset-x-0 bottom-0 md:bottom-auto md:top-full h-[70vh] md:h-auto rounded-t-xl md:rounded-t-none">
                          <div className="p-4 border-b border-page-border sticky top-0 bg-white z-10 flex items-center justify-between">
                            <input
                              type="text"
                              placeholder="Search city..."
                              value={citySearch}
                              onChange={(e) => setCitySearch(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                              className="w-full px-3 py-2 bg-page-bg border border-page-border rounded-nb text-[14px] outline-none focus:border-primary"
                            />
                            <button className="ml-2 md:hidden p-1" onClick={(e) => { e.stopPropagation(); setIsCityDropdownOpen(false); }}>
                              <X size={20} className="text-text-muted" />
                            </button>
                          </div>
                          <div className="overflow-y-auto flex-1 pb-8 md:pb-0 md:max-h-[350px]">
                            <div 
                              className="flex items-center gap-2 p-4 border-b border-page-border hover:bg-page-bg text-primary font-medium cursor-pointer transition-colors"
                              onClick={handleDetectLocation}
                            >
                              <Navigation className={`w-5 h-5 md:w-4 md:h-4 ${isDetectingLocation ? 'animate-pulse' : ''}`} />
                              <div className="flex flex-col items-start">
                                <span className="text-[14px] md:text-[13px]">{isDetectingLocation ? 'Detecting...' : 'Detect My Location'}</span>
                                {detectedLocationData && (
                                  <span className="text-[11px] md:text-[10px] text-text-muted">Current: {detectedLocationData.suburb || detectedLocationData.city}</span>
                                )}
                              </div>
                            </div>
  
                            {/* Suggested Localities according to location */}
                            {nearbySuggestions.length > 0 && selectedCity === (detectedLocationData?.city || 'Bangalore') && (
                              <div className="bg-page-bg/30 pb-3">
                                <div className="px-4 py-2 text-[11px] font-bold text-text-muted uppercase flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 text-secondary" />
                                  Suggested Localities Near You
                                </div>
                                <div className="flex flex-wrap gap-2 px-4">
                                  {nearbySuggestions.map((suggestion) => (
                                    <div
                                      key={suggestion}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addLocation(suggestion);
                                        setIsCityDropdownOpen(false);
                                      }}
                                      className="px-4 py-1.5 md:px-3 md:py-1 bg-white border border-page-border rounded-full text-[13px] md:text-[12px] text-text-main hover:border-secondary hover:text-secondary cursor-pointer transition-all shadow-sm active:scale-95"
                                    >
                                      {suggestion}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
  
                            <div className="px-4 py-2 text-[11px] font-bold text-text-muted uppercase border-t border-page-bg mt-1">
                              Popular Cities
                            </div>
                            <div className="grid grid-cols-1 divide-y divide-page-bg">
                              {filteredCities.length > 0 ? (
                                filteredCities.map((city) => (
                                  <div
                                    key={city}
                                    className="p-4 md:p-3 hover:bg-page-bg text-[15px] md:text-[14px] text-text-main text-left cursor-pointer active:bg-page-bg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedCity(city);
                                      setIsCityDropdownOpen(false);
                                      setCitySearch('');
                                    }}
                                  >
                                    {city}
                                  </div>
                                ))
                              ) : (
                                <div className="p-4 text-[13px] text-text-muted text-center">No cities found</div>
                              )}
                            </div>
                        </div>
                      </div>
                    </>
                    )}
  
                </div>
  
                {/* Location Input Area */}
                <div className="flex-1 flex flex-wrap items-center px-3 py-2 min-h-[60px] md:min-h-[54px] bg-white relative">
                  {locations.map((loc) => (
                    <div
                      key={loc}
                      className="flex items-center bg-[#E5F5F3] text-secondary px-2.5 py-1.5 md:px-2 md:py-1 rounded-nb mr-2 my-1 text-[13px] font-medium border border-secondary/20 shadow-sm"
                    >
                      {loc}
                      <X
                        className="ml-2 w-4 h-4 md:w-3 md:h-3 cursor-pointer hover:text-secondary-hover"
                        onClick={(e) => { e.stopPropagation(); removeLocation(loc); }}
                      />
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Search localities or landmarks..."
                    className="flex-1 outline-none text-[15px] md:text-[14px] text-text-main placeholder-text-muted/60 min-w-[200px] py-2"
                  />
                </div>
  
                {/* Search Button */}
                <button 
                  onClick={handleSearch}
                  className="bg-primary hover:bg-primary-hover text-white px-8 h-[60px] md:h-auto flex items-center justify-center gap-2 font-semibold text-[16px] transition-colors duration-200 whitespace-nowrap w-full md:w-auto md:min-w-[140px]"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
              
              {/* Filter Pills / Quick Settings */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6 mt-4">
                 <label className="flex items-center gap-2 cursor-pointer group px-3 py-1 bg-page-bg/50 md:bg-transparent rounded-full md:rounded-none">
                    <input type="radio" name="property_type" defaultChecked className="accent-primary w-4 h-4" />
                    <span className="text-[13px] text-text-muted group-hover:text-text-main">Full House</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group px-3 py-1 bg-page-bg/50 md:bg-transparent rounded-full md:rounded-none">
                    <input type="radio" name="property_type" className="accent-primary w-4 h-4" />
                    <span className="text-[13px] text-text-muted group-hover:text-text-main">PG/Hostel</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer group border-t md:border-t-0 md:border-l pt-3 md:pt-0 md:pl-6 border-page-border w-full md:w-auto justify-center">
                    <span className="text-[13px] text-text-main font-medium">BHK Type</span>
                    <div className="flex items-center gap-2 bg-page-bg px-4 py-1.5 md:px-3 md:py-1 rounded-[16px] text-[12px] cursor-pointer hover:bg-page-border/40 transition-colors">
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
