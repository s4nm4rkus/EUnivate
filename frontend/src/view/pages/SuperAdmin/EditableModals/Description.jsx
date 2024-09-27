import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Description = ({ description, isEditing, onEdit, onSave }) => {
  const [editedDescription, setEditedDescription] = useState(description);

  const handleSave = () => {
    onSave(editedDescription);
  };

  return (
    <div className="mb-4">
      <div className="text-gray-500 font-semibold flex justify-between items-center">
        <span>Description:</span>
        {!isEditing && (
          <FaEdit
            className="cursor-pointer text-gray-500 hover:text-gray-700"
            size={18}
            onClick={onEdit}
          />
        )}
      </div>
      {isEditing ? (
        <div>
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded text-sm"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button
            className="mt-2 bg-red-500 text-white py-1 px-4 rounded text-sm hover:bg-red-600 transition-all duration-200"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      ) : (
        <p className="mt-2 text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};

export default Description;
