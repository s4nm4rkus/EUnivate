import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';

const UserNameModal = ({ isOpen, onClose, membersList, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);

  if (!isOpen) return null;

  // Filter the list based on the search term
  const filteredMembers = membersList.filter(member =>
    member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (member) => {
    setSelectedMembers(prevSelected => {
      if (prevSelected.find(selected => selected._id === member._id)) {
        // If already selected, remove it (deselecting)
        return prevSelected.filter(selected => selected._id !== member._id);
      } else {
        // Otherwise, add it to the selected list
        return [...prevSelected, member];
      }
    });
  };

  const handleConfirmSelection = () => {
    // Pass all selected members instead of just one
    onSelect(selectedMembers);
    onClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center overflow-hidden">
      <div className="bg-white p-6 w-100 max-h-[90vh] overflow-auto rounded-lg shadow-lg relative flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Select Assignee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={16} />
          </button>
        </div>
        <div className="relative mb-4 flex items-center justify-between">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="appearance-none rounded border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Search by username or email"
          />
          <button
            onClick={handleConfirmSelection}
            className="ml-2 bg-blue-500 text-white px-3 py-1 rounded-md"
          >
            Confirm
          </button>
        </div>
        <ul className="flex-grow overflow-auto">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <li
                key={member._id}
                className="flex items-center py-2 border-b border-gray-200"
              >
                <div className="flex-grow flex items-center justify-between">
                  <div className="flex-grow">
                    <span className="block font-medium">{member.username}</span>
                    <div className='flex justify-between space-x-8'>
                      <span className="block text-gray-600">{member.email}</span>
                      <span className="text-gray-600">{member.role}</span>
                      <button
                        onClick={() => handleSelect(member)}
                        className={`ml-2 px-2 py-1 rounded-md border ${selectedMembers.find(selected => selected._id === member._id) ? 'bg-red-500 text-white border-red-500' : 'bg-gray-200 text-gray-600 border-gray-300'}`}
                      >
                        {selectedMembers.find(selected => selected._id === member._id) ? 'Deselect' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
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
