import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'property-management',
    label: 'Property Management',
    iconSrc: 'https://static.nobroker.in/static/img/resale/resale_home_v2.png',
    href: '/properties',
  },
  {
    id: 'legal-services',
    label: 'Legal Services',
    iconSrc: 'https://static.nobroker.in/static/img/rent/rent_home_v2.png',
    href: '#',
  },
  {
    id: 'cleaning-services',
    label: 'Cleaning & Painting',
    iconSrc: 'https://static.nobroker.in/static/img/commercial/commercial_home_v2.png',
    href: '#',
  },
  {
    id: 'rent-agreement',
    label: 'Rent Agreement',
    iconSrc: 'https://static.nobroker.in/static/img/rent/rent_home_v2.png',
    href: '#',
  },
  {
    id: 'rent-receipts',
    label: 'Rent Receipts',
    iconSrc: 'https://static.nobroker.in/static/img/resale/resale_home_v2.png',
    href: '#',
  },
  {
    id: 'tenant-verification',
    label: 'Tenant Verification',
    iconSrc: 'https://static.nobroker.in/static/img/commercial/commercial_home_v2.png',
    href: '#',
  }
];

const ServiceCategories = () => {
  return (
    <section className="w-full bg-page-bg py-10 md:py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col items-center">
          <h2 className="text-[18px] md:text-[20px] font-medium text-text-main mb-8 text-center uppercase tracking-tight">
            Our Core Offerings
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.href}
                className="group flex flex-col items-center justify-start p-4 transition-all duration-200"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  {/* Circular Icon Container */}
                  <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full bg-white flex items-center justify-center shadow-soft transition-shadow duration-300 group-hover:shadow-heavy ring-1 ring-black/5">
                    <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px]">
                      <img
                        src={service.iconSrc}
                        alt={service.label}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  
                  {/* Subtle hover indicator dot */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                
                <span className="text-[14px] font-medium text-text-main text-center leading-tight group-hover:text-primary transition-colors duration-200 max-w-[100px]">
                  {service.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Highlights beneath grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-page-border pt-10">
          {[
            { title: 'Zero Brokerage', desc: 'Direct owner contact only' },
            { title: 'Verified Listings', desc: 'Manual property verification' },
            { title: 'Safe & Secure', desc: 'Secure payment & documentation' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-3 px-4 py-2 border-r last:border-r-0 border-page-border/50">
              <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-text-main leading-none mb-1">{feature.title}</p>
                <p className="text-[12px] text-text-muted leading-none">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
