import React from 'react';

const Image_modal = ({ imageSrc, onClose }) => {
  if (!imageSrc) return null; // Return nothing if no image source is provided

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-lg max-h-full overflow-auto">
        <img src={imageSrc} alt="Chat" className="max-w-full max-h-full" />
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Image_modal;
