import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon

const handleDeleteGroup = (index) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this group?');
  if (confirmDelete) {
    const updatedGroups = groups.filter((_, i) => i !== index);
    setGroups(updatedGroups);
    localStorage.setItem('groups', JSON.stringify(updatedGroups));
  }
};


const Group_List = ({ groups, onDeleteGroup, onSelectGroup }) => {
  return (
    <div>
      <h2 className="text-lg font-bold">Group Chats</h2>
      <div className="mt-4">
        {groups.length > 0 ? (
          groups.map((group, index) => (
            <div
              key={index}
              className="relative flex items-center mb-4 group cursor-pointer"
              onClick={() => onSelectGroup(group)} // Pass the selected group on click
            >
              {/* Group Image */}
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-gray-700">
                  {group.groupName.split(' ').map(word => word[0]).join('')}
                </span>
              </div>
              
              {/* Group Name and Member Count */}
              <div>
                <h3 className="text-sm font-semibold">{group.groupName}</h3>
               
              </div>

              {/* Delete Button */}
              <button
                className="absolute right-10 mr-4 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the group from being selected on delete click
                  onDeleteGroup(index); // Callback to delete the group
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No groups created yet.</p>
        )}
      </div>
    </div>
  );
};

export default Group_List;
