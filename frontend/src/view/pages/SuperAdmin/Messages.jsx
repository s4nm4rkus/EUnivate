import React, { useState } from 'react'; 
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';

const Messages = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Header with only the AdminNavbar */}
            <div className="w-full flex justify-between items-center mb-4">
                <div className="relative">
                    <h1 className="text-lg md:text-2xl font-medium text-gray-800 hidden md:block">
                        Messages
                    </h1>
                </div>
                <AdminNavbar
                    isAccountDropdownOpen={isAccountDropdownOpen}
                    toggleAccountDropdown={toggleAccountDropdown}
                />
            </div>
        </div>
    );
};

export default Messages;
