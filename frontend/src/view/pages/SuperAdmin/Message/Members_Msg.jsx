import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Members_Msg.css'; // Import custom CSS for the hidden scrollbar
import Group_Modal from './Group_Modal'; // Import the modal component

const Members_Msg = () => {
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [nonInvitedUsers, setNonInvitedUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  // Fetch invited users and non-invited users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const accessToken = user ? user.accessToken : null;

        if (!accessToken) {
          console.error('No access token found. Please log in again.');
          setError('Authentication required. Please log in.');
          return;
        }

        // Fetch all users
        const allUsersResponse = await axios.get('http://localhost:5000/api/users/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // Fetch invited users from projects
        const invitedUsersResponse = await axios.get('http://localhost:5000/api/users/invited', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allUsers = allUsersResponse.data;
        const invitedUsersList = invitedUsersResponse.data.invitedUsers.map((invitedUser) => {
          // Find the corresponding user from the allUsers list and include the profile info
          const userFromDB = allUsers.find((user) => user.email === invitedUser.email);
          return userFromDB ? { ...invitedUser, ...userFromDB } : invitedUser;
        });

        setInvitedUsers(invitedUsersList);

        // Set current user
        const current = allUsers.find(u => u._id === user._id);
        setCurrentUser(current);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalMembers = invitedUsers.length;

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
      {/* About section */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-800">About</h2>
      </div>

      {/* Gray box below the about section */}
      <div className="bg-gray-100 p-4 rounded-md h-52">
        <p className="text-gray-600 text-sm">Topic</p>
        <p className="text-sm mt-2">All about the workspace topic related only</p>

        {/* Description text lower down */}
        <p className="text-gray-600 text-sm mt-5">Description</p>
        <p className="text-sm mt-2">
          In this channel, we can collaborate and communicate with fellow members.
        </p>
      </div>

      {/* Member text with total number of members and plus icon */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center">
          <p className="text-gray-800 text-sm font-semibold">Member</p>
          <div className="bg-orange-500 text-white text-sm font-bold ml-2 px-1 py-0.5 rounded-md">
            {totalMembers}
          </div>
        </div>
      </div>

      {/* Display Current User */}
      {currentUser && (
        <div className="mt-4 flex items-center">
          <div className="relative">
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></span>
            <img
              src={currentUser.profilePicture?.url || 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'}
              alt={currentUser.username || 'Profile Picture'}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
          </div>
          <p className="ml-2 text-gray-800 text-sm font-semibold">{currentUser.username} (You)</p>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {/* Scrollable Invited Members */}
      <div className="mt-1 flex-grow overflow-y-auto">
        <p className="text-gray-500 text-sm mt-3">Invited Members - {invitedUsers.length}</p>
        {loading ? (
          <p className="text-gray-500 text-sm">Loading users...</p>
        ) : (
          invitedUsers.map(user => (
            <div key={user._id} className="flex items-center mt-3">
              <div className="relative">
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                <img
                  src={user.profilePicture?.url || 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'}
                  alt={user.username || 'Profile Picture'}
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                />
              </div>
              <p className="ml-2 text-gray-800 text-sm">{user.username}</p>
            </div>
          ))
        )}
      </div>

      {/* Group modal rendering conditionally */}
      {showModal &&

     <Group_Modal
  toggleModal={toggleModal}
  onCreateGroup={handleCreateGroup}
  invitedUsers={invitedUsers} // Make sure this is populated correctly
/>

      
      }
    </div>
  );
};

export default Members_Msg;
