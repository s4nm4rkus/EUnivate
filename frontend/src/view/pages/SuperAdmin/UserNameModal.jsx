import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const UserNameModal = ({ isOpen, onClose, user, onSelectName }) => {
  const [userNames, setUserNames] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const users = await response.json();
        // Store both names and profile pictures
        setUserNames(users.map(u => ({
          name: `${u.firstName} ${u.lastName}`,
          profilePicture: u.profilePicture?.url || u.profilePicture || ''
        })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Combine fetched names and avatars with the current user's name and avatar
  const currentUserData = {
    name: `${user.firstName} ${user.lastName}`,
    profilePicture: user.profilePicture?.url || user.profilePicture || ''
  };
  const allUserData = [currentUserData, ...userNames];

  // Handle the name selection with avatar
  const handleNameSelect = (name, avatar) => {
    onSelectName(name, avatar); // Pass the selected name and avatar back to the parent
    onClose(); // Close the modal
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Assign to</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {allUserData.map((userData, index) => (
            <li 
              key={index} 
              className="flex items-center text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => handleNameSelect(userData.name, userData.profilePicture)}
            >
              {/* Display avatar */}
              <img 
                src={userData.profilePicture || '/path/to/default/avatar.png'} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              {userData.name}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default UserNameModal;
