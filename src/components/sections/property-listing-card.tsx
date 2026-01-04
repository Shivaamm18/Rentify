import React from 'react';
import Image from 'next/image';
import { MapPin, Heart, Share2, ChevronRight, Camera, MoveRight } from 'lucide-react';

interface PropertyListingCardProps {
  title?: string;
  location?: string;
  price?: string;
  area?: string;
  direction?: string;
  imageUrl?: string;
  ownerName?: string;
  isVerified?: boolean;
}

const PropertyListingCard: React.FC<PropertyListingCardProps> = ({
  title = "3 BHK Flat In Embassy Pristine For Sale In Ibblur",
  location = "Embassy Pristine, Off Outer Ring Road, Near Iblur, Bangalore, 560103",
  price = "₹ 4.5 Crores",
  area = "3,200 sqft",
  direction = "East",
  imageUrl = "https://images.nobroker.in/images/8a9f9d828236294d018236318e470123/8a9f9d828236294d018236318e470123_75841_56543_medium.jpg",
  ownerName = "Ananthram",
  isVerified = true,
}) => {
  return (
    <div className="bg-white border border-[#D4D4D4] rounded-[4px] shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] transition-shadow duration-200 overflow-hidden w-full max-w-[800px] font-sans">
      {/* Property Header */}
      <div className="p-4 flex justify-between items-start border-b border-[#F2F2F2]">
        <div className="flex-1">
          <h2 className="text-[#464646] text-[16px] font-medium leading-tight hover:underline cursor-pointer">
            {title}
          </h2>
          <div className="flex items-center mt-1 text-[#666666] text-[13px]">
            <span className="hover:underline cursor-pointer">{location}</span>
          </div>
        </div>
        <div className="flex gap-4 ml-4">
          <button className="text-[#666666] hover:text-[#FD3752] transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="text-[#666666] hover:text-[#FD3752] transition-colors">
            <Image 
              src="https://static.nobroker.in/static/img/property-detail/shortlist_heart.svg" 
              alt="Shortlist" 
              width={20} 
              height={20} 
              className="opacity-60"
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Left Aligned Image Gallery */}
        <div className="relative w-full md:w-[280px] h-[200px] bg-[#F2F2F2] flex-shrink-0">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 280px"
          />
          <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
            <Camera className="w-3 h-3" />
            <span>12 PHOTOS</span>
          </div>
          {isVerified && (
            <div className="absolute top-2 left-2 bg-[#009587] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
              Verified
            </div>
          )}
        </div>

        {/* Right Aligned Property Details */}
        <div className="flex-1 flex flex-col">
          <div className="grid grid-cols-3 border-b border-[#F2F2F2]">
            <div className="p-3 border-r border-[#F2F2F2] text-center">
              <div className="text-[#464646] font-bold text-[16px]">{price}</div>
              <div className="text-[#666666] text-[11px] uppercase mt-0.5">Price</div>
            </div>
            <div className="p-3 border-r border-[#F2F2F2] text-center">
              <div className="text-[#464646] font-bold text-[16px]">{area}</div>
              <div className="text-[#666666] text-[11px] uppercase mt-0.5">Builtup</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-[#464646] font-bold text-[16px]">{direction}</div>
              <div className="text-[#666666] text-[11px] uppercase mt-0.5">Facing</div>
            </div>
          </div>
          
          <div className="p-4 flex-1">
            <div className="flex gap-8 mb-4">
              <div>
                <div className="text-[#666666] text-[11px] uppercase font-medium">Apartment Type</div>
                <div className="text-[#464646] text-[13px] font-medium">3 BHK</div>
              </div>
              <div>
                <div className="text-[#666666] text-[11px] uppercase font-medium">Bathrooms</div>
                <div className="text-[#464646] text-[13px] font-medium">3</div>
              </div>
              <div>
                <div className="text-[#666666] text-[11px] uppercase font-medium">Parking</div>
                <div className="text-[#464646] text-[13px] font-medium">Bike and Car</div>
              </div>
            </div>
            <p className="text-[#666666] text-[13px] line-clamp-2 leading-relaxed">
              East facing 3 BHK apartment for sale. This spacious home is well ventilated and has multiple balconies. Located in a prime society with all modern amenities including clubhouse...
              <span className="text-[#009587] font-medium cursor-pointer ml-1">Read More</span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-[#F9F9F9] flex justify-between items-center border-t border-[#F2F2F2]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#D4D4D4] flex items-center justify-center text-[12px] font-bold text-white">
            {ownerName.charAt(0)}
          </div>
          <div>
            <div className="text-[#464646] text-[12px] font-medium">{ownerName}</div>
            <div className="text-[#666666] text-[10px]">Owner</div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-[#666666] rounded-[4px] text-[#464646] text-[14px] font-semibold flex items-center gap-1 hover:bg-[#F2F2F2] transition-colors uppercase">
            Shortlist
          </button>
          <button className="px-6 py-2 bg-[#FD3752] text-white rounded-[4px] text-[14px] font-semibold hover:bg-[#E62E46] transition-colors uppercase">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyListingCard;