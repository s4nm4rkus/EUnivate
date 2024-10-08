import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications

const Group_Modal = ({ toggleModal, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [team, setTeam] = useState(''); // Selected team
  const [imagePreview, setImagePreview] = useState(null);

  // Handle team selection and generate group name and image
  const handleTeamSelect = (selectedTeam) => {
    setTeam(selectedTeam);
    setGroupName(selectedTeam);
    // Generate a placeholder image with the first two letters of the team name
    const teamInitials = selectedTeam.split(' ').map((word) => word[0]).join('');
    const placeholderImage = `https://via.placeholder.com/100x100.png?text=${teamInitials}`;
    setImagePreview(placeholderImage);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!groupName || !team) {
      toast.error('Please select a team and provide a group name.');
      return;
    }

    // Create the new group object
    const newGroup = {
      groupName,
      imagePreview,
      selectedMembers: team, // The team selected
    };

    // Pass the newly created group data to the parent (Messages component)
    onCreateGroup(newGroup);

    toggleModal(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        {/* X Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          onClick={toggleModal}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Large Circular Image Preview */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-4xl absolute">+</span>
            )}
          </div>
        </div>

        {/* Group Name Display */}
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          disabled
          className="border border-gray-300 rounded-md p-2 w-full mb-4 bg-gray-100"
        />

        {/* Team Selection Dropdown */}
        <select
          value={team}
          onChange={(e) => handleTeamSelect(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        >
          <option value="" disabled>Select a team</option>
          <option value="Superboard">Superboard</option>
          <option value="Team 2">Team 2</option>
          <option value="Team 3">Team 3</option>
        </select>

        {/* Submit Button */}
        <button
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={handleSubmit}
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default Group_Modal;
