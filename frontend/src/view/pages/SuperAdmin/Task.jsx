import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import { FaFlag, FaCheckCircle } from 'react-icons/fa'; // Importing the flag and check icons

const Task = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short' }; 
        return new Date(dateString).toLocaleDateString('en-GB', options);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            setLoading(true);
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const accessToken = user ? user.accessToken : null;

                if (!accessToken) {
                    console.error('No access token found. Please log in again.');
                    return;
                }

                const response = await axios.get('http://localhost:5000/api/users/sa-getnewproject', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const tasksList = [];
                await Promise.all(
                    response.data.map(async (project) => {
                        const taskResponse = await axios.get(`http://localhost:5000/api/users/sa-tasks/${project._id}`);
                        const tasksWithProject = taskResponse.data.data.map(task => ({
                            ...task,
                            projectName: project.projectName,
                            objectiveCount: task.objectives ? task.objectives.length : 0 
                        }));
                        tasksList.push(...tasksWithProject);
                    })
                );

                setTasks(tasksList);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'easy':
                return 'text-green-500'; // Green for easy
            case 'medium':
                return 'text-yellow-500'; // Yellow for medium
            case 'hard':
                return 'text-red-500'; // Red for hard
            default:
                return 'text-gray-500'; // Default color if priority is not recognized
        }
    };

    const renderStatusIcon = (status) => {
        return status.toLowerCase() === 'done' ? (
            <FaCheckCircle className="text-green-500 text-2xl" /> // Larger green check circle for "done"
        ) : (
            <div className="w-6 h-6 rounded-full border border-gray-400"></div> // Larger empty circle for other statuses
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="w-full flex justify-between items-center mb-4">
                <div className="relative">
                    <h1 className="text-xl font-medium text-gray-800 hidden md:block">
                        Task
                    </h1>
                </div>
                <AdminNavbar
                    isAccountDropdownOpen={isAccountDropdownOpen}
                    toggleAccountDropdown={toggleAccountDropdown}
                />
            </div>

            <div className="mt-4">
                <h2 className="text-md font-medium text-gray-700 text-left">
                    Assignee
                </h2>
            </div>

            <div className="mt-4 flex gap-4">
                <div className="p-6 bg-white border rounded-lg shadow-md w-full">
                    <div className="text-gray-600 text-sm">
                        <div className="grid grid-cols-6 gap-4 font-medium mb-2">
                            <p>Task</p>
                            <p className="text-center">Due Date</p>
                            <p className="text-center">Priority</p>
                            <p className="text-center">Objective</p>
                            <p className="text-center">Status</p>
                            <p className="text-right">Project</p>
                        </div>

                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                        <ul className="space-y-2">
    {tasks.map((task) => (
        <li 
            key={task._id} 
            className="grid grid-cols-6 gap-4 items-center mb-1 p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-200 hover:shadow-md hover:scale-[1.02] hover:w-full transition-all duration-300 ease-in-out"
            onClick={() => openModal(task)}
        >
            <div className="flex items-center">
                {/* Status icon (check for "done", empty circle otherwise) */}
                {renderStatusIcon(task.status)}
                <p className="ml-2 font-bold">{task.taskName}</p>
            </div>
            <p className="text-center">{formatDate(task.dueDate)}</p>
            <div className="flex items-center justify-center">
                {/* Flag icon with color based on priority */}
                <FaFlag className={`mr-1 text-sm ${getPriorityColor(task.priority)}`} /> 
                <p>{task.priority}</p>
            </div>
            <p className="text-center">{task.objectiveCount} Objective</p>
            <p className="text-center">{task.status}</p>
            <p className="text-right">{task.projectName}</p>
        </li>
    ))}
</ul>

                        
                        )}
                    </div>
                </div>
            </div>

            {isModalOpen && selectedTask && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">{selectedTask.taskName}</h2>
                        <p><strong>Due Date:</strong> {formatDate(selectedTask.dueDate)}</p>
                        <p><strong>Priority:</strong> {selectedTask.priority}</p>
                        <p><strong>Objective(s):</strong> {selectedTask.objectiveCount} Objective</p>
                        <p><strong>Status:</strong> {selectedTask.status}</p>
                        <p><strong>Project:</strong> {selectedTask.projectName}</p>
                        
                        <button 
                            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
