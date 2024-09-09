import React, { useState } from 'react';
import MessageContent from '../../components/SuperAdmin/MessageContent';
import SidebarMessage from '../../components/SuperAdmin/SidebarMessage';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
const Messages = () => {
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    const toggleProjectDropdown = () => setIsProjectDropdownOpen(!isProjectDropdownOpen);
    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    return (
        <div className="bg-gray-100 min-h-screen p-4">  {/* Reduced padding for the main container */}
            {/* Dashboard Text */}
            <div className="flex justify-between items-center mb-12">  {/* Reduced bottom margin */}
                <h1 className="text-xl font-medium text-gray-800">Messages</h1>  {/* Decreased font size */}
                <AdminNavbar 
                    isAccountDropdownOpen={isAccountDropdownOpen} 
                    toggleAccountDropdown={toggleAccountDropdown} 
                />
            </div>

            {/* Main Content */}
            <div className="flex space-x-2">  {/* Reduced spacing between Sidebar and Message Content */}
                <SidebarMessage />  {/* Sidebar Component */}
                <MessageContent />  {/* Message Content Component */}
            </div>
        </div>
    );
};

export default Messages;
