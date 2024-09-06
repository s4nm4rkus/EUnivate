// src/view/pages/SuperAdmin/UserNameModal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa'; // Importing the close icon

const UserNameModal = ({ isOpen, onClose, user, onSelectName }) => {
  if (!isOpen) return null;

  // Predefined names (excluding the fetched user name)
  const predefinedNames = [
    'Alice Johnson',
    'Bob Smith',
    'Charlie Brown',
    'David Wilson',
    'Emily Davis'
  ];

  // Combine predefined names with the fetched name
  const allNames = [...new Set([`${user.firstName} ${user.lastName}`, ...predefinedNames])];

  // Handle the name selection
  const handleNameSelect = (name) => {
    onSelectName(name); // Pass the selected name back to the parent
    onClose(); // Close the modal
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 w-96 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Assign to </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <ul className="mt-4 space-y-2">
          {allNames.map((name, index) => (
            <li 
              key={index} 
              className="text-gray-700 cursor-pointer hover:bg-gray-200 p-2 rounded"
              onClick={() => handleNameSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default UserNameModal;
