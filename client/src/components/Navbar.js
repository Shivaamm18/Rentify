import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiMenu, HiX, HiUserCircle, HiHome, HiOfficeBuilding, HiPlus, HiShieldCheck } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: <HiHome className="w-5 h-5" /> },
    { name: 'Properties', path: '/properties', icon: <HiOfficeBuilding className="w-5 h-5" /> },
  ];

  if (isAuthenticated) {
    if (user?.role === 'owner') {
      navLinks.push({ name: 'Add Property', path: '/add-property', icon: <HiPlus className="w-5 h-5" /> });
    }
    if (user?.role === 'admin') {
      navLinks.push({ name: 'Admin Panel', path: '/admin', icon: <HiShieldCheck className="w-5 h-5" /> });
    }
    navLinks.push({ name: 'My Properties', path: '/my-properties', icon: <HiOfficeBuilding className="w-5 h-5" /> });
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold text-primary-600 tracking-tight group-hover:text-primary-700 transition-colors">
                Rentify
              </span>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-slate-600 hover:text-primary-600 hover:border-primary-500 border-b-2 border-transparent transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-slate-600 hover:text-primary-600 transition-colors"
                >
                  <HiUserCircle className="w-8 h-8 text-slate-400" />
                  <span className="text-sm font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all shadow-md hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <HiX className="block h-6 w-6" /> : <HiMenu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors"
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-slate-200">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 transition-colors"
                  >
                    <HiUserCircle className="mr-3 w-6 h-6 text-slate-400" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-1 px-4 py-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-primary-600 hover:bg-slate-50 rounded-md transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm transition-colors"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
