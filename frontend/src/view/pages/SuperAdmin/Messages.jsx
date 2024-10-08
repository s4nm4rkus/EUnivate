import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import Members_Msg from './Message/Members_Msg'; 
import Chat_Msg from './Message/Group_List'; // Renamed to better represent its role
import Chat from './Message/Chat'; // Import Chat component
import { FaUsers, FaPlus } from 'react-icons/fa'; // Import icons for sidebar and group creation
import Group_Modal from './Message/Group_Modal'; // Import the Group_Modal

const Messages = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar
  const [groups, setGroups] = useState([]); // State to store created groups
  const [showModal, setShowModal] = useState(false); // Modal toggle state
  const [selectedGroup, setSelectedGroup] = useState(null); // State to track the selected group
  const [invitedUsers, setInvitedUsers] = useState([]); // Invited users state
  const [nonInvitedUsers, setNonInvitedUsers] = useState([]); // Non-invited users state
  const [loading, setLoading] = useState(true); // Loading state for users

  const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar for mobile
  const toggleModal = () => setShowModal(!showModal); // Toggle modal for creating a group

  // Fetch users for invited and non-invited groups
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user ? user.accessToken : null;

        if (!accessToken) {
          console.error('No access token found. Please log in again.');
          return;
        }

        // Fetch all users
        const allUsersResponse = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Fetch invited users from projects
        const projectsResponse = await axios.get('http://localhost:5000/api/users/sa-getnewproject', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allUsers = allUsersResponse.data;
        const invitedUsersList = projectsResponse.data.flatMap(project => project.invitedUsers || []);

        // Get list of invited user IDs
        const invitedUserIds = invitedUsersList.map(user => user._id);

        // Filter out non-invited users
        const nonInvitedUsersList = allUsers.filter(user => !invitedUserIds.includes(user._id));

        setInvitedUsers(invitedUsersList);
        setNonInvitedUsers(nonInvitedUsersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();

    // Retrieve existing groups from local storage on component mount
    const savedGroups = localStorage.getItem('groups');
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  // Handle group creation and store groups in local storage
  const handleCreateGroup = (newGroup) => {
    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);

    // Save the updated groups to local storage
    localStorage.setItem('groups', JSON.stringify(updatedGroups));

    toggleModal(); // Close the modal after creation
  };

  // Handle group deletion and update local storage
  const handleDeleteGroup = (index) => {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups)); // Update localStorage
  };

  // Handle selecting a group for chat
  const handleSelectGroup = (group) => {
    setSelectedGroup(group); // Set the selected group
  };

  // Handle back navigation from Chat to Group_List
  const handleBackToGroupList = () => {
    setSelectedGroup(null); // Deselect the group to return to Group_List
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* Header with AdminNavbar */}
      <div className="w-full flex justify-between items-center mb-4">
        <h1 className="text-lg md:text-2xl font-medium text-gray-800 hidden md:block">
          Messages
        </h1>
        <AdminNavbar
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

      {/* Main layout with two boxes that grow with content */}
      <div className="flex flex-row gap-2">
        {/* Left side box with Members_Msg component */}
        <div className="hidden md:block bg-white w-1/4 p-4 shadow-md rounded-md flex-grow">
          <Members_Msg invitedUsers={invitedUsers} nonInvitedUsers={nonInvitedUsers} loading={loading} />
        </div>

        {/* Mobile Icon to toggle Members_Msg as sidebar */}
        <div className="md:hidden flex items-center mb-4">
          <button onClick={toggleSidebar} className="text-gray-800 p-2 rounded-full shadow-md mb-auto bg-white">
            <FaUsers size={24} /> {/* Icon for mobile */}
          </button>
        </div>

        {/* Sidebar for mobile */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex">
            <div className="bg-white w-3/4 h-full p-4 shadow-md rounded-md">
              <Members_Msg invitedUsers={invitedUsers} nonInvitedUsers={nonInvitedUsers} loading={loading} />
            </div>
            <div className="w-1/4" onClick={toggleSidebar}></div>
          </div>
        )}

        {/* Right side box that either shows the Chat_Msg (group list) or Chat (selected group chat) */}
        <div className="bg-white w-full md:w-3/4 p-4 shadow-md rounded-md flex-grow relative max-h-[calc(120vh-100px)] overflow-y-auto">
          {selectedGroup ? (
            <Chat group={selectedGroup} onBack={handleBackToGroupList} />  
          ) : (
            <Chat_Msg groups={groups} onDeleteGroup={handleDeleteGroup} onSelectGroup={handleSelectGroup} />  
          )}

          {/* Conditionally render the "Create Group" button only when no group is selected */}
          {!selectedGroup && (
            <button
              onClick={toggleModal}
              className="absolute right-5 top-6 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
            >
              <FaPlus size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Render Group_Modal if showModal is true */}
      {showModal && (
        <Group_Modal 
          toggleModal={toggleModal} 
          invitedUsers={invitedUsers} 
          nonInvitedUsers={nonInvitedUsers} 
          onCreateGroup={handleCreateGroup} 
        />
      )}
    </div>
  );
};

export default Messages;
