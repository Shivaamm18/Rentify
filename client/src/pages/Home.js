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
            <PropertyListingCard 
              title="Modern 3 BHK Flat in Prime Location"
              location="Gachibowli, Hyderabad, 500032"
              price="₹ 85,000 / month"
              area="1,850 sqft"
              direction="West"
              ownerName="Rajesh Kumar"
              imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Spacious 2 BHK Apartment near IT Park"
              location="Whitefield, Bangalore, 560066"
              price="₹ 45,000 / month"
              area="1,200 sqft"
              direction="North"
              ownerName="Sneha Patil"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1502672260266-1c1ef2d9568e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Luxury 4 BHK Villa with Private Garden"
              location="Jubilee Hills, Hyderabad, 500033"
              price="₹ 2.5 Lakh / month"
              area="4,500 sqft"
              direction="East"
              ownerName="Vikram Reddy"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Cozy 1 BHK Studio for Professionals"
              location="Koramangala, Bangalore, 560034"
              price="₹ 25,000 / month"
              area="650 sqft"
              direction="South"
              ownerName="Amit Shah"
              imageUrl="https://images.unsplash.com/photo-1536376074432-bf121770b440?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Penthouse with City View & Terrace"
              location="Bandra West, Mumbai, 400050"
              price="₹ 3.2 Lakh / month"
              area="3,000 sqft"
              direction="North-East"
              ownerName="Priya Sharma"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
