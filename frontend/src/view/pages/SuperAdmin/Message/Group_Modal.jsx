import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications

const Group_Modal = ({ toggleModal, invitedUsers, nonInvitedUsers, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]); // Store selected members as full objects
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showMembers, setShowMembers] = useState(false);

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle member selection
  const handleMemberSelect = (member) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(member)
        ? prevSelected.filter((m) => m._id !== member._id)
        : [...prevSelected, member]
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validate the inputs (name, members, and image)
    if (!groupName || selectedMembers.length === 0 || !image) {
      toast.error('Please provide a group name, select members, and upload an image.'); // Show toast if validation fails
      return;
    }

    // Create the new group object dynamically based on user inputs
    const newGroup = {
      groupName,
      imagePreview, // This contains the image URL or null if no image is uploaded
      selectedMembers, // Store full selected member objects
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

        {/* Large Circular Image Upload with Plus Sign */}
        <div className="flex justify-center mb-6">
          <label className="relative cursor-pointer">
            <input
              type="file"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden relative">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 text-4xl absolute">+</span>
              )}
            </div>
          </label>
        </div>

        {/* Group Name Input */}
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full mb-4"
        />

        {/* Add Members Button */}
        <button
          onClick={() => setShowMembers(!showMembers)}
          className="w-full bg-red-500 text-white px-4 py-2 rounded-md mb-4"
        >
          Add Members
        </button>

        {/* Conditionally render the unified members list */}
        {showMembers && (
          <div className="border border-gray-300 rounded-md p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Select Members</h3>

            {/* Unified Members List */}
            {[...invitedUsers, ...nonInvitedUsers].map((user) => (
              <div key={user._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedMembers.some((member) => member._id === user._id)}
                  onChange={() => handleMemberSelect(user)}
                  className="mr-2"
                />
                <img
                  src={user.profilePicture?.url || 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover mr-2"
                />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        )}

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
