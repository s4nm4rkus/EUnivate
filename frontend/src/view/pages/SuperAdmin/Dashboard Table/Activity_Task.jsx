import React, { useEffect, useState } from 'react';
import { format } from 'date-fns'; // For date formatting
import axios from 'axios';

const Activity_Task = ({ projects }) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [userName, setUserName] = useState('');
    const [taskDetails, setTaskDetails] = useState({});
    const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'; // Default image URL

    // Fetch user data and task details for each project
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            // Set the username and profile picture from localStorage
            setUserName(`${storedUser.firstName} ${storedUser.lastName}`);
            if (storedUser.profilePicture && storedUser.profilePicture.url) {
                setProfilePicture(storedUser.profilePicture.url);
            } else if (typeof storedUser.profilePicture === 'string') {
                setProfilePicture(storedUser.profilePicture);
            } else {
                setProfilePicture(defaultProfilePictureUrl);
            }
        }

        // Fetch tasks details for each project
        const fetchTaskDetails = async () => {
            const taskDetailsPromises = projects.map(async (project) => {
                const response = await axios.get(`http://localhost:5000/api/users/sa-tasks/${project._id}`);
                const tasks = response.data.data;
                return { projectId: project._id, tasks };
            });

            const details = await Promise.all(taskDetailsPromises);
            const taskDetailsMap = details.reduce((acc, { projectId, tasks }) => {
                acc[projectId] = tasks;
                return acc;
            }, {});

            setTaskDetails(taskDetailsMap);
        };

        if (projects.length > 0) {
            fetchTaskDetails();
        }
    }, [projects]);

    // Function to determine task changes (similar logic to the Activity component)
    const getTaskChanges = (task) => {
        let changes = [];

        const isTaskNew = task.createdAt === task.updatedAt;

        // Identify changes made to the task and push them to the changes array
        if (isTaskNew) {
            changes.push({
                type: 'created',
                label: 'Added task',
                value: task.taskName
            });
        }

        if (task.startDate && !isTaskNew && task.startDate !== task.previousStartDate) {
            changes.push({
                type: 'startDate',
                label: 'Changed start date to',
                value: format(new Date(task.startDate), 'MMM dd, yyyy')
            });
        } else if (task.startDate && isTaskNew) {
            changes.push({
                type: 'startDate',
                label: 'Added start date',
                value: format(new Date(task.startDate), 'MMM dd, yyyy')
            });
        }

        if (task.dueDate && !isTaskNew && task.dueDate !== task.previousDueDate) {
            changes.push({
                type: 'dueDate',
                label: 'Changed due date to',
                value: format(new Date(task.dueDate), 'MMM dd, yyyy')
            });
        } else if (task.dueDate && isTaskNew) {
            changes.push({
                type: 'dueDate',
                label: 'Added due date',
                value: format(new Date(task.dueDate), 'MMM dd, yyyy')
            });
        }

        if (task.priority && !isTaskNew && task.priority !== task.previousPriority) {
            changes.push({
                type: 'priority',
                label: 'Changed priority to',
                value: task.priority
            });
        } else if (task.priority && isTaskNew) {
            changes.push({
                type: 'priority',
                label: 'Added priority',
                value: task.priority
            });
        }

        if (task.status && !isTaskNew && task.status !== task.previousStatus) {
            changes.push({
                type: 'status',
                label: 'Changed status to',
                value: task.status
            });
        } else if (task.status && isTaskNew) {
            changes.push({
                type: 'status',
                label: 'Added status',
                value: task.status
            });
        }

        return changes;
    };

    return (
        <div className="w-full md:w-2/5">
            <h2 className="text-medium font-semibold text-gray-800 mb-2">Activity</h2>
            {/* Scrollable box with a max height and overflow */}
            <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm activity-div h-96 overflow-y-auto">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            {/* Project Name and Creation Date */}
                            <div className="flex items-center mb-2">
                                {/* Project Name */}
                                <h3 className="text-gray-800 font-medium text-sm">{project.projectName}</h3>
                                {/* Bullet Point and Creation Date */}
                                <div className="text-gray-500 text-xs flex ml-2 items-center">
                                    <span>&#8226;</span> {/* Bullet Point */}
                                    <span className="ml-2">{format(new Date(project.createdAt), 'MMM dd, yyyy')}</span>
                                </div>
                            </div>

                            {/* Task Name (below Project Name) */}
                            <ul className="mt-5">
                                {taskDetails[project._id] && taskDetails[project._id].length > 0 ? (
                                    taskDetails[project._id].map((task) => {
                                        const taskChanges = getTaskChanges(task);

                                        return (
                                            <li key={task._id} className="mb-2">
                                                <div className="text-gray-800 font-medium text-sm">
                                                    {task.taskName} {/* Task Name */}
                                                </div>

                                                {/* Profile Picture and Name */}
                                                <div className="flex items-center mt-2">
                                                    <img
                                                        src={profilePicture}
                                                        alt="Profile"
                                                        className="w-7 h-7 rounded-full object-cover mr-2"
                                                    />
                                                    <span className="text-gray-600 font-medium text-sm">{userName}</span>
                                                </div>

                                                {/* Task Changes */}
                                                {taskChanges.map((change, index) => (
                                                    <div key={index} className="ml-10 text-sm">
                                                        <span className="text-gray-500">{change.label} </span>
                                                        <span className="text-blue-500">{change.value}</span>
                                                    </div>
                                                ))}
                                            </li>
                                        );
                                    })
                                ) : (
                                    <p className="text-gray-500">No tasks available</p>
                                )}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No activity available</p>
                )}
            </div>
        </div>
    );
};

export default Activity_Task;
