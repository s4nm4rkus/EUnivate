import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaUser, FaCircle, FaFlag, FaPlus } from 'react-icons/fa';
import UserNameModal from './UserNameModal';

const Modal = ({ isOpen, onClose, projectName, onTaskSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [objective, setObjective] = useState('');
  const [user, setUser] = useState({ firstName: '', lastName: '', profilePicture: '' });
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [status, setStatus] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);

  // useEffect(() => {
  //   const storedUser = JSON.parse(localStorage.getItem('user'));
  //   if (storedUser) {
  //     setUser(storedUser);
  //     fetchNames(storedUser);
  //   }
  // }, []);

  // const fetchNames = async (currentUser) => {
  //   const response = await fetch('/api/names');
  //   const data = await response.json();
  //   setNamesList([`${currentUser.firstName} ${currentUser.lastName}`, ...data.names]);
  // };

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!taskName || !startDate || !dueDate || !objective || !status || !difficulty || !selectedName) {
      alert("Please fill in all fields before submitting.");
      return;
    }
  
    const newTask = {
      taskName,
      objective,
      selectedName,
      status,
      difficulty,
      startDate,
      dueDate,
      image1,
      image2,
      selectedAvatar // Include selectedAvatar here
    };
  
    // Set category based on status
    if (status === 'Pending') {
      newTask.category = 'Document';
    } else if (status === 'Backlogs') {
      newTask.category = 'Backlogs';
    }
  
    onTaskSubmit(newTask);
  };
  

  const toggleUserNameVisibility = () => {
    setIsUserNameModalOpen(true);
  };

  const handleNameSelect = (name, avatar) => {
    setSelectedName(name);
    setSelectedAvatar(avatar);
  };

  const toggleStatusDropdown = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const toggleDifficultyDropdown = () => {
    setIsDifficultyDropdownOpen(!isDifficultyDropdownOpen);
  };

  const handleStatusSelect = (selectedStatus) => {
    setStatus(selectedStatus);
    setIsStatusDropdownOpen(false);
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    setIsDifficultyDropdownOpen(false);
  };

  const handleImageDelete = (imageNumber) => {
    if (imageNumber === 1) {
      setImage1(null);
    } else if (imageNumber === 2) {
      setImage2(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (!image1) {
          setImage1(base64String);
        } else if (!image2) {
          setImage2(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById('imageUpload').click();
  };

  const statusIconColor = 
    status === 'Ongoing' ? 'text-yellow-500' :
    status === 'Done' ? 'text-green-500' :
    status === 'Pending' ? 'text-gray-500' :
    status === 'Todo' ? 'text-pink-500' :
    status === 'Backlogs' ? 'text-red-500' : 'text-gray-500';

  const flagIconColor = difficulty === 'Easy' ? 'text-green-500' : 
                         difficulty === 'Medium' ? 'text-yellow-500' : 
                         difficulty === 'High' ? 'text-red-500' :
                         'text-gray-500';

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 w-96 max-h-[90vh] overflow-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold mr-2">Add {projectName}</h2>
            <div className="relative flex items-center mr-4">
              <button
                onClick={toggleStatusDropdown}
                className={`p-2 rounded-full hover:bg-gray-300 focus:outline-none ${statusIconColor}`}
              >
                <FaCircle size={20} />
              </button>
              {status && (
                <span className="ml-2 text-sm text-gray-700">
                  {status}
                </span>
              )}
              {isStatusDropdownOpen && (
                <div className="absolute mt-60 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <ul>
                    <li
                      onClick={() => handleStatusSelect('Ongoing')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-yellow-500"
                    >
                      <FaCircle className="mr-2" /> Ongoing
                    </li>
                    <li
                      onClick={() => handleStatusSelect('Done')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-green-500"
                    >
                      <FaCircle className="mr-2" /> Done
                    </li>
                    <li
                      onClick={() => handleStatusSelect('Pending')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-gray-500"
                    >
                      <FaCircle className="mr-2" /> Pending
                    </li>
                    <li
                      onClick={() => handleStatusSelect('Todo')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-pink-500"
                    >
                      <FaCircle className="mr-2" /> Todo
                    </li>
                    <li
                      onClick={() => handleStatusSelect('Backlogs')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-red-500"
                    >
                      <FaCircle className="mr-2" /> Backlogs
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative flex items-center">
              <button
                onClick={toggleDifficultyDropdown}
                className={`p-2 rounded-full hover:bg-gray-300 focus:outline-none ${flagIconColor}`}
              >
                <FaFlag size={20} />
              </button>
              {difficulty && (
                <span className="ml-2 text-sm text-gray-700">
                  {difficulty}
                </span>
              )}
              {isDifficultyDropdownOpen && (
                <div className="absolute mt-40 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
                  <ul>
                    <li
                      onClick={() => handleDifficultySelect('Easy')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-green-500"
                    >
                      <FaFlag className="mr-2" /> Easy
                    </li>
                    <li
                      onClick={() => handleDifficultySelect('Medium')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-yellow-500"
                    >
                      <FaFlag className="mr-2" /> Medium
                    </li>
                    <li
                      onClick={() => handleDifficultySelect('High')}
                      className="cursor-pointer px-4 py-2 flex items-center hover:bg-gray-100 text-red-500"
                    >
                                           <FaFlag className="mr-2" /> High
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="taskName">
            Task Name
          </label>
          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter task name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dueDate">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="objective">
            Objective
          </label>
          <textarea
            id="objective"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            placeholder="Enter the objective"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Attach Images
          </label>
          <div className="flex items-center justify-center space-x-4 border-2 border-dashed border-gray-300 rounded-lg p-4">
            {image1 && (
              <div className="relative">
                <img
                  src={image1}
                  alt="Uploaded Preview 1"
                  className="w-32 h-32 object-cover rounded cursor-pointer"
                  onClick={handleImageClick}
                />
                <button
                  onClick={() => handleImageDelete(1)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            )}
            {image2 && (
              <div className="relative">
                <img
                  src={image2}
                  alt="Uploaded Preview 2"
                  className="w-32 h-32 object-cover rounded cursor-pointer"
                  onClick={handleImageClick}
                />
                <button
                  onClick={() => handleImageDelete(2)}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                >
                  <FaTimes size={16} />
                </button>
              </div>
            )}
            {(image1 === null || image2 === null) && (
              <label htmlFor="imageUpload" className="cursor-pointer">
                <FaPlus size={24} className="text-gray-600" />
              </label>
            )}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-4">
<button
  onClick={toggleUserNameVisibility}
  className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none flex items-center"
>
  {/* Display selected user's avatar if available */}
  {selectedAvatar ? (
    <img
      src={selectedAvatar}
      alt="Selected User Avatar"
      className="w-8 h-8 rounded-full mr-2"
    />
  ) : (
    <FaUser size={20} className="text-gray-600" />
  )}
  {selectedName && (
    <span className="text-sm text-gray-700">{selectedName}</span>
  )}
</button>

        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-red-800 text-white px-9 py-3 rounded-md shadow hover:bg-red-900 w-full mt-10"
          >
            Submit
          </button>
        </div>
      </div>
      <UserNameModal
        isOpen={isUserNameModalOpen}
        onClose={() => setIsUserNameModalOpen(false)}
        user={user}
        onSelectName={handleNameSelect}
      />
    </div>,
    document.body
  );
};

export default Modal;