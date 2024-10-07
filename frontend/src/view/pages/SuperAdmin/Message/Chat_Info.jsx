import React from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // For the back arrow

const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png';

const Chat_Info = ({ group, onBack }) => {
  return (
    <div className="p-4">
      {/* Back Button */}
      <div className="flex items-center mb-4">
        <FaArrowLeft
          onClick={onBack} // Call the onBack function when clicked to go back to Chat
          className="cursor-pointer text-gray-600 mr-4"
          size={20}
        />
        <h2 className="text-lg font-bold">Group Information</h2>
      </div>

      {/* Group Image and Name */}
      <div className="mb-4 flex items-center">
        <img
          src={group.imagePreview || 'https://via.placeholder.com/150'}
          alt={group.groupName}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">{group.groupName}</h2>
          <p className="text-sm text-gray-500">{group.selectedMembers.length} members</p>
        </div>
      </div>

      {/* List of invited members with profile pictures */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Members</h3>
        <ul>
          {group.selectedMembers.length > 0 ? (
            group.selectedMembers.map((member, index) => (
              <li key={index} className="flex items-center mb-2">
                {/* Profile Picture */}
                <img
                  src={member.profilePicture || defaultProfilePictureUrl}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
                {/* Member Name */}
                <span className="text-sm font-semibold">{member.name || `Member ${index + 1}`}</span>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No members invited.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Chat_Info;
