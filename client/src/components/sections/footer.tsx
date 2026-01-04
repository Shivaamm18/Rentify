import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: "Find Property",
      links: [
        { name: "Rent", href: "#" },
        { name: "Buy", href: "#" },
        { name: "Commercial", href: "#" },
        { name: "PG / Hostels", href: "#" },
        { name: "Flatmates", href: "#" },
        { name: "New Projects", href: "#" },
      ]
    },
    {
      title: "Our Services",
      links: [
        { name: "Rent Agreement", href: "#" },
        { name: "Home Cleaning", href: "#" },
        { name: "Home Painting", href: "#" },
        { name: "Pest Control", href: "#" },
        { name: "Packers and Movers", href: "#" },
        { name: "Furniture on Rent", href: "#" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Legal", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "EMI Calculator", href: "#" },
        { name: "Rental Yield Calculator", href: "#" },
        { name: "Home Loan", href: "#" },
        { name: "Property Legal Services", href: "#" },
        { name: "Sitemap", href: "#" },
        { name: "Press", href: "#" },
      ]
    }
  ];

  return (
    <footer className="w-full bg-[#F2F2F2] border-t border-[#D4D4D4] pt-12 pb-6">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[#464646] font-medium text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a 
                      href={link.href} 
                      className="text-[#666666] hover:text-[#FD3752] text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Apps and Social Media Row */}
        <div className="flex flex-col md:flex-row items-center justify-between py-8 border-t border-[#D4D4D4] gap-6">
          {/* App Downloads */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-sm font-medium text-[#464646]">Download Our App</span>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://static.nobroker.in/static/img/logos/google-play.png" 
                  alt="Google Play Store" 
                  width={135} 
                  height={40} 
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://static.nobroker.in/static/img/logos/app-store.png" 
                  alt="Apple App Store" 
                  width={135} 
                  height={40} 
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-[#666666] hover:text-[#FD3752] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-[#666666] hover:text-[#FD3752] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-[#666666] hover:text-[#FD3752] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-[#666666] hover:text-[#FD3752] transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-[#666666] hover:text-[#FD3752] transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#D4D4D4] flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-[#666666] text-xs">
            © {new Date().getFullYear()} Rentify Technologies Solutions Pvt. Ltd.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-[#666666]">
            <a href="#" className="hover:text-[#FD3752]">Terms & Conditions</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#FD3752]">Privacy Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#FD3752]">Cookie Policy</a>
            <span className="hidden sm:inline">|</span>
            <a href="#" className="hover:text-[#FD3752]">Trust & Safety</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
