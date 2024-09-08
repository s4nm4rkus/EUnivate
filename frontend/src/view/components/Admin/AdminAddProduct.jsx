import React, { useState } from 'react';

const AdminAddProduct = () => {
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
        <p className="text-red-700 cursor-pointer">Upload Image</p>
      </div>

      {/* Form Fields */}
      <div className="flex flex-col w-full mb-8">
        <input
          type="text"
          placeholder="Product Name"
          className="p-2 mb-4 rounded-md border border-gray-300 bg-gray-100"
        />
        <textarea
          placeholder="Description"
          className="p-2 rounded-md border border-gray-300 bg-gray-100"
          rows="4"
        />
      </div>

      {/* Availability Section */}
      <div className="flex flex-col w-full mb-8">
        <p className="mb-2 text-lg">Availability</p>
        <div className="flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="Available"
              className="hidden peer"
              defaultChecked
            />
            <span className="peer-checked:bg-teal-600 peer-checked:text-white peer-checked:border-teal-600 bg-teal-100 text-teal-700 border-2 border-teal-600 rounded-full px-4 py-2 font-bold transition-all">
              Available
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="Pending"
              className="hidden peer"
            />
            <span className="peer-checked:bg-orange-500 peer-checked:text-white peer-checked:border-orange-500 bg-orange-100 text-orange-600 border-2 border-orange-500 rounded-full px-4 py-2 font-bold transition-all">
              Pending
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="availability"
              value="NotAvailable"
              className="hidden peer"
            />
            <span className="peer-checked:bg-gray-500 peer-checked:text-white peer-checked:border-gray-500 bg-gray-200 text-gray-600 border-2 border-gray-500 rounded-full px-4 py-2 font-bold transition-all">
              Not Available
            </span>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <button className="w-48 h-12 rounded-full bg-red-800 text-white">
        Save
      </button>
    </div>
  );
};

export default AdminAddProduct;
