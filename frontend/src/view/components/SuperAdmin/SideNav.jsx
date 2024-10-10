// frontend/src/components/SideNav.js

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
// import { useNavigate } from 'react-router-dom';
import { 
    dashboard_logo, 
    dashboard_sidenav_icon, 
    activity_red, 
    dashboard_red, 
    messages_red, 
    people_red, 
    project_red, 
    settings_red, 
    task_red,
    activity_icon,
    messages_icon,
    people_icon,
    project_icon,
    settings_icon,
    task_icon
} from "../../../constants/assets";

const SideNav = ({ isNavOpen }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaceTitle, setWorkspaceTitle] = useState('');
    const [error, setError] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                // Fetch all workspaces
                const response = await axios.get('http://localhost:5000/api/users/workspaces');
                const workspacesData = response.data;
                setWorkspaces(workspacesData);

                const selectedWorkspaceResponse = await axios.get('http://localhost:5000/api/users/workspaces/selected');
                const selectedWorkspaceId = selectedWorkspaceResponse.data.selectedWorkspace?._id;
                const defaultWorkspace = workspacesData.find(workspace => workspace._id === selectedWorkspaceId);
    
                // Set the selected workspace only if it exists
                if (defaultWorkspace) {
                    setSelectedWorkspace(defaultWorkspace);
                } else {
                    console.warn("Selected workspace not found in workspaces data.");
                }
            } catch (err) {
                console.error("Error fetching workspaces:", err);
                setError('Failed to load workspaces');
            }
        };
    
        fetchWorkspaces();
    }, []);
    

    const closeModal = () => {
        setIsModalOpen(false);
        setWorkspaceTitle('');
        setError('');
    };

    const handleCreateWorkspace = async (e) => {
        e.preventDefault();
        if (!workspaceTitle.trim()) {
            setError('Workspace title is required');
            return;
        }
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/workspace', {
                workspaceTitle,
            });

            if (response.status === 201) {
                window.location.reload(); // Refresh the page
            }

            closeModal();
        } catch (err) {
            console.error("Error creating workspace:", err.response?.data?.error || err.message);
            setError(err.response?.data?.error || 'An error occurred while creating the workspace');
        }
    };

    const updateSelectedWorkspace = async (workspaceId, workspaceTitle) => {
        try {
            // Send selected workspace ID to the backend to update the SelectedWorkspace model
            await axios.put(`http://localhost:5000/api/users/workspaces/selected`, { 
                selectedWorkspace: workspaceId,
                selectedWorkspaceTitle: workspaceTitle 
            });
            console.log('Selected workspace updated successfully');
        } catch (err) {
            console.error("Error updating selected workspace:", err);
        }
    };

    const handleWorkspaceSelect = async (workspace) => {
        setSelectedWorkspace(workspace); // Update the selected workspace in the UI
        setIsDropdownOpen(false); // Close the dropdown after selection
    
        // Update the selected workspace in the database
        await updateSelectedWorkspace(workspace._id, workspace.workspaceTitle);
    };

    

    return (
        <div
            className={`side-nav-admin fixed top-0 left-0 h-full bg-red-750 shadow-lg transition-transform transform ${
                isNavOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:w-[250px] z-30`}
        >
            <div className="dashboard-logo flex items-center p-4">
                <img
                    src={dashboard_logo}
                    alt="EUnivate Logo"
                    className="h-7 mr-3"
                />
                <h2 className="text-lg font-bold text-white mt-3">EUnivate</h2>
            </div>

            <ul className="list-none p-0">
                {[
                    { to: "dashboard", text: "Dashboard", icon: dashboard_sidenav_icon, hoverIcon: dashboard_red },
                    { to: "project", text: "Project", icon: project_icon, hoverIcon: project_red },
                    { to: "task", text: "My Task", icon: task_icon, hoverIcon: task_red },
                    { to: "activity", text: "Activity", icon: activity_icon, hoverIcon: activity_red },
                    { to: "people", text: "People", icon: people_icon, hoverIcon: people_red },
                    { to: "messages", text: "Messages", icon: messages_icon, hoverIcon: messages_red },
                    { to: "settings", text: "Settings", icon: settings_icon, hoverIcon: settings_red },
                ].map((item, index) => (
                    <li className="mb-2" key={index}>
                        <Link
                            to={item.to}
                            className="group relative flex items-center p-2 bg-red-750 hover:bg-red-700 rounded-md transition-all"
                        >
                            <img
                                src={item.icon}
                                alt={`${item.text} Icon`}
                                className="absolute h-5 group-hover:hidden"
                            />
                            <img
                                src={item.hoverIcon}
                                alt={`${item.text} Icon Red`}
                                className="absolute h-5 hidden group-hover:block -translate-y-1"
                            />
                            <span className="ml-10 text-red-750 group-hover:text-red-750">
                                {item.text}
                            </span>
                        </Link>
                    </li>
                ))} 
            </ul>
            
            <div className="add-workspace">
            <p className="font-size">Workspace 
                <button onClick={() => {
                    console.log("Open Modal Triggered"); // Debugging line
                    setIsModalOpen(true); // Open the modal using local state
                }}>
                        <FontAwesomeIcon icon={faPlus} className="faPlusWorkspace"/>
                </button>
             </p>   
             <div className="workspaceSelect relative inline-block">
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="workspaceDropdown flex items-center justify-between bg-transparent text-white">
                        <span>{selectedWorkspace ? selectedWorkspace.workspaceTitle : 'Select Workspace'}</span>
                        <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} className="faChevronWS" />
                    </button>

                    {isDropdownOpen && (
                        <ul className="workspaceList absolute z-10 mt-2 ms-2 bg-white text-black shadow">
                            {workspaces.length > 0 ? (
                                workspaces.map((workspace) => (
                                    <li key={workspace._id} onClick={() => handleWorkspaceSelect(workspace)} className="p-2 hover:bg-gray-400 cursor-pointer">
                                        {workspace.workspaceTitle}
                                    </li>
                                ))
                            ) : (
                                <li className="p-2 text-gray-500">No workspaces available</li>
                            )}
                        </ul>
                    )}
                </div>


            </div> 

            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex ">
                    <div
                        className="addWorkspaceModal ml-1 bg-white p-2 rounded-md shadow-lg absolute bottom-20 h-50 w-60 z-60"
                        role="dialog"
                        aria-modal="true"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-1 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                            aria-label="Close Modal"
                        >
                            &times;
                        </button>

                        {/* Error Message */}
                        {error && <p className="text-red-500 mb-2">{error}</p>}

                        {/* Workspace Creation Form */}
                        <form onSubmit={handleCreateWorkspace}>
                            {/* Workspace Title Input */}
                            <label className="block m-1 text-gray-700">Add Workspace</label>
                            <input
                                type="text"
                                placeholder="Enter workspace title"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                                value={workspaceTitle}
                                onChange={(e) => setWorkspaceTitle(e.target.value)}
                                required
                            />

                            {/* Action Buttons */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="mr-10 px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SideNav;
