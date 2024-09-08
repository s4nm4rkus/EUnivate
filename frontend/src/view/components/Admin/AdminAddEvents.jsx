import React, { useState } from 'react';

const AdminAddEvents = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-lg max-w-lg mx-auto mt-12">
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
        <p className="text-blue-600 cursor-pointer">Upload Cover Photo</p>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-4 w-full mb-8">
        <input
          type="text"
          placeholder="Event Name"
          className="p-2 rounded-md border border-gray-300 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Time"
          className="p-2 rounded-md border border-gray-300 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Date"
          className="p-2 rounded-md border border-gray-300 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Address"
          className="p-2 rounded-md border border-gray-300 bg-gray-100"
        />
        <input
          type="text"
          placeholder="Contact Number"
          className="col-span-2 p-2 rounded-md border border-gray-300 bg-gray-100"
        />
      </div>

      {/* Add Now Button */}
      <button className="w-48 h-12 rounded-full bg-red-800 text-white">
        Add Now
      </button>
    </div>
  );
};

export default AdminAddEvents;
