import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaUser, FaFlag, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import UserNameModal from './UserNameModal';

const Modal = ({ isOpen, onClose, projectId, onTaskSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState(null); // State for selected objective
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [project, setProject] = useState({});
  const [selectedName, setSelectedName] = useState('');
  // const [selectedAvatar, setSelectedAvatar] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [status, setStatus] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [priority, setPriority] = useState('');
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [newObjective, setNewObjective] = useState('');
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    setIsPriorityDropdownOpen(false);
  };

  const togglePriorityDropdown = () => {
    setIsPriorityDropdownOpen(!isPriorityDropdownOpen);
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleAddObjective = () => {
    if (newObjective.trim()) {
      setObjectives([...objectives, newObjective]);
      setNewObjective('');
    }
  };

  const handleObjectiveSelect = (objective) => {
    setSelectedObjective(objective);
  };

  const handleDeleteObjective = (objectiveToDelete) => {
    setObjectives(objectives.filter(objective => objective !== objectiveToDelete));
    // Clear selection if deleted objective was selected
    if (selectedObjective === objectiveToDelete) {
      setSelectedObjective(null);
    }
  };


  const handleObjectiveSubmit = (index) => {
    setCompletedObjectiveIndex(index);
    const updatedObjectives = objectives.slice();
    updatedObjectives[index] = updatedObjectives[index].trim();
    setObjectives(updatedObjectives);
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPriorityDropdownOpen(false);
        setIsStatusDropdownOpen(false);
        setIsDifficultyDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/sa-getnewproject/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };


  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId]);


  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/members-superadmins');
      setNamesList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = () => {
    if (!taskName || !startDate || !dueDate || !objectives.length || !status || !difficulty || !selectedName) {
      alert('Please fill in all fields before submitting.');
      return;
    }

    if (new Date(dueDate) < new Date(startDate)) {
      alert('Due Date cannot be earlier than Start Date.');
      return;
    }

    const newTask = {
      taskName,
      objectives,
      selectedName,
      status,
      difficulty,
      startDate,
      dueDate,
      priority,
      image1,
      image2,
    };

    onTaskSubmit(newTask);
  };

  const toggleUserNameVisibility = () => {
    fetchUsers();
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const { url } = await handleSaveAttachment(file);
        if (!image1) {
          setImage1(url);
        } else if (!image2) {
          setImage2(url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleSaveAttachment = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EunivateImage');
    formData.append('cloud_name', 'dzxzc7kwb');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzxzc7kwb/image/upload',
        formData
      );
      return { url: response.data.secure_url };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 w-96 max-h-[90vh] overflow-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="mb-4">
          <h2 >{project.projectName}</h2>

          <input
            type="text"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="appearance-none rounded w-full py-2 px-3 text-xl text-black font-semibold leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Write a task name"
          />
        </div>
        <div className="mb-4 flex justify-start space-x-3">
          <button
            className="flex items-center space-x-2 bg-transparent border-none outline-none focus:outline-none"
            onClick={toggleUserNameVisibility}
          >
            <span className="text-gray-700 text-sm font-semibold">
              Assignee
            </span>
            <FaUser className="text-gray-500 text-lg bg-transparent rounded-lg border" />
            <span className='text-sm text-gray-500'>Assign to</span>
          </button>
        </div>
        <div className="mb-4 flex items-center space-x-3">
          <label 
            className="text-gray-700 text-sm font-semibold"
            htmlFor="startDate"
          >
            Start Date
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>
        <div className="mb-4 flex items-center space-x-3">
          <label 
            className="text-gray-700 text-sm font-semibold"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="appearance-none rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          />
          {new Date(dueDate) < new Date(startDate) && (
            <p className="text-red-500 text-xs ml-2">Due Date cannot be earlier than Start Date.</p>
          )}
        </div>


 <div className="mb-4 flex items-center space-x-4">
  <label className="block text-gray-700 text-sm font-semibold">Priority</label>
  <div className="flex items-center space-x-3 relative">
    <div>
      <FaFlag 
        className={`text-xl ${priority === 'easy' ? 'text-green-500' : priority === 'medium' ? 'text-yellow-500' : priority === 'hard' ? 'text-red-500' : 'text-gray-400'}`} 
      />
    </div>
    <button
      onClick={togglePriorityDropdown}
      className={`text-gray-700 ${priority ? '' : 'text-gray-500'} flex items-center space-x-2`}
    >
      
      <span className="text-gray-700">{priority || 'Level'}</span>
      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
    </button>
    {isPriorityDropdownOpen && (
      <div
        ref={dropdownRef}
        className="absolute top-full right-0 mt-2 w-40 left-0 bg-white shadow-lg border border-gray-300 rounded z-50"
      >
        <button
          onClick={() => handlePriorityChange('easy')}
          className="w-full px-4 py-2 text-green-500 hover:bg-gray-100 text-left flex items-center space-x-2"
        >
          <FaFlag className="text-xl text-green-500" />
          <span>Easy</span>
        </button>
        <button
          onClick={() => handlePriorityChange('medium')}
          className="w-full px-4 py-2 text-yellow-500 hover:bg-gray-100 text-left flex items-center space-x-2"
        >
          <FaFlag className="text-xl text-yellow-500" />
          <span>Medium</span>
        </button>
        <button
          onClick={() => handlePriorityChange('hard')}
          className="w-full px-4 py-2 text-red-500 hover:bg-gray-100 text-left flex items-center space-x-2"
        >
          <FaFlag className="text-xl text-red-500" />
          <span>Hard</span>
        </button>
      </div>
    )}
  </div>
</div>


                    <div className="mb-4 flex items-center space-x-4">
                  <label className="block text-gray-700 text-sm font-semibold">Status</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={toggleStatusDropdown}
                      className="text-gray-700 px-4 py-2  border-gray-300 rounded  flex items-center space-x-2"
                    >
                      <span>{status || 'Select Status'}</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    {isStatusDropdownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute top-full right-0 bg-white border left-0 border-gray-300 rounded shadow-lg mt-1 w-48 z-10"
                      >
                        {['Pending', 'Todo', 'On going', 'Done', 'Backlog'].map((item) => (
                          <button
                            key={item}
                            type="button"
                            onClick={() => handleStatusSelect(item)}
                            className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                    
                <div className="mb-4">
              <div className="flex items-center space-x-36 mb-2">
                <span className="text-gray-700 text-sm font-semibold">Objectives</span>
                <button
                  onClick={handleAddObjective}
                  className="flex items-center text-gray-500 hover:text-gray-700"
                >
                  <FaPlus className="text-gray-500" />
                </button>
              </div>
              {objectives.length > 0 && (
                <div>
                  {objectives.map((objective, index) => (
                    <div key={index} className="mb-2 flex items-center space-x-2">
                      <span className="flex items-center space-x-2">
                        <span className={`text-gray-700 ${selectedObjective === objective ? 'font-semibold' : ''}`}>
                          {objective || 'New Objective'}
                        </span>
                        {selectedObjective === objective && (
                          <button
                            onClick={() => handleObjectiveSelect(null)} // Deselects the current objective
                            className="text-red-500 hover:text-red-700"
                            title="Deselect"
                          >
                            <FaTimes />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteObjective (objective)} // Delete button functionality
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <FaTimes />
                        </button>
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="text"
            
                className="appearance-none rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Add new objective"
              />
            </div>



        <div className="mb-4 flex justify-start items-center">
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="appearance-none rounded border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
            rows={4}
          />
        </div>
        <div className="mb-4 flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleClickFileInput}
              className="flex items-center px-4 py-2 bg-gray-200 border border-gray-300 rounded-lg shadow-sm text-gray-700"
            >
              <FaPlus className="text-gray-500" />
              <span className="ml-2">Add Attachment</span>
            </button>
          </div>
          <div>
            {selectedFiles.length > 0 && (
              <ul className="list-disc list-inside text-gray-700 mt-2">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span>{file.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <br />
        <input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddObjective()}
            className="appearance-none border rounded  w-full py-4 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ask question or post an update"
          />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>
            
        </div>
        {isUserNameModalOpen && (
          <UserNameModal
            isOpen={isUserNameModalOpen}
            onClose={() => setIsUserNameModalOpen(false)}
            namesList={namesList}
            onSelect={handleNameSelect}
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
