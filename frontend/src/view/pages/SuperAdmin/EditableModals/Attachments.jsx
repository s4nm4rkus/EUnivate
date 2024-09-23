import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Attachments = ({ attachments, onFileUpload, onDeleteAttachment }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center">
        <div className="text-gray-500 font-semibold">Attachments:</div>
        <FaPlus
          className="cursor-pointer text-gray-500 hover:text-black"
          onClick={() => document.getElementById('attachmentInput').click()}
        />
      </div>
      <input
        type="file"
        id="attachmentInput"
        className="hidden"
        accept="image/*"
        onChange={onFileUpload}
      />
      {attachments && attachments.length > 0 ? (
        <div className="flex overflow-x-auto space-x-2 py-2">
          {attachments.map((attachment, index) => (
            <div key={index} className="relative">
              <img src={attachment.url} alt={`Attachment ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
              <FaTrash
                className="absolute top-1 right-1 cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => onDeleteAttachment(attachment.url)}
              />
            </div>
          ))}
        </div>
      ) : (
        <span className="text-gray-500">No attachments</span>
      )}
    </div>
  );
};

export default Attachments;
