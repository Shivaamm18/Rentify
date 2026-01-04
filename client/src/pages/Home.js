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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-[20px] font-medium text-text-main uppercase tracking-tight">
              Featured Properties
            </h2>
            <button className="text-secondary font-medium hover:underline text-sm">
              View All Properties
            </button>
          </div>
          
          <div className="flex flex-col gap-6 items-center">
            <PropertyListingCard 
              title="Modern 3 BHK Flat in Prime Location"
              price="₹ 85,000 / month"
              area="1,850 sqft"
              direction="West"
              ownerName="Rajesh Kumar"
            />
            <PropertyListingCard 
              title="Spacious 2 BHK Apartment near IT Park"
              price="₹ 45,000 / month"
              area="1,200 sqft"
              direction="North"
              ownerName="Sneha Patil"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1502672260266-1c1ef2d9568e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
