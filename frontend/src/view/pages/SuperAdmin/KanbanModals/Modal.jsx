import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaUser } from 'react-icons/fa';
import axios from 'axios';
import UserNameModal from './UserNameModal';
import ObjectiveList from './ObjectiveList';
import StatusDropdown from './StatusDropdown';
import PriorityDropdown from './PriorityDropdown';
import AttachmentSection from './AttachmentSection';
import Dates from './Dates';

const Modal = ({ isOpen, onClose, projectId, onTaskSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [objectives, setObjectives] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [project, setProject] = useState({});
  const [selectedName, setSelectedName] = useState('');
  const [membersList, setMembersList] = useState([]);
  const [status, setStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [priority, setPriority] = useState('');
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsPriorityDropdownOpen(false);
        setIsStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && projectId) {
      fetchProjectDetails();
    }
  }, [isOpen, projectId]);

  useEffect(() => {
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  const fetchProjectDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/sa-getnewproject/${projectId}`);
      setProject(response.data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/members-superadmins');
      setMembersList(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSaveattachment = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'EunivateImage');
    formData.append('cloud_name', 'dzxzc7kwb');
  
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzxzc7kwb/image/upload',
        formData
      );
      return { publicId: response.data.public_id, url: response.data.secure_url };
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  

  const handleSubmit = async () => {
    setLoading(true);
    if (!taskName || !startDate || !dueDate || !status || !priority || !selectedName) {
      alert('Please fill in all fields before submitting.');
      return;
    }
  
    if (new Date(dueDate) < new Date(startDate)) {
      alert('Due Date cannot be earlier than Start Date.');
      return;
    }
  
    let uploadedImages = [];
  
    // Upload selected files to Cloudinary
    for (const file of selectedFiles) {
      try {
        const result = await handleSaveattachment(file); // Upload to Cloudinary
        uploadedImages.push({
          publicId: result.publicId,
          url: result.url
        }); // Collect the Cloudinary image data
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Failed to upload one or more images.');
        return;
      }
    }
  
    try {
      // Get the ObjectId for the selected user
      const userResponse = await axios.get(`http://localhost:5000/api/users/findByUsername/${selectedName}`);
      const assigneeId = userResponse.data._id;
  
      // Create the task with the uploaded image data
      const newTask = {
        taskName,
        objectives,
        assignee: assigneeId, // Use ObjectId for assignee
        status,
        priority,
        startDate,
        dueDate,
        attachment: uploadedImages, 
        description,
        questionUpdate: question,
      };
  
      // Send data to the backend API to save in MongoDB
      const response = await axios.post('http://localhost:5000/api/users/sa-task', newTask);
      console.log('Task created:', response.data);
      onTaskSubmit(newTask); 
          // Clear the fields
            setTaskName('');
            setDescription('');
            setObjectives([]);
            setSelectedObjective(null);
            setSelectedName('');
            setStatus('');
            setStartDate('');
            setDueDate('');
            setQuestion('');
            setSelectedFiles([]);
            // Close the modal
            onClose();
            
    } catch (error) {
      setLoading(false)
      console.error('Error saving task:', error);
      alert('Failed to save task.');
    }
  };
  


  const toggleUserNameVisibility = () => {
    setIsUserNameModalOpen(true);
  };

  const handleNameSelect = (member) => {
    setSelectedName(member.username);
  };

  const handleClickFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleImageChange = (index, event) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles[index] = event.target.files[0];
    setSelectedFiles(updatedFiles);
  };

  const handleImageDelete = (file) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-modal">
      <div className="bg-white p-6 w-96 max-h-[90vh] overflow-auto rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={16} />
          </button>
        </div>
        <div className="mb-4">
          <h2>{project?.projectName}</h2>
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
            <span className="text-gray-700 text-sm font-semibold">Assignee</span>
            <FaUser className="text-gray-500 text-lg bg-transparent rounded-lg border" />
            <span className='text-sm text-gray-500'>{selectedName || 'Assign to'}</span>
          </button>
        </div>

        <Dates
          startDate={startDate}
          dueDate={dueDate}
          setStartDate={setStartDate}
          setDueDate={setDueDate}
        />

        <PriorityDropdown
          priority={priority}
          setPriority={setPriority}
          isDropdownOpen={isPriorityDropdownOpen}
          setIsDropdownOpen={setIsPriorityDropdownOpen}
          dropdownRef={dropdownRef}
        />
        <StatusDropdown
          status={status}
          setStatus={setStatus}
          isDropdownOpen={isStatusDropdownOpen}
          setIsDropdownOpen={setIsStatusDropdownOpen}
          dropdownRef={dropdownRef}
        />

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

        <AttachmentSection
          fileInputRef={fileInputRef}
          handleClickFileInput={handleClickFileInput}
          handleFileSelect={handleFileSelect}
          selectedFiles={selectedFiles}
          handleImageChange={handleImageChange}
          handleImageDelete={handleImageDelete}
        />

        <ObjectiveList
          objectives={objectives}
          selectedObjective={selectedObjective}
          setObjectives={setObjectives}
          setSelectedObjective={setSelectedObjective}
        />

        <div className="mb-4 flex justify-start items-center">
          <input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="appearance-none rounded border w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ask question or post an update"
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={handleSubmit}
            className="bg-red-600 w-full text-white px-4 py-2 rounded hover:bg-red-700"
            
          >
                  {loading ? 'Submitting ...' : 'Submit'}
          </button>
        </div>
        {isUserNameModalOpen && (
          <UserNameModal
            isOpen={isUserNameModalOpen}
            onClose={() => setIsUserNameModalOpen(false)}
            membersList={membersList}
            onSelect={handleNameSelect}
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
