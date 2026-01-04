import React from 'react';
import { Link } from 'react-router-dom';

const CtaBanner = () => {
  return (
    <section className="bg-page-bg py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div 
          className="relative overflow-hidden bg-[#2C2C2C] rounded-nb px-6 py-10 md:px-12 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4"
          style={{
            backgroundImage: `url('https://static.nobroker.in/static/img/home/post-prop-bg-mobile.png')`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize: 'contain'
          }}
        >
          {/* Text Content */}
          <div className="z-10 text-center md:text-left">
            <h2 className="text-white text-[20px] md:text-[24px] font-medium leading-tight mb-2">
              Are you a Property Owner?
            </h2>
            <p className="text-white text-[14px] md:text-[16px] opacity-90">
              Post your property for <span className="font-semibold italic">Free</span> and get verified tenants/buyers without paying any brokerage.
            </p>
          </div>

          {/* Action Button */}
          <div className="z-10 flex-shrink-0">
            <Link
              to="/add-property"
              className="inline-block bg-primary hover:bg-primary-hover text-white text-[15px] md:text-[16px] font-semibold px-8 py-3 rounded-nb transition-colors duration-200 uppercase tracking-wide shadow-sm"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Post Your Property FREE
            </Link>
          </div>

          {/* Decorative Overlay for better contrast/depth */}
          <div className="absolute inset-0 bg-black opacity-10 pointer-events-none md:hidden"></div>
        </div>
        
        {/* Optional secondary disclaimer text */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[12px] text-text-muted">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Get Verified Tenants / Buyers
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Save thousands in Brokerage
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            100% Direct Owners Only
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
