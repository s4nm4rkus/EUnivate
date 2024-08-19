import { useState } from 'react';
import { navLinks, downArrow } from '../../data/data'; // Ensure this path is correct

const LandingPage = () => {
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

        <ul className="flex items-center space-x-9">
          {navLinks.map((link) => (
            <li key={link.id} className="relative group">
              <button
                onClick={() => link.hasDropdown && toggleDropdown(link.id)}
                className="text-gray-700 hover:text-black flex items-center focus:outline-none"
              >
                {link.title}
                {link.hasDropdown && (
                  <img
                    src={downArrow}
                    alt="Dropdown Arrow"
                    className="ml-1 h-4 w-4 transform transition-transform group-hover:rotate-180"
                  />
                )}
              </button>

              {link.hasDropdown && activeDropdown === link.id && (
                <ul className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                  {link.subLinks.map((subLink) => (
                    <li key={subLink.id} className="px-4 py-2 hover:bg-gray-100">
                      <a href={subLink.href} className="text-gray-700 hover:text-black">
                        {subLink.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      <button className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600">
        Get Started
      </button>
    </nav>
  );
};

export default LandingPage;
