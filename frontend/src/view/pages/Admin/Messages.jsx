import React, { useState } from 'react';
import AdminNavbar from "../../components/Admin/adminNavbar";
import MessageContent from '../../components/Admin/MessageContent';
import SidebarMessage from '../../components/Admin/SidebarMessage';

const Messages = () => {
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleProjectDropdown = () => setIsProjectDropdownOpen(!isProjectDropdownOpen);
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Dashboard Text */}
            <div className="flex justify-between items-center mb-16">
                <h1 className="text-2xl font-medium text-gray-800">Messages</h1>
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>
            {/* Additional content for Messages page can go here */}
            {/* Main Content */}
            <div className="flex">
                <SidebarMessage />      {/* Sidebar Component */}
                <MessageContent />      {/* Message Content Component */}
            </div>
        </div>
    );
};

export default Messages;
