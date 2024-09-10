import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';

const AdminContainer = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userName, setUserName] = useState('');
    const [showLogoutBox, setShowLogoutBox] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Update selectedTab based on the current path
    useEffect(() => {
        const defaultProfilePicture = 'https://res.cloudinary.com/dzxzc7kwb/image/upload/v1725974053/DefaultProfile/qgtsyl571c1neuls9evd.png'; 
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserName(`${user.firstName} ${user.lastName}`);
            setProfilePicture(user.profilePicture ? user.profilePicture.url || user.profilePicture : defaultProfilePicture);
        }
    }, []);

    useEffect(() => {
        switch (location.pathname) {
            case '/admin':
                setSelectedTab(0);
                break;
            case '/products':
                setSelectedTab(1);
                break;
            case '/projects':
                setSelectedTab(2);
                break;
            case '/events-admin':
                setSelectedTab(3);
                break;
            default:
                break;
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLogoutBox(false);
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setProfilePicture(null); // Reset profile picture
        navigate('/login'); // Assuming you have a login route
        window.location.reload(); // Refresh the page
    };

    const tabStyle = (isSelected) =>
        `py-2 px-6 rounded-full cursor-pointer transition-all duration-300 ${
            isSelected ? 'bg-white shadow text-red-700 font-bold' : 'text-gray-500'
        }`;

    return (
        <div className="min-h-screen bg-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                <h1
                    className="text-3xl sm:text-4xl font-bold text-red-800 cursor-pointer mb-4 sm:mb-0"
                    onClick={() => navigate('/admin')}
                >
                    Admin
                </h1>

                <div className="flex gap-4 bg-gray-200 rounded-full p-2">
                    <div onClick={() => navigate('/admin')} className={tabStyle(selectedTab === 0)}>
                        Dashboard
                    </div>
                    <div onClick={() => navigate('/products')} className={tabStyle(selectedTab === 1)}>
                        Products
                    </div>
                    <div onClick={() => navigate('/projects')} className={tabStyle(selectedTab === 2)}>
                        Projects
                    </div>
                    <div onClick={() => navigate('/events-admin')} className={tabStyle(selectedTab === 3)}>
                        Events
                    </div>
                </div>

                <div className="flex items-center mt-4 sm:mt-0 relative">
                    <FontAwesomeIcon icon={faBell} size="lg" className="text-gray-500 cursor-pointer mr-6" />
                    <div
                        className="relative flex items-center cursor-pointer"
                        onClick={() => setShowLogoutBox(!showLogoutBox)}
                        ref={dropdownRef}
                    >
                        <img
                            src={profilePicture || 'https://res.cloudinary.com/dzxzc7kwb/image/upload/v1725974053/DefaultProfile/qgtsyl571c1neuls9evd.png'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="ml-2 text-gray-700 font-semibold whitespace-nowrap">{userName}</span>
                        {showLogoutBox && (
                            <div className="absolute mt-24 w-24 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>  
                </div>
            </div>

            <div>{children}</div>
        </div>
    );
};

export default AdminContainer;
