import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes, FaUser, FaCircle, FaFlag, FaCamera, FaPlus } from 'react-icons/fa';
import UserNameModal from './UserNameModal';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Task component for drag and drop
const Task = ({ task, index, moveTask }) => {
  const [, ref] = useDrag({
    type: 'task',
    item: { index }, // Dragged item index
  });

  const [, drop] = useDrop({
    accept: 'task', // The type of item this drop target accepts
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index); // Move task when hovered over
        draggedItem.index = index; // Update the dragged item index
      }
    },
  });

  return (
    <div ref={(node) => ref(drop(node))} className="task-item bg-gray-200 p-2 mb-2 rounded">
      {task.taskName} - {task.status}
    </div>
  );
};

const Modal = ({ isOpen, onClose, projectName, onTaskSubmit }) => {
  const [taskName, setTaskName] = useState('');
  const [objective, setObjective] = useState('');
  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const [isUserNameModalOpen, setIsUserNameModalOpen] = useState(false);
  const [selectedName, setSelectedName] = useState('');
  const [namesList, setNamesList] = useState([]);
  const [status, setStatus] = useState('');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('');
  const [isDifficultyDropdownOpen, setIsDifficultyDropdownOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [tasks, setTasks] = useState([]); // Initialize the tasks array

  // Drag-and-drop function to move tasks
  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchNames(storedUser);
    }
  }, []);

  const fetchNames = async (currentUser) => {
    const response = await fetch('/api/names');
    const data = await response.json();
    setNamesList([`${currentUser.firstName} ${currentUser.lastName}`, ...data.names]);
  };

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
    };

    // Set category based on status
    if (status === 'Pending') {
      newTask.category = 'Document';
    } else if (status === 'Backlogs') {
      newTask.category = 'Backlogs';
    }

    onTaskSubmit(newTask);
    setTasks([...tasks, newTask]); // Add new task to task list
  };

  const toggleUserNameVisibility = () => {
    setIsUserNameModalOpen(true);
  };

  const handleNameSelect = (name) => {
    setSelectedName(name);
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
    <DndProvider backend={HTML5Backend}>
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
                  <div className="absolute mt-12 w-32 bg-white border border-gray-300 rounded shadow-lg z-10">
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
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          {/* Tasks Display */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Tasks:</h3>
            {tasks.map((task, index) => (
              <Task key={index} task={task} index={index} moveTask={moveTask} />
            ))}
          </div>

          {/* Rest of form */}
          <input
            type="text"
            placeholder="Task Name"
            className="mb-2 p-2 border rounded w-full"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            placeholder="Objective"
            className="mb-2 p-2 border rounded w-full"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
          />
          {/* Additional form fields for images, dates, etc. */}

          <div className="flex justify-between">
            <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded">
              Submit Task
            </button>
          </div>
        </div>
      </div>
    </DndProvider>,
    document.getElementById('modal-root')
  );
};

export default Modal;
