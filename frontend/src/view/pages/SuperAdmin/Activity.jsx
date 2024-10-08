import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../admin.css';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar';
import { format } from 'date-fns'; 

const Activity = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [taskDetails, setTaskDetails] = useState({});
    const [userName, setUserName] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    const defaultProfilePictureUrl = 'https://www.imghost.net/ib/YgQep2KBICssXI1_1725211680.png'; // Default avatar image

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    // Fetch project and task details
    useEffect(() => {
        const fetchProjectsAndTasks = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const accessToken = user ? user.accessToken : null;

                // Fetch username and profile picture
                setUserName(`${user.firstName} ${user.lastName}`);
                if (user.profilePicture && user.profilePicture.url) {
                    setProfilePicture(user.profilePicture.url);
                } else {
                    setProfilePicture(defaultProfilePictureUrl);
                }

                const projectResponse = await axios.get('http://localhost:5000/api/users/sa-getnewproject', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                setProjects(projectResponse.data);

                const taskDetailsPromises = projectResponse.data.map(async (project) => {
                    const taskResponse = await axios.get(`http://localhost:5000/api/users/sa-tasks/${project._id}`);
                    const tasks = taskResponse.data.data;

                    return { projectId: project._id, tasks };
                });

                const details = await Promise.all(taskDetailsPromises);

                const taskDetailsMap = details.reduce((acc, { projectId, tasks }) => {
                    acc[projectId] = tasks;
                    return acc;
                }, {});

                setTaskDetails(taskDetailsMap);
            } catch (error) {
                console.error('Error fetching projects and tasks:', error);
            }
        };

        fetchProjectsAndTasks();
    }, []);

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
        <div className="bg-gray-100 min-h-screen p-6">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-4">
                <div className="relative">
                    <h1 className="text-lg md:text-2xl font-medium text-gray-800 hidden md:block">
                        Activity
                    </h1>
                </div>
                <AdminNavbar
                    isAccountDropdownOpen={isAccountDropdownOpen}
                    toggleAccountDropdown={toggleAccountDropdown}
                />
            </div>

            {/* Project and Task Content */}
            <div className="bg-white p-4 md:p-6 border border-gray-300 rounded-lg shadow-sm">
                {/* Render each group of task changes */}
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <div key={project._id} className="mb-6">
                            <div className="flex items-center">
                                <h2 className="text-lg md:text-2xs text-gray-800">
                                    {project.projectName}
                                    
                                </h2>
                            </div>
                            <ul className="mt-2 relative">
                                {taskDetails[project._id] && taskDetails[project._id].length > 0 ? (
                                    taskDetails[project._id].map((task) => {
                                        const taskChanges = getTaskChanges(task);

                                        if (taskChanges.length === 0) return null;

                                        return (
                                            <div key={task._id} className="mb-6">
                                                {/* Task Name */}
                                                <div className="mb-2">
                                                    <span className="text-lg md:text-2xl font-semibold">{task.taskName}</span>
                                                </div>

                                                {taskChanges.map((change, changeIndex) => (
                                                    <div key={changeIndex} className="relative pl-10 mb-8">
                                                        {/* Vertical line */}
                                                        <div className="absolute top-0 left-4 h-full w-px bg-indigo-800"></div>
                                                        
                                                        {/* Timeline bullet */}
                                                        <div className="absolute top-2 left-3 w-3 h-3 rounded-full bg-indigo-800"></div>

                                                        {/* Task changes */}
                                                        <div className="ml-6">
                                                        <div className="flex items-center">
                                                            <img
                                                            src={(change.modifiedBy?.profilePicture?.url) || defaultProfilePictureUrl} // Use optional chaining here
                                                            alt="Profile"
                                                            className="w-8 h-8 rounded-full"
                                                            />
                                                            <div className="ml-3">
                                                            <div className="text-sm md:text-base text-gray-700">
                                                                <span className="font-medium mr-1">{change.modifiedBy?.username || 'A user'}</span> {/* Handle undefined user */}
                                                                <span>{change.type}</span>
                                                                <span className="text-blue-500 ml-1">
                                                                {typeof change.newValue === 'object' ? (
                                                                    <ul>{change.newValue}</ul>
                                                                ) : (
                                                                    change.newValue
                                                                )}
                                                                </span>
                                                            </div>
                                                            <span className="text-xs md:text-sm text-gray-500">
                                                                {format(new Date(change.modifiedAt), 'MMM yyyy hh:mm a')}
                                                            </span>
                                                            </div>
                                                        </div>
                                                        </div>
                                                    </div>
                                                    ))}




                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-lg text-gray-500"></p>
                                )}
                            </ul>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-500">No projects available</p>
                )}
            </div>
        </div>
    );
};

export default Activity;