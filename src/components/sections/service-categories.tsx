import React from 'react';
import Image from 'next/image';

interface ServiceItem {
  id: string;
  label: string;
  iconSrc: string;
  href: string;
}

const services: ServiceItem[] = [
  {
    id: 'property-management',
    label: 'Property Management',
    iconSrc: 'https://static.nobroker.in/static/img/resale/resale_home_v2.png',
    href: '#',
  },
  {
    id: 'legal-services',
    label: 'Legal Services',
    iconSrc: 'https://static.nobroker.in/static/img/rent/rent_home_v2.png',
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
    <section className="w-full bg-[#F2F2F2] py-10 md:py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col items-center">
          <h2 className="text-[18px] md:text-[20px] font-medium text-[#464646] mb-8 text-center">
            Our Core Offerings
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full">
            {services.map((service) => (
              <a
                key={service.id}
                href={service.href}
                className="group flex flex-col items-center justify-start p-4 transition-all duration-200"
              >
                <div className="relative mb-3 flex items-center justify-center">
                  {/* Circular Icon Container */}
                  <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full bg-white flex items-center justify-center shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] transition-shadow duration-300 group-hover:shadow-[0_4px_8px_0_rgba(0,0,0,0.15)] ring-1 ring-black/5">
                    <div className="relative w-[36px] h-[36px] md:w-[40px] md:h-[40px]">
                      <Image
                        src={service.iconSrc}
                        alt={service.label}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 36px, 40px"
                      />
                    </div>
                  </div>
                  
                  {/* Subtle hover indicator dot (optional, matching brand style) */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                
                <span className="text-[14px] font-medium text-[#464646] text-center leading-tight group-hover:text-primary transition-colors duration-200 max-w-[100px]">
                  {service.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Feature Highlights beneath grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#D4D4D4] pt-10">
          {[
            { title: 'Zero Brokerage', desc: 'Direct owner contact only' },
            { title: 'Verified Listings', desc: 'Manual property verification' },
            { title: 'Safe & Secure', desc: 'Secure payment & documentation' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-3 px-4 py-2 border-r last:border-r-0 border-[#D4D4D4]/50">
              <div className="w-2 h-2 rounded-full bg-secondary shrink-0" />
              <div>
                <p className="text-[14px] font-semibold text-[#464646] leading-none mb-1">{feature.title}</p>
                <p className="text-[12px] text-[#666666] leading-none">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;