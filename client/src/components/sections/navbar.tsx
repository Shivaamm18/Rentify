import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[1000] w-full bg-[#FFFFFF] border-b border-[#E2E2E2] h-[64px] flex items-center shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-4 lg:px-6 flex items-center justify-between">
        
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <a href="/" className="block">
            <img 
              src="https://static.nobroker.in/static/img/logos/nb_logo_new_trans.png"
              alt="Rentify Logo"
              width={150}
              height={40}
              className="h-[40px] w-auto object-contain"
            />
          </a>
        </div>

        {/* Right Section: Navigation Links & CTA */}
        <div className="flex items-center gap-4 md:gap-8">
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a 
              href="#" 
              className="group flex flex-col items-center justify-center transition-colors duration-200"
            >
              <div className="flex items-center gap-1.5 py-1 px-2 border border-[#FD3752] rounded-[4px] bg-white group-hover:bg-[#FD3752]/5 transition-all">
                <span className="text-[#464646] text-[13px] font-medium">Post Your Property</span>
                <span className="bg-[#FD3752] text-white text-[10px] px-1.5 py-0.5 rounded-[2px] font-bold">FREE</span>
              </div>
            </a>

            <a 
              href="#" 
              className="text-[#464646] text-[14px] font-medium hover:text-[#FD3752] transition-colors"
            >
              Log in
            </a>

            <a 
              href="#" 
              className="text-[#464646] text-[14px] font-medium hover:text-[#FD3752] transition-colors"
            >
              Sign up
            </a>
          </div>

          {/* Menu Icon for Mobile */}
          <button className="md:hidden flex flex-col gap-1.5 p-2">
            <span className="w-6 h-0.5 bg-[#464646]"></span>
            <span className="w-6 h-0.5 bg-[#464646]"></span>
            <span className="w-6 h-0.5 bg-[#464646]"></span>
          </button>

          {/* Rightmost Menu Icon (Desktop) */}
          <button className="hidden md:flex items-center gap-2 group cursor-pointer">
            <div className="flex flex-col gap-[3px]">
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
              <span className="w-5 h-[2px] bg-[#464646] group-hover:bg-[#FD3752] transition-colors"></span>
            </div>
            <span className="text-[#464646] text-[14px] font-medium group-hover:text-[#FD3752] transition-colors">Menu</span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
