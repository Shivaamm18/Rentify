import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { propertyAPI, subscriptionAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import './PropertyDetail.css';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    try {
      const response = await propertyAPI.getPropertyById(id);
      if (response.data.success) {
        setProperty(response.data.data.property);
        
        // Check if user has access to contact details
        if (isAuthenticated) {
          const accessResponse = await subscriptionAPI.checkPropertyAccess(id);
          if (accessResponse.data.success) {
            setHasAccess(accessResponse.data.data.hasAccess);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="container">
        <div className="error">
          <h2>Property not found</h2>
          <Link to="/properties" className="btn btn-primary">Back to Properties</Link>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    rent,
    deposit,
    propertyType,
    bhk,
    furnished,
    amenities,
    address,
    area,
    floor,
    totalFloors,
    images,
    available,
    views,
    contactInfo,
    ownerId,
    createdAt
  } = property;

  return (
    <div className="property-detail-page">
      <div className="container">
        <div className="property-detail-header">
          <Link to="/properties" className="btn btn-secondary">← Back to Properties</Link>
          <h1>{title}</h1>
        </div>

        <div className="property-detail-content">
          <div className="property-images">
            {images && images.length > 0 ? (
              images.map((img, index) => (
                <div key={index} className="property-image">
                  <img src={img.url} alt={`${title} - ${index + 1}`} />
                </div>
              ))
            ) : (
              <div className="property-image">
                <img src="/default-property.jpg" alt={title} />
              </div>
            )}
          </div>

          <div className="property-info">
            <div className="property-price">
              <h2>₹{rent.amount.toLocaleString('en-IN')}/month</h2>
              {deposit > 0 && <p>Deposit: ₹{deposit.toLocaleString('en-IN')}</p>}
            </div>

            <div className="property-features">
              <div className="feature">
                <strong>Type:</strong> {propertyType}
              </div>
              <div className="feature">
                <strong>BHK:</strong> {bhk} BHK
              </div>
              <div className="feature">
                <strong>Furnished:</strong> {furnished}
              </div>
              {area && area.size && (
                <div className="feature">
                  <strong>Area:</strong> {area.size} {area.unit}
                </div>
              )}
              {floor !== null && totalFloors !== null && (
                <div className="feature">
                  <strong>Floor:</strong> {floor} of {totalFloors}
                </div>
              )}
            </div>

            <div className="property-location">
              <h3>Location</h3>
              <p>
                {address.street}, {address.city}, {address.state} {address.pincode}, India
              </p>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>{description}</p>
            </div>

            {amenities && amenities.length > 0 && (
              <div className="property-amenities">
                <h3>Amenities</h3>
                <ul>
                  {amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="property-contact">
              <h3>Contact Information</h3>
              {hasAccess || contactInfo.showContact ? (
                <div className="contact-details">
                  <p><strong>Owner:</strong> {ownerId?.name}</p>
                  <p><strong>Phone:</strong> {contactInfo.phone}</p>
                  <p><strong>Email:</strong> {contactInfo.email}</p>
                </div>
              ) : (
                <div className="contact-restricted">
                  <p>Sign up for a subscription to view contact details</p>
                  <Link to="/subscription-plans" className="btn btn-primary">Get Subscription</Link>
                </div>
              )}
            </div>

            <div className="property-meta">
              <p><strong>Views:</strong> {views}</p>
              <p><strong>Available:</strong> {available ? 'Yes' : 'No'}</p>
              <p><strong>Listed on:</strong> {new Date(createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;