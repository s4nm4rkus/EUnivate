import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import Members_Msg from './Message/Members_Msg'; // Import Members_Msg component
import Chat from './Message/Chat'; // Import Chat component
import { FaUsers } from 'react-icons/fa'; // Import icon for the mobile sidebar

const Messages = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [invitedUsers, setInvitedUsers] = useState([]); // State for invited users
  const [selectedWorkspace, setSelectedWorkspace] = useState(''); // Default workspace as empty string
  const [loading, setLoading] = useState(true); // Loading state
  
  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar for mobile

  // Callback to get invited users from Members_Msg
  const handleInvitedUsers = (users) => {
    setInvitedUsers(users); // Set the invited users to be passed into the group
    if (users.length > 0) {
      setLoading(false); // Set loading to false after fetching users
    }
  };

  // Callback to get the selected workspace title from Members_Msg
  const handleWorkspaceChange = (workspaceId) => {
    setSelectedWorkspace(workspaceId); // Update the selected workspace
    setIsSidebarOpen(false); // Close the sidebar after selecting a workspace on mobile
    if (workspaceId) setLoading(false); // Stop loading after selection
  };

  // Example group data with members from invitedUsers
  const group = {
    groupName: selectedWorkspace, // Updated to use the selected workspace
    selectedMembers: invitedUsers,
    imagePreview: 'https://via.placeholder.com/50'
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="w-full flex justify-between items-center mb-4">
        <div className="relative">
          <h1 className="text-2xl font-medium text-gray-800 hidden md:block">
            Message
          </h1>
        </div>
        <AdminNavbar 
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

      {/* Main layout with Members_Msg and Chat side by side */}
      <div className="flex flex-row gap-2">
        {/* Left side box with Members_Msg component */}
        <div className="hidden md:block bg-white w-1/4 p-4 shadow-md rounded-md">
          {/* Pass the handleInvitedUsers and handleWorkspaceChange functions to Members_Msg */}
          <Members_Msg 
            onInvitedUsersFetched={handleInvitedUsers}
            onWorkspaceChange={handleWorkspaceChange} 
            // Pass workspace change handler
          />
        </div>

        {/* Mobile Icon to toggle Members_Msg as sidebar */}
        <div className="md:hidden flex items-center mb-auto">
          <button onClick={toggleSidebar} className="text-gray-800 p-2 rounded-full shadow-md bg-white">
            <FaUsers size={24} /> {/* Icon for mobile */}
          </button>
        </div>

        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex">
            <div className="bg-white w-3/4 h-full p-4 shadow-md rounded-md">
              <Members_Msg 
                onInvitedUsersFetched={handleInvitedUsers}
                onWorkspaceChange={handleWorkspaceChange} // Pass workspace change handler
              />
            </div>
            <div className="w-1/4" onClick={toggleSidebar}></div>
          </div>
        )}

        {/* Right side box with Chat component */}
        <div className="bg-white w-full md:w-3/4 p-4 shadow-md rounded-md flex-grow relative max-h-[calc(120vh-100px)] overflow-y-auto">
          {!loading ? (
            selectedWorkspace ? (
              <Chat group={group} />
            ) : (
              <p>Please select a workspace to view the chat.</p>
            )
          ) : (
            <p>Loading chat...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
