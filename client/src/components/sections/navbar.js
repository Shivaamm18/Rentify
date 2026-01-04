import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Menu, X, User, LogOut, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-[1000] w-full bg-[#FFFFFF] border-b border-[#E2E2E2] h-[64px] flex items-center shadow-soft">
      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <Link to="/" className="block">
            <div className="flex items-center gap-2">
              <span className="text-primary text-2xl font-black italic tracking-tighter">RENTIFY</span>
              <div className="h-6 w-[2px] bg-page-border hidden sm:block"></div>
              <span className="text-text-muted text-[10px] uppercase font-bold tracking-widest hidden sm:block leading-none">
                Direct <br/> Owner
              </span>
            </div>
          </Link>
        </div>

        {/* Right Section: Navigation Links & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/add-property" 
              className="group flex flex-col items-center justify-center transition-colors duration-200"
            >
              <div className="flex items-center gap-1.5 py-1 px-3 border border-primary rounded-nb bg-white group-hover:bg-primary/5 transition-all">
                <span className="text-text-main text-[13px] font-medium">Post Your Property</span>
                <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-[2px] font-bold">FREE</span>
              </div>
            </Link>

            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login" 
                  className="text-text-main text-[14px] font-medium hover:text-primary transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/register" 
                  className="text-text-main text-[14px] font-medium hover:text-primary transition-colors"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 text-text-main text-[14px] font-medium hover:text-primary transition-colors"
                >
                  <User size={18} />
                  <span>{user?.name || 'Account'}</span>
                  <ChevronDown size={14} className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-page-border rounded shadow-heavy py-1 z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-text-main hover:bg-page-bg hover:text-primary"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link 
                      to="/my-properties" 
                      className="block px-4 py-2 text-sm text-text-main hover:bg-page-bg hover:text-primary"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Properties
                    </Link>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-sm text-text-main hover:bg-page-bg hover:text-primary"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-text-main hover:bg-page-bg hover:text-primary flex items-center gap-2"
                    >
                      <LogOut size={14} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden flex items-center p-2 text-text-main"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Rightmost Menu Icon (Desktop) */}
          <button className="hidden md:flex items-center gap-2 group cursor-pointer">
            <div className="flex flex-col gap-[3px]">
              <span className="w-5 h-[2px] bg-text-main group-hover:bg-primary transition-colors"></span>
              <span className="w-5 h-[2px] bg-text-main group-hover:bg-primary transition-colors"></span>
              <span className="w-5 h-[2px] bg-text-main group-hover:bg-primary transition-colors"></span>
            </div>
            <span className="text-text-main text-[14px] font-medium group-hover:text-primary transition-colors">Menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-white z-[99] md:hidden animate-in slide-in-from-top duration-300">
          <div className="flex flex-col h-full bg-white overflow-y-auto">
            {/* User Profile Summary (if logged in) */}
            {isAuthenticated && (
              <div className="p-6 bg-page-bg/30 border-b border-page-border flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="text-text-main font-bold">{user?.name}</p>
                  <p className="text-text-muted text-xs">{user?.email}</p>
                </div>
              </div>
            )}

            <div className="flex flex-col p-4 gap-1">
              <Link 
                to="/add-property" 
                className="flex items-center justify-between p-4 rounded-nb bg-primary/5 border border-primary/10 text-primary font-bold mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>Post Your Property FREE</span>
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link 
                    to="/login" 
                    className="flex items-center gap-3 p-4 text-text-main font-medium border-b border-page-bg hover:bg-page-bg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="text-text-muted" />
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="flex items-center gap-3 p-4 text-text-main font-medium border-b border-page-bg hover:bg-page-bg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="text-text-muted" />
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/profile" 
                    className="flex items-center gap-3 p-4 text-text-main font-medium border-b border-page-bg hover:bg-page-bg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={20} className="text-text-muted" />
                    My Profile
                  </Link>
                  <Link 
                    to="/my-properties" 
                    className="flex items-center gap-3 p-4 text-text-main font-medium border-b border-page-bg hover:bg-page-bg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <span className="w-4 h-4 border-2 border-text-muted rounded-sm"></span>
                    </div>
                    My Properties
                  </Link>
                  {user?.role === 'admin' && (
                    <Link 
                      to="/admin" 
                      className="flex items-center gap-3 p-4 text-text-main font-medium border-b border-page-bg hover:bg-page-bg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-text-muted">⚙️</span>
                      Admin Dashboard
                    </Link>
                  )}
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="flex items-center gap-3 p-4 text-primary font-medium text-left hover:bg-page-bg transition-colors mt-4"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Footer-like section in mobile menu */}
            <div className="mt-auto p-6 bg-page-bg text-center">
              <p className="text-text-muted text-xs">Direct Owner Properties. No Brokerage.</p>
              <div className="flex justify-center gap-4 mt-4">
                <span className="text-primary font-bold text-sm italic">RENTIFY</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
