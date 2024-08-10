import { useState } from 'react';
import { navLinks } from '../../constants/constants';  
import { downArrow } from '../../constants/assets'; 

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <nav className="w-full flex justify-between items-center py-4 bg-white px-8">
      <div className="flex items-center space-x-10">
        <div className="flex items-center">
          <span className="text-4xl font-bold text-red-700">EU</span>
          <span className="text-4xl font-bold text-yellow-500">nivate</span>
        </div>

        <ul className="hidden sm:flex items-center space-x-9">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <button
                onClick={() => link.hasDropdown && toggleDropdown(link.id)}
                className="text-gray-700 hover:text-red-500 flex items-center focus:outline-none"
              >
                {link.title}
                {link.hasDropdown && (
                  <img
                    src={downArrow}
                    alt="Dropdown Arrow"
                    className="ml-1 h-6 w-6 transform transition-transform group-hover:rotate-180"
                  />
                )}
              </button>

              {link.hasDropdown && activeDropdown === link.id && (
                <div className="absolute left-0 top-full mt-2 w-[350px] text-gray-700 bg-white shadow-lg rounded-lg flex z-50">
                  <ul className="p-4 w-1/2">
                    <li className="font-semibold mb-2">{link.title.toUpperCase()}</li>
                    {link.subLinks.map((subLink) => (
                      <li key={subLink.id} className="cursor-pointer mb-1 hover:text-red-500 text-sm">
                        <a href={subLink.href}>{subLink.title}</a>
                      </li>
                    ))}
                  </ul>
                  <div className="w-1/2 relative">
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
      </div>
      <button
        className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-red-800 transition-all duration-300"
        style={{ transitionDelay: '0.2s' }}
      >
        Get Started
      </button>
    </nav>
  );
};

export default Navbar;
