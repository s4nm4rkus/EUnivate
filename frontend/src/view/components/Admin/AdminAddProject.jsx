import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddProject = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [projectName, setProjectName] = useState('');
  const [teamMembers, setTeamMembers] = useState('');
  const [adviser, setAdviser] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
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
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = null;
      if (selectedImage) {
        imageUrl = await uploadImageToCloudinary(selectedImage);
      }

      const projectData = {
        projectName: projectName,
        teamMembers: teamMembers,
        adviser: adviser,
        description: description,
        image: imageUrl ? { url: imageUrl, publicId: selectedImage.name } : null,
      };

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/addproject`, projectData);

      console.log(response.data);
      setLoading(false);

      navigate('/projects');

    } catch (error) {
      setLoading(false);
      console.error('Error uploading project:', error);
      setError('Failed to upload project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center p-8 rounded-lg bg-white shadow-lg w-[90%] max-w-4xl mx-auto mt-12">
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
          <div className="w-24 h-24 rounded-full bg-gray-200 flex justify-center items-center mb-4 overflow-hidden">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
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
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Team Members"
            className="p-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-100"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Adviser"
            className="p-2 mb-4 w-full rounded-md border border-gray-300 bg-gray-100"
            value={adviser}
            onChange={(e) => setAdviser(e.target.value)}
            required
          />
        </div>
        <div className="w-[50%]">
          <textarea
            placeholder="Description"
            className="p-2 w-full h-32 rounded-md border border-gray-300 bg-gray-100"
            rows="8"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Save Button */}
      <button type="submit" className="w-48 h-12 rounded-full bg-red-800 text-white" disabled={loading}>
        {loading ? 'Saving ...' : 'Save'}
      </button>
    </form>
  );
};

export default AdminAddProject;
