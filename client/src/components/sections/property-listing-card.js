import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Heart, Share2, Camera } from 'lucide-react';

const PropertyListingCard = ({
  id,
  title = "3 BHK Flat In Embassy Pristine For Sale In Ibblur",
  location = "Embassy Pristine, Off Outer Ring Road, Near Iblur, Bangalore, 560103",
  price = "₹ 4.5 Crores",
  area = "3,200 sqft",
  direction = "East",
  imageUrl = "https://images.nobroker.in/images/8a9f9d828236294d018236318e470123/8a9f9d828236294d018236318e470123_75841_56543_medium.jpg",
  ownerName = "Ananthram",
  isVerified = true,
  type = "3 BHK",
  bathrooms = "3",
  parking = "Bike and Car",
  description = "Spacious home with great ventilation and natural light. Located in a prime locality with easy access to all major landmarks and facilities. Perfect for families looking for a modern lifestyle.",
}) => {
  const navigate = useNavigate();

  const handleContactOwner = (e) => {
    e.stopPropagation();
    if (id) {
      navigate(`/properties/${id}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <div 
      className="bg-white border border-page-border rounded-nb shadow-soft hover:shadow-heavy transition-shadow duration-200 overflow-hidden w-full max-w-[800px] cursor-pointer"
      onClick={() => id && navigate(`/properties/${id}`)}
    >
      {/* Property Header */}
      <div className="p-4 flex justify-between items-start border-b border-page-bg">
        <div className="flex-1">
          <h2 className="text-text-main text-[16px] font-medium leading-tight hover:underline">
            {title}
          </h2>
          <div className="flex items-center mt-1 text-text-muted text-[13px]">
            <span className="hover:underline">{location}</span>
          </div>
        </div>
        <div className="flex gap-4 ml-4">
          <button 
            className="text-text-muted hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            className="text-text-muted hover:text-primary transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Aligned Image Gallery */}
        <div className="relative w-full md:w-[280px] h-[200px] bg-page-bg flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>12 PHOTOS</span>
          </div>
          {isVerified && (
            <div className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
              Verified
            </div>
          )}
        </div>

        {/* Right Aligned Property Details */}
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-3 border-b border-page-bg">
            <div className="p-3 border-r border-page-bg text-center">
              <div className="text-text-main font-bold text-[16px]">{price}</div>
              <div className="text-text-muted text-[11px] uppercase mt-0.5">Price</div>
            </div>
            <div className="p-3 border-r border-page-bg text-center">
              <div className="text-text-main font-bold text-[16px]">{area}</div>
              <div className="text-text-muted text-[11px] uppercase mt-0.5">Builtup</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-text-main font-bold text-[16px]">{direction}</div>
              <div className="text-text-muted text-[11px] uppercase mt-0.5">Facing</div>
            </div>
          </div>
          
          <div className="p-4 flex-1">
            <div className="flex gap-8 mb-4">
              <div>
                <div className="text-text-muted text-[11px] uppercase font-medium">Type</div>
                <div className="text-text-main text-[13px] font-medium">{type}</div>
              </div>
              <div>
                <div className="text-text-muted text-[11px] uppercase font-medium">Bathrooms</div>
                <div className="text-text-main text-[13px] font-medium">{bathrooms}</div>
              </div>
              <div>
                <div className="text-text-muted text-[11px] uppercase font-medium">Parking</div>
                <div className="text-text-main text-[13px] font-medium">{parking}</div>
              </div>
            </div>
            <p className="text-text-muted text-[13px] line-clamp-2 leading-relaxed">
              {description}
              <span className="text-secondary font-medium hover:underline ml-1">Read More</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-page-bg/30 flex justify-between items-center border-t border-page-bg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-page-border flex items-center justify-center text-[12px] font-bold text-white uppercase">
            {ownerName.charAt(0)}
          </div>
          <div>
            <div className="text-text-main text-[12px] font-medium">{ownerName}</div>
            <div className="text-text-muted text-[10px]">Owner</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            className="px-4 py-2 border border-text-muted rounded-nb text-text-main text-[14px] font-semibold flex items-center gap-1 hover:bg-page-bg transition-colors uppercase"
            onClick={(e) => e.stopPropagation()}
          >
            Shortlist
          </button>
          <button 
            className="px-6 py-2 bg-primary text-white rounded-nb text-[14px] font-semibold hover:bg-primary-hover transition-colors uppercase"
            onClick={handleContactOwner}
          >
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;
