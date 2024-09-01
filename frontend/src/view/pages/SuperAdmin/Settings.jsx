import React, { useState } from "react";
import SettingProfile from "../../components/SuperAdmin/SettingProfile";
// import Notifications from './Notification';
// import Account from './Account';
// import Privacy from './Privacy';
// import Apps from './Apps';
import AdminNavbar from '../../components/SuperAdmin/adminNavbar'; // Import AdminNavbar

const Settings = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="min-h-screen flex flex-col items-start justify-start p-4">
            {/* Admin Navbar */}
            <div className="w-full flex justify-between items-center mb-4">
                <h1 className="text-2xl font-medium text-gray-800">Settings</h1>
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            {/* Box with shadow */}
            <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex mt-6">
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-52 p-4 flex flex-col space-y-2">
                        <a href="#profile" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Profile
                        </a>
                        <a href="#notification" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Notification
                        </a>
                        <a href="#account" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Account
                        </a>
                        <a href="#privacy-policy" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Privacy Policy
                        </a>
                        <a href="#apps" className="bg-transparent text-red-700 p-2 rounded border border-transparent hover:bg-gray-300 font-bold text-left">
                            Apps
                        </a>
                    </div>

                    {/* Main content */}
                    <div className="flex-1 p-4 overflow-y-auto" style={{ scrollBehavior: 'smooth' }}>
                        <section id="profile" className="mb-6">
                            <SettingProfile />
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
