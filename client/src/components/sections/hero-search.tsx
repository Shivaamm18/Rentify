import React, { useState } from 'react';
import { Search, MapPin, X, ChevronDown } from 'lucide-react';

const HeroSearch = () => {
  const [activeTab, setActiveTab] = useState('Buy');
  const [selectedCity] = useState('Mumbai');
  const [locations, setLocations] = useState(['Andheri East', 'Powai']);

  const tabs = ['Buy', 'Rent', 'Commercial'];

  const removeLocation = (loc) => {
    setLocations(locations.filter((l) => l !== loc));
  };

  return (
    <section className="relative w-full min-h-[480px] bg-[#f2f2f2] flex flex-col items-center justify-start pt-12">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://static.nobroker.in/static/img/home-banner/home-banner-desktop.png"
          alt="Home Banner"
          className="w-full h-full object-cover object-bottom opacity-20 pointer-events-none"
        />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center px-4 max-w-[1200px]">
        {/* Headline */}
        <h1 className="text-[24px] md:text-[32px] font-medium text-[#464646] mb-8 leading-tight">
          World&apos;s Largest Selection of <span className="text-[#FD3752]">Zero Brokerage</span> Properties
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
                    ? 'text-[#FD3752] border-[#FD3752] bg-white'
                    : 'text-[#666666] border-transparent hover:text-[#464646]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Box Card */}
          <div className="bg-white rounded-[4px] shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] p-4 w-full">
            <div className="flex flex-col md:flex-row items-center gap-0 border border-[#D4D4D4] rounded-[4px] overflow-hidden">
              
              {/* City Selector */}
              <div className="relative flex items-center px-4 py-3 bg-[#f8f8f8] border-r border-[#D4D4D4] min-w-[140px] cursor-pointer group">
                <span className="text-[14px] text-[#464646] font-medium">{selectedCity}</span>
                <ChevronDown className="ml-auto w-4 h-4 text-[#666666] group-hover:text-[#464646] transition-colors" />
              </div>

              {/* Location Input Area */}
              <div className="flex-1 flex flex-wrap items-center px-3 py-2 min-h-[54px] bg-white relative">
                {locations.map((loc) => (
                  <div
                    key={loc}
                    className="flex items-center bg-[#E5F5F3] text-[#009587] px-2 py-1 rounded-[4px] mr-2 my-1 text-[13px] font-medium border border-[#b2dfdb]"
                  >
                    {loc}
                    <X
                      className="ml-1 w-3 h-3 cursor-pointer hover:text-[#00796b]"
                      onClick={() => removeLocation(loc)}
                    />
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Search upto 3 localities or landmarks"
                  className="flex-1 outline-none text-[14px] text-[#464646] placeholder-[#999999] min-w-[200px]"
                />
              </div>

              {/* Search Button */}
              <button className="bg-[#FD3752] hover:bg-[#E62E46] text-white px-8 h-[54px] md:h-auto flex items-center justify-center gap-2 font-semibold text-[16px] transition-colors duration-200 whitespace-nowrap min-w-[140px]">
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
            
            {/* Filter Pills / Quick Settings */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-4">
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="property_type" defaultChecked className="accent-[#FD3752] w-4 h-4" />
                  <span className="text-[13px] text-[#666666] group-hover:text-[#464646]">Full House</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="property_type" className="accent-[#FD3752] w-4 h-4" />
                  <span className="text-[13px] text-[#666666] group-hover:text-[#464646]">PG/Hostel</span>
               </label>
               <label className="flex items-center gap-2 cursor-pointer group border-l pl-6 border-[#D4D4D4]">
                  <span className="text-[13px] text-[#222222] font-medium">BHK Type</span>
                  <div className="flex items-center gap-2 bg-[#f2f2f2] px-3 py-1 rounded-[16px] text-[12px] cursor-pointer hover:bg-[#e6e6e6]">
                    Select BHK Type <ChevronDown size={14} />
                  </div>
               </label>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16 border-t border-[#e2e2e2] pt-8 w-full max-w-[800px]">
          <div className="flex flex-col items-center gap-1 group">
             <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
               <span className="text-[#009587] font-bold text-xl px-2">₹0</span>
             </div>
             <p className="text-[14px] font-medium text-[#464646]">No Brokerage</p>
             <p className="text-[11px] text-[#666666]">Directly from Owner</p>
          </div>
          <div className="flex flex-col items-center gap-1 group">
             <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
               <MapPin className="text-[#FD3752] w-6 h-6" />
             </div>
             <p className="text-[14px] font-medium text-[#464646]">Free Listing</p>
             <p className="text-[11px] text-[#666666]">Post property in minutes</p>
          </div>
          <div className="flex flex-col items-center gap-1 group">
             <div className="bg-white p-2 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
               <div className="text-[#009587] font-bold text-xl px-2">45k+</div>
             </div>
             <p className="text-[14px] font-medium text-[#464646]">Verified Properties</p>
             <p className="text-[11px] text-[#666666]">Checked by our team</p>
          </div>
        </div>
      </div>

      {/* Post Property Floating CTA */}
      <div className="mt-10 mb-8 z-10">
        <button className="bg-[#009587] text-white px-6 py-2.5 rounded-[4px] font-medium text-[14px] shadow-md hover:bg-[#00796b] transition-all flex items-center gap-2">
          Post Your Property for <span className="font-bold underline">FREE</span>
        </button>
      </div>
    </section>
  );
}

export default HeroSearch;
