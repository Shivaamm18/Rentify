import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome, HiMail, HiPhone, HiArrowRight } from 'react-icons/hi';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center mr-3 group-hover:rotate-12 transition-transform">
                <HiHome className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Rentify<span className="text-primary-600">.</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              India's most trusted platform for finding verified rental properties. We make renting simple, transparent, and secure.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all transform hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'Properties', 'Subscription Plans', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <Link 
                    to={link === 'Home' ? '/' : `/${link.toLowerCase().replace(' ', '-')}`} 
                    className="flex items-center group hover:text-white transition-colors"
                  >
                    <HiArrowRight className="w-4 h-4 mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <HiMail className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Email Support</p>
                  <p className="text-sm opacity-70">support@rentify.com</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <HiPhone className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Phone Support</p>
                  <p className="text-sm opacity-70">+91 98765 43210</p>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <HiHome className="w-6 h-6 text-primary-500 flex-shrink-0" />
                <p className="opacity-70">
                  123 Business Hub, Sector 62,<br />
                  Noida, Uttar Pradesh, 201301
                </p>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-sm opacity-70 mb-6">Subscribe to our newsletter for the latest property deals.</p>
            <form className="relative" onClick={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email"
                className="w-full bg-slate-800 border-none rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary-500 transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-600 text-white px-4 rounded-lg hover:bg-primary-700 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm opacity-60">
          <p>&copy; {new Date().getFullYear()} Rentify. All rights reserved.</p>
          <div className="flex space-x-8">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
