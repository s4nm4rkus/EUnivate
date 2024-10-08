import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
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
            setProfilePicture(storedUser.profilePicture?.url || defaultProfilePictureUrl);
        }

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

    const getTaskChanges = (task) => {
        let changes = [];
    
        task.history.forEach((change) => {
            const parsedChanges = JSON.parse(change.changes);
    
            // Loop through each change and create a formatted change entry
            Object.keys(parsedChanges).forEach((key) => {
                let changeType = '';
                let newValue = parsedChanges[key];
    
                // Set specific labels for the type of change
                switch (key) {
                    case 'taskName':
                        changeType = 'changed task name to';
                        break;
                    case 'description':
                        changeType = 'added new description';
                        break;
                        case 'objectives':
                            changeType = 'updated objectives';
                            newValue = parsedChanges[key].map((objective, index) => (
                              <li key={index}>
                                <span>{objective.text}</span>
                                {objective.done ? (
                                  <span className="text-green-500 ml-2">(Completed)</span>
                                ) : (
                                  <span className="text-red-500 ml-2">(Not Completed)</span>
                                )}
                              </li>
                            ));
                            break;
                    case 'priority':
                        changeType = 'changed the priority to';
                        break;
                    case 'status':
                        changeType = 'changed the status to';
                        break;
                    case 'startDate':
                        changeType = 'changed start date to';
                        // Format the newValue (startDate) using date-fns
                        newValue = format(new Date(parsedChanges[key]), 'MMM d, yyyy hh:mm a');
                        break;
                    case 'dueDate':
                        changeType = 'changed due date to';
                        // Format the newValue (dueDate) using date-fns
                        newValue = format(new Date(parsedChanges[key]), 'MMM d, yyyy hh:mm a');
                        break;
                    case 'attachment':
                        changeType = 'added new attachment';
                        // Check if the attachment is an array
                        if (Array.isArray(parsedChanges[key])) {
                            newValue = parsedChanges[key].map((attachment, index) => (
                                <div key={index}>
                                    <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                                        {attachment.publicId}
                                    </a>
                                </div>
                            ));
                        } else {
                            newValue = (
                                <a href={parsedChanges[key].url} target="_blank" rel="noopener noreferrer">
                                    {parsedChanges[key].url}
                                </a>
                            );
                        }
                        break;
                        case 'assignee':
                            changeType = 'assigned to';
                            newValue = Array.isArray(parsedChanges[key])
                              ? parsedChanges[key].map((assignee) => assignee.username).join(', ')
                              : 'Other User';
                            break;
                          default:
                            changeType = 'made an update';
                            break;
                        }
    
                changes.push({
                    modifiedBy: change.modifiedBy, // The user who modified the task
                    type: changeType, // E.g., 'changed due date'
                    newValue, // The new value after the change (formatted date or other values)
                    modifiedAt: change.modifiedAt, // Timestamp of when the change was made
                });
            });
        });
    
        // Sort changes by modifiedAt date
        return changes.sort((a, b) => new Date(b.modifiedAt) - new Date(a.modifiedAt));
    };

    return (
        <div className="w-full h-full">
            <h2 className="text-medium font-semibold text-gray-800 mb-2">Activity</h2>
            {/* Scrollable box with a flexible height */}
            <div className="bg-white p-4 border border-gray-300 rounded-lg shadow-sm h-full overflow-y-auto">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div key={index} className="mb-4">
                            {/* Project Name and Creation Date */}
                            <div className="flex items-center mb-2">
                                <h3 className="text-gray-800 font-medium text-sm">{project.projectName}</h3>
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
                                                        <span className="text-gray-500">{change.type} </span>
                                                        <span className="text-blue-500">{change.newValue}</span>
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
