import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const UserNameModal = ({ isOpen, onClose, membersList, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  // Filter the list based on the search term
  const filteredMembers = membersList.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 w-80 max-h-[90vh] overflow-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Assignee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={16} />
          </button>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="appearance-none rounded border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
          placeholder="Search by username or email"
        />
        <ul className="max-h-60 overflow-y-auto">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li key={member._id} className="flex justify-between items-start py-2 border-b border-gray-200">
                <div className="flex-grow">
                  <span className="block font-medium">{member.username}</span>
                  <span className="block text-gray-600">{member.email}</span>
                </div>
                <span className="text-gray-600">{member.role}</span>
                <button
                  onClick={() => onSelect(member)}
                  className="ml-2 bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Select
                </button>
              </li>
            ))
          ) : (
            <p>No members found.</p>
          )}
        </ul>
      </div>
    </div>,
    document.body
  );
};

export default UserNameModal;
