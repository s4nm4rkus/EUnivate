import React, { useState, useEffect, useRef } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../../components/SuperAdmin/AdminNavbar.jsx';
import Kanban from './Kanban';
import List from './List';
import Calendar from './Calendar';
import GanttChart from './GanttChart';
import RaciMatrix from './RaciMatrix';

const ProjectDetails = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const [selectedView, setSelectedView] = useState('Kanban');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUserModalOpen, setIsUserModalOpen] = useState(false);
    const [error, setError] = useState(null);
    const [selectedMembers, setSelectedMembers] = useState([]); 
    const [addedMembers, setAddedMembers] = useState([]);
    const [members, setMembers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [addText, setAddText] = useState('');
    const [project, setProject] = useState({});
    const [isImageVisible, setIsImageVisible] = useState(false);

    const modalRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = location.state?.projectId;

    useEffect(() => {
        const fetchProjectDetails = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const accessToken = user?.accessToken;

                if (!accessToken) {
                    setError('No access token found. Please log in again.');
                    return;
                }

                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-getnewproject/${projectId}`, {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                setProject(response.data);
                   setAddedMembers(response.data.invitedUsers);
            } catch (error) {
                console.error('Error fetching project details:', error);
                setError('Error fetching project details.');
            }
        };

        if (projectId) {
            fetchProjectDetails();
        }
    }, [projectId]);

    const toggleAccountDropdown = () => setIsAccountDropdownOpen(!isAccountDropdownOpen);

    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUserIconClick = async () => {
        setIsImageVisible(!isImageVisible);
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const accessToken = user?.accessToken;

            if (!accessToken) {
                throw new Error('No access token found. Please log in.');
            }

            const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/members-superadmins`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            setMembers(response.data);
            setIsUserModalOpen(true);
        } catch (error) {
            console.error('Error fetching members:', error.response?.data || error.message);
            setError('Error fetching members.');
        }
    };

    const handleProfileClick = () => {
        setIsImageVisible(true); // Show the image when profile is clicked
    };
    const handleAddMembers = async () => {
        try {
            if (!project || !project._id) {
                throw new Error('Invalid project object.');
            }
            const user = JSON.parse(localStorage.getItem('user'));
            const accessToken = user?.accessToken;
            
            const userIds = selectedMembers.map(member => {
                if (!member || !member._id) {
                    console.error('Invalid member object in selectedMembers:', member);
                    return null;
                }
                return member._id;
            }).filter(id => id !== null);
    
            if (userIds.length === 0) {
                throw new Error('No valid user IDs to add.');
            }
    
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/users/sa-invite-users`, {
                projectId: project._id,
                users: userIds
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
    
                 // Handle response
            setAddedMembers(response.data.invitedUsers);
            setSelectedMembers([]);
            setIsUserModalOpen(false);
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred while adding members.';
            console.error('Error adding members:', errorMessage);
            setError(errorMessage); // Set error message to state
        }
    };
    
    

    const toggleMemberSelection = (member) => {
        if (!member?._id) {
            console.error('Invalid member object:', member);
            return;
        }
        setSelectedMembers(prevSelectedMembers =>
            prevSelectedMembers.some(selected => selected._id === member._id)
                ? prevSelectedMembers.filter(selected => selected._id !== member._id)
                : [...prevSelectedMembers, member]
        );
    };

    const handleCloseUserModal = () => {
        setIsUserModalOpen(false);
    };

    const handleButtonTextUpdate = (text) => {
        setAddText(text);
        handleCloseModal();
        if (text === 'Gantt Chart') {
            setSelectedView('GanttChart');
        } else if (text === 'RACI Matrix') {
            setSelectedView('RaciMatrix');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCloseModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredMembers = members.filter(member =>
        member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-gray-100 min-h-screen p-6">
               <div className="w-full flex justify-between items-center mb-16">
      <div className="relative">
    <h1 className="text-2xl font-medium text-gray-800 hidden md:block">
        Project Details 
    </h1>
</div>
        <AdminNavbar
          isAccountDropdownOpen={isAccountDropdownOpen}
          toggleAccountDropdown={toggleAccountDropdown}
        />
      </div>

            <div className="bg-white p-4 rounded-md shadow-md border border-gray-200">
                <div className="flex items-start space-x-4">
                    {project.thumbnail && (
                        <div className="w-24 h-24 flex-shrink-0">
                            <img 
                                src={project.thumbnail.url} 
                                alt={project.projectName} 
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    )}

                    <div className="flex flex-col flex-grow">
                        <div className="flex items-center space-x-4 mb-5">
                            <button
                                onClick={() => navigate(-1)}
                                className="text-gray-500 hover:underline"
                            >
                                Project
                            </button>
                            <span className="text-gray-500">/</span>
                            <span className="text-gray-500">Detail</span>
                        </div>

                        <div className="relative flex items-center space-x-4">
                            <h2 className="text-3xl font-semibold mt-[-1rem]">
                                {project.projectName}
                            </h2>
                            <FontAwesomeIcon 
                                icon={faUserPlus} 
                                className="cursor-pointer mt-[-1rem]" 
                                size="lg" 
                                onClick={handleUserIconClick}
                            />
                            <div className="flex -space-x-4 right-0">
                            {addedMembers.map(member => (
    <img
        key={member._id} // Assuming _id is unique, but ensure this in your data
        src={member.profilePicture}
        alt={member.username}
        className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
        onClick={() => toggleMemberSelection(member)}
    />
))}

                            </div>
                        </div>

                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => handleViewChange('Kanban')}
                                className="text-black hover:text-gray-700"
                            >
                                Kanban
                            </button>
                            <button
                                onClick={() => handleViewChange('List')}
                                className="text-black hover:text-gray-700"
                            >
                                List
                            </button>

                            <button
                                onClick={() => handleViewChange('Calendar')}
                                className="text-black hover:text-gray-700"
                            >
                                Calendar
                            </button>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleAddClick}
                                    className="text-black hover:text-gray-700"
                                >
                                    + Add
                                </button>
                                {addText && (
                                    <span className="text-black font-bold">
                                        {addText}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 border-gray-200">
                {selectedView === 'Kanban' && <Kanban projectId={projectId} projectName={project.projectName} />}
                {selectedView === 'List' && <List projectId={projectId} />}
                {selectedView === 'Calendar' && <Calendar project={project} />}
                {selectedView === 'GanttChart' && <GanttChart projectId={projectId} />}
                {selectedView === 'RaciMatrix' && <RaciMatrix projectId={projectId} />}
            </div>

            {isUserModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50">
                    <div className="relative bg-white p-6 rounded-md shadow-lg border border-gray-200 w-1/3">
                        {error && (
                            <p className=" text-red-700 p-4 rounded-md mb-4">
                                {error}
                            </p>
                        )}
                        <button
                            className="absolute top-2 right-2 text-gray-600"
                            onClick={handleCloseUserModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add Members</h2>

                        <div className="flex items-center mb-4">
                            <input
                                type="text"
                                placeholder="Search by email..."
                                className="flex-grow p-2 border border-gray-300 rounded-md"
                                onChange={(e) => setSearchQuery(e.target.value)}
                                value={searchQuery}
                            />
                            <button
                                className="ml-2 bg-red-600 text-white px-4 py-2 rounded-md"
                                onClick={handleAddMembers}
                            >
                                Add Member
                            </button>
                        </div>
                        <ul className="mb-4">
                            {filteredMembers.map(member => (
                                <li key={member._id} className="flex items-center mb-2">
                                    <img
                                        src={typeof member.profilePicture === 'string' ? member.profilePicture : member.profilePicture?.url}
                                        alt={member.username}
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span>{member.username}</span>
                                    <button
                                        onClick={() => toggleMemberSelection(member)}
                                        className={`ml-auto p-1 border rounded-md ${selectedMembers.some(selected => selected._id === member._id) ? 'bg-red-400' : 'bg-gray-200'}`}
                                    >
                                        {selectedMembers.some(selected => selected._id === member._id) ? 'Selected' : 'Select'}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
