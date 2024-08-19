import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import { navLinks } from '../../../../constants/constants';
import { downArrow, menu, close } from '../../../../constants/assets';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setToggle(false);  // Close the mobile menu after navigation
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <nav className="w-full flex justify-between items-center py-4 bg-white px-4 sm:px-8">
      <div className="flex items-center space-x-2 sm:space-x-10 cursor-pointer" onClick={handleLogoClick}>
        <div className="flex items-center">
          <span className="text-3xl sm:text-5xl font-bold text-red-800">EU</span>
          <span className="text-3xl sm:text-5xl font-bold text-yellow-500">nivate</span>
        </div>
      </div>
      {/* Desktop NavLinks */}
      <ul className="hidden sm:flex items-center space-x-6 sm:space-x-6 md:space-x-8 text-base sm:text-xl">
        {navLinks.map((link) => (
          <li key={link.id} className="relative group">
            <button
              onClick={() => link.hasDropdown ? toggleDropdown(link.id) : handleNavigation(link.path)}
              className="text-gray-700 hover:text-red-500 flex items-center focus:outline-none"
            >
              {link.title}
              {link.hasDropdown && (
                <img
                  src={downArrow}
                  alt="Dropdown Arrow"
                  className="ml-1 h-4 sm:h-6 w-4 sm:w-6 transform transition-transform group-hover:rotate-180"
                />
              )}
            </button>

            {link.hasDropdown && activeDropdown === link.id && (
              <div className="absolute left-0 top-full mt-2 w-[200px] sm:w-[350px] text-gray-700 bg-white shadow-lg rounded-lg flex z-50">
                <ul className="p-4 w-1/2">
                  <li className="font-semibold mb-2">{link.title.toUpperCase()}</li>
                  {link.subLinks.map((subLink) => (
                    <li
                      key={subLink.id}
                      className="cursor-pointer mb-1 hover:text-red-500 text-sm"
                      onClick={() => handleNavigation(subLink.path)}
                    >
                      {subLink.title}
                    </li>
                  ))}
                </ul>
                <div className="w-1/2 relative hidden sm:block">
                  <div className="absolute top-0 left-0 p-2 text-gray-700 text-xs font-semibold bg-white bg-opacity-75">
                    {link.description}
                  </div>
                  <img
                    src={link.imageUrl}
                    alt={link.description}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* "Get Started" button */}
      <ScrollLink
        to="CTA"
        spy={true}
        smooth={true}
        offset={50}
        duration={500}
        className="bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-red-800 transition-all duration-300 relative z-30 hidden sm:block cursor-pointer"
      >
        Get Started
      </ScrollLink>    

      {/* Mobile Menu */}
      <div className="sm:hidden flex items-center">
        <img 
          src={toggle ? close : menu} 
          alt="Menu Toggle" 
          className="w-6 h-6 sm:w-8 sm:h-8 object-contain" 
          onClick={() => setToggle(!toggle)}
        />

        <div 
          className={`${toggle ? 'flex' : 'hidden'} p-6 bg-white absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl shadow-lg z-50 `}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((link) => (
              <li key={link.id} className="relative group font-medium cursor-pointer text-[16px] mb-4">
                <div
                  onClick={() => link.hasDropdown ? toggleDropdown(link.id) : handleNavigation(link.path)}
                  className="flex items-center justify-between w-full"
                >
                  {link.title}
                  {link.hasDropdown && (
                    <img
                      src={downArrow}
                      alt="Dropdown Arrow"
                      className="ml-2 h-4 w-4 transform transition-transform group-hover:rotate-180"
                    />
                  )}
                </div>

                {link.hasDropdown && activeDropdown === link.id && (
                  <ul className="mt-2 ml-4 text-gray-600">
                    {link.subLinks.map((subLink) => (
                      <li
                        key={subLink.id}
                        className="cursor-pointer mb-2 hover:text-red-500 text-sm"
                        onClick={() => handleNavigation(subLink.path)}
                      >
                        {subLink.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
