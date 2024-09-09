import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = ({ isAccountDropdownOpen, toggleAccountDropdown }) => {
  const [user, setUser] = useState({ firstName: '', lastName: '', profilePicture: { url: ''} });
  const navigate = useNavigate();
  const defaultProfilePicture = '/mnt/data/image.png'; // Use your actual path or URL here
  const dropdownRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set the user state with the stored user data
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isAccountDropdownOpen) {
          toggleAccountDropdown(); // Close the dropdown if it is open
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAccountDropdownOpen]);

  const handleLogout = () => {

    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Remove the token if stored separately
    // Redirect to login page
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/superadmin/settings'); 
  };

  return (
    <>
      {/* Admin Navbar */}
      <div className="flex items-center space-x-9 p-0" style={{ transform: 'translateX(1px)' }}>
        {/* Search Bar with Icon */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* User Profile */}
        <div ref={dropdownRef} className="relative flex items-center cursor-pointer" onClick={toggleAccountDropdown}>
          {user.profilePicture ? (
            <img 
              src={user.profilePicture.url || user.profilePicture} // Check for both structure cases
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <img 
              src={defaultProfilePicture} 
              alt="Default Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          )}
          <span className="ml-2 font-medium text-gray-800">
            {user.firstName} {user.lastName}
          </span>
          <FontAwesomeIcon 
            icon={faChevronDown} 
            className="ml-1 text-gray-600"
          />

          {/* Account Dropdown Menu */}
          <div
            className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg ${
              isAccountDropdownOpen ? 'block' : 'hidden'
            }`}
            style={{ top: '100%', zIndex: 1000 }} 
          >
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
              onClick={handleProfileClick}
            >
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
