import React from 'react';
import HeroSearch from '../components/sections/hero-search';
import ServiceCategories from '../components/sections/service-categories';
import WhyRentify from '../components/sections/why-rentify';
import CtaBanner from '../components/sections/cta-banner';
import PropertyListingCard from '../components/sections/property-listing-card';

const Home = () => {
  return (
    <div className="bg-page-bg min-h-screen">
      {/* Hero Search Section */}
      <HeroSearch />

      {/* Service Categories Section */}
      <ServiceCategories />

        {/* Featured Properties Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto max-w-[1200px] px-4">
            <div className="text-center mb-10">
              <h2 className="text-[20px] md:text-[24px] font-medium text-[#464646] mb-2 uppercase tracking-tight">
                demos how we display your properties to the customer
              </h2>
              <div className="w-[60px] h-[3px] bg-[#FD3752] mx-auto"></div>
            </div>
            <div className="flex flex-col gap-6 items-center">
            {/* User Requested Property at the Top */}
            <PropertyListingCard 
              title="Spacious 2 BHK Apartment near IT Park"
              location="Whitefield, Bangalore, 560066"
              price="₹ 45,000 / month"
              area="1,200 sqft"
              direction="North"
              type="2 BHK"
              bathrooms="2"
              parking="Car"
              description="A perfect home for small families or working professionals. This 2 BHK apartment offers 24/7 security, power backup, and is within walking distance to IT parks and shopping centers."
              ownerName="Sneha Patil"
              ownerImageUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1502672260266-1c1ef2d9568e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            
            <PropertyListingCard 
              title="Modern 3 BHK Flat in Prime Location"
              location="Gachibowli, Hyderabad, 500032"
              price="₹ 85,000 / month"
              area="1,850 sqft"
              direction="West"
              type="3 BHK"
              bathrooms="3"
              parking="Car & Bike"
              description="Beautifully designed 3 BHK flat with modern amenities. Features a spacious living room, modular kitchen, and three well-ventilated bedrooms. Located close to major IT hubs."
              ownerName="Rajesh Kumar"
              ownerImageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />

            <PropertyListingCard 
              title="Luxury 4 BHK Villa with Private Garden"
              location="Jubilee Hills, Hyderabad, 500033"
              price="₹ 2.5 Lakh / month"
              area="4,500 sqft"
              direction="East"
              type="4 BHK"
              bathrooms="4+"
              parking="3 Cars"
              description="Experience elite living in this magnificent 4 BHK villa. Features a private landscaped garden, home theatre, and premium finishes throughout. Located in one of the most prestigious neighborhoods."
              ownerName="Vikram Reddy"
              ownerImageUrl="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
          </div>
        </div>
      </section>

      {/* Why Rentify Section */}
      <WhyRentify />

      {/* CTA Banner Section */}
      <CtaBanner />
    </div>
  );
};

export default Home;
