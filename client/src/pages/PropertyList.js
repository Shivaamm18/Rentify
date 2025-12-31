import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { propertyAPI, searchAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';
import './PropertyList.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
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
      const params = {
        ...filters,
        page: pagination.page
      };

      const response = await propertyAPI.getProperties(params);
      if (response.data.success) {
        setProperties(response.data.data.properties);
        setPagination({
          page: response.data.page,
          pages: response.data.pages,
          total: response.data.total
        });
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const propertyTypes = [
    'apartment', 'house', 'pg', 'flat', 'villa', 'independent'
  ];

  return (
    <div className="property-list-page">
      <div className="container">
        <h1>Find Rental Properties</h1>
        
        <div className="filters-section">
          <div className="filter-group">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              value={filters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              placeholder="Enter city"
            />
          </div>
          
          <div className="filter-group">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              value={filters.state}
              onChange={(e) => handleFilterChange('state', e.target.value)}
              placeholder="Enter state"
            />
          </div>
          
          <div className="filter-group">
            <label>Min Rent</label>
            <input
              type="number"
              className="form-control"
              value={filters.minRent}
              onChange={(e) => handleFilterChange('minRent', e.target.value)}
              placeholder="Min rent"
            />
          </div>
          
          <div className="filter-group">
            <label>Max Rent</label>
            <input
              type="number"
              className="form-control"
              value={filters.maxRent}
              onChange={(e) => handleFilterChange('maxRent', e.target.value)}
              placeholder="Max rent"
            />
          </div>
          
          <div className="filter-group">
            <label>Property Type</label>
            <select
              className="form-control"
              value={filters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
            >
              <option value="">All Types</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>BHK</label>
            <select
              className="form-control"
              value={filters.bhk}
              onChange={(e) => handleFilterChange('bhk', e.target.value)}
            >
              <option value="">Any BHK</option>
              <option value="1">1 BHK</option>
              <option value="2">2 BHK</option>
              <option value="3">3 BHK</option>
              <option value="4">4 BHK</option>
              <option value="5">5+ BHK</option>
            </select>
          </div>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="results-info">
              <p>{pagination.total} properties found</p>
            </div>
            
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
            
            {pagination.pages > 1 && (
              <div className="pagination">
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(pageNum => (
                  <button
                    key={pageNum}
                    className={`btn ${pagination.page === pageNum ? 'btn-primary' : 'btn-outline'}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyList;