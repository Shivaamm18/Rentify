import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const {
    _id,
    title,
    description,
    rent,
    address,
    images,
    propertyType,
    bhk,
    furnished,
    available
  } = property;

  // Get the first image or a default image
  const imageUrl = images && images.length > 0 ? images[0].url : '/default-property.jpg';

  return (
    <div className="property-card">
      <Link to={`/properties/${_id}`} className="property-link">
        <div className="property-image">
          <img src={imageUrl} alt={title} />
          {!available && (
            <div className="property-status unavailable">Unavailable</div>
          )}
        </div>
        
        <div className="property-content">
          <div className="property-header">
            <h3 className="property-title">{title}</h3>
            <div className="property-price">₹{rent.amount.toLocaleString('en-IN')}/month</div>
          </div>
          
          <div className="property-location">
            {address.city}, {address.state}
          </div>
          
          <div className="property-details">
            <span className="property-type">{propertyType}</span>
            {bhk > 0 && <span className="property-bhk">{bhk} BHK</span>}
            <span className="property-furnished">{furnished}</span>
          </div>
          
          <div className="property-description">
            {description.substring(0, 100)}...
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;