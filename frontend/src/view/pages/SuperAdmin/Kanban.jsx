import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './KanbanModals/Modal';
import axios from 'axios'; // Import axios for API calls

const Kanban = ({ projectId, projectName }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!projectId) {
          console.error('Project ID is not defined');
          return; // Exit if projectId is not valid
        }
  
        console.log('Fetching tasks for projectId:', projectId); // Debugging log
        // Update the URL to match your backend route definition
        const response = await axios.get(`http://localhost:5000/api/users/sa-tasks/${projectId}`);
        setTasks(response.data.data); // Assuming the tasks are in response.data.data
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
  
    fetchTasks(); // Call the function to fetch tasks when projectId is available
  }, [projectId]); // Re-fetch tasks whenever projectId changes
  

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleStatusChange = (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    setTasks(prevTasks => prevTasks.map(t => (t._id === task._id ? updatedTask : t)));
  };

  const handleDropdownToggle = (task) => {
    setDropdownOpen(prev => prev === task ? null : task);
    setTaskToEdit(task);
  };

  const handleTaskSubmit = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="flex space-x-4 p-4">
      {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
        <div key={status} className="w-1/5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl text-gray-600 font-bold">{status}</h2>
            <button
              onClick={handleOpenModal}
              className="text-gray-600 p-0 flex items-center justify-center"
              style={{ width: '30px', height: '30px' }}
            >
              <FaPlus size={16} />
            </button>
          </div>
          <div className="space-y-2">
            {tasks.filter(task => task.status === status).map(task => (
              <div
                key={task._id}
                className="bg-white p-4 rounded shadow"
              >
                <div>{task.priority}</div>
                <h3 className="text-lg font-semibold">{task.taskName}</h3>
                <p className="text-gray-700">{task.description}</p>
                <button
                  onClick={() => handleDropdownToggle(task)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                {dropdownOpen === task && (
                  <div className="absolute bg-white border rounded shadow-lg">
                    <button
                      onClick={() => handleStatusChange(task, 'Document')}
                      className="block px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Document
                    </button>
                    <button
                      onClick={() => handleStatusChange(task, 'Todo')}
                      className="block px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Todo
                    </button>
                    <button
                      onClick={() => handleStatusChange(task, 'Ongoing')}
                      className="block px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Ongoing
                    </button>
                    <button
                      onClick={() => handleStatusChange(task, 'Done')}
                      className="block px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Done
                    </button>
                    <button
                      onClick={() => handleStatusChange(task, 'Backlogs')}
                      className="block px-4 py-2 text-left hover:bg-gray-100"
                    >
                      Backlogs
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        projectId={projectId} 
        onTaskSubmit={handleTaskSubmit} 
      />
    </div>
  );
};

export default Kanban;
