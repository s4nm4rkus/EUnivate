import React, { useState } from 'react';

const AdminAddProject = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-lg max-w-5xl mx-auto mt-12">
      {/* Upload Image Section */}
      <div className="flex flex-col items-center mb-8 relative">
        <input
          accept="image/*"
          className="hidden"
          id="upload-image"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-image" className="cursor-pointer">
          <div className="w-30 h-30 rounded-full bg-gray-200 flex justify-center items-center mb-4 overflow-hidden">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-gray-500">📷</span>
            )}
          </div>
        </label>
        <p className="text-red-700 cursor-pointer">Upload Image</p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-row justify-between w-full mb-8">
        <div className="w-[45%]">
          <input
            type="text"
            placeholder="Capstone Project Name"
            className="p-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Team Members"
            className="p-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-100"
          />
          <input
            type="text"
            placeholder="Adviser"
            className="p-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-100"
          />
        </div>
        <div className="w-[50%]">
          <textarea
            placeholder="Description"
            className="p-2 w-full h-32 rounded-md border border-gray-300 bg-gray-100"
            rows="8"
          />
        </div>
      </div>

      {/* Save Button */}
      <button className="w-48 h-12 rounded-full bg-red-800 text-white">
        Save
      </button>
    </div>
  );
};

export default AdminAddProject;
