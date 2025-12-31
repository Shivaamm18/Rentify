import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAPI } from '../services/api';
import './Home.css';

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
        setSuggestions(response.data.data.suggestions);
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

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Find Your Perfect Rental Property in India</h1>
            <p>Discover thousands of verified rental properties across India. Rent with confidence.</p>
            
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by property, city, or location..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={(e) => e.target.select()}
                />
                {suggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="suggestion-item"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        <strong>{suggestion.title}</strong>
                        <span>{suggestion.address.city}, {suggestion.address.state}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="search-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Location (City, State)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              
              <div className="search-group">
                <select
                  className="form-control"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="0-5000">₹0 - ₹5,000</option>
                  <option value="5000-10000">₹5,000 - ₹10,000</option>
                  <option value="10000-15000">₹10,000 - ₹15,000</option>
                  <option value="15000-25000">₹15,000 - ₹25,000</option>
                  <option value="25000-50000">₹25,000 - ₹50,000</option>
                  <option value="50000-">₹50,000+</option>
                </select>
              </div>
              
              <div className="search-group">
                <select
                  className="form-control"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="">Any Type</option>
                  {propertyTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Rentify?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Verified Properties</h3>
              <p>All properties are verified by our team to ensure authenticity.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best Prices</h3>
              <p>Compare prices and find the best deals across India.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Booking</h3>
              <p>Book your property in just a few clicks with our easy process.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3>Secure Transactions</h3>
              <p>Safe and secure payment options for your peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Find Your Perfect Home?</h2>
          <p>Join thousands of satisfied users who found their dream rental property with Rentify.</p>
          <div className="cta-buttons">
            <a href="/register" className="btn btn-primary">Get Started</a>
            <a href="/properties" className="btn btn-outline">View Properties</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;