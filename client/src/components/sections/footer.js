import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = [
    {
      title: "Find Property",
      links: [
        { name: "Rent", href: "/properties" },
        { name: "Buy", href: "/properties" },
        { name: "Commercial", href: "/properties" },
        { name: "PG / Hostels", href: "/properties" },
        { name: "Flatmates", href: "/properties" },
        { name: "New Projects", href: "/properties" },
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
    <footer className="w-full bg-page-bg border-t border-page-border pt-12 pb-6 mt-auto">
      <div className="container mx-auto max-w-[1200px] px-4">
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-text-main font-medium text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      to={link.href} 
                      className="text-text-muted hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media Row */}
        <div className="flex flex-col md:flex-row items-center justify-end py-8 border-t border-page-border gap-6">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Youtube size={20} />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-page-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Rentify Technologies Solutions Pvt. Ltd.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-text-muted">
            <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/cookies" className="hover:text-primary">Cookie Policy</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/safety" className="hover:text-primary">Trust & Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
