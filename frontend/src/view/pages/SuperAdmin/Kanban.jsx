import React, { useState, useEffect } from 'react';
import { FaPlus, FaCircle } from 'react-icons/fa';
import Modal from './Modal'; // Adjust the path based on the actual file location
import axios from 'axios'; // Import axios for API calls

const Kanban = ({ projectId }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    if (projectId) {
      // Fetch tasks from the database based on projectId
      axios.get(`http://localhost:5000/api/users/sa-gettasks/${projectId}`)
        .then(response => {
          setTasks(response.data.tasks || []); // Ensure tasks is always an array
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
    }
  }, [projectId]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTaskSubmit = (newTask) => {
    const newTaskWithId = { ...newTask, id: Date.now() }; // Using timestamp as a unique ID
    // Simulating a new task being added to the state
    setTasks(prevTasks => [...prevTasks, newTaskWithId]);
    handleCloseModal();
  };

  const handleStatusChange = (task, newStatus) => {
    const updatedTask = { ...task, status: newStatus };
    // Update task status locally
    setTasks(prevTasks => prevTasks.map(t => (t.id === task.id ? updatedTask : t)));
  };

  const getDifficultyClasses = (difficulty) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-200 text-green-700';
      case 'Medium':
        return 'bg-orange-200 text-orange-700';
      case 'High':
        return 'bg-red-200 text-red-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const handleDropdownToggle = (task) => {
    setDropdownOpen(prev => prev === task ? null : task);
    setTaskToEdit(task);
  };

  return (
    <>
      <div className="flex space-x-4 p-4">
        {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
          <div key={status} className="w-1/4">
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

            <div>
              {tasks && tasks.filter(task => task.status === status).map((task) => (
                <div key={task.id} className="border p-2 mb-2 rounded bg-white shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className={`text-sm font-semibold py-2 px-3 rounded ${getDifficultyClasses(task.difficulty)}`}>
                      {task.difficulty}
                    </div>
                    <div className="relative">
                      <FaCircle
                        size={20}
                        className="text-gray-500 ml-4 cursor-pointer"
                        onClick={() => handleDropdownToggle(task)}
                      />
                      {dropdownOpen === task && (
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                          {['Ongoing', 'Done', 'Pending', 'Todo', 'Backlogs'].map((statusOption) => (
                            <button
                              key={statusOption}
                              onClick={() => handleStatusChange(task, statusOption)}
                              className="flex items-center p-2 hover:bg-gray-100 w-full text-left"
                            >
                              <span className="ml-2">{statusOption}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-2xl">{task.taskName}</h3>
                  <p className="mt-2">{task.objective}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        projectId={projectId} 
        onTaskSubmit={handleTaskSubmit} 
      />
    </>
  );
};

export default Kanban;
