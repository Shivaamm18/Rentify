import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HiMenu, HiX, HiLogout } from 'react-icons/hi';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[1000] w-full bg-[#FFFFFF] border-b border-[#E2E2E2] h-[64px] flex items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link to="/" className="block">
            <span className="text-2xl font-bold text-[#464646] tracking-tight">
              Rentify<span className="text-[#FD3752]">.</span>
            </span>
          </Link>
        </div>

        {/* Right Section: Navigation Links & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to={isAuthenticated ? (user?.role === 'owner' ? '/add-property' : '/properties') : '/register'}
              className="group flex flex-col items-center justify-center transition-colors duration-200"
            >
              <div className="flex items-center gap-1.5 py-1 px-3 border border-[#FD3752] rounded-[4px] bg-white group-hover:bg-[#FD3752]/5 transition-all">
                <span className="text-[#464646] text-[13px] font-medium uppercase tracking-wide">
                  {user?.role === 'owner' ? 'Post Property' : 'Find Home'}
                </span>
                <span className="bg-[#FD3752] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] font-bold">FREE</span>
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  to="/profile" 
                  className="text-[#464646] text-[14px] font-medium hover:text-[#FD3752] transition-colors"
                >
                  {user?.name}
                </Link>
                <button 
                  onClick={handleLogout}
                  className="text-[#464646] hover:text-[#FD3752] transition-colors"
                  title="Logout"
                >
                  <HiLogout size={20} />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-[#464646] text-[14px] font-medium hover:text-[#FD3752] transition-colors uppercase tracking-wide"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="text-[#464646] text-[14px] font-medium hover:text-[#FD3752] transition-colors uppercase tracking-wide"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Menu Icon for Mobile */}
          <button 
            className="md:hidden p-2 text-[#464646]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

          {/* Menu (Hamburger equivalent style) */}
          <div className="hidden md:flex items-center gap-2 group cursor-pointer" onClick={() => navigate('/properties')}>
             <div className="flex flex-col gap-[3px]">
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
            </div>
            <span className="text-[#464646] text-[14px] font-medium group-hover:text-[#FD3752] transition-colors uppercase tracking-wide">Properties</span>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[64px] left-0 w-full bg-white border-b border-[#E2E2E2] md:hidden shadow-lg p-4 space-y-4"
          >
            <Link to="/properties" className="block text-[#464646] font-medium text-lg border-b pb-2" onClick={() => setIsMenuOpen(false)}>Properties</Link>
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block text-[#464646] font-medium text-lg border-b pb-2" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <Link to="/my-properties" className="block text-[#464646] font-medium text-lg border-b pb-2" onClick={() => setIsMenuOpen(false)}>My Listings</Link>
                <button onClick={handleLogout} className="block w-full text-left text-[#FD3752] font-medium text-lg pt-2">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-[#464646] font-medium text-lg border-b pb-2" onClick={() => setIsMenuOpen(false)}>Log in</Link>
                <Link to="/register" className="block text-[#464646] font-medium text-lg pt-2" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
