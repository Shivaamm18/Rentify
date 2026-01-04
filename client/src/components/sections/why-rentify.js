import React from 'react';
import { Handshake, PlusCircle, Search } from 'lucide-react';

const WhyRentify = () => {
  const benefits = [
    {
      id: 1,
      icon: <Handshake className="w-16 h-16 text-[#FD3752]" />,
      title: "Avoid Brokerage",
      description: "We connect you directly with real owners to save on brokerage. No middleman, no extra commissions."
    },
    {
      id: 2,
      icon: <PlusCircle className="w-16 h-16 text-[#FD3752]" />,
      title: "Free Listing",
      description: "List your property for free and get genuine leads. We help you find the right tenants or buyers effortlessly."
    },
    {
      id: 3,
      icon: <Search className="w-16 h-16 text-[#FD3752]" />,
      title: "Shortlist Without Visit",
      description: "Get photos and detailed information about properties to help you shortlist without even stepping out."
    }
  ];

  return (
    <section className="bg-white py-[40px] md:py-[60px] border-t border-[#D4D4D4]">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-[20px] md:text-[24px] font-medium text-[#464646] mb-2 uppercase tracking-tight">
            Why Use Rentify
          </h2>
          <div className="w-[60px] h-[3px] bg-[#FD3752] mx-auto"></div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {benefits.map((benefit) => (
            <div 
              key={benefit.id} 
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Container */}
              <div className="relative w-[180px] h-[140px] mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 bg-gray-50 rounded-lg">
                {benefit.icon}
              </div>

              {/* Text Content */}
              <div className="max-w-[280px]">
                <h3 className="text-[18px] font-bold text-[#464646] mb-3 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-[14px] leading-[1.6] text-[#666666] font-normal">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyRentify;
