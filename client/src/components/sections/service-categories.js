import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Truck, 
  Paintbrush, 
  ShieldCheck, 
  Receipt, 
  UserCheck,
  CreditCard,
  Home
} from 'lucide-react';

const services = [
  {
    id: 'pay-rent',
    label: 'Pay Rent',
    icon: <CreditCard className="w-8 h-8 text-primary" />,
    href: '#',
    color: 'bg-red-50'
  },
  {
    id: 'rent-agreement',
    label: 'Rent Agreement',
    icon: <FileText className="w-8 h-8 text-secondary" />,
    href: '#',
    color: 'bg-teal-50'
  },
  {
    id: 'packers-movers',
    label: 'Packers & Movers',
    icon: <Truck className="w-8 h-8 text-blue-500" />,
    href: '#',
    color: 'bg-blue-50'
  },
  {
    id: 'cleaning-painting',
    label: 'Painting & Cleaning',
    icon: <Paintbrush className="w-8 h-8 text-orange-500" />,
    href: '#',
    color: 'bg-orange-50'
  },
  {
    id: 'legal-services',
    label: 'Legal Services',
    icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />,
    href: '#',
    color: 'bg-indigo-50'
  },
  {
    id: 'rent-receipts',
    label: 'Rent Receipts',
    icon: <Receipt className="w-8 h-8 text-green-500" />,
    href: '#',
    color: 'bg-green-50'
  },
  {
    id: 'tenant-verification',
    label: 'Tenant Verification',
    icon: <UserCheck className="w-8 h-8 text-purple-500" />,
    href: '#',
    color: 'bg-purple-50'
  },
  {
    id: 'property-management',
    label: 'Property Management',
    icon: <Home className="w-8 h-8 text-amber-500" />,
    href: '/properties',
    color: 'bg-amber-50'
  }
];

const ServiceCategories = () => {
  return (
    <section className="w-full bg-page-bg py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex flex-col items-center">
          <h2 className="text-[20px] md:text-[24px] font-bold text-text-main mb-2 text-center uppercase tracking-wider">
            Our Core Offerings
          </h2>
          <p className="text-text-muted text-sm md:text-base mb-10 text-center">
            One-stop solution for all your real estate needs
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6 w-full">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.href}
                className="group flex flex-col items-center justify-start transition-all duration-300"
              >
                <div className={`relative mb-4 w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-2xl ${service.color} flex items-center justify-center shadow-sm border border-page-border/30 group-hover:shadow-md group-hover:-translate-y-1 transition-all duration-300`}>
                  {service.icon}
                  {/* Hover indicator */}
                  <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                </div>
                
                <span className="text-[13px] md:text-[14px] font-semibold text-text-main text-center leading-tight group-hover:text-primary transition-colors duration-200">
                  {service.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Feature Highlights beneath grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-6 rounded-2xl border border-page-border/50 shadow-soft">
          {[
            { title: 'Zero Brokerage', desc: 'Direct owner contact only' },
            { title: 'Verified Listings', desc: 'Manual property verification' },
            { title: 'Safe & Secure', desc: 'Secure payment & documentation' }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center space-x-4 px-4 py-2 md:border-r last:border-r-0 border-page-border/50">
              <div className="w-3 h-3 rounded-full bg-secondary shrink-0" />
              <div>
                <p className="text-[15px] font-bold text-text-main mb-1">{feature.title}</p>
                <p className="text-[13px] text-text-muted leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;
