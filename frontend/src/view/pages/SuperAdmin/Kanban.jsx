import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaCircle, FaCalendarAlt } from 'react-icons/fa';
import Modal from './Modal'; // Adjust the path based on the actual file location
import { useLocation } from 'react-router-dom';

const Kanban = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState({ profilePicture: '' });
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Get project name from location state
  const location = useLocation();
  const projectName = location.state?.project?.name;

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser); // Set the user state with the stored user data
    }
  }, []);

  useEffect(() => {
    if (projectName) {
      // Load tasks for the specific project from local storage
      const storedTasks = JSON.parse(localStorage.getItem(`kanban-${projectName}`)) || [];
      setTasks(storedTasks);
    }
  }, [projectName]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleTaskSubmit = (newTask) => {
    const newTaskWithId = { ...newTask, id: Date.now() }; // Using timestamp as a unique ID
    const updatedTasks = [...tasks, newTaskWithId];
    setTasks(updatedTasks);
    localStorage.setItem(`kanban-${projectName}`, JSON.stringify(updatedTasks));
    handleCloseModal();
  };

  const handleStatusChange = (task, newStatus) => {
    const statusToSet = newStatus === 'Pending' ? 'Document' : newStatus;
    const updatedTasks = tasks.map(t =>
      t.id === task.id ? { ...t, status: statusToSet } : t
    );
    setTasks(updatedTasks);
    localStorage.setItem(`kanban-${projectName}`, JSON.stringify(updatedTasks));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task =>
      task.status === status ||
      (status === 'Document' && task.status === 'Pending')
    );
  };

  const getStatusIconColor = (status) => {
    switch (status) {
      case 'Ongoing':
        return 'text-yellow-500';
      case 'Done':
        return 'text-green-500';
      case 'Pending':
        return 'text-gray-500';
      case 'Todo':
        return 'text-pink-500';
      case 'Backlogs':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
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
    <div className="flex space-x-4 p-4">
      {['Document', 'Todo', 'Ongoing', 'Done', 'Backlogs'].map((status) => (
        <div key={status} className="w-1/4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold">{status}</h2>
            <button
              onClick={handleOpenModal}
              className="bg-red-700 text-white p-1 rounded flex items-center justify-center"
              style={{ width: '30px', height: '30px' }}
            >
              {status === 'Backlogs' ? <FaTimes size={16} /> : <FaPlus size={16} />}
            </button>
          </div>
          <div>
            {getTasksByStatus(status).map((task) => (
              <div key={task.id} className="border p-2 mb-2 rounded bg-white shadow-md">
                <div className="flex items-center justify-between mb-2">
                  <div className={`text-sm font-semibold py-2 px-3 rounded ${getDifficultyClasses(task.difficulty)}`}>
                    {task.difficulty}
                  </div>
                  <div className="relative">
                    <FaCircle
                      size={20}
                      className={`${getStatusIconColor(task.status)} ml-4 cursor-pointer`}
                      onClick={() => handleDropdownToggle(task)}
                    />
                    {dropdownOpen === task && (
                      <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg z-10">
                        {['Ongoing', 'Done', 'Pending', 'Todo', 'Backlogs'].map((statusOption) => (
                          <button
                            key={statusOption}
                            onClick={() => {
                              handleStatusChange(task, statusOption);
                              setDropdownOpen(null);
                            }}
                            className="flex items-center p-2 hover:bg-gray-100 w-full text-left"
                          >
                            <FaCircle className={getStatusIconColor(statusOption)} />
                            <span className="ml-2">{statusOption}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-semibold mb-2 text-2xl">{task.taskName}</h3>
                <p className="mt-2">{task.objective}</p>
                <div className={`flex flex-col items-center gap-4 mt-2`}>
  {task.image1 && (
    <img
      src={task.image1}
      alt="Task 1"
      className={`object-cover rounded-lg border  w-full md:w-4/4 lg:w-1/10 h-auto`}
      style={{ maxHeight: '200px' }}
    />
  )}
  {task.image2 && (
    <img
      src={task.image2}
      alt="Task 2"
      className={`object-cover rounded-lg border w-full md:w-4/4 lg:w-1/10 h-auto`}
      style={{ maxHeight: '200px' }}
    />
  )}
</div>

                <div className="p-2 mt-2 flex items-center">
                  <div className="mr-2">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture.url || user.profilePicture} 
                        alt="Profile"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <img 
                        src="/mnt/data/image.png" 
                        alt="Default Profile"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div className="ml-auto flex items-center">
                    <FaCalendarAlt size={16} className="text-gray-500 mr-2" />
                    <p>
                      {new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(task.startDate))}
                      {task.dueDate ? ` to ${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(new Date(task.dueDate))}` : ''}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onTaskSubmit={handleTaskSubmit} />
    </div>
  );
};

export default Kanban;
