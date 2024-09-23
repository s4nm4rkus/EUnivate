import React, { useState } from 'react';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const EditProductModal = ({ product, onClose, onSave }) => {
  const [productName, setProductName] = useState(product.productName);
  const [description, setDescription] = useState(product.description);
  const [availability, setAvailability] = useState(product.availability);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(product.image?.url || ''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EunivateImage');
    formData.append('cloud_name', 'dzxzc7kwb');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzxzc7kwb/image/upload',
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image');
      throw error;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      let productImageUrl = imagePreview;

      if (image instanceof File) {
        try {
          productImageUrl = await uploadImageToCloudinary(image);
        } catch (error) {
          setLoading(false);
          return;
        }
      }

      const updatedProduct = {
        productName,
        description,
        availability,
        image: { url: productImageUrl },
      };

      const response = await axios.put(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/products/${product._id}`,
        updatedProduct
      );

      setLoading(false);
      onSave(response.data);
      onClose(); // Close the modal after saving
    } catch (error) {
      console.error('Error updating product', error);
      setError('Failed to update product');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          disabled={loading}
        >
          <FaTimes />
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2">Product Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Availability</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            <option value="Available">Available</option>
            <option value="Pending">Pending</option>
            <option value="NotAvailable">Not Available</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Image</label>
          <div className="flex items-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />
            )}
            <label className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              Choose Image
            </label>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg mr-2"
            onClick={onClose} // Close the modal on cancel
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-red-700 text-white py-2 px-4 rounded-lg"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
