import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Navigation } from 'lucide-react';

export const SearchableSelect = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option", 
  onDetectLocation,
  isDetecting = false,
  label
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter(option => 
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="block text-sm font-semibold text-slate-700 mb-1">{label}</label>}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all text-slate-900 flex items-center justify-between cursor-pointer"
      >
        <span className={value ? "text-slate-900" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden flex flex-col">
          <div className="p-2 border-b border-slate-50 sticky top-0 bg-white z-10 flex items-center gap-2">
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-2 py-2 text-sm outline-none bg-transparent"
              autoFocus
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {onDetectLocation && (
              <div 
                onClick={(e) => {
                  e.stopPropagation();
                  onDetectLocation();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 border-b border-slate-50 hover:bg-slate-50 text-primary font-medium cursor-pointer"
              >
                <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-pulse' : ''}`} />
                {isDetecting ? 'Detecting...' : 'Detect My Location'}
              </div>
            )}
            
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    onChange(option);
                    setIsOpen(false);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-3 text-sm cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0 ${
                    value === option ? 'bg-primary-50 text-primary font-semibold' : 'text-slate-700'
                  }`}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-sm text-slate-400 text-center">No options found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
