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
              type="3 BHK"
              bathrooms="3"
              parking="Car & Bike"
              description="Beautifully designed 3 BHK flat with modern amenities. Features a spacious living room, modular kitchen, and three well-ventilated bedrooms. Located close to major IT hubs."
              ownerName="Rajesh Kumar"
              imageUrl="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
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
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1502672260266-1c1ef2d9568e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Cozy 1 BHK Studio for Professionals"
              location="Koramangala, Bangalore, 560034"
              price="₹ 25,000 / month"
              area="650 sqft"
              direction="South"
              type="1 RK/BHK"
              bathrooms="1"
              parking="Bike"
              description="Well-maintained 1 BHK studio apartment, fully furnished and ready to move in. Ideal for single professionals looking for a vibrant neighborhood with plenty of cafes and coworking spaces."
              ownerName="Amit Shah"
              imageUrl="https://images.unsplash.com/photo-1536376074432-bf121770b440?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Penthouse with City View & Terrace"
              location="Bandra West, Mumbai, 400050"
              price="₹ 3.2 Lakh / month"
              area="3,000 sqft"
              direction="North-East"
              type="4 BHK"
              bathrooms="4"
              parking="2 Cars"
              description="Stunning penthouse offering panoramic views of the Arabian Sea. Includes a massive private terrace, designer interiors, and exclusive building amenities including a rooftop pool and gym."
              ownerName="Priya Sharma"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Modern 2 BHK Flat with Balcony"
              location="HSR Layout, Bangalore, 560102"
              price="₹ 38,000 / month"
              area="1,150 sqft"
              direction="East"
              type="2 BHK"
              bathrooms="2"
              parking="Car & Bike"
              description="Brand new 2 BHK flat featuring large balconies with a park view. Modern kitchen fittings, elegant lighting, and high-quality wardrobes in all bedrooms. Excellent connectivity to Electronic City."
              ownerName="Suresh Raina"
              imageUrl="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Elegant 3 BHK Heritage Villa"
              location="Banjara Hills, Hyderabad, 500034"
              price="₹ 1.8 Lakh / month"
              area="3,200 sqft"
              direction="West"
              type="3 BHK"
              bathrooms="3"
              parking="2 Cars"
              description="Beautifully restored heritage property with modern amenities. This villa boasts high ceilings, vintage tiling, and a lush green backyard. Perfect for those who appreciate classic architecture."
              ownerName="Mahesh Babu"
              isVerified={true}
              imageUrl="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            />
            <PropertyListingCard 
              title="Minimalist 2 BHK near Metro Station"
              location="Worli, Mumbai, 400018"
              price="₹ 95,000 / month"
              area="1,000 sqft"
              direction="North"
              type="2 BHK"
              bathrooms="2"
              parking="Car"
              description="Chic, minimalist apartment located just minutes away from the metro station. Features floor-to-ceiling windows, smart home integration, and premium building security. Perfect for urban living."
              ownerName="Anjali Gupta"
              imageUrl="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
