import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Import the delete icon

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
              <img
                src={group.imagePreview || 'https://via.placeholder.com/50'}
                alt={group.groupName}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              
              {/* Group Name and Member Count */}
              <div>
                <h3 className="text-sm font-semibold">{group.groupName}</h3>
                <p className="text-xs text-gray-500">
                  {group.selectedMembers.length} {group.selectedMembers.length === 1 ? 'member' : 'members'}
                </p>
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
