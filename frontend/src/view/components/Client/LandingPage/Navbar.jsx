import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons'; 
import { downArrow, menu, close, webinar } from '../../../../constants/assets';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userName, setUserName] = useState('Signin');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserName(`${user.firstName} ${user.lastName}`);
      setIsAuthenticated(true);
    }
  }, []);

  const navLinks = [
    {
      id: "home", path: "/",
      title: "Home",
      hasDropdown: false,
    },
    {
      id: "products",
      title: "Products",
      hasDropdown: true,
      subLinks: [
        { id: "showcases", title: "Showcases", path: "/showcases" },
        {
          id: "quotation",
          title: "Quotation",
          path: isAuthenticated ? "/quotation" : "/login", // Change path based on authentication
        },
        { id: "eustore", title: "EU Store", path: "/eu-store" },
      ],
      imageUrl: webinar,
      description: 'IT Solution',
    },
    {
      id: "resources",
      title: "Resources",
      hasDropdown: true,
      subLinks: [
        { id: "webinars", title: "Webinars", path: "/webinar" },
        { id: "events", title: "Events", path: "/events" },
        { id: "challenges", title: "Challenges", path: "/challenges" },
        { id: "projectManagement", title: "Project Management", path: "/login" },
      ],
      imageUrl: webinar,
      description: 'WEBINAR',
    },
    {
      id: "aboutus", path: "/about",
      title: "About Us",
    },
  ];

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/');
    window.location.reload(); 
  };

  const handleLogin = () => {
    navigate('/login');
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

      {/* User Dropdown */}
      <div className="relative hidden sm:block">
        <button onClick={() => setUserDropdown(!userDropdown)} className="flex items-center space-x-2 text-gray-700 hover:text-red-500 focus:outline-none">
          <FontAwesomeIcon icon={faUser} />
          <span>{userName}</span> {/* Display the user's name */}
        </button>
        {userDropdown && (
          <div className="absolute right-0 mt-2 w-[150px] text-gray-700 bg-white shadow-lg rounded-lg flex flex-col z-50">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="p-2 hover:bg-gray-100">
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </button>
            ) : (
              <button onClick={handleLogin} className="p-2 hover:bg-gray-100">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Login
              </button>
            )}
          </div>
        )}
      </div>

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
          <button onClick={isAuthenticated ? handleLogout : handleLogin} className="btn-for-useracc mt-4 text-gray-700 hover:text-red-500">
            <FontAwesomeIcon icon={isAuthenticated ? faSignOutAlt : faSignInAlt} className="mr-2" />
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
